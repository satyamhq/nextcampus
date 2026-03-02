const mongoose = require('mongoose');

const savedComparisonSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    colleges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    }],
    title: { type: String, default: 'My Comparison' }
}, { timestamps: true });

module.exports = mongoose.model('SavedComparison', savedComparisonSchema);
