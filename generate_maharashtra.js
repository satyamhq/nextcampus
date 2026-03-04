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

const mhColleges = [
    // National Institutes & Universities
    { name: "Indian Institute of Technology Bombay", abbr: "IIT Bombay", city: "Mumbai", type: "Government", est: 1958, category: "Engineering" },
    { name: "Indian Institute of Technology Nagpur", abbr: "IIT Nagpur", city: "Nagpur", type: "Government", est: 2022, category: "Engineering" }, // VNIT upgraded
    { name: "National Institute of Technology Nagpur", abbr: "VNIT Nagpur", city: "Nagpur", type: "Government", est: 1960, category: "Engineering" },
    { name: "Indian Institute of Management Nagpur", abbr: "IIM Nagpur", city: "Nagpur", type: "Government", est: 2015, category: "Management" },
    { name: "Tata Institute of Fundamental Research", abbr: "TIFR", city: "Mumbai", type: "Government", est: 1945, category: "Arts & Science" },
    { name: "Institute of Chemical Technology Mumbai", abbr: "ICT Mumbai", city: "Mumbai", type: "Deemed", est: 1933, category: "Engineering" },
    { name: "Savitribai Phule Pune University", abbr: "SPPU", city: "Pune", type: "State", est: 1948, category: "Multidisciplinary" },
    { name: "University of Mumbai", abbr: "MU", city: "Mumbai", type: "State", est: 1857, category: "Multidisciplinary" },
    { name: "Nagpur University", abbr: "RTM Nagpur", city: "Nagpur", type: "State", est: 1923, category: "Multidisciplinary" },
    { name: "Shivaji University Kolhapur", abbr: "SUK", city: "Kolhapur", type: "State", est: 1962, category: "Multidisciplinary" },

    // Top Government Colleges
    { name: "Grant Medical College Mumbai", abbr: "GMC Mumbai", city: "Mumbai", type: "State", est: 1845, category: "Medical" },
    { name: "BJ Medical College Pune", abbr: "BJMC Pune", city: "Pune", type: "State", est: 1946, category: "Medical" },
    { name: "Government Medical College Nagpur", abbr: "GMC Nagpur", city: "Nagpur", type: "State", est: 1947, category: "Medical" },
    { name: "College of Engineering Pune", abbr: "COEP", city: "Pune", type: "State (Autonomous)", est: 1854, category: "Engineering" },
    { name: "Veermata Jijabai Technological Institute", abbr: "VJTI", city: "Mumbai", type: "State", est: 1887, category: "Engineering" },
    { name: "Walchand College of Engineering Sangli", abbr: "WCE Sangli", city: "Sangli", type: "State (Autonomous)", est: 1947, category: "Engineering" },
    { name: "Government College of Engineering Aurangabad", abbr: "GCEA", city: "Aurangabad", type: "State", est: 1960, category: "Engineering" },
    { name: "Government College of Engineering Amravati", abbr: "GCOEA", city: "Amravati", type: "State", est: 1964, category: "Engineering" },
    { name: "Government College of Engineering Karad", abbr: "GCEK", city: "Karad", type: "State", est: 1960, category: "Engineering" },
    { name: "Government College of Engineering Chandrapur", abbr: "GCECP", city: "Chandrapur", type: "State", est: 1983, category: "Engineering" },

    // Top Private Universities
    { name: "Symbiosis International University", abbr: "SIU", city: "Pune", type: "Deemed", est: 2002, category: "Multidisciplinary" },
    { name: "MIT World Peace University", abbr: "MIT-WPU", city: "Pune", type: "Private", est: 2017, category: "Multidisciplinary" },
    { name: "DY Patil University Pune", abbr: "DYP Pune", city: "Pune", type: "Deemed", est: 2003, category: "Medical" },
    { name: "NMIMS University Mumbai", abbr: "NMIMS", city: "Mumbai", type: "Deemed", est: 1981, category: "Management" },
    { name: "FLAME University Pune", abbr: "FLAME", city: "Pune", type: "Private", est: 2007, category: "Multidisciplinary" },
    { name: "Shiv Nadar University Mumbai", abbr: "SNU Mumbai", city: "Mumbai", type: "Private", est: 2024, category: "Multidisciplinary" },
    { name: "Bharati Vidyapeeth Deemed University Pune", abbr: "BVDU", city: "Pune", type: "Deemed", est: 1984, category: "Multidisciplinary" },
    { name: "KJ Somaiya University Mumbai", abbr: "KJSIU", city: "Mumbai", type: "Private", est: 2022, category: "Multidisciplinary" },
    { name: "MIT Art Design and Technology University Pune", abbr: "MIT ADT", city: "Pune", type: "Private", est: 2015, category: "Multidisciplinary" },
    { name: "Ajeenkya DY Patil University Pune", abbr: "ADYPU", city: "Pune", type: "Private", est: 2012, category: "Multidisciplinary" },

    // Other Top Colleges
    { name: "VIT Pune", abbr: "VIT Pune", city: "Pune", type: "Private", est: 1984, category: "Engineering" },
    { name: "Pune Institute of Computer Technology", abbr: "PICT", city: "Pune", type: "Private", est: 1983, category: "Engineering" },
    { name: "Vishwakarma Institute of Information Technology Pune", abbr: "VIIT", city: "Pune", type: "Private", est: 2002, category: "Engineering" },
    { name: "Sardar Patel Institute of Technology Mumbai", abbr: "SPIT", city: "Mumbai", type: "Private Aided", est: 1995, category: "Engineering" },
    { name: "Thadomal Shahani Engineering College Mumbai", abbr: "TSEC", city: "Mumbai", type: "Private Aided", est: 1983, category: "Engineering" },
    { name: "Fr. Conceicao Rodrigues College of Engineering Mumbai", abbr: "FRCRCE", city: "Mumbai", type: "Private Aided", est: 1984, category: "Engineering" },
    { name: "DJ Sanghvi College of Engineering Mumbai", abbr: "DJSCE", city: "Mumbai", type: "Private Aided", est: 1994, category: "Engineering" },
    { name: "KJ Somaiya College of Engineering Mumbai", abbr: "KJSCE", city: "Mumbai", type: "Private", est: 1983, category: "Engineering" },
    { name: "Vidyalankar Institute of Technology Mumbai", abbr: "VIT Mumbai", city: "Mumbai", type: "Private", est: 1994, category: "Engineering" },
    { name: "Ramrao Adik Institute of Technology Navi Mumbai", abbr: "RAIT", city: "Navi Mumbai", type: "Private", est: 1983, category: "Engineering" },

    // More Colleges
    { name: "Sinhgad College of Engineering Pune", abbr: "SCOE", city: "Pune", type: "Private", est: 1999, category: "Engineering" },
    { name: "Rajarambapu Institute of Technology Sangli", abbr: "RIT Sangli", city: "Sangli", type: "Private", est: 1983, category: "Engineering" },
    { name: "MIT College of Engineering Pune", abbr: "MITCOE", city: "Pune", type: "Private", est: 1983, category: "Engineering" },
    { name: "Bharati Vidyapeeth College of Engineering Pune", abbr: "BVCOE Pune", city: "Pune", type: "Private", est: 1983, category: "Engineering" },
    { name: "Pimpri Chinchwad College of Engineering Pune", abbr: "PCCOE", city: "Pune", type: "Private", est: 1999, category: "Engineering" },
    { name: "Modern College Pune", abbr: "Modern Pune", city: "Pune", type: "Private Aided", est: 1958, category: "Arts & Science" },
    { name: "Fergusson College Pune", abbr: "FC Pune", city: "Pune", type: "Private Aided", est: 1885, category: "Arts & Science" },
    { name: "St Xavier's College Mumbai", abbr: "SXC Mumbai", city: "Mumbai", type: "Private Aided", est: 1869, category: "Arts & Science" },
    { name: "Ruia College Mumbai", abbr: "Ruia", city: "Mumbai", type: "State", est: 1957, category: "Arts & Science" },
    { name: "Wilson College Mumbai", abbr: "Wilson", city: "Mumbai", type: "Private Aided", est: 1832, category: "Arts & Science" },
    { name: "Elphinstone College Mumbai", abbr: "Elphinstone", city: "Mumbai", type: "State", est: 1856, category: "Arts & Science" },
    { name: "Wadia College Pune", abbr: "Wadia", city: "Pune", type: "Private Aided", est: 1920, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    const isApexTech = ['IIT Bombay', 'IIT Nagpur', 'VNIT Nagpur', 'ICT Mumbai', 'COEP', 'VJTI'].includes(col.abbr);
    const isApexRes = col.abbr === 'TIFR';
    const isApexMgmt = ['IIM Nagpur', 'NMIMS'].includes(col.abbr);
    const isApexMed = ['GMC Mumbai', 'BJMC Pune', 'GMC Nagpur'].includes(col.abbr);
    const isMUAffiliated = col.type.includes('Private Aided') || (col.category === 'Engineering' && !isApexTech && col.type !== 'Deemed' && col.type !== 'Private');

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B9${isApexMed ? '1.5L' : '8L'} — \u20B9${isApexMed ? '5L/Yr' : '25L/Yr'}</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MD / MS</strong></td><td>3 Years</td><td>\u20B92L — \u20B912L/Yr</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isApexMed ? 'Maharashtra CET Cell / DMER (Directorate of Medical Education and Research) coordinates state quota seats via centralized NEET-based counseling, reserving 85% for Maharashtra domicile candidates. Government GMCs are the most sought-after seats in the state.'
            : 'Maharashtra DMER conducts centralized PG and UG medical counseling via NEET. Private medical colleges like DY Patil have separate institutional quota processes.';
        placementInfo = 'Maharashtra\'s immense private hospital network (Kokilaben, Lilavati, Nanavati, Ruby Hall) provides an unmatched clinical absorption ecosystem for graduates of top GMCs.';

    } else if (isApexRes) {
        coursesHtml = `<tr><td><strong>PhD / Integrated PhD</strong></td><td>4-6 Years</td><td>Fully Funded (JRF + SRF)</td><td>B.Sc/M.Sc + TIFR GS / JEST / GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'TIFR operates entirely outside mainstream university structure. Entry is exclusively via the TIFR Graduate School admission process — one of the most competitive research selection systems globally. JRF/SRF stipends are provided.';
        placementInfo = 'Graduates directly assimilate into global top-20 research universities (MIT, Caltech, Cambridge) or premium national R&D roles (DAE, ISRO, DRDO). Zero commercial placement — pure research trajectory.';

    } else if (col.category === 'Engineering') {
        const feeMin = isApexTech ? '₹10L' : '₹3L';
        const feeMax = isApexTech ? '₹20L' : '₹8L';
        const entrance = isApexTech
            ? (col.abbr === 'IIT Bombay' ? 'JEE Advanced (Top 2500 rank nationally)' : col.abbr === 'ICT Mumbai' ? 'ICT Mumbai JEE-based DASA/JoSAA routes' : 'JoSAA / CSAB counseling via JEE Main/Advanced')
            : 'MHT CET / JEE Main via Maharashtra State CET Cell centralized counseling (CAP rounds)';
        coursesHtml = `<tr><td><strong>B.Tech / BE</strong></td><td>4 Years</td><td>${feeMin} — ${feeMax}</td><td>10+2 PCM + ${entrance}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Tech / ME</strong></td><td>2 Years</td><td>\u20B91L — \u20B94L</td><td>B.Tech + GATE / MAH-M.Tech CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isApexTech
            ? (col.abbr === 'IIT Bombay' ? 'JoSAA counseling using JEE Advanced ranks. IIT Bombay is the most competitive IIT with cutoffs requiring top 200-500 ranks for premium branches.'
                : 'JoSAA / CSAB counseling mapping pure JEE Main/Advanced algorithmic ranks.')
            : 'MHT CET (Maharashtra Common Entrance Test) governed by Maharashtra State CET Cell is the primary route for all SPPU/MU/RTM affiliated engineering colleges. CAP rounds (Centralized Admission Process) distribute seats across 3 rounds.';
        placementInfo = isApexTech
            ? 'IIT Bombay holds the highest median placement packages nationally. Its Placement Office routes graduates into FAANG, top-tier quant finance (Jane Street, DE Shaw), and elite global consulting firms. VJTI and COEP feed strongly into Pune-Mumbai manufacturing and IT grids.'
            : 'Mumbai-Pune engineering graduates power one of Asia\'s densest tech ecosystems. Major recruiters: TCS, Infosys, Capgemini, Mahindra, Bajaj, L&T anchoring both IT services and core engineering.';

    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B912L — \u20B925L</td><td>Graduation + CAT / NMAT / CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>BBA / BMS</strong></td><td>3 Years</td><td>\u20B91.5L — \u20B96L</td><td>10+2 + MHT CET / NMIMS CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === 'IIM Nagpur' ? 'Stringent CAT percentile cutoffs feeding the Common IIM Admission Process (CAP). Rapidly building flagship batch strength with intensive business school pedigree.'
            : col.abbr === 'NMIMS' ? 'NMIMS uses NMAT by GMAC as its proprietary admission test — one of India\'s most recognized MBA entrance exams. Also accepts CAT/GMAT for specific programs.'
                : 'MAH-MBA/MMS CET (Maharashtra MBA CET) is the primary state route supplemented by CAT/XAT/CMAT for management institutes under SPPU/MU.';
        placementInfo = col.abbr === 'NMIMS' ? 'NMIMS Mumbai consistently records top-10 MBA placements nationally. Premier BFSI, consulting, and FMCG placements. SBM (School of Business Management) median packages routinely exceed ₹18 LPA.'
            : 'Strong pipeline into Mumbai\'s unmatched BFSI sector, Dalal Street finance, and multinational consulting anchored around Bandra-Kurla Complex (BKC) and Pune\'s Magarpatta/Hinjewadi corridors.';

    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com / BMS / BAF</strong></td><td>3 Years</td><td>\u20B93K — \u20B92L</td><td>10+2 Merit / CUET UG / MHT CET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.A. / M.Sc / M.Com / MMS</strong></td><td>2 Years</td><td>\u20B310K — \u20B92L</td><td>Bachelor\'s + CUET PG / University Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = ['SPPU', 'MU', 'RTM Nagpur', 'SUK'].includes(col.abbr)
            ? 'Major Maharashtra state universities manage decentralized admissions via central university portals. Mumbai University uses its MU portal for UG/PG allocations while SPPU coordinates Pune district admissions.'
            : col.abbr === 'TIFR' ? 'Research only — see separate admissions tab.'
                : isMUAffiliated
                    ? 'Admission via MU / SPPU / RTM affiliated college merit lists. First-Year cutoffs based on 12th Board percentage (HSC). Management program intakes supplemented by MAH-MBA CET.'
                    : 'University autonomous or deemed institution admissions using institutional merit-based screening or CUET UG/PG national processes.';
        placementInfo = col.abbr === 'FLAME' ? 'FLAME is known for liberal arts + business hybrid programs. Graduates deploy into media, consulting, and arts entrepreneurship sectors at premium packages given a niche but elite peer cohort.'
            : 'Mumbai\'s commercial supremacy drives arts/commerce graduates into BFSI (banking, insurance, finance), media, and retail — one of the highest-opportunity employment geographies in India.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (isApexTech || isApexRes || isApexMgmt || ['COEP', 'VJTI', 'SPPU', 'SIU', 'NMIMS'].includes(col.abbr)) ? '4.8' : '4.3';

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
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "${col.name}",
      "alternateName": "${col.abbr}",
      "url": "https://nextcampus.com/colleges/maharashtra/${collegeSlug}/${collegeSlug}.html"
    }
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
                    <p>${col.name} (${col.abbr}), established in ${col.est}, is one of Maharashtra's leading ${col.type.toLowerCase()} institutions based in ${col.city}. ${isApexTech ? 'It commands the highest engineering standards in India and is directly affiliated with the national academic grids.' : col.category === 'Engineering' ? 'It operates under SPPU / MU / RTM affiliation and follows MHT CET driven centralized (CAP) admission protocols.' : 'It delivers multi-faceted education deeply embedded within the Mumbai–Pune metropolitan academic ecosystem.'}  </p>
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
                        <p>"Maharashtra's academia is unmatched in density. The Mumbai–Pune axis alone has more top-ranked institutions than most Indian states combined. The corporate absorption rate is extraordinary."</p>
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

    for (const col of mhColleges) {
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
        if (['IIT Bombay', 'TIFR', 'IIM Nagpur', 'NMIMS', 'ICT Mumbai'].includes(col.abbr)) baseScore = 9.9;
        else if (['IIT Nagpur', 'VNIT Nagpur', 'COEP', 'VJTI', 'SIU', 'GMC Mumbai', 'BJMC Pune'].includes(col.abbr)) baseScore = 9.3;
        else if (['SPPU', 'MU', 'WCE Sangli', 'PICT', 'SPIT', 'DJSCE', 'VIT Pune', 'FLAME', 'BVDU'].includes(col.abbr)) baseScore = 8.7;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Maharashtra', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 92 : 80}, nirf: 0,
      link: '../colleges/maharashtra/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore > 9 ? "4.8" : "4.3"}', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Maharashtra Colleges into home.js!`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log("\n❌ No new Maharashtra Colleges to inject (all deduplicated).");
    }
}

processAll();
