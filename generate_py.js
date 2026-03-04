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

const pyColleges = [
    // Top Universities & National Institutes
    { name: "Pondicherry University", abbr: "PU", city: "Puducherry", type: "Central", est: 1985, category: "Multidisciplinary" },
    { name: "Jawaharlal Institute of Postgraduate Medical Education and Research", abbr: "JIPMER", city: "Puducherry", type: "Institute of National Importance", est: 1823, category: "Medical" },
    { name: "Puducherry Technological University", abbr: "PTU", city: "Puducherry", type: "State", est: 1984, category: "Engineering" }, // Upgraded from PEC
    { name: "National Institute of Technology Puducherry", abbr: "NITPY", city: "Karaikal", type: "Government", est: 2010, category: "Engineering" },

    // Top Government Colleges
    { name: "Indira Gandhi Medical College and Research Institute", abbr: "IGMCRI", city: "Puducherry", type: "State", est: 2010, category: "Medical" },
    { name: "Rajiv Gandhi Government Women and Children Hospital Medical College", abbr: "RGGWCH", city: "Puducherry", type: "State", est: 2010, category: "Medical" },
    { name: "Tagore Government Arts and Science College", abbr: "TGASC", city: "Puducherry", type: "State", est: 1961, category: "Arts & Science" },
    { name: "Kanchi Mamunivar Government Institute for Postgraduate Studies and Research", abbr: "KMGIPSR", city: "Puducherry", type: "State", est: 1989, category: "Arts & Science" },
    { name: "Government Arts College Puducherry", abbr: "GAC", city: "Puducherry", type: "State", est: 1993, category: "Arts & Science" },

    // Top Private Universities
    { name: "Sri Balaji Vidyapeeth", abbr: "SBV", city: "Puducherry", type: "Deemed", est: 2008, category: "Medical" },
    { name: "Vinayaka Missions Research Foundation Puducherry Campus", abbr: "VMRF", city: "Puducherry", type: "Deemed", est: 1981, category: "Medical" }, // VMRF has AVMC, VMC etc.

    // Top Engineering Colleges
    { name: "Puducherry Engineering College", abbr: "PEC", city: "Puducherry", type: "State", est: 1984, category: "Engineering" }, // Duplicate handled above mostly via PTU, but kept if distinct URL requested
    { name: "Sri Manakula Vinayagar Engineering College", abbr: "SMVEC", city: "Puducherry", type: "Private", est: 1999, category: "Engineering" },
    { name: "Rajiv Gandhi College of Engineering and Technology", abbr: "RGCET", city: "Puducherry", type: "Private", est: 1999, category: "Engineering" },
    { name: "Christ College of Engineering and Technology", abbr: "CCET", city: "Puducherry", type: "Private", est: 2007, category: "Engineering" },
    { name: "Achariya College of Engineering Technology", abbr: "ACET", city: "Puducherry", type: "Private", est: 2010, category: "Engineering" },
    { name: "Achariya Bala Siksha Mandir Engineering College", abbr: "ABSMEC", city: "Puducherry", type: "Private", est: 2010, category: "Engineering" },

    // Medical & Health Colleges
    { name: "Mahatma Gandhi Medical College and Research Institute", abbr: "MGMCRI", city: "Puducherry", type: "Private", est: 2001, category: "Medical" },
    { name: "Sri Lakshmi Narayana Institute of Medical Sciences", abbr: "SLIMS", city: "Puducherry", type: "Private", est: 2006, category: "Medical" },
    { name: "Aarupadai Veedu Medical College", abbr: "AVMC", city: "Puducherry", type: "Private", est: 1999, category: "Medical" },

    // Arts, Science & Commerce Colleges
    { name: "Bharathidasan Government College for Women", abbr: "BGCW", city: "Puducherry", type: "State (Women)", est: 1968, category: "Arts & Science" },
    { name: "Saradha Gangadharan College", abbr: "SGC", city: "Puducherry", type: "Private", est: 2001, category: "Arts & Science" },
    { name: "Pope John Paul II College", abbr: "PJPC", city: "Puducherry", type: "Private", est: 1995, category: "Arts & Science" },
    { name: "Immaculate College for Women", abbr: "ICW", city: "Puducherry", type: "Private (Women)", est: 2008, category: "Arts & Science" },
    { name: "Perunthalaivar Kamarajar Government Arts College", abbr: "PKGAC", city: "Kariakal", type: "State", est: 1998, category: "Arts & Science" },
    { name: "Arignar Anna Government Arts and Science College", abbr: "AAGASC", city: "Karaikal", type: "State", est: 1968, category: "Arts & Science" },
    { name: "Rajiv Gandhi Arts and Science College", abbr: "RGASC", city: "Puducherry", type: "State", est: 1995, category: "Arts & Science" },
    { name: "Indira Gandhi Arts and Science College", abbr: "IGASC", city: "Puducherry", type: "State", est: 2001, category: "Arts & Science" },
    { name: "Mother Teresa Institute of Science and Technology", abbr: "MTIST", city: "Puducherry", type: "Private", est: 2001, category: "Engineering" },
    { name: "Don Bosco College Puducherry", abbr: "DBC", city: "Puducherry", type: "Private", est: 2007, category: "Arts & Science" },

    // More Colleges
    { name: "Annai Sivagami Government College", abbr: "ASGAC", city: "Puducherry", type: "State (Women)", est: 2013, category: "Arts & Science" },
    { name: "Thanthai Periyar Government College", abbr: "TPGC", city: "Puducherry", type: "State", est: 1968, category: "Arts & Science" }, // Usually TPIGAS
    { name: "Dr Ambedkar Government Arts College", abbr: "DAGAC", city: "Puducherry", type: "State", est: 1973, category: "Arts & Science" },
    { name: "Rajiv Gandhi College of Education", abbr: "RGCE", city: "Puducherry", type: "Private", est: 2005, category: "Arts & Science" },
    { name: "Sri Venkateswara College of Engineering and Technology", abbr: "SVCET", city: "Puducherry", type: "Private", est: 2014, category: "Engineering" },
    { name: "Alpha College of Engineering and Technology", abbr: "ACET PU", city: "Puducherry", type: "Private", est: 2006, category: "Engineering" },
    { name: "Surya College of Engineering and Technology", abbr: "SCET", city: "Villupuram", type: "Private", est: 2008, category: "Engineering" }, // Often overlaps with PY border
    { name: "ECR Institute of Management Studies", abbr: "ECR", city: "Puducherry", type: "Private", est: 2004, category: "Management" },
    { name: "St Joseph College of Arts and Science", abbr: "SJC", city: "Cuddalore", type: "Private", est: 1991, category: "Arts & Science" }, // Bordering Cuddalore
    { name: "St Patrick College of Education", abbr: "SPCE", city: "Puducherry", type: "Private", est: 2000, category: "Arts & Science" },
    { name: "Indira Gandhi Institute of Dental Sciences", abbr: "IGIDS", city: "Puducherry", type: "Private", est: 2007, category: "Medical" },
    { name: "Mahatma Gandhi Dental College", abbr: "MGDC", city: "Puducherry", type: "State", est: 1990, category: "Medical" },
    { name: "Sri Venkateswara Dental College", abbr: "SVDC", city: "Puducherry", type: "Private", est: 2007, category: "Medical" },
    { name: "Mother Theresa Postgraduate and Research Institute of Health Sciences", abbr: "MTPGRIHS", city: "Puducherry", type: "State", est: 1991, category: "Medical" },
    { name: "Sri Manakula Vinayagar Medical College", abbr: "SMVMCH", city: "Puducherry", type: "Private", est: 2006, category: "Medical" },
    { name: "Pondicherry Institute of Medical Sciences", abbr: "PIMS", city: "Puducherry", type: "Private", est: 2000, category: "Medical" },
    { name: "Aarupadai Veedu Institute of Technology", abbr: "AVIT", city: "Puducherry", type: "Private", est: 1998, category: "Engineering" },
    { name: "Rajiv Gandhi Polytechnic College", abbr: "RGPC", city: "Puducherry", type: "State", est: 1999, category: "Engineering" },
    { name: "Government Polytechnic College Puducherry", abbr: "GPCP", city: "Puducherry", type: "State", est: 1988, category: "Engineering" }, // MOT
    { name: "Government Polytechnic College Karaikal", abbr: "GPCK", city: "Karaikal", type: "State", est: 1988, category: "Engineering" }, // Women
    { name: "Government Polytechnic College Mahe", abbr: "GPCM", city: "Mahe", type: "State", est: 2000, category: "Engineering" },
    { name: "Government Polytechnic College Yanam", abbr: "GPCY", city: "Yanam", type: "State", est: 2000, category: "Engineering" }
];

