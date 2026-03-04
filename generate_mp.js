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

const mpColleges = [
    // Top National Institutes & Universities
    { name: "Indian Institute of Technology Indore", abbr: "IIT Indore", city: "Indore", type: "Government", est: 2009, category: "Engineering" },
    { name: "Maulana Azad National Institute of Technology Bhopal", abbr: "MANIT Bhopal", city: "Bhopal", type: "Government", est: 1960, category: "Engineering" },
    { name: "Indian Institute of Science Education and Research Bhopal", abbr: "IISER Bhopal", city: "Bhopal", type: "Government", est: 2008, category: "Arts & Science" },
    { name: "Atal Bihari Vajpayee Indian Institute of Information Technology and Management Gwalior", abbr: "ABV-IIITM Gwalior", city: "Gwalior", type: "Government", est: 1997, category: "Engineering" },
    { name: "AIIMS Bhopal", abbr: "AIIMS Bhopal", city: "Bhopal", type: "INI", est: 2012, category: "Medical" },
    { name: "National Law Institute University Bhopal", abbr: "NLIU Bhopal", city: "Bhopal", type: "Government", est: 1997, category: "Law" },
    { name: "Indian Institute of Forest Management", abbr: "IIFM", city: "Bhopal", type: "Government", est: 1982, category: "Management" },
    { name: "Devi Ahilya Vishwavidyalaya", abbr: "DAVV", city: "Indore", type: "State", est: 1964, category: "Multidisciplinary" },
    { name: "Jiwaji University", abbr: "JU", city: "Gwalior", type: "State", est: 1964, category: "Multidisciplinary" },
    { name: "Rani Durgavati Vishwavidyalaya", abbr: "RDVV", city: "Jabalpur", type: "State", est: 1956, category: "Multidisciplinary" },

    // Top Government Colleges
    { name: "Mahatma Gandhi Memorial Medical College", abbr: "MGM Indore", city: "Indore", type: "State", est: 1948, category: "Medical" },
    { name: "Gandhi Medical College Bhopal", abbr: "GMC Bhopal", city: "Bhopal", type: "State", est: 1955, category: "Medical" },
    { name: "Netaji Subhash Chandra Bose Medical College", abbr: "NSCBMC", city: "Jabalpur", type: "State", est: 1963, category: "Medical" },
    { name: "Gajra Raja Medical College", abbr: "GRMC", city: "Gwalior", type: "State", est: 1946, category: "Medical" },
    { name: "Shyam Shah Medical College", abbr: "SSMC", city: "Rewa", type: "State", est: 1963, category: "Medical" },
    { name: "Shri Govindram Seksaria Institute of Technology and Science", abbr: "SGSITS", city: "Indore", type: "Private Aided", est: 1952, category: "Engineering" },
    { name: "Samrat Ashok Technological Institute", abbr: "SATI", city: "Vidisha", type: "State", est: 1960, category: "Engineering" },
    { name: "Government Engineering College Ujjain", abbr: "GEC Ujjain", city: "Ujjain", type: "State", est: 1985, category: "Engineering" },
    { name: "Government Engineering College Jabalpur", abbr: "GEC Jabalpur", city: "Jabalpur", type: "State", est: 1947, category: "Engineering" },
    { name: "Government Engineering College Rewa", abbr: "GEC Rewa", city: "Rewa", type: "State", est: 1985, category: "Engineering" },

    // Top Private Universities
    { name: "VIT Bhopal University", abbr: "VIT Bhopal", city: "Bhopal", type: "Private", est: 2017, category: "Engineering" },
    { name: "Amity University Gwalior", abbr: "Amity Gwalior", city: "Gwalior", type: "Private", est: 2014, category: "Multidisciplinary" },
    { name: "Symbiosis University of Applied Sciences", abbr: "SUAS", city: "Indore", type: "Private", est: 2014, category: "Multidisciplinary" },
    { name: "LNCT University Bhopal", abbr: "LNCT", city: "Bhopal", type: "Private", est: 2019, category: "Engineering" },
    { name: "Jagran Lakecity University", abbr: "JLU", city: "Bhopal", type: "Private", est: 2013, category: "Multidisciplinary" },
    { name: "ITM University Gwalior", abbr: "ITM Gwalior", city: "Gwalior", type: "Private", est: 2011, category: "Multidisciplinary" },
    { name: "People's University Bhopal", abbr: "PU Bhopal", city: "Bhopal", type: "Private", est: 2010, category: "Medical" },
    { name: "Oriental University Indore", abbr: "OU Indore", city: "Indore", type: "Private", est: 2011, category: "Multidisciplinary" },
    { name: "Medi-Caps University Indore", abbr: "Medi-Caps", city: "Indore", type: "Private", est: 2016, category: "Engineering" },
    { name: "SAGE University Indore", abbr: "SAGE Indore", city: "Indore", type: "Private", est: 2017, category: "Multidisciplinary" },

    // Other Top Colleges
    { name: "Lakshmi Narain College of Technology Bhopal", abbr: "LNCT Bhopal", city: "Bhopal", type: "Private", est: 1994, category: "Engineering" },
    { name: "IPS Academy Institute of Engineering and Science Indore", abbr: "IPS Academy", city: "Indore", type: "Private", est: 2000, category: "Engineering" },
    { name: "Acropolis Institute of Technology and Research Indore", abbr: "Acropolis", city: "Indore", type: "Private", est: 2004, category: "Engineering" },
    { name: "Oriental Institute of Science and Technology Bhopal", abbr: "OIST", city: "Bhopal", type: "Private", est: 2002, category: "Engineering" },
    { name: "Bansal Institute of Science and Technology Bhopal", abbr: "BIST", city: "Bhopal", type: "Private", est: 2003, category: "Engineering" },
    { name: "Corporate Institute of Science and Technology Bhopal", abbr: "CIST", city: "Bhopal", type: "Private", est: 2006, category: "Engineering" },
    { name: "Truba Institute of Engineering and Information Technology Bhopal", abbr: "Truba", city: "Bhopal", type: "Private", est: 2002, category: "Engineering" },
    { name: "RKDF University Bhopal", abbr: "RKDF", city: "Bhopal", type: "Private", est: 2012, category: "Multidisciplinary" },
    { name: "IES College of Technology Bhopal", abbr: "IES", city: "Bhopal", type: "Private", est: 2001, category: "Engineering" },
    { name: "Sagar Institute of Science and Technology Bhopal", abbr: "SISTec", city: "Bhopal", type: "Private", est: 2003, category: "Engineering" },

    // More Colleges
    { name: "Bhopal School of Social Sciences", abbr: "BSSS", city: "Bhopal", type: "Private Aided", est: 1978, category: "Arts & Science" },
    { name: "Career College Bhopal", abbr: "CCB", city: "Bhopal", type: "Private", est: 1991, category: "Arts & Science" },
    { name: "Prestige Institute of Management and Research Indore", abbr: "PIMR", city: "Indore", type: "Private", est: 1994, category: "Management" },
    { name: "Daly College Indore", abbr: "Daly College", city: "Indore", type: "Private", est: 1870, category: "Arts & Science" },
    { name: "St Aloysius College Jabalpur", abbr: "SAC Jabalpur", city: "Jabalpur", type: "Private Aided", est: 1952, category: "Arts & Science" },
    { name: "Government Holkar Science College Indore", abbr: "Holkar", city: "Indore", type: "State", est: 1891, category: "Arts & Science" },
    { name: "Government Model Science College Jabalpur", abbr: "GMSC Jabalpur", city: "Jabalpur", type: "State", est: 1939, category: "Arts & Science" },
    { name: "Maharani Laxmi Bai Government College Bhopal", abbr: "MLB GC Bhopal", city: "Bhopal", type: "State (Women)", est: 1967, category: "Arts & Science" },
    { name: "Government Autonomous Science College Gwalior", abbr: "GASC Gwalior", city: "Gwalior", type: "State", est: 1945, category: "Arts & Science" },
    { name: "Government Arts and Commerce College Indore", abbr: "GACC Indore", city: "Indore", type: "State", est: 1962, category: "Arts & Science" },
    { name: "Government PG College Satna", abbr: "GPGC Satna", city: "Satna", type: "State", est: 1963, category: "Arts & Science" },
    { name: "Government PG College Sagar", abbr: "GPGC Sagar", city: "Sagar", type: "State", est: 1946, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    const isApexTech = ['IIT Indore', 'MANIT Bhopal', 'IISER Bhopal', 'ABV-IIITM Gwalior'].includes(col.abbr);
    const isApexMed = col.abbr === 'AIIMS Bhopal';
    const isStateMed = ['MGM Indore', 'GMC Bhopal', 'NSCBMC', 'GRMC', 'SSMC'].includes(col.abbr);
    const isStateEng = ['SGSITS', 'SATI', 'GEC Ujjain', 'GEC Jabalpur', 'GEC Rewa'].includes(col.abbr);
    const isLaw = col.category === 'Law';
    const isMgmt = col.category === 'Management';

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (isLaw) {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>\u20B91L — \u20B93L</td><td>10+2 + CLAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>LLM</strong></td><td>2 Years</td><td>\u20B950K — \u20B91.5L</td><td>LLB + CLAT PG / University Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'NLIU Bhopal is a CLAT-participating NLU. Admission strictly governed by CLAT (Common Law Admission Test) scores through the NLU consortium, reserving strong state domicile quotas for Madhya Pradesh candidates.';
        placementInfo = 'Graduates pipeline into premier litigation firms, corporate law departments (in-house counsel), and the Madhya Pradesh High Court ecosystem. Strong MNC legal exposure from Bhopal, Indore, and Delhi-NCR grids.';

    } else if (isMgmt) {
        coursesHtml = `<tr><td><strong>MBA / PGDM / PGP</strong></td><td>2 Years</td><td>\u20B94L — \u20B918L</td><td>Graduation + CAT / MAT / XAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === 'IIFM' ? 'IIFM operates under MHRD/MoEFCC mandate. Admission via CAT/MAT for PGP in FM (Post Graduate Programme in Forest Management) — the only specialized forestry MBA in India.'
            : 'Admission via RGPV-aligned university processes or direct institutional merit-based screening factoring CAT/MAT percentiles.';
        placementInfo = col.abbr === 'IIFM' ? 'Exclusive placement into Forest Department, MoEFCC, NTPC Green, WWF India, and top environmental consulting firms. Median packages among the highest for government-sponsored management institutes.'
            : 'Graduates deploy heavily into regional retail, FMCG, and banking infrastructures across Indore and Bhopal corporate corridors.';

    } else if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B9${isApexMed ? '5.8K' : '1L'} — \u20B9${isApexMed ? '1L/Yr' : '25L/Yr'}</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MD / MS</strong></td><td>3 Years</td><td>\u20B91L — \u20B98L/Yr</td><td>MBBS + NEET PG / INI-CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isApexMed ? 'Operates via centralized MCC pipeline under INI-CET framework. Zero state interference.'
            : 'Madhya Pradesh Medical Counselling conducts state quota allocations for GMCs leveraging NEET UG ranks, with strong 85% state domicile reservation.';
        placementInfo = 'Deep absorption into MP Health Services, ESIC, and tier-1 corporate hospital grids (Bombay Hospital, Choithram, CHL). Solid USMLE/PLAB migration from GMC graduates.';

    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech / BE</strong></td><td>4 Years</td><td>\u20B9${isApexTech ? '8L' : '2.5L'} — \u20B9${isApexTech ? '18L' : '7L'}</td><td>10+2 PCM + ${isApexTech ? 'JEE Main/Adv' : 'JEE Main / RGPV Merit'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91L — \u20B93L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isApexTech ? (col.abbr === 'IIT Indore' ? 'JoSAA counseling leveraging pure JEE Advanced ranks.' :
            col.abbr === 'ABV-IIITM Gwalior' ? 'JoSAA / CSAB JAC counseling utilizing JEE Main ranks.' :
                'JoSAA / CSAB counseling utilizing JEE Main/Advanced algorithmic ranks.')
            : 'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV) governs the entire MP engineering admission grid via centralized DTE MP counseling utilizing JEE Main scores combined with state domicile quotas.';
        placementInfo = isApexTech ? 'Aggressive tier-1 placements into MAANG, core PSUs and deep-tech research roles. IIT Indore and ABV-IIITM are rapidly emerging placement benchmarks in the Central India corridor.'
            : 'Solid tech deployments primarily into IT services (Infosys, TCS, Persistent Systems), core manufacturing (heavy industry around Pithampur/Mandideep), and mass PSU recruitment via GATE.';

    } else { // Arts, Science, Multidisciplinary
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com / BBA</strong></td><td>3 Years</td><td>\u20B93K — \u20B91.5L</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.A. / M.Sc / M.Com / MBA</strong></td><td>2 Years</td><td>\u20B910K — \u20B91.5L</td><td>Bachelor\'s + University Entrance / CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = ['DAVV', 'JU', 'RDVV'].includes(col.abbr)
            ? 'Major state universities conducting their own centralized online admissions via CUET UG/PG complemented by University entrance processes. DAVV is the apex of Indore\'s education pyramid.'
            : 'Admissions via MP state university portals using 10+2 merit normalization for UG and university entrance exams for PG programs under MPHIGHEREDU guidelines.';
        placementInfo = 'Generates massive MPSC (Madhya Pradesh Public Service Commission) feeder pipelines, regional banking cadres, UPSC aspirants, and a growing entrepreneurship matrix anchored to Indore\'s booming industrial economy.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (isApexTech || isApexMed || col.abbr === 'NLIU Bhopal' || col.abbr === 'IIFM') ? '4.8' : '4.3';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, fee structure, placement records and campus life in Madhya Pradesh. Verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Madhya Pradesh Colleges, RGPV 2026, DTE MP, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/madhya-pradesh/${collegeSlug}/${collegeSlug}.html"
    }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, MP</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Madhya Pradesh, India</p>
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
                    <p>${col.name} (${col.abbr}), established in ${col.est}, is one of Madhya Pradesh's leading ${col.type.toLowerCase()} institutions based in ${col.city}. It operates under the governing framework of ${col.category === 'Engineering' && !isApexTech ? 'RGPV (Rajiv Gandhi Proudyogiki Vishwavidyalaya)' : col.type === 'State' ? 'the MP Govt. Higher Education framework' : 'the autonomous/central government structure'}, delivering high-quality education across disciplines.</p>
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
                        <p>"Madhya Pradesh's education system uniquely bridges central India's industrial growth. The Indore-Bhopal corridor is fast emerging as a major tech and startup hub — and institutions here are building pipelines to match."</p>
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

    for (const col of mpColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'madhya-pradesh', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        const isApexTech = ['IIT Indore', 'MANIT Bhopal', 'IISER Bhopal', 'ABV-IIITM Gwalior'].includes(col.abbr);
        let baseScore = 7.9;
        if (isApexTech || col.abbr === 'AIIMS Bhopal' || col.abbr === 'NLIU Bhopal' || col.abbr === 'IIFM') baseScore = 9.8;
        else if (['DAVV', 'JU', 'RDVV', 'SGSITS', 'MGM Indore', 'GMC Bhopal'].includes(col.abbr)) baseScore = 8.8;
        else if (['VIT Bhopal', 'Amity Gwalior', 'JLU', 'PIMR'].includes(col.abbr)) baseScore = 8.3;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Madhya Pradesh', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 90 : 78}, nirf: 0,
      link: '../colleges/madhya-pradesh/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.8" : "4.3"}', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);
        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Madhya Pradesh Colleges into home.js!`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log("\n❌ No new MP Colleges to inject (all deduplicated).");
    }
}

processAll();
