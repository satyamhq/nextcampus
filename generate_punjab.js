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

const pbColleges = [
    // Top Universities & National Institutes (Punjab)
    { name: "Indian Institute of Technology Ropar", abbr: "IIT Ropar", city: "Rupnagar", type: "Government", est: 2008, category: "Engineering" },
    { name: "Indian Institute of Management Amritsar", abbr: "IIM Amritsar", city: "Amritsar", type: "Government", est: 2015, category: "Management" },
    { name: "National Institute of Technology Jalandhar", abbr: "NIT Jalandhar", city: "Jalandhar", type: "Government", est: 1987, category: "Engineering" },
    { name: "Dr BR Ambedkar National Institute of Technology Jalandhar", abbr: "NIT Jalandhar", city: "Jalandhar", type: "Government", est: 1987, category: "Engineering" }, // Duplicate alias handler
    { name: "AIIMS Bathinda", abbr: "AIIMS Bathinda", city: "Bathinda", type: "Government", est: 2019, category: "Medical" },
    { name: "Punjab Agricultural University", abbr: "PAU", city: "Ludhiana", type: "State", est: 1962, category: "Multidisciplinary" },
    { name: "Punjabi University Patiala", abbr: "Punjabi University", city: "Patiala", type: "State", est: 1962, category: "Multidisciplinary" },
    { name: "Guru Nanak Dev University", abbr: "GNDU", city: "Amritsar", type: "State", est: 1969, category: "Multidisciplinary" },
    { name: "Central University of Punjab", abbr: "CUPB", city: "Bathinda", type: "Central", est: 2009, category: "Multidisciplinary" },
    { name: "Punjab Engineering College", abbr: "PEC", city: "Chandigarh", type: "Deemed", est: 1921, category: "Engineering" }, // Technically UT but highly affiliated with PB/HR flows

    // Top Government Colleges
    { name: "Government Medical College Patiala", abbr: "GMC Patiala", city: "Patiala", type: "State", est: 1953, category: "Medical" },
    { name: "Government Medical College Amritsar", abbr: "GMC Amritsar", city: "Amritsar", type: "State", est: 1943, category: "Medical" },
    { name: "Government College Ludhiana", abbr: "GC Ludhiana", city: "Ludhiana", type: "State", est: 1920, category: "Arts & Science" },
    { name: "Government College Hoshiarpur", abbr: "GC Hoshiarpur", city: "Hoshiarpur", type: "State", est: 1927, category: "Arts & Science" },
    { name: "Government College Mohali", abbr: "GC Mohali", city: "Mohali", type: "State", est: 1984, category: "Arts & Science" },
    { name: "Government Engineering College Gurdaspur", abbr: "GEC Gurdaspur", city: "Gurdaspur", type: "State", est: 1995, category: "Engineering" },
    { name: "Government Engineering College Bathinda", abbr: "GEC Bathinda", city: "Bathinda", type: "State", est: 1989, category: "Engineering" },
    { name: "Government Engineering College Amritsar", abbr: "GEC Amritsar", city: "Amritsar", type: "State", est: 1997, category: "Engineering" },
    { name: "Government Polytechnic College Patiala", abbr: "GPC Patiala", city: "Patiala", type: "State", est: 1950, category: "Engineering" },
    { name: "Government Polytechnic College Bathinda", abbr: "GPC Bathinda", city: "Bathinda", type: "State", est: 1980, category: "Engineering" },

    // Top Private Universities
    { name: "Lovely Professional University", abbr: "LPU", city: "Phagwara", type: "Private", est: 2005, category: "Multidisciplinary" },
    { name: "Chandigarh University", abbr: "CU", city: "Mohali", type: "Private", est: 2012, category: "Multidisciplinary" },
    { name: "Thapar Institute of Engineering and Technology", abbr: "TIET", city: "Patiala", type: "Deemed", est: 1956, category: "Engineering" },
    { name: "Amity University Punjab", abbr: "Amity Mohali", city: "Mohali", type: "Private", est: 2021, category: "Multidisciplinary" },
    { name: "Chitkara University Punjab", abbr: "Chitkara", city: "Rajpura", type: "Private", est: 2010, category: "Multidisciplinary" },
    { name: "Rayat Bahra University", abbr: "RBU", city: "Mohali", type: "Private", est: 2014, category: "Multidisciplinary" },
    { name: "Desh Bhagat University", abbr: "DBU", city: "Mandi Gobindgarh", type: "Private", est: 2012, category: "Multidisciplinary" },
    { name: "CT University Ludhiana", abbr: "CTU", city: "Ludhiana", type: "Private", est: 2017, category: "Multidisciplinary" },
    { name: "GNA University", abbr: "GNA", city: "Phagwara", type: "Private", est: 2014, category: "Multidisciplinary" },
    { name: "Akal University", abbr: "Akal", city: "Bathinda", type: "Private", est: 2015, category: "Multidisciplinary" },

    // Other Top Colleges
    { name: "Shaheed Bhagat Singh State University", abbr: "SBSSU", city: "Ferozepur", type: "State", est: 1995, category: "Engineering" },
    { name: "Guru Kashi University", abbr: "GKU", city: "Bathinda", type: "Private", est: 2011, category: "Multidisciplinary" },
    { name: "Sant Baba Bhag Singh University", abbr: "SBBSU", city: "Jalandhar", type: "Private", est: 2015, category: "Multidisciplinary" },
    { name: "Adesh University", abbr: "Adesh", city: "Bathinda", type: "Private", est: 2012, category: "Medical" }, // Heavy Medical
    { name: "Baba Farid University of Health Sciences", abbr: "BFUHS", city: "Faridkot", type: "State", est: 1998, category: "Medical" },
    { name: "Khalsa College Amritsar", abbr: "KCA", city: "Amritsar", type: "Private Aided", est: 1892, category: "Arts & Science" },
    { name: "DAV College Jalandhar", abbr: "DAV Jalandhar", city: "Jalandhar", type: "Private", est: 1918, category: "Arts & Science" },
    { name: "DAV College Amritsar", abbr: "DAV Amritsar", city: "Amritsar", type: "Private", est: 1955, category: "Arts & Science" },
    { name: "Lyallpur Khalsa College Jalandhar", abbr: "LKC", city: "Jalandhar", type: "Private", est: 1908, category: "Arts & Science" },
    { name: "Doaba College Jalandhar", abbr: "Doaba", city: "Jalandhar", type: "Private", est: 1941, category: "Arts & Science" },

    // More Colleges
    { name: "Guru Nanak Khalsa College", abbr: "GNKC", city: "Ludhiana", type: "Private", est: 1969, category: "Arts & Science" },
    { name: "SCD Government College Ludhiana", abbr: "SCD GC", city: "Ludhiana", type: "State", est: 1920, category: "Arts & Science" }, // Same as GC Ludhiana practically, handled cleanly.
    { name: "SD College Chandigarh", abbr: "GGDSD", city: "Chandigarh", type: "Private Aided", est: 1973, category: "Arts & Science" },
    { name: "Mehr Chand Mahajan DAV College", abbr: "MCM DAV", city: "Chandigarh", type: "Private (Women)", est: 1968, category: "Arts & Science" },
    { name: "Hindu College Amritsar", abbr: "Hindu College", city: "Amritsar", type: "Private", est: 1924, category: "Arts & Science" },
    { name: "Government College Patiala", abbr: "GC Patiala", city: "Patiala", type: "State", est: 1870, category: "Arts & Science" }, // Mohindra College
    { name: "Government College Bathinda", abbr: "GC Bathinda", city: "Bathinda", type: "State", est: 1969, category: "Arts & Science" }, // Rajindra
    { name: "Government College Amritsar", abbr: "GC Amritsar", city: "Amritsar", type: "State", est: 1932, category: "Arts & Science" }, // SRPAAB 
    { name: "Government College Ferozepur", abbr: "RSD GC", city: "Ferozepur", type: "State", est: 1921, category: "Arts & Science" }, // Probably RSD
    { name: "Government College Sangrur", abbr: "RC Sangrur", city: "Sangrur", type: "State", est: 1939, category: "Arts & Science" }, // Ranbir
    { name: "Government College Mansa", abbr: "NM GC", city: "Mansa", type: "State", est: 1952, category: "Arts & Science" }, // Nehru
    { name: "Government College Fazilka", abbr: "MR GC", city: "Fazilka", type: "State", est: 1940, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    let isPTU = col.type === "State" && col.category === "Engineering";
    let isApexTech = col.abbr === "IIT Ropar" || col.abbr === "NIT Jalandhar" || col.abbr === "PEC" || col.abbr === "TIET";

    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B92L — \u20B915L/Yr</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B91L — \u20B98L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "AIIMS Bathinda" ? "MCC centralized counseling explicitly handling 100% seats utilizing national NEET metrics." : "Baba Farid University of Health Sciences (BFUHS) acts as the central nodal agency conducting state-level allocations factoring heavy domicile quotas alongside Punjab NEET bounds.";
        placementInfo = "Extensive clinical deployments inside the high-density belt connecting Patiala, Amritsar, and Delhi-NCR tier-1 corporate grids.";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>PGP / MBA</strong></td><td>2 Years</td><td>\u20B98L — \u20B922L</td><td>Graduation + ${col.abbr === "IIM Amritsar" ? 'CAT' : 'CAT / XAT / MAT'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "IIM Amritsar" ? "Stringent CAT percentiles deployed under the common IIM shortlisting and PI grids." : "State admissions factor PTU validations and MAT/CAT matrix rankings.";
        placementInfo = col.abbr === "IIM Amritsar" ? "Aggressive placement cell targeting national BFSI, consulting, and FMCG sectors directly operating from the NCR." : "Deployments directly mapping the massive Ludhiana and NCR retail/finance hubs.";
    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isApexTech ? '8L' : '3.5L'} — \u20B9${isApexTech ? '18L' : '7L'}</td><td>10+2 PCM + ${isApexTech ? 'JEE Main/Adv' : 'JEE Main / PTU State Merit'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B94L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isApexTech ? (col.abbr === "TIET" ? "Highly rigorous combination of JEE Main percentiles directly paired with intense 12th board markers." : "JoSAA / CSAB counseling utilizing pure JEE ranks.") : "Colleges extensively rely on the I.K. Gujral Punjab Technical University (PTU) centralized counseling based primarily on JEE Main ranks.";
        if (col.name.includes("Polytechnic")) {
            coursesHtml = `<tr><td><strong>Diploma B.Tech</strong></td><td>3 Years</td><td>\u20B915K — \u20B945K</td><td>10th Merit / JET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
            admissionHtml = "Punjab State Board of Technical Education heavily scales 10th-grade merit scores via JET (Joint Entrance Test).";
        }
        placementInfo = isApexTech ? "Tier-1 engineering packages aggressively funneled into major product firms across Hyderabad/Bangalore and immense international consulting allocations." : "Massive bulk recruitment anchoring heavily on IT Service deployment and regional manufacturing powerhouses (Ludhiana heavy core mechanical focus).";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com / BBA</strong></td><td>3-4 Years</td><td>\u20B915K — \u20B93L</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B920K — \u20B92L</td><td>Bachelor's + University Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "CUPB" ? "Centralized strictly via NTA's CUET PG and UG platforms." : "Panjab University, GNDU, and Punjabi University operate their own immense entrance mechanisms for local postgraduate routing, alongside pure 12th percentage tracking for UG seats.";
        placementInfo = "Graduates form the administrative core of the Punjab civil services, agriculture extensions (PAU), massive Canadian/Australian migration profiles, and regional banking.";
    }

    // Handle generic Multidisciplinary giants (LPU/CU)
    if (col.abbr === "LPU" || col.abbr === "CU" || col.abbr === "Chitkara") {
        admissionHtml = `Aggressive autonomous university structure utilizing internal scholarship and admissions tests (LPUNEST / CUCET) alongside recognizing national level tests (JEE).`;
        placementInfo = `Record-shattering volume metric! Thousands of placements routed into IT, Sales, and Corporate HR pools aggressively scaling into national MNC databases.`;
    }

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life in Punjab. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Punjab State Colleges, PTU Engineering, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/punjab/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/punjab/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, PB</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Punjab, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>${isApexTech || col.abbr === "IIM Amritsar" ? '4.8' : '4.3'}</strong>/5
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
                    <p>${col.name} (${col.abbr}) anchors ${col.city}'s academic blueprint securely within immense state-led and core private development grids sweeping through Punjab.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / State Metric</h4><p>${admissionHtml}</p></div></div>
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
                    <p>Average Rating: <strong>${isApexTech || col.abbr === "IIM Amritsar" ? '4.8' : '4.3'} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The robust alumni structure across Punjab deeply supports fresh graduate integration. Whether it's the booming IT belt tracking toward NCR or specific Ludhiana core mechanics, the pipelines are solid."</p>
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
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels & Research Centers</span></div>
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

    for (const col of pbColleges) {
        // Handling aliases like Dr BR Ambedkar / NIT Jalandhar
        if (col.name.includes("Dr BR Ambedkar National Institute of Technology Jalandhar")) continue;

        // We already generated LPU & CU as part of the massive national list, but we can verify.
        const collegeSlug = slugify(col.name);

        // Check dupe (LPU, CU, IITs, NITs from national lists)
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'punjab', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS base
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 7.9; // Default
        if (col.abbr === "IIT Ropar" || col.abbr === "NIT Jalandhar" || col.abbr === "IIM Amritsar" || col.abbr === "PEC") baseScore = 9.8;
        else if (col.abbr === "TIET" || col.abbr === "PAU") baseScore = 9.4;
        else if (col.abbr === "GNDU" || col.abbr === "Punjabi University" || col.abbr === "CUPB" || col.abbr === "AIIMS Bathinda") baseScore = 9.2;
        // LPU and CU scores not modified here as they are skipped.

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Punjab', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 90 : 80}, nirf: 0,
      link: '../colleges/punjab/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.8" : "4.3"}', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    // Inject
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Punjab Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Punjab Colleges to inject (already deduplicated).`);
    }
}

processAll();
