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

const bitsCampuses = [
    { name: "BITS Pilani Pilani Campus", abbr: "BITS Pilani", city: "Pilani", state: "Rajasthan", type: "Deemed", est: 1964, category: "Engineering" },
    { name: "BITS Pilani Goa Campus", abbr: "BITS Goa", city: "Zuarinagar", state: "Goa", type: "Deemed", est: 2004, category: "Engineering" },
    { name: "BITS Pilani Hyderabad Campus", abbr: "BITS Hyderabad", city: "Hyderabad", state: "Telangana", type: "Deemed", est: 2008, category: "Engineering" }
];

function generateHtml(col, collegeSlug) {
    let isApex = col.abbr === "BITS Pilani";

    let coursesHtml = `<tr><td><strong>B.E (Hons)</strong></td><td>4 Years</td><td>\u20B922L — \u20B926L</td><td>10+2 PCM (75% aggregate) + BITSAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>B.Pharm (Hons)</strong></td><td>4 Years</td><td>\u20B922L — \u20B926L</td><td>10+2 PCB/PCM + BITSAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.E / M.Pharm</strong></td><td>2 Years</td><td>\u20B910L — \u20B912L</td><td>B.E/B.Pharm + BITS HD / GATE / GPAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Sc (Hons) Integrated</strong></td><td>4-5 Years</td><td>\u20B926L — \u20B930L</td><td>10+2 PCM + BITSAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;

    let admissionHtml = "The Birla Institute of Technology and Science operates on a strictly merit-driven, zero-reservation policy. Undergraduate engineering and pharmacy pipelines route 100% through the proprietary computer-based BITSAT examination. Candidates must possess a 75% aggregate in 12th PCM/PCB.";

    let placementInfo = isApex ? "The Pilani campus holds absolute primacy, standing parallel to top-5 IITs. Unrivaled 'Day 0' MAANG placements, colossal algorithmic trading firm intakes, and massive startup founder ecosystems." : "Leverages the monolithic BITS brand. Operates dual Placement Units (PU) driving identical MAANG and Fortune 500 tech/core product recruitments closely mirroring the Main Campus pipelines.";

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, BITSAT cutoffs, massive placement packages, scholarships, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, BITSAT 2026, BITS Placements, Top Private Engineering, NextCampus">
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
                            <strong>${isApex ? '4.9' : '4.8'}</strong>/5
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
                    <p>${col.name} (${col.abbr}) represents the absolute pinnacle of private technical education in India. Established in ${col.est} in ${col.city}, the campus operates distinctly under the monolithic 'BITS' brand framework, demanding intense, merit-only competitive entry without reservations.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>BITSAT Central Matrix</h4><p>${admissionHtml}</p></div></div>
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
                    <p>Average Rating: <strong>${isApex ? '4.9' : '4.8'} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
                        <p>"The exposure is ungodly. Between the insane peer quality dictated by the zero-reservation BITSAT criteria and the staggering dual-degree flexibilities, we structurally parallel the old IITs in tech integration."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Libraries & Auditoriums</span></div>
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

    for (const col of bitsCampuses) {
        const collegeSlug = slugify(col.name);
        const stateSlug = slugify(col.state);

        // Check dupe to avoid injecting twice in dashboard, BUT we force overwrite the HTML/JS/CSS to apply the BITS specific template!
        let isDupe = homeContent.includes(collegeSlug) || (col.abbr === "BITS Pilani" && homeContent.includes("birla-institute-of-technology-and-science-pilani"));

        // We update the generation destination:
        const finalSlug = (col.abbr === "BITS Pilani" && isDupe) ? "birla-institute-of-technology-and-science-pilani" : collegeSlug;

        const dir = path.join(basePath, stateSlug, finalSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS base
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, finalSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, finalSlug + '.html'), generateHtml(col, finalSlug), 'utf8');
        fs.writeFileSync(path.join(dir, finalSlug + '.js'), getJsContent(col.name, col.abbr, finalSlug), 'utf8');

        if (isDupe) {
            console.log(`Updated HTML/JS/CSS internally for \${col.name} (\${finalSlug}) but skipping dashboard injection.`);
            continue;
        }

        let baseScore = col.abbr === "BITS Pilani" ? 9.9 : 9.8;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.state}', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 98, nirf: 0,
      link: '../colleges/${stateSlug}/${finalSlug}/${finalSlug}.html',
      rating: '${col.abbr === "BITS Pilani" ? "4.9" : "4.8"}', accr: '${col.type}'
    }`);
        console.log(`Generated and Scheduled for Injection: ${col.name} (${finalSlug})`);
    }

    // Inject
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} BITS Campuses into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new BITS Campuses to inject (already deduplicated).`);
    }
}

processAll();
