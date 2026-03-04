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

const rjColleges = [
    // Top Government Engineering Colleges (Rajasthan)
    { name: "Indian Institute of Technology Jodhpur", abbr: "IITJ", city: "Jodhpur", type: "Government", est: 2008, category: "Engineering" },
    { name: "Malaviya National Institute of Technology Jaipur", abbr: "MNIT", city: "Jaipur", type: "Government", est: 1963, category: "Engineering" },
    { name: "Indian Institute of Information Technology Kota", abbr: "IIIT Kota", city: "Kota", type: "PPP Mode", est: 2013, category: "Engineering" },
    { name: "MBM Engineering College", abbr: "MBM", city: "Jodhpur", type: "State", est: 1951, category: "Engineering" },
    { name: "College of Technology and Engineering Udaipur", abbr: "CTAE", city: "Udaipur", type: "State", est: 1964, category: "Engineering" },
    { name: "Government Engineering College Ajmer", abbr: "GECA", city: "Ajmer", type: "State", est: 1997, category: "Engineering" },
    { name: "Government Engineering College Bikaner", abbr: "GECB", city: "Bikaner", type: "State", est: 1999, category: "Engineering" },
    { name: "Government Engineering College Jhalawar", abbr: "GECJ", city: "Jhalawar", type: "State", est: 2007, category: "Engineering" },
    { name: "Government Engineering College Bharatpur", abbr: "GEC Bharatpur", city: "Bharatpur", type: "State", est: 2007, category: "Engineering" },
    { name: "Government Engineering College Baran", abbr: "GEC Baran", city: "Baran", type: "State", est: 2018, category: "Engineering" },
    { name: "Government Engineering College Karauli", abbr: "GEC Karauli", city: "Karauli", type: "State", est: 2021, category: "Engineering" },
    { name: "Government Mahila Engineering College Ajmer", abbr: "GWECA", city: "Ajmer", type: "State", est: 2007, category: "Engineering" }, // Women only
    { name: "MLV Textile & Engineering College Bhilwara", abbr: "MLVTEC", city: "Bhilwara", type: "State", est: 1988, category: "Engineering" },
    { name: "Rajasthan Technical University Kota", abbr: "RTU Kota", city: "Kota", type: "State", est: 2006, category: "Engineering" }, // UTD

    // Top Private Engineering Colleges (Rajasthan)
    { name: "Birla Institute of Technology and Science Pilani", abbr: "BITS Pilani", city: "Pilani", type: "Deemed", est: 1964, category: "Engineering" },
    { name: "Banasthali Vidyapith", abbr: "Banasthali", city: "Tonk", type: "Deemed (Women)", est: 1935, category: "Engineering" },
    { name: "Manipal University Jaipur", abbr: "MUJ", city: "Jaipur", type: "Private", est: 2011, category: "Engineering" },
    { name: "The LNM Institute of Information Technology", abbr: "LNMIIT", city: "Jaipur", type: "Deemed", est: 2002, category: "Engineering" },
    { name: "Amity University Jaipur", abbr: "Amity Jaipur", city: "Jaipur", type: "Private", est: 2007, category: "Engineering" },
    { name: "NIIT University Neemrana", abbr: "NU", city: "Neemrana", type: "Private", est: 2009, category: "Engineering" },
    { name: "JECRC University Jaipur", abbr: "JECRC", city: "Jaipur", type: "Private", est: 2012, category: "Engineering" },
    { name: "Poornima College of Engineering", abbr: "PCE", city: "Jaipur", type: "Private", est: 2000, category: "Engineering" },
    { name: "Swami Keshvanand Institute of Technology", abbr: "SKIT", city: "Jaipur", type: "Private", est: 2000, category: "Engineering" },
    { name: "Arya College of Engineering and Information Technology", abbr: "Arya Main", city: "Jaipur", type: "Private", est: 2000, category: "Engineering" },

    // Other Good Private Engineering Colleges
    { name: "Arya College of Engineering & Research Centre", abbr: "Arya Old", city: "Jaipur", type: "Private", est: 1999, category: "Engineering" },
    { name: "Jaipur Engineering College and Research Centre", abbr: "JECRC College", city: "Jaipur", type: "Private", est: 2000, category: "Engineering" },
    { name: "Global Institute of Technology Jaipur", abbr: "GIT", city: "Jaipur", type: "Private", est: 2002, category: "Engineering" },
    { name: "Jagannath University Jaipur", abbr: "Jagannath", city: "Jaipur", type: "Private", est: 2008, category: "Engineering" },
    { name: "University of Engineering and Management Jaipur", abbr: "UEM", city: "Jaipur", type: "Private", est: 2011, category: "Engineering" },
    { name: "Vivekananda Global University Jaipur", abbr: "VGU", city: "Jaipur", type: "Private", est: 2012, category: "Engineering" },
    { name: "Stani Memorial College of Engineering", abbr: "SMCET", city: "Jaipur", type: "Private", est: 2000, category: "Engineering" },
    { name: "Anand International College of Engineering", abbr: "Anand ICE", city: "Jaipur", type: "Private", est: 2010, category: "Engineering" },
    { name: "BK Birla Institute of Engineering and Technology Pilani", abbr: "BKBIET", city: "Pilani", type: "Private", est: 2007, category: "Engineering" },
    { name: "Rajasthan Institute of Engineering and Technology Jaipur", abbr: "RIET", city: "Jaipur", type: "Private", est: 2000, category: "Engineering" },
    { name: "Sir Padampat Singhania University Udaipur", abbr: "SPSU", city: "Udaipur", type: "Private", est: 2007, category: "Engineering" },
    { name: "NIMS University Jaipur", abbr: "NIMS", city: "Jaipur", type: "Private", est: 2008, category: "Engineering" },
    { name: "Pacific University Udaipur", abbr: "PU Udaipur", city: "Udaipur", type: "Private", est: 1997, category: "Engineering" },
    { name: "Pacific Institute of Technology Udaipur", abbr: "PIT", city: "Udaipur", type: "Private", est: 2008, category: "Engineering" },
    { name: "Jodhpur Institute of Engineering and Technology", abbr: "JIET", city: "Jodhpur", type: "Private", est: 2003, category: "Engineering" },
    { name: "Marwar Engineering College Jodhpur", abbr: "MECRC", city: "Jodhpur", type: "Private", est: 2003, category: "Engineering" },

    // More Engineering Colleges
    { name: "Modi Institute of Technology Kota", abbr: "MIT Kota", city: "Kota", type: "Private", est: 2001, category: "Engineering" },
    { name: "Kota Engineering College", abbr: "KEC", city: "Kota", type: "Private", est: 2001, category: "Engineering" }, // Duplicate aliases ignored mostly
    { name: "Sobhasaria Engineering College Sikar", abbr: "SECS", city: "Sikar", type: "Private", est: 1999, category: "Engineering" },
    { name: "Shekhawati Institute of Engineering and Technology", abbr: "SIET Sikar", city: "Sikar", type: "Private", est: 2009, category: "Engineering" },
    { name: "Jaipur National University Jaipur", abbr: "JNU", city: "Jaipur", type: "Private", est: 2007, category: "Engineering" },
    { name: "Suresh Gyan Vihar University Jaipur", abbr: "SGVU", city: "Jaipur", type: "Private", est: 2008, category: "Engineering" },
    { name: "Rajasthan College of Engineering for Women Jaipur", abbr: "RCEW", city: "Jaipur", type: "Private (Women)", est: 2002, category: "Engineering" },
    { name: "Apex Institute of Engineering and Technology Jaipur", abbr: "AIET", city: "Jaipur", type: "Private", est: 2004, category: "Engineering" },
    { name: "Rawatbhata Engineering College Kota", abbr: "REC Rawatbhata", city: "Rawatbhata", type: "State", est: 2013, category: "Engineering" }, // Alias for some GECs, treated as distinct
    { name: "Shankara Institute of Technology Jaipur", abbr: "SIT", city: "Jaipur", type: "Private", est: 2001, category: "Engineering" }
];

