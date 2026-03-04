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

const nluColleges = [
    { name: "National Law School of India University", abbr: "NLSIU", city: "Bengaluru", stateDir: "karnataka", stateName: "Karnataka", est: 1986 },
    { name: "National Academy of Legal Studies and Research", abbr: "NALSAR", city: "Hyderabad", stateDir: "telangana", stateName: "Telangana", est: 1998 },
    { name: "National Law Institute University", abbr: "NLIU", city: "Bhopal", stateDir: "madhya-pradesh", stateName: "Madhya Pradesh", est: 1997 },
    { name: "The West Bengal National University of Juridical Sciences", abbr: "WBNUJS", city: "Kolkata", stateDir: "west-bengal", stateName: "West Bengal", est: 1999 }, // Checking dupes logic will skip this if generated
    { name: "National Law University Jodhpur", abbr: "NLUJ", city: "Jodhpur", stateDir: "rajasthan", stateName: "Rajasthan", est: 1999 },
    { name: "Hidayatullah National Law University", abbr: "HNLU", city: "Raipur", stateDir: "chhattisgarh", stateName: "Chhattisgarh", est: 2003 }, // Will skip if dupe
    { name: "Gujarat National Law University", abbr: "GNLU", city: "Gandhinagar", stateDir: "gujarat", stateName: "Gujarat", est: 2003 },
    { name: "Dr. Ram Manohar Lohiya National Law University", abbr: "RMLNLU", city: "Lucknow", stateDir: "uttar-pradesh", stateName: "Uttar Pradesh", est: 2005 },
    { name: "Rajiv Gandhi National University of Law", abbr: "RGNUL", city: "Patiala", stateDir: "punjab", stateName: "Punjab", est: 2006 },
    { name: "Chanakya National Law University", abbr: "CNLU", city: "Patna", stateDir: "bihar", stateName: "Bihar", est: 2006 },
    { name: "National University of Advanced Legal Studies", abbr: "NUALS", city: "Kochi", stateDir: "kerala", stateName: "Kerala", est: 2005 },
    { name: "National Law University Odisha", abbr: "NLUO", city: "Cuttack", stateDir: "odisha", stateName: "Odisha", est: 2009 },
    { name: "National University of Study and Research in Law", abbr: "NUSRL", city: "Ranchi", stateDir: "jharkhand", stateName: "Jharkhand", est: 2010 },
    { name: "National Law University and Judicial Academy", abbr: "NLUJAA", city: "Guwahati", stateDir: "assam", stateName: "Assam", est: 2009 },
    { name: "Damodaram Sanjivayya National Law University", abbr: "DSNLU", city: "Visakhapatnam", stateDir: "andhra-pradesh", stateName: "Andhra Pradesh", est: 2008 },
    { name: "Tamil Nadu National Law University", abbr: "TNNLU", city: "Tiruchirappalli", stateDir: "tamil-nadu", stateName: "Tamil Nadu", est: 2012 },
    { name: "Maharashtra National Law University Mumbai", abbr: "MNLU Mumbai", city: "Mumbai", stateDir: "maharashtra", stateName: "Maharashtra", est: 2014 },
    { name: "Maharashtra National Law University Nagpur", abbr: "MNLU Nagpur", city: "Nagpur", stateDir: "maharashtra", stateName: "Maharashtra", est: 2016 },
    { name: "Maharashtra National Law University Aurangabad", abbr: "MNLU Aurangabad", city: "Aurangabad", stateDir: "maharashtra", stateName: "Maharashtra", est: 2017 },
    { name: "Himachal Pradesh National Law University", abbr: "HPNLU", city: "Shimla", stateDir: "himachal-pradesh", stateName: "Himachal Pradesh", est: 2016 },
    { name: "Dharmashastra National Law University", abbr: "DNLU", city: "Jabalpur", stateDir: "madhya-pradesh", stateName: "Madhya Pradesh", est: 2018 },
    { name: "Dr. B. R. Ambedkar National Law University", abbr: "DBRANLU", city: "Sonipat", stateDir: "haryana", stateName: "Haryana", est: 2012 },
    { name: "National Law University Tripura", abbr: "NLUT", city: "Agartala", stateDir: "tripura", stateName: "Tripura", est: 2022 },
    { name: "National Law University Meghalaya", abbr: "NLU Meghalaya", city: "Shillong", stateDir: "meghalaya", stateName: "Meghalaya", est: 2022 },
    { name: "National Law University Delhi", abbr: "NLUD", city: "New Delhi", stateDir: "delhi", stateName: "Delhi", est: 2008 },
    { name: "National Law University Goa", abbr: "NLU Goa", city: "Dharbandora", stateDir: "goa", stateName: "Goa", est: 2023 } // India International University of Legal Education and Research (IIULER) is often colloquially referred to.
];

