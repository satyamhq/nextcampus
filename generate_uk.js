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

const ukColleges = [
    // Universities in Uttarakhand
    { name: "University of Uttarakhand", abbr: "UU", city: "Dehradun", type: "State", est: 2005, category: "Arts & Science" },
    { name: "Hemvati Nandan Bahuguna Garhwal University", abbr: "HNBGU", city: "Srinagar Garhwal", type: "Central", est: 1973, category: "Arts & Science" },
    { name: "Kumaun University", abbr: "KU", city: "Nainital", type: "State", est: 1973, category: "Arts & Science" },
    { name: "Uttarakhand Technical University", abbr: "UTU", city: "Dehradun", type: "State", est: 2005, category: "Engineering" },
    { name: "Uttarakhand Open University", abbr: "UOU", city: "Haldwani", type: "State Open", est: 2005, category: "Arts & Science" },
    { name: "Doon University", abbr: "DU", city: "Dehradun", type: "State", est: 2005, category: "Arts & Science" },
    { name: "G. B. Pant University of Agriculture and Technology", abbr: "GBPUAT", city: "Pantnagar", type: "State", est: 1960, category: "Agriculture" },
    { name: "Forest Research Institute Deemed University", abbr: "FRI", city: "Dehradun", type: "Deemed", est: 1906, category: "Agriculture" },
    { name: "UPES Dehradun", abbr: "UPES", city: "Dehradun", type: "Private", est: 2003, category: "Engineering" },
    { name: "Graphic Era University", abbr: "GEU", city: "Dehradun", type: "Deemed", est: 1993, category: "Engineering" },

    // Engineering Colleges
    { name: "Indian Institute of Technology Roorkee", abbr: "IIT Roorkee", city: "Roorkee", type: "Government", est: 1847, category: "Engineering" },
    { name: "National Institute of Technology Uttarakhand", abbr: "NIT Uttarakhand", city: "Srinagar Garhwal", type: "Government", est: 2009, category: "Engineering" },
    { name: "DIT University", abbr: "DITU", city: "Dehradun", type: "Private", est: 1998, category: "Engineering" },
    { name: "Tula's Institute", abbr: "Tulas", city: "Dehradun", type: "Private", est: 2006, category: "Engineering" },
    { name: "Dev Bhoomi Uttarakhand University", abbr: "DBUU", city: "Dehradun", type: "Private", est: 2005, category: "Engineering" },
    { name: "Quantum University", abbr: "Quantum", city: "Roorkee", type: "Private", est: 2008, category: "Engineering" },
    { name: "ICFAI University Dehradun", abbr: "ICFAI", city: "Dehradun", type: "Private", est: 2003, category: "Engineering" }, // Offers strong B.Tech
    { name: "Uttaranchal University", abbr: "UU", city: "Dehradun", type: "Private", est: 2013, category: "Engineering" },
    { name: "Shivalik College of Engineering", abbr: "SCE", city: "Dehradun", type: "Private", est: 2008, category: "Engineering" },
    { name: "Roorkee Institute of Technology", abbr: "RIT", city: "Roorkee", type: "Private", est: 2005, category: "Engineering" },

    // Medical Colleges
    { name: "AIIMS Rishikesh", abbr: "AIIMS Rishikesh", city: "Rishikesh", type: "Autonomous", est: 2012, category: "Medical" },
    { name: "Government Doon Medical College", abbr: "GDMC", city: "Dehradun", type: "Government", est: 2016, category: "Medical" },
    { name: "Himalayan Institute of Medical Sciences", abbr: "HIMS", city: "Dehradun", type: "Private", est: 1995, category: "Medical" },
    { name: "Sri Guru Ram Rai Institute of Medical and Health Sciences", abbr: "SGRRIMHS", city: "Dehradun", type: "Private", est: 2006, category: "Medical" },
    { name: "Gautam Buddha Chikitsa Mahavidyalaya", abbr: "GBCM", city: "Dehradun", type: "Private", est: 2022, category: "Medical" },

    // Management Colleges
    { name: "Indian Institute of Management Kashipur", abbr: "IIM Kashipur", city: "Kashipur", type: "Government", est: 2011, category: "Management" },
    { name: "Doon Business School", abbr: "DBS", city: "Dehradun", type: "Private", est: 2007, category: "Management" },
    { name: "IMS Unison University", abbr: "IUU", city: "Dehradun", type: "Private", est: 1996, category: "Management" },
    { name: "UPES School of Business", abbr: "UPES SoB", city: "Dehradun", type: "Private", est: 2003, category: "Management" },

    // Law Colleges
    { name: "National Law University Uttarakhand", abbr: "NLUU", city: "Bhowali", type: "State", est: 2020, category: "Law" }, // Developing NLU architecture
    { name: "School of Law UPES", abbr: "UPES SoL", city: "Dehradun", type: "Private", est: 2007, category: "Law" },
    { name: "Law College Dehradun", abbr: "LCD", city: "Dehradun", type: "Private", est: 2002, category: "Law" },

    // Government Degree Colleges
    { name: "Government College Dehradun", abbr: "PG College Dehradun", city: "Dehradun", type: "Government", est: 1948, category: "Arts & Science" },
    { name: "Government College Haldwani", abbr: "MBPG Haldwani", city: "Haldwani", type: "Government", est: 1960, category: "Arts & Science" },
    { name: "Government College Nainital", abbr: "DSB Campus", city: "Nainital", type: "Government", est: 1951, category: "Arts & Science" },
    { name: "Government College Almora", abbr: "SSJ Campus", city: "Almora", type: "Government", est: 1941, category: "Arts & Science" },
    { name: "Government College Pithoragarh", abbr: "LSM Pithoragarh", city: "Pithoragarh", type: "Government", est: 1963, category: "Arts & Science" },
    { name: "Government College Bageshwar", abbr: "GDC Bageshwar", city: "Bageshwar", type: "Government", est: 1974, category: "Arts & Science" },
    { name: "Government College Chamoli", abbr: "GDC Gopeshwar", city: "Gopeshwar", type: "Government", est: 1968, category: "Arts & Science" },
    { name: "Government College Rudraprayag", abbr: "GDC Rudraprayag", city: "Rudraprayag", type: "Government", est: 1989, category: "Arts & Science" },

    // Polytechnics
    { name: "Government Polytechnic Dehradun", abbr: "GP Dehradun", city: "Dehradun", type: "Government", est: 1952, category: "Engineering" },
    { name: "Government Polytechnic Roorkee", abbr: "KL Poly", city: "Roorkee", type: "Government", est: 1956, category: "Engineering" },
    { name: "Government Polytechnic Haldwani", abbr: "GP Haldwani", city: "Haldwani", type: "Government", est: 1964, category: "Engineering" },
    { name: "Government Polytechnic Almora", abbr: "GP Almora", city: "Almora", type: "Government", est: 1954, category: "Engineering" },
    { name: "Government Polytechnic Pithoragarh", abbr: "GP Pithoragarh", city: "Pithoragarh", type: "Government", est: 1975, category: "Engineering" }
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";
    let isPolytechnic = col.name.includes("Polytechnic");

    if (isPolytechnic) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering</strong></td><td>3 Years</td><td>\u20B98K — \u20B915K</td><td>10th Pass with Science/Math</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Lateral Entry Diploma</strong></td><td>2 Years</td><td>\u20B98K — \u20B915K</td><td>12th PCM / ITI</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `UBTER (Uttarakhand Board of Technical Education) conducts JEEP (Joint Engineering Examination Polytechnic).`;
        placementInfo = "High demand across SIDCUL industrial estates spanning Haridwar, Pantnagar, and Dehradun corridors.";
    } else if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B950K — \u20B918L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B91.5L — \u20B925L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr.includes("AIIMS") ? "MCC counseling strictly." : "HNBUMU regulates state quota (85%) counseling purely on NEET matrices.";
        placementInfo = "Mandatory hilly-terrain bonds (up to 3 years) are heavily enforced by the state government for subsidised/state seat holders.";
    } else if (col.category === 'Agriculture') {
        coursesHtml = `<tr><td><strong>B.Sc (Hons) Agriculture/Forestry</strong></td><td>4 Years</td><td>\u20B940K — \u20B91.5L</td><td>10+2 PCB/PCM + GBPUAT/ICAR Ent.</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Sc / Ph.D in Forestry</strong></td><td>2-3 Years</td><td>\u20B980K — \u20B92L</td><td>B.Sc Agri/Forestry + UKSEE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Pantnagar conducts its own prestigious entrance test. ICAR AIEEA scores are also accepted.";
        placementInfo = "Pantnagar is the harbinger of India's Green Revolution. Incredible placements across FMCG, seed tech, and government central forest departments.";
    } else if (col.category === 'Engineering') {
        let isElite = col.abbr.includes("IIT") || col.abbr.includes("NIT");
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isElite ? '6L' : '3.5L'} — \u20B9${isElite ? '11L' : '15L'}</td><td>10+2 PCM + ${isElite ? 'JEE Main/Adv' : 'JEE Main / UKSEE'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B94L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isElite ? "JoSAA / CSAB centralized counseling based on JEE ranks." : "UTU coordinates counseling utilizing JEE Main AIR for state seats. Private entities conduct direct intakes or their own tests (like UPESEAT).";
        if (col.abbr === "UPES") placementInfo = "Known heavily for core Oil & Gas, Energy, Cyber Security, and specialized corporate placements.";
        else if (col.abbr === "IIT Roorkee") placementInfo = "Asia's oldest technical institute. Absolute pinnacle packages matching global Ivy leagues across CS, Civil, and Management arrays.";
        else placementInfo = "Heavy placements mapping directly into Delhi-NCR tech clusters and local SIDCUL belts.";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B95L — \u20B918L</td><td>Graduation + CAT/MAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA</strong></td><td>3 Years</td><td>\u20B92.5L — \u20B98L</td><td>10+2 Merit + Interview</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "IIM Kashipur" ? "Strictly CAT." : "Private B-Schools like DBS and IUU accept MAT/CMAT/CAT alongside GD-PI rounds.";
        placementInfo = "High focus on FMCG, supply chain (Kashipur belt), and analytics.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>\u20B93L — \u20B915L</td><td>10+2 + CLAT/LSAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1 Year</td><td>\u20B91L — \u20B93L</td><td>LLB Merit / CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "State Universities conduct distinct faculty-level entrance examinations alongside CLAT benchmarks.";
        placementInfo = "Excellent state judicial services track record alongside Dehradun/Delhi corporate litigation roles.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3 Years</td><td>\u20B95K — \u20B930K</td><td>10+2 Merit / CUET / UTU</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B910K — \u20B940K</td><td>Bachelor's + State Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "KU, HNBGU, and Sri Dev Suman University predominantly rely on Common University Entrance Test (CUET) or merit aggregations.";
        placementInfo = "Primary feeder route for teachers, government officials, and the Uttarakhand Public Service Commission (UKPSC).";
    }

    const tabsHtml = getTabsHtml(col.category);
    const typeLabel = isPolytechnic ? 'Government Diploma' : col.type;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life in Uttarakhand. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, UKSEE, Uttarakhand Colleges, Dehradun Universities, NextCampus">
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
      "url": "https://nextcampus.com/colleges/uttarakhand/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/uttarakhand/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Uttarakhand</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Uttarakhand, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.3</strong>/5
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
                    <p>${col.name} (${col.abbr}) represents the educational heartbeat of ${col.city}, Uttarakhand. Established in ${col.est}, the institution thrives on delivering excellent technical, scientific, and arts-focused pedagogy deeply influenced by the Himalayan biosphere and the rapid commercialization of Dehradun/Roorkee clusters.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / CUET Metric</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Centralized Counselling</h4><p>Appropriate technical/medical state bodies coordinate allocations incorporating 15-30% reserved state quotas for Uttarakhand domiciles.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Final Submission</h4><p>Rigorous tracking of Permanent Resident Certificates (PRC) by Tehsildars within Uttarakhand territories alongside high school mark sheets.</p></div></div>
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
                    <p>Average Rating: <strong>4.3 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The blend of pristine climates and exceptional pedagogy makes studying in Uttarakhand unbeatable. Placements are heavily catching up to Delhi-NCR standards."</p>
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
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels</span></div>
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

    for (const col of ukColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'uttarakhand', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // Use LPU CSS as base for rapid deployment of decouple protocol
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        // Scoring logic
        let baseScore = 8.1;
        if (col.abbr.includes("IIT") || col.abbr.includes("AIIMS")) baseScore = 9.8;
        else if (col.abbr.includes("UPES") || col.abbr.includes("GEU") || col.abbr.includes("IIM")) baseScore = 8.9;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Uttarakhand', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/${collegeSlug}/${collegeSlug}.html',
      rating: '4.3', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    // Inject into home.js
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Uttarakhand Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Uttarakhand Colleges to inject.`);
    }
}

processAll();
