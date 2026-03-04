const fs = require('fs');
const path = require('path');
const { getTabsHtml, getJsContent, getFullCss } = require('./gen_utils.js');

const basePath = path.join(__dirname, 'frontend', 'colleges');
const homeJsPath = path.join(__dirname, 'frontend', 'home', 'home.js');

function slugify(text) {
    if (!text) return 'unknown';
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

const haryanaColleges = [
    // Universities in Haryana
    { name: "Kurukshetra University", abbr: "KUK", city: "Kurukshetra", type: "State", est: 1956, category: "Arts & Science" },
    { name: "Maharshi Dayanand University", abbr: "MDU", city: "Rohtak", type: "State", est: 1976, category: "Arts & Science" },
    { name: "Chaudhary Devi Lal University", abbr: "CDLU", city: "Sirsa", type: "State", est: 2003, category: "Arts & Science" },
    { name: "Guru Jambheshwar University of Science and Technology", abbr: "GJU", city: "Hisar", type: "State", est: 1995, category: "Engineering" },
    { name: "Indira Gandhi University Meerpur", abbr: "IGU", city: "Rewari", type: "State", est: 2013, category: "Arts & Science" },
    { name: "Chaudhary Ranbir Singh University", abbr: "CRSU", city: "Jind", type: "State", est: 2014, category: "Arts & Science" },
    { name: "Central University of Haryana", abbr: "CUH", city: "Mahendragarh", type: "Central", est: 2009, category: "Arts & Science" },
    { name: "Ashoka University", abbr: "Ashoka", city: "Sonipat", type: "Private", est: 2014, category: "Arts & Science" },
    { name: "O.P. Jindal Global University", abbr: "JGU", city: "Sonipat", type: "Private", est: 2009, category: "Law" },
    { name: "Amity University Haryana", abbr: "Amity Gurugram", city: "Gurugram", type: "Private", est: 2010, category: "Management" },

    // Engineering Colleges
    { name: "National Institute of Technology Kurukshetra", abbr: "NIT KKR", city: "Kurukshetra", type: "Government", est: 1963, category: "Engineering" },
    { name: "Indian Institute of Information Technology Sonepat", abbr: "IIIT Sonepat", city: "Sonipat", type: "PPP Mode", est: 2014, category: "Engineering" },
    { name: "Deenbandhu Chhotu Ram University of Science and Technology", abbr: "DCRUST", city: "Murthal", type: "State", est: 1987, category: "Engineering" },
    { name: "YMCA University of Science and Technology", abbr: "YMCA", city: "Faridabad", type: "State", est: 1969, category: "Engineering" },
    { name: "BML Munjal University", abbr: "BMU", city: "Gurugram", type: "Private", est: 2014, category: "Engineering" },
    { name: "Manav Rachna University", abbr: "MRU", city: "Faridabad", type: "Private", est: 2004, category: "Engineering" },
    { name: "SRM University Haryana", abbr: "SRMUH", city: "Sonipat", type: "Private", est: 2013, category: "Engineering" },
    { name: "Geeta University Panipat", abbr: "GU", city: "Panipat", type: "Private", est: 1992, category: "Engineering" },
    { name: "Panipat Institute of Engineering and Technology", abbr: "PIET", city: "Panipat", type: "Private", est: 2006, category: "Engineering" },
    { name: "Lingaya’s Vidyapeeth Faridabad", abbr: "Lingayas", city: "Faridabad", type: "Deemed", est: 1998, category: "Engineering" },

    // Medical Colleges
    { name: "Pt. B. D. Sharma Post Graduate Institute of Medical Sciences", abbr: "PGIMS Rohtak", city: "Rohtak", type: "Government", est: 1960, category: "Medical" },
    { name: "Kalpana Chawla Government Medical College", abbr: "KCGMC", city: "Karnal", type: "Government", est: 2017, category: "Medical" },
    { name: "Shaheed Hasan Khan Mewati Government Medical College", abbr: "SHKM GMC", city: "Nuh", type: "Government", est: 2012, category: "Medical" },
    { name: "Maharaja Agrasen Medical College", abbr: "MAMC", city: "Agroha", type: "Private Aided", est: 1988, category: "Medical" },
    { name: "Adesh Medical College", abbr: "Adesh", city: "Kurukshetra", type: "Private", est: 2015, category: "Medical" },

    // Management Colleges
    { name: "Indian Institute of Management Rohtak", abbr: "IIM Rohtak", city: "Rohtak", type: "Government", est: 2009, category: "Management" },
    { name: "Management Development Institute Gurgaon", abbr: "MDI", city: "Gurugram", type: "Autonomous", est: 1973, category: "Management" },
    { name: "Great Lakes Institute of Management Gurgaon", abbr: "GLIM", city: "Gurugram", type: "Private", est: 2010, category: "Management" },
    { name: "Apeejay Stya University", abbr: "ASU", city: "Gurugram", type: "Private", est: 2010, category: "Management" },
    { name: "IBS Gurgaon", abbr: "IBS", city: "Gurugram", type: "Private", est: 1995, category: "Management" },

    // Law Colleges
    { name: "Dr. B. R. Ambedkar National Law University", abbr: "NLU Sonepat", city: "Sonipat", type: "State", est: 2012, category: "Law" },
    { name: "Faculty of Law Kurukshetra University", abbr: "Law KUK", city: "Kurukshetra", type: "State", est: 1969, category: "Law" },
    { name: "Faculty of Law Maharshi Dayanand University", abbr: "Law MDU", city: "Rohtak", type: "State", est: 1978, category: "Law" },

    // Government Colleges
    { name: "Government College Hisar", abbr: "GC Hisar", city: "Hisar", type: "Government", est: 1950, category: "Arts & Science" },
    { name: "Government College Ambala", abbr: "GC Ambala", city: "Ambala", type: "Government", est: 1950, category: "Arts & Science" },
    { name: "Government College Karnal", abbr: "GC Karnal", city: "Karnal", type: "Government", est: 1970, category: "Arts & Science" },
    { name: "Government College Rohtak", abbr: "GC Rohtak", city: "Rohtak", type: "Government", est: 1927, category: "Arts & Science" },
    { name: "Government College Panipat", abbr: "GC Panipat", city: "Panipat", type: "Government", est: 1970, category: "Arts & Science" },
    { name: "Government College Faridabad", abbr: "GC Faridabad", city: "Faridabad", type: "Government", est: 1971, category: "Arts & Science" },
    { name: "Government College Bhiwani", abbr: "GC Bhiwani", city: "Bhiwani", type: "Government", est: 1969, category: "Arts & Science" },
    { name: "Government College Sirsa", abbr: "GC Sirsa", city: "Sirsa", type: "Government", est: 1950, category: "Arts & Science" },
    { name: "Government College Jind", abbr: "GC Jind", city: "Jind", type: "Government", est: 1960, category: "Arts & Science" },
    { name: "Government College Sonipat", abbr: "GC Sonipat", city: "Sonipat", type: "Government", est: 1956, category: "Arts & Science" },

    // Private Degree Colleges
    { name: "DAV College Ambala", abbr: "DAV Ambala", city: "Ambala", type: "Private Aided", est: 1928, category: "Arts & Science" },
    { name: "Hindu College Sonipat", abbr: "Hindu College", city: "Sonipat", type: "Private Aided", est: 1914, category: "Arts & Science" },
    { name: "Vaish College Rohtak", abbr: "Vaish College", city: "Rohtak", type: "Private Aided", est: 1946, category: "Arts & Science" },
    { name: "Aggarwal College Ballabgarh", abbr: "AC Ballabgarh", city: "Faridabad", type: "Private Aided", est: 1971, category: "Arts & Science" },
    { name: "SD College Ambala", abbr: "SD Ambala", city: "Ambala", type: "Private Aided", est: 1916, category: "Arts & Science" },
    { name: "Chhotu Ram College Rohtak", abbr: "CR College", city: "Rohtak", type: "Private Aided", est: 1951, category: "Arts & Science" },
    { name: "Arya College Panipat", abbr: "Arya Panipat", city: "Panipat", type: "Private Aided", est: 1954, category: "Arts & Science" },

    // Remaining Colleges
    { name: "DAV College Karnal", abbr: "DAV Karnal", city: "Karnal", type: "Private Aided", est: 1974, category: "Arts & Science" },
    { name: "DAV College Hisar", abbr: "DAV Hisar", city: "Hisar", type: "Private Aided", est: 1968, category: "Arts & Science" },
    { name: "DAV College Yamunanagar", abbr: "DAV YNR", city: "Yamunanagar", type: "Private Aided", est: 1958, category: "Arts & Science" },
    { name: "DAV College Kurukshetra", abbr: "DAV KKR", city: "Kurukshetra", type: "Private Aided", est: 1960, category: "Arts & Science" },
    { name: "SD College Panipat", abbr: "SD Panipat", city: "Panipat", type: "Private Aided", est: 1969, category: "Arts & Science" },
    { name: "SD College Karnal", abbr: "SD Karnal", city: "Karnal", type: "Private Aided", est: 1969, category: "Arts & Science" },
    { name: "Guru Nanak College Yamunanagar", abbr: "GNC YNR", city: "Yamunanagar", type: "Private Aided", est: 1973, category: "Arts & Science" },
    { name: "National College Sirsa", abbr: "NC Sirsa", city: "Sirsa", type: "Private Aided", est: 1968, category: "Arts & Science" },
    { name: "Jat College Rohtak", abbr: "Jat Rohtak", city: "Rohtak", type: "Private Aided", est: 1944, category: "Arts & Science" },
    { name: "Jat College Hisar", abbr: "Jat Hisar", city: "Hisar", type: "Private Aided", est: 1967, category: "Arts & Science" },
    { name: "Dayanand College Hisar", abbr: "DC Hisar", city: "Hisar", type: "Private Aided", est: 1950, category: "Arts & Science" },
    { name: "KVA DAV College Karnal", abbr: "KVADAV Karnal", city: "Karnal", type: "Private Aided", est: 1958, category: "Arts & Science" },
    { name: "Indira Gandhi College Kaithal", abbr: "IG Kaithal", city: "Kaithal", type: "Private Aided", est: 1971, category: "Arts & Science" },
    { name: "Chaudhary Devi Lal College Sirsa", abbr: "CDL Sirsa", city: "Sirsa", type: "Government", est: 1980, category: "Arts & Science" },
    { name: "Saraswati College Palwal", abbr: "Saraswati Palwal", city: "Palwal", type: "Private Aided", est: 1979, category: "Arts & Science" },
    { name: "Mahila College Hisar", abbr: "MC Hisar", city: "Hisar", type: "Private Aided", est: 1972, category: "Arts & Science" },
    { name: "SD Mahila College Panipat", abbr: "SDMC Panipat", city: "Panipat", type: "Private Aided", est: 1970, category: "Arts & Science" },
    { name: "Kanya Mahavidyalaya Sonipat", abbr: "KM Sonipat", city: "Sonipat", type: "Private Aided", est: 1980, category: "Arts & Science" },
    { name: "Kanya Mahavidyalaya Rohtak", abbr: "KM Rohtak", city: "Rohtak", type: "Private Aided", est: 1968, category: "Arts & Science" },
    { name: "Arya Girls College Ambala", abbr: "AGC Ambala", city: "Ambala", type: "Private Aided", est: 1959, category: "Arts & Science" },
    { name: "Hindu Girls College Sonipat", abbr: "HGC Sonipat", city: "Sonipat", type: "Private Aided", est: 1982, category: "Arts & Science" },
    { name: "Vaish Girls College Rohtak", abbr: "VGC Rohtak", city: "Rohtak", type: "Private Aided", est: 1973, category: "Arts & Science" },
    { name: "DAV Girls College Karnal", abbr: "DAVGC Karnal", city: "Karnal", type: "Private Aided", est: 1971, category: "Arts & Science" },
    { name: "Jat Girls College Panipat", abbr: "JGC Panipat", city: "Panipat", type: "Private Aided", est: 1978, category: "Arts & Science" },

    // Polytechnics
    { name: "Government Polytechnic Ambala", abbr: "GP Ambala", city: "Ambala", type: "Government", est: 1958, category: "Engineering" },
    { name: "Government Polytechnic Sonipat", abbr: "GP Sonipat", city: "Sonipat", type: "Government", est: 1965, category: "Engineering" },
    { name: "Government Polytechnic Hisar", abbr: "GP Hisar", city: "Hisar", type: "Government", est: 2004, category: "Engineering" },
    { name: "Government Polytechnic Rohtak", abbr: "GP Rohtak", city: "Rohtak", type: "Government", est: 1999, category: "Engineering" },
    { name: "Government Polytechnic Karnal", abbr: "GP Karnal", city: "Karnal", type: "Government", est: 2006, category: "Engineering" },
    { name: "Government Polytechnic Panipat", abbr: "GP Panipat", city: "Panipat", type: "Government", est: 2007, category: "Engineering" },
    { name: "Government Polytechnic Sirsa", abbr: "GP Sirsa", city: "Sirsa", type: "Government", est: 2001, category: "Engineering" },
    { name: "Government Polytechnic Bhiwani", abbr: "GP Bhiwani", city: "Bhiwani", type: "Government", est: 1999, category: "Engineering" },
    { name: "Government Polytechnic Yamunanagar", abbr: "GP Yamunanagar", city: "Yamunanagar", type: "Government", est: 2008, category: "Engineering" },
    { name: "Government Polytechnic Faridabad", abbr: "GP Faridabad", city: "Faridabad", type: "Government", est: 2010, category: "Engineering" },
    { name: "Government Polytechnic Jhajjar", abbr: "GP Jhajjar", city: "Jhajjar", type: "Government", est: 2011, category: "Engineering" },
    { name: "Government Polytechnic Jind", abbr: "GP Jind", city: "Jind", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Kaithal", abbr: "GP Kaithal", city: "Kaithal", type: "Government", est: 2013, category: "Engineering" },
    { name: "Government Polytechnic Rewari", abbr: "GP Rewari", city: "Rewari", type: "Government", est: 2014, category: "Engineering" },
    { name: "Government Polytechnic Palwal", abbr: "GP Palwal", city: "Palwal", type: "Government", est: 2015, category: "Engineering" },
    { name: "Government Polytechnic Narnaul", abbr: "GP Narnaul", city: "Narnaul", type: "Government", est: 1992, category: "Engineering" },
    { name: "Government Polytechnic Kurukshetra", abbr: "GP Kurukshetra", city: "Kurukshetra", type: "Government", est: 2010, category: "Engineering" },
    { name: "Government Polytechnic Ambala City", abbr: "GP Ambala City", city: "Ambala City", type: "Government", est: 1968, category: "Engineering" },
    { name: "Government Polytechnic Bahadurgarh", abbr: "GP Bahadurgarh", city: "Bahadurgarh", type: "Government", est: 2008, category: "Engineering" },
    { name: "Government Polytechnic Hansi", abbr: "GP Hansi", city: "Hansi", type: "Government", est: 2015, category: "Engineering" },
    { name: "Government Polytechnic Fatehabad", abbr: "GP Fatehabad", city: "Fatehabad", type: "Government", est: 2014, category: "Engineering" },
    { name: "Government Polytechnic Tohana", abbr: "GP Tohana", city: "Tohana", type: "Government", est: 2016, category: "Engineering" },
    { name: "Government Polytechnic Narwana", abbr: "GP Narwana", city: "Narwana", type: "Government", est: 2007, category: "Engineering" },
    { name: "Government Polytechnic Gohana", abbr: "GP Gohana", city: "Gohana", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Safidon", abbr: "GP Safidon", city: "Safidon", type: "Government", est: 2015, category: "Engineering" },
    { name: "Government Polytechnic Charkhi Dadri", abbr: "GP Charkhi Dadri", city: "Charkhi Dadri", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Meham", abbr: "GP Meham", city: "Meham", type: "Government", est: 2013, category: "Engineering" },
    { name: "Government Polytechnic Samalkha", abbr: "GP Samalkha", city: "Samalkha", type: "Government", est: 2014, category: "Engineering" },
    { name: "Government Polytechnic Kalka", abbr: "GP Kalka", city: "Kalka", type: "Government", est: 2015, category: "Engineering" },
    { name: "Government Polytechnic Radaur", abbr: "GP Radaur", city: "Radaur", type: "Government", est: 2015, category: "Engineering" },
    { name: "Government Polytechnic Jagadhri", abbr: "GP Jagadhri", city: "Jagadhri", type: "Government", est: 2016, category: "Engineering" },
    { name: "Government Polytechnic Barwala", abbr: "GP Barwala", city: "Barwala", type: "Government", est: 2016, category: "Engineering" },
    { name: "Government Polytechnic Ellenabad", abbr: "GP Ellenabad", city: "Ellenabad", type: "Government", est: 2016, category: "Engineering" },
    { name: "Government Polytechnic Dabwali", abbr: "GP Dabwali", city: "Dabwali", type: "Government", est: 2016, category: "Engineering" },
    { name: "Government Polytechnic Siwani", abbr: "GP Siwani", city: "Siwani", type: "Government", est: 2017, category: "Engineering" },
    { name: "Government Polytechnic Tosham", abbr: "GP Tosham", city: "Tosham", type: "Government", est: 2017, category: "Engineering" },
    { name: "Government Polytechnic Loharu", abbr: "GP Loharu", city: "Loharu", type: "Government", est: 2017, category: "Engineering" },
    { name: "Government Polytechnic Nuh", abbr: "GP Nuh", city: "Nuh", type: "Government", est: 2018, category: "Engineering" },
    { name: "Government Polytechnic Ferozepur Jhirka", abbr: "GP Ferozepur Jhirka", city: "Ferozepur Jhirka", type: "Government", est: 2018, category: "Engineering" },
    { name: "Government Polytechnic Tauru", abbr: "GP Tauru", city: "Tauru", type: "Government", est: 2018, category: "Engineering" },
    { name: "Government Polytechnic Sohna", abbr: "GP Sohna", city: "Sohna", type: "Government", est: 2019, category: "Engineering" },
    { name: "Government Polytechnic Hathin", abbr: "GP Hathin", city: "Hathin", type: "Government", est: 2019, category: "Engineering" },
    { name: "Government Polytechnic Pataudi", abbr: "GP Pataudi", city: "Pataudi", type: "Government", est: 2019, category: "Engineering" },
    { name: "Government Polytechnic Hodal", abbr: "GP Hodal", city: "Hodal", type: "Government", est: 2020, category: "Engineering" },
    { name: "Government Polytechnic Kosli", abbr: "GP Kosli", city: "Kosli", type: "Government", est: 2020, category: "Engineering" },
    { name: "Government Polytechnic Mahendragarh", abbr: "GP Mahendragarh", city: "Mahendragarh", type: "Government", est: 2020, category: "Engineering" }
];


function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";
    let isPolytechnic = col.name.includes("Polytechnic");

    if (isPolytechnic) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering</strong></td><td>3 Years</td><td>\u20B910K — \u20B915K</td><td>10th Pass / 12th PCM</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>D.Voc / Skill Courses</strong></td><td>1-3 Years</td><td>\u20B95K</td><td>10th Pass</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "State-level decentralized counseling under Haryana State Technical Education Society (HSTES).";
        placementInfo = "High demand in manufacturing, automotives (Maruti Suzuki, Hero MotoCorp), and infrastructure companies across NCR and Panipat.";
    } else if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B92L — \u20B915L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B93L — \u20B925L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Pt. B.D. Sharma UHS Rohtak conducts state counseling under DMER Haryana.";
        placementInfo = "Mandatory internships and bond services usually follow, leading to lucrative rural or top tier hospital postings.";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B98L — \u20B930L</td><td>Graduation + CAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA / BBA+MBA</strong></td><td>3-5 Years</td><td>\u20B94L — \u20B918L</td><td>10+2 + Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "IIM/MDI accept CAT, whereas others may accept CMAT/MAT or specialized entrance tests.";
        placementInfo = "The Gurugram circuit offers extremely rich corporate exposures with top banks, FMCG, and Big 4 consultancies hiring actively.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>\u20B93L — \u20B915L</td><td>10+2 + CLAT/LSAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1-2 Years</td><td>\u20B91L — \u20B94L</td><td>LLB + CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "O.P. Jindal primarily looks at LSAT-India; NLU Sonepat takes CLAT; State Universities use departmental exams.";
        placementInfo = "Huge corporate law placements in Delhi/NCR, alongside strong litigation records at Punjab and Haryana High Court.";
    } else if (col.category === 'Engineering') {
        let isElite = col.abbr.includes("NIT") || col.abbr.includes("IIIT");
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isElite ? '6L' : '2.5L'} — \u20B9${isElite ? '10L' : '18L'}</td><td>10+2 PCM + ${isElite ? 'JEE Main' : 'HSTES'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B94L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isElite ? "JoSAA / CSAB counseling based on JEE Main." : "B.Tech admissions via HSTES counseling based on JEE Main ranks, followed by physical counseling.";
        placementInfo = "Robust mass IT hirings alongside niche mechanical placements mapping directly to Faridabad, Gurgaon and Manesar industrial hubs.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3 Years</td><td>\u20B915K — \u20B980K</td><td>10+2 Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B920K — \u20B990K</td><td>Bachelor's + Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "DHE Haryana centralizes UG/PG admissions purely on academic merit lists.";
        placementInfo = "Solid stepping stones for central exams, SSC, banking or post-graduation.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const typeLabel = isPolytechnic ? 'Government Diploma' : col.type;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, Haryana Colleges, Haryana Engineering, NextCampus">
    <link rel="icon" type="image/svg+xml" href="../../../favicon/favicon.svg">
    <link rel="icon" type="image/png" sizes="96x96" href="../../../favicon/favicon-96x96.png">
    <link rel="shortcut icon" href="../../../favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="../../../favicon/apple-touch-icon.png">
    <link rel="manifest" href="../../../favicon/site.webmanifest">
    <meta name="theme-color" content="#0056D2">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${collegeSlug}.css">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "${col.name}",
      "alternateName": "${col.abbr}",
      "url": "https://nextcampus.com/colleges/haryana/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/haryana/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Haryana</span>
            </div>
            <a href="#" class="btn-lpu-apply">Apply Now &#8594;</a>
        </div>
    </div>

    <section class="lpu-hero" id="lpu-hero"
        style="background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url('images/cover/${collegeSlug}_cover.png'); background-size: cover; background-position: center;">
        <div class="container">
            <div class="lpu-hero-grid">
                <div class="lpu-hero-info">
                    <img src="images/logo/${collegeSlug}_logo.png" alt="Official Logo of ${col.name} - NextCampus" class="lpu-logo-img">
                    <div>
                        <h1>${col.name} <span class="lpu-abbr">(${col.abbr})</span></h1>
                        <p class="lpu-location">&#128205; ${col.city}, Haryana, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.1</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${typeLabel}</strong></span>
                        </div>
                        <div class="lpu-ctas">
                            <a href="#" class="btn-lpu-apply">Apply Now &#8594;</a>
                            <a href="#" class="btn-lpu-brochure" onclick="alert('Brochure download coming soon!');return false;">&#128196; Download Brochure</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

${tabsHtml}

    <main class="lpu-main">
        <div class="container">

            <!-- OVERVIEW -->
            <section class="lpu-panel active" id="panel-overview">
                <div class="lpu-card">
                    <h2>About ${col.name}</h2>
                    <p>${col.name} (${col.abbr}) is a significant educational institution located in ${col.city}, Haryana. Actively fostering talent since ${col.est}, it has evolved into a prominent zone for higher education near the Delhi-NCR industrial belt and the agrarian heartland.</p>
                </div>
                
                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128218; Top Courses &amp; Eligibility</h3>
                        <button class="btn-view-tab" data-target="courses">View All &#8594;</button>
                    </div>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>
                                ${coursesHtml}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="lpu-card">
                    <h3>Admissions Route</h3>
                    <p>${admissionHtml}</p>
                    <button class="btn-view-tab" data-target="admission" style="margin-top: 10px;">View Admission Process &#8594;</button>
                </div>
            </section>
            
            <!-- COURSES & FEES -->
            <section class="lpu-panel" id="panel-courses">
                <div class="lpu-card">
                    <h2>Academic Programs</h2>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>
                                ${coursesHtml}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            
            <!-- ADMISSION -->
            <section class="lpu-panel" id="panel-admission">
                <div class="lpu-card">
                    <h2>Admission Information</h2>
                    <div class="steps-list">
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / Merit</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling</h4><p>HSTES (for technical/diploma) or DHE Haryana (for degree colleges) allocation.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Verification</h4><p>Submit requisite ID proofs (PPP - Parivar Pehchan Patra is often mandatory in state colleges) and deposit fees.</p></div></div>
                    </div>
                </div>
            </section>

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Career & Placements</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>4.1 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Alumnus</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Great exposure owing to the institute's proximity to major industrial layouts in Haryana. Campus life is lively."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Campus Block</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Knowledge Resource</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Student Activity Center</span></div>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <div class="mobile-apply-bar" id="mobile-apply-bar">
        <a href="#" class="btn-lpu-apply mobile-apply-btn">Apply Now &#8594;</a>
    </div>

    <script src="${collegeSlug}.js"></script>
</body>
</html>`;
}

function processAll() {
    const newCards = [];
    let homeContent = fs.readFileSync(homeJsPath, 'utf8');

    for (const col of haryanaColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'haryana', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // Use LPU CSS as base, already fully decoupled safely
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Haryana', type: '${col.type}',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/${collegeSlug}/${collegeSlug}.html',
      rating: '4.1', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    // Inject into home.js if there are new cards
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Haryana Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Haryana Colleges to inject.`);
    }
}

processAll();
