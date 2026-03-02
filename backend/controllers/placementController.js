const College = require('../models/College');

// GET /api/placements
exports.getPlacements = async (req, res) => {
    try {
        const colleges = await College.find({}).select('name avgPackage highestPackage medianPackage placementRate recruiters programs location').sort('-avgPackage').limit(20);

        // Aggregate salary trends by program type
        const salaryTrends = {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [
                { label: 'Computer Science', data: [8.5, 10.2, 12.4, 14.8, 16.5, 18.2] },
                { label: 'Electrical', data: [5.2, 6.0, 6.8, 7.5, 8.2, 9.0] },
                { label: 'Mechanical', data: [4.8, 5.5, 6.0, 6.8, 7.4, 8.0] },
                { label: 'Civil', data: [4.0, 4.5, 5.0, 5.5, 6.2, 6.8] },
                { label: 'MBA', data: [10.0, 11.5, 13.0, 14.5, 16.0, 18.0] }
            ]
        };

        // Top recruiters aggregation
        const recruiterMap = {};
        colleges.forEach(c => {
            c.recruiters.forEach(r => {
                recruiterMap[r] = (recruiterMap[r] || 0) + 1;
            });
        });
        const topRecruiters = Object.entries(recruiterMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
            .map(([name, count]) => ({ name, collegesCount: count }));

        // Branch-wise salary data
        const branchWiseSalary = [
            { branch: 'Computer Science', avgPackage: 18.2, highestPackage: 62, medianPackage: 14.5 },
            { branch: 'Information Technology', avgPackage: 15.5, highestPackage: 48, medianPackage: 12.0 },
            { branch: 'Electronics & Comm', avgPackage: 9.5, highestPackage: 32, medianPackage: 7.8 },
            { branch: 'Electrical', avgPackage: 9.0, highestPackage: 28, medianPackage: 7.2 },
            { branch: 'Mechanical', avgPackage: 8.0, highestPackage: 24, medianPackage: 6.5 },
            { branch: 'Civil', avgPackage: 6.8, highestPackage: 18, medianPackage: 5.5 },
            { branch: 'Chemical', avgPackage: 7.5, highestPackage: 22, medianPackage: 6.0 },
            { branch: 'MBA - Finance', avgPackage: 18.0, highestPackage: 55, medianPackage: 15.0 },
            { branch: 'MBA - Marketing', avgPackage: 16.5, highestPackage: 45, medianPackage: 13.5 },
            { branch: 'Medical (MBBS)', avgPackage: 12.0, highestPackage: 35, medianPackage: 10.0 }
        ];

        res.status(200).json({
            success: true,
            data: {
                colleges,
                salaryTrends,
                topRecruiters,
                branchWiseSalary
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
