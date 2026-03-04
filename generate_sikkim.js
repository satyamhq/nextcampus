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

const skColleges = [
    // Universities in Sikkim
    { name: "Sikkim University", abbr: "SU", city: "Gangtok", type: "Central", est: 2007, category: "Arts & Science" },
    { name: "Sikkim Manipal University", abbr: "SMU", city: "Gangtok", type: "Private", est: 1995, category: "Multidisciplinary" },
    { name: "SRM University Sikkim", abbr: "SRMS", city: "Gangtok", type: "Private", est: 2013, category: "Multidisciplinary" },
    { name: "Sikkim Professional University", abbr: "SPU", city: "Gangtok", type: "Private", est: 2008, category: "Multidisciplinary" },
    { name: "Sikkim Alpine University", abbr: "SAU", city: "Kamrang", type: "Private", est: 2021, category: "Multidisciplinary" },
    { name: "Medhavi Skills University", abbr: "MSU", city: "Singtam", type: "Private", est: 2021, category: "Multidisciplinary" },
    { name: "Vinayaka Missions Sikkim University", abbr: "VMSU", city: "Gangtok", type: "Private", est: 2008, category: "Multidisciplinary" },

    // Engineering Colleges
    { name: "National Institute of Technology Sikkim", abbr: "NIT Sikkim", city: "Ravangla", type: "Government", est: 2010, category: "Engineering" },
    { name: "Sikkim Manipal Institute of Technology", abbr: "SMIT", city: "Majhitar", type: "Private", est: 1997, category: "Engineering" },
    { name: "SRM Institute of Science and Technology Sikkim", abbr: "SRM Sikkim", city: "Gangtok", type: "Private", est: 2013, category: "Engineering" },

    // Medical & Health Colleges
    { name: "Sikkim Manipal Institute of Medical Sciences", abbr: "SMIMS", city: "Gangtok", type: "Private", est: 1999, category: "Medical" },

    // Major Degree Colleges
    { name: "Sikkim Government College Tadong", abbr: "NBBDC", city: "Tadong", type: "Government", est: 1977, category: "Arts & Science" }, // Renamed to NBBDC below
    { name: "Nar Bahadur Bhandari Government College Tadong", abbr: "NBBDC", city: "Tadong", type: "Government", est: 1977, category: "Arts & Science" },
    { name: "Sikkim Government College Namchi", abbr: "SGCN", city: "Namchi", type: "Government", est: 1995, category: "Arts & Science" },
    { name: "Sikkim Government College Gyalshing", abbr: "SGCG", city: "Gyalshing", type: "Government", est: 2011, category: "Arts & Science" },
    { name: "Sikkim Government College Burtuk", abbr: "SGCB", city: "Burtuk", type: "Government", est: 2012, category: "Arts & Science" },
    { name: "Sikkim Government B.Ed College Soreng", abbr: "SGBCS", city: "Soreng", type: "Government", est: 2015, category: "Arts & Science" },
    { name: "Pakyong Government College", abbr: "PGC", city: "Pakyong", type: "Government", est: 2021, category: "Arts & Science" },
    { name: "Government College Rhenock", abbr: "GCR", city: "Rhenock", type: "Government", est: 2005, category: "Arts & Science" },

    // Polytechnic & Technical Colleges
    { name: "Advanced Technical Training Centre Bardang", abbr: "ATTC", city: "Bardang", type: "Government / ISO", est: 1999, category: "Engineering" },
    { name: "Centre for Computers and Communication Technology Chisopani", abbr: "CCCT", city: "Chisopani", type: "Government", est: 1999, category: "Engineering" },
    { name: "Sikkim Government Polytechnic College", abbr: "SGPC", city: "Gangtok", type: "Government", est: 2020, category: "Engineering" },

    // Other Colleges / Institutes
    { name: "Himalayan Pharmacy Institute Majhitar", abbr: "HPI", city: "Majhitar", type: "Private", est: 1990, category: "Medical" },
    { name: "Government Law College Burtuk", abbr: "GLC", city: "Burtuk", type: "Government", est: 1980, category: "Law" },
    { name: "Sikkim Institute of Science and Technology", abbr: "SIST", city: "Chisopani", type: "Government", est: 2020, category: "Engineering" },
    { name: "Institute of Hotel Management Gangtok", abbr: "IHM", city: "Gangtok", type: "Government", est: 1990, category: "Multidisciplinary" }, // Hospitality
    { name: "Sikkim Institute of Rural Development", abbr: "SIRD", city: "Karfectar", type: "Government", est: 1992, category: "Multidisciplinary" }
];

