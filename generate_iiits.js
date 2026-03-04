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

const iiitColleges = [
    // Centrally Funded IIITs
    { name: "Indian Institute of Information Technology Allahabad", abbr: "IIITA", city: "Prayagraj", stateDir: "uttar-pradesh", stateName: "Uttar Pradesh", type: "Government (CFTI)", est: 1999, category: "Engineering" },
    { name: "Indian Institute of Information Technology Gwalior", abbr: "ABV-IIITM Gwalior", city: "Gwalior", stateDir: "madhya-pradesh", stateName: "Madhya Pradesh", type: "Government (CFTI)", est: 1997, category: "Engineering" },
    { name: "Indian Institute of Information Technology Jabalpur", abbr: "IIITDM Jabalpur", city: "Jabalpur", stateDir: "madhya-pradesh", stateName: "Madhya Pradesh", type: "Government (CFTI)", est: 2005, category: "Engineering" },
    { name: "Indian Institute of Information Technology Kancheepuram", abbr: "IIITDM Kancheepuram", city: "Chennai", stateDir: "tamil-nadu", stateName: "Tamil Nadu", type: "Government (CFTI)", est: 2007, category: "Engineering" },
    { name: "Indian Institute of Information Technology Kurnool", abbr: "IIITDM Kurnool", city: "Kurnool", stateDir: "andhra-pradesh", stateName: "Andhra Pradesh", type: "Government (CFTI)", est: 2015, category: "Engineering" },

    // IIITs under PPP Model
    { name: "Indian Institute of Information Technology Sri City", abbr: "IIIT Sri City", city: "Chittoor", stateDir: "andhra-pradesh", stateName: "Andhra Pradesh", type: "PPP Mode", est: 2013, category: "Engineering" },
    { name: "Indian Institute of Information Technology Guwahati", abbr: "IIIT Guwahati", city: "Guwahati", stateDir: "assam", stateName: "Assam", type: "PPP Mode", est: 2013, category: "Engineering" },
    { name: "Indian Institute of Information Technology Una", abbr: "IIIT Una", city: "Una", stateDir: "himachal-pradesh", stateName: "Himachal Pradesh", type: "PPP Mode", est: 2014, category: "Engineering" },
    { name: "Indian Institute of Information Technology Kota", abbr: "IIIT Kota", city: "Kota", stateDir: "rajasthan", stateName: "Rajasthan", type: "PPP Mode", est: 2013, category: "Engineering" },
    { name: "Indian Institute of Information Technology Sonepat", abbr: "IIIT Sonepat", city: "Sonipat", stateDir: "haryana", stateName: "Haryana", type: "PPP Mode", est: 2014, category: "Engineering" },
    { name: "Indian Institute of Information Technology Kalyani", abbr: "IIIT Kalyani", city: "Kalyani", stateDir: "west-bengal", stateName: "West Bengal", type: "PPP Mode", est: 2014, category: "Engineering" },
    { name: "Indian Institute of Information Technology Lucknow", abbr: "IIIT Lucknow", city: "Lucknow", stateDir: "uttar-pradesh", stateName: "Uttar Pradesh", type: "PPP Mode", est: 2015, category: "Engineering" },
    { name: "Indian Institute of Information Technology Dharwad", abbr: "IIIT Dharwad", city: "Dharwad", stateDir: "karnataka", stateName: "Karnataka", type: "PPP Mode", est: 2015, category: "Engineering" },
    { name: "Indian Institute of Information Technology Pune", abbr: "IIIT Pune", city: "Pune", stateDir: "maharashtra", stateName: "Maharashtra", type: "PPP Mode", est: 2016, category: "Engineering" },
    { name: "Indian Institute of Information Technology Nagpur", abbr: "IIIT Nagpur", city: "Nagpur", stateDir: "maharashtra", stateName: "Maharashtra", type: "PPP Mode", est: 2016, category: "Engineering" },
    { name: "Indian Institute of Information Technology Bhopal", abbr: "IIIT Bhopal", city: "Bhopal", stateDir: "madhya-pradesh", stateName: "Madhya Pradesh", type: "PPP Mode", est: 2017, category: "Engineering" },
    { name: "Indian Institute of Information Technology Surat", abbr: "IIIT Surat", city: "Surat", stateDir: "gujarat", stateName: "Gujarat", type: "PPP Mode", est: 2017, category: "Engineering" },
    { name: "Indian Institute of Information Technology Vadodara", abbr: "IIIT Vadodara", city: "Vadodara", stateDir: "gujarat", stateName: "Gujarat", type: "PPP Mode", est: 2013, category: "Engineering" },
    { name: "Indian Institute of Information Technology Bhagalpur", abbr: "IIIT Bhagalpur", city: "Bhagalpur", stateDir: "bihar", stateName: "Bihar", type: "PPP Mode", est: 2017, category: "Engineering" },
    { name: "Indian Institute of Information Technology Manipur", abbr: "IIIT Senapati", city: "Senapati", stateDir: "manipur", stateName: "Manipur", type: "PPP Mode", est: 2015, category: "Engineering" },
    { name: "Indian Institute of Information Technology Ranchi", abbr: "IIIT Ranchi", city: "Ranchi", stateDir: "jharkhand", stateName: "Jharkhand", type: "PPP Mode", est: 2016, category: "Engineering" },
    { name: "Indian Institute of Information Technology Senapati", abbr: "IIIT Senapati Manipur", city: "Senapati", stateDir: "manipur", stateName: "Manipur", type: "PPP Mode", est: 2015, category: "Engineering" }, // Assuming a duplicate phrasing of Manipur
    { name: "Indian Institute of Information Technology Tiruchirappalli", abbr: "IIIT Trichy", city: "Tiruchirappalli", stateDir: "tamil-nadu", stateName: "Tamil Nadu", type: "PPP Mode", est: 2013, category: "Engineering" },
    { name: "Indian Institute of Information Technology Raichur", abbr: "IIIT Raichur", city: "Raichur", stateDir: "karnataka", stateName: "Karnataka", type: "PPP Mode", est: 2019, category: "Engineering" },
    { name: "Indian Institute of Information Technology Agartala", abbr: "IIIT Agartala", city: "Agartala", stateDir: "tripura", stateName: "Tripura", type: "PPP Mode", est: 2018, category: "Engineering" },

    // Independent International IIIT
    { name: "International Institute of Information Technology Hyderabad", abbr: "IIITH", city: "Hyderabad", stateDir: "telangana", stateName: "Telangana", type: "Not-for-Profit PPP", est: 1998, category: "Engineering" }
];

