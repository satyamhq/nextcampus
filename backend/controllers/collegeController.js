const College = require('../models/College');
const Review = require('../models/Review');

// GET /api/colleges
exports.getColleges = async (req, res) => {
    try {
        const { program, budgetMin, budgetMax, rankMin, rankMax, location, type, search, page = 1, limit = 12, sort } = req.query;
        const filter = {};
        if (program) filter['programs.name'] = new RegExp(program, 'i');
        if (budgetMin || budgetMax) {
            filter.totalFees = {};
            if (budgetMin) filter.totalFees.$gte = Number(budgetMin);
            if (budgetMax) filter.totalFees.$lte = Number(budgetMax);
        }
        if (rankMin || rankMax) {
            filter['ranking.nirf'] = {};
            if (rankMin) filter['ranking.nirf'].$gte = Number(rankMin);
            if (rankMax) filter['ranking.nirf'].$lte = Number(rankMax);
        }
        if (location) filter['location.state'] = new RegExp(location, 'i');
        if (type) filter.type = type;
        if (search) {
            filter.$or = [
                { name: new RegExp(search, 'i') },
                { 'location.city': new RegExp(search, 'i') },
                { 'location.state': new RegExp(search, 'i') }
            ];
        }
        const sortOptions = {};
        if (sort === 'fees_low') sortOptions.totalFees = 1;
        else if (sort === 'fees_high') sortOptions.totalFees = -1;
        else if (sort === 'rank') sortOptions['ranking.nirf'] = 1;
        else if (sort === 'placement') sortOptions.placementRate = -1;
        else if (sort === 'score') sortOptions.nextcampusScore = -1;
        else sortOptions.nextcampusScore = -1;

        const skip = (Number(page) - 1) * Number(limit);
        const colleges = await College.find(filter).sort(sortOptions).skip(skip).limit(Number(limit));
        const total = await College.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: colleges,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/colleges/:id
exports.getCollege = async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }
        const reviews = await Review.find({ college: college._id }).populate('user', 'name').sort('-createdAt').limit(10);
        res.status(200).json({ success: true, data: college, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/colleges/slug/:slug
exports.getCollegeBySlug = async (req, res) => {
    try {
        const college = await College.findOne({ slug: req.params.slug });
        if (!college) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }
        const reviews = await Review.find({ college: college._id }).populate('user', 'name').sort('-createdAt').limit(10);
        res.status(200).json({ success: true, data: college, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/colleges/compare?ids=id1,id2,id3
exports.compareColleges = async (req, res) => {
    try {
        const ids = req.query.ids ? req.query.ids.split(',') : [];
        if (ids.length < 2 || ids.length > 3) {
            return res.status(400).json({ success: false, message: 'Select 2 or 3 colleges to compare' });
        }
        const colleges = await College.find({ _id: { $in: ids } });
        res.status(200).json({ success: true, data: colleges });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/colleges/search/suggestions?q=query
exports.searchSuggestions = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.length < 2) {
            return res.status(200).json({ success: true, data: [] });
        }
        const colleges = await College.find({
            $or: [
                { name: new RegExp(q, 'i') },
                { 'location.city': new RegExp(q, 'i') }
            ]
        }).select('name location type').limit(8);
        res.status(200).json({ success: true, data: colleges });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
