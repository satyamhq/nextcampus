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

const iimColleges = [
    // First Generation (BLACKI + Indore)
    { name: "Indian Institute of Management Ahmedabad", abbr: "IIMA", city: "Ahmedabad", stateDir: "gujarat", stateName: "Gujarat", type: "Government Autonomous", est: 1961, category: "Management" },
    { name: "Indian Institute of Management Bangalore", abbr: "IIMB", city: "Bengaluru", stateDir: "karnataka", stateName: "Karnataka", type: "Government Autonomous", est: 1973, category: "Management" },
    { name: "Indian Institute of Management Calcutta", abbr: "IIMC", city: "Kolkata", stateDir: "west-bengal", stateName: "West Bengal", type: "Government Autonomous", est: 1961, category: "Management" },
    { name: "Indian Institute of Management Lucknow", abbr: "IIML", city: "Lucknow", stateDir: "uttar-pradesh", stateName: "Uttar Pradesh", type: "Government Autonomous", est: 1984, category: "Management" },
    { name: "Indian Institute of Management Kozhikode", abbr: "IIMK", city: "Kozhikode", stateDir: "kerala", stateName: "Kerala", type: "Government Autonomous", est: 1996, category: "Management" },
    { name: "Indian Institute of Management Indore", abbr: "IIMI", city: "Indore", stateDir: "madhya-pradesh", stateName: "Madhya Pradesh", type: "Government Autonomous", est: 1996, category: "Management" },

    // Second Generation
    { name: "Indian Institute of Management Shillong", abbr: "IIM Shillong", city: "Shillong", stateDir: "meghalaya", stateName: "Meghalaya", type: "Government Autonomous", est: 2007, category: "Management" },
    { name: "Indian Institute of Management Rohtak", abbr: "IIM Rohtak", city: "Rohtak", stateDir: "haryana", stateName: "Haryana", type: "Government Autonomous", est: 2010, category: "Management" },
    { name: "Indian Institute of Management Ranchi", abbr: "IIM Ranchi", city: "Ranchi", stateDir: "jharkhand", stateName: "Jharkhand", type: "Government Autonomous", est: 2010, category: "Management" },
    { name: "Indian Institute of Management Raipur", abbr: "IIM Raipur", city: "Raipur", stateDir: "chhattisgarh", stateName: "Chhattisgarh", type: "Government Autonomous", est: 2010, category: "Management" },
    { name: "Indian Institute of Management Tiruchirappalli", abbr: "IIM Trichy", city: "Tiruchirappalli", stateDir: "tamil-nadu", stateName: "Tamil Nadu", type: "Government Autonomous", est: 2011, category: "Management" },
    { name: "Indian Institute of Management Udaipur", abbr: "IIMU", city: "Udaipur", stateDir: "rajasthan", stateName: "Rajasthan", type: "Government Autonomous", est: 2011, category: "Management" },
    { name: "Indian Institute of Management Kashipur", abbr: "IIM Kashipur", city: "Kashipur", stateDir: "uttarakhand", stateName: "Uttarakhand", type: "Government Autonomous", est: 2011, category: "Management" },

    // New Generation
    { name: "Indian Institute of Management Amritsar", abbr: "IIM Amritsar", city: "Amritsar", stateDir: "punjab", stateName: "Punjab", type: "Government Autonomous", est: 2015, category: "Management" },
    { name: "Indian Institute of Management Bodh Gaya", abbr: "IIM Bodh Gaya", city: "Bodh Gaya", stateDir: "bihar", stateName: "Bihar", type: "Government Autonomous", est: 2015, category: "Management" },
    { name: "Indian Institute of Management Nagpur", abbr: "IIM Nagpur", city: "Nagpur", stateDir: "maharashtra", stateName: "Maharashtra", type: "Government Autonomous", est: 2015, category: "Management" },
    { name: "Indian Institute of Management Sambalpur", abbr: "IIM Sambalpur", city: "Sambalpur", stateDir: "odisha", stateName: "Odisha", type: "Government Autonomous", est: 2015, category: "Management" },
    { name: "Indian Institute of Management Sirmaur", abbr: "IIM Sirmaur", city: "Sirmaur", stateDir: "himachal-pradesh", stateName: "Himachal Pradesh", type: "Government Autonomous", est: 2015, category: "Management" },
    { name: "Indian Institute of Management Visakhapatnam", abbr: "IIMV", city: "Visakhapatnam", stateDir: "andhra-pradesh", stateName: "Andhra Pradesh", type: "Government Autonomous", est: 2015, category: "Management" },
    { name: "Indian Institute of Management Jammu", abbr: "IIM Jammu", city: "Jammu", stateDir: "jammu-and-kashmir", stateName: "Jammu & Kashmir", type: "Government Autonomous", est: 2016, category: "Management" },

    // Officially renamed from NITIE to IIM Mumbai in 2023
    { name: "Indian Institute of Management Mumbai", abbr: "IIM Mumbai", city: "Mumbai", stateDir: "maharashtra", stateName: "Maharashtra", type: "Government Autonomous", est: 1963, category: "Management" }
];

