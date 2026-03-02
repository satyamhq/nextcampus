const Loan = require('../models/Loan');

// POST /api/loans/calculate
exports.calculateEMI = async (req, res) => {
    try {
        const { loanAmount, tenure, interestRate = 8.5 } = req.body;
        if (!loanAmount || !tenure) {
            return res.status(400).json({ success: false, message: 'Loan amount and tenure are required' });
        }
        const P = Number(loanAmount);
        const R = Number(interestRate) / 12 / 100;
        const N = Number(tenure) * 12;
        const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
        const totalPayable = emi * N;
        const totalInterest = totalPayable - P;

        // Risk assessment
        let riskLevel = 'Safe';
        const emiToLoanRatio = (emi * 12) / P;
        if (emiToLoanRatio > 0.35) riskLevel = 'High';
        else if (emiToLoanRatio > 0.2) riskLevel = 'Moderate';

        res.status(200).json({
            success: true,
            data: {
                emi: Math.round(emi),
                totalPayable: Math.round(totalPayable),
                totalInterest: Math.round(totalInterest),
                riskLevel,
                monthlyBreakdown: {
                    principal: Math.round(P / N),
                    interest: Math.round(emi - P / N)
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/loans/eligibility
exports.checkEligibility = async (req, res) => {
    try {
        const { annualIncome, loanAmount, existingEMI = 0 } = req.body;
        if (!annualIncome || !loanAmount) {
            return res.status(400).json({ success: false, message: 'Annual income and loan amount are required' });
        }
        const monthlyIncome = Number(annualIncome) / 12;
        const maxEMI = monthlyIncome * 0.5 - Number(existingEMI);
        const R = 8.5 / 12 / 100;
        const N = 7 * 12; // 7 years default
        const maxLoanAmount = maxEMI * (Math.pow(1 + R, N) - 1) / (R * Math.pow(1 + R, N));

        const eligible = maxLoanAmount >= Number(loanAmount);

        res.status(200).json({
            success: true,
            data: {
                eligible,
                maxLoanAmount: Math.round(maxLoanAmount),
                maxEMI: Math.round(maxEMI),
                requestedAmount: Number(loanAmount),
                message: eligible ? 'You are eligible for this loan amount!' : `Your maximum eligible loan is ₹${Math.round(maxLoanAmount).toLocaleString()}`
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/loans/apply (protected)
exports.applyLoan = async (req, res) => {
    try {
        const { college, collegeName, loanAmount, tenure, interestRate = 8.5, annualIncome, employmentType } = req.body;
        const P = Number(loanAmount);
        const R = Number(interestRate) / 12 / 100;
        const N = Number(tenure) * 12;
        const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
        const totalPayable = emi * N;

        let riskLevel = 'Safe';
        const emiToIncomeRatio = (emi * 12) / Number(annualIncome);
        if (emiToIncomeRatio > 0.5) riskLevel = 'High';
        else if (emiToIncomeRatio > 0.3) riskLevel = 'Moderate';

        const loan = await Loan.create({
            user: req.user._id,
            college, collegeName, loanAmount, tenure, interestRate,
            emiAmount: Math.round(emi),
            totalPayable: Math.round(totalPayable),
            riskLevel, annualIncome, employmentType
        });

        res.status(201).json({ success: true, data: loan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
