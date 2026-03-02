const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const College = require('../models/College');
const Program = require('../models/Program');
const User = require('../models/User');

const colleges = [
    {
        name: 'Indian Institute of Technology Bombay',
        location: { city: 'Mumbai', state: 'Maharashtra' },
        type: 'Government',
        established: 1958,
        accreditation: 'NAAC A++',
        programs: [
            { name: 'B.Tech Computer Science', specialization: 'Computer Science', duration: '4 years', fees: 250000, seats: 120 },
            { name: 'B.Tech Electrical', specialization: 'Electrical Engineering', duration: '4 years', fees: 250000, seats: 100 },
            { name: 'B.Tech Mechanical', specialization: 'Mechanical Engineering', duration: '4 years', fees: 250000, seats: 80 }
        ],
        totalFees: 1000000,
        avgPackage: 2150000,
        highestPackage: 15000000,
        medianPackage: 1800000,
        placementRate: 97,
        ranking: { nirf: 3, nextcampus: 9.6 },
        nextcampusScore: 9.6,
        recruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'Uber', 'Amazon', 'Meta', 'Apple'],
        infrastructure: { campus: '550 acres', hostel: true, library: true, labs: 45, sportsFacilities: true, wifi: true },
        admissionProcess: 'JEE Advanced rank-based counselling through JoSAA',
        examAccepted: ['JEE Advanced'],
        cutoff: { general: 250, obc: 450, sc: 1200, st: 900 },
        description: 'One of India\'s most prestigious engineering institutions, known for excellence in technology and research.',
        highlights: ['Ranked #3 in India', '97% placement rate', '550+ acre campus', 'World-class research facilities']
    },
    {
        name: 'Indian Institute of Technology Delhi',
        location: { city: 'New Delhi', state: 'Delhi' },
        type: 'Government',
        established: 1961,
        accreditation: 'NAAC A++',
        programs: [
            { name: 'B.Tech Computer Science', specialization: 'Computer Science', duration: '4 years', fees: 230000, seats: 110 },
            { name: 'B.Tech Electrical', specialization: 'Electrical Engineering', duration: '4 years', fees: 230000, seats: 90 }
        ],
        totalFees: 920000,
        avgPackage: 2200000,
        highestPackage: 18000000,
        medianPackage: 1900000,
        placementRate: 98,
        ranking: { nirf: 2, nextcampus: 9.7 },
        nextcampusScore: 9.7,
        recruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'McKinsey', 'Amazon', 'Flipkart'],
        infrastructure: { campus: '325 acres', hostel: true, library: true, labs: 50, sportsFacilities: true, wifi: true },
        admissionProcess: 'JEE Advanced rank-based counselling through JoSAA',
        examAccepted: ['JEE Advanced'],
        cutoff: { general: 150, obc: 350, sc: 1000, st: 800 },
        description: 'Premier engineering institution located in the capital, recognized globally for innovation and academic rigor.',
        highlights: ['Ranked #2 in India', '98% placement rate', 'Top-tier research output', 'Strong industry partnerships']
    },
    {
        name: 'National Institute of Technology Trichy',
        location: { city: 'Tiruchirappalli', state: 'Tamil Nadu' },
        type: 'Government',
        established: 1964,
        accreditation: 'NAAC A++',
        programs: [
            { name: 'B.Tech Computer Science', specialization: 'Computer Science', duration: '4 years', fees: 150000, seats: 80 },
            { name: 'B.Tech Electronics', specialization: 'Electronics & Communication', duration: '4 years', fees: 150000, seats: 70 }
        ],
        totalFees: 600000,
        avgPackage: 1200000,
        highestPackage: 5400000,
        medianPackage: 900000,
        placementRate: 93,
        ranking: { nirf: 9, nextcampus: 8.9 },
        nextcampusScore: 8.9,
        recruiters: ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Microsoft', 'Samsung'],
        infrastructure: { campus: '800 acres', hostel: true, library: true, labs: 35, sportsFacilities: true, wifi: true },
        admissionProcess: 'JEE Main rank-based counselling through JoSAA/CSAB',
        examAccepted: ['JEE Main'],
        cutoff: { general: 8000, obc: 12000, sc: 35000, st: 25000 },
        description: 'Top NIT in India, known for strong academics and excellent placement record.',
        highlights: ['Ranked #9 in India', '93% placement rate', '800 acre campus', 'Leading NIT']
    },
    {
        name: 'BITS Pilani',
        location: { city: 'Pilani', state: 'Rajasthan' },
        type: 'Private',
        established: 1964,
        accreditation: 'NAAC A',
        programs: [
            { name: 'B.E. Computer Science', specialization: 'Computer Science', duration: '4 years', fees: 500000, seats: 130 },
            { name: 'B.E. Electronics', specialization: 'Electronics & Instrumentation', duration: '4 years', fees: 500000, seats: 90 }
        ],
        totalFees: 2000000,
        avgPackage: 1850000,
        highestPackage: 12000000,
        medianPackage: 1500000,
        placementRate: 95,
        ranking: { nirf: 15, nextcampus: 9.0 },
        nextcampusScore: 9.0,
        recruiters: ['Google', 'Microsoft', 'Adobe', 'Goldman Sachs', 'Samsung', 'DE Shaw'],
        infrastructure: { campus: '1000 acres', hostel: true, library: true, labs: 40, sportsFacilities: true, wifi: true },
        admissionProcess: 'BITSAT score-based admission',
        examAccepted: ['BITSAT'],
        cutoff: { general: 350, obc: 330, sc: 280, st: 260 },
        description: 'One of India\'s leading private engineering institutions with a global reputation.',
        highlights: ['Practice School Program', '95% placement rate', 'Dual degree options', '1000 acre campus']
    },
    {
        name: 'VIT Vellore',
        location: { city: 'Vellore', state: 'Tamil Nadu' },
        type: 'Private',
        established: 1984,
        accreditation: 'NAAC A++',
        programs: [
            { name: 'B.Tech Computer Science', specialization: 'Computer Science', duration: '4 years', fees: 350000, seats: 500 },
            { name: 'B.Tech Civil', specialization: 'Civil Engineering', duration: '4 years', fees: 300000, seats: 200 }
        ],
        totalFees: 1400000,
        avgPackage: 850000,
        highestPackage: 4400000,
        medianPackage: 650000,
        placementRate: 88,
        ranking: { nirf: 12, nextcampus: 8.4 },
        nextcampusScore: 8.4,
        recruiters: ['TCS', 'Infosys', 'Cognizant', 'Wipro', 'Amazon', 'Capgemini'],
        infrastructure: { campus: '600 acres', hostel: true, library: true, labs: 60, sportsFacilities: true, wifi: true },
        admissionProcess: 'VITEEE score-based admission',
        examAccepted: ['VITEEE'],
        cutoff: { general: 12000, obc: 18000, sc: 35000, st: 30000 },
        description: 'Top-ranked private university known for international collaborations and strong placements.',
        highlights: ['International exchange programs', '88% placement rate', 'NAAC A++ accredited', '600 acre campus']
    },
    {
        name: 'SRM Institute of Science and Technology',
        location: { city: 'Chennai', state: 'Tamil Nadu' },
        type: 'Private',
        established: 1985,
        accreditation: 'NAAC A++',
        programs: [
            { name: 'B.Tech Computer Science', specialization: 'Computer Science', duration: '4 years', fees: 400000, seats: 600 },
            { name: 'B.Tech Mechanical', specialization: 'Mechanical Engineering', duration: '4 years', fees: 350000, seats: 300 }
        ],
        totalFees: 1600000,
        avgPackage: 750000,
        highestPackage: 4100000,
        medianPackage: 550000,
        placementRate: 85,
        ranking: { nirf: 19, nextcampus: 8.0 },
        nextcampusScore: 8.0,
        recruiters: ['TCS', 'Cognizant', 'HCL', 'Infosys', 'Zoho', 'Freshworks'],
        infrastructure: { campus: '250 acres', hostel: true, library: true, labs: 55, sportsFacilities: true, wifi: true },
        admissionProcess: 'SRMJEEE score-based admission',
        examAccepted: ['SRMJEEE'],
        cutoff: { general: 15000, obc: 22000, sc: 40000, st: 35000 },
        description: 'Renowned private university with strong industry connections in Chennai.',
        highlights: ['85% placement rate', 'International collaborations', 'NAAC A++ rated', 'Modern infrastructure']
    },
    {
        name: 'All India Institute of Medical Sciences Delhi',
        location: { city: 'New Delhi', state: 'Delhi' },
        type: 'Government',
        established: 1956,
        accreditation: 'NAAC A++',
        programs: [
            { name: 'MBBS', specialization: 'Medicine', duration: '5.5 years', fees: 8000, seats: 100 },
            { name: 'B.Sc Nursing', specialization: 'Nursing', duration: '4 years', fees: 6000, seats: 60 }
        ],
        totalFees: 44000,
        avgPackage: 1500000,
        highestPackage: 5000000,
        medianPackage: 1200000,
        placementRate: 100,
        ranking: { nirf: 1, nextcampus: 9.9 },
        nextcampusScore: 9.9,
        recruiters: ['Government Hospitals', 'Apollo', 'Fortis', 'Max Healthcare', 'AIIMS Network'],
        infrastructure: { campus: '100 acres', hostel: true, library: true, labs: 80, sportsFacilities: true, wifi: true },
        admissionProcess: 'NEET UG rank-based counselling',
        examAccepted: ['NEET'],
        cutoff: { general: 50, obc: 200, sc: 600, st: 500 },
        description: 'India\'s premier medical institution, consistently ranked #1 for medical education.',
        highlights: ['Ranked #1 Medical Institute', '100% placement', 'Lowest fees in India', 'World-class research']
    },
    {
        name: 'IIM Ahmedabad',
        location: { city: 'Ahmedabad', state: 'Gujarat' },
        type: 'Government',
        established: 1961,
        accreditation: 'AACSB, EQUIS, AMBA Triple Crown',
        programs: [
            { name: 'MBA (PGP)', specialization: 'Management', duration: '2 years', fees: 1200000, seats: 400 },
            { name: 'MBA (PGPX)', specialization: 'Executive MBA', duration: '1 year', fees: 3200000, seats: 70 }
        ],
        totalFees: 2400000,
        avgPackage: 3300000,
        highestPackage: 10700000,
        medianPackage: 2800000,
        placementRate: 100,
        ranking: { nirf: 1, nextcampus: 9.8 },
        nextcampusScore: 9.8,
        recruiters: ['McKinsey', 'BCG', 'Bain', 'Goldman Sachs', 'Amazon', 'Google', 'Accenture'],
        infrastructure: { campus: '106 acres', hostel: true, library: true, labs: 15, sportsFacilities: true, wifi: true },
        admissionProcess: 'CAT score + WAT-PI',
        examAccepted: ['CAT'],
        cutoff: { general: 99, obc: 95, sc: 80, st: 70 },
        description: 'India\'s top business school with global recognition and outstanding placement track record.',
        highlights: ['Triple Crown accreditation', '100% placement', 'Top globally', 'Case-study pedagogy']
    },
    {
        name: 'National Law School of India University',
        location: { city: 'Bangalore', state: 'Karnataka' },
        type: 'Government',
        established: 1987,
        accreditation: 'NAAC A',
        programs: [
            { name: 'BA LLB', specialization: 'Law', duration: '5 years', fees: 250000, seats: 80 },
            { name: 'LLM', specialization: 'Law Masters', duration: '1 year', fees: 150000, seats: 30 }
        ],
        totalFees: 1250000,
        avgPackage: 2000000,
        highestPackage: 7500000,
        medianPackage: 1700000,
        placementRate: 96,
        ranking: { nirf: 1, nextcampus: 9.5 },
        nextcampusScore: 9.5,
        recruiters: ['AZB & Partners', 'Trilegal', 'Cyril Amarchand', 'J Sagar Associates', 'Khaitan & Co'],
        infrastructure: { campus: '23 acres', hostel: true, library: true, labs: 5, sportsFacilities: true, wifi: true },
        admissionProcess: 'CLAT score-based admission',
        examAccepted: ['CLAT'],
        cutoff: { general: 120, obc: 108, sc: 85, st: 70 },
        description: 'India\'s premier law school that pioneered the five-year integrated law program.',
        highlights: ['Ranked #1 Law School', '96% placement rate', 'Pioneer of 5-year LLB', 'Top law firms recruit here']
    },
    {
        name: 'National Institute of Design Ahmedabad',
        location: { city: 'Ahmedabad', state: 'Gujarat' },
        type: 'Government',
        established: 1961,
        accreditation: 'Deemed University',
        programs: [
            { name: 'B.Des', specialization: 'Industrial Design', duration: '4 years', fees: 150000, seats: 40 },
            { name: 'M.Des', specialization: 'Communication Design', duration: '2.5 years', fees: 200000, seats: 30 }
        ],
        totalFees: 600000,
        avgPackage: 1200000,
        highestPackage: 4500000,
        medianPackage: 1000000,
        placementRate: 90,
        ranking: { nirf: 1, nextcampus: 9.2 },
        nextcampusScore: 9.2,
        recruiters: ['Tata Elxsi', 'Samsung', 'Titan', 'Asian Paints', 'Godrej'],
        infrastructure: { campus: '86 acres', hostel: true, library: true, labs: 20, sportsFacilities: true, wifi: true },
        admissionProcess: 'NID DAT + studio test + interview',
        examAccepted: ['NID DAT'],
        cutoff: { general: 500, obc: 700, sc: 1200, st: 1000 },
        description: 'India\'s foremost design institution, shaping creative leaders since 1961.',
        highlights: ['Ranked #1 Design Institute', '90% placement rate', 'World-renowned faculty', 'Strong alumni network']
    },
    {
        name: 'Manipal Institute of Technology',
        location: { city: 'Manipal', state: 'Karnataka' },
        type: 'Private',
        established: 1957,
        accreditation: 'NAAC A++',
        programs: [
            { name: 'B.Tech Computer Science', specialization: 'Computer Science', duration: '4 years', fees: 480000, seats: 180 },
            { name: 'B.Tech Biotechnology', specialization: 'Biotechnology', duration: '4 years', fees: 420000, seats: 80 }
        ],
        totalFees: 1920000,
        avgPackage: 1100000,
        highestPackage: 5000000,
        medianPackage: 850000,
        placementRate: 90,
        ranking: { nirf: 14, nextcampus: 8.5 },
        nextcampusScore: 8.5,
        recruiters: ['Microsoft', 'Amazon', 'Goldman Sachs', 'VMware', 'SAP', 'Oracle'],
        infrastructure: { campus: '700 acres', hostel: true, library: true, labs: 42, sportsFacilities: true, wifi: true },
        admissionProcess: 'MET score-based admission',
        examAccepted: ['MET'],
        cutoff: { general: 5000, obc: 8000, sc: 15000, st: 12000 },
        description: 'One of India\'s oldest and most respected private engineering colleges with a beautiful campus.',
        highlights: ['700 acre campus', '90% placement rate', 'Strong global alumni network', 'NAAC A++']
    },
    {
        name: 'Delhi University',
        location: { city: 'New Delhi', state: 'Delhi' },
        type: 'Government',
        established: 1922,
        accreditation: 'NAAC A+',
        programs: [
            { name: 'B.Com (Hons)', specialization: 'Commerce', duration: '3 years', fees: 20000, seats: 500 },
            { name: 'BA (Hons) Economics', specialization: 'Arts & Science', duration: '3 years', fees: 15000, seats: 300 },
            { name: 'B.Sc (Hons) Physics', specialization: 'Arts & Science', duration: '3 years', fees: 12000, seats: 200 }
        ],
        totalFees: 60000,
        avgPackage: 700000,
        highestPackage: 3500000,
        medianPackage: 550000,
        placementRate: 75,
        ranking: { nirf: 5, nextcampus: 8.8 },
        nextcampusScore: 8.8,
        recruiters: ['Deloitte', 'EY', 'KPMG', 'PwC', 'Hindustan Unilever', 'ITC'],
        infrastructure: { campus: '400 acres', hostel: true, library: true, labs: 30, sportsFacilities: true, wifi: true },
        admissionProcess: 'CUET score-based admission',
        examAccepted: ['CUET'],
        cutoff: { general: 98, obc: 95, sc: 88, st: 82 },
        description: 'One of India\'s most prestigious universities for undergraduate arts, science, and commerce programs.',
        highlights: ['Ranked #5 University', 'Affordable education', 'Historic institution', 'Strong research output']
    },
    {
        name: 'Symbiosis International University',
        location: { city: 'Pune', state: 'Maharashtra' },
        type: 'Private',
        established: 1971,
        accreditation: 'NAAC A',
        programs: [
            { name: 'BBA', specialization: 'Management', duration: '3 years', fees: 450000, seats: 240 },
            { name: 'BA LLB', specialization: 'Law', duration: '5 years', fees: 380000, seats: 120 }
        ],
        totalFees: 1350000,
        avgPackage: 900000,
        highestPackage: 3200000,
        medianPackage: 750000,
        placementRate: 88,
        ranking: { nirf: 25, nextcampus: 8.1 },
        nextcampusScore: 8.1,
        recruiters: ['Deloitte', 'KPMG', 'EY', 'Accenture', 'ICICI Bank', 'HDFC'],
        infrastructure: { campus: '300 acres', hostel: true, library: true, labs: 25, sportsFacilities: true, wifi: true },
        admissionProcess: 'SET exam score-based admission',
        examAccepted: ['SET'],
        cutoff: { general: 60, obc: 55, sc: 45, st: 40 },
        description: 'Leading private university in Pune known for management, law, and liberal arts programs.',
        highlights: ['International campus', '88% placement rate', 'Diverse programs', 'Strong industry connect']
    },
    {
        name: 'Amity University Noida',
        location: { city: 'Noida', state: 'Uttar Pradesh' },
        type: 'Private',
        established: 2005,
        accreditation: 'NAAC A+',
        programs: [
            { name: 'B.Tech Computer Science', specialization: 'Computer Science', duration: '4 years', fees: 320000, seats: 300 },
            { name: 'MBA', specialization: 'Management', duration: '2 years', fees: 500000, seats: 200 }
        ],
        totalFees: 1280000,
        avgPackage: 550000,
        highestPackage: 2800000,
        medianPackage: 450000,
        placementRate: 78,
        ranking: { nirf: 35, nextcampus: 7.2 },
        nextcampusScore: 7.2,
        recruiters: ['TCS', 'Infosys', 'HCL', 'Wipro', 'Genpact', 'Concentrix'],
        infrastructure: { campus: '200 acres', hostel: true, library: true, labs: 45, sportsFacilities: true, wifi: true },
        admissionProcess: 'Amity JEE / direct admission',
        examAccepted: ['Amity JEE', 'JEE Main'],
        cutoff: { general: 25000, obc: 35000, sc: 50000, st: 45000 },
        description: 'Large private university with wide range of programs and growing placement record.',
        highlights: ['200+ acre campus', 'Multi-disciplinary programs', 'International partnerships', 'NAAC A+']
    },
    {
        name: 'Jadavpur University',
        location: { city: 'Kolkata', state: 'West Bengal' },
        type: 'Government',
        established: 1955,
        accreditation: 'NAAC A',
        programs: [
            { name: 'B.E. Computer Science', specialization: 'Computer Science', duration: '4 years', fees: 15000, seats: 60 },
            { name: 'B.E. Electrical', specialization: 'Electrical Engineering', duration: '4 years', fees: 15000, seats: 50 }
        ],
        totalFees: 60000,
        avgPackage: 1050000,
        highestPackage: 5200000,
        medianPackage: 800000,
        placementRate: 89,
        ranking: { nirf: 6, nextcampus: 8.7 },
        nextcampusScore: 8.7,
        recruiters: ['Google', 'Microsoft', 'Adobe', 'TCS', 'Infosys', 'Amazon'],
        infrastructure: { campus: '60 acres', hostel: true, library: true, labs: 30, sportsFacilities: true, wifi: true },
        admissionProcess: 'WBJEE / JEE Main rank-based admission',
        examAccepted: ['WBJEE', 'JEE Main'],
        cutoff: { general: 500, obc: 800, sc: 2000, st: 1500 },
        description: 'One of the finest government engineering universities in eastern India.',
        highlights: ['Ranked #6 Engineering', 'Extremely affordable', '89% placement rate', 'Strong research culture']
    }
];