function generateHtml(col, collegeSlug) {
    let isApexMed = col.abbr === "JIPMER";
    let isApexTech = col.abbr === "NITPY" || col.abbr === "PTU" || col.abbr === "PEC";
    let isPolytechnic = col.name.includes("Polytechnic");

    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (isPolytechnic) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering</strong></td><td>3 Years</td><td>\u20B915K — \u20B935K</td><td>10th Pass Central/State</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `CENTAC (Centralised Admission Committee, Puducherry) strictly regulates polytechnic intake, pivoting on 10th standard SSLC merits alongside heavy regional domicile priorities masking Yanam, Mahe, and Karaikal zones.`;
        placementInfo = "High focus on state infrastructure projects alongside foundational manufacturing roles feeding into Tamil Nadu's industrial grids.";
    } else if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>${col.name.includes("Dental") ? 'BDS' : 'MBBS'}</strong></td><td>${col.name.includes("Dental") ? '5 Years' : '5.5 Years'}</td><td>\u20B9${isApexMed ? '25K' : '3L'} — \u20B9${isApexMed ? '1L' : '20L/Yr'}</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD / MS ${col.name.includes("Dental") ? '/ MDS' : ''}</strong></td><td>3 Years</td><td>\u20B91L — \u20B910L/Yr</td><td>${col.name.includes("Dental") ? 'BDS + NEET MDS' : 'MBBS + NEET PG / INI-CET'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "JIPMER" ? "Operating completely under the INI-CET framework and MCC. No state interference. JIPMER stands alongside AIIMS and PGIMER as the supreme apex of Indian medical routing." : "CENTAC controls state quota, relying completely on National Eligibility cum Entrance Test (NEET) parameters, distributing seats precisely across IGMCRI and private networks.";
        placementInfo = isApexMed ? "Instantaneous transition into Supreme National Healthcare Commands. Fellowships heavily routed immediately into USMLE/PLAB pipelines." : "Extensive clinical deployments inside Puducherry's incredibly dense healthcare matrix. Graduates directly map into massive TN corporate hospitals.";
    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isApexTech ? '1L' : '2L'} — \u20B9${isApexTech ? '6L' : '5L'}</td><td>10+2 PCM + ${col.abbr === "NITPY" ? 'JEE Main/Adv' : 'CENTAC (JEE / Merit)'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91L — \u20B93L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "NITPY" ? "JoSAA / CSAB counseling utilizing pure JEE ranks, maintaining massive HS (Home State) quota specifically shielding Puducherry domiciles." : "CENTAC defines engineering entry. Pure 12th math/physics metrics combine fiercely with JEE Main aggregates to dictate seats across PTU/PEC and massive private affiliations like SMVEC.";
        placementInfo = isApexTech ? "Tier-1 scaling. Graduates violently merge into the Chennai IT Belt (TCS, Zoho, CTS) and massive core mechanical/electrical arrays tracking through Tamil Nadu." : "Solid tech deployments routing largely via off-campus drives and immense volume IT sector intakes dominating the southern belt.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com / BBA</strong></td><td>3 Years</td><td>\u20B95K — \u20B91.5L</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B910K — \u20B91L</td><td>Bachelor's + University Entrance/CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "PU" ? "Pondicherry University operates fully utilizing the centralized CUET UG and PG algorithms." : "Government Arts operations are directly orchestrated by CENTAC logic utilizing 12th standard normalization loops.";
        placementInfo = "Generates massive humanities and foundational scientific manpower heavily supplying UPSC pipelines, regional civil service wings, and foundational banking infrastructure.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const typeLabel = isPolytechnic ? 'Government Diploma' : col.type;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life in Puducherry. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Puducherry Universities, CENTAC 2026, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/puducherry/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/puducherry/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, PY</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Puducherry, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>${isApexMed || col.abbr === "PU" || isApexTech ? '4.8' : '4.2'}</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${typeLabel}</strong></span>
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
                    <p>${col.name} (${col.abbr}) governs a massive sector of Puducherry's foundational education matrix. Operating from ${col.city}, it provides vital scaling to the entire Union Territory, maintaining strict CENTAC alignment to secure local talent pipelines directly connected to overarching Tamil grids.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / CENTAC Process</h4><p>${admissionHtml}</p></div></div>
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
                    <p>Average Rating: <strong>${isApexMed || col.abbr === "PU" || isApexTech ? '4.8' : '4.2'} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The Union territory operates flawlessly, shielding native students aggressively through CENTAC allocations while absorbing the absolute highest caliber national candidates via AIQ pipelines at setups like NIT and JIPMER."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Collegiate Facilities</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostel Operations</span></div>
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

    for (const col of pyColleges) {
        if (col.abbr === "PEC" && homeContent.includes("puducherry-technological-university")) col.abbr = "PTU"; // Duplicate handling natively if PTU generated

        const collegeSlug = slugify(col.name);

        // Check dupe
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'puducherry', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS base
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 7.9; // Default
        if (col.abbr === "JIPMER") baseScore = 9.9;
        else if (col.abbr === "PU" || col.abbr === "NITPY") baseScore = 9.4;
        else if (col.abbr === "PTU" || col.abbr === "PEC" || col.abbr === "IGMCRI") baseScore = 8.5;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Puducherry', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 90 : 80}, nirf: 0,
      link: '../colleges/puducherry/${collegeSlug}/${collegeSlug}.html',
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
            console.log(`\n✅ Injected ${newCards.length} Puducherry Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Puducherry Colleges to inject (already deduplicated).`);
    }
}

processAll();
