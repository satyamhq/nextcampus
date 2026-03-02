const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'College name is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true }
    },
    type: {
        type: String,
        enum: ['Government', 'Private', 'Deemed', 'Autonomous'],
        required: true
    },
    established: { type: Number },
    accreditation: { type: String, default: '' },
    programs: [{
        name: { type: String, required: true },
        specialization: { type: String },
        duration: { type: String },
        fees: { type: Number },
        seats: { type: Number }
    }],
    totalFees: { type: Number, required: true },
    avgPackage: { type: Number, required: true },
    highestPackage: { type: Number },
    medianPackage: { type: Number },
    placementRate: { type: Number, required: true },
    ranking: {
        nirf: { type: Number, default: 0 },
        nextcampus: { type: Number, default: 0 }
    },
    nextcampusScore: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    recruiters: [{ type: String }],
    infrastructure: {
        campus: { type: String, default: '' },
        hostel: { type: Boolean, default: false },
        library: { type: Boolean, default: true },
        labs: { type: Number, default: 0 },
        sportsFacilities: { type: Boolean, default: false },
        wifi: { type: Boolean, default: true }
    },
    admissionProcess: { type: String, default: '' },
    examAccepted: [{ type: String }],
    cutoff: {
        general: { type: Number, default: 0 },
        obc: { type: Number, default: 0 },
        sc: { type: Number, default: 0 },
        st: { type: Number, default: 0 }
    },
    image: { type: String, default: '' },
    gallery: [{ type: String }],
    website: { type: String, default: '' },
    description: { type: String, default: '' },
    highlights: [{ type: String }]
}, { timestamps: true });

// Generate slug from name
collegeSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    next();
});

module.exports = mongoose.model('College', collegeSchema);
