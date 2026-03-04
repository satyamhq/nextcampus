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

const gujColleges = [
    // Top Tier
    { name: "Indian Institute of Technology Gandhinagar", abbr: "IITGN", city: "Gandhinagar", type: "Government", est: 2008, category: "Engineering" },
    { name: "Sardar Vallabhbhai National Institute of Technology Surat", abbr: "SVNIT", city: "Surat", type: "Government", est: 1961, category: "Engineering" },
    { name: "Indian Institute of Management Ahmedabad", abbr: "IIMA", city: "Ahmedabad", type: "Government", est: 1961, category: "Management" },
    { name: "Gujarat National Law University", abbr: "GNLU", city: "Gandhinagar", type: "State", est: 2003, category: "Law" },
    { name: "Nirma University", abbr: "NU", city: "Ahmedabad", type: "Private", est: 2003, category: "Engineering" },
    { name: "DA-IICT Gandhinagar", abbr: "DA-IICT", city: "Gandhinagar", type: "Private", est: 2001, category: "Engineering" },
    { name: "Pandit Deendayal Energy University", abbr: "PDEU", city: "Gandhinagar", type: "Private", est: 2007, category: "Engineering" },
    { name: "MS University of Baroda", abbr: "MSU", city: "Vadodara", type: "State", est: 1949, category: "Arts & Science" },
    { name: "LD College of Engineering", abbr: "LDCE", city: "Ahmedabad", type: "Government", est: 1948, category: "Engineering" },
    { name: "Government Engineering College Gandhinagar", abbr: "GEC Gandhinagar", city: "Gandhinagar", type: "Government", est: 2004, category: "Engineering" },

    // Engineering
    { name: "Government Engineering College Rajkot", abbr: "GEC Rajkot", city: "Rajkot", type: "Government", est: 2004, category: "Engineering" },
    { name: "Government Engineering College Bharuch", abbr: "GEC Bharuch", city: "Bharuch", type: "Government", est: 2004, category: "Engineering" },
    { name: "Government Engineering College Dahod", abbr: "GEC Dahod", city: "Dahod", type: "Government", est: 2004, category: "Engineering" },
    { name: "Government Engineering College Bhavnagar", abbr: "GEC Bhavnagar", city: "Bhavnagar", type: "Government", est: 2004, category: "Engineering" },
    { name: "Government Engineering College Patan", abbr: "GEC Patan", city: "Patan", type: "Government", est: 2004, category: "Engineering" },
    { name: "Government Engineering College Modasa", abbr: "GEC Modasa", city: "Modasa", type: "Government", est: 1984, category: "Engineering" },
    { name: "Adani Institute of Infrastructure Engineering", abbr: "AIIE", city: "Ahmedabad", type: "Private", est: 2015, category: "Engineering" },
    { name: "Silver Oak University", abbr: "SOU", city: "Ahmedabad", type: "Private", est: 2019, category: "Engineering" },
    { name: "Marwadi University", abbr: "MU", city: "Rajkot", type: "Private", est: 2016, category: "Engineering" },
    { name: "Charusat University", abbr: "CHARUSAT", city: "Anand", type: "Private", est: 2009, category: "Engineering" },

    // Medical Colleges
    { name: "B.J. Medical College Ahmedabad", abbr: "BJMC", city: "Ahmedabad", type: "Government", est: 1946, category: "Medical" },
    { name: "Government Medical College Surat", abbr: "GMC Surat", city: "Surat", type: "Government", est: 1964, category: "Medical" },
    { name: "GMERS Medical College Gandhinagar", abbr: "GMERS Gandhinagar", city: "Gandhinagar", type: "Government / Society", est: 2012, category: "Medical" },
    { name: "GMERS Medical College Sola", abbr: "GMERS Sola", city: "Ahmedabad", type: "Government / Society", est: 2011, category: "Medical" },
    { name: "Pramukhswami Medical College Karamsad", abbr: "PSMC", city: "Karamsad", type: "Private", est: 1987, category: "Medical" },
    { name: "Baroda Medical College", abbr: "BMC", city: "Vadodara", type: "Government", est: 1949, category: "Medical" },
    { name: "GMERS Medical College Gotri", abbr: "GMERS Gotri", city: "Vadodara", type: "Government / Society", est: 2011, category: "Medical" },
    { name: "GMERS Medical College Dharpur", abbr: "GMERS Dharpur", city: "Dharpur", type: "Government / Society", est: 2012, category: "Medical" },
    { name: "GMERS Medical College Himmatnagar", abbr: "GMERS Himmatnagar", city: "Himmatnagar", type: "Government / Society", est: 2015, category: "Medical" },
    { name: "GMERS Medical College Junagadh", abbr: "GMERS Junagadh", city: "Junagadh", type: "Government / Society", est: 2015, category: "Medical" },

    // Commerce / Arts / Science Colleges
    { name: "St. Xavier’s College Ahmedabad", abbr: "SXC Ahmedabad", city: "Ahmedabad", type: "Autonomous", est: 1955, category: "Arts & Science" },
    { name: "HL College of Commerce Ahmedabad", abbr: "HLCC", city: "Ahmedabad", type: "Aided", est: 1936, category: "Arts & Science" },
    { name: "Gujarat Arts & Science College", abbr: "GASC", city: "Ahmedabad", type: "Government", est: 1860, category: "Arts & Science" },
    { name: "GLS University Ahmedabad", abbr: "GLSU", city: "Ahmedabad", type: "Private", est: 2015, category: "Arts & Science" },
    { name: "H.A. College of Commerce", abbr: "HACC", city: "Ahmedabad", type: "Private", est: 1956, category: "Arts & Science" },
    { name: "Navrachana University Vadodara", abbr: "NUV", city: "Vadodara", type: "Private", est: 2009, category: "Arts & Science" },
    { name: "Sardar Patel University Anand", abbr: "SPU", city: "Anand", type: "State", est: 1955, category: "Arts & Science" },
    { name: "Veer Narmad South Gujarat University", abbr: "VNSGU", city: "Surat", type: "State", est: 1965, category: "Arts & Science" },
    { name: "Saurashtra University", abbr: "SU", city: "Rajkot", type: "State", est: 1967, category: "Arts & Science" },
    { name: "Gujarat University", abbr: "GU", city: "Ahmedabad", type: "State", est: 1949, category: "Arts & Science" },

    // Management Colleges
    { name: "MICA Ahmedabad", abbr: "MICA", city: "Ahmedabad", type: "Autonomous", est: 1991, category: "Management" },
    { name: "Institute of Rural Management Anand", abbr: "IRMA", city: "Anand", type: "Autonomous", est: 1979, category: "Management" },
    { name: "Nirma Institute of Management", abbr: "IMNU", city: "Ahmedabad", type: "Private", est: 1996, category: "Management" },
    { name: "Entrepreneurship Development Institute of India", abbr: "EDII", city: "Gandhinagar", type: "Autonomous", est: 1983, category: "Management" },
    { name: "ICFAI Business School Ahmedabad", abbr: "IBS Ahmedabad", city: "Ahmedabad", type: "Private", est: 1995, category: "Management" },

    // Pharmacy Colleges
    { name: "L.M. College of Pharmacy Ahmedabad", abbr: "LMCP", city: "Ahmedabad", type: "Private", est: 1947, category: "Medical" },
    { name: "K.B. Institute of Pharmaceutical Education", abbr: "KBIPER", city: "Gandhinagar", type: "Private", est: 1995, category: "Medical" },
    { name: "Nirma Institute of Pharmacy", abbr: "IPNU", city: "Ahmedabad", type: "Private", est: 2003, category: "Medical" },
    { name: "Charotar University Pharmacy College", abbr: "RPCP", city: "Anand", type: "Private", est: 2004, category: "Medical" },
    { name: "Indukaka Ipcowala College of Pharmacy", abbr: "IICP", city: "Anand", type: "Private", est: 2004, category: "Medical" },

    // More Engineering / Private Colleges
    { name: "Ahmedabad Institute of Technology", abbr: "AIT", city: "Ahmedabad", type: "Private", est: 2004, category: "Engineering" },
    { name: "Vishwakarma Government Engineering College", abbr: "VGEC", city: "Ahmedabad", type: "Government", est: 1994, category: "Engineering" },
    { name: "SAL Institute of Technology", abbr: "SAL", city: "Ahmedabad", type: "Private", est: 2009, category: "Engineering" },
    { name: "LJ Institute of Engineering & Technology", abbr: "LJIET", city: "Ahmedabad", type: "Private", est: 2007, category: "Engineering" },
    { name: "Alpha College of Engineering", abbr: "ACE", city: "Gandhinagar", type: "Private", est: 2009, category: "Engineering" },
    { name: "GIT College Rajkot", abbr: "GIT", city: "Rajkot", type: "Private", est: 2006, category: "Engineering" },
    { name: "Noble Engineering College Junagadh", abbr: "NTC", city: "Junagadh", type: "Private", est: 2007, category: "Engineering" },
    { name: "Darshan Institute of Engineering Rajkot", abbr: "DIET", city: "Rajkot", type: "Private", est: 2009, category: "Engineering" },
    { name: "BVM Engineering College Anand", abbr: "BVM", city: "Anand", type: "Government Aided", est: 1948, category: "Engineering" },
    { name: "Parul University Vadodara", abbr: "PU", city: "Vadodara", type: "Private", est: 2015, category: "Engineering" },

    // Other Colleges
    { name: "Ganpat University", abbr: "GUNI", city: "Mehsana", type: "Private", est: 2005, category: "Engineering" },
    { name: "Calorx Teachers University", abbr: "CTU", city: "Ahmedabad", type: "Private", est: 2009, category: "Arts & Science" },
    { name: "Indus University", abbr: "IU", city: "Ahmedabad", type: "Private", est: 2012, category: "Engineering" },
    { name: "RK University Rajkot", abbr: "RKU", city: "Rajkot", type: "Private", est: 2011, category: "Engineering" },
    { name: "ITM Vocational University", abbr: "ITMVU", city: "Vadodara", type: "Private", est: 2014, category: "Engineering" },
    { name: "Shree Swaminarayan Institute of Technology", abbr: "SSIT", city: "Gandhinagar", type: "Private", est: 2001, category: "Engineering" },
    { name: "Rai University Ahmedabad", abbr: "RU", city: "Ahmedabad", type: "Private", est: 2012, category: "Engineering" },
    { name: "Swarnim Startup University", abbr: "SSIU", city: "Gandhinagar", type: "Private", est: 2017, category: "Engineering" },
    { name: "Uka Tarsadia University", abbr: "UTU", city: "Bardoli", type: "Private", est: 2011, category: "Engineering" },
    { name: "Navsari Agricultural University", abbr: "NAU", city: "Navsari", type: "State", est: 2004, category: "Agriculture" },

    // Remaining Colleges
    { name: "Junagadh Agricultural University", abbr: "JAU", city: "Junagadh", type: "State", est: 2004, category: "Agriculture" },
    { name: "Anand Agricultural University", abbr: "AAU", city: "Anand", type: "State", est: 2004, category: "Agriculture" },
    { name: "Kamdhenu University", abbr: "KU", city: "Gandhinagar", type: "State", est: 2009, category: "Agriculture" },
    { name: "Children’s University Gandhinagar", abbr: "CU", city: "Gandhinagar", type: "State", est: 2009, category: "Arts & Science" },
    { name: "Gujarat Forensic Sciences University", abbr: "GFSU", city: "Gandhinagar", type: "State", est: 2008, category: "Arts & Science" }, // Now NFSU
    { name: "Gujarat Maritime University", abbr: "GMU", city: "Gandhinagar", type: "State", est: 2017, category: "Arts & Science" },
    { name: "GLS Institute of Business Administration", abbr: "GLSIBA", city: "Ahmedabad", type: "Private", est: 1999, category: "Management" },
    { name: "HL Institute of Computer Applications", abbr: "HLICA", city: "Ahmedabad", type: "Private", est: 1999, category: "Engineering" },
    { name: "LDRP Institute of Technology", abbr: "LDRP", city: "Gandhinagar", type: "Private", est: 2005, category: "Engineering" },
    { name: "SAL College of Engineering", abbr: "SALCE", city: "Ahmedabad", type: "Private", est: 2012, category: "Engineering" },

    // Final Colleges
    { name: "Ahmedabad University", abbr: "AU", city: "Ahmedabad", type: "Private", est: 2009, category: "Arts & Science" },
    { name: "Atmiya University Rajkot", abbr: "AU Rajkot", city: "Rajkot", type: "Private", est: 2018, category: "Engineering" },
    { name: "Sabarmati University", abbr: "SU", city: "Ahmedabad", type: "Private", est: 2009, category: "Arts & Science" },
    { name: "Som Lalit Institute of Business Administration", abbr: "SLIBA", city: "Ahmedabad", type: "Private", est: 1996, category: "Management" },
    { name: "Gujarat Technological University Colleges", abbr: "GTU", city: "Ahmedabad", type: "State", est: 2007, category: "Engineering" },
    { name: "Faculty of Technology MSU Baroda", abbr: "FTE MSU", city: "Vadodara", type: "State", est: 1890, category: "Engineering" },
    { name: "PDPU School of Technology", abbr: "SOT PDEU", city: "Gandhinagar", type: "Private", est: 2010, category: "Engineering" },
    { name: "Institute of Management Nirma University", abbr: "IMNU", city: "Ahmedabad", type: "Private", est: 1996, category: "Management" }, // Dupe check will skip
    { name: "Silver Oak Institute of Management", abbr: "SOIM", city: "Ahmedabad", type: "Private", est: 2019, category: "Management" },
    { name: "Parul Institute of Engineering", abbr: "PIET", city: "Vadodara", type: "Private", est: 2003, category: "Engineering" },

    // Final 10
    { name: "A.D. Patel Institute of Technology", abbr: "ADIT", city: "Anand", type: "Private", est: 2000, category: "Engineering" },
    { name: "Sankalchand Patel University", abbr: "SPU Visnagar", city: "Visnagar", type: "Private", est: 2016, category: "Engineering" },
    { name: "LDRP Institute of Technology & Research", abbr: "LDRP-ITR", city: "Gandhinagar", type: "Private", est: 2005, category: "Engineering" },
    { name: "S.S. Agrawal Institute of Engineering", abbr: "SSAIT", city: "Navsari", type: "Private", est: 2004, category: "Engineering" },
    { name: "Government Polytechnic Ahmedabad", abbr: "GP Ahmedabad", city: "Ahmedabad", type: "Government", est: 1957, category: "Engineering" },
    { name: "Government Polytechnic Surat", abbr: "GP Surat", city: "Surat", type: "Government", est: 1965, category: "Engineering" },
    { name: "Government Polytechnic Rajkot", abbr: "GP Rajkot", city: "Rajkot", type: "Government", est: 1964, category: "Engineering" },
    { name: "Government Polytechnic Vadodara", abbr: "GP Vadodara", city: "Vadodara", type: "Government", est: 1957, category: "Engineering" },
    { name: "Government Polytechnic Gandhinagar", abbr: "GP Gandhinagar", city: "Gandhinagar", type: "Government", est: 2004, category: "Engineering" },
    { name: "Government Polytechnic Bhavnagar", abbr: "GP Bhavnagar", city: "Bhavnagar", type: "Government", est: 1949, category: "Engineering" }
];


