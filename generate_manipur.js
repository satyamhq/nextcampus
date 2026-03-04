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

const mnColleges = [
    // National Institutes & Universities
    { name: "Manipur University", abbr: "MU", city: "Imphal", type: "Central", est: 1980, category: "Multidisciplinary" },
    { name: "National Institute of Technology Manipur", abbr: "NIT Manipur", city: "Imphal", type: "Government", est: 2010, category: "Engineering" },
    { name: "Indian Institute of Information Technology Manipur", abbr: "IIIT Manipur", city: "Imphal", type: "Government", est: 2015, category: "Engineering" },
    { name: "National Sports University", abbr: "NSU", city: "Imphal", type: "Central", est: 2018, category: "Arts & Science" },
    { name: "Central Agricultural University", abbr: "CAU", city: "Imphal", type: "Central", est: 1993, category: "Arts & Science" },

    // Top Government Colleges (Medical & Technical)
    { name: "Regional Institute of Medical Sciences", abbr: "RIMS", city: "Imphal", type: "Government", est: 1972, category: "Medical" },
    { name: "Jawaharlal Nehru Institute of Medical Sciences", abbr: "JNIMS", city: "Imphal", type: "State", est: 2009, category: "Medical" },
    { name: "Manipur Institute of Technology", abbr: "MIT Manipur", city: "Imphal", type: "State", est: 1976, category: "Engineering" },
    { name: "Dhanamanjuri University", abbr: "DMU", city: "Imphal", type: "State", est: 2018, category: "Multidisciplinary" },

    // Top Arts & Science Colleges
    { name: "Dhanamanjuri College of Arts", abbr: "DM Arts", city: "Imphal", type: "State", est: 1946, category: "Arts & Science" },
    { name: "Dhanamanjuri College of Science", abbr: "DM Science", city: "Imphal", type: "State", est: 1946, category: "Arts & Science" },
    { name: "Dhanamanjuri College of Commerce", abbr: "DM Commerce", city: "Imphal", type: "State", est: 1946, category: "Arts & Science" },
    { name: "Imphal College", abbr: "ImphalC", city: "Imphal", type: "State", est: 1963, category: "Arts & Science" },
    { name: "Oriental College Imphal", abbr: "OC Imphal", city: "Imphal", type: "Private Aided", est: 1968, category: "Arts & Science" },
    { name: "Moreh College", abbr: "Moreh C", city: "Moreh", type: "State", est: 1992, category: "Arts & Science" },
    { name: "Churachandpur College", abbr: "CCP College", city: "Churachandpur", type: "State", est: 1975, category: "Arts & Science" },
    { name: "United College Lambung", abbr: "UCL", city: "Imphal", type: "Private Aided", est: 1987, category: "Arts & Science" },

    // Other Major Colleges
    { name: "Pettigrew College Ukhrul", abbr: "Pettigrew", city: "Ukhrul", type: "Private Aided", est: 1952, category: "Arts & Science" },
    { name: "Presidency College Motbung", abbr: "Presidency Motbung", city: "Motbung", type: "Private Aided", est: 1967, category: "Arts & Science" },
    { name: "Tamenglong College", abbr: "Tamenglong C", city: "Tamenglong", type: "State", est: 1988, category: "Arts & Science" },
    { name: "Kha Manipur College Kakching", abbr: "KMC Kakching", city: "Kakching", type: "State", est: 1970, category: "Arts & Science" },
    { name: "Standard College Kongba", abbr: "Standard Kongba", city: "Imphal", type: "Private Aided", est: 1979, category: "Arts & Science" },
    { name: "Liberal College Luwangsangbam", abbr: "Liberal C", city: "Imphal", type: "Private Aided", est: 1975, category: "Arts & Science" },
    { name: "Hill College Tadubi", abbr: "Hill College", city: "Senapati", type: "State", est: 1990, category: "Arts & Science" },
    { name: "S Kula Women's College", abbr: "SKW", city: "Imphal", type: "State (Women)", est: 1976, category: "Arts & Science" },
    { name: "Manipur College", abbr: "Manipur College", city: "Imphal", type: "Private Aided", est: 1946, category: "Arts & Science" },
    { name: "Ideal Girls College Akampat", abbr: "IGC Akampat", city: "Imphal", type: "Private (Women)", est: 1983, category: "Arts & Science" },

    // More Colleges
    { name: "Waikhom Mani Girls College", abbr: "WMGC", city: "Thoubal", type: "Private (Women)", est: 1985, category: "Arts & Science" },
    { name: "Heirok Higher Secondary College", abbr: "HHSC", city: "Thoubal", type: "State", est: 2000, category: "Arts & Science" },
    { name: "Modern College Imphal", abbr: "Modern Imphal", city: "Imphal", type: "Private Aided", est: 1972, category: "Arts & Science" },
    { name: "Manipur Institute of Management Studies", abbr: "MIMS", city: "Imphal", type: "Private", est: 2002, category: "Management" },
    { name: "Sangeet Natak Academy Imphal", abbr: "SNA Imphal", city: "Imphal", type: "Government", est: 1954, category: "Arts & Science" },
    { name: "Government Polytechnic Imphal", abbr: "GPI", city: "Imphal", type: "State", est: 1966, category: "Engineering" },
    { name: "Government Polytechnic Chandel", abbr: "GPC Chandel", city: "Chandel", type: "State", est: 2009, category: "Engineering" },
    { name: "Government Polytechnic Senapati", abbr: "GPS Senapati", city: "Senapati", type: "State", est: 2009, category: "Engineering" },
    { name: "Government Polytechnic Ukhrul", abbr: "GPU Ukhrul", city: "Ukhrul", type: "State", est: 2009, category: "Engineering" },
    { name: "Government Polytechnic Tamenglong", abbr: "GPT", city: "Tamenglong", type: "State", est: 2009, category: "Engineering" }
];

