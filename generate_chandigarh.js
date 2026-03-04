const fs = require('fs');
const path = require('path');
const { getTabsHtml, getJsContent, getFullCss } = require('./gen_utils.js');

const basePath = path.join(__dirname, 'frontend', 'colleges');
const homeJsPath = path.join(__dirname, 'frontend', 'home', 'home.js');

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

const chColleges = [
    // National / Apex Institutions
    { name: "Panjab University", abbr: "PU", city: "Chandigarh", type: "Central", est: 1947, category: "Multidisciplinary" },
    { name: "Postgraduate Institute of Medical Education and Research", abbr: "PGIMER", city: "Chandigarh", type: "INI", est: 1962, category: "Medical" },
    { name: "Punjab Engineering College", abbr: "PEC", city: "Chandigarh", type: "Deemed", est: 1921, category: "Engineering" },
    { name: "Government Medical College and Hospital Chandigarh", abbr: "GMCH Chandigarh", city: "Chandigarh", type: "State", est: 1997, category: "Medical" },
    { name: "Dr BR Ambedkar Institute of Medical Education and Research", abbr: "DRBRAIMEF", city: "Chandigarh", type: "State", est: 1980, category: "Medical" },
    { name: "University Institute of Engineering and Technology", abbr: "UIET PU", city: "Chandigarh", type: "Central (Autonomous)", est: 1999, category: "Engineering" },
    { name: "University Institute of Legal Studies", abbr: "UILS PU", city: "Chandigarh", type: "Central (Autonomous)", est: 1996, category: "Law" },

    // Top Private / Autonomous Colleges
    { name: "Goswami Ganesh Dutta Sanatan Dharma College", abbr: "GGD SD", city: "Chandigarh", type: "Private Aided", est: 1946, category: "Arts & Science" },
    { name: "DAV College Chandigarh", abbr: "DAV Chandigarh", city: "Chandigarh", type: "Private Aided", est: 1958, category: "Arts & Science" },
    { name: "MCM DAV College for Women", abbr: "MCM DAV", city: "Chandigarh", type: "Private Aided (Women)", est: 1967, category: "Arts & Science" },
    { name: "DAV College for Girls Chandigarh", abbr: "DAV Girls", city: "Chandigarh", type: "Private Aided (Women)", est: 1957, category: "Arts & Science" },
    { name: "Mehr Chand Mahajan DAV College", abbr: "MCM DAV Sec 36", city: "Chandigarh", type: "Private Aided", est: 1949, category: "Arts & Science" },
    { name: "Sri Guru Gobind Singh College Chandigarh", abbr: "SGGS", city: "Chandigarh", type: "Private Aided", est: 1967, category: "Arts & Science" },

    // Government Colleges
    { name: "Government College for Girls Chandigarh", abbr: "GCG Chandigarh", city: "Chandigarh", type: "State (Women)", est: 1953, category: "Arts & Science" },
    { name: "Government College of Commerce and Business Administration Chandigarh", abbr: "GCCBA", city: "Chandigarh", type: "State", est: 1966, category: "Arts & Science" },
    { name: "Government Home Science College Chandigarh", abbr: "GHSC", city: "Chandigarh", type: "State (Women)", est: 1959, category: "Arts & Science" },
    { name: "Post Graduate Government College Sector 11", abbr: "PGGC-11", city: "Chandigarh", type: "State", est: 1952, category: "Arts & Science" },
    { name: "Post Graduate Government College Sector 46", abbr: "PGGC-46", city: "Chandigarh", type: "State", est: 1970, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    const isPGIMER = col.abbr === 'PGIMER';
    const isPEC = col.abbr === 'PEC';
    const isPU = col.abbr === 'PU';
    const isLaw = col.category === 'Law';
    const isEng = col.category === 'Engineering';
    const isMed = col.category === 'Medical';

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (isPGIMER) {
        coursesHtml = `<tr><td><strong>MD / MS / MCh / DM</strong></td><td>3-5 Years</td><td>\u20B91K — \u20B910K/Yr</td><td>MBBS + INI-CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>BSc Nursing / Para-medical</strong></td><td>3-4 Years</td><td>\u20B920K — \u20B970K</td><td>10+2 PCB + State Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'PGIMER is an Institute of National Importance (INI) and conducts PG medical admissions exclusively via INI-CET — the most competitive post-graduate medical entrance in India. It does not participate in MCC NEET PG counseling. MBBS is not offered; all seats are PG/super-specialty only.';
        placementInfo = 'PGIMER has no commercial "placement" — instead, its graduates are among the most sought-after super-specialists nationally and globally. Alumni have led departments at AIIMS Delhi, major private hospitals (Medanta, Fortis, Max) and hold faculty positions at world-ranked medical schools.';

    } else if (isMed) {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B91L — \u20B910L/Yr</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MD / MS</strong></td><td>3 Years</td><td>\u20B91L — \u20B98L/Yr</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Chandigarh UT medical college seats are allocated via MCC (Medical Counselling Committee) for AIQ (All India Quota) and PGIMS Rohtak counseling for state/UT quota seats. Chandigarh UT is a shared territory — both Punjab and Haryana state quota candidates may access seats.';
        placementInfo = 'Graduates feed into Post-Graduate Hospital network, PGIMER, ESIC, and a dense network of private hospitals across the Tricity (Chandigarh-Mohali-Panchkula) corridor.';

    } else if (isEng) {
        const entrance = isPEC ? 'JoSAA counseling via JEE Main (PEC is a Deemed University — seats are allocated via JoSAA with additional institutional merit round)' : 'Panjab University centralized counseling via JEE Main / PU CET (Engineering) scores';
        coursesHtml = `<tr><td><strong>B.Tech / BE</strong></td><td>4 Years</td><td>\u20B91.5L — \u20B96L</td><td>10+2 PCM + ${entrance}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Tech / ME</strong></td><td>2 Years</td><td>\u20B950K — \u20B92L</td><td>B.Tech + GATE / PU OCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isPEC ? 'PEC University of Technology (Punjab Engineering College) is a Deemed-to-be University directly under MoE. B.Tech admissions are via JoSAA centralized counseling leveraging JEE Main scores with a dedicated UT Chandigarh domicile quota.'
            : 'UIET operates as an autonomous institute under Panjab University. Admissions are via PU CET (Engineering) combined with JEE Main scores through Panjab University\'s centralized admission portal.';
        placementInfo = isPEC ? 'PEC delivers one of the highest placement rates among NW India engineering colleges. Key recruiters: Infosys, Wipro, Capgemini, DRDO, BHEL, Indian Air Force (tech roles), and a growing Tricity startup ecosystem.'
            : 'UIET graduates feed into Mohali Phase-8/9 IT parks (STPI), Chandigarh IT Park, and DRDO/CSIR research labs operating within 30 km of campus.';

    } else if (isLaw) {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>\u20B950K — \u20B91.5L</td><td>10+2 + CLAT / PU Law CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>LLM</strong></td><td>2 Years</td><td>\u20B940K — \u20B91L</td><td>LLB + PU OCET / CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'UILS (University Institute of Legal Studies) operates under Panjab University and is one of the oldest and most respected law schools in Northwest India. Admissions via PU Law CET for LL.B and CLAT PG for LLM programs.';
        placementInfo = 'UILS graduates have a strong footprint in Punjab & Haryana High Court, Supreme Court of India, and prestigious law firms across New Delhi (Cyril Amarchand, AZB & Partners). Judiciary exam success rates are among the highest nationally.';

    } else if (isPU) {
        coursesHtml = `<tr><td><strong>BA / BSc / BCom / BCA</strong></td><td>3 Years</td><td>\u20B93K — \u20B960K</td><td>10+2 Merit / CUET UG / PU CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MA / MSc / MCom / MBA</strong></td><td>2 Years</td><td>\u20B910K — \u20B91.5L</td><td>Bachelor\'s + CUET PG / PU OCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>LLB / LLM</strong></td><td>3-5 Years</td><td>\u20B950K — \u20B91.5L</td><td>Graduate + PU Law CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Panjab University, established in 1947, is a Central University affiliating over 190 colleges across Punjab and Chandigarh. Admissions to PU teaching departments are via CUET UG/PG (NTA) supplemented by PU\'s own CET/OCET for specific programs.';
        placementInfo = 'PU\'s placement cell manages diverse sector deployments from IT/Software (Infosys BPO, HCL) to Banking (SBI/PNB Officer scale) and Government services (UPSC/PPSC). The University has produced notable alumni in judiciary, administrative services, and academia globally.';

    } else {
        // Arts, Science, Commerce government/private colleges
        coursesHtml = `<tr><td><strong>BA / BSc / BCom / BCA / BBA</strong></td><td>3 Years</td><td>\u20B92K — \u20B960K</td><td>10+2 Merit via PU Portal</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MA / MSc / MCom</strong></td><td>2 Years</td><td>\u20B98K — \u20B91L</td><td>Bachelor\'s + PU OCET / Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'All Chandigarh government and affiliated colleges admit via the Panjab University centralized portal using Class 12 merit. CUET UG scores are also accepted for applicable programs under the National Education Policy framework. Cut-offs for top colleges like GGD SD and MCM DAV regularly exceed 95% for sought-after programs.';
        placementInfo = 'Chandigarh\'s affinity for civil services and banking is unmatched in North India. These colleges supply thousands of UPSC/PPSC/SSC/Banking aspirants annually while also feeding the Tricity IT corridor (Mohali Phase 8, IT Park Chandigarh). Strong alumni networks in Punjab Police, Education, and Administrative services.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (isPGIMER || isPEC || isPU) ? '4.9' : col.est < 1960 ? '4.6' : '4.3';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, fee structure and placements in Chandigarh. Verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Chandigarh Colleges, Panjab University, PU CET 2026, NextCampus">
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
    { "@context": "https://schema.org", "@type": "EducationalOrganization",
      "name": "${col.name}", "alternateName": "${col.abbr}",
      "url": "https://nextcampus.com/colleges/chandigarh/${collegeSlug}/${collegeSlug}.html" }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, UT</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Chandigarh (UT), India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>${rating}</strong>/5
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
            <section class="lpu-panel active" id="panel-overview">
                <div class="lpu-card">
                    <h2>About ${col.name}</h2>
                    <p>${col.name} (${col.abbr}), established in ${col.est}, is one of Chandigarh's premier ${col.type.toLowerCase()} institutions. ${isPGIMER ? 'As an Institute of National Importance, PGIMER is India\'s foremost postgraduate medical institution and a global centre for clinical training and research.' : isPU ? 'As a Central University affiliating over 190 colleges, Panjab University is the academic backbone of the Tricity region.' : isPEC ? 'PEC (Punjab Engineering College) is a Deemed University with a century-long legacy of technical excellence serving the Northwest Indian engineering ecosystem.' : 'It is affiliated with Panjab University and is a key institution serving the higher education needs of the Chandigarh Tricity region.'}</p>
                </div>
                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128218; Top Courses &amp; Eligibility</h3>
                        <button class="btn-view-tab" data-target="courses">View All &#8594;</button>
                    </div>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>${coursesHtml}</tbody>
                        </table>
                    </div>
                </div>
                <div class="lpu-card">
                    <h3>Admissions Route</h3>
                    <p>${admissionHtml}</p>
                    <button class="btn-view-tab" data-target="admission" style="margin-top:10px;">View Admission Process &#8594;</button>
                </div>
            </section>
            <section class="lpu-panel" id="panel-courses">
                <div class="lpu-card"><h2>Academic Programs</h2>
                    <div class="table-scroll"><table class="lpu-table">
                        <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                        <tbody>${coursesHtml}</tbody>
                    </table></div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-admission">
                <div class="lpu-card"><h2>Admission Information</h2>
                    <div class="steps-list">
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance Framework</h4><p>${admissionHtml}</p></div></div>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card"><h2>Career &amp; Placements</h2><p>${placementInfo}</p></div>
            </section>
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card"><h2>Student Reviews</h2>
                    <p>Average Rating: <strong>${rating} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Chandigarh's planned city gives it an academic density unlike most Union Territories. The Panjab University ecosystem, PGIMER, PEC, and a rich college cluster make it one of India's most vibrant education hubs per square kilometre."</p>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card"><h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Library &amp; Labs</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostel &amp; Campus</span></div>
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
    const lpuCssBase = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');

    for (const col of chColleges) {
        const collegeSlug = slugify(col.name);
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'chandigarh', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        let baseScore = 8.1;
        if (['PGIMER', 'PU', 'PEC'].includes(col.abbr)) baseScore = 9.8;
        else if (['UIET PU', 'UILS PU', 'GMCH Chandigarh', 'GGD SD', 'PGGC-11'].includes(col.abbr)) baseScore = 8.8;
        else if (col.est < 1960) baseScore = 8.5;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Chandigarh', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 90 : 78}, nirf: 0,
      link: '../colleges/chandigarh/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.9" : "4.3"}', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    if (newCards.length > 0) {
        const token = "const colleges = [";
        const idx = homeContent.indexOf(token);
        if (idx !== -1) {
            const start = idx + token.length;
            homeContent = homeContent.slice(0, start) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(start);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Chandigarh Colleges into home.js!`);
        }
    } else {
        console.log("\n❌ No new Chandigarh Colleges to inject.");
    }
}

processAll();