function generateHtml(col, collegeSlug) {
    let isBlacki = ["IIMA", "IIMB", "IIMC", "IIML", "IIMK", "IIMI"].includes(col.abbr);
    let isGen2 = ["IIM Shillong", "IIM Rohtak", "IIM Ranchi", "IIM Raipur", "IIM Trichy", "IIMU", "IIM Kashipur"].includes(col.abbr);

    let feeRange = isBlacki ? "&#8377;20L — &#8377;26L" : (isGen2 ? "&#8377;16L — &#8377;20L" : "&#8377;14L — &#8377;18L");
    let avgPkg = isBlacki ? "30+ LPA" : (isGen2 ? "18 - 25 LPA" : "15 - 18 LPA");
    let scoreNum = isBlacki ? 9.8 : (isGen2 ? 9.0 : 8.5);
    let ratingNum = isBlacki ? '4.9' : (isGen2 ? '4.6' : '4.3');

    let coursesHtml = `<tr><td><strong>MBA / PGP</strong></td><td>2 Years</td><td>${feeRange}</td><td>Graduation + CAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Executive MBA (EPGP)</strong></td><td>1-2 Years</td><td>&#8377;10L — &#8377;30L</td><td>Graduation + Work Exp + GMAT/CAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Ph.D. / FPM</strong></td><td>4-5 Years</td><td>Fully Funded</td><td>Master's + CAT/GMAT/GRE/JRF</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;

    // IPM specific logic
    if (["IIMI", "IIM Rohtak", "IIM Ranchi", "IIM Bodh Gaya", "IIM Jammu"].includes(col.abbr)) {
        coursesHtml += `\n                     <tr><td><strong>IPM (BBA + MBA)</strong></td><td>5 Years</td><td>&#8377;30L — &#8377;35L</td><td>10+2 + IPMAT / JIPMAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
    }

    let admissionHtml = "The flagship MBA/PGP program requires a highly competitive CAT (Common Admission Test) score, followed by Written Ability Test (WAT) and Personal Interview (PI). Executive programs often accept GMAT/GRE scores.";
    let placementInfo = `Elite placements across Consulting (MBB), Finance (IB/PE/VC), Product Management, and FMCG roles. Average packages consistently range around ${avgPkg}.`;

    const tabsHtml = getTabsHtml(col.category);
    const feesSectionHtml = `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Details about the fee structure and crucial financial aid schemes implemented to ensure no student drops out due to financial constraints.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>Need-Based Financial Assistance (NBFA)</h4><p>Substantial tuition fee waivers granted based on family income criteria.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>Top Class Education for SC/ST</h4><p>Central government sponsored schemes providing comprehensive financial support including laptops and living expenses.</p></div>
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
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, CAT 2025, IIM, NextCampus">
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
                            <span>Type: <strong>Institute of National Importance</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">&#127942; Elite IIM</span>
                            <span class="badge-accr">EQUIS / AMBA Accredited</span>
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
                    <p>${col.name} (${col.abbr}) is a premier management institution located in ${col.city}, ${col.stateName}. Established in ${col.est}, it holds the status of an Institute of National Importance and is part of the prestigious Indian Institutes of Management (IIM) network, known globally for producing top-tier business leaders, entrepreneurs, and policymakers.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Exam (CAT/GMAT/IPMAT)</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Shortlisting & PI</h4><p>Candidates are shortlisted based on their entrance scores and academic profile for the Written Ability Test (WAT) and Personal Interview (PI).</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Final Selection</h4><p>Admissions are finalized based on a composite score comprising entrance test, PI, WAT, academic diversity, and work experience.</p></div></div>
                    </div>
                </div>
            </section>
            
            <!-- FEES -->
            ${feesSectionHtml}

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Summer Internships & Final Placements</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>${ratingNum} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Alumnus</strong><span class="rev-stars">${'&#9733;'.repeat(Math.round(parseFloat(ratingNum)))}${'&#9734;'.repeat(5 - Math.round(parseFloat(ratingNum)))}</span></div>
                        <p>"The academic rigor, peer learning, and unparalled corporate exposure transform you completely. World-class faculty and infra."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Academic Block</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Library & Campus</span></div>
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

    for (const col of iimColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, col.stateDir, collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let isBlacki = ["IIMA", "IIMB", "IIMC", "IIML", "IIMK", "IIMI"].includes(col.abbr);
        let isGen2 = ["IIM Shillong", "IIM Rohtak", "IIM Ranchi", "IIM Raipur", "IIM Trichy", "IIMU", "IIM Kashipur"].includes(col.abbr);
        let avgPkgStr = isBlacki ? "30+ LPA" : (isGen2 ? "18-25 LPA" : "15-18 LPA");
        let scoreNum = isBlacki ? 9.8 : (isGen2 ? 9.0 : 8.5);
        let ratingNum = isBlacki ? '4.9' : (isGen2 ? '4.6' : '4.3');

        // Create card data
        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")} (${col.abbr})',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 100, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'AMBA/EQUIS'
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
            console.log(`\n✅ Injected ${newCards.length} IIMs into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new IIMs to inject.`);
    }
}

processAll();

