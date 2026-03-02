// Exam data is served as static JSON since exams don't change frequently

const examData = [
    {
        id: 'jee-main',
        name: 'JEE Main',
        fullName: 'Joint Entrance Examination Main',
        category: 'Engineering',
        conductedBy: 'NTA',
        frequency: 'Twice a year (Jan & Apr)',
        eligibility: 'Class 12 with PCM, minimum 75% marks',
        registrationFee: 650,
        examMode: 'Computer Based Test (CBT)',
        totalMarks: 300,
        duration: '3 hours',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        importantDates: { registration: 'Nov-Dec / Feb-Mar', examDate: 'Jan / Apr', result: 'Feb / May' },
        cutoffTrends: [
            { year: 2021, general: 87, obc: 68, sc: 46, st: 34 },
            { year: 2022, general: 90, obc: 72, sc: 49, st: 37 },
            { year: 2023, general: 93, obc: 74, sc: 51, st: 39 },
            { year: 2024, general: 95, obc: 76, sc: 53, st: 40 },
            { year: 2025, general: 97, obc: 78, sc: 55, st: 42 }
        ],
        topColleges: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'NIT Trichy']
    },
    {
        id: 'jee-advanced',
        name: 'JEE Advanced',
        fullName: 'Joint Entrance Examination Advanced',
        category: 'Engineering',
        conductedBy: 'IITs (Rotating)',
        frequency: 'Once a year (May/Jun)',
        eligibility: 'Top 2,50,000 JEE Main qualifiers',
        registrationFee: 2800,
        examMode: 'Computer Based Test (CBT)',
        totalMarks: 360,
        duration: '3 hours per paper (2 papers)',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        importantDates: { registration: 'Apr-May', examDate: 'Jun', result: 'Jun' },
        cutoffTrends: [
            { year: 2021, general: 63, obc: 56, sc: 32, st: 17 },
            { year: 2022, general: 65, obc: 58, sc: 33, st: 18 },
            { year: 2023, general: 68, obc: 60, sc: 35, st: 19 },
            { year: 2024, general: 70, obc: 62, sc: 36, st: 20 },
            { year: 2025, general: 72, obc: 64, sc: 38, st: 21 }
        ],
        topColleges: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kharagpur']
    },
    {
        id: 'neet',
        name: 'NEET UG',
        fullName: 'National Eligibility cum Entrance Test',
        category: 'Medical',
        conductedBy: 'NTA',
        frequency: 'Once a year (May)',
        eligibility: 'Class 12 with PCB, minimum 50% marks',
        registrationFee: 1600,
        examMode: 'Pen & Paper (OMR)',
        totalMarks: 720,
        duration: '3 hours 20 minutes',
        subjects: ['Physics', 'Chemistry', 'Biology'],
        importantDates: { registration: 'Feb-Mar', examDate: 'May', result: 'Jun' },
        cutoffTrends: [
            { year: 2021, general: 720, obc: 680, sc: 620, st: 580 },
            { year: 2022, general: 715, obc: 675, sc: 615, st: 575 },
            { year: 2023, general: 710, obc: 670, sc: 610, st: 570 },
            { year: 2024, general: 705, obc: 665, sc: 605, st: 565 },
            { year: 2025, general: 700, obc: 660, sc: 600, st: 560 }
        ],
        topColleges: ['AIIMS Delhi', 'JIPMER', 'CMC Vellore', 'MAMC Delhi']
    },
    {
        id: 'cat',
        name: 'CAT',
        fullName: 'Common Admission Test',
        category: 'MBA',
        conductedBy: 'IIMs (Rotating)',
        frequency: 'Once a year (Nov)',
        eligibility: 'Graduation with 50% marks',
        registrationFee: 2400,
        examMode: 'Computer Based Test (CBT)',
        totalMarks: 228,
        duration: '2 hours',
        subjects: ['VARC', 'DILR', 'Quantitative Ability'],
        importantDates: { registration: 'Aug', examDate: 'Nov', result: 'Jan' },
        cutoffTrends: [
            { year: 2021, general: 99, obc: 94, sc: 80, st: 70 },
            { year: 2022, general: 99, obc: 95, sc: 82, st: 72 },
            { year: 2023, general: 98, obc: 94, sc: 81, st: 71 },
            { year: 2024, general: 99, obc: 95, sc: 83, st: 73 },
            { year: 2025, general: 99, obc: 96, sc: 84, st: 74 }
        ],
        topColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow']
    },
    {
        id: 'clat',
        name: 'CLAT',
        fullName: 'Common Law Admission Test',
        category: 'Law',
        conductedBy: 'Consortium of NLUs',
        frequency: 'Once a year (Dec)',
        eligibility: 'Class 12 with 45% marks',
        registrationFee: 4000,
        examMode: 'Computer Based Test (CBT)',
        totalMarks: 150,
        duration: '2 hours',
        subjects: ['English', 'GK & Current Affairs', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
        importantDates: { registration: 'Aug-Oct', examDate: 'Dec', result: 'Jan' },
        cutoffTrends: [
            { year: 2021, general: 108, obc: 95, sc: 72, st: 60 },
            { year: 2022, general: 110, obc: 97, sc: 74, st: 62 },
            { year: 2023, general: 112, obc: 99, sc: 76, st: 64 },
            { year: 2024, general: 115, obc: 101, sc: 78, st: 65 },
            { year: 2025, general: 117, obc: 103, sc: 80, st: 67 }
        ],
        topColleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'NLU Delhi', 'WBNUJS Kolkata']
    },
    {
        id: 'gate',
        name: 'GATE',
        fullName: 'Graduate Aptitude Test in Engineering',
        category: 'Engineering',
        conductedBy: 'IITs & IISc',
        frequency: 'Once a year (Feb)',
        eligibility: 'BE/BTech graduates or final year students',
        registrationFee: 1700,
        examMode: 'Computer Based Test (CBT)',
        totalMarks: 100,
        duration: '3 hours',
        subjects: ['Engineering Mathematics', 'General Aptitude', 'Subject-specific'],
        importantDates: { registration: 'Aug-Sep', examDate: 'Feb', result: 'Mar' },
        cutoffTrends: [
            { year: 2021, general: 32, obc: 28, sc: 21, st: 21 },
            { year: 2022, general: 30, obc: 27, sc: 20, st: 20 },
            { year: 2023, general: 33, obc: 29, sc: 22, st: 22 },
            { year: 2024, general: 35, obc: 31, sc: 23, st: 23 },
            { year: 2025, general: 36, obc: 32, sc: 24, st: 24 }
        ],
        topColleges: ['IISc Bangalore', 'IIT Bombay', 'IIT Delhi', 'IIT Madras']
    }
];

// GET /api/exams
exports.getExams = async (req, res) => {
    try {
        const { category } = req.query;
        let data = examData;
        if (category) {
            data = examData.filter(e => e.category.toLowerCase() === category.toLowerCase());
        }
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/exams/:id
exports.getExam = async (req, res) => {
    try {
        const exam = examData.find(e => e.id === req.params.id);
        if (!exam) {
            return res.status(404).json({ success: false, message: 'Exam not found' });
        }
        res.status(200).json({ success: true, data: exam });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
