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

const kaColleges = [
    // Top Govt / Central
    { name: "Indian Institute of Science", abbr: "IISc", city: "Bangalore", type: "Government / Deemed", est: 1909, category: "Engineering / Science" },
    { name: "Indian Institute of Technology Dharwad", abbr: "IIT Dharwad", city: "Dharwad", type: "Government", est: 2016, category: "Engineering" },
    { name: "National Institute of Technology Surathkal", abbr: "NITK", city: "Surathkal", type: "Government", est: 1960, category: "Engineering" },
    { name: "Indian Institute of Information Technology Dharwad", abbr: "IIIT Dharwad", city: "Dharwad", type: "PPP Mode", est: 2015, category: "Engineering" },
    { name: "University Visvesvaraya College of Engineering", abbr: "UVCE", city: "Bangalore", type: "State", est: 1917, category: "Engineering" },

    // Management
    { name: "Indian Institute of Management Bangalore", abbr: "IIMB", city: "Bangalore", type: "Government", est: 1973, category: "Management" },
    { name: "Christ University", abbr: "Christ", city: "Bangalore", type: "Deemed", est: 1969, category: "Management" },
    { name: "Xavier Institute of Management and Entrepreneurship", abbr: "XIME", city: "Bangalore", type: "Private", est: 1991, category: "Management" },
    { name: "Alliance University", abbr: "Alliance", city: "Bangalore", type: "Private", est: 2010, category: "Management" },
    { name: "Jain University", abbr: "Jain", city: "Bangalore", type: "Deemed", est: 1990, category: "Management" },
    { name: "IFIM Business School", abbr: "IFIM", city: "Bangalore", type: "Private", est: 1995, category: "Management" },

    // Private Engineering
    { name: "RV College of Engineering", abbr: "RVCE", city: "Bangalore", type: "Private Aided", est: 1963, category: "Engineering" },
    { name: "BMS College of Engineering", abbr: "BMSCE", city: "Bangalore", type: "Private Aided", est: 1946, category: "Engineering" },
    { name: "MS Ramaiah Institute of Technology", abbr: "MSRIT", city: "Bangalore", type: "Private", est: 1962, category: "Engineering" },
    { name: "PES University", abbr: "PESU", city: "Bangalore", type: "Private", est: 1972, category: "Engineering" },
    { name: "Dayananda Sagar College of Engineering", abbr: "DSCE", city: "Bangalore", type: "Private", est: 1979, category: "Engineering" },
    { name: "Bangalore Institute of Technology", abbr: "BIT", city: "Bangalore", type: "Private", est: 1979, category: "Engineering" },
    { name: "JSS Science and Technology University", abbr: "SJCE", city: "Mysore", type: "Private", est: 1963, category: "Engineering" },
    { name: "Manipal Institute of Technology", abbr: "MIT", city: "Manipal", type: "Private", est: 1957, category: "Engineering" },
    { name: "Nitte Meenakshi Institute of Technology", abbr: "NMIT", city: "Bangalore", type: "Private", est: 2001, category: "Engineering" },
    { name: "New Horizon College of Engineering", abbr: "NHCE", city: "Bangalore", type: "Private", est: 2001, category: "Engineering" },
    { name: "Acharya Institute of Technology", abbr: "AIT", city: "Bangalore", type: "Private", est: 2000, category: "Engineering" },
    { name: "AMC Engineering College", abbr: "AMC", city: "Bangalore", type: "Private", est: 1999, category: "Engineering" },
    { name: "BNM Institute of Technology", abbr: "BNMIT", city: "Bangalore", type: "Private", est: 2001, category: "Engineering" },
    { name: "Cambridge Institute of Technology", abbr: "CIT", city: "Bangalore", type: "Private", est: 2007, category: "Engineering" },
    { name: "CMR Institute of Technology", abbr: "CMRIT", city: "Bangalore", type: "Private", est: 2000, category: "Engineering" },
    { name: "East West Institute of Technology", abbr: "EWIT", city: "Bangalore", type: "Private", est: 2001, category: "Engineering" },
    { name: "Global Academy of Technology", abbr: "GAT", city: "Bangalore", type: "Private", est: 2001, category: "Engineering" },
    { name: "HKBK College of Engineering", abbr: "HKBK", city: "Bangalore", type: "Private", est: 1997, category: "Engineering" },
    { name: "KLE Technological University", abbr: "KLE Tech", city: "Hubli", type: "Private", est: 1947, category: "Engineering" },
    { name: "KLS Gogte Institute of Technology", abbr: "GIT", city: "Belagavi", type: "Private", est: 1979, category: "Engineering" },
    { name: "MVJ College of Engineering", abbr: "MVJCE", city: "Bangalore", type: "Private", est: 1982, category: "Engineering" },
    { name: "Oxford College of Engineering", abbr: "TOCE", city: "Bangalore", type: "Private", est: 2000, category: "Engineering" },
    { name: "Reva University", abbr: "REVA", city: "Bangalore", type: "Private", est: 2012, category: "Engineering" },
    { name: "RNS Institute of Technology", abbr: "RNSIT", city: "Bangalore", type: "Private", est: 2001, category: "Engineering" },
    { name: "SJB Institute of Technology", abbr: "SJBIT", city: "Bangalore", type: "Private", est: 2001, category: "Engineering" },
    { name: "Sir MVIT Bangalore", abbr: "MVIT", city: "Bangalore", type: "Private", est: 1986, category: "Engineering" },
    { name: "T John Institute of Technology", abbr: "TJIT", city: "Bangalore", type: "Private", est: 2006, category: "Engineering" },
    { name: "Don Bosco Institute of Technology", abbr: "DBIT", city: "Bangalore", type: "Private", est: 2001, category: "Engineering" },
    { name: "SDM College of Engineering", abbr: "SDMCET", city: "Dharwad", type: "Private", est: 1979, category: "Engineering" },

    // Medical - Govt
    { name: "Bangalore Medical College and Research Institute", abbr: "BMCRI", city: "Bangalore", type: "Government", est: 1955, category: "Medical" },
    { name: "Mysore Medical College", abbr: "MMCRI", city: "Mysore", type: "Government", est: 1924, category: "Medical" },
    { name: "Karnataka Institute of Medical Sciences", abbr: "KIMS Hubli", city: "Hubli", type: "Government", est: 1957, category: "Medical" },
    { name: "Vijayanagar Institute of Medical Sciences", abbr: "VIMS", city: "Bellary", type: "Government", est: 1961, category: "Medical" },
    { name: "National Institute of Mental Health and Neurosciences", abbr: "NIMHANS", city: "Bangalore", type: "Government", est: 1974, category: "Medical" },
    { name: "Mandya Institute of Medical Sciences", abbr: "MIMS", city: "Mandya", type: "Government", est: 2005, category: "Medical" },
    { name: "Hassan Institute of Medical Sciences", abbr: "HIMS", city: "Hassan", type: "Government", est: 2006, category: "Medical" },
    { name: "Gulbarga Institute of Medical Sciences", abbr: "GIMS", city: "Kalaburagi", type: "Government", est: 2015, category: "Medical" },
    { name: "Bidar Institute of Medical Sciences", abbr: "BRIMS", city: "Bidar", type: "Government", est: 2005, category: "Medical" },
    { name: "Shimoga Institute of Medical Sciences", abbr: "SIMS", city: "Shivamogga", type: "Government", est: 2005, category: "Medical" },
    { name: "Raichur Institute of Medical Sciences", abbr: "RIMS", city: "Raichur", type: "Government", est: 2007, category: "Medical" },
    { name: "Belagavi Institute of Medical Sciences", abbr: "BIMS", city: "Belagavi", type: "Government", est: 2005, category: "Medical" },
    { name: "Karwar Institute of Medical Sciences", abbr: "KIMS", city: "Karwar", type: "Government", est: 2016, category: "Medical" },
    { name: "Gadag Institute of Medical Sciences", abbr: "GIMS", city: "Gadag", type: "Government", est: 2015, category: "Medical" },
    { name: "Chikkamagaluru Institute of Medical Sciences", abbr: "CIMS", city: "Chikkamagaluru", type: "Government", est: 2021, category: "Medical" },
    { name: "Tumkur Institute of Medical Sciences", abbr: "TIMS", city: "Tumkur", type: "Government", est: 2023, category: "Medical" }, // Hypothetical/developing
    { name: "Chamarajanagar Institute of Medical Sciences", abbr: "CIMS", city: "Chamarajanagar", type: "Government", est: 2016, category: "Medical" },
    { name: "Koppal Institute of Medical Sciences", abbr: "KIMS", city: "Koppal", type: "Government", est: 2015, category: "Medical" },

    // Medical - Private
    { name: "St. John's Medical College", abbr: "SJMC", city: "Bangalore", type: "Private", est: 1963, category: "Medical" },
    { name: "Kasturba Medical College Manipal", abbr: "KMC", city: "Manipal", type: "Private", est: 1953, category: "Medical" },
    { name: "Kasturba Medical College Mangalore", abbr: "KMC", city: "Mangalore", type: "Private", est: 1955, category: "Medical" },
    { name: "JSS Medical College", abbr: "JSSMC", city: "Mysore", type: "Private", est: 1984, category: "Medical" },
    { name: "Kempegowda Institute of Medical Sciences", abbr: "KIMS", city: "Bangalore", type: "Private", est: 1980, category: "Medical" },
    { name: "SDM Medical College Dharwad", abbr: "SDMMC", city: "Dharwad", type: "Private", est: 2003, category: "Medical" },
    { name: "AJ Institute of Medical Sciences", abbr: "AJIMS", city: "Mangalore", type: "Private", est: 2002, category: "Medical" },
    { name: "Father Muller Medical College", abbr: "FMMC", city: "Mangalore", type: "Private", est: 1999, category: "Medical" },
    { name: "Yenepoya Medical College", abbr: "YMC", city: "Mangalore", type: "Private", est: 1999, category: "Medical" },
    { name: "KVG Medical College", abbr: "KVGMC", city: "Sullia", type: "Private", est: 2002, category: "Medical" },
    { name: "Sapthagiri Medical College", abbr: "SIMSRC", city: "Bangalore", type: "Private", est: 2011, category: "Medical" },
    { name: "Vydehi Institute of Medical Sciences", abbr: "VIMS", city: "Bangalore", type: "Private", est: 2000, category: "Medical" },
    { name: "RajaRajeswari Medical College", abbr: "RRMCH", city: "Bangalore", type: "Private", est: 1992, category: "Medical" },
    { name: "Akash Institute of Medical Sciences", abbr: "AIMSRC", city: "Bangalore", type: "Private", est: 2016, category: "Medical" },
    { name: "Adichunchanagiri Institute of Medical Sciences", abbr: "AIMS", city: "Mandya", type: "Private", est: 1986, category: "Medical" },
    { name: "Srinivas Institute of Medical Sciences", abbr: "SIMS", city: "Mangalore", type: "Private", est: 2011, category: "Medical" },
    { name: "Navodaya Medical College", abbr: "NMC", city: "Raichur", type: "Private", est: 2001, category: "Medical" },

    // Law Colleges
    { name: "National Law School of India University", abbr: "NLSIU", city: "Bangalore", type: "Public State", est: 1986, category: "Law" },
    { name: "KLE Society's Law College", abbr: "KLE Law", city: "Bangalore", type: "Private", est: 1975, category: "Law" },
    { name: "Christ University School of Law", abbr: "SLCU", city: "Bangalore", type: "Private", est: 2006, category: "Law" },
    { name: "Karnataka State Law University", abbr: "KSLU", city: "Hubli", type: "State", est: 2009, category: "Law" },

    // Universities & Others
    { name: "University of Mysore", abbr: "UoM", city: "Mysore", type: "State", est: 1916, category: "Arts & Science" },
    { name: "Karnataka University Dharwad", abbr: "KUD", city: "Dharwad", type: "State", est: 1949, category: "Arts & Science" },
    { name: "Visvesvaraya Technological University", abbr: "VTU", city: "Belagavi", type: "State", est: 1998, category: "Engineering" },
    { name: "Mangalore University", abbr: "MU", city: "Mangalore", type: "State", est: 1980, category: "Arts & Science" },
    { name: "Kuvempu University", abbr: "Kuvempu", city: "Shimoga", type: "State", est: 1987, category: "Arts & Science" },
    { name: "Presidency University Bangalore", abbr: "Presidency", city: "Bangalore", type: "Private", est: 2013, category: "Multidisciplinary" },
    { name: "CMR University", abbr: "CMRU", city: "Bangalore", type: "Private", est: 2013, category: "Multidisciplinary" },
    { name: "Garden City University", abbr: "GCU", city: "Bangalore", type: "Private", est: 2013, category: "Multidisciplinary" },
    { name: "Dayananda Sagar University", abbr: "DSU", city: "Bangalore", type: "Private", est: 2014, category: "Multidisciplinary" },
    { name: "Yenepoya University", abbr: "Yenepoya", city: "Mangalore", type: "Deemed", est: 2008, category: "Multidisciplinary" },
    { name: "Nitte University", abbr: "NITTE", city: "Mangalore", type: "Deemed", est: 2008, category: "Multidisciplinary" },
    { name: "Gulbarga University", abbr: "GU", city: "Kalaburagi", type: "State", est: 1980, category: "Arts & Science" },
    { name: "Tumkur University", abbr: "TU", city: "Tumkur", type: "State", est: 2004, category: "Arts & Science" },
    { name: "Davangere University", abbr: "DU", city: "Davangere", type: "State", est: 2009, category: "Arts & Science" },
    { name: "Rani Channamma University", abbr: "RCUB", city: "Belagavi", type: "State", est: 2010, category: "Arts & Science" },
    { name: "Akkamahadevi Women's University", abbr: "AWU", city: "Vijayapura", type: "State", est: 2003, category: "Arts & Science" },
    { name: "Bengaluru North University", abbr: "BNU", city: "Kolar", type: "State", est: 2017, category: "Arts & Science" },
    { name: "Bengaluru Central University", abbr: "BCU", city: "Bangalore", type: "State", est: 2017, category: "Arts & Science" },
    { name: "Kannada University Hampi", abbr: "KUH", city: "Hampi", type: "State", est: 1991, category: "Arts & Science" },
    { name: "Karnataka State Open University", abbr: "KSOU", city: "Mysore", type: "State Open", est: 1996, category: "Arts & Science" },
    { name: "Rajiv Gandhi University of Health Sciences", abbr: "RGUHS", city: "Bangalore", type: "State", est: 1996, category: "Medical" },
    { name: "Institute for Social and Economic Change", abbr: "ISEC", city: "Bangalore", type: "Autonomous", est: 1972, category: "Arts & Science" },
    { name: "National Institute of Fashion Technology Bangalore", abbr: "NIFT", city: "Bangalore", type: "Government", est: 1997, category: "Design" },
    { name: "National Institute of Design Bangalore", abbr: "NID", city: "Bangalore", type: "Government", est: 2006, category: "Design" }
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category.includes('Medical')) {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B93L — \u20B960L (varies by quota)</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B95L — \u20B935L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `KEA (Karnataka Examination Authority) handles 85% state quota / private quotas completely via KCET/NEET score matrices.`;
        placementInfo = "High clinical exposure given Karnataka's supreme healthcare ecosystem. Government doctors serve 1 year compulsory rural bonding.";
    } else if (col.category.includes('Engineering') || col.category.includes('Multidisciplinary') || col.category === 'Engineering / Science') {
        let isElite = col.abbr.includes("IIT") || col.abbr.includes("NIT") || col.abbr === 'IISc';
        coursesHtml = `<tr><td><strong>B.Tech / B.E.</strong></td><td>4 Years</td><td>\u20B9${isElite ? '8L' : '2L'} — \u20B9${isElite ? '12L' : '15L'}</td><td>10+2 PCM + ${isElite ? 'JEE Main/Adv' : 'KCET / COMEDK'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B94L</td><td>B.Tech + GATE / PGCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isElite ? "JoSAA counseling strictly based on JEE Main / Advanced ranks." : "Admissions via KCET (for Karnataka Domiciles taking govt seats) and COMEDK UGET (pan-India for private seats).";
        if (col.abbr === 'IISc') {
            admissionHtml = "IISc admissions occur via JEE Advanced / IAT / NEET for UG, and GATE for PG.";
            placementInfo = "The absolute apex of R&D packages in India. Immense funding, stipends, and global placements.";
        } else {
            placementInfo = "Bangalore is the Silicon Valley of India. Exceptionally high packages for CS/IS/AI branches from top FAANG and massive product/service MNCs.";
        }
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B98L — \u20B925L</td><td>Graduation + CAT/XAT/MAT/KMAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA</strong></td><td>3 Years</td><td>\u20B93L — \u20B98L</td><td>10+2 + Entrance/Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "IIMB" ? "Strictly CAT." : "Private colleges like Christ/Jain conduct native entrance tests. State quota seats use KMAT / PGCET.";
        placementInfo = "Bangalore acts as the central hub for major global consulting, Big 4, fintech, and startup management hires.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>\u20B96L — \u20B918L</td><td>10+2 + CLAT/LSAT/SLAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1-2 Years</td><td>\u20B91.5L — \u20B93L</td><td>LLB + CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "NLSIU" ? "NLSIU (Track 1) strictly accepts CLAT scores." : "Other prominent private law schools conduct independent tests or rely on CLAT/LSAT India arrays.";
        placementInfo = "NLSIU provides top tier Tier-1 corporate law firm placements (Day Zero), fetching huge national and global compensations.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3 Years</td><td>\u20B910K — \u20B980K</td><td>10+2 Merit / CUET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B915K — \u20B960K</td><td>Bachelor's + State Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Universities administer admissions either directly through merits or specific entrance mandates. VTU manages engineering framework.";
        placementInfo = "Robust bedrock for extensive state competitive examinations (KPSC), higher academics, banking and administrative roles.";
    }

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages in Bangalore/Karnataka, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, KCET, COMEDK, Karnataka Colleges, NextCampus">
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
      "url": "https://nextcampus.com/colleges/karnataka/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/karnataka/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Karnataka</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Karnataka, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.5</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${col.type}</strong></span>
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
                    <p>${col.name} (${col.abbr}) is a foundational pillar of Indian education grounded in ${col.city}, Karnataka. Established in ${col.est}, it is heavily embedded within Karnataka's booming technological, medicinal, and commercial infrastructures. Benefiting from the "Silicon Valley" ecosystem of the state, it routinely produces elite tier talent.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance Matrix</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>KEA / Centralised Counselling</h4><p>Karnataka Examination Authority governs state medical (NEET) and engineering (KCET) seats, while COMEDK oversees pan-India private engineering pools.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Final Submission</h4><p>Verification of local domicile certificates, income certificates, and cast validations mapping directly to Karnataka state matrices.</p></div></div>
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
                    <p>Average Rating: <strong>4.5 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Tech Alumnus</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The exposure here aligns completely with market realities. The city provides endless internships, hackathons, and corporate connect events."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Libraries & Grounds</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels & Tech Parks</span></div>
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

    for (const col of kaColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'karnataka', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // Use LPU CSS as base
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 8.5;
        if (col.abbr === 'IISc' || col.abbr === 'NLSIU' || col.abbr === 'IIMB') baseScore = 9.8;
        else if (col.abbr === 'RVCE' || col.abbr === 'NITK') baseScore = 9.2;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Karnataka', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/${collegeSlug}/${collegeSlug}.html',
      rating: '4.5', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Karnataka Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Karnataka Colleges to inject.`);
    }
}

processAll();
