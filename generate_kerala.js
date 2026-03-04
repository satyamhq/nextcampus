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

const klColleges = [
    // National Institutes & Universities (Kerala)
    { name: "Indian Institute of Technology Palakkad", abbr: "IIT Palakkad", city: "Palakkad", type: "Government", est: 2015, category: "Engineering" },
    { name: "Indian Institute of Management Kozhikode", abbr: "IIM Kozhikode", city: "Kozhikode", type: "Government", est: 1996, category: "Management" },
    { name: "National Institute of Technology Calicut", abbr: "NIT Calicut", city: "Kozhikode", type: "Government", est: 1961, category: "Engineering" },
    { name: "Indian Institute of Space Science and Technology", abbr: "IIST", city: "Thiruvananthapuram", type: "Government", est: 2007, category: "Engineering" },
    { name: "Indian Institute of Information Technology Kottayam", abbr: "IIIT Kottayam", city: "Kottayam", type: "Government", est: 2015, category: "Engineering" },
    { name: "Indian Institute of Science Education and Research Thiruvananthapuram", abbr: "IISER TVM", city: "Thiruvananthapuram", type: "Government", est: 2008, category: "Arts & Science" },
    { name: "Cochin University of Science and Technology", abbr: "CUSAT", city: "Kochi", type: "State", est: 1971, category: "Multidisciplinary" },
    { name: "University of Kerala", abbr: "Kerala University", city: "Thiruvananthapuram", type: "State", est: 1937, category: "Multidisciplinary" },
    { name: "Mahatma Gandhi University Kottayam", abbr: "MG University", city: "Kottayam", type: "State", est: 1983, category: "Multidisciplinary" },
    { name: "University of Calicut", abbr: "Calicut University", city: "Malappuram", type: "State", est: 1968, category: "Multidisciplinary" },

    // Top Government Colleges
    { name: "Government Medical College Thiruvananthapuram", abbr: "SAT Hospital", city: "Thiruvananthapuram", type: "State", est: 1951, category: "Medical" },
    { name: "Government Medical College Kozhikode", abbr: "GMC Kozhikode", city: "Kozhikode", type: "State", est: 1957, category: "Medical" },
    { name: "Government Medical College Kottayam", abbr: "GMC Kottayam", city: "Kottayam", type: "State", est: 1961, category: "Medical" },
    { name: "Government Engineering College Thrissur", abbr: "GEC Thrissur", city: "Thrissur", type: "State", est: 1957, category: "Engineering" },
    { name: "College of Engineering Trivandrum", abbr: "CET", city: "Thiruvananthapuram", type: "State", est: 1939, category: "Engineering" },
    { name: "Government Engineering College Kozhikode", abbr: "GEC Kozhikode", city: "Kozhikode", type: "State", est: 1999, category: "Engineering" },
    { name: "Government Engineering College Barton Hill", abbr: "GEC Barton Hill", city: "Thiruvananthapuram", type: "State", est: 1999, category: "Engineering" },
    { name: "Government College for Women Thiruvananthapuram", abbr: "GCW TVM", city: "Thiruvananthapuram", type: "State (Women)", est: 1864, category: "Arts & Science" },
    { name: "Maharaja's College Ernakulam", abbr: "Maharajas", city: "Ernakulam", type: "State", est: 1875, category: "Arts & Science" },
    { name: "University College Thiruvananthapuram", abbr: "UC TVM", city: "Thiruvananthapuram", type: "State", est: 1866, category: "Arts & Science" },

    // Top Private Universities & Deemed
    { name: "Amrita Vishwa Vidyapeetham", abbr: "Amrita", city: "Coimbatore", type: "Deemed", est: 1994, category: "Multidisciplinary" }, // HQ Amritapuri is KL
    { name: "Rajagiri College of Social Sciences", abbr: "RCSS", city: "Kalamassery", type: "Private", est: 1955, category: "Management" },
    { name: "Sacred Heart College Thevara", abbr: "SH Thevara", city: "Ernakulam", type: "Private Aided", est: 1944, category: "Arts & Science" },
    { name: "St Teresa's College Ernakulam", abbr: "STC Ernakulam", city: "Ernakulam", type: "Private (Women)", est: 1925, category: "Arts & Science" },
    { name: "Mar Ivanios College", abbr: "MIC", city: "Thiruvananthapuram", type: "Private Aided", est: 1949, category: "Arts & Science" },
    { name: "St Thomas College Thrissur", abbr: "St Thomas Thrissur", city: "Thrissur", type: "Private Aided", est: 1919, category: "Arts & Science" },
    { name: "St Joseph's College Devagiri", abbr: "Devagiri", city: "Kozhikode", type: "Private Aided", est: 1956, category: "Arts & Science" },
    { name: "Union Christian College Aluva", abbr: "UC Aluva", city: "Aluva", type: "Private Aided", est: 1921, category: "Arts & Science" },
    { name: "CMS College Kottayam", abbr: "CMS", city: "Kottayam", type: "Private Aided", est: 1817, category: "Arts & Science" },
    { name: "Farook College Kozhikode", abbr: "Farook", city: "Kozhikode", type: "Private Aided", est: 1948, category: "Arts & Science" },

    // Other Top Colleges
    { name: "Rajagiri School of Engineering and Technology", abbr: "RSET", city: "Kakkanad", type: "Private", est: 2001, category: "Engineering" },
    { name: "TKM College of Engineering Kollam", abbr: "TKMCE", city: "Kollam", type: "Private Aided", est: 1958, category: "Engineering" },
    { name: "Model Engineering College Kochi", abbr: "MEC", city: "Thrikkakara", type: "State", est: 1989, category: "Engineering" },
    { name: "Sree Chitra Thirunal College of Engineering", abbr: "SCTE", city: "Thiruvananthapuram", type: "State", est: 1994, category: "Engineering" },
    { name: "Government Engineering College Idukki", abbr: "GEC Idukki", city: "Idukki", type: "State", est: 2009, category: "Engineering" },
    { name: "NSS College Pandalam", abbr: "NSS Pandalam", city: "Pandalam", type: "Private Aided", est: 1964, category: "Arts & Science" },
    { name: "Sree Kerala Varma College Thrissur", abbr: "SKV", city: "Thrissur", type: "Private Aided", est: 1949, category: "Arts & Science" },
    { name: "Bishop Moore College Mavelikara", abbr: "BMC", city: "Mavelikara", type: "Private Aided", est: 1964, category: "Arts & Science" },
    { name: "Nirmala College Muvattupuzha", abbr: "Nirmala", city: "Muvattupuzha", type: "Private Aided", est: 1964, category: "Arts & Science" },
    { name: "St Albert's College Ernakulam", abbr: "SAC", city: "Ernakulam", type: "Private Aided", est: 1959, category: "Arts & Science" },
    { name: "Baselios College Kottayam", abbr: "BCK", city: "Kottayam", type: "Private Aided", est: 1964, category: "Arts & Science" },
    { name: "Marian College Kuttikkanam", abbr: "Marian", city: "Kuttikkanam", type: "Private Aided", est: 1990, category: "Arts & Science" },
    { name: "St Berchmans College Changanassery", abbr: "SBC", city: "Changanassery", type: "Private Aided", est: 1922, category: "Arts & Science" },
    { name: "Christ College Irinjalakuda", abbr: "CCI", city: "Irinjalakuda", type: "Private Aided", est: 1956, category: "Arts & Science" },
    { name: "De Paul Institute of Science and Technology", abbr: "DiST", city: "Angamaly", type: "Private", est: 2009, category: "Arts & Science" },
    { name: "Assumption College Changanassery", abbr: "Assumption", city: "Changanassery", type: "Private (Women)", est: 1924, category: "Arts & Science" },
    { name: "Loyola College of Social Sciences", abbr: "Loyola", city: "Thiruvananthapuram", type: "Private", est: 1966, category: "Arts & Science" },
    { name: "St Xavier's College Thumba", abbr: "SXC Thumba", city: "Thiruvananthapuram", type: "Private", est: 1956, category: "Arts & Science" },
    { name: "SN College Kollam", abbr: "SNC Kollam", city: "Kollam", type: "Private Aided", est: 1959, category: "Arts & Science" },
    { name: "SN College Alappuzha", abbr: "SNC Alappuzha", city: "Alappuzha", type: "Private Aided", est: 1956, category: "Arts & Science" },
    { name: "Government Brennen College Thalassery", abbr: "Brennen", city: "Thalassery", type: "State", est: 1868, category: "Arts & Science" },
    { name: "Government Victoria College Palakkad", abbr: "Victoria", city: "Palakkad", type: "State", est: 1922, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    const isApexTech = ['IIT Palakkad', 'NIT Calicut', 'IIST', 'IIIT Kottayam', 'IISER TVM'].includes(col.abbr);
    const isApexMgmt = col.abbr === 'IIM Kozhikode';
    const isApexMed = ['SAT Hospital', 'GMC Kozhikode', 'GMC Kottayam'].includes(col.abbr);
    const isKeralaPSC = col.category === 'Arts & Science' || col.category === 'Multidisciplinary';

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B91L — \u20B94L/Yr</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>MD / MS</strong></td><td>3 Years</td><td>\u20B91L — \u20B98L/Yr</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Kerala CEE (Commissioner for Entrance Examinations) centrally manages both UG (NEET) and PG medical allocations governed by Kerala Medical Entrance Cell, distributing seats across GMCs through a strict HS/AIQ split.';
        placementInfo = 'Massive capacity feeding into Kerala Health Services, ESIC, and massive private hospital chains (Aster, Malabar, KMC). Sizeable USMLE/PLAB migration rates among graduates.';

    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isApexTech ? '8L' : '2L'} — \u20B9${isApexTech ? '18L' : '6L'}</td><td>10+2 PCM + ${isApexTech ? 'JEE Main/Adv / ISAT' : 'KEAM / JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91L — \u20B93L</td><td>B.Tech + GATE / KUCAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isApexTech
            ? (col.abbr === 'IIST' ? 'ISAT (IIST Admission Screening Test) combined with JEE Advanced rank. Exclusively feeds ISRO and allied space research pipelines.' :
                col.abbr === 'IIT Palakkad' ? 'JoSAA counseling leveraging pure JEE Advanced ranks.' :
                    'JoSAA / CSAB counseling utilizing JEE Main/Advanced rankings.')
            : 'KEAM (Kerala Engineering Architecture Medical) is the primary state engineering admission controller. CEE Kerala conducts centralized counseling distributing merit-based seats across government, aided, and self-financing institutions.';
        placementInfo = isApexTech
            ? 'Package echelons tracking into MAANG, core aerospace (ISRO/DRDO), and deep product engineering sectors domestically and internationally.'
            : 'Significant IT service volume deployments (Infosys, TCS, Wipro) anchored on the Technopark / Infopark / SmartCity Kochi IT islands — one of India\'s densest tech corridors.';

    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>PGP / MBA</strong></td><td>2 Years</td><td>\u20B912L — \u20B924L</td><td>Graduation + CAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>FPM / PhD</strong></td><td>4-5 Years</td><td>Stipend Based</td><td>Post-Grad + CAT/GMAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'IIM Kozhikode deploys stringent CAT percentile cutoffs feeding the Common Admission Process (CAP) with deep sectoral PI/WAT processes. Consistently placing within NIRF Top 6 IIMs.';
        placementInfo = 'Aggressive campus placement cell annually recording stellar median packages. Dominant sectors: BFSI, Consulting (McKinsey/BCG/Bain), and leading FMCG firms.';

    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3 Years</td><td>\u20B93K — \u20B91.5L</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                   <tr><td><strong>M.Sc / M.A. / M.Com</strong></td><td>2 Years</td><td>\u20B910K — \u20B91.5L</td><td>Bachelor\'s + University Entrance/CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.type === 'Central' || col.abbr.includes('IISER') || col.abbr === 'CUSAT'
            ? 'Strictly via CUET UG/PG (NTA) for undergraduate intake, with specialized entrance-based PG admissions.'
            : 'Kerala University / MG University / Calicut University affiliated colleges admit via +2 merit lists managed through the respective university CEE integrated portals. Autonomous universities (CUSAT) conduct their own CUSAT CAT for management/engineering.';
        placementInfo = isKeralaPSC
            ? 'Graduates form the primary feeder for Kerala PSC (Public Service Commission) exams, civil services, banking, and a strong Gulf NRI employment ecosystem, especially from Malappuram and Kozhikode districts.'
            : 'Broad general employment across regional government and private service sectors.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (isApexTech || isApexMgmt || isApexMed || col.abbr === 'CUSAT') ? '4.8' : '4.3';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, fee structure, placement records, scholarships and campus life in Kerala. Verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Kerala Colleges, KEAM 2026, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/kerala/${collegeSlug}/${collegeSlug}.html"
    }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, KL</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Kerala, India</p>
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
                    <p>${col.name} (${col.abbr}), established in ${col.est}, is one of Kerala's premier ${col.type.toLowerCase()} institutions based in ${col.city}. It is affiliated with or operates under the purview of the ${col.category === 'Engineering' ? 'APJ Abdul Kalam Technological University (KTU)' : col.type === 'State' || col.type.includes('Private') ? 'University of Kerala / MG University / Calicut University / CUSAT ecosystem' : 'national autonomous framework'}, providing robust academic and career outcomes.</p>
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
                        <p>"Kerala's education ecosystem is uniquely competitive — the KTU affiliated institutions maintain strong technical rigor while the century-old aided colleges anchor an incredibly strong humanities and civil service feeder network."</p>
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

    for (const col of klColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'kerala', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        const isApexTech = ['IIT Palakkad', 'NIT Calicut', 'IIST', 'IIIT Kottayam', 'IISER TVM'].includes(col.abbr);
        const isApexMgmt = col.abbr === 'IIM Kozhikode';
        const isMajorUniv = ['CUSAT', 'Kerala University', 'MG University', 'Calicut University'].includes(col.abbr);

        let baseScore = 7.9;
        if (isApexTech || isApexMgmt) baseScore = 9.8;
        else if (isMajorUniv || col.abbr === 'Amrita') baseScore = 9.2;
        else if (['SAT Hospital', 'GMC Kozhikode', 'GMC Kottayam', 'CET', 'GEC Thrissur', 'TKMCE', 'MEC'].includes(col.abbr)) baseScore = 8.8;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Kerala', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 90 : 80}, nirf: 0,
      link: '../colleges/kerala/${collegeSlug}/${collegeSlug}.html',
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
            console.log(`\n✅ Injected ${newCards.length} Kerala Colleges into home.js!`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log("\n❌ No new Kerala Colleges to inject (all deduplicated).");
    }
}

processAll();