function generateHtml(col, collegeSlug) {
    let isCFTI = col.type.includes("CFTI");
    let isHyd = col.abbr === "IIITH";
    let isLucknowAll = ["IIITA", "IIIT Lucknow", "ABV-IIITM Gwalior"].includes(col.abbr); // top performers

    let feeRange = isHyd ? "&#8377;13L — &#8377;18L" : (isCFTI ? "&#8377;5L — &#8377;8L" : "&#8377;8L — &#8377;12L");
    let avgPkg = isHyd ? "32+ LPA" : (isLucknowAll ? "28 - 34 LPA" : "12 - 18 LPA");
    let ratingNum = isHyd ? '4.9' : (isLucknowAll ? '4.6' : '4.2');

    let coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>${feeRange}</td><td>10+2 PCM + ${isHyd ? 'JEE Main / UGEE' : 'JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>&#8377;2L — &#8377;5L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Ph.D.</strong></td><td>3-5 Years</td><td>Variable</td><td>M.Tech + Interview</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;

    if (["ABV-IIITM Gwalior", "IIITDM Jabalpur", "IIITDM Kancheepuram"].includes(col.abbr)) {
        coursesHtml += `\n                     <tr><td><strong>B.Tech + M.Tech (Dual Degree)</strong></td><td>5 Years</td><td>${feeRange} + MTech Fee</td><td>10+2 PCM + JEE Main</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
    }

    let admissionHtml = isHyd
        ? "Unique among IIITs, IIIT Hyderabad conducts its own dual degree entrance exam (UGEE) alongside accepting JEE Main scores and Olympiad medalists."
        : "Admissions strictly follow JoSAA & CSAB counselling based on All India Ranks secured in the JEE Main examination.";

    let placementInfo = `Heavy focus on IT, Computer Science, and cutting-edge tech (AI/ML). Massive recruitment from FAANG, Microsoft, Atlassian, and top startups. Average packages frequently hover around ${avgPkg}.`;

    const tabsHtml = getTabsHtml("Engineering");
    const feesSectionHtml = `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Details about the fee structure and crucial financial aid schemes governed by the Ministry of Education.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>Central Sector Scholarship</h4><p>Provides robust financial assistance to reserved categories and PwD candidates across CFTI institutions.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>Education Loans (Vidya Lakshmi)</h4><p>Seamlessly integrated centralized mechanism to acquire high-value loans with extremely subsidized interest rates for IT institutes.</p></div>
                    </div>
                </div>
            </section>
  `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, JEE Main 2025, CSAB, IIIT India, NextCampus">
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
      "url": "https://nextcampus.com/colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/${col.stateDir}/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, ${col.stateName}</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, ${col.stateName}, India</p>
                        <div class="lpu-rating">
                            <span class="stars">${'&#9733;'.repeat(Math.round(parseFloat(ratingNum)))}${'&#9734;'.repeat(5 - Math.round(parseFloat(ratingNum)))}</span>
                            <strong>${ratingNum}</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${col.type}</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">&#127942; Elite IIIT</span>
                            <span class="badge-accr">Institute of National Importance</span>
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
                    <p>${col.name} (${col.abbr}) is a premier technological institution located in ${col.city}, ${col.stateName}. Established in ${col.est}, it operates under the aegis of the Ministry of Education and specializes intensely in Information Technology, Computer Science, and Electronics, acting as a pivotal driver for India's digital advancement.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Exam ${isHyd ? '(JEE/UGEE)' : '(JEE Main)'}</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>JoSAA / CSAB Counselling</h4><p>Extensive centralized seat allocation process factoring in category ranks and preferences.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Physical Verification</h4><p>Submit required medical certificates and initial academic fee to secure admission onto the campus.</p></div></div>
                    </div>
                </div>
            </section>
            
            <!-- FEES -->
            ${feesSectionHtml}

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Placements & Internships</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>${ratingNum} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Tech Alumnus</strong><span class="rev-stars">${'&#9733;'.repeat(Math.round(parseFloat(ratingNum)))}${'&#9734;'.repeat(5 - Math.round(parseFloat(ratingNum)))}</span></div>
                        <p>"Incredible coding culture. The entire batch focuses heavily on competitive programming (CP) and deep tech, which directly correlates to the massive placement packages."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Academic Block</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Computer Labs</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Innovation Hub</span></div>
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

// NOTE: Since we've decoupled, we just need to pull the shared content directly and inline it for new generations
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

    for (const col of iiitColleges) {
        const collegeSlug = slugify(col.name);

        // Duplicate check
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, col.stateDir, collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS - Now inline the shared CSS entirely and grab the core lpu template (which is already decoupled locally if we grabbed it, but we can just use the shared + lpu base)
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        const lpuCssContent = fs.readFileSync(lpuBaseCssPath, 'utf8');
        // We already prepended shared CSS during the decouple phase in that lpu file, so we can just copy it directly as it is fully self-contained!
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let isLucknowAll = ["IIITA", "IIIT Lucknow", "ABV-IIITM Gwalior"].includes(col.abbr);
        let avgPkgStr = col.abbr === "IIITH" ? "32+ LPA" : (isLucknowAll ? "28-34 LPA" : "12-18 LPA");
        let scoreNum = col.abbr === "IIITH" ? 9.7 : 8.9;
        let ratingNum = col.abbr === "IIITH" ? '4.9' : '4.4';

        // Create card data
        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug}) in ${col.stateDir}`);
    }

    // Inject into home.js if there are new cards
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} IIITs into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new IIITs to inject.`);
    }
}

processAll();
