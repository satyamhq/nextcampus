const College = require('../models/College');
const User = require('../models/User');
const Program = require('../models/Program');
const Loan = require('../models/Loan');
const Review = require('../models/Review');

// GET /api/admin/stats
exports.getStats = async (req, res) => {
    try {
        const totalColleges = await College.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalPrograms = await Program.countDocuments();
        const totalLoans = await Loan.countDocuments();
        const totalReviews = await Review.countDocuments();
        const pendingLoans = await Loan.countDocuments({ status: 'pending' });

        res.status(200).json({
            success: true,
            data: { totalColleges, totalUsers, totalPrograms, totalLoans, totalReviews, pendingLoans }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/admin/colleges
exports.createCollege = async (req, res) => {
    try {
        const college = await College.create(req.body);
        res.status(201).json({ success: true, data: college });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT /api/admin/colleges/:id
exports.updateCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!college) return res.status(404).json({ success: false, message: 'College not found' });
        res.status(200).json({ success: true, data: college });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/admin/colleges/:id
exports.deleteCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) return res.status(404).json({ success: false, message: 'College not found' });
        res.status(200).json({ success: true, message: 'College deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/admin/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort('-createdAt');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/admin/programs
exports.createProgram = async (req, res) => {
    try {
        const program = await Program.create(req.body);
        res.status(201).json({ success: true, data: program });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT /api/admin/programs/:id
exports.updateProgram = async (req, res) => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!program) return res.status(404).json({ success: false, message: 'Program not found' });
        res.status(200).json({ success: true, data: program });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/admin/programs/:id
exports.deleteProgram = async (req, res) => {
    try {
        await Program.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Program deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