function generateHtml(col, collegeSlug) {
    let isTop3 = ["NLSIU", "NALSAR", "NLIU", "WBNUJS", "NLUD", "NLUJ"].includes(col.abbr);
    let examStr = col.abbr === "NLUD" ? "AILET" : "CLAT";

    let feeRange = isTop3 ? "&#8377;12L — &#8377;18L" : "&#8377;8L — &#8377;12L";
    let avgPkg = isTop3 ? "16 - 20 LPA" : "8 - 14 LPA";
    let ratingNum = isTop3 ? '4.8' : '4.4';

    let coursesHtml = `<tr><td><strong>B.A. LL.B. (Hons.)</strong></td><td>5 Years</td><td>${feeRange}</td><td>10+2 + ${examStr}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LL.M.</strong></td><td>1 Year</td><td>&#8377;1.5L — &#8377;3L</td><td>LL.B. + ${examStr} PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Ph.D. in Law</strong></td><td>3-5 Years</td><td>Variable</td><td>LL.M. + Subject Test</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;

    // Specific additions (some offer BBA/B.Sc. LLB)
    if (["NLUJ", "GNLU", "MNLU Mumbai", "CNLU"].includes(col.abbr)) {
        coursesHtml += `\n                     <tr><td><strong>B.B.A. LL.B. / B.Sc. LL.B.</strong></td><td>5 Years</td><td>${feeRange}</td><td>10+2 + ${examStr}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
    }

    let admissionHtml = col.abbr === "NLUD"
        ? "Admissions are strictly governed by NLUD's separate autonomous entrance exam, the All India Law Entrance Test (AILET)."
        : "Admissions strictly follow the centralized Common Law Admission Test (CLAT) scores. State domiciles may avail state quotas (usually around 25%) during consortium counseling.";

    let placementInfo = isTop3
        ? `Phenomenal placements in Tier-1 corporate law firms (Cyril Amarchand Mangaldas, Khaitan & Co, SAM). A strong percentage of the batch pursues litigation or secures top scores in judicial services and UPSC. Average packages: ${avgPkg}.`
        : `Strong recruitment from Tier 2 law firms, LPOs, corporate legal teams, and litigation chambers. Students actively secure judicial clerkships in High Courts and the Supreme Court. Average packages: ${avgPkg}.`;

    const tabsHtml = getTabsHtml("Law");
    const feesSectionHtml = `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Details about the fee structure and crucial financial aid schemes implemented by the Consortium and the respective State Governments.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>Merit Cum Means (MCM) Scholarship</h4><p>Fee waivers granted by NLU committees based on a combination of academic rank and parental income constraints.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>State SC/ST/OBC Scholarship</h4><p>Post-Matric scholarships provided by the state's social welfare department for domicile students.</p></div>
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
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, ${examStr} 2025, NLU India, NextCampus">
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
                            <span>Type: <strong>State University (Consortium)</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">&#127942; Top Law School</span>
                            <span class="badge-accr">Bar Council of India Recognized</span>
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
                    <p>${col.name} (${col.abbr}) is a premier legal institution located in ${col.city}, ${col.stateName}. Established in ${col.est}, it forms part of the elite network of National Law Universities in India, fundamentally revolutionizing legal education in the country through an intensive, multi-disciplinary approach to legal studies.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Exam (${examStr})</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling & Allocation</h4><p>Participate in centralized counseling (or NLUD's specific process) post results declaration. Document state domicile proofs if applying via state quotas.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Pay the initial confirmation fee to lock the seat before campus reporting.</p></div></div>
                    </div>
                </div>
            </section>
            
            <!-- FEES -->
            ${feesSectionHtml}

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Internships & Final Placements</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>${ratingNum} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Law Alumnus</strong><span class="rev-stars">${'&#9733;'.repeat(Math.round(parseFloat(ratingNum)))}${'&#9734;'.repeat(5 - Math.round(parseFloat(ratingNum)))}</span></div>
                        <p>"The mooting culture, rigorous internal assessments, and quality of professors define the NLU experience. It prepares you beautifully for the legal real world."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Academic Block</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Moot Court / Library</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostel Grounds</span></div>
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

    for (const col of nluColleges) {
        const collegeSlug = slugify(col.name);

        // Crucial duplicate check (WBNUJS and HNLU etc might be already there)
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

        let isTop3 = ["NLSIU", "NALSAR", "NLIU", "WBNUJS", "NLUD", "NLUJ"].includes(col.abbr);
        let avgPkgStr = isTop3 ? "16-20 LPA" : "8-14 LPA";
        let scoreNum = isTop3 ? 9.8 : 8.8;
        let ratingNum = isTop3 ? '4.8' : '4.4';

        // Create card data
        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")} (${col.abbr})',
      city: '${col.city}', state: '${col.stateName}', type: 'Government Law',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 95, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'BCI'
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
            console.log(`\n✅ Injected ${newCards.length} NLUs into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new NLUs to inject.`);
    }
}

processAll();

