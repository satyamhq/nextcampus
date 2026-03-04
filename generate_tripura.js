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

const trColleges = [
    // Universities in Tripura
    { name: "Tripura University", abbr: "TU", city: "Agartala", type: "Central", est: 1987, category: "Arts & Science" },
    { name: "Maharaja Bir Bikram University", abbr: "MBBU", city: "Agartala", type: "State", est: 2015, category: "Arts & Science" },
    { name: "ICFAI University Tripura", abbr: "ICFAI", city: "Agartala", type: "Private", est: 2004, category: "Multidisciplinary" },
    { name: "National Law University Tripura", abbr: "NLU Tripura", city: "Agartala", type: "State", est: 2022, category: "Law" },

    // Engineering Colleges
    { name: "National Institute of Technology Agartala", abbr: "NIT Agartala", city: "Agartala", type: "Government", est: 2006, category: "Engineering" },
    { name: "Tripura Institute of Technology", abbr: "TIT", city: "Narsingarh", type: "Government", est: 1958, category: "Engineering" },
    { name: "Techno India Agartala", abbr: "TIA", city: "Agartala", type: "Private", est: 2014, category: "Engineering" },

    // Medical Colleges
    { name: "Agartala Government Medical College", abbr: "AGMC", city: "Agartala", type: "Government", est: 2005, category: "Medical" },
    { name: "Tripura Medical College", abbr: "TMC", city: "Hapania", type: "Private / PPP", est: 2006, category: "Medical" },

    // Major Degree Colleges
    { name: "Maharaja Bir Bikram College", abbr: "MBB College", city: "Agartala", type: "Government", est: 1947, category: "Arts & Science" },
    { name: "Ramthakur College", abbr: "RTC", city: "Agartala", type: "Government", est: 1967, category: "Arts & Science" },
    { name: "Women's College Agartala", abbr: "WCA", city: "Agartala", type: "Government", est: 1965, category: "Arts & Science" },
    { name: "Netaji Subhash Mahavidyalaya", abbr: "NSM", city: "Udaipur", type: "Government", est: 1979, category: "Arts & Science" },
    { name: "Iswar Chandra Vidyasagar College", abbr: "ICVC", city: "Belonia", type: "Government", est: 1964, category: "Arts & Science" },
    { name: "Dharmanagar Government Degree College", abbr: "DGDC", city: "Dharmanagar", type: "Government", est: 1979, category: "Arts & Science" },
    { name: "Ambedkar College Fatikroy", abbr: "ACF", city: "Fatikroy", type: "Government", est: 1991, category: "Arts & Science" },
    { name: "Santirbazar Government College", abbr: "SGC", city: "Santirbazar", type: "Government", est: 2020, category: "Arts & Science" },
    { name: "Teliamura Government College", abbr: "TGC", city: "Teliamura", type: "Government", est: 2020, category: "Arts & Science" },
    { name: "Sabroom Government Degree College", abbr: "SGDC", city: "Sabroom", type: "Government", est: 1987, category: "Arts & Science" },
    { name: "Kamalpur Government Degree College", abbr: "KGDC", city: "Kamalpur", type: "Government", est: 1988, category: "Arts & Science" },
    { name: "Longtharai Valley Government College", abbr: "LVGC", city: "Chailengta", type: "Government", est: 2020, category: "Arts & Science" },
    { name: "Rabindranath Thakur Mahavidyalaya", abbr: "RTM", city: "Bishalgarh", type: "Government", est: 2000, category: "Arts & Science" },
    { name: "Kabi Nazrul Mahavidyalaya", abbr: "KNM", city: "Sonamura", type: "Government", est: 1994, category: "Arts & Science" },

    // Polytechnic & Technical Colleges
    { name: "Women's Polytechnic Hapania", abbr: "WPH", city: "Agartala", type: "Government", est: 2003, category: "Engineering" },
    { name: "Gomati District Polytechnic", abbr: "GDP", city: "Udaipur", type: "Government", est: 2012, category: "Engineering" },
    { name: "Dhalai District Polytechnic", abbr: "DDP", city: "Ambassa", type: "Government", est: 2010, category: "Engineering" },
    { name: "Khowai District Polytechnic", abbr: "KDP", city: "Khowai", type: "Government", est: 2020, category: "Engineering" },
    { name: "Tripura Government Law College", abbr: "TGLC", city: "Agartala", type: "Government", est: 1986, category: "Law" },
    { name: "Holy Cross College Agartala", abbr: "HCC", city: "Agartala", type: "Private", est: 2009, category: "Arts & Science" },
    { name: "Bhavan's Tripura College of Science and Technology", abbr: "BTCST", city: "Agartala", type: "Private", est: 2003, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";
    let isPolytechnic = col.name.includes("Polytechnic");

    if (isPolytechnic) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering</strong></td><td>3 Years</td><td>\u20B95K — \u20B912K</td><td>10th Pass with Match/Science</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Lateral Entry Diploma</strong></td><td>2 Years</td><td>\u20B95K — \u20B912K</td><td>12th PCM / ITI</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `DEEBT Tripura manages centralized admissions for all government diploma tracks utilizing merit lists and minor aptitude tests.`;
        placementInfo = "High absorption rates by state infrastructural entities, PWD, and emerging regional MSMEs mapping across Agartala industrial corridors.";
    } else if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B960K — \u20B910L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B91L — \u20B915L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `Directorate of Medical Education (DME) Tripura dictates state quota (85%) counseling purely on NEET index rankings.`;
        placementInfo = "Mandatory state bonds govern highly subsidized state placements. High deployment across rural and hilly district healthcare centers (PHC/CHC).";
    } else if (col.category === 'Engineering') {
        let isElite = col.abbr === "NIT Agartala";
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isElite ? '5L' : '1.5L'} — \u20B9${isElite ? '7L' : '4L'}</td><td>10+2 PCM + ${isElite ? 'JEE Main/Adv' : 'TBJEE / JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B93L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isElite ? "JoSAA / CSAB centralized counseling based on JEE ranks integrating North-East quotas." : "Tripura Board of Joint Entrance Examination (TBJEE) drives state engineering seat allocation.";
        placementInfo = isElite ? "NIT Agartala represents the absolute peak of NER placements, fetching robust product MNC intakes." : "Solid state deployment mapping directly to local ONGC pipelines, tech clusters, and central govt schemes.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>\u20B93L — \u20B912L</td><td>10+2 + CLAT/TBJEE/Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1 Year</td><td>\u20B950K — \u20B92L</td><td>LLB Merit / CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr.includes("NLU") ? "CLAT exclusively." : "TBJEE and institutional merit mapping dominate regional placements.";
        placementInfo = "Immense potential for legal frameworks across Tripura High Court alongside corporate roles via NLU networks.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3 Years</td><td>\u20B92K — \u20B915K</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B95K — \u20B930K</td><td>Bachelor's + State Entrance / CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Tripura University (Central) leads the admissions utilizing CUET. The Directorate of Higher Education operates online merit thresholds for government degree colleges.";
        placementInfo = "The dominant trajectory targets Tripura Civil Services (TCS), educational lines, and core banking/administrative sectors.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const typeLabel = isPolytechnic ? 'Government Diploma' : col.type;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages in Agartala/Tripura, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, TBJEE, Tripura Colleges, Agartala Universities, NextCampus">
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
      "url": "https://nextcampus.com/colleges/tripura/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/tripura/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Tripura</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Tripura, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.2</strong>/5
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
                    <p>${col.name} (${col.abbr}) stands as a defining pillar of academic progress within India's North-Eastern Region (NER). Established in ${col.est} and headquartered in ${col.city}, the institution continuously leverages massive central infrastructural pushes alongside TBJEE metrics to elevate local talent towards pan-India relevance.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / TBJEE Metric</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>State Govt. Counselling</h4><p>Robust domiciliary verification via local SDMs heavily supports Tripura residents gaining highly subsidized central and state seats.</p></div></div>
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
                    <p>Average Rating: <strong>4.2 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The government significantly pushes technological and medical infrastructures here. The region is beautiful, and the central funding makes studying exceptionally affordable."</p>
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

    for (const col of trColleges) {
        const collegeSlug = slugify(col.name);

        // Deduplication check
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'tripura', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS base usage
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Creating internal decoupled files
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 7.7;
        if (col.abbr === "NIT Agartala") baseScore = 9.0;
        else if (col.abbr === "NLU Tripura" || col.abbr === "TU") baseScore = 8.5;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Tripura', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.0 ? 80 : 70}, nirf: 0,
      link: '../colleges/tripura/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Tripura Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Tripura Colleges to inject.`);
    }
}

processAll();