function generateHtml(col, collegeSlug) {
    let isApexCentral = col.abbr === "IITJ" || col.abbr === "MNIT" || col.abbr === "IIIT Kota";
    let isApexPrivate = col.abbr === "BITS Pilani" || col.abbr === "LNMIIT";
    let isState = col.type.includes("State");

    let coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isApexCentral ? '8L' : (isState ? '3L' : '4L')} — \u20B9${isApexCentral ? '16L' : (isApexPrivate ? '22L' : '6L')}</td><td>10+2 PCM + ${isApexCentral ? 'JEE Main/Adv' : (col.abbr === 'BITS Pilani' ? 'BITSAT' : 'REAP / JEE Main')}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B93L</td><td>B.Tech + GATE ${isState ? '/ CAM / RTU DAT' : ''}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;

    let admissionHtml = isApexCentral ? "JoSAA / CSAB counseling utilizing pure JEE metrics exclusively." :
        isApexPrivate ? (col.abbr === 'BITS Pilani' ? "Zero reservations. Strict BITSAT score allocation mapping." : "LNMIIT operates purely on JEE Main ranks entirely separate from state counseling portals.") :
            "REAP (Rajasthan Engineering Admission Process). The centralized nodal agency handling massive admission pipelines utilizing primarily JEE Main ranks alongside 12th board merit for RTU/BTU affiliated entities.";

    if (col.abbr === "Banasthali") admissionHtml = "Banasthali operates a proprietary Aptitude Test strictly for female candidates, heavily integrating foundational learning.";

    let placementInfo = isApexCentral || isApexPrivate ? "Exceptional mass and premium placements routing directly into Tier-1 product-based MAANG operations and deep-core engineering giants." :
        "Solid foundations pushing bulk service-sector tech recruitment (TCS, WIPRO) heavily concentrated in the Jaipur / NCR tech corridor extensions alongside heavy PSUs routing via GATE.";

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life in Rajasthan. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, REAP 2026, Rajasthan Engineering Colleges, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/rajasthan/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/rajasthan/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, RJ</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Rajasthan, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>${isApexCentral || isApexPrivate ? '4.8' : '4.2'}</strong>/5
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
                    <p>${col.name} (${col.abbr}) is a defining component of Rajasthan's colossal technical education matrix. Operating from ${col.city}, it provides vital scaling to both the manufacturing/core sector layouts alongside deep tech integrations connected heavily to the Delhi-NCR pull.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / REAP Logic</h4><p>${admissionHtml}</p></div></div>
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
                    <p>Average Rating: <strong>${isApexCentral || isApexPrivate ? '4.8' : '4.2'} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The technical hub around Jaipur directly bridges talent to Gurgaon/Noida sectors while institutions handling core engineering feed relentlessly into major mining and metallurgical domains internally within Rajasthan."</p>
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

    for (const col of rjColleges) {
        const collegeSlug = slugify(col.name);

        // Most IIITs generated initially
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'rajasthan', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS base
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 7.9; // Default
        if (col.abbr === "IITJ" || col.abbr === "MNIT" || col.abbr === "BITS Pilani") baseScore = 9.8;
        else if (col.abbr === "LNMIIT" || col.abbr === "Banasthali") baseScore = 9.3;
        else if (col.abbr === "MBM" || col.abbr === "CTAE" || col.abbr === "SKIT") baseScore = 8.6;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Rajasthan', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 93 : 80}, nirf: 0,
      link: '../colleges/rajasthan/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.8" : "4.2"}', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Rajasthan Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Rajasthan Colleges to inject (already deduplicated).`);
    }
}

processAll();
