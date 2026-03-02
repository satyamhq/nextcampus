const User = require('../models/User');
const SavedComparison = require('../models/SavedComparison');
const Loan = require('../models/Loan');

// GET /api/dashboard
exports.getDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('savedColleges');
        const comparisons = await SavedComparison.find({ user: req.user._id }).populate('colleges').sort('-createdAt').limit(10);
        const loans = await Loan.find({ user: req.user._id }).sort('-createdAt');

        res.status(200).json({
            success: true,
            data: {
                user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
                savedColleges: user.savedColleges || [],
                comparisons,
                loans
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/dashboard/save-college
exports.saveCollege = async (req, res) => {
    try {
        const { collegeId } = req.body;
        const user = await User.findById(req.user._id);
        const idx = user.savedColleges.indexOf(collegeId);
        if (idx > -1) {
            user.savedColleges.splice(idx, 1);
            await user.save();
            return res.status(200).json({ success: true, message: 'College removed from saved', saved: false });
        }
        user.savedColleges.push(collegeId);
        await user.save();
        res.status(200).json({ success: true, message: 'College saved successfully', saved: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/dashboard/save-comparison
exports.saveComparison = async (req, res) => {
    try {
        const { collegeIds, title } = req.body;
        const comparison = await SavedComparison.create({
            user: req.user._id,
            colleges: collegeIds,
            title: title || 'My Comparison'
        });
        res.status(201).json({ success: true, data: comparison });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT /api/dashboard/profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { name, phone }, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
