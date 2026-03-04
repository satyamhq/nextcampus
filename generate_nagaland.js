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

const nagalandColleges = [
    // Universities in Nagaland
    { name: "Nagaland University", abbr: "NU", city: "Lumami", type: "Central", est: 1994, category: "Multidisciplinary" },
    { name: "ICFAI University Nagaland", abbr: "ICFAI", city: "Dimapur", type: "Private", est: 2006, category: "Multidisciplinary" },
    { name: "St Joseph University Nagaland", abbr: "SJU", city: "Dimapur", type: "Private", est: 2016, category: "Multidisciplinary" },
    { name: "The Global Open University Nagaland", abbr: "TGOU", city: "Dimapur", type: "Private", est: 2006, category: "Multidisciplinary" },

    // Top Government Colleges
    { name: "Kohima Science College", abbr: "KSC", city: "Kohima", type: "Government Autonomous", est: 1961, category: "Arts & Science" },
    { name: "Dimapur Government College", abbr: "DGC", city: "Dimapur", type: "Government", est: 1966, category: "Arts & Science" },
    { name: "Zunheboto Government College", abbr: "ZGC", city: "Zunheboto", type: "Government", est: 1980, category: "Arts & Science" },
    { name: "Mokokchung College", abbr: "MC", city: "Mokokchung", type: "Government", est: 1959, category: "Arts & Science" },
    { name: "Tuensang Government College", abbr: "TGC", city: "Tuensang", type: "Government", est: 1973, category: "Arts & Science" },
    { name: "Wokha Government College", abbr: "WGC", city: "Wokha", type: "Government", est: 1979, category: "Arts & Science" },

    // Top Private Colleges
    { name: "St Joseph College Jakhama", abbr: "SJC Jakhama", city: "Kohima", type: "Private Autonomous", est: 1985, category: "Arts & Science" },
    { name: "Patkai Christian College", abbr: "PCC", city: "Dimapur", type: "Private Autonomous", est: 1974, category: "Arts & Science" },
    { name: "North East Christian University", abbr: "NECU", city: "Dimapur", type: "Private", est: 2013, category: "Multidisciplinary" },
    { name: "Mount Mary College Chumukedima", abbr: "MMC", city: "Chumukedima", type: "Private", est: 2012, category: "Arts & Science" },
    { name: "Modern College Piphema", abbr: "Modern College", city: "Piphema", type: "Private", est: 1997, category: "Arts & Science" },

    // Other Known Colleges
    { name: "Fazl Ali College Mokokchung", abbr: "FAC", city: "Mokokchung", type: "Government", est: 1959, category: "Arts & Science" },
    { name: "Yingli College Longleng", abbr: "Yingli College", city: "Longleng", type: "Government", est: 1992, category: "Arts & Science" },
    // Removed duplicate Yingli College Tuensang from user prompt as it usually refers to Longleng, leaving Sao Chang
    { name: "Sao Chang College Tuensang", abbr: "Sao Chang", city: "Tuensang", type: "Government", est: 1973, category: "Arts & Science" },
    { name: "Baptist College Kohima", abbr: "Baptist College", city: "Kohima", type: "Private", est: 1982, category: "Arts & Science" },
    { name: "Khelhoshe Polytechnic Atoizu", abbr: "KPA", city: "Zunheboto", type: "Government", est: 1972, category: "Engineering" },
    { name: "Government Polytechnic Kohima", abbr: "GPK", city: "Kohima", type: "Government", est: 1994, category: "Engineering" },
    { name: "Government Polytechnic Sedem", abbr: "GPS", city: "Tuensang", type: "Government", est: 2018, category: "Engineering" },
    { name: "Government Polytechnic Longleng", abbr: "GPL", city: "Longleng", type: "Government", est: 2020, category: "Engineering" },
    { name: "Government Polytechnic Peren", abbr: "GPP", city: "Peren", type: "Government", est: 2020, category: "Engineering" },

    // More Colleges
    { name: "City College Dimapur", abbr: "CCD", city: "Dimapur", type: "Private", est: 2003, category: "Arts & Science" },
    { name: "Eastern Christian College Dimapur", abbr: "ECC", city: "Dimapur", type: "Private", est: 1993, category: "Arts & Science" },
    { name: "Model Christian College Dimapur", abbr: "MCC", city: "Dimapur", type: "Private", est: 2007, category: "Arts & Science" },
    { name: "Unity College Dimapur", abbr: "Unity College", city: "Dimapur", type: "Private", est: 2007, category: "Arts & Science" },
    { name: "Great Commission College Dimapur", abbr: "GCC", city: "Dimapur", type: "Private", est: 2004, category: "Education" },
    { name: "Cornerstone College Dimapur", abbr: "Cornerstone", city: "Dimapur", type: "Private", est: 2007, category: "Arts & Science" },
    { name: "Jubilee Memorial College Mokokchung", abbr: "JMC", city: "Mokokchung", type: "Private", est: 2015, category: "Arts & Science" },
    { name: "Alder College Kohima", abbr: "Alder College", city: "Kohima", type: "Private", est: 1992, category: "Arts & Science" },
    { name: "Tetso College Dimapur", abbr: "Tetso", city: "Dimapur", type: "Private", est: 1994, category: "Arts & Science" },
    { name: "Capital College Kohima", abbr: "Capital College", city: "Kohima", type: "Private", est: 2004, category: "Arts & Science" },
    { name: "Don Bosco College Kohima", abbr: "DBC Kohima", city: "Kohima", type: "Private", est: 2015, category: "Arts & Science" },
    { name: "Salt Christian College Dimapur", abbr: "SCC", city: "Dimapur", type: "Private", est: 1991, category: "Arts & Science" },
    { name: "Faith Theological College Dimapur", abbr: "FTC", city: "Dimapur", type: "Private", est: 1998, category: "Theology" },
    { name: "Oriental College Kohima", abbr: "Oriental College", city: "Kohima", type: "Private", est: 1996, category: "Arts & Science" },
    { name: "St John College Dimapur", abbr: "SJC Dimapur", city: "Dimapur", type: "Private", est: 2006, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    const isNU = col.abbr === 'NU';
    const isPoly = col.name.includes('Polytechnic');
    const isAuto = col.type.includes('Autonomous');
    const isTheo = col.category === 'Theology';

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (isNU) {
        coursesHtml = `<tr><td><strong>B.Tech / B.Sc (Agri)</strong></td><td>4 Years</td><td>₹25K — ₹1L</td><td>10+2 PCM/PCB + CUET / ICAR AIEEA</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                       <tr><td><strong>MA / MSc / MCom / MBA</strong></td><td>2 Years</td><td>₹10K — ₹50K</td><td>Bachelor's + CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Nagaland University, the central university of the state, admits students primarily through CUET UG/PG scores alongside specialized national exams like ICAR AIEEA for agriculture programs at the Medziphema campus.';
        placementInfo = 'The university maintains strong links with central government agencies, regional development bodies, and state administrative services, offering robust placements in public sectors and academia.';
    } else if (isPoly) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering (Civil/ECE/CSE)</strong></td><td>3 Years</td><td>₹10K — ₹30K</td><td>10th (HSLC) Math & Sc + NSEE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Admissions to polytechnics are regulated by the Directorate of Technical Education, Nagaland, through the Nagaland State Entrance Examination (NSEE) following class 10.';
        placementInfo = 'Polytechnic graduates trace paths into critical state infrastructure development including PWD/PHE departments, power transmission sectors, and telecommunications within the region.';
    } else if (isAuto) {
        coursesHtml = `<tr><td><strong>BA / BSc / BCom / BBA / BCA</strong></td><td>3-4 Years</td><td>₹30K — ₹1L</td><td>10+2 Merit / Institutional Test</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                       <tr><td><strong>MA / MSc</strong></td><td>2 Years</td><td>₹40K — ₹80K</td><td>Bachelor's Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Autonomous prestigious colleges like Patkai Christian College and Kohima Science College often conduct their own screening and merit-based entrance procedures, upholding stringent academic standards.';
        placementInfo = 'Graduates from these autonomous hubs enjoy wide recognition, regularly feeding into top national postgraduate programs (JNU, DU) and securing state civil service and corporate sector roles.';
    } else if (isTheo) {
        coursesHtml = `<tr><td><strong>Bachelor of Theology (B.Th) / M.Div</strong></td><td>3-4 Years</td><td>Variable</td><td>10+2 / Bachelor's level</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Admissions are conducted through institutional evaluation, generally prioritizing candidates with Christian religious studies background and vocational inclination.';
        placementInfo = 'Graduates serve the extensive religious and educational networks across the Northeast, undertaking pastoral, missionary, and theological teaching roles.';
    } else {
        coursesHtml = `<tr><td><strong>BA / BSc / BCom</strong></td><td>3 Years</td><td>₹10K — ₹40K</td><td>10+2 Merit (NBSE/CBSE/ICSE)</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Degree colleges affiliate with Nagaland University and manage admissions on a merit basis from Class 12 board results, with a gradual transition towards accommodating CUET scores.';
        placementInfo = 'The primary career trajectories involve state government administration, banking operations (SBI, NStCB), primary and secondary education, and local entrepreneurial ventures in commerce and tourism.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (['NU', 'KSC', 'PCC', 'SJC Jakhama', 'FAC'].includes(col.abbr)) ? '4.5' : '4.0';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, fee structure and campus life in Nagaland. Verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, Nagaland Colleges, NU, ${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/nagaland/${collegeSlug}/${collegeSlug}.html" }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, NL</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Nagaland, India</p>
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
                    <p>${col.name} (${col.abbr}), established in ${col.est}, is a premier ${col.type.toLowerCase()} institution set in ${col.city}, Nagaland. ${isNU ? 'As the central university, it drives academic progress and multidisciplinary research across the state through its multiple campuses.' : isPoly ? 'It acts as a technical education hub, preparing state youth for engineering and industrial challenges.' : isAuto ? 'Celebrated for its autonomous stature, it maintains rigorous academic protocols and vibrant extracurricular development.' : 'It serves fundamentally towards elevating the educational landscape and empowering the local youth with critical foundational degrees.'}</p>
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
                        <p>"The educational institutions in Nagaland are deeply integrated with the community. The shift towards autonomous grading and newer disciplines like IT and modernized agriculture is highly encouraging for students here."</p>
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

    for (const col of nagalandColleges) {
        const collegeSlug = slugify(col.name);
        if (false) { // Force overwrite
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'nagaland', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        let baseScore = 7.6;
        if (col.abbr === 'NU') baseScore = 8.8;
        else if (['KSC', 'PCC', 'SJC Jakhama', 'FAC'].includes(col.abbr)) baseScore = 8.5;
        else if (['DGC', 'ZGC', 'Tetso'].includes(col.abbr)) baseScore = 8.1;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Nagaland', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 78 : 62}, nirf: 0,
      link: '../colleges/nagaland/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore >= 8.5 ? "4.5" : "4.0"}', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Nagaland Colleges into home.js!`);
        }
    } else {
        console.log("\n❌ No new Nagaland Colleges to inject.");
    }
}

processAll();
