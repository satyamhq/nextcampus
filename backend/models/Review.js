const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Rating is required']
    },
    title: { type: String, default: '' },
    comment: {
        type: String,
        required: [true, 'Review comment is required'],
        maxlength: 1000
    },
    program: { type: String, default: '' },
    graduationYear: { type: Number },
    helpful: { type: Number, default: 0 }
}, { timestamps: true });

// Prevent user from submitting more than 1 review per college
reviewSchema.index({ user: 1, college: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
