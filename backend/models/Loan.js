const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    collegeName: { type: String, default: '' },
    loanAmount: {
        type: Number,
        required: [true, 'Loan amount is required']
    },
    tenure: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    interestRate: {
        type: Number,
        required: true,
        default: 8.5
    },
    emiAmount: { type: Number, default: 0 },
    totalPayable: { type: Number, default: 0 },
    riskLevel: {
        type: String,
        enum: ['Safe', 'Moderate', 'High'],
        default: 'Moderate'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    annualIncome: { type: Number, default: 0 },
    employmentType: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