function generateHtml(col, collegeSlug) {
    const isApexTech = ['NIT Manipur', 'IIIT Manipur'].includes(col.abbr);
    const isMed = col.category === 'Medical';
    const isRIMS = col.abbr === 'RIMS';
    const isPoly = col.name.includes('Polytechnic');
    const isNSU = col.abbr === 'NSU';
    const isCAU = col.abbr === 'CAU';
    const isMgmt = col.category === 'Management';

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (isMed) {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B91L — \u20B95L/Yr</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MD / MS</strong></td><td>3 Years</td><td>\u20B91L — \u20B98L/Yr</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isRIMS
            ? 'RIMS Imphal is an autonomous institution under the MoH&FW, Government of India. MBBS admissions are via MCC (Medical Counselling Committee) centralized counseling using NEET UG scores, with a substantial All India Quota allocation making it accessible to outside-state candidates.'
            : 'JNIMS admits via state quota NEET counseling managed by the Manipur Medical Counselling Committee, reserving seats for Manipur state domicile candidates.';
        placementInfo = 'RIMS and JNIMS graduates primarily serve in the Manipur Health Services, BSF/CRPF medical wings deployed across the Northeast, and a growing network of private clinics and nursing homes in Imphal.';

    } else if (isApexTech) {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B91.5L — \u20B95L</td><td>10+2 PCM + JEE Main (JoSAA/CSAB)</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B950K — \u20B91.5L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === 'NIT Manipur'
            ? 'JoSAA / CSAB counseling via JEE Main ranks. NIT Manipur maintains a dedicated HS (Home State) quota for Manipur domicile candidates, alongside significant NE regional quota seats via CSAB Special Rounds.'
            : 'JoSAA / CSAB (Special Rounds) counseling via JEE Main scores. IIIT Manipur operates under the PPP model and offers a strong NE regional quota under CSAB.';
        placementInfo = 'NIT Manipur graduates are increasingly placed in Bengaluru/Hyderabad IT service corridors. PSU recruitment via GATE remains the most significant pathway. The college is showing year-on-year improvement in placement metrics.';

    } else if (isPoly) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering</strong></td><td>3 Years</td><td>\u20B95K — \u20B920K</td><td>10th Pass Merit (HSLC) via DTE Manipur</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'DTE (Directorate of Technical Education) Manipur manages centralized polytechnic admissions via HSLC (10th Board) merit rankings. All polytechnics are affiliated with the Board of Technical Education Manipur (BTEM) and follow AICTE guidelines.';
        placementInfo = 'Diploma holders feed into state PWD, PHED, Irrigation departments, and the growing construction sector serving Manipur\'s infrastructure development under the Central Government\'s NE development grants.';

    } else if (isNSU) {
        coursesHtml = `<tr><td><strong>BSc Sports Science / BA Sports Management</strong></td><td>3-4 Years</td><td>\u20B940K — \u20B91.5L</td><td>10+2 + NSU Entrance / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MSc Sports / MPEd</strong></td><td>2 Years</td><td>\u20B950K — \u20B91.5L</td><td>Bachelor\'s + CUET PG / NSU Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'National Sports University is India\'s first and only national-level sports university. Admissions are via CUET UG/PG (NTA) for undergraduate and postgraduate programs. It offers unparalleled sports infrastructure and academic programs integrating sports science, management, and coaching.';
        placementInfo = 'NSU graduates pipeline into SAI (Sports Authority of India), BCCI, state sports academies, Olympic coaching programs, and international sports management organizations. Manipur\'s extraordinary sporting tradition (boxing, weightlifting, football) makes this a nationally significant institution.';

    } else if (isCAU) {
        coursesHtml = `<tr><td><strong>BSc Agriculture / Horticulture / Fisheries</strong></td><td>4 Years</td><td>\u20B930K — \u20B9 75K</td><td>10+2 PCB/PCM + ICAR AIEEA / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MSc Agriculture / MBA Agri</strong></td><td>2 Years</td><td>\u20B940K — \u20B91L</td><td>B.Sc + ICAR AIEEA PG / CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Central Agricultural University (CAU) Imphal is a Central University serving the NE hill states. Admissions predominantly via ICAR-AIEEA (All India Entrance Examination for Admission) supplemented by CUET UG for applicable programs.';
        placementInfo = 'CAU graduates deploy into the Agricultural Research Service, state agriculture departments across NE, NABARD, regional rural banks, and the rapidly growing organic agriculture and horticulture export sector of the Northeast.';

    } else if (isMgmt) {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B940K — \u20B91.5L</td><td>Graduation + CAT / MAT / State Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Manipur Institute of Management Studies (MIMS) is the primary private management institution in the state, managing admissions via CAT/MAT scores and institutional merit screening.';
        placementInfo = 'MIMS graduates primarily enter regional banking (SBI, Manipur Rural Bank, UCO), the growing retail and telecom sector in Imphal, and government administration roles via MPSC.';

    } else if (col.abbr === 'MIT Manipur') {
        coursesHtml = `<tr><td><strong>B.Tech / BE</strong></td><td>4 Years</td><td>\u20B91L — \u20B93.5L</td><td>10+2 PCM + MANIPUR JEE / JEE Main</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'MIT Manipur (the state government engineering college) admits via DTE Manipur centralized counseling using Manipur JEE and JEE Main scores. Affiliated with Manipur Technical University (MTU).';
        placementInfo = 'MIT Manipur graduates fuel the state\'s PWD, PHED, Power Department, state PSUs, and a growing segment of IT service sector recruits placed at NE-based BPOs and IT companies.';

    } else {
        // Arts & Science / Multidisciplinary colleges
        const isCentral = ['MU', 'DMU'].includes(col.abbr);
        coursesHtml = `<tr><td><strong>BA / BSc / BCom</strong></td><td>3 Years</td><td>\u20B92K — \u20B920K</td><td>HSSLC (Class 12) Merit via Manipur University Portal</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MA / MSc / MCom</strong></td><td>2 Years</td><td>\u20B95K — \u20B930K</td><td>Bachelor\'s + CUET PG / MU Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isCentral
            ? `${col.name} is the apex ${col.type === 'Central' ? 'Central' : 'State'} University of Manipur, affiliating government and private colleges across the state. Admissions via CUET UG/PG (NTA) for teaching departments and HSSLC merit for affiliated colleges.`
            : 'All Manipur government and aided arts & science colleges admit via HSSLC (Class 12, Manipur Board / CBSE) merit through the Manipur University centralized admission portal. ST/SC reservations are significant given Manipur\'s tribal demographic composition.';
        placementInfo = 'Graduates from Manipur\'s arts & science colleges primarily enter the Manipur Civil Services (MPSC), teaching cadre (SSA), banking (SBI/UCO regional offices), and BSF/CRPF/Army administrative roles. Manipur\'s unique cultural and sporting legacy creates strong opportunities in national arts academies and sports administration.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (['NIT Manipur', 'RIMS', 'MU', 'NSU', 'CAU'].includes(col.abbr)) ? '4.6' : '4.1';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, fee structure and campus life in Manipur. Verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Manipur Colleges, Manipur University, DTE Manipur, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/manipur/${collegeSlug}/${collegeSlug}.html" }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, MN</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Manipur, India</p>
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
                    <p>${col.name} (${col.abbr}), established in ${col.est}, is one of Manipur's key ${col.type.toLowerCase()} institutions based in ${col.city}. ${isNSU ? 'As India\'s only National Sports University, it is a landmark institution for sports education and research in Asia.' : isApexTech ? 'As a national institution under MoE, it anchors Northeast Manipur\'s engineering and technology pipeline.' : isMed ? 'It plays a foundational role in healthcare education and clinical training across Manipur and the broader Northeast region.' : 'It serves the higher education needs of students from across Manipur, affiliated with Manipur University.'}</p>
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
                        <p>"Manipur punches far above its weight in sports and arts. The National Sports University and vibrant college ecosystem are transforming the state into a genuine NE education hub alongside Guwahati."</p>
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

    for (const col of mnColleges) {
        const collegeSlug = slugify(col.name);
        if (false) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'manipur', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        let baseScore = 7.6;
        if (['NIT Manipur', 'RIMS', 'MU', 'NSU'].includes(col.abbr)) baseScore = 9.1;
        else if (['IIIT Manipur', 'CAU', 'JNIMS', 'MIT Manipur', 'DMU'].includes(col.abbr)) baseScore = 8.5;
        else if (['DM Arts', 'DM Science', 'Pettigrew', 'Manipur College'].includes(col.abbr)) baseScore = 8.0;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Manipur', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 82 : 68}, nirf: 0,
      link: '../colleges/manipur/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.6" : "4.1"}', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Manipur Colleges into home.js!`);
        }
    } else {
        console.log("\n❌ No new Manipur Colleges to inject.");
    }
}

processAll();