function generateHtml(col, collegeSlug) {
    let isApex = col.abbr === "NIT Sikkim" || col.abbr === "SMIT";
    let isPolytechnic = col.name.includes("Polytechnic") || col.abbr === "ATTC" || col.abbr === "CCCT";

    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (isPolytechnic) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering / ITI</strong></td><td>3 Years</td><td>\u20B915K — \u20B935K</td><td>10th Pass with Match/Science</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Lateral Entry Diploma</strong></td><td>2 Years</td><td>\u20B915K — \u20B935K</td><td>12th PCM / ITI</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `Directorate of Technical Education (Sikkim) handles polytechnic admissions, largely factoring 10th-grade state merit marks alongside internal tests.`;
        placementInfo = "High focus on state infrastructure projects (PWD/Energy) alongside massive hotel management and hospitality sector scaling across the NER.";
    } else if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS / B.Pharm</strong></td><td>4-5.5 Years</td><td>\u20B92L — \u20B915L/Yr</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B910L — \u20B930L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "SMIMS" ? "Counseling natively integrates state domicile quotas (benefitting Sikkim residents massively) alongside centralized MCC all-India pools mapping strictly to NEET scores." : "Pharmacy mapping utilizes direct state metrics and NEET scores.";
        placementInfo = "Extensive placements into the Sikkim Manipal hospital networks and remote North East frontier healthcare clinics.";
    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isApex ? '5L' : '2.5L'} — \u20B9${isApex ? '16L' : '8L'}</td><td>10+2 PCM + ${col.abbr === "NIT Sikkim" ? 'JEE Main/Adv' : (col.abbr === "SMIT" ? 'SMIT Offline Test / JEE Main' : 'JEE / State Merit')}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech / MCA</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B93L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "NIT Sikkim" ? "JoSAA / CSAB centralized counseling relying strictly on JEE Main utilizing home state quotas." : "Private entities like SMIT conduct native proprietary exams alongside aggressively accepting JEE Main ranks.";
        placementInfo = isApex ? "NIT Sikkim bridges MAANG recruitment into the NER. SMIT carries an immense historical legacy, successfully deploying graduates into massive IT ecosystems across pan-India metros." : "Strong local deployment within power/energy sectors alongside IT absorptions.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB</strong></td><td>5 Years</td><td>\u20B950K — \u20B91.5L</td><td>10+2 Merit / State Test</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLB</strong></td><td>3 Years</td><td>\u20B940K — \u20B91L</td><td>Bachelor's Degree</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "State-level merit lists define the cutoff bands for GLC Burtuk, feeding directly into the High Court of Sikkim.";
        placementInfo = "A majority of graduates funnel into state judicial services, public prosecution, and private litigation throughout the Himalayan corridor.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3 Years</td><td>\u20B95K — \u20B91L</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com (Tourism)</strong></td><td>2 Years</td><td>\u20B910K — \u20B91.5L</td><td>Bachelor's + State Entrance / CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "SU" ? "Sikkim University relies heavily on the CUET matrix." : "Government degree colleges heavily filter based on class 12 merits, deploying distinct quota parameters for local linguistic and tribal demographics.";
        placementInfo = "Massive focus on ecotourism, hospitality management (IHM), state civil services, and regional banking.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const typeLabel = isPolytechnic ? 'Government Diploma' : col.type;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages in Gangtok/Sikkim, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Sikkim University admission, Sikkim Colleges, Gangtok Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/sikkim/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/sikkim/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Sikkim</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Sikkim, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>${isApex ? '4.6' : '4.1'}</strong>/5
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
                    <p>${col.name} (${col.abbr}) dominates the Himalayan educational corridor mapping directly out of ${col.city}. Established in ${col.est}, it represents severe infrastructural and academic scaling intended to retain massive talent within the pristine borders of Sikkim while commanding National-level placement frameworks.</p>
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
                    <p>Average Rating: <strong>${isApex ? '4.6' : '4.1'} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Studying nestled deep within the snow-capped ranges is unmatched. The peaceful environment allows hyper-focus, and major networks are beginning to aggressively target the campuses here for fresh tech talent."</p>
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

    for (const col of skColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'sikkim', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS 
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 7.7;
        if (col.abbr === "NIT Sikkim") baseScore = 9.1;
        else if (col.abbr === "SMIT" || col.abbr === "SMU" || col.abbr === "SU") baseScore = 8.8;
        else if (col.abbr === "SMIMS") baseScore = 8.5;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Sikkim', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.0 ? 88 : 75}, nirf: 0,
      link: '../colleges/sikkim/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.6" : "4.1"}', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Sikkim Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Sikkim Colleges to inject (already deduplicated).`);
    }
}

processAll();
