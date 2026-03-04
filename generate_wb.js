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

const wbColleges = [
    // Universities
    { name: "University of Calcutta", abbr: "CU", city: "Kolkata", type: "State", est: 1857, category: "Arts & Science" },
    { name: "Jadavpur University", abbr: "JU", city: "Kolkata", type: "State", est: 1955, category: "Engineering" }, // Excellent in Engg + Arts
    { name: "Presidency University", abbr: "PU", city: "Kolkata", type: "State", est: 1817, category: "Arts & Science" },
    { name: "University of Burdwan", abbr: "BU", city: "Bardhaman", type: "State", est: 1960, category: "Arts & Science" },
    { name: "University of North Bengal", abbr: "NBU", city: "Siliguri", type: "State", est: 1962, category: "Arts & Science" },
    { name: "Kalyani University", abbr: "KU", city: "Kalyani", type: "State", est: 1960, category: "Arts & Science" },
    { name: "Vidyasagar University", abbr: "VU", city: "Midnapore", type: "State", est: 1981, category: "Arts & Science" },
    { name: "Rabindra Bharati University", abbr: "RBU", city: "Kolkata", type: "State", est: 1962, category: "Arts & Science" },
    { name: "West Bengal State University", abbr: "WBSU", city: "Barasat", type: "State", est: 2008, category: "Arts & Science" },
    { name: "Aliah University", abbr: "AU", city: "Kolkata", type: "State", est: 1780, category: "Arts & Science" },

    // Engineering Institutes
    { name: "Indian Institute of Technology Kharagpur", abbr: "IIT Kharagpur", city: "Kharagpur", type: "Government", est: 1951, category: "Engineering" },
    { name: "National Institute of Technology Durgapur", abbr: "NIT Durgapur", city: "Durgapur", type: "Government", est: 1960, category: "Engineering" },
    { name: "Indian Institute of Engineering Science and Technology Shibpur", abbr: "IIEST Shibpur", city: "Howrah", type: "Government", est: 1856, category: "Engineering" },
    { name: "Jadavpur University Faculty of Engineering", abbr: "JU FOE", city: "Kolkata", type: "State", est: 1906, category: "Engineering" },
    { name: "Heritage Institute of Technology", abbr: "HITK", city: "Kolkata", type: "Private", est: 2001, category: "Engineering" },
    { name: "Haldia Institute of Technology", abbr: "HIT Haldia", city: "Haldia", type: "Private", est: 1996, category: "Engineering" },
    { name: "Institute of Engineering and Management", abbr: "IEM", city: "Kolkata", type: "Private", est: 1989, category: "Engineering" },
    { name: "Techno India University", abbr: "TIU", city: "Kolkata", type: "Private", est: 2012, category: "Engineering" },

    // Medical Colleges
    { name: "Medical College and Hospital Kolkata", abbr: "MCK", city: "Kolkata", type: "Government", est: 1835, category: "Medical" },
    { name: "RG Kar Medical College and Hospital", abbr: "RGKMCH", city: "Kolkata", type: "Government", est: 1886, category: "Medical" },
    { name: "Nil Ratan Sircar Medical College", abbr: "NRSMC", city: "Kolkata", type: "Government", est: 1873, category: "Medical" },
    { name: "Calcutta National Medical College", abbr: "CNMC", city: "Kolkata", type: "Government", est: 1948, category: "Medical" },
    { name: "Bankura Sammilani Medical College", abbr: "BSMC", city: "Bankura", type: "Government", est: 1956, category: "Medical" },
    { name: "North Bengal Medical College", abbr: "NBMC", city: "Siliguri", type: "Government", est: 1968, category: "Medical" },

    // Major Arts / Commerce / Science Colleges
    { name: "Presidency College Kolkata", abbr: "Presidency", city: "Kolkata", type: "State", est: 1817, category: "Arts & Science" }, // Redundant with Univ, but we'll generate
    { name: "St. Xavier's College Kolkata", abbr: "SXC Kolkata", city: "Kolkata", type: "Autonomous", est: 1860, category: "Arts & Science" },
    { name: "Scottish Church College", abbr: "SCC", city: "Kolkata", type: "Private Aided", est: 1830, category: "Arts & Science" },
    { name: "Bethune College", abbr: "BC", city: "Kolkata", type: "Government", est: 1879, category: "Arts & Science" },
    { name: "Lady Brabourne College", abbr: "LBC", city: "Kolkata", type: "Government", est: 1939, category: "Arts & Science" },
    { name: "Maulana Azad College Kolkata", abbr: "MAC", city: "Kolkata", type: "Government", est: 1926, category: "Arts & Science" },

    // Law Colleges
    { name: "The West Bengal National University of Juridical Sciences", abbr: "WBNUJS", city: "Kolkata", type: "State", est: 1999, category: "Law" },
    { name: "Jogesh Chandra Chaudhuri Law College", abbr: "JCCLC", city: "Kolkata", type: "Private", est: 1970, category: "Law" }
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.abbr === "JU" || col.abbr === "JU FOE") {
        coursesHtml = `<tr><td><strong>B.E. / B.Tech</strong></td><td>4 Years</td><td>&#8377;10K — &#8377;1.2L</td><td>10+2 PCM + WBJEE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>B.A. / B.Sc</strong></td><td>3 Years</td><td>&#8377;5K — &#8377;15K</td><td>10+2 + Admission Test / Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Engineering relies strictly on WBJEE rank. Arts & Sciences conduct their own highly competitive admission tests.";
        placementInfo = "Phenomenal ROI. Engineering placements rival top IITs/NITs with packages frequently crossing 40-50+ LPA.";
    } else if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>&#8377;40K — &#8377;1.5L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>&#8377;1L — &#8377;2L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions managed by WBMCC (West Bengal Medical Counselling Committee) based on NEET scores. State domicile required for 85% quota.";
        placementInfo = "1-year mandatory clinical internship. WBUHS (West Bengal University of Health Sciences) affiliated degrees highly respected pan-India.";
    } else if (col.category === 'Engineering') {
        let isNational = col.abbr.includes("IIT") || col.abbr.includes("NIT") || col.abbr.includes("IIEST");
        coursesHtml = `<tr><td><strong>B.Tech / B.E.</strong></td><td>4 Years</td><td>&#8377;${isNational ? '5L' : '3L'} — &#8377;${isNational ? '10L' : '5L'}</td><td>10+2 PCM + ${isNational ? 'JEE Main/Adv' : 'WBJEE / JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech / MCA</strong></td><td>2/3 Years</td><td>&#8377;1L — &#8377;3L</td><td>Entrance Exam (GATE / JECA)</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isNational ? "Admissions through JoSAA counseling based on JEE ranks." : "State colleges accept WBJEE (West Bengal Joint Entrance Examinations) and JEE Main.";
        placementInfo = "Kolkata IT hubs (Sector V, New Town) absorb heavily from IEM, Heritage, Techno, and Haldia with TCS and Cognizant being mass recruiters.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>&#8377;5L — &#8377;12L (NLU)</td><td>10+2 + CLAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1 Year</td><td>&#8377;1L — &#8377;3L</td><td>LLB + CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === 'WBNUJS' ? "Strictly via Common Law Admission Test (CLAT)." : "Via Calcutta University BA LLB Entrance Examination.";
        placementInfo = "WBNUJS holds elite placements in tier-1 corporate law firms (Amarchand, Khaitan & Co) and Magic Circle firms in London.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com (Hons)</strong></td><td>3-4 Years</td><td>&#8377;5K — &#8377;50K</td><td>10+2 Merit / CUET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>&#8377;8K — &#8377;60K</td><td>Bachelor's Degree + Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Historically merit-based on class 12 marks. Under NEP 2020, central and standalone exams (like St. Xavier's own test) are evolving.";
        placementInfo = "Great foundation for civil services, academia, and professional degrees. St. Xavier's & Presidency hold strong direct corporate placements.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const feesSectionHtml = col.category !== 'Medical' ? `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Details about the fee structure and West Bengal state specific scholarships.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>Swami Vivekananda Merit CM Scholarship (SVMCM)</h4><p>Provides major financial assistance to meritorious students belonging to economically backward families in West Bengal.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>Kanyashree and Oasis</h4><p>Targeted scholarships for female students and SC/ST/OBC groups respectively.</p></div>
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
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, WBJEE, West Bengal colleges, NextCampus">
    <link rel="icon" type="image/svg+xml" href="../../../favicon/favicon.svg">
    <link rel="icon" type="image/png" sizes="96x96" href="../../../favicon/favicon-96x96.png">
    <link rel="shortcut icon" href="../../../favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="../../../favicon/apple-touch-icon.png">
    <link rel="manifest" href="../../../favicon/site.webmanifest">
    <meta name="theme-color" content="#0056D2">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../../shared/global.css">
    <link rel="stylesheet" href="../../../shared/header.css">
    <link rel="stylesheet" href="../../../shared/footer.css">
    <link rel="stylesheet" href="../../../shared/college.css">
    <link rel="stylesheet" href="${collegeSlug}.css">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "${col.name}",
      "alternateName": "${col.abbr}",
      "url": "https://nextcampus.com/colleges/west-bengal/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/west-bengal/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, West Bengal</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, West Bengal, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.3</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${col.type}</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">&#127942; Elite Tier</span>
                            <span class="badge-accr">Recognized</span>
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
                    <p>${col.name} (${col.abbr}) is a landmark educational institution situated in ${col.city}, West Bengal. Established in ${col.est}, it has deeply influenced the rich intellectual, cultural, and political history of eastern India, and continues to produce thought leaders across various disciplines.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Exam (WBJEE/NEET/Merit)</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling Process</h4><p>Participate in State (WBJEEB / WBMCC) or Central counselling based on your entrance rank.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Verify original documents including Bengal domicile certificates (if claiming 85% state quota) and secure admission.</p></div></div>
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
                    <p>Average Rating: <strong>4.3 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Student</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Incredible legacy and outstanding peer group. The ROI on fees is unbeatable, though infrastructure in older buildings could be modernized."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Heritage Building</span></div>
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

    <script src="../../../shared/header.js"></script>
    <script src="../../../shared/footer.js"></script>
    <script src="${collegeSlug}.js"></script>
</body>
</html>`;
}

function processAll() {
    const newCards = [];
    let homeContent = fs.readFileSync(homeJsPath, 'utf8');

    for (const col of wbColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'west-bengal', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        // Create card data
        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")} (${col.abbr})',
      city: '${col.city}', state: 'West Bengal', type: '${col.type}',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/${collegeSlug}/${collegeSlug}.html',
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
            console.log(`\n✅ Injected ${newCards.length} West Bengal Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new West Bengal Colleges to inject.`);
    }
}

processAll();

