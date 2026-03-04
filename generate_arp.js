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

const apColleges = [
    // Universities
    { name: "Rajiv Gandhi University", abbr: "RGU", city: "Itanagar", type: "Central", est: 1984, category: "Arts & Science" },
    { name: "North Eastern Regional Institute of Science and Technology", abbr: "NERIST", city: "Nirjuli", type: "Deemed", est: 1984, category: "Engineering" }, // Listed in both, adding once here
    { name: "Arunachal University of Studies", abbr: "AUS", city: "Namsai", type: "Private", est: 2012, category: "Arts & Science" },
    { name: "Himalayan University", abbr: "HU", city: "Itanagar", type: "Private", est: 2013, category: "Arts & Science" },
    { name: "Indira Gandhi Technological and Medical Sciences University", abbr: "IGTAMSU", city: "Ziro", type: "Private", est: 2012, category: "Arts & Science" },
    { name: "Venkateshwara Open University", abbr: "VOU", city: "Itanagar", type: "Private", est: 2012, category: "Arts & Science" },
    { name: "Arunodaya University", abbr: "AU", city: "Itanagar", type: "Private", est: 2014, category: "Arts & Science" },
    { name: "Apex Professional University", abbr: "APU", city: "Pasighat", type: "Private", est: 2013, category: "Arts & Science" },
    // Arunachal Pradesh University of Studies is essentially Arunachal University of Studies, will map to AUS

    // Engineering & Technical Colleges
    { name: "National Institute of Technology Arunachal Pradesh", abbr: "NIT Arunachal Pradesh", city: "Jote", type: "Government", est: 2010, category: "Engineering" },

    // Medical & Health Colleges
    { name: "Tomo Riba Institute of Health and Medical Sciences", abbr: "TRIHMS", city: "Naharlagun", type: "Government", est: 2017, category: "Medical" },

    // Government Degree Colleges
    { name: "Dera Natung Government College", abbr: "DNGC", city: "Itanagar", type: "Government", est: 1979, category: "Arts & Science" },
    { name: "Jawaharlal Nehru College Pasighat", abbr: "JNC Pasighat", city: "Pasighat", type: "Government", est: 1964, category: "Arts & Science" },
    { name: "Indira Gandhi Government College Tezu", abbr: "IGGC", city: "Tezu", type: "Government", est: 1986, category: "Arts & Science" },
    { name: "Government College Bomdila", abbr: "GC Bomdila", city: "Bomdila", type: "Government", est: 1988, category: "Arts & Science" },
    { name: "Government College Seppa", abbr: "GC Seppa", city: "Seppa", type: "Government", est: 1990, category: "Arts & Science" },
    { name: "Government College Ziro", abbr: "GC Ziro", city: "Ziro", type: "Government", est: 1996, category: "Arts & Science" },
    { name: "Government College Yachuli", abbr: "GC Yachuli", city: "Yachuli", type: "Government", est: 2007, category: "Arts & Science" },
    { name: "Government College Doimukh", abbr: "GC Doimukh", city: "Doimukh", type: "Government", est: 2012, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>&#8377;1.5L — &#8377;5L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>B.Sc Nursing</strong></td><td>4 Years</td><td>&#8377;50K — &#8377;2L</td><td>10+2 PCB</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "State quota seats through Directorate of Medical Education (DME) Arunachal Pradesh based on NEET UG scores.";
        placementInfo = "Mandatory 1-year clinical internship in affiliated state government hospitals with a monthly stipend.";
    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>&#8377;2L — &#8377;6L</td><td>10+2 PCM + JEE Main / NERIST Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech / Diploma</strong></td><td>2 / 3 Years</td><td>&#8377;1L — &#8377;3L</td><td>B.Tech + GATE / 10th</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "NIT admissions are through JoSAA based on JEE Main. NERIST conducts NEE (NERIST Entrance Examination) for its base, diploma, and degree modules.";
        placementInfo = "Placements are improving with core tech companies and public sector undertakings recruiting from campus.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3-4 Years</td><td>&#8377;15K — &#8377;60K</td><td>10+2 / CUET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>&#8377;20K — &#8377;80K</td><td>Bachelor's Degree</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions historically based on 10+2 merit. Central University (RGU) adopts CUET UG and PG for admissions.";
        placementInfo = "Students majorly opt for higher education, state civil services, or placements in regional educational and administrative sectors.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const feesSectionHtml = col.category !== 'Medical' ? `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Details about the fee structure and APST (Arunachal Pradesh Scheduled Tribe) specific scholarships.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>Umbrella Scheme for ST Students</h4><p>Post-Matric Scholarship for ST students studying in recognized institutions.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>NEC Merit Scholarship</h4><p>North Eastern Council stipend for students of NE region pursuing higher technical courses.</p></div>
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
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, ${col.abbr} fees, Arunachal Pradesh colleges, North East colleges, NextCampus">
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
      "url": "https://nextcampus.com/colleges/arunachal-pradesh/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/arunachal-pradesh/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Arunachal Pradesh</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Arunachal Pradesh, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.0</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${col.type}</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">&#127942; Top Rated</span>
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
                    <p>${col.name} (${col.abbr}) is a key educational institution located in ${col.city}, Arunachal Pradesh. Established in ${col.est}, it has played a significant role in providing quality higher education and fostering development in the North-Eastern region.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Entrance Exam / Merit</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling & Allocation</h4><p>Participate in state or central counselling processes based on your entrance rank or 12th percentage.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Report to the college with original documents and APST certificates (if applicable) after seat allocation.</p></div></div>
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
                    <p>Average Rating: <strong>4.0 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Student</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Peaceful environment conducive to studying. The faculty is approachable and the campus is nestled in nature."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
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

    for (const col of apColleges) {
        const collegeSlug = slugify(col.name);

        // Check if college already exists in home.js to avoid duplicates
        // Especially for NIT Arunachal Pradesh which might have been generated earlier
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'arunachal-pradesh', collegeSlug);
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
      city: '${col.city}', state: 'Arunachal Pradesh', type: '${col.type}',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/${collegeSlug}/${collegeSlug}.html',
      rating: '4.0', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Arunachal Pradesh Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Arunachal Pradesh Colleges to inject.`);
    }
}

processAll();

