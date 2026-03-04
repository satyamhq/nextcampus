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

const mzColleges = [
    // Universities & National Institutes
    { name: "Mizoram University", abbr: "MZU", city: "Aizawl", type: "Central", est: 2001, category: "Multidisciplinary" },
    { name: "National Institute of Technology Mizoram", abbr: "NIT Mizoram", city: "Aizawl", type: "Government", est: 2010, category: "Engineering" },
    { name: "ICFAI University Mizoram", abbr: "ICFAI Mizoram", city: "Aizawl", type: "Private", est: 2014, category: "Multidisciplinary" },

    // Top Government Colleges
    { name: "Pachhunga University College", abbr: "PUC", city: "Aizawl", type: "State", est: 1959, category: "Arts & Science" },
    { name: "Government Aizawl College", abbr: "GAC Aizawl", city: "Aizawl", type: "State", est: 1967, category: "Arts & Science" },
    { name: "Government Hrangbana College", abbr: "GHC", city: "Aizawl", type: "State", est: 1978, category: "Arts & Science" },
    { name: "Government Serchhip College", abbr: "GSC", city: "Serchhip", type: "State", est: 1986, category: "Arts & Science" },
    { name: "Government Champhai College", abbr: "GCC", city: "Champhai", type: "State", est: 1984, category: "Arts & Science" },
    { name: "Government Kolasib College", abbr: "GKC", city: "Kolasib", type: "State", est: 1995, category: "Arts & Science" },
    { name: "Government Lunglei College", abbr: "GLC", city: "Lunglei", type: "State", est: 1975, category: "Arts & Science" },

    // Major Private Colleges
    { name: "St Edmund's College Aizawl", abbr: "SEC", city: "Aizawl", type: "Private Aided", est: 1994, category: "Arts & Science" },
    { name: "St Paul's College Aizawl", abbr: "SPC", city: "Aizawl", type: "Private Aided", est: 1999, category: "Arts & Science" },
    { name: "Mizoram Christian College", abbr: "MCC", city: "Aizawl", type: "Private Aided", est: 2006, category: "Arts & Science" },
    { name: "Trinity College Aizawl", abbr: "TCA", city: "Aizawl", type: "Private", est: 2009, category: "Arts & Science" },
    { name: "Helen Lowry College Aizawl", abbr: "HLC", city: "Aizawl", type: "Private (Women)", est: 2003, category: "Arts & Science" },

    // Technical & Professional Colleges
    { name: "Mizoram Polytechnic College Lunglei", abbr: "MPCL", city: "Lunglei", type: "State", est: 1978, category: "Engineering" },
    { name: "Women's Polytechnic Aizawl", abbr: "WPA", city: "Aizawl", type: "State (Women)", est: 1990, category: "Engineering" },
    { name: "Industrial Training Institute Aizawl", abbr: "ITI Aizawl", city: "Aizawl", type: "State", est: 1969, category: "Engineering" },
    { name: "Regional Institute of Paramedical and Nursing Sciences", abbr: "RIPANS", city: "Aizawl", type: "State", est: 2001, category: "Medical" },

    // Other Colleges
    { name: "Zirtiri Residential Science College", abbr: "ZRSC", city: "Aizawl", type: "State", est: 2002, category: "Arts & Science" },
    { name: "Lunglei Government College", abbr: "LGC", city: "Lunglei", type: "State", est: 1975, category: "Arts & Science" },
    { name: "Aizawl Theological College", abbr: "ATC", city: "Aizawl", type: "Private", est: 1907, category: "Arts & Science" },
    { name: "Baptist College of Theology", abbr: "BCT", city: "Aizawl", type: "Private", est: 1946, category: "Arts & Science" },
    { name: "Mizoram Law College", abbr: "MLC", city: "Aizawl", type: "State", est: 1979, category: "Law" },
    { name: "Mizoram Institute of Teacher Education", abbr: "MITE", city: "Aizawl", type: "State", est: 1997, category: "Arts & Science" },
    { name: "Government Mamit College", abbr: "GMC Mamit", city: "Mamit", type: "State", est: 1998, category: "Arts & Science" },
    { name: "Government Saiha College", abbr: "GSC Saiha", city: "Saiha", type: "State", est: 1985, category: "Arts & Science" },
    { name: "Government Lawngtlai College", abbr: "GLTC", city: "Lawngtlai", type: "State", est: 1988, category: "Arts & Science" },
    { name: "Government Saitual College", abbr: "GSITC", city: "Saitual", type: "State", est: 2012, category: "Arts & Science" },
    { name: "Government Khawzawl College", abbr: "GKZC", city: "Khawzawl", type: "State", est: 2015, category: "Arts & Science" },

    // More Colleges (district / sub-divisional colleges)
    { name: "Government Hnahthial College", abbr: "GHTH", city: "Hnahthial", type: "State", est: 2016, category: "Arts & Science" },
    { name: "Government Thenzawl College", abbr: "GTZC", city: "Thenzawl", type: "State", est: 1998, category: "Arts & Science" },
    { name: "Government East Lungdar College", abbr: "GELC", city: "East Lungdar", type: "State", est: 2010, category: "Arts & Science" },
    { name: "Government Darlawn College", abbr: "GDLC", city: "Darlawn", type: "State", est: 2004, category: "Arts & Science" },
    { name: "Government Biate College", abbr: "GBTC", city: "Biate", type: "State", est: 2009, category: "Arts & Science" },
    { name: "Government Tlabung College", abbr: "GTBC", city: "Tlabung", type: "State", est: 2005, category: "Arts & Science" },
    { name: "Government Zawlnuam College", abbr: "GZNC", city: "Zawlnuam", type: "State", est: 2007, category: "Arts & Science" },
    { name: "Government North Vanlaiphai College", abbr: "GNVPC", city: "North Vanlaiphai", type: "State", est: 2012, category: "Arts & Science" },
    { name: "Government South Vanlaiphai College", abbr: "GSVPC", city: "South Vanlaiphai", type: "State", est: 2012, category: "Arts & Science" },
    { name: "Government Thingsulthliah College", abbr: "GTLC", city: "Thingsulthliah", type: "State", est: 2008, category: "Arts & Science" },
    { name: "Government Vairengte College", abbr: "GVRC", city: "Vairengte", type: "State", est: 2001, category: "Arts & Science" },
    { name: "Government Reiek College", abbr: "GREC", city: "Reiek", type: "State", est: 2013, category: "Arts & Science" },
    { name: "Government Sialsuk College", abbr: "GSSK", city: "Sialsuk", type: "State", est: 2011, category: "Arts & Science" },
    { name: "Government Khawbung College", abbr: "GKBC", city: "Khawbung", type: "State", est: 2013, category: "Arts & Science" },
    { name: "Government Sangau College", abbr: "GSGC", city: "Sangau", type: "State", est: 2014, category: "Arts & Science" },
    { name: "Government Bungtlang College", abbr: "GBLC", city: "Bungtlang", type: "State", est: 2010, category: "Arts & Science" },
    { name: "Government Farkawn College", abbr: "GFKC", city: "Farkawn", type: "State", est: 2012, category: "Arts & Science" },
    { name: "Government Bawngkawn College", abbr: "GBKC", city: "Bawngkawn", type: "State", est: 2007, category: "Arts & Science" },
    { name: "Government Zemabawk College", abbr: "GZEMC", city: "Zemabawk", type: "State", est: 2009, category: "Arts & Science" },
    { name: "Government Tanhril College", abbr: "GTNHC", city: "Tanhril", type: "State", est: 2010, category: "Arts & Science" },
    { name: "Government Aibawk College", abbr: "GABC", city: "Aibawk", type: "State", est: 2011, category: "Arts & Science" },
    { name: "Government Seling College", abbr: "GSLC", city: "Seling", type: "State", est: 2010, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    const isApexTech = col.abbr === 'NIT Mizoram';
    const isUniv = col.abbr === 'MZU';
    const isPoly = col.name.includes('Polytechnic') || col.name.includes('ITI');
    const isLaw = col.category === 'Law';
    const isNursing = col.abbr === 'RIPANS';

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (isLaw) {
        coursesHtml = `<tr><td><strong>LLB</strong></td><td>3 Years</td><td>\u20B910K — \u20B940K</td><td>Graduation + CLAT / State Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Mizoram Law College operates under Mizoram University. Admissions via merit-based selection aligned with Bar Council of India guidelines.';
        placementInfo = 'Graduates primarily feed into Mizoram High Court, district courts, government legal services, and state civil service legal wings.';

    } else if (isNursing) {
        coursesHtml = `<tr><td><strong>B.Sc Nursing / GNM / BMLT</strong></td><td>3-4 Years</td><td>\u20B920K — \u20B960K</td><td>10+2 PCB + State Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'RIPANS is the premier state institute for paramedical and nursing education in Mizoram. Admissions via state merit lists under Mizoram University affiliation.';
        placementInfo = 'Key placements into Civil Hospital Aizawl, CHCs across the state, and mission hospitals. Growing NRI nursing migration to Gulf and UK.';

    } else if (isPoly) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering / Trades</strong></td><td>2-3 Years</td><td>\u20B98K — \u20B925K</td><td>10th Pass / HSSLC Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Mizoram State Board of Technical Education manages polytechnic and ITI admissions via 10th/12th merit rankings, prioritizing state domicile candidates under NE quota frameworks.';
        placementInfo = 'Diploma holders feed into state PWD, PHED, Power Department, and local construction/infrastructure sectors. Multiple trade ITI programs track into the growing Aizawl urban development grid.';

    } else if (isApexTech) {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B91.5L — \u20B95L</td><td>10+2 PCM + JEE Main (JoSAA/CSAB)</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B950K — \u20B91.5L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'JoSAA / CSAB counseling utilizing JEE Main ranks. NIT Mizoram maintains strong HS (Home State) quota reserving seats specifically for Mizoram / NE domicile candidates via CSAB Special Rounds.';
        placementInfo = 'NIT Mizoram placements are rapidly scaling with IT service deployments into Bengaluru/Hyderabad corridors. PSU recruitment via GATE is a significant pathway for graduates.';

    } else if (isUniv) {
        coursesHtml = `<tr><td><strong>BA / BSc / BCom</strong></td><td>3 Years</td><td>\u20B93K — \u20B940K</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MA / MSc / MCom / MBA</strong></td><td>2 Years</td><td>\u20B910K — \u20B950K</td><td>Bachelor\'s + CUET PG / MZU Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>PhD</strong></td><td>3-5 Years</td><td>\u20B915K — \u20B960K</td><td>PG + UGC-NET / MZU Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Mizoram University (MZU) is the apex central university of Mizoram, conducting centralized admissions via its own entrance-based portal and CUET UG/PG for eligible programs. It affiliates most government and private colleges in the state.';
        placementInfo = 'MZU graduates predominantly enter the Mizoram Civil Services (MPSC), teaching cadres (under SSA/RMSA), central government services, and the growing NE startup ecosystem. Research output feeds MoS (Ministry of Science) and DST fellowship pipelines.';

    } else {
        // Standard government/private arts & science colleges
        const isDistrictRural = col.type === 'State' && !['Aizawl', 'Lunglei', 'Serchhip', 'Champhai'].includes(col.city);
        coursesHtml = `<tr><td><strong>BA (Arts)</strong></td><td>3 Years</td><td>\u20B92K — \u20B915K</td><td>HSSLC (Class 12) Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>BSc (Science)</strong></td><td>3 Years</td><td>\u20B93K — \u20B920K</td><td>HSSLC PCM/PCB Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   ${isDistrictRural ? '' : '<tr><td><strong>BCom (Commerce)</strong></td><td>3 Years</td><td>\u20B92K — \u20B915K</td><td>HSSLC Commerce Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>'}`;
        admissionHtml = 'All government colleges in Mizoram admit students based on HSSLC (Class 12 Board) merit. Mizoram University affiliates all government and major private colleges. Most district-level colleges have seats reserved for local Scheduled Tribe (ST) candidates under NE reservation policies.';
        placementInfo = isDistrictRural
            ? 'District colleges form the grassroots of Mizoram\'s educational pyramid, feeding local teachers, panchayat officers, and MPSC aspirants across rural constituencies.'
            : 'Aizawl-based colleges supply the state bureaucracy, education services, and a growing private sector in banking, retail, and telecom. Several graduates pursue higher education in Shillong, Guwahati, and Delhi NCR.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (isApexTech || isUniv || col.abbr === 'PUC') ? '4.6' : '4.1';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, fee structure and campus life in Mizoram. Verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Mizoram Colleges, MZU Affiliated, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/mizoram/${collegeSlug}/${collegeSlug}.html" }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, MZ</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Mizoram, India</p>
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
                    <p>${col.name} (${col.abbr}), established in ${col.est}, serves the higher education needs of ${col.city} and surrounding regions of Mizoram. It is affiliated with ${isApexTech ? 'the national NIT framework under MoE, Government of India' : 'Mizoram University (MZU)'} and plays a key role in expanding access to quality education across the state.</p>
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
                <div class="lpu-card">
                    <h2>Academic Programs</h2>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>${coursesHtml}</tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-admission">
                <div class="lpu-card">
                    <h2>Admission Information</h2>
                    <div class="steps-list">
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance Framework</h4><p>${admissionHtml}</p></div></div>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Career &amp; Placements</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>${rating} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Mizoram's colleges maintain a strong community-oriented academic culture. The literacy rate — one of India's highest — reflects the deep value placed on education across the state."</p>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
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
    const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');

    for (const col of mzColleges) {
        const collegeSlug = slugify(col.name);
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'mizoram', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        let baseScore = 7.5;
        if (col.abbr === 'NIT Mizoram') baseScore = 9.3;
        else if (col.abbr === 'MZU') baseScore = 8.8;
        else if (['PUC', 'GAC Aizawl', 'GHC', 'RIPANS'].includes(col.abbr)) baseScore = 8.2;
        else if (['SEC', 'SPC', 'GLC', 'GSC'].includes(col.abbr)) baseScore = 7.9;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Mizoram', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${col.abbr === 'NIT Mizoram' ? 85 : 70}, nirf: 0,
      link: '../colleges/mizoram/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 8.5 ? "4.6" : "4.1"}', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const idx = homeContent.indexOf(injectToken);
        if (idx !== -1) {
            const start = idx + injectToken.length;
            homeContent = homeContent.slice(0, start) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(start);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Mizoram Colleges into home.js!`);
        }
    } else {
        console.log("\n❌ No new Mizoram Colleges to inject.");
    }
}

processAll();
