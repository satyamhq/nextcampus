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

const odColleges = [
    // Top Universities & National Institutes (Odisha)
    { name: "Indian Institute of Technology Bhubaneswar", abbr: "IIT Bhubaneswar", city: "Bhubaneswar", type: "Government", est: 2008, category: "Engineering" },
    { name: "National Institute of Technology Rourkela", abbr: "NIT Rourkela", city: "Rourkela", type: "Government", est: 1961, category: "Engineering" },
    { name: "All India Institute of Medical Sciences Bhubaneswar", abbr: "AIIMS Bhubaneswar", city: "Bhubaneswar", type: "INI", est: 2012, category: "Medical" },
    { name: "Indian Institute of Management Sambalpur", abbr: "IIM Sambalpur", city: "Sambalpur", type: "Government", est: 2015, category: "Management" },
    { name: "National Institute of Science Education and Research", abbr: "NISER", city: "Bhubaneswar", type: "Government", est: 2006, category: "Arts & Science" },
    { name: "Central University of Odisha", abbr: "CUO", city: "Koraput", type: "Central", est: 2009, category: "Multidisciplinary" },
    { name: "Utkal University", abbr: "Utkal", city: "Bhubaneswar", type: "State", est: 1943, category: "Multidisciplinary" },
    { name: "Sambalpur University", abbr: "SU", city: "Sambalpur", type: "State", est: 1967, category: "Multidisciplinary" },
    { name: "Berhampur University", abbr: "BU", city: "Berhampur", type: "State", est: 1967, category: "Multidisciplinary" },
    { name: "Biju Patnaik University of Technology", abbr: "BPUT", city: "Rourkela", type: "State", est: 2002, category: "Engineering" },

    // Top Government Colleges
    { name: "SCB Medical College Cuttack", abbr: "SCB", city: "Cuttack", type: "State", est: 1944, category: "Medical" },
    { name: "MKCG Medical College Berhampur", abbr: "MKCG", city: "Berhampur", type: "State", est: 1962, category: "Medical" },
    { name: "VSS Medical College Burla", abbr: "VIMSAR", city: "Burla", type: "State", est: 1959, category: "Medical" },
    { name: "Government College of Engineering Keonjhar", abbr: "GCEK", city: "Keonjhar", type: "State", est: 1995, category: "Engineering" },
    { name: "Parala Maharaja Engineering College", abbr: "PMEC", city: "Berhampur", type: "State", est: 2009, category: "Engineering" },
    { name: "College of Engineering and Technology Bhubaneswar", abbr: "CETB", city: "Bhubaneswar", type: "State", est: 1981, category: "Engineering" }, // Rebranded to OUTR below usually
    { name: "Government Engineering College Bhawanipatna", abbr: "GECB", city: "Bhawanipatna", type: "State", est: 2009, category: "Engineering" },
    { name: "Government Engineering College Malkangiri", abbr: "GECM", city: "Malkangiri", type: "State", est: 2021, category: "Engineering" }, // Assuming new/recent establishment logic
    { name: "Government College Rourkela", abbr: "GCR", city: "Rourkela", type: "State", est: 1961, category: "Arts & Science" },
    { name: "Ravenshaw College Cuttack", abbr: "Ravenshaw", city: "Cuttack", type: "State Unitary", est: 1868, category: "Multidisciplinary" }, // University now

    // Top Private Universities
    { name: "KIIT University", abbr: "KIIT", city: "Bhubaneswar", type: "Deemed", est: 1992, category: "Multidisciplinary" },
    { name: "Siksha 'O' Anusandhan", abbr: "SOA", city: "Bhubaneswar", type: "Deemed", est: 2007, category: "Multidisciplinary" },
    { name: "Kalinga University", abbr: "Kalinga", city: "Bhubaneswar", type: "Private", est: 2013, category: "Multidisciplinary" }, // Often confused with KIIT, keeping discrete
    { name: "Centurion University of Technology and Management", abbr: "CUTM", city: "Bhubaneswar", type: "Private", est: 2010, category: "Multidisciplinary" },
    { name: "CV Raman Global University", abbr: "CGU", city: "Bhubaneswar", type: "Private", est: 1997, category: "Engineering" },
    { name: "Sri Sri University", abbr: "SSU", city: "Cuttack", type: "Private", est: 2009, category: "Multidisciplinary" },
    { name: "Birla Global University", abbr: "BGU", city: "Bhubaneswar", type: "Private", est: 2015, category: "Management" },
    { name: "ICFAI University Odisha", abbr: "ICFAI Odisha", city: "Bhubaneswar", type: "Private", est: 2007, category: "Multidisciplinary" }, // Often confused with ICFAI campuses
    { name: "Xavier University Bhubaneswar", abbr: "XIM University", city: "Bhubaneswar", type: "Private", est: 2013, category: "Management" }, // Famous as XIMB
    { name: "Kalinga Institute of Social Sciences University", abbr: "KISS", city: "Bhubaneswar", type: "Deemed", est: 1993, category: "Arts & Science" },

    // Other Top Colleges
    { name: "Silicon Institute of Technology Bhubaneswar", abbr: "SIT", city: "Bhubaneswar", type: "Private", est: 2001, category: "Engineering" },
    { name: "Institute of Technical Education and Research Bhubaneswar", abbr: "ITER", city: "Bhubaneswar", type: "Private", est: 1996, category: "Engineering" }, // Under SOA inherently
    { name: "Gandhi Institute for Technology Bhubaneswar", abbr: "GIFT", city: "Bhubaneswar", type: "Private", est: 2007, category: "Engineering" },
    { name: "Trident Academy of Technology Bhubaneswar", abbr: "TAT", city: "Bhubaneswar", type: "Private", est: 2005, category: "Engineering" },
    { name: "Orissa Engineering College Bhubaneswar", abbr: "OEC", city: "Bhubaneswar", type: "Private", est: 1986, category: "Engineering" },
    { name: "Hi-Tech Institute of Technology Bhubaneswar", abbr: "HIT", city: "Bhubaneswar", type: "Private", est: 2008, category: "Engineering" },
    { name: "DRIEMS University Cuttack", abbr: "DRIEMS", city: "Cuttack", type: "Private", est: 1999, category: "Multidisciplinary" },
    { name: "C.V. Raman College of Engineering Bhubaneswar", abbr: "CVRCE", city: "Bhubaneswar", type: "Private", est: 1997, category: "Engineering" }, // Legacy name for CGU
    { name: "Gandhi Engineering College Bhubaneswar", abbr: "GEC", city: "Bhubaneswar", type: "Private", est: 2006, category: "Engineering" },
    { name: "Indira Gandhi Institute of Technology Sarang", abbr: "IGIT", city: "Sarang", type: "State", est: 1982, category: "Engineering" },

    // More Colleges
    { name: "Odisha University of Technology and Research", abbr: "OUTR", city: "Bhubaneswar", type: "State", est: 1981, category: "Engineering" }, // Upgraded CETB
    { name: "Bhadrak Engineering College", abbr: "BCE", city: "Bhadrak", type: "Private", est: 1997, category: "Engineering" }, // Usually Bhadrak Institute
    { name: "Padmanava College of Engineering Rourkela", abbr: "PCE", city: "Rourkela", type: "Private", est: 1999, category: "Engineering" },
    { name: "Krupajal Engineering College Bhubaneswar", abbr: "KEC", city: "Bhubaneswar", type: "Private", est: 1995, category: "Engineering" },
    { name: "Nalanda Institute of Technology Bhubaneswar", abbr: "NIT", city: "Bhubaneswar", type: "Private", est: 2006, category: "Engineering" },
    { name: "Synergy Institute of Engineering and Technology Dhenkanal", abbr: "SIET", city: "Dhenkanal", type: "Private", est: 1999, category: "Engineering" },
    { name: "Ajay Binay Institute of Technology Cuttack", abbr: "ABIT", city: "Cuttack", type: "Private", est: 1998, category: "Engineering" },
    { name: "Jagannath Institute of Engineering and Technology Bhubaneswar", abbr: "JIET", city: "Bhubaneswar", type: "Private", est: 1996, category: "Engineering" },
    { name: "Biju Patnaik Institute of Information Technology Rourkela", abbr: "BPIIT", city: "Rourkela", type: "Private", est: 2001, category: "Engineering" },
    { name: "Government College Koraput", abbr: "GAC", city: "Koraput", type: "State", est: 1968, category: "Arts & Science" },
    { name: "Government College Balasore", abbr: "FMGC", city: "Balasore", type: "State", est: 1944, category: "Arts & Science" }, // Fakir Mohan
    { name: "Government College Puri", abbr: "SCS", city: "Puri", type: "State", est: 1944, category: "Arts & Science" } // Samanta Chandra Sekhar
];

