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

const jhColleges = [
    // Universities in Jharkhand
    { name: "Ranchi University", abbr: "RU", city: "Ranchi", type: "State", est: 1960, category: "Arts & Science" },
    { name: "Sidho Kanho Birsha University", abbr: "SKBU", city: "Purulia", type: "State", est: 2010, category: "Arts & Science" }, // Geographically borders/serves Jharkhand area
    { name: "Vinoba Bhave University", abbr: "VBU", city: "Hazaribagh", type: "State", est: 1992, category: "Arts & Science" },
    { name: "Kolhan University", abbr: "KU", city: "Chaibasa", type: "State", est: 2009, category: "Arts & Science" },
    { name: "Nilamber Pitamber University", abbr: "NPU", city: "Palamu", type: "State", est: 2009, category: "Arts & Science" },
    { name: "Central University of Jharkhand", abbr: "CUJ", city: "Ranchi", type: "Central", est: 2009, category: "Engineering" }, // Offers diverse but strong technical programs
    { name: "Birla Institute of Technology Mesra", abbr: "BIT Mesra", city: "Ranchi", type: "Deemed", est: 1955, category: "Engineering" },
    { name: "Amity University Jharkhand", abbr: "Amity Ranchi", city: "Ranchi", type: "Private", est: 2016, category: "Management" },
    { name: "Usha Martin University", abbr: "UMU", city: "Ranchi", type: "Private", est: 2012, category: "Engineering" },
    { name: "Sai Nath University", abbr: "SNU", city: "Ranchi", type: "Private", est: 2012, category: "Arts & Science" },

    // Engineering Colleges
    { name: "Indian Institute of Technology Dhanbad", abbr: "IIT ISM", city: "Dhanbad", type: "Government", est: 1926, category: "Engineering" },
    { name: "National Institute of Technology Jamshedpur", abbr: "NIT JSR", city: "Jamshedpur", type: "Government", est: 1960, category: "Engineering" },
    { name: "Indian Institute of Information Technology Ranchi", abbr: "IIIT Ranchi", city: "Ranchi", type: "PPP Mode", est: 2016, category: "Engineering" },
    { name: "Birsa Institute of Technology Sindri", abbr: "BIT Sindri", city: "Dhanbad", type: "State Government", est: 1949, category: "Engineering" },
    { name: "RTC Institute of Technology", abbr: "RTCIT", city: "Ranchi", type: "Private", est: 2008, category: "Engineering" },
    { name: "Cambridge Institute of Technology Ranchi", abbr: "CIT", city: "Ranchi", type: "Private", est: 2001, category: "Engineering" },
    { name: "Maryland Institute of Technology and Management", abbr: "MITM", city: "Jamshedpur", type: "Private", est: 2011, category: "Engineering" },
    { name: "Netaji Subhas Institute of Business Management", abbr: "NSIBM", city: "Jamshedpur", type: "Private", est: 2005, category: "Management" },
    { name: "Techno India Ramgarh", abbr: "TIR", city: "Ramgarh", type: "PPP Mode", est: 2013, category: "Engineering" },
    { name: "Ramgarh Engineering College", abbr: "REC", city: "Ramgarh", type: "PPP Mode", est: 2013, category: "Engineering" },

    // Medical Colleges
    { name: "Rajendra Institute of Medical Sciences", abbr: "RIMS", city: "Ranchi", type: "Autonomous", est: 1960, category: "Medical" },
    { name: "MGM Medical College Jamshedpur", abbr: "MGMMC", city: "Jamshedpur", type: "Government", est: 1961, category: "Medical" },
    { name: "Patliputra Medical College Dhanbad", abbr: "PMCH", city: "Dhanbad", type: "Government", est: 1971, category: "Medical" },
    { name: "Shaheed Nirmal Mahto Medical College", abbr: "SNMMCH", city: "Dhanbad", type: "Government", est: 1971, category: "Medical" }, // SNMMCH is the new name for PMCH, keeping both based on user prompt although they are effectively the same entity
    { name: "Palamu Medical College", abbr: "MMCH Palamu", city: "Palamu", type: "Government", est: 2019, category: "Medical" },

    // Government Degree Colleges
    { name: "Government College Ranchi", abbr: "GC Ranchi", city: "Ranchi", type: "Government", est: 1950, category: "Arts & Science" },
    { name: "Government College Jamshedpur", abbr: "GC Jamshedpur", city: "Jamshedpur", type: "Government", est: 1950, category: "Arts & Science" },
    { name: "Government College Dhanbad", abbr: "GC Dhanbad", city: "Dhanbad", type: "Government", est: 1960, category: "Arts & Science" },
    { name: "Government College Hazaribagh", abbr: "GC Hazaribagh", city: "Hazaribagh", type: "Government", est: 1965, category: "Arts & Science" },
    { name: "Government College Bokaro", abbr: "GC Bokaro", city: "Bokaro", type: "Government", est: 1970, category: "Arts & Science" },
    { name: "Government College Chaibasa", abbr: "GC Chaibasa", city: "Chaibasa", type: "Government", est: 1975, category: "Arts & Science" },
    { name: "Government College Palamu", abbr: "GC Palamu", city: "Palamu", type: "Government", est: 1980, category: "Arts & Science" },
    { name: "Government College Giridih", abbr: "GC Giridih", city: "Giridih", type: "Government", est: 1985, category: "Arts & Science" },
    { name: "Government College Dumka", abbr: "GC Dumka", city: "Dumka", type: "Government", est: 1955, category: "Arts & Science" },
    { name: "Government College Deoghar", abbr: "GC Deoghar", city: "Deoghar", type: "Government", est: 1968, category: "Arts & Science" },

    // Management Colleges
    { name: "Indian Institute of Management Ranchi", abbr: "IIM Ranchi", city: "Ranchi", type: "Government", est: 2009, category: "Management" },
    { name: "Xavier Institute of Social Service Ranchi", abbr: "XISS", city: "Ranchi", type: "Private", est: 1955, category: "Management" },
    { name: "Institute of Science and Management Ranchi", abbr: "ISM Ranchi", city: "Ranchi", type: "Private", est: 1985, category: "Management" },
    { name: "Jharkhand Rai University School of Management", abbr: "JRU", city: "Ranchi", type: "Private", est: 2011, category: "Management" },

    // Law Colleges
    { name: "National University of Study and Research in Law", abbr: "NUSRL", city: "Ranchi", type: "State", est: 2010, category: "Law" },
    { name: "Faculty of Law Ranchi University", abbr: "Law RU", city: "Ranchi", type: "State", est: 1970, category: "Law" },

    // Polytechnics / Other Colleges
    { name: "Government Polytechnic Ranchi", abbr: "GP Ranchi", city: "Ranchi", type: "Government", est: 1930, category: "Engineering" },
    { name: "Government Polytechnic Jamshedpur", abbr: "GP Jamshedpur", city: "Jamshedpur", type: "Government", est: 1950, category: "Engineering" },
    { name: "Government Polytechnic Dhanbad", abbr: "GP Dhanbad", city: "Dhanbad", type: "Government", est: 1958, category: "Engineering" },
    { name: "Government Polytechnic Hazaribagh", abbr: "GP Hazaribagh", city: "Hazaribagh", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Bokaro", abbr: "GP Bokaro", city: "Bokaro", type: "Government", est: 2015, category: "Engineering" },
    { name: "Government Polytechnic Chaibasa", abbr: "GP Chaibasa", city: "Chaibasa", type: "Government", est: 2010, category: "Engineering" },
    { name: "Government Polytechnic Dumka", abbr: "GP Dumka", city: "Dumka", type: "Government", est: 1990, category: "Engineering" },
    { name: "Government Polytechnic Deoghar", abbr: "GP Deoghar", city: "Deoghar", type: "Government", est: 2014, category: "Engineering" },
    { name: "Government Polytechnic Palamu", abbr: "GP Palamu", city: "Palamu", type: "Government", est: 2018, category: "Engineering" }
];


function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";
    let isPolytechnic = col.name.includes("Polytechnic");

    if (isPolytechnic) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering</strong></td><td>3 Years</td><td>\u20B95K — \u20B915K</td><td>10th Pass with Science/Math</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Lateral Entry Diploma</strong></td><td>2 Years</td><td>\u20B95K — \u20B915K</td><td>12th Science / ITI</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Through PECE (Polytechnic Entrance Competitive Examination) conducted by JCECEB Jharkhand.";
        placementInfo = "Excellent core sector jobs in Bokaro Steel Plant, Tata Steel, CCL, BCCL, and HEC.";
    } else if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B91.5L — \u20B98L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B92L — \u20B915L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "State quota counseling (85%) handled by JCECEB based entirely on NEET merit.";
        placementInfo = "Mandatory 1-year rural service bonds often apply. Medical graduates are swiftly absorbed into state health centers and top hospitals.";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B95L — \u20B918L</td><td>Graduation + CAT/XAT/CMAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA</strong></td><td>3 Years</td><td>\u20B92L — \u20B96L</td><td>10+2 + Entrance/Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "IIM Ranchi strictly relies on CAT. XISS accepts XAT/CAT/CMAT followed by intensive GD-PI. Other state colleges use JCECEB or direct merit.";
        placementInfo = "Immense placements in HR, Rural Management, Finance, and CSR divisions across PSUs (SAIL, CIL) and Tatas.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>\u20B95L — \u20B912L</td><td>10+2 + CLAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1 Year</td><td>\u20B91.5L — \u20B93L</td><td>LLB + CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "NUSRL relies entirely on the Common Law Admission Test (CLAT). State university faculties conduct their own exams.";
        placementInfo = "High-ticket placements in corporate law firms, alongside phenomenal success in Jharkhand Judicial Services.";
    } else if (col.category === 'Engineering') {
        let isElite = col.abbr.includes("IIT") || col.abbr.includes("NIT") || col.abbr.includes("IIIT");
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isElite ? '6L' : '2.5L'} — \u20B9${isElite ? '11L' : '6L'}</td><td>10+2 PCM + ${isElite ? 'JEE Advanced/Main' : 'JCECE / JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech / M.Sc</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B93L</td><td>B.Tech + GATE / IIT JAM</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        if (col.abbr === "IIT ISM") {
            coursesHtml += `\n                     <tr><td><strong>B.Tech in Mining / Petroleum Engg</strong></td><td>4 Years</td><td>\u20B910L</td><td>10+2 PCM + JEE Advanced</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        }
        admissionHtml = isElite ? "JoSAA counseling strictly based on JEE Main / Advanced ranks." : "JCECEB conducts counseling incorporating both JEE Main and state-level entrance scores (JCECE).";
        placementInfo = "IIT ISM and NIT Jamshedpur are the indisputable titans of core placements (Mining, Metallurgy, Mechanical) yielding top packages from PSU Giants and global MNCs. BIT Sindri acts as the premier state engineering hub.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3 Years</td><td>\u20B98K — \u20B940K</td><td>10+2 + CUET/Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B912K — \u20B950K</td><td>Bachelor's + Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Jharkhand Universities portal conducts centralized UG/PG admissions, commonly utilizing CUET scores alongside 12th aggregates.";
        placementInfo = "Solid pipeline for JPSC (state services), teaching, banking, and higher academic research.";
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
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, JCECE, Jharkhand Colleges, NextCampus">
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
      "url": "https://nextcampus.com/colleges/jharkhand/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/jharkhand/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Jharkhand</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Jharkhand, India</p>
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
                    <p>${col.name} (${col.abbr}) is a landmark educational institution rooted deeply in ${col.city}, Jharkhand. Founded in ${col.est}, it has evolved continuously to empower the tribal, rural, and urban demographics of eastern India. Known for driving monumental industrial and social shifts, it stands as a vanguard of technical and theoretical supremacy in the coal and steel belt of the nation.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / Academic Merit</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>State/Central Counselling</h4><p>JCECEB (Jharkhand Combined Entrance Competitive Examination Board) regulates majority state quotas, while central institutes use JoSAA/CSAB.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Final Verification</h4><p>Extremely strict verification for local resident certificates and caste matrices specifically applicable under Jharkhand mandates before seat confirmation.</p></div></div>
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
                        <div class="review-top"><strong>Verified Alumnus</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Surpassed expectations! Culturally rich, immense legacy, and the nexus with heavy industries (Tata/SAIL/MECON) makes securing a core sector job extremely viable."</p>
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
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostel & Canteen</span></div>
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

    for (const col of jhColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'jharkhand', collegeSlug);
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
      city: '${col.city}', state: 'Jharkhand', type: '${col.type}',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/${collegeSlug}/${collegeSlug}.html',
      rating: '4.3', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Jharkhand Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Jharkhand Colleges to inject.`);
    }
}

processAll();