function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";
    let rankStr = "Top Ranking Institute";

    if (col.type === "Government") {
        rankStr = "State / Central Government Institue";
    } else if (col.type === "Private") {
        rankStr = "Top Private Institution";
    }

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B930K — \u20B915L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B960K — \u20B925L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions managed by ACPUGMEC (Admission Committee for Professional Under Graduate Medical Educational Courses) based strictly on NEET scores.";
        if (col.abbr.includes("LMCP") || col.category === "Pharmacy") {
            coursesHtml = `<tr><td><strong>B.Pharm</strong></td><td>4 Years</td><td>\u20B940K — \u20B92.5L</td><td>10+2 + GUJCET/NEET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                       <tr><td><strong>Pharm.D.</strong></td><td>6 Years</td><td>\u20B91.5L — \u20B94L</td><td>10+2 + Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
            admissionHtml = "Through ACPC based on GUJCET and Class 12th marks.";
        }
        placementInfo = "Mandatory 1-year internship. GMERS hospitals provide excellent clinical exposure in civil hospitals.";
    } else if (col.category === 'Engineering') {
        let isNational = col.abbr === "IITGN" || col.abbr === "SVNIT" || col.abbr === "DA-IICT";
        coursesHtml = `<tr><td><strong>B.Tech / B.E.</strong></td><td>4 Years</td><td>\u20B9${isNational ? '5L' : '2L'} — \u20B9${isNational ? '12L' : '8L'}</td><td>10+2 PCM + ${isNational ? 'JEE Main/Adv' : 'GUJCET / JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91L — \u20B93L</td><td>B.Tech + GATE/PGCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isNational ? "Admissions mostly through JoSAA based on JEE Advanced or DA-IICT's separate JEE Main quota." : "50% state quota via ACPC based on GUJCET and board marks. Rest via Management and NRI quotas.";
        placementInfo = "Strong industrial corridor placement in chemicals, diamond, textile, and IT. DA-IICT & Nirma consistently fetch high average packages.";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B93L — \u20B925L</td><td>Graduation + CAT/CMAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA</strong></td><td>3 Years</td><td>\u20B91L — \u20B95L</td><td>10+2 + Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === 'IIMA' || col.abbr === 'MICA' || col.abbr === 'IRMA' ? "Own respective highly competitive entrance exams (CAT, MICAT) followed by GE-PI." : "Through ACPC for government seats based on CMAT.";
        placementInfo = "The Management circuit in Ahmedabad/Anand is globally reputed. Top consulting, FMCG, and rural management roles.";
    } else if (col.category === 'Agriculture') {
        coursesHtml = `<tr><td><strong>B.Sc (Hons.) Agriculture</strong></td><td>4 Years</td><td>\u20B950K — \u20B91.5L</td><td>10+2 Science + GUJCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>B.Tech (Agricultural Engg)</strong></td><td>4 Years</td><td>\u20B980K — \u20B92L</td><td>10+2 PCM + GUJCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Centralized admission by Gujarat State Agricultural Universities Common Admission setup.";
        placementInfo = "Strong government and private agro-industry placements.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com (Hons)</strong></td><td>3-4 Years</td><td>\u20B95K — \u20B950K</td><td>10+2 Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B910K — \u20B960K</td><td>Bachelor's Degree + Entrance/Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Online centralized admission system primarily driven by merit lists of 12th board examinations.";
        placementInfo = "Prepares students well for civil services (GPSC), CA/CS, and specialized higher education.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const feesSectionHtml = col.category !== 'Medical' ? `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Details about the fee structure and crucial Gujarat state specific aid.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>MYSY (Mukhyamantri Yuva Swavalamban Yojana)</h4><p>Provides major financial assistance and tuition fee waivers to meritorious students from economically weaker sections irrespective of category.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>Free Ship Card</h4><p>Total fee waivers exclusively for SC/ST/NTDNT students studying in self-financed colleges.</p></div>
                    </div>
                </div>
            </section>
  ` : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, GUJCET 2025, ACPC, Gujarat colleges, NextCampus">
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
      "url": "https://nextcampus.com/colleges/gujarat/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/gujarat/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Gujarat</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Gujarat, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.2</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${col.type}</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">&#127942; ${rankStr}</span>
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
                    <p>${col.name} (${col.abbr}) is a landmark educational institution situated in ${col.city}, Gujarat. Established in ${col.est}, it has deeply influenced the educational and industrial landscape of western India, and continues to produce thought leaders across various disciplines under the active academic guidance of the Gujarat Government and relevant councils.</p>
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
            
            <!-- COURSES -->
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Exam / Board Merit</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling Process</h4><p>ACPC (Admission Committee for Professional Courses) Gujarat manages the centralized allocations.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Pay token fee online, generate admission slip and verify original documents containing Gujarat domicile proofs (for state quota).</p></div></div>
                    </div>
                </div>
            </section>
            
            <!-- FEES -->
            ${feesSectionHtml}

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>${col.category === 'Medical' || col.category === 'Dental' ? 'Internships & Residency' : 'Placements & Internships'}</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>4.2 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Student</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Great faculty and industry connection in Gujarat. The government subsidies (MYSY) make the ROI incredible."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Academic Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Central Library</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Canteen & Hostels</span></div>
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

const sharedDir = path.join(__dirname, 'frontend', 'shared');
const sharedCSS = [
    fs.readFileSync(path.join(sharedDir, 'global.css'), 'utf8'),
    fs.readFileSync(path.join(sharedDir, 'header.css'), 'utf8'),
    fs.readFileSync(path.join(sharedDir, 'footer.css'), 'utf8'),
    fs.readFileSync(path.join(sharedDir, 'college.css'), 'utf8')
].join('\\n\\n/* --- END SHARED --- */\\n\\n');

function processAll() {
    const newCards = [];
    let homeContent = fs.readFileSync(homeJsPath, 'utf8');

    for (const col of gujColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'gujarat', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        newCards.push(`    {
      name: '\${col.name.replace(/'/g, "\\\\'")}',
      city: '\${col.city}', state: 'Gujarat', type: '\${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/\${collegeSlug}/\${collegeSlug}.html',
      rating: '4.2', accr: '\${col.type}'
    }`);
        console.log(`Generated: \${col.name} (\${collegeSlug})`);
    }

    // Inject into home.js if there are new cards
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\\n" + newCards.join(",\\n") + ",\\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\\n✅ Injected \${newCards.length} Gujarat Colleges into home.js !`);
        } else {
            console.log("\\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\\n❌ No new Gujarat Colleges to inject.`);
    }
}

processAll();
