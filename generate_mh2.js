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

const mh2Colleges = [
    // Universities
    { name: "Indian Institute of Education Pune", abbr: "IIE Pune", city: "Pune", type: "Private Aided", est: 1948, category: "Arts & Science" },
    { name: "Tata Institute of Social Sciences", abbr: "TISS", city: "Mumbai", type: "Deemed", est: 1936, category: "Management" },
    { name: "Dr Babasaheb Ambedkar Technological University", abbr: "DBATU", city: "Lonere", type: "State", est: 1989, category: "Engineering" },
    { name: "North Maharashtra University", abbr: "NMU", city: "Jalgaon", type: "State", est: 1990, category: "Multidisciplinary" },
    { name: "Sant Gadge Baba Amravati University", abbr: "SGBAU", city: "Amravati", type: "State", est: 1983, category: "Multidisciplinary" },
    { name: "Yashwantrao Chavan Maharashtra Open University", abbr: "YCMOU", city: "Nashik", type: "State", est: 1989, category: "Multidisciplinary" },

    // Engineering & Technical Colleges
    { name: "Fr. Agnel College of Engineering Navi Mumbai", abbr: "FACEM", city: "Navi Mumbai", type: "Private Aided", est: 1991, category: "Engineering" },
    { name: "Shah and Anchor Kutchhi Engineering College Mumbai", abbr: "SAKEC", city: "Mumbai", type: "Private Aided", est: 1985, category: "Engineering" },
    { name: "Don Bosco Institute of Technology Mumbai", abbr: "DBIT", city: "Mumbai", type: "Private Aided", est: 1999, category: "Engineering" },
    { name: "Thakur College of Engineering and Technology Mumbai", abbr: "TCET", city: "Mumbai", type: "Private", est: 2001, category: "Engineering" },
    { name: "Atharva College of Engineering Mumbai", abbr: "ACE Mumbai", city: "Mumbai", type: "Private", est: 2002, category: "Engineering" },
    { name: "Pillai College of Engineering Navi Mumbai", abbr: "PCE Navi Mumbai", city: "Navi Mumbai", type: "Private", est: 1999, category: "Engineering" },
    { name: "Terna Engineering College Navi Mumbai", abbr: "Terna Engg", city: "Navi Mumbai", type: "Private", est: 2002, category: "Engineering" },
    { name: "Datta Meghe College of Engineering Mumbai", abbr: "DMCE", city: "Mumbai", type: "Private", est: 2000, category: "Engineering" },
    { name: "G H Raisoni College of Engineering Nagpur", abbr: "GHRCE", city: "Nagpur", type: "Private", est: 2000, category: "Engineering" },
    { name: "Yeshwantrao Chavan College of Engineering Nagpur", abbr: "YCCE", city: "Nagpur", type: "Private Aided", est: 1984, category: "Engineering" },

    // Medical Colleges
    { name: "Seth GS Medical College Mumbai", abbr: "GSMC", city: "Mumbai", type: "State", est: 1926, category: "Medical" },
    { name: "Lokmanya Tilak Municipal Medical College Mumbai", abbr: "LTMMC", city: "Mumbai", type: "Municipal", est: 1964, category: "Medical" },
    { name: "KEM Hospital Medical College Mumbai", abbr: "KEM Mumbai", city: "Mumbai", type: "Municipal", est: 1926, category: "Medical" },
    { name: "Government Medical College Aurangabad", abbr: "GMC Aurangabad", city: "Aurangabad", type: "State", est: 1956, category: "Medical" },
    { name: "Government Medical College Miraj", abbr: "GMC Miraj", city: "Miraj", type: "State", est: 1962, category: "Medical" },
    { name: "Dr Vasantrao Pawar Medical College Nashik", abbr: "DVPMC", city: "Nashik", type: "Private", est: 1987, category: "Medical" },

    // Management Colleges
    { name: "Jamnalal Bajaj Institute of Management Studies Mumbai", abbr: "JBIMS", city: "Mumbai", type: "State (Autonomous)", est: 1965, category: "Management" },
    { name: "S P Jain Institute of Management and Research Mumbai", abbr: "SPJIMR", city: "Mumbai", type: "Private", est: 1981, category: "Management" },
    { name: "Welingkar Institute of Management Mumbai", abbr: "WeSchool", city: "Mumbai", type: "Private", est: 1977, category: "Management" },
    { name: "Symbiosis Institute of Business Management Pune", abbr: "SIBM Pune", city: "Pune", type: "Deemed", est: 1978, category: "Management" },
    { name: "National Institute of Bank Management Pune", abbr: "NIBM", city: "Pune", type: "Government", est: 1969, category: "Management" },

    // Arts, Science & Commerce Colleges
    { name: "Jai Hind College Mumbai", abbr: "Jai Hind", city: "Mumbai", type: "Private Aided", est: 1948, category: "Arts & Science" },
    { name: "HR College of Commerce and Economics Mumbai", abbr: "HRCC", city: "Mumbai", type: "Private Aided", est: 1955, category: "Arts & Science" },
    { name: "KC College Mumbai", abbr: "KCC", city: "Mumbai", type: "Private Aided", est: 1954, category: "Arts & Science" },
    { name: "Mithibai College Mumbai", abbr: "Mithibai", city: "Mumbai", type: "Private Aided", est: 1961, category: "Arts & Science" },
    { name: "Sophia College Mumbai", abbr: "Sophia", city: "Mumbai", type: "Private (Women)", est: 1941, category: "Arts & Science" },
    { name: "BMCC College Pune", abbr: "BMCC", city: "Pune", type: "Private Aided", est: 1943, category: "Arts & Science" },
    { name: "Garware College Pune", abbr: "Garware", city: "Pune", type: "Private Aided", est: 1959, category: "Arts & Science" },
    { name: "St Mira's College Pune", abbr: "St Miras", city: "Pune", type: "Private (Women)", est: 1956, category: "Arts & Science" },
    { name: "Modern College of Arts Science and Commerce Pune", abbr: "Modern Pune AS", city: "Pune", type: "Private Aided", est: 1969, category: "Arts & Science" },

    // More Colleges
    { name: "Abasaheb Garware College Pune", abbr: "AGC Pune", city: "Pune", type: "Private Aided", est: 1945, category: "Arts & Science" },
    { name: "Parle Tilak Vidyalaya College Mumbai", abbr: "PTV Mumbai", city: "Mumbai", type: "Private Aided", est: 1943, category: "Arts & Science" },
    { name: "Nagindas Khandwala College Mumbai", abbr: "NKC", city: "Mumbai", type: "Private Aided", est: 1969, category: "Arts & Science" },
    { name: "Kishinchand Chellaram College Mumbai", abbr: "KC College Churchgate", city: "Mumbai", type: "Private Aided", est: 1954, category: "Arts & Science" },
    { name: "Mulund College of Commerce Mumbai", abbr: "MCC Mumbai", city: "Mumbai", type: "Private Aided", est: 1962, category: "Arts & Science" },
    { name: "Sydenham College Mumbai", abbr: "Sydenham", city: "Mumbai", type: "State", est: 1913, category: "Arts & Science" },
    { name: "Podar College Mumbai", abbr: "Podar", city: "Mumbai", type: "Private Aided", est: 1934, category: "Arts & Science" },
    { name: "Hinduja College Mumbai", abbr: "Hinduja", city: "Mumbai", type: "Private Aided", est: 1967, category: "Arts & Science" },
    { name: "Lala Lajpatrai College Mumbai", abbr: "LLC", city: "Mumbai", type: "Private Aided", est: 1964, category: "Arts & Science" },
    { name: "D G Ruparel College Mumbai", abbr: "Ruparel", city: "Mumbai", type: "Private Aided", est: 1961, category: "Arts & Science" },
    { name: "SIES College Mumbai", abbr: "SIES", city: "Navi Mumbai", type: "Private Aided", est: 1971, category: "Arts & Science" },
    { name: "Ramnarain Ruia Autonomous College Mumbai", abbr: "Ruia Autonomous", city: "Mumbai", type: "State (Autonomous)", est: 1937, category: "Arts & Science" },
    { name: "V G Vaze College Mumbai", abbr: "Vaze", city: "Mumbai", type: "Private Aided", est: 1972, category: "Arts & Science" },
    { name: "S K Somaiya College Mumbai", abbr: "SKS", city: "Mumbai", type: "Private Aided", est: 1972, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    const isEliteMgmt = ['JBIMS', 'SPJIMR', 'TISS', 'SIBM Pune', 'NIBM'].includes(col.abbr);
    const isEliteMed = ['GSMC', 'LTMMC', 'KEM Mumbai'].includes(col.abbr);
    const isApexEng = ['GHRCE', 'YCCE', 'FACEM', 'SAKEC'].includes(col.abbr);
    const isMumbaiArts = col.category === 'Arts & Science';

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B91L — \u20B95L/Yr</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MD / MS</strong></td><td>3 Years</td><td>\u20B92L — \u20B910L/Yr</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isEliteMed
            ? 'Seth GS Medical, KEM, and LTMMC represent the municipal/state apex of Maharashtra\'s medical education. Admissions strictly via DMER Maharashtra centralized NEET counseling. These GMCs are functionally linked to the largest public hospital complexes in Asia (KEM, Sion, Nair).'
            : 'Maharashtra DMER conducts state quota NEET counseling, distributing seats across government and private colleges. Municipal corporations (BMC) control KEM/LTMMC through separate BMC counseling rounds.';
        placementInfo = 'Graduates from KEM / Seth GS / LTMMC immediately command positions in BMC hospitals, state health services, and elite private hospitals (Lilavati, Breach Candy, Hinduja) — the highest-density clinical employment market in India.';

    } else if (col.category === 'Management') {
        const entrance = col.abbr === 'JBIMS' ? 'MAH-MBA CET (Maharashtra MBA Common Entrance Test). JBIMS accepts only CET score — not CAT — making it a unique and extraordinarily value-for-money government MBA at ₹2L total fees.'
            : col.abbr === 'SPJIMR' ? 'SPJIMR runs the PGDM program admitting via CAT, XAT, GMAT with a strong emphasis on Social Sensitivity (SS) Assessment.'
                : col.abbr === 'TISS' ? 'TISS-NET (Tata Institute of Social Sciences National Entrance Test) for Social Work, HRM, Development, and Public Policy programs.'
                    : col.abbr === 'NIBM' ? 'NIBM provides specialized banking and finance management programs for working professionals and fresh graduates via PGDM-Banking & Financial Services.'
                        : 'SNAP (Symbiosis National Aptitude Test) for all Symbiosis institutes including SIBM Pune.';
        coursesHtml = `<tr><td><strong>MBA / PGDM / PGDM-HRM</strong></td><td>2 Years</td><td>\u20B9${col.abbr === 'JBIMS' ? '2L' : col.abbr === 'NIBM' ? '10L' : '14L'} — \u20B9${col.abbr === 'JBIMS' ? '3L' : '24L'}</td><td>Graduation + ${col.abbr === 'JBIMS' ? 'MAH-MBA CET' : col.abbr === 'SPJIMR' ? 'CAT/XAT/GMAT' : col.abbr === 'TISS' ? 'TISS-NET' : col.abbr === 'SIBM Pune' ? 'SNAP' : 'GMAT/CAT'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = entrance;
        placementInfo = col.abbr === 'JBIMS' ? 'JBIMS delivers arguably the best ROI MBA in India. Median placement packages consistently exceed ₹22 LPA at a fraction of IIM costs. Dalal Street BFSI placements dominate.'
            : col.abbr === 'SPJIMR' ? 'SPJIMR median packages track strongly above ₹25 LPA. Dominant in consulting (MBB), FMCG (HUL, P&G), and BFSI. Placement record rivals the top IIMs.'
                : col.abbr === 'TISS' ? 'Unique social-sector placements: UN agencies, NGOs, HUL, Deloitte HR. Strong equity-focused career pipelines unlike any business school in India.'
                    : 'Strong Mumbai BFSI and consulting placements. Access to India\'s largest corporate ecosystem anchored in BKC and Lower Parel.';

    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech / BE</strong></td><td>4 Years</td><td>\u20B92.5L — \u20B97L</td><td>10+2 PCM + MHT CET / JEE Main (CAP rounds)</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Tech / ME</strong></td><td>2 Years</td><td>\u20B91L — \u20B93L</td><td>B.Tech + GATE / MAH-M.Tech CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === 'DBATU' ? 'DBATU is an autonomous technical university serving the Konkan region. Affiliated engineering colleges admit via MHT CET centralized counseling (CAP rounds) under the Maharashtra State CET Cell.'
            : 'MHT CET and JEE Main scores are processed by Maharashtra State CET Cell through centralized CAP (Centralized Admission Process) rounds, directly feeding all SPPU/MU-affiliated engineering colleges.';
        placementInfo = 'Mumbai-based engineering colleges benefit from direct proximity to India\'s largest corporate tech ecosystem. Key recruiters: TCS, Accenture, Capgemini, L&T, Mahindra from Powai/Malad/Navi Mumbai IT parks.';

    } else {
        // Arts, Science, Commerce, Multidisciplinary
        coursesHtml = `<tr><td><strong>B.Com / BMS / BAF / BBI</strong></td><td>3 Years</td><td>\u20B93K — \u20B91L</td><td>10+2 Merit via MU/SPPU Portal</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>B.A. / B.Sc</strong></td><td>3 Years</td><td>\u20B93K — \u20B975K</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Com / M.A. / M.Sc</strong></td><td>2 Years</td><td>\u20B910K — \u20B91.5L</td><td>Bachelor\'s + University Entrance / CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'University of Mumbai manages a strictly merit-driven cutoff system for all affiliated Arts, Science, and Commerce colleges. First-year allocations are processed through the MU online portal using HSC (12th Board) percentage. Top colleges like HR College, Mithibai, and Jai Hind regularly see 99%+ commerce cutoffs.';
        placementInfo = 'Mumbai\'s unrivaled commerce and arts colleges supply the backbone of India\'s BFSI workforce. HR College, Sydenham, and JBIMS-feeder colleges like Mithibai and KC power CA/CFA pipelines, equity research, and investment banking analyst pools.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (isEliteMgmt || isEliteMed || ['HRCC', 'Mithibai', 'Sydenham', 'GHRCE'].includes(col.abbr)) ? '4.7' : '4.3';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, fee structure, placement records and campus life in Maharashtra. Verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Maharashtra Colleges, MHT CET 2026, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/maharashtra/${collegeSlug}/${collegeSlug}.html" }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, MH</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Maharashtra, India</p>
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
                    <p>${col.name} (${col.abbr}), established in ${col.est}, is a well-regarded ${col.type.toLowerCase()} institution in ${col.city}, Maharashtra. It is affiliated with ${col.category === 'Engineering' ? 'the University of Mumbai / DBATU / SPPU and operates through the MHT CET CAP admission framework' : col.type === 'State' || col.type.includes('Municipal') ? 'the Maharashtra state higher education framework' : 'the University of Mumbai'}.</p>
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
                <div class="lpu-card">
                    <h2>Academic Programs</h2>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>${coursesHtml}</tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-admission">
                <div class="lpu-card">
                    <h2>Admission Information</h2>
                    <div class="steps-list">
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance Framework</h4><p>${admissionHtml}</p></div></div>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Career &amp; Placements</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>${rating} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The Mumbai-Pune corridor provides unmatched networking density. The alumni base, corporate proximity, and sheer volume of opportunity make Maharashtra an extraordinary place to study regardless of discipline."</p>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
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
    const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');

    for (const col of mh2Colleges) {
        const collegeSlug = slugify(col.name);
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'maharashtra', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        let baseScore = 7.9;
        if (['JBIMS', 'SPJIMR', 'TISS', 'GSMC', 'LTMMC', 'KEM Mumbai'].includes(col.abbr)) baseScore = 9.5;
        else if (['SIBM Pune', 'NIBM', 'WeSchool', 'HRCC', 'Mithibai', 'Sydenham', 'GHRCE'].includes(col.abbr)) baseScore = 8.8;
        else if (['FACEM', 'SAKEC', 'YCCE', 'BMCC', 'Sophia', 'SGBAU', 'NMU'].includes(col.abbr)) baseScore = 8.3;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Maharashtra', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 90 : 80}, nirf: 0,
      link: '../colleges/maharashtra/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.7" : "4.3"}', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const idx = homeContent.indexOf(injectToken);
        if (idx !== -1) {
            const start = idx + injectToken.length;
            homeContent = homeContent.slice(0, start) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(start);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Maharashtra Batch-2 Colleges into home.js!`);
        }
    } else {
        console.log("\n❌ No new Maharashtra Batch-2 Colleges to inject.");
    }
}

processAll();
