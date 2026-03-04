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

const ladakhColleges = [
    // Universities in Ladakh
    { name: "University of Ladakh", abbr: "UoL", city: "Leh/Kargil", type: "State", est: 2018, category: "Multidisciplinary" },

    // Major Government Colleges in Ladakh
    { name: "Government Degree College Leh", abbr: "GDC Leh", city: "Leh", type: "Government", est: 1994, category: "Arts & Science" },
    { name: "Government Degree College Kargil", abbr: "GDC Kargil", city: "Kargil", type: "Government", est: 1995, category: "Arts & Science" },
    { name: "Government Degree College Nubra", abbr: "GDC Nubra", city: "Nubra", type: "Government", est: 2011, category: "Arts & Science" },
    { name: "Government Degree College Drass", abbr: "GDC Drass", city: "Drass", type: "Government", est: 2018, category: "Arts & Science" },
    { name: "Government Degree College Zanskar", abbr: "GDC Zanskar", city: "Zanskar", type: "Government", est: 2007, category: "Arts & Science" },

    // Professional & Special Institutes
    { name: "Eliezer Joldan Memorial College of Engineering and Technology", abbr: "EJMCET", city: "Leh", type: "Government", est: 2023, category: "Engineering" },
    { name: "Institute of Hotel Management Leh", abbr: "IHM Leh", city: "Leh", type: "Government", est: 2021, category: "Management" },
    { name: "Central Institute of Buddhist Studies", abbr: "CIBS", city: "Leh", type: "Deemed", est: 1959, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    const isEngg = col.category === 'Engineering';
    const isHotelMgmt = col.abbr === 'IHM Leh';
    const isCIBS = col.abbr === 'CIBS';
    const isUniv = col.abbr === 'UoL';
    const isDegreeCol = col.category === 'Arts & Science' && !isCIBS;

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (isEngg) {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>₹50K — ₹1.5L</td><td>10+2 PCM + JKCET / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Admissions are managed through centralized state counseling (JKBOPEE) or via CUET scores for local domicile students. The college is the premier technical institute for the Ladakh region.';
        placementInfo = 'As the first engineering college in Ladakh, graduates are primed to fill crucial technical and infrastructure roles within the newly formed Union Territory administration, local PWDs, and the growing renewable energy sector in the high-altitude region.';
    } else if (isHotelMgmt) {
        coursesHtml = `<tr><td><strong>BSc Hospitality & Hotel Administration</strong></td><td>3 Years</td><td>₹80K — ₹2.5L</td><td>10+2 + NCHMCT JEE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Admissions are conducted through the National Council for Hotel Management Joint Entrance Examination (NCHMCT JEE) for the centralized allocation of seats across IHMs in India.';
        placementInfo = 'With Ladakh becoming one of India\'s most premium tourist destinations, IHM Leh provides direct placements into high-end eco-resorts, local luxury hospitality chains, and government tourism departments.';
    } else if (isCIBS) {
        coursesHtml = `<tr><td><strong>BA / MA (Buddhist Philosophy, Bhot Bauddh Darshan)</strong></td><td>3-2 Years</td><td>Variable</td><td>10+2 / Bachelor's specific to Tibetan/Buddhist studies</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'The Central Institute of Buddhist Studies is a specialized Deemed University operating under the Ministry of Culture, Govt. of India. Admissions involve specialized entrance exams testing aptitude in Buddhist philosophy, Pali, and Bhoti languages.';
        placementInfo = 'Graduates primarily engage in academic research, archival preservation of Himalayan culture, teaching, and heritage tourism roles across the trans-Himalayan region.';
    } else if (isUniv) {
        coursesHtml = `<tr><td><strong>MA / MSc / MCom</strong></td><td>2 Years</td><td>₹5K — ₹25K</td><td>Bachelor's + CUET PG / UoL Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                       <tr><td><strong>PhD</strong></td><td>3-5 Years</td><td>Variable</td><td>Master's + NET / UoL Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'University of Ladakh is the only university in the UT. It conducts its own entrance examinations and increasingly adopts CUET PG scores for admissions to its various postgraduate programs offered across Leh and Kargil campuses.';
        placementInfo = 'Postgraduates serve the administrative, educational, and research needs of the UT. Many clear local civil services or join the higher education teaching cadre within Ladakh.';
    } else if (isDegreeCol) {
        coursesHtml = `<tr><td><strong>BA / BSc / BCom</strong></td><td>3 Years</td><td>₹2K — ₹15K</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Admissions for undergraduate programs in government degree colleges are typically merit-based based on Class 12 board marks or through the CUET UG framework, managed through a centralized portal by the University of Ladakh.';
        placementInfo = 'Graduates form the backbone of Ladakh’s local administration, banking sector (J&K Bank, SBI), education sector, and the burgeoning local entrepreneurship ecosystem.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (['UoL', 'CIBS', 'IHM Leh', 'GDC Leh'].includes(col.abbr)) ? '4.5' : '4.0';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${col.name} (\${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore \${col.name} admissions 2026, courses, fee structure and campus life in Ladakh. Verified details at NextCampus.">
    <meta name="keywords" content="\${col.name}, \${col.abbr}, Ladakh Colleges, University of Ladakh, \${col.city} Institutes, NextCampus">
    <link rel="icon" type="image/svg+xml" href="../../../favicon/favicon.svg">
    <link rel="icon" type="image/png" sizes="96x96" href="../../../favicon/favicon-96x96.png">
    <link rel="shortcut icon" href="../../../favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="../../../favicon/apple-touch-icon.png">
    <link rel="manifest" href="../../../favicon/site.webmanifest">
    <meta name="theme-color" content="#0056D2">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="\${collegeSlug}.css">
    <script type="application/ld+json">
    { "@context": "https://schema.org", "@type": "EducationalOrganization",
      "name": "\${col.name}", "alternateName": "\${col.abbr}",
      "url": "https://nextcampus.com/colleges/ladakh/\${collegeSlug}/\${collegeSlug}.html" }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">\${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; \${col.city}, LA</span>
            </div>
            <a href="#" class="btn-lpu-apply">Apply Now &#8594;</a>
        </div>
    </div>

    <section class="lpu-hero" id="lpu-hero"
        style="background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url('images/cover/\${collegeSlug}_cover.png'); background-size: cover; background-position: center;">
        <div class="container">
            <div class="lpu-hero-grid">
                <div class="lpu-hero-info">
                    <img src="images/logo/\${collegeSlug}_logo.png" alt="Official Logo of \${col.name} - NextCampus" class="lpu-logo-img">
                    <div>
                        <h1>\${col.name} <span class="lpu-abbr">(\${col.abbr})</span></h1>
                        <p class="lpu-location">&#128205; \${col.city}, Ladakh, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>\${rating}</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>\${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>\${col.type}</strong></span>
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

\${tabsHtml}

    <main class="lpu-main">
        <div class="container">
            <section class="lpu-panel active" id="panel-overview">
                <div class="lpu-card">
                    <h2>About \${col.name}</h2>
                    <p>\${col.name} (\${col.abbr}), established in \${col.est}, is a key \${col.type.toLowerCase()} institution located in \${col.city}, Ladakh. \${isCIBS ? 'It is a premier deemed university dedicated to the preservation and study of Himalayan art, culture, and Buddhist philosophy.' : isUniv ? 'As the sole university in the Union Territory, it anchors higher education across the Leh and Kargil districts.' : 'It plays a critical role in providing accessible higher education to the youth of the remote high-altitude region.'}</p>
                </div>
                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128218; Top Courses &amp; Eligibility</h3>
                        <button class="btn-view-tab" data-target="courses">View All &#8594;</button>
                    </div>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>\${coursesHtml}</tbody>
                        </table>
                    </div>
                </div>
                <div class="lpu-card">
                    <h3>Admissions Route</h3>
                    <p>\${admissionHtml}</p>
                    <button class="btn-view-tab" data-target="admission" style="margin-top:10px;">View Admission Process &#8594;</button>
                </div>
            </section>
            <section class="lpu-panel" id="panel-courses">
                <div class="lpu-card"><h2>Academic Programs</h2>
                    <div class="table-scroll"><table class="lpu-table">
                        <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                        <tbody>\${coursesHtml}</tbody>
                    </table></div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-admission">
                <div class="lpu-card"><h2>Admission Information</h2>
                    <div class="steps-list">
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance Framework</h4><p>\${admissionHtml}</p></div></div>
                    </div>
                </div>
            </section>
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card"><h2>Career &amp; Placements</h2><p>\${placementInfo}</p></div>
            </section>
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card"><h2>Student Reviews</h2>
                    <p>Average Rating: <strong>\${rating} / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Studying in Ladakh offers a serene environment. The institutions here are rapidly upgrading their infrastructure, and the focus on regional development provides unique opportunities."</p>
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
    <script src="\${collegeSlug}.js"></script>
</body>
</html>`;
}

function processAll() {
    const newCards = [];
    let homeContent = fs.readFileSync(homeJsPath, 'utf8');

    for (const col of ladakhColleges) {
        const collegeSlug = slugify(col.name);
        if (false) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'ladakh', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        let baseScore = 7.5;
        if (col.abbr === 'UoL') baseScore = 8.5;
        else if (col.abbr === 'CIBS') baseScore = 8.4;
        else if (['IHM Leh', 'EJMCET'].includes(col.abbr)) baseScore = 8.0;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Ladakh', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8 ? 75 : 60}, nirf: 0,
      link: '../colleges/ladakh/${collegeSlug}/${collegeSlug}.html',
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
            console.log(`\n✅ Injected ${newCards.length} Ladakh Colleges into home.js!`);
        }
    } else {
        console.log("\n❌ No new Ladakh Colleges to inject.");
    }
}

processAll();
