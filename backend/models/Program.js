const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Program name is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    category: {
        type: String,
        enum: ['Engineering', 'Medical', 'MBA', 'Law', 'Design', 'Arts & Science', 'Commerce', 'Online Degrees', 'Study Abroad'],
        required: true
    },
    icon: { type: String, default: '' },
    specializations: [{ type: String }],
    description: { type: String, default: '' },
    avgFees: { type: Number, default: 0 },
    duration: { type: String, default: '' },
    eligibility: { type: String, default: '' },
    entranceExams: [{ type: String }],
    careerProspects: [{ type: String }],
    avgSalary: { type: Number, default: 0 },
    totalColleges: { type: Number, default: 0 }
}, { timestamps: true });

programSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    next();
});

module.exports = mongoose.model('Program', programSchema);
