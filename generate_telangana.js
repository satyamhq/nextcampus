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

const tgColleges = [
    // Top Universities
    { name: "University of Hyderabad", abbr: "UoH", city: "Hyderabad", type: "Central", est: 1974, category: "Multidisciplinary" },
    { name: "Osmania University", abbr: "OU", city: "Hyderabad", type: "State", est: 1918, category: "Arts & Science" },
    { name: "Jawaharlal Nehru Technological University Hyderabad", abbr: "JNTUH", city: "Hyderabad", type: "State", est: 1972, category: "Engineering" },
    { name: "Kakatiya University", abbr: "KU", city: "Warangal", type: "State", est: 1976, category: "Arts & Science" },
    { name: "Mahatma Gandhi University Nalgonda", abbr: "MGU", city: "Nalgonda", type: "State", est: 2007, category: "Arts & Science" },
    { name: "Satavahana University", abbr: "SU", city: "Karimnagar", type: "State", est: 2008, category: "Arts & Science" },
    { name: "Palamuru University", abbr: "PU", city: "Mahbubnagar", type: "State", est: 2008, category: "Arts & Science" },
    { name: "Telangana University", abbr: "TU", city: "Nizamabad", type: "State", est: 2006, category: "Arts & Science" },
    { name: "Dr. B. R. Ambedkar Open University", abbr: "BRAOU", city: "Hyderabad", type: "State Open", est: 1982, category: "Arts & Science" },
    { name: "Professor Jayashankar Telangana State Agricultural University", abbr: "PJTSAU", city: "Hyderabad", type: "State", est: 2014, category: "Multidisciplinary" },

    // Engineering Colleges
    { name: "Indian Institute of Technology Hyderabad", abbr: "IITH", city: "Sangareddy", type: "Government", est: 2008, category: "Engineering" },
    { name: "National Institute of Technology Warangal", abbr: "NITW", city: "Warangal", type: "Government", est: 1959, category: "Engineering" },
    { name: "International Institute of Information Technology Hyderabad", abbr: "IIIT Hyderabad", city: "Hyderabad", type: "PPP Mode", est: 1998, category: "Engineering" },
    { name: "BITS Pilani Hyderabad Campus", abbr: "BITS Hyderabad", city: "Hyderabad", type: "Private", est: 2008, category: "Engineering" },
    { name: "VNR Vignana Jyothi Institute of Engineering and Technology", abbr: "VNR VJIET", city: "Hyderabad", type: "Private", est: 1995, category: "Engineering" },
    { name: "CBIT Hyderabad", abbr: "CBIT", city: "Hyderabad", type: "Private", est: 1979, category: "Engineering" },
    { name: "Vasavi College of Engineering", abbr: "VCE", city: "Hyderabad", type: "Private", est: 1981, category: "Engineering" },
    { name: "Gokaraju Rangaraju Institute of Engineering and Technology", abbr: "GRIET", city: "Hyderabad", type: "Private", est: 1997, category: "Engineering" },
    { name: "CVR College of Engineering", abbr: "CVR", city: "Ibrahimpatnam", type: "Private", est: 2001, category: "Engineering" },
    { name: "Mahatma Gandhi Institute of Technology", abbr: "MGIT", city: "Hyderabad", type: "Private", est: 1997, category: "Engineering" },

    // Medical Colleges
    { name: "Osmania Medical College", abbr: "OMC", city: "Hyderabad", type: "State", est: 1846, category: "Medical" },
    { name: "Gandhi Medical College", abbr: "GMC", city: "Secunderabad", type: "State", est: 1954, category: "Medical" },
    { name: "Kakatiya Medical College", abbr: "KMC", city: "Warangal", type: "State", est: 1959, category: "Medical" },
    { name: "ESI Medical College Hyderabad", abbr: "ESIC MC", city: "Hyderabad", type: "Government", est: 2016, category: "Medical" },
    { name: "Government Medical College Nizamabad", abbr: "GMC Nizamabad", city: "Nizamabad", type: "State", est: 2013, category: "Medical" },

    // Management Colleges
    { name: "Indian School of Business", abbr: "ISB", city: "Hyderabad", type: "Private", est: 2001, category: "Management" },
    { name: "Institute of Public Enterprise", abbr: "IPE", city: "Hyderabad", type: "Private", est: 1964, category: "Management" },
    { name: "ICFAI Business School Hyderabad", abbr: "IBS", city: "Hyderabad", type: "Private", est: 1995, category: "Management" },
    { name: "Woxsen University", abbr: "Woxsen", city: "Hyderabad", type: "Private", est: 2014, category: "Management" },

    // Law Colleges
    { name: "NALSAR University of Law", abbr: "NALSAR", city: "Hyderabad", type: "State", est: 1998, category: "Law" },
    { name: "University College of Law Osmania University", abbr: "UCL OU", city: "Hyderabad", type: "State", est: 1899, category: "Law" },

    // Other Major Colleges
    { name: "Anurag University", abbr: "AU", city: "Hyderabad", type: "Private", est: 2020, category: "Engineering" },
    { name: "JNTUH College of Engineering Hyderabad", abbr: "JNTUH CEH", city: "Hyderabad", type: "State", est: 1965, category: "Engineering" },
    { name: "JNTUH College of Engineering Karimnagar", abbr: "JNTUH CEK", city: "Karimnagar", type: "State", est: 2007, category: "Engineering" },
    { name: "JNTUH College of Engineering Manthani", abbr: "JNTUH CEM", city: "Manthani", type: "State", est: 2010, category: "Engineering" },
    { name: "Guru Nanak Institutions Technical Campus", abbr: "GNITC", city: "Ibrahimpatnam", type: "Private", est: 2001, category: "Engineering" },
    { name: "MLR Institute of Technology", abbr: "MLRIT", city: "Hyderabad", type: "Private", est: 2005, category: "Engineering" },
    { name: "Malla Reddy Engineering College", abbr: "MREC", city: "Secunderabad", type: "Private", est: 2002, category: "Engineering" },
    { name: "Malla Reddy College of Engineering and Technology", abbr: "MRCET", city: "Secunderabad", type: "Private", est: 2004, category: "Engineering" },
    { name: "Geethanjali College of Engineering and Technology", abbr: "GCET", city: "Keesara", type: "Private", est: 2005, category: "Engineering" },
    { name: "Sreenidhi Institute of Science and Technology", abbr: "SNIST", city: "Ghatkesar", type: "Private", est: 1997, category: "Engineering" },
    { name: "CMR College of Engineering and Technology", abbr: "CMRCET", city: "Hyderabad", type: "Private", est: 2002, category: "Engineering" },
    { name: "CMR Technical Campus", abbr: "CMRTC", city: "Hyderabad", type: "Private", est: 2009, category: "Engineering" },
    { name: "Institute of Aeronautical Engineering", abbr: "IARE", city: "Hyderabad", type: "Private", est: 2000, category: "Engineering" },
    { name: "Vardhaman College of Engineering", abbr: "VCE", city: "Shamshabad", type: "Private", est: 1999, category: "Engineering" },
    { name: "BVRIT Hyderabad College of Engineering", abbr: "BVRITH", city: "Hyderabad", type: "Private", est: 2012, category: "Engineering" },
    { name: "BVRIT Narsapur", abbr: "BVRIT", city: "Narsapur", type: "Private", est: 1997, category: "Engineering" },
    { name: "TKR College of Engineering and Technology", abbr: "TKRCET", city: "Meerpet", type: "Private", est: 2002, category: "Engineering" },
    { name: "Sreyas Institute of Engineering and Technology", abbr: "SIET", city: "Hyderabad", type: "Private", est: 2011, category: "Engineering" },
    { name: "St. Martin's Engineering College", abbr: "SMEC", city: "Secunderabad", type: "Private", est: 2002, category: "Engineering" },
    { name: "Methodist College Hyderabad", abbr: "MCET", city: "Hyderabad", type: "Private", est: 2008, category: "Engineering" },
    { name: "St. Francis College for Women", abbr: "SFC", city: "Hyderabad", type: "Private", est: 1959, category: "Arts & Science" },
    { name: "Nizam College", abbr: "Nizam", city: "Hyderabad", type: "Government", est: 1887, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B91.5L — \u20B960L (Govt/Mgmt)</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS / DM / M.Ch</strong></td><td>3 Years</td><td>\u20B91L — \u20B930L</td><td>MBBS/MD + NEET PG/SS</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "ESIC MC" ? "Strict central and ESIC ward quota allocations via MCC mapped perfectly to NEET distributions." : "KNRUHS (Kaloji Narayana Rao University of Health Sciences) manages the highly competitive state quota allocations utilizing distinct TS domiciliary rules.";
        placementInfo = "Osmania and Gandhi represent peak prestige within the Telugu-speaking states, boasting immense clinical bandwidth. Graduates easily transition to elite postgraduate pathways or international boards (USMLE/PLAB).";
    } else if (col.category === 'Engineering') {
        let isElite = col.abbr.includes("IIT") || col.abbr === "NITW" || col.abbr === "BITS Hyderabad";
        let isJNTU = col.abbr.includes("JNTU");

        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isElite ? '8L' : '4L'} — \u20B9${isElite ? '18L' : '6L'}</td><td>10+2 PCM + ${isElite ? (col.abbr === "BITS Hyderabad" ? 'BITSAT' : 'JEE Main/Adv') : 'TS EAMCET / JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B93L</td><td>B.Tech + GATE / TS PGECET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;

        admissionHtml = isElite ? (col.abbr === "BITS Hyderabad" ? "Exclusively through BITSAT scores holding zero reservations." : "JoSAA / CSAB centralized counseling relying strictly on JEE Advanced (IITH) or Main (NITW/IIITH).") : "TS EAMCET rules the roost! The Telangana State Council of Higher Education (TSCHE) orchestrates massive web counseling for state engineering seats.";
        if (isJNTU) admissionHtml += " JNTUH constituent colleges see absolute primacy in TS EAMCET rank thresholds.";

        placementInfo = isElite ? "IIIT Hyderabad, IIT Hyderabad, and NIT Warangal routinely shatter placement records, deploying graduates straight into Silicon Valley MAANG nodes." : "Hyderabad's 'Cyberabad' tech boom drives exceptional bulk and niche hirings across massive IT service players (TCS, TechM, Infosys) and product giants (Google, Microsoft, Amazon).";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>PGP / MBA / PGDM</strong></td><td>1-2 Years</td><td>\u20B98L — \u20B940L</td><td>Graduation + ${col.abbr === "ISB" ? 'GMAT/GRE' : 'CAT/XAT/TS ICET'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA</strong></td><td>3-4 Years</td><td>\u20B94L — \u20B912L</td><td>10+2 Merit / UGAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "ISB" ? "Global profiles emphasizing deep work experience coupled with towering GMAT scores." : "IBS relies on the proprietary IBSAT, while institutions like IPE strictly filter via CAT/XAT percentiles.";
        placementInfo = col.abbr === "ISB" ? "The ISB cohort commands staggering domestic packages, often vaulting mid-level professionals directly into CXO/VP brackets." : "Hyderabad operates as a critical regional office cluster for Deloitte, KPMG, and major banks, absorbing immense management talent.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>\u20B92L — \u20B912L</td><td>10+2 + ${col.abbr === "NALSAR" ? 'CLAT' : 'TS LAWCET'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1-2 Years</td><td>\u20B91L — \u20B93L</td><td>LLB Merit / CLAT PG / TS PGLCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "NALSAR" ? "CLAT exclusively." : "Osmania University Law feeds directly through state-level TS LAWCET rankings.";
        placementInfo = "NALSAR sits at the absolute pinnacle of Indian legal education, directing massive talent pools to tier-1 corporate firms. OU grads heavily augment the Telangana High Court circuits.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3-4 Years</td><td>\u20B915K — \u20B92L</td><td>10+2 Merit / DOST App / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B920K — \u20B91L</td><td>Bachelor's + CPGET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "UoH" ? "University of Hyderabad utilizes CUET mappings heavily for its central offerings." : "Degree Online Services Telangana (DOST) is the gigantic single-window portal handling all state university undergraduate enrollments.";
        placementInfo = "Strong foundational routing toward TSPSC (State Public Service), immense banking/SSC intakes, and postgraduate research domains.";
    }

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages in Telangana, scholarships, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, TS EAMCET, Telangana Colleges, Hyderabad Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/telangana/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/telangana/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Telangana</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Telangana, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.3</strong>/5
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
                    <p>${col.name} (${col.abbr}) serves as a powerhouse of academic and technical throughput within ${col.city}. Established in ${col.est}, it structurally supports the colossal expansion of Telangana's IT, Medical, and corporate landscapes spanning across "Cyberabad" and the state's deep interiors.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / TS Metrics</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling Procedures</h4><p>Entities rely heavily on either independent interview structures/national exams (JoSAA/MCC) or nodal agencies like TSCHE handling vast pools via TS EAMCET / DOST.</p></div></div>
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
                        <p>"Hyderabad is physically expanding into a global tier-1 mega-city, and the corresponding placement pull seen here on campus mirrors that explosive corporate scaling."</p>
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

    for (const col of tgColleges) {
        const collegeSlug = slugify(col.name);

        // Check dupe
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'telangana', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS base
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 8.1; // Default
        if (col.abbr.includes("IIT") || col.abbr === "ISB" || col.abbr === "UoH" || col.abbr === "NITW" || col.abbr === "NALSAR") baseScore = 9.8;
        else if (col.abbr === "BITS Hyderabad" || col.abbr === "OU" || col.abbr === "JNTUH") baseScore = 9.5;
        else if (col.abbr === "CBIT" || col.abbr === "VNR VJIET") baseScore = 8.8;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Telangana', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 90 : 80}, nirf: 0,
      link: '../colleges/telangana/${collegeSlug}/${collegeSlug}.html',
      rating: '4.3', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Telangana Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Telangana Colleges to inject.`);
    }
}

processAll();
