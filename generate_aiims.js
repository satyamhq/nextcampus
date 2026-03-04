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

const aiimsCampuses = [
    // Original / Phase-1 AIIMS
    { name: "All India Institute of Medical Sciences New Delhi", abbr: "AIIMS Delhi", city: "New Delhi", state: "Delhi", type: "INI", est: 1956, category: "Medical" },
    { name: "AIIMS Bhopal", abbr: "AIIMS Bhopal", city: "Bhopal", state: "Madhya Pradesh", type: "INI", est: 2012, category: "Medical" },
    { name: "AIIMS Bhubaneswar", abbr: "AIIMS Bhubaneswar", city: "Bhubaneswar", state: "Odisha", type: "INI", est: 2012, category: "Medical" },
    { name: "AIIMS Jodhpur", abbr: "AIIMS Jodhpur", city: "Jodhpur", state: "Rajasthan", type: "INI", est: 2012, category: "Medical" },
    { name: "AIIMS Patna", abbr: "AIIMS Patna", city: "Patna", state: "Bihar", type: "INI", est: 2012, category: "Medical" },
    { name: "AIIMS Raipur", abbr: "AIIMS Raipur", city: "Raipur", state: "Chhattisgarh", type: "INI", est: 2012, category: "Medical" },
    { name: "AIIMS Rishikesh", abbr: "AIIMS Rishikesh", city: "Rishikesh", state: "Uttarakhand", type: "INI", est: 2012, category: "Medical" },

    // Phase-2 / Newer AIIMS
    { name: "AIIMS Nagpur", abbr: "AIIMS Nagpur", city: "Nagpur", state: "Maharashtra", type: "INI", est: 2018, category: "Medical" },
    { name: "AIIMS Mangalagiri", abbr: "AIIMS Mangalagiri", city: "Mangalagiri", state: "Andhra Pradesh", type: "INI", est: 2018, category: "Medical" },
    { name: "AIIMS Gorakhpur", abbr: "AIIMS Gorakhpur", city: "Gorakhpur", state: "Uttar Pradesh", type: "INI", est: 2019, category: "Medical" },
    { name: "AIIMS Kalyani", abbr: "AIIMS Kalyani", city: "Kalyani", state: "West Bengal", type: "INI", est: 2019, category: "Medical" },
    { name: "AIIMS Bathinda", abbr: "AIIMS Bathinda", city: "Bathinda", state: "Punjab", type: "INI", est: 2019, category: "Medical" },
    { name: "AIIMS Deoghar", abbr: "AIIMS Deoghar", city: "Deoghar", state: "Jharkhand", type: "INI", est: 2019, category: "Medical" },
    { name: "AIIMS Bibinagar", abbr: "AIIMS Bibinagar", city: "Bibinagar", state: "Telangana", type: "INI", est: 2019, category: "Medical" },

    // Newest / Under Development AIIMS
    { name: "AIIMS Raebareli", abbr: "AIIMS Raebareli", city: "Raebareli", state: "Uttar Pradesh", type: "INI", est: 2013, category: "Medical" }, // OP started later
    { name: "AIIMS Bilaspur", abbr: "AIIMS Bilaspur", city: "Bilaspur", state: "Himachal Pradesh", type: "INI", est: 2020, category: "Medical" },
    { name: "AIIMS Guwahati", abbr: "AIIMS Guwahati", city: "Guwahati", state: "Assam", type: "INI", est: 2020, category: "Medical" },
    { name: "AIIMS Vijaypur", abbr: "AIIMS Jammu", city: "Vijaypur", state: "Jammu and Kashmir", type: "INI", est: 2020, category: "Medical" }, // Vijaypur (Jammu)
    { name: "AIIMS Rajkot", abbr: "AIIMS Rajkot", city: "Rajkot", state: "Gujarat", type: "INI", est: 2020, category: "Medical" },
    { name: "AIIMS Madurai", abbr: "AIIMS Madurai", city: "Madurai", state: "Tamil Nadu", type: "INI", est: 2021, category: "Medical" },
    { name: "AIIMS Darbhanga", abbr: "AIIMS Darbhanga", city: "Darbhanga", state: "Bihar", type: "INI", est: 2020, category: "Medical" },
    { name: "AIIMS Rewari", abbr: "AIIMS Manethi", city: "Manethi", state: "Haryana", type: "INI", est: 2019, category: "Medical" }, // Manethi / Rewari
    { name: "AIIMS Awantipora", abbr: "AIIMS Awantipora", city: "Awantipora", state: "Jammu and Kashmir", type: "INI", est: 2019, category: "Medical" }
];

