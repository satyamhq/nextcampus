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

const tnColleges = [
    // Top Government Engineering Colleges (Tamil Nadu)
    { name: "Indian Institute of Technology Madras", abbr: "IITM", city: "Chennai", type: "Government", est: 1959, category: "Engineering" },
    { name: "National Institute of Technology Tiruchirappalli", abbr: "NITT", city: "Tiruchirappalli", type: "Government", est: 1964, category: "Engineering" },
    { name: "Indian Institute of Information Technology Design and Manufacturing Kancheepuram", abbr: "IIITDM Kancheepuram", city: "Chennai", type: "Government", est: 2007, category: "Engineering" },
    { name: "College of Engineering Guindy", abbr: "CEG", city: "Chennai", type: "State", est: 1794, category: "Engineering" },
    { name: "Madras Institute of Technology", abbr: "MIT Chennai", city: "Chennai", type: "State", est: 1949, category: "Engineering" },
    { name: "Alagappa College of Technology", abbr: "ACTech", city: "Chennai", type: "State", est: 1944, category: "Engineering" },
    { name: "Government College of Technology Coimbatore", abbr: "GCT", city: "Coimbatore", type: "Government", est: 1945, category: "Engineering" },
    { name: "Government College of Engineering Salem", abbr: "GCE Salem", city: "Salem", type: "Government", est: 1966, category: "Engineering" },
    { name: "Government College of Engineering Tirunelveli", abbr: "GCE Tirunelveli", city: "Tirunelveli", type: "Government", est: 1981, category: "Engineering" },
    { name: "Government College of Engineering Bargur", abbr: "GCE Bargur", city: "Krishnagiri", type: "Government", est: 1994, category: "Engineering" },

    // Top Private Engineering Colleges (Tamil Nadu)
    { name: "Vellore Institute of Technology", abbr: "VIT Vellore", city: "Vellore", type: "Deemed", est: 1984, category: "Engineering" },
    { name: "SRM Institute of Science and Technology", abbr: "SRM KTR", city: "Chennai", type: "Deemed", est: 1985, category: "Engineering" }, // Catching generic name alias
    { name: "Amrita Vishwa Vidyapeetham", abbr: "Amrita", city: "Coimbatore", type: "Deemed", est: 1994, category: "Multidisciplinary" },
    { name: "SASTRA Deemed University", abbr: "SASTRA", city: "Thanjavur", type: "Deemed", est: 1984, category: "Engineering" },
    { name: "PSG College of Technology", abbr: "PSG Tech", city: "Coimbatore", type: "Private Aided", est: 1951, category: "Engineering" },
    { name: "SSN College of Engineering", abbr: "SSNCE", city: "Chennai", type: "Private", est: 1996, category: "Engineering" },
    { name: "Thiagarajar College of Engineering", abbr: "TCE", city: "Madurai", type: "Private Aided", est: 1957, category: "Engineering" },
    { name: "Kumaraguru College of Technology", abbr: "KCT", city: "Coimbatore", type: "Private", est: 1984, category: "Engineering" },
    { name: "Sri Krishna College of Engineering and Technology", abbr: "SKCET", city: "Coimbatore", type: "Private", est: 1998, category: "Engineering" },
    { name: "Karunya Institute of Technology and Sciences", abbr: "KITS", city: "Coimbatore", type: "Deemed", est: 1986, category: "Engineering" },

    // Other Top Engineering Colleges
    { name: "Vel Tech University Chennai", abbr: "Vel Tech", city: "Chennai", type: "Deemed", est: 1997, category: "Engineering" },
    { name: "Hindustan Institute of Technology and Science", abbr: "HITS", city: "Chennai", type: "Deemed", est: 1985, category: "Engineering" },
    { name: "Bannari Amman Institute of Technology", abbr: "BIT", city: "Sathyamangalam", type: "Private", est: 1996, category: "Engineering" },
    { name: "Coimbatore Institute of Technology", abbr: "CIT", city: "Coimbatore", type: "Private Aided", est: 1956, category: "Engineering" },
    { name: "Kongu Engineering College", abbr: "KEC", city: "Erode", type: "Private", est: 1984, category: "Engineering" },
    { name: "Sri Sairam Engineering College", abbr: "SEC", city: "Chennai", type: "Private", est: 1995, category: "Engineering" },
    { name: "RMK Engineering College", abbr: "RMKEC", city: "Chennai", type: "Private", est: 1995, category: "Engineering" },
    { name: "RMK College of Engineering and Technology", abbr: "RMKCET", city: "Chennai", type: "Private", est: 2008, category: "Engineering" },
    { name: "R.M.D Engineering College", abbr: "RMDEC", city: "Chennai", type: "Private", est: 2001, category: "Engineering" },
    { name: "Rajalakshmi Engineering College", abbr: "REC", city: "Chennai", type: "Private", est: 1997, category: "Engineering" },
    { name: "Rajalakshmi Institute of Technology", abbr: "RIT", city: "Chennai", type: "Private", est: 2008, category: "Engineering" },
    { name: "St Joseph’s College of Engineering Chennai", abbr: "St. Joseph's", city: "Chennai", type: "Private", est: 1994, category: "Engineering" },
    { name: "Panimalar Engineering College", abbr: "PEC", city: "Chennai", type: "Private", est: 2000, category: "Engineering" },
    { name: "Meenakshi Sundararajan Engineering College", abbr: "MSEC", city: "Chennai", type: "Private", est: 2001, category: "Engineering" },
    { name: "Easwari Engineering College", abbr: "EEC", city: "Chennai", type: "Private", est: 1996, category: "Engineering" },
    { name: "Velammal Engineering College", abbr: "VEC", city: "Chennai", type: "Private", est: 1995, category: "Engineering" },
    { name: "Velammal Institute of Technology", abbr: "VIT Chennai", city: "Chennai", type: "Private", est: 2008, category: "Engineering" },
    { name: "Sathyabama Institute of Science and Technology", abbr: "Sathyabama", city: "Chennai", type: "Deemed", est: 1987, category: "Engineering" },
    { name: "Saveetha Engineering College", abbr: "SEC", city: "Chennai", type: "Private", est: 2001, category: "Engineering" },
    { name: "Sri Venkateswara College of Engineering", abbr: "SVCE", city: "Sriperumbudur", type: "Private", est: 1985, category: "Engineering" },
    { name: "Dr Mahalingam College of Engineering and Technology", abbr: "MCET", city: "Pollachi", type: "Private", est: 1998, category: "Engineering" },
    { name: "Mepco Schlenk Engineering College", abbr: "Mepco", city: "Sivakasi", type: "Private", est: 1984, category: "Engineering" },
    { name: "Adhiyamaan College of Engineering", abbr: "ACE", city: "Hosur", type: "Private", est: 1987, category: "Engineering" },
    { name: "Park College of Engineering and Technology", abbr: "PCET", city: "Coimbatore", type: "Private", est: 1997, category: "Engineering" },
    { name: "Dhanalakshmi Srinivasan College of Engineering", abbr: "DSCE", city: "Perambalur", type: "Private", est: 2001, category: "Engineering" },
    { name: "Karpagam College of Engineering", abbr: "KCE", city: "Coimbatore", type: "Private", est: 2000, category: "Engineering" },
    { name: "Karpagam Institute of Technology", abbr: "KIT", city: "Coimbatore", type: "Private", est: 2007, category: "Engineering" },
    { name: "SNS College of Technology", abbr: "SNSCT", city: "Coimbatore", type: "Private", est: 2002, category: "Engineering" },

    // Anna University Regional Nodes
    { name: "Anna University Regional Campus Coimbatore", abbr: "AURCC", city: "Coimbatore", type: "State", est: 2007, category: "Engineering" },
    { name: "Anna University Regional Campus Tirunelveli", abbr: "AURCT", city: "Tirunelveli", type: "State", est: 2007, category: "Engineering" },
    { name: "Anna University Regional Campus Madurai", abbr: "AURCM", city: "Madurai", type: "State", est: 2010, category: "Engineering" },
    { name: "Anna University Regional Campus Trichy", abbr: "AURCT", city: "Tiruchirappalli", type: "State", est: 2007, category: "Engineering" }
];

