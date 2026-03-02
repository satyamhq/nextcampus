const Program = require('../models/Program');

// GET /api/programs
exports.getPrograms = async (req, res) => {
    try {
        const { category, search } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (search) filter.name = new RegExp(search, 'i');
        const programs = await Program.find(filter).sort('category');
        res.status(200).json({ success: true, data: programs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/programs/:id
exports.getProgram = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }
        res.status(200).json({ success: true, data: program });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