const programs = [
    {
        name: 'Engineering',
        category: 'Engineering',
        icon: 'fas fa-cogs',
        specializations: ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Electronics', 'Chemical', 'Biotechnology'],
        description: 'Build the future with cutting-edge engineering programs across multiple disciplines.',
        avgFees: 1200000,
        duration: '4 years',
        eligibility: 'Class 12 with PCM, JEE Main/Advanced',
        entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE', 'MET'],
        careerProspects: ['Software Engineer', 'Data Scientist', 'Mechanical Designer', 'Civil Engineer', 'Electronics Engineer'],
        avgSalary: 1200000,
        totalColleges: 4500
    },
    {
        name: 'Medical',
        category: 'Medical',
        icon: 'fas fa-heartbeat',
        specializations: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'Nursing', 'Pharmacy'],
        description: 'Pursue a career in healthcare with India\'s top medical programs.',
        avgFees: 500000,
        duration: '5.5 years',
        eligibility: 'Class 12 with PCB, NEET qualification',
        entranceExams: ['NEET UG', 'AIIMS', 'JIPMER'],
        careerProspects: ['Doctor', 'Surgeon', 'Dentist', 'Pharmacist', 'Healthcare Administrator'],
        avgSalary: 1500000,
        totalColleges: 600
    },
    {
        name: 'MBA',
        category: 'MBA',
        icon: 'fas fa-chart-line',
        specializations: ['Finance', 'Marketing', 'HR', 'Operations', 'International Business', 'IT Management'],
        description: 'Transform your career with India\'s prestigious MBA programs.',
        avgFees: 2000000,
        duration: '2 years',
        eligibility: 'Graduation with 50% marks, CAT/MAT qualification',
        entranceExams: ['CAT', 'XAT', 'MAT', 'CMAT', 'GMAT'],
        careerProspects: ['Management Consultant', 'Investment Banker', 'Marketing Manager', 'HR Director', 'Business Analyst'],
        avgSalary: 2200000,
        totalColleges: 3500
    },
    {
        name: 'Law',
        category: 'Law',
        icon: 'fas fa-balance-scale',
        specializations: ['Corporate Law', 'Criminal Law', 'International Law', 'IP Law', 'Constitutional Law'],
        description: 'Step into the legal world with top-tier law programs across India.',
        avgFees: 800000,
        duration: '5 years (integrated) / 3 years (LLB)',
        eligibility: 'Class 12 for BA LLB, Graduation for LLB',
        entranceExams: ['CLAT', 'AILET', 'LSAT India'],
        careerProspects: ['Corporate Lawyer', 'Litigation Lawyer', 'Judge', 'Legal Advisor', 'IP Attorney'],
        avgSalary: 1800000,
        totalColleges: 1500
    },
    {
        name: 'Design',
        category: 'Design',
        icon: 'fas fa-palette',
        specializations: ['Industrial Design', 'Communication Design', 'Fashion Design', 'Interior Design', 'UX/UI Design'],
        description: 'Unleash your creativity with India\'s finest design programs.',
        avgFees: 700000,
        duration: '4 years',
        eligibility: 'Class 12, NID DAT / UCEED qualification',
        entranceExams: ['NID DAT', 'UCEED', 'NIFT'],
        careerProspects: ['UX Designer', 'Product Designer', 'Fashion Designer', 'Interior Designer', 'Graphic Designer'],
        avgSalary: 1000000,
        totalColleges: 500
    },
    {
        name: 'Arts & Science',
        category: 'Arts & Science',
        icon: 'fas fa-flask',
        specializations: ['Physics', 'Chemistry', 'Mathematics', 'English', 'History', 'Economics', 'Political Science'],
        description: 'Build a strong academic foundation with arts and science programs.',
        avgFees: 100000,
        duration: '3 years',
        eligibility: 'Class 12 pass, CUET score',
        entranceExams: ['CUET'],
        careerProspects: ['Researcher', 'Professor', 'Civil Servant', 'Journalist', 'Data Analyst'],
        avgSalary: 600000,
        totalColleges: 8000
    },
    {
        name: 'Commerce',
        category: 'Commerce',
        icon: 'fas fa-coins',
        specializations: ['Accounting', 'Finance', 'Taxation', 'Banking', 'Insurance'],
        description: 'Launch your career in finance and business with top commerce programs.',
        avgFees: 150000,
        duration: '3 years',
        eligibility: 'Class 12 Commerce, CUET score',
        entranceExams: ['CUET', 'IPU CET'],
        careerProspects: ['Chartered Accountant', 'Financial Analyst', 'Tax Consultant', 'Banker', 'Auditor'],
        avgSalary: 800000,
        totalColleges: 5000
    },
    {
        name: 'Online Degrees',
        category: 'Online Degrees',
        icon: 'fas fa-laptop',
        specializations: ['Online MBA', 'Online BCA', 'Online B.Com', 'Online MCA', 'Data Science'],
        description: 'Learn at your own pace with UGC-approved online degree programs.',
        avgFees: 200000,
        duration: '2-4 years',
        eligibility: 'Varies by program',
        entranceExams: [],
        careerProspects: ['Software Developer', 'Business Manager', 'Data Analyst', 'Digital Marketer'],
        avgSalary: 700000,
        totalColleges: 300
    },
    {
        name: 'Study Abroad',
        category: 'Study Abroad',
        icon: 'fas fa-globe-americas',
        specializations: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Singapore'],
        description: 'Explore international education opportunities in top universities worldwide.',
        avgFees: 3000000,
        duration: '2-5 years',
        eligibility: 'Varies by country and university',
        entranceExams: ['GRE', 'GMAT', 'TOEFL', 'IELTS', 'SAT'],
        careerProspects: ['Global careers', 'International consultant', 'Research scientist', 'Tech lead'],
        avgSalary: 5000000,
        totalColleges: 10000
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for seeding...');

        // Clear existing data
        await College.deleteMany({});
        await Program.deleteMany({});
        console.log('Cleared existing data');

        // Insert colleges
        const insertedColleges = await College.insertMany(colleges);
        console.log(`Inserted ${insertedColleges.length} colleges`);

        // Insert programs
        const insertedPrograms = await Program.insertMany(programs);
        console.log(`Inserted ${insertedPrograms.length} programs`);

        // Create admin user if doesn't exist
        const existingAdmin = await User.findOne({ email: 'admin@nextcampus.com' });
        if (!existingAdmin) {
            await User.create({
                name: 'Admin',
                email: 'admin@nextcampus.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Created admin user (admin@nextcampus.com / admin123)');
        }

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error.message);
        process.exit(1);
    }
};

seedDatabase();