function generateHtml(col, collegeSlug) {
    let isApexCentral = col.abbr === "IITM" || col.abbr === "NITT" || col.abbr.includes("IIIT");
    let isApexState = col.abbr === "CEG" || col.abbr === "MIT Chennai" || col.abbr === "ACTech" || col.abbr === "PSG Tech" || col.abbr === "SSNCE";
    let isDeemed = col.type === "Deemed";

    let genericStateReq = "10+2 PCM with minimum 50% aggregated cutoff points.";

    let coursesHtml = `<tr><td><strong>B.E / B.Tech</strong></td><td>4 Years</td><td>\u20B9${isApexCentral ? '8L' : (isDeemed ? '8L' : '2.5L')} — \u20B9${isApexCentral ? '18L' : (isDeemed ? '20L' : '6L')}</td><td>${genericStateReq} + ${isApexCentral ? 'JEE Main/Adv' : (isDeemed ? 'Institute Entrance (VITEEE/SRMJEEE/AEEE)' : 'TNEA Merit Counselling')}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.E / M.Tech</strong></td><td>2 Years</td><td>\u20B91L — \u20B94L</td><td>B.E/B.Tech + TANCET / GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;

    let admissionHtml = isApexCentral ? "JoSAA / CSAB handles rigorous centralized placement utilizing pure JEE percentiles." :
        isDeemed ? "Highly autonomous procedures operating distinct competitive entrance ranks independent of state boards." :
            "Tamil Nadu Engineering Admissions (TNEA). A massive, unified single-window counseling matrix aggregating 12th standard physics, chemistry, and math scores scaling across hundreds of Anna University affiliated colleges.";

    if (isApexState) admissionHtml = "The absolute zenith of the TNEA counseling. CEG, MIT, PSG, and SSN demand near 200/200 cutoff formulations, completely bypassing entrance exams for state residents.";

    let placementInfo = isApexCentral ? "MNC influx peaks here globally. Silicon valley direct placements and mammoth core product integrations." :
        "Driven massively by 'Day 1' sharing matrices where sheer tech conglomerates (TCS, CTS, Infosys, Wipro, Accenture) recruit heavily. Deep pockets in Chennai/Coimbatore IT Corridors.";

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life in Tamil Nadu. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, TNEA 2026, Tamil Nadu Colleges, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/tamil-nadu/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/tamil-nadu/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, TN</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Tamil Nadu, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>${isApexCentral || isApexState ? '4.8' : '4.3'}</strong>/5
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
                    <p>${col.name} (${col.abbr}) forms the backbone of Tamil Nadu's colossal engineering matrix situated in ${col.city}. Having scaled rapidly since ${col.est}, it structurally bridges southern manufacturing supremacy with massive IT infrastructure scaling along OMR (Chennai) and the expanding Coimbatore belts.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / State Metric</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>TNEA / TANCET Counselling</h4><p>Anna University utilizes a pure cut-off threshold calculated out of 200, rigorously assigning native students avoiding entrance bloat entirely, unlike its national equivalents (unless deemed autonomous).</p></div></div>
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
                    <p>Average Rating: <strong>${isApexCentral || isApexState ? '4.8' : '4.3'} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified TN Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The exposure is ungodly! Because Tamil Nadu hosts absolute massive setups like Hyundai, Ford, and the entire Sholinganallur IT hub dynamically scaling recruitment pipelines each term."</p>
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

    for (const col of tnColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'tamil-nadu', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // Base CSS
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 8.1;
        if (col.abbr === "IITM" || col.abbr === "NITT" || col.abbr === "VIT Vellore" || col.abbr === "CEG") baseScore = 9.8;
        else if (col.abbr === "MIT Chennai" || col.abbr === "PSG Tech" || col.abbr === "SSNCE" || col.abbr === "SASTRA") baseScore = 9.5;
        else if (col.abbr === "Amrita" || col.type === "Government") baseScore = 9.1;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Tamil Nadu', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 95 : 85}, nirf: 0,
      link: '../colleges/tamil-nadu/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.8" : "4.3"}', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Tamil Nadu Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Tamil Nadu Colleges to inject (already deduplicated).`);
    }
}

processAll();
