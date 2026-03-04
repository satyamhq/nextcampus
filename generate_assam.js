const fs = require('fs');
const path = require('path');
const { getTabsHtml, getJsContent, getFullCss } = require('./gen_utils.js');

const basePath = path.join(__dirname, 'frontend', 'colleges');
const homeJsPath = path.join(__dirname, 'frontend', 'home', 'home.js');

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

const asColleges = [
    // National Institutes & Universities
    { name: "Indian Institute of Technology Guwahati", abbr: "IIT Guwahati", city: "Guwahati", type: "Government", est: 1994, category: "Engineering" },
    { name: "National Institute of Technology Silchar", abbr: "NIT Silchar", city: "Silchar", type: "Government", est: 1967, category: "Engineering" },
    { name: "Indian Institute of Information Technology Guwahati", abbr: "IIIT Guwahati", city: "Guwahati", type: "Government", est: 2013, category: "Engineering" },
    { name: "AIIMS Guwahati", abbr: "AIIMS Guwahati", city: "Guwahati", type: "INI", est: 2021, category: "Medical" },
    { name: "Tezpur University", abbr: "TU", city: "Tezpur", type: "Central", est: 1994, category: "Multidisciplinary" },
    { name: "Assam University", abbr: "AU", city: "Silchar", type: "Central", est: 1994, category: "Multidisciplinary" },
    { name: "Gauhati University", abbr: "GU", city: "Guwahati", type: "State", est: 1948, category: "Multidisciplinary" },
    { name: "Dibrugarh University", abbr: "DU", city: "Dibrugarh", type: "State", est: 1965, category: "Multidisciplinary" },
    { name: "Assam Agricultural University", abbr: "AAU", city: "Jorhat", type: "State", est: 1969, category: "Arts & Science" },
    { name: "Bodoland University", abbr: "BU", city: "Kokrajhar", type: "State", est: 2009, category: "Multidisciplinary" },

    // Top Government Colleges (Medical)
    { name: "Assam Medical College Dibrugarh", abbr: "AMC Dibrugarh", city: "Dibrugarh", type: "State", est: 1947, category: "Medical" },
    { name: "Gauhati Medical College", abbr: "GMC Guwahati", city: "Guwahati", type: "State", est: 1960, category: "Medical" },
    { name: "Silchar Medical College", abbr: "SMC", city: "Silchar", type: "State", est: 1968, category: "Medical" },
    { name: "Jorhat Medical College", abbr: "JMCH", city: "Jorhat", type: "State", est: 2009, category: "Medical" },
    { name: "Fakhruddin Ali Ahmed Medical College", abbr: "FAAMC", city: "Barpeta", type: "State", est: 2012, category: "Medical" },

    // Top Government Colleges (Engineering)
    { name: "Assam Engineering College", abbr: "AEC", city: "Guwahati", type: "State", est: 1955, category: "Engineering" },
    { name: "Jorhat Engineering College", abbr: "JEC", city: "Jorhat", type: "State", est: 1960, category: "Engineering" },
    { name: "Bineswar Brahma Engineering College", abbr: "BBEC", city: "Kokrajhar", type: "State", est: 2009, category: "Engineering" },
    { name: "Golaghat Engineering College", abbr: "GEC Golaghat", city: "Golaghat", type: "State", est: 2010, category: "Engineering" },
    { name: "Dibrugarh Polytechnic", abbr: "DP", city: "Dibrugarh", type: "State", est: 1963, category: "Engineering" },

    // Top Private Universities
    { name: "Assam Down Town University", abbr: "ADTU", city: "Guwahati", type: "Private", est: 2010, category: "Multidisciplinary" },
    { name: "Kaziranga University", abbr: "KU", city: "Jorhat", type: "Private", est: 2012, category: "Multidisciplinary" },
    { name: "Assam Don Bosco University", abbr: "ADBU", city: "Guwahati", type: "Private", est: 2009, category: "Multidisciplinary" },
    { name: "Royal Global University", abbr: "RGU", city: "Guwahati", type: "Private", est: 2012, category: "Multidisciplinary" },
    { name: "Mahapurusha Srimanta Sankaradeva Viswavidyalaya", abbr: "MSSV", city: "Nagaon", type: "State", est: 2019, category: "Multidisciplinary" },
    { name: "Krishna Kanta Handiqui State Open University", abbr: "KKHSOU", city: "Guwahati", type: "State", est: 2006, category: "Multidisciplinary" },
    { name: "ICFAI University Assam", abbr: "ICFAI Assam", city: "Guwahati", type: "Private", est: 2014, category: "Multidisciplinary" },
    { name: "Apex Professional University Assam", abbr: "APU", city: "Pasighat", type: "Private", est: 2016, category: "Multidisciplinary" },

    // Other Top Colleges
    { name: "Cotton University Guwahati", abbr: "Cotton University", city: "Guwahati", type: "State", est: 1901, category: "Arts & Science" },
    { name: "Handique Girls College Guwahati", abbr: "HGC", city: "Guwahati", type: "State (Women)", est: 1935, category: "Arts & Science" },
    { name: "B Borooah College Guwahati", abbr: "BBC", city: "Guwahati", type: "Private Aided", est: 1946, category: "Arts & Science" },
    { name: "Nowgong College Nagaon", abbr: "Nowgong College", city: "Nagaon", type: "State", est: 1934, category: "Arts & Science" },
    { name: "Jagannath Barooah College Jorhat", abbr: "JBC", city: "Jorhat", type: "State", est: 1948, category: "Arts & Science" },
    { name: "Dibru College Dibrugarh", abbr: "Dibru College", city: "Dibrugarh", type: "State", est: 1944, category: "Arts & Science" },
    { name: "Lakhimpur Girls College", abbr: "LGC", city: "North Lakhimpur", type: "State (Women)", est: 1959, category: "Arts & Science" },
    { name: "Pandu College Guwahati", abbr: "Pandu College", city: "Guwahati", type: "State", est: 1958, category: "Arts & Science" },
    { name: "Tinsukia College Tinsukia", abbr: "TCC", city: "Tinsukia", type: "State", est: 1959, category: "Arts & Science" },
    { name: "Nalbari College Nalbari", abbr: "NCC", city: "Nalbari", type: "State", est: 1951, category: "Arts & Science" },

    // More Colleges
    { name: "Arya Vidyapeeth College Guwahati", abbr: "AVC", city: "Guwahati", type: "Private Aided", est: 1969, category: "Arts & Science" },
    { name: "Pragjyotish College Guwahati", abbr: "PGC", city: "Guwahati", type: "Private Aided", est: 1950, category: "Arts & Science" },
    { name: "Dispur College Guwahati", abbr: "Dispur College", city: "Guwahati", type: "Private Aided", est: 1973, category: "Arts & Science" },
    { name: "Dimoria College Guwahati", abbr: "Dimoria", city: "Dimoria", type: "State", est: 1972, category: "Arts & Science" },
    { name: "Dakshin Kamrup College", abbr: "DKC", city: "Mirza", type: "State", est: 1973, category: "Arts & Science" },
    { name: "Mangaldai College", abbr: "Mangaldai", city: "Mangaldai", type: "State", est: 1960, category: "Arts & Science" },
    { name: "Sibsagar College Joysagar", abbr: "Sibsagar College", city: "Sivasagar", type: "State", est: 1953, category: "Arts & Science" },
    { name: "North Lakhimpur College", abbr: "NLC", city: "North Lakhimpur", type: "State", est: 1956, category: "Arts & Science" },
    { name: "Morigaon College", abbr: "MC", city: "Morigaon", type: "State", est: 1966, category: "Arts & Science" },
    { name: "Dhing College Nagaon", abbr: "Dhing College", city: "Nagaon", type: "State", est: 1970, category: "Arts & Science" },
    { name: "Chaiduar College", abbr: "Chaiduar", city: "Gohpur", type: "State", est: 1966, category: "Arts & Science" },
    { name: "Gargaon College Sivasagar", abbr: "Gargaon", city: "Sivasagar", type: "State", est: 1965, category: "Arts & Science" },
    { name: "Darrang College Tezpur", abbr: "Darrang", city: "Tezpur", type: "State", est: 1945, category: "Arts & Science" },
    { name: "B H College Howly", abbr: "BHC", city: "Howly", type: "State", est: 1958, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    const isApexTech = ['IIT Guwahati', 'NIT Silchar', 'IIIT Guwahati'].includes(col.abbr);
    const isCentral = ['TU', 'AU'].includes(col.abbr);
    const isStateMed = ['AMC Dibrugarh', 'GMC Guwahati', 'SMC', 'JMCH', 'FAAMC'].includes(col.abbr);
    const isStateEng = ['AEC', 'JEC', 'BBEC', 'GEC Golaghat'].includes(col.abbr);
    const isApexMed = col.abbr === 'AIIMS Guwahati';

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B9${isApexMed ? '5K/Yr' : '1L — \u20B95L/Yr'}</td><td>10+2 PCB + NEET UG${isApexMed ? ' + INI-CET' : ''}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MD / MS</strong></td><td>3 Years</td><td>\u20B91L — \u20B98L/Yr</td><td>MBBS + NEET PG${isApexMed ? ' / INI-CET' : ''}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isApexMed
            ? 'AIIMS Guwahati admits via INI-CET (Institutes of National Importance Combined Entrance Test) for PG programs and centralized MCC NEET UG for MBBS. Its establishment has transformed access to tier-1 medical education for the entire Northeast.'
            : 'Assam Medical Counselling Committee (AMCC) manages centralized NEET UG allocations for all government medical colleges across Assam with 85% state domicile reservation for residents of NE states.';
        placementInfo = 'GMC Guwahati and Assam Medical College are the two oldest and most established medical institutions, supplying Assam health services, ESIC, and large private hospital networks (Apollo, Excelcare, Nemcare) across Guwahati.';

    } else if (col.category === 'Engineering') {
        const isApex = isApexTech;
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isApex ? '8L' : '1.5L'} — \u20B9${isApex ? '18L' : '5L'}</td><td>10+2 PCM + ${isApex ? 'JEE Main/Adv (JoSAA/CSAB)' : 'JEE Main / State CET'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B950K — \u20B92L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isApex
            ? (col.abbr === 'IIT Guwahati' ? 'JoSAA counseling using JEE Advanced ranks. IIT Guwahati is the premier apex institute of Northeast India and consistently ranks among India\'s top 5 IITs.'
                : col.abbr === 'NIT Silchar' ? 'JoSAA/CSAB counseling utilizing JEE Main ranks with strong HS (Home State) NE quota reserving seats for Assam/NE domicile candidates.'
                    : 'JoSAA / CSAB (including CSAB Special Rounds for NE candidates) via JEE Main ranks.')
            : col.abbr === 'DP' ? 'Assam Polytechnic Admission Committee conducts state-level admissions for all polytechnic diplomas based on HS (10th) merit.'
                : 'DTE Assam manages centralized counseling utilizing JEE Main scores for government engineering colleges in the state under Assam Science and Technology University (ASTU) affiliation.';
        placementInfo = isApex
            ? 'IIT Guwahati is the flagship NE institution with MAANG, quant-finance, and global consulting placements. NIT Silchar feeds strongly into IT services and core PSU recruitment via GATE.'
            : 'Assam Engineering College (AEC) graduates dominate the state PWD, APDCL, OIL INDIA, and ONGC recruitment pipelines — the most significant employers in northeast India\'s energy corridor.';

    } else if (col.category === 'Multidisciplinary' || col.type === 'Central') {
        coursesHtml = `<tr><td><strong>BA / BSc / BCom / BCA / BBA</strong></td><td>3 Years</td><td>\u20B93K — \u20B960K</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MA / MSc / MCom / MBA</strong></td><td>2 Years</td><td>\u20B910K — \u20B91.5L</td><td>Bachelor\'s + CUET PG / University Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>PhD</strong></td><td>3-5 Years</td><td>\u20B915K — \u20B960K</td><td>PG + UGC-NET / University Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isCentral
            ? `${col.name} is a Central University of India admitting students via CUET UG/PG (NTA). It affiliates colleges across its jurisdiction and is a premier research hub for Northeast India.`
            : ['GU', 'DU', 'BU', 'MSSV'].includes(col.abbr)
                ? `${col.name} is the apex state university affiliating hundreds of colleges. It conducts centralized admissions via Assam Higher Education portal using HSE (Class 12) merit for UG and university entrance for PG.`
                : `${col.name} is a private university operating under UGC recognition, offering a wide spectrum of programs via institutional admission processes and direct merit-based enrollments.`;
        placementInfo = col.abbr === 'TU'
            ? 'Tezpur University delivers one of the strongest placement records among central universities in NE India. Key recruiters: Oil India, BPCL, InfosysBPO, and a growing startup ecosystem anchored in Guwahati\'s Smart City grid.'
            : 'Graduates from Assam state universities primarily enter APSC (Assam Public Service Commission), Banking, Education (SSA/RMSA), Oil & Gas sector jobs (OIL India, ONGC), and increasingly IT services from Guwahati Infosys/Wipro campuses.';

    } else {
        // Arts & Science colleges
        const isHistoric = col.est < 1950;
        coursesHtml = `<tr><td><strong>BA / BSc / BCom</strong></td><td>3 Years</td><td>\u20B92K — \u20B920K</td><td>HSE (Class 12) Merit via Gauhati / Dibrugarh University Portal</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MA / MSc / MCom</strong></td><td>2 Years</td><td>\u20B95K — \u20B930K</td><td>Bachelor\'s + University Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `All government arts & science colleges in Assam admit via the Samarth / university portals using Class 12 (HSE/AHSEC) merit. Colleges are affiliated with Gauhati University, Dibrugarh University, or Assam University. First-generation learner support is strong under NE state scholarship schemes.`;
        placementInfo = isHistoric
            ? `${col.name} (Est. ${col.est}) is one of Assam's oldest colleges and a prolific feeder of the state civil services, teaching cadre, and IAS/IPS ecosystem across NE India.`
            : 'Graduates enter the APSC, Class-III government posts, banking (SBI, UCO, Assam Gramin Vikash Bank), and a rapidly modernizing private sector anchored in Guwahati.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (isApexTech || isApexMed || ['TU', 'GU', 'Cotton University'].includes(col.abbr)) ? '4.7' : '4.2';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, fee structure and campus life in Assam. Verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Assam Colleges, ASTU, DTE Assam, ${col.city} Institutes, NextCampus">
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
    { "@context": "https://schema.org", "@type": "EducationalOrganization",
      "name": "${col.name}", "alternateName": "${col.abbr}",
      "url": "https://nextcampus.com/colleges/assam/${collegeSlug}/${collegeSlug}.html" }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, AS</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Assam, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>${rating}</strong>/5
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
            <section class="lpu-panel active" id="panel-overview">
                <div class="lpu-card">
                    <h2>About ${col.name}</h2>
                    <p>${col.name} (${col.abbr}), established in ${col.est}, is one of Assam's leading ${col.type.toLowerCase()} institutions based in ${col.city}. ${isApexTech ? 'As a national institution, it anchors the Northeast India\'s premier engineering and research ecosystem.' : col.category === 'Medical' ? 'It is affiliated with the Srimanta Sankaradeva University of Health Sciences (SSUHS) and plays a vital role in Assam\'s healthcare education infrastructure.' : 'It is affiliated with ' + (col.type === 'Central' ? 'the University Grants Commission (UGC) as a Central University' : 'Gauhati University / Dibrugarh University') + ' and serves thousands of students across Northeast India.'}</p>
                </div>
                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128218; Top Courses &amp; Eligibility</h3>
                        <button class="btn-view-tab" data-target="courses">View All &#8594;</button>
                    </div>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>${coursesHtml}</tbody>
                        </table>
                    </div>
                </div>
                <div class="lpu-card">
                    <h3>Admissions Route</h3>
                    <p>${admissionHtml}</p>
                    <button class="btn-view-tab" data-target="admission" style="margin-top:10px;">View Admission Process &#8594;</button>
                </div>
            </section>
            <section class="lpu-panel" id="panel-courses">
                <div class="lpu-card"><h2>Academic Programs</h2>
                    <div class="table-scroll"><table class="lpu-table">
                        <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                        <tbody>${coursesHtml}</tbody>
                    </table></div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-admission">
                <div class="lpu-card"><h2>Admission Information</h2>
                    <div class="steps-list">
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance Framework</h4><p>${admissionHtml}</p></div></div>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card"><h2>Career &amp; Placements</h2><p>${placementInfo}</p></div>
            </section>
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card"><h2>Student Reviews</h2>
                    <p>Average Rating: <strong>${rating} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Assam's institutions sit at the crossroads of South and Southeast Asia. The growing Guwahati smart city, Oil India/OIL pipelines, and expanding tech campuses are creating genuine career opportunities for NE graduates."</p>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card"><h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Library &amp; Labs</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostel &amp; Campus</span></div>
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
    const lpuCssBase = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');

    for (const col of asColleges) {
        const collegeSlug = slugify(col.name);
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'assam', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        let baseScore = 7.8;
        if (['IIT Guwahati'].includes(col.abbr)) baseScore = 9.9;
        else if (['NIT Silchar', 'AIIMS Guwahati', 'TU', 'IIIT Guwahati'].includes(col.abbr)) baseScore = 9.2;
        else if (['AU', 'GU', 'DU', 'AMC Dibrugarh', 'GMC Guwahati', 'AEC', 'Cotton University'].includes(col.abbr)) baseScore = 8.7;
        else if (['ADTU', 'ADBU', 'RGU', 'JEC', 'SMC', 'Nowgong College'].includes(col.abbr)) baseScore = 8.2;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Assam', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 88 : 72}, nirf: 0,
      link: '../colleges/assam/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.7" : "4.2"}', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    if (newCards.length > 0) {
        const token = "const colleges = [";
        const idx = homeContent.indexOf(token);
        if (idx !== -1) {
            const start = idx + token.length;
            homeContent = homeContent.slice(0, start) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(start);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Assam Colleges into home.js!`);
        }
    } else {
        console.log("\n❌ No new Assam Colleges to inject.");
    }
}

processAll();