function generateHtml(col, collegeSlug) {
    let isApex = col.abbr === "AIIMS Delhi";
    let isEstablished = col.est <= 2012; // Phase 1 + Delhi

    let coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B95.8K Total</td><td>10+2 PCB + NEET UG (Absolute Top Percentiles)</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS/MDS</strong></td><td>3 Years</td><td>\u20B92.5K — \u20B95K</td><td>MBBS/BDS + INI-CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     ${isEstablished ? `<tr><td><strong>B.Sc (Hons) Nursing</strong></td><td>4 Years</td><td>\u20B93.1K</td><td>10+2 PCB + AIIMS Nursing Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>` : ''}`;

    let admissionHtml = isApex ? "AIIMS New Delhi represents the absolute peak of Indian medical competitive routing. Seats are commanded entirely via MCC allocations leveraging the highest fractional AIQ NEET scores. Postgraduate seats are allocated strictly via the INI-CET framework." : "As an Institute of National Importance (INI), AIIMS operates entirely outside state counseling bodies. Every single MBBS seat is filled directly via MCC (Medical Counseling Committee) leveraging central AIQ NEET ranks.";

    let placementInfo = isApex ? "Immediate fellowships to US/UK apex programs (USMLE/PLAB) or massive absorption into direct tier-1 central hospital administration/research vectors." : (isEstablished ? "Phase-1 institutions now operate massive fully functional super-specialty arrays. Graduates command elite tier-1 corporate grids or sweep major INI-CET post-grad rosters." : "The newer institutions are hyper-scaling their clinical infrastructure. Graduates benefit massively from the monolithic INI brand scaling directly into PG preparations.");

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and INI campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, AIIMS MBBS, INI-CET 2026, Top Medical Colleges, NextCampus">
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
      "url": "https://nextcampus.com/colleges/${slugify(col.state)}/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/${slugify(col.state)}/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, ${col.state}</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, ${col.state}, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>${isApex ? '5.0' : (isEstablished ? '4.9' : '4.6')}</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>Institute of National Importance (INI)</strong></span>
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
                    <p>${col.name} (${col.abbr}) represents the absolute vanguard of medical education scaling within ${col.state}. Operating autonomously from standard state matrices, this Institute of National Importance commands the heaviest intakes via the MCC grid.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>MCC & INI-CET Core Frameworks</h4><p>${admissionHtml}</p></div></div>
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
                    <p>Average Rating: <strong>${isApex ? '5.0' : (isEstablished ? '4.9' : '4.6')} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
                        <p>"The exposure is unparalleled. The patient volume crossing the Outpatient Departments (OPDs) provides raw clinical experience that massively outpaces any private or regional setup in the state. The INI tag guarantees elite mobility."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Hospital Block</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Collegiate & Research Wings</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels & Quarters</span></div>
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

    for (const col of aiimsCampuses) {
        const collegeSlug = slugify(col.name);
        const stateSlug = slugify(col.state);

        // Check if generated already during state runs (e.g., Jodhpur, Bathinda)
        let isDupe = homeContent.includes(collegeSlug) || homeContent.includes(col.abbr.toLowerCase().replace(/\s+/g, '-'));

        // Use the official formal name for URL/Folder ALWAYS to keep clean schema
        const dir = path.join(basePath, stateSlug, collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS base
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        if (isDupe) {
            console.log(`Updated HTML/JS/CSS internally for \${col.name} (\${collegeSlug}) but skipping dashboard injection.`);
            continue;
        }

        let baseScore = col.abbr === "AIIMS Delhi" ? 10.0 : (col.est <= 2012 ? 9.8 : 9.3);

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.state}', type: 'Government/INI',
      score: ${baseScore}, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: ${col.abbr === "AIIMS Delhi" ? 1 : 0},
      link: '../colleges/${stateSlug}/${collegeSlug}/${collegeSlug}.html',
      rating: '${col.abbr === "AIIMS Delhi" ? "5.0" : (col.est <= 2012 ? "4.9" : "4.6")}', accr: 'INI / NMC'
    }`);
        console.log(`Generated and Scheduled for Injection: ${col.name} (${collegeSlug})`);
    }

    // Inject
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} AIIMS Institutes into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new AIIMS to inject (already deduplicated).`);
    }
}

processAll();