function generateHtml(col, collegeSlug) {
    let isApexTech = col.abbr === "IIT Bhubaneswar" || col.abbr === "NIT Rourkela";
    let isApexMed = col.abbr === "SCB" || col.abbr === "AIIMS Bhubaneswar";
    let isBPUT = col.type === "State" && col.category === "Engineering" && !isApexTech && col.abbr !== "BPUT" && col.abbr !== "OUTR" && col.abbr !== "CETB";

    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B9${isApexMed && col.abbr !== 'AIIMS Bhubaneswar' ? '1.5L' : '5L'} — \u20B9${col.abbr === 'AIIMS Bhubaneswar' ? '6K' : '20L/Yr'}</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B91L — \u20B910L/Yr</td><td>MBBS + NEET PG / INI-CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "AIIMS Bhubaneswar" ? "Operates via centralized MCC pipelines entirely under the AIQ (INI-CET) frameworks." : "Odisha Joint Entrance Examination (OJEE) medical cell orchestrates state quota mappings scaling against National NEET percentiles.";
        placementInfo = "Immense clinical deployments into state infrastructures alongside absolute tier-1 fellowship transitions (PLAB/USMLE) for top SCB/AIIMS graduates.";
    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isApexTech ? '8L' : '2L'} — \u20B9${isApexTech ? '16L' : '7L'}</td><td>10+2 PCM + ${isApexTech ? 'JEE Main/Adv' : 'OJEE / JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech / MCA</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B93L</td><td>B.Tech + GATE / OJEE PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isApexTech ? "JoSAA / CSAB counseling mapping directly to pure JEE algorithmic ranks." :
            (col.abbr === "KIIT" || col.abbr === "SOA" ? "Massive autonomous proprietary testing metrics (KIITEE/SAAT) utilized to manage colossal all-India intakes spanning diverse branches." : "OJEE (Odisha Joint Entrance Examination) commands all state BPUT tech admissions, primarily utilizing JEE Main ranks natively.");
        placementInfo = isApexTech ? "Tier-1 engineering packages aggressively funneled into major MAANG and core consulting sectors dynamically routing through Hyderabad/Bangalore." : "Unstoppable IT-Service volume deployments funneling largely towards Bhubaneswar's massive tech parks (TCS, Infosys, Tech Mahindra).";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B910L — \u20B922L</td><td>Graduation + CAT / XIMB Test</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "IIM Sambalpur" ? "Stringent CAT percentiles deployed under the common IIM CAP (Common Admission Process)." : "XIMB operates an intense matrix evaluating CAT/XAT/GMAT along with its own X-GMT metrics.";
        placementInfo = "XIMB natively supplies elite MBB consulting and top-tier FMCG commands. IIM Sambalpur rapidly scales BFSI integrations.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3 Years</td><td>\u20B95K — \u20B91L</td><td>10+2 Merit via SAMS / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B910K — \u20B91.5L</td><td>Bachelor's + CPET / CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "NISER" ? "NEST (National Entrance Screening Test) explicitly dictates entry into elite integrated M.Sc scientific workflows." : "SAMS (Student Academic Management System) controls massive undergraduate volume across Odisha. Postgraduates enter via CPET (Common PG Entrance Test).";
        placementInfo = "Generates massive humanities and administrative manpower heavily feeding the prestigious OPSC channels, regional banking setups, and massive teaching cadres.";
    }

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life in Odisha. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Odisha Colleges, OJEE 2026, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/odisha/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/odisha/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, OD</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Odisha, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>${isApexTech || isApexMed || col.abbr === 'XIM University' ? '4.8' : '4.3'}</strong>/5
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
                    <p>${col.name} (${col.abbr}) fundamentally anchors ${col.city}'s academic blueprint, deeply embedded within the industrial corridors characterizing the Odisha framework. ${isBPUT ? 'This institution heavily leverages affiliation architectures bridging into the Biju Patnaik University of Technology logic.' : ''}</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance Matrix</h4><p>${admissionHtml}</p></div></div>
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
                    <p>Average Rating: <strong>${isApexTech || isApexMed || col.abbr === 'XIM University' ? '4.8' : '4.3'} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The robust alumni structure across the eastern zone deeply supports fresh graduate integration. The pipelines into mass IT/manufacturing (NALCO/SAIL/TCS deployments based locally) are heavily fortified."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Libraries & Tech Parks</span></div>
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

    for (const col of odColleges) {
        if (col.abbr === "CETB" && homeContent.includes("odisha-university-of-technology-and-research")) continue;
        if (col.abbr === "CVRCE" && homeContent.includes("cv-raman-global-university")) continue;

        const collegeSlug = slugify(col.name);

        // Check dupe
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'odisha', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS base
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 7.9; // Default
        if (col.abbr === "IIT Bhubaneswar" || col.abbr === "NIT Rourkela" || col.abbr === "IIM Sambalpur" || col.abbr === "NISER" || col.abbr === "AIIMS Bhubaneswar" || col.abbr === "XIM University") baseScore = 9.8;
        else if (col.abbr === "KIIT" || col.abbr === "SOA" || col.abbr === "SCB") baseScore = 9.3;
        else if (col.abbr === "OUTR" || col.abbr === "CETB" || col.abbr === "Utkal") baseScore = 8.6;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Odisha', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 90 : 80}, nirf: 0,
      link: '../colleges/odisha/${collegeSlug}/${collegeSlug}.html',
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
            console.log(`\n✅ Injected ${newCards.length} Odisha Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Odisha Colleges to inject (already deduplicated).`);
    }
}

processAll();
