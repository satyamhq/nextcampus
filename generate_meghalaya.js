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

const meghalayaColleges = [
    // Top Universities & National Institutes
    { name: "North Eastern Hill University", abbr: "NEHU", city: "Shillong", type: "Central", est: 1973, category: "Multidisciplinary" },
    { name: "Indian Institute of Management Shillong", abbr: "IIM Shillong", city: "Shillong", type: "Government", est: 2007, category: "Management" },
    { name: "National Institute of Technology Meghalaya", abbr: "NIT Meghalaya", city: "Shillong", type: "Government", est: 2010, category: "Engineering" },
    { name: "University of Science and Technology Meghalaya", abbr: "USTM", city: "Ri Bhoi", type: "Private", est: 2008, category: "Multidisciplinary" },
    { name: "Martin Luther Christian University", abbr: "MLCU", city: "Shillong", type: "Private", est: 2005, category: "Multidisciplinary" },
    { name: "CMJ University", abbr: "CMJU", city: "Ri Bhoi", type: "Private", est: 2009, category: "Multidisciplinary" },
    { name: "William Carey University Meghalaya", abbr: "WCU", city: "Shillong", type: "Private", est: 2005, category: "Multidisciplinary" },

    // Top Government Colleges
    { name: "St Edmund's College Shillong", abbr: "St. Edmund's", city: "Shillong", type: "Government Aided", est: 1924, category: "Arts & Science" },
    { name: "St Anthony's College Shillong", abbr: "St. Anthony's", city: "Shillong", type: "Government Aided", est: 1934, category: "Arts & Science" },
    { name: "Shillong College", abbr: "Shillong College", city: "Shillong", type: "Government Aided", est: 1956, category: "Arts & Science" },
    { name: "Tura Government College", abbr: "Tura GC", city: "Tura", type: "Government", est: 1958, category: "Arts & Science" },
    { name: "Kiang Nangbah Government College", abbr: "KNGC", city: "Jowai", type: "Government", est: 1967, category: "Arts & Science" },
    { name: "Ri Bhoi College Nongpoh", abbr: "Ri Bhoi College", city: "Nongpoh", type: "Government Aided", est: 1984, category: "Arts & Science" },
    { name: "Seng Khasi College Shillong", abbr: "Seng Khasi", city: "Shillong", type: "Government Aided", est: 1973, category: "Arts & Science" },

    // Top Private Colleges
    { name: "Don Bosco College Shillong", abbr: "DBC Shillong", city: "Shillong", type: "Private", est: 2016, category: "Arts & Science" },
    { name: "Don Bosco College Tura", abbr: "DBC Tura", city: "Tura", type: "Private", est: 1987, category: "Arts & Science" },
    { name: "Lady Keane College Shillong", abbr: "Lady Keane", city: "Shillong", type: "Private (Women)", est: 1935, category: "Arts & Science" },
    { name: "Synod College Shillong", abbr: "Synod College", city: "Shillong", type: "Private", est: 1965, category: "Arts & Science" },
    { name: "Union Christian College Meghalaya", abbr: "UCC Meghalaya", city: "Umiam", type: "Private", est: 1952, category: "Arts & Science" },

    // Other Notable Colleges
    { name: "Capt Williamson Sangma College", abbr: "CWSC", city: "Baghmara", type: "Government", est: 1994, category: "Arts & Science" },
    { name: "Nongstoin College", abbr: "Nongstoin College", city: "Nongstoin", type: "Government Aided", est: 1978, category: "Arts & Science" },
    { name: "Baghmara College", abbr: "Baghmara College", city: "Baghmara", type: "Government", est: 1994, category: "Arts & Science" },
    { name: "Mendipathar College", abbr: "Mendipathar C", city: "Mendipathar", type: "Government Aided", est: 1971, category: "Arts & Science" },
    { name: "Ampati College", abbr: "Ampati College", city: "Ampati", type: "Government Aided", est: 1980, category: "Arts & Science" },
    { name: "Williamnagar College", abbr: "Williamnagar C", city: "Williamnagar", type: "Government", est: 2000, category: "Arts & Science" },
    { name: "Tirot Sing Memorial College", abbr: "TSMC", city: "Mairang", type: "Government Aided", est: 1981, category: "Arts & Science" },
    { name: "Shangpung College", abbr: "Shangpung College", city: "Shangpung", type: "Private", est: 1999, category: "Arts & Science" },
    { name: "Umsning College", abbr: "Umsning College", city: "Umsning", type: "Private", est: 1990, category: "Arts & Science" },
    { name: "Mawlai Presbyterian College", abbr: "Mawlai Presby", city: "Shillong", type: "Private", est: 2002, category: "Arts & Science" },

    // More Colleges
    { name: "North East Adventist College", abbr: "NEAC", city: "Jowai", type: "Private", est: 1941, category: "Arts & Science" },
    { name: "Bosco College of Teacher Education", abbr: "BCTE", city: "Dimapur", type: "Private", est: 2003, category: "Education" },
    { name: "St Mary's College Shillong", abbr: "St. Mary's", city: "Shillong", type: "Private (Women)", est: 1937, category: "Arts & Science" },
    { name: "KJP Synod Mihngi College", abbr: "KJP Synod", city: "Jowai", type: "Private", est: 1999, category: "Arts & Science" },
    { name: "Pine Mount College Shillong", abbr: "Pine Mount", city: "Shillong", type: "Government", est: 1900, category: "Arts & Science" },
    { name: "College of Community Science Meghalaya", abbr: "CCSM", city: "Tura", type: "Central", est: 2004, category: "Agriculture/Science" },
    { name: "Government Polytechnic Shillong", abbr: "GP Shillong", city: "Shillong", type: "Government", est: 1965, category: "Engineering" },
    { name: "Government Polytechnic Tura", abbr: "GP Tura", city: "Tura", type: "Government", est: 2012, category: "Engineering" },
    { name: "Meghalaya Institute of Entrepreneurship", abbr: "MIE", city: "Shillong", type: "Government", est: 2011, category: "Management" },
    { name: "Meghalaya Institute of Hotel Management", abbr: "MIHM", city: "Shillong", type: "Private", est: 2010, category: "Management" }
];

function generateHtml(col, collegeSlug) {
    const isIIM = col.abbr === 'IIM Shillong';
    const isNIT = col.abbr === 'NIT Meghalaya';
    const isNEHU = col.abbr === 'NEHU';
    const isPoly = col.name.includes('Polytechnic');
    const isArtsScience = col.category === 'Arts & Science';
    const isHotelMgmt = col.abbr === 'MIHM';
    const isCommScience = col.abbr === 'CCSM';

    let coursesHtml = '', admissionHtml = '', placementInfo = '';

    if (isIIM) {
        coursesHtml = `<tr><td><strong>PGP (MBA) / PGPEX</strong></td><td>2 / 1 Years</td><td>₹15L — ₹25L</td><td>Bachelor's + CAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                       <tr><td><strong>PhD</strong></td><td>4-5 Years</td><td>Full Fellowship</td><td>Master's + CAT / JRF</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'IIM Shillong admits via the highly competitive Common Admission Test (CAT) conducted by the IIMs. It follows the standard IIM interview (WAT/PI) shortlisting criteria emphasizing diversity and academic consistency.';
        placementInfo = 'As the premier management institute in the Northeast, IIM Shillong records 100% placements across consulting (McKinsey, Bain, BCG), investment banking (Goldman Sachs, JPMC), FMCG, and IT consulting with average packages exceeding ₹25 LPA.';
    } else if (isNIT) {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>₹5L — ₹6L</td><td>10+2 PCM + JEE Main (JoSAA)</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                       <tr><td><strong>M.Tech / MSc</strong></td><td>2 Years</td><td>₹1.5L — ₹2L</td><td>B.Tech / BSc + GATE / JAM</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Admissions to B.Tech are via JEE Main followed by JoSAA and CSAB counseling. 50% of seats are reserved for Home State (Meghalaya) domicile candidates under the NIT Act.';
        placementInfo = 'NIT Meghalaya attracts top IT engineering recruiters, PSU infrastructure firms, and core manufacturing companies. The strong emphasis on Computer Science and ECE sees average placement packages around ₹10-12 LPA.';
    } else if (isNEHU) {
        coursesHtml = `<tr><td><strong>B.Tech / BA LLB / BA / BSc</strong></td><td>4 / 5 / 3 Years</td><td>₹10K — ₹1L</td><td>10+2 / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                       <tr><td><strong>MA / MSc / MCom / MBA</strong></td><td>2 Years</td><td>₹15K — ₹60K</td><td>Bachelor's + CUET PG / NEHU Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'North Eastern Hill University (NEHU) is the premier Central University of Meghalaya. Admissions are primarily through CUET UG/PG. Professional courses like B.Tech might require JEE Main or institutional entrance tests.';
        placementInfo = 'NEHU graduates serve prominently in Meghalaya Civil Services, state education departments, regional rural banking, specialized Northeast development councils, and extensive regional NGOs tracking biodiversity and culture.';
    } else if (isPoly) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering</strong></td><td>3 Years</td><td>₹5K — ₹20K</td><td>10th Pass (SSLC) Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Admissions are handled by the Directorate of Higher & Technical Education (DHTE), Meghalaya, based on 10th standard board (MBOSE) marks. Strong preference for state domiciles.';
        placementInfo = 'Diploma engineers immediately fill technical posts in the Meghalaya Energy Corporation Limited (MeECL), PWD, PHE, and the expanding hospitality infrastructure and construction sectors across Shillong and Tura.';
    } else if (isHotelMgmt) {
        coursesHtml = `<tr><td><strong>BSc / Diploma in Hotel Management</strong></td><td>3 / 1 Years</td><td>₹1L — ₹3L</td><td>10+2 Merit / Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Admissions are conducted through direct merit screening based on 10+2 marks and personal interviews focusing on hospitality aptitude and communication skills.';
        placementInfo = 'Graduates feed the booming eco-tourism and luxury resort market across Cherrapunji, Dawki, and Shillong, with many also placing in international hotel chains across India.';
    } else if (isCommScience) {
        coursesHtml = `<tr><td><strong>BSc (Honours) Community Science</strong></td><td>4 Years</td><td>₹30K — ₹50K</td><td>10+2 PCB / PCM + ICAR AIEEA</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = 'Affiliated to Central Agricultural University, admissions are strictly through ICAR AIEEA UG scores. Focuses on nutrition, textiles, and extension education.';
        placementInfo = 'Graduates are absorbed into regional agricultural extension programs, food safety standards departments, and rural livelihood missions (NRLM) funded by the central government.';
    } else {
        // Arts & Science / Private Universities / Degree Colleges
        coursesHtml = `<tr><td><strong>BA / BSc / BCom</strong></td><td>3 Years</td><td>₹5K — ₹30K</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                       <tr><td><strong>MA / MSc / MCom</strong></td><td>2 Years</td><td>₹15K — ₹50K</td><td>Bachelor's + Institutional Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.type.includes('Private') && col.category.includes('Multidisciplinary')
            ? 'Private Universities like USTM and MLCU conduct their own institutional entrance exams or admit based on merit and CUET scores. They offer a diverse range of new-age programs.'
            : 'Admissions for undergraduate programs in government and aided degree colleges are typically merit-based based on Class 12 board marks (MBOSE, CBSE, ICSE), with many colleges adopting CUET gradually under NEHU affiliation.';
        placementInfo = col.abbr === "St. Anthony's" || col.abbr === "St. Edmund's"
            ? 'These historically prestigious missionary colleges have strong national alumni networks. Graduates frequently crack central and state civil services, join top-tier postgraduate programs at DU/JNU, and secure campus placements in regional banking and IT operations.'
            : 'Graduates form the backbone of Meghalaya’s local administration, banking sector (SBI, Meghalaya Rural Bank), teaching cadre, and the rapidly growing eco-tourism entrepreneurship ecosystem.';
    }

    const tabsHtml = getTabsHtml(col.category);
    const rating = (['IIM Shillong', 'NIT Meghalaya', 'NEHU', "St. Anthony's", "St. Edmund's"].includes(col.abbr)) ? '4.6' : '4.1';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${col.name} (\${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore \${col.name} admissions 2026, courses, fee structure and campus life in Meghalaya. Verified details at NextCampus.">
    <meta name="keywords" content="\${col.name}, \${col.abbr}, Meghalaya Colleges, NEHU, \${col.city} Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/meghalaya/\${collegeSlug}/\${collegeSlug}.html" }
    </script>
</head>
<body>
    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">\${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; \${col.city}, ML</span>
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
                        <p class="lpu-location">&#128205; \${col.city}, Meghalaya, India</p>
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
                    <p>\${col.name} (\${col.abbr}), established in \${col.est}, is a key \${col.type.toLowerCase()} institution located in \${col.city}, Meghalaya. \${isIIM ? 'Known as the Campus in the Clouds, it is one of the premier management institutes in the country.' : isNIT ? 'It is a prestigious Institute of National Importance steering engineering research in the Northeast.' : isNEHU ? 'As the state\\'s central university, it forms the academic foundation for higher education across Meghalaya.' : 'It plays a critical role in providing accessible quality higher education and fostering the rich cultural heritage of the Khasi, Jaintia, and Garo communities.'}</p>
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
                        <p>"Shillong is widely regarded as the educational capital of the Northeast. The environment is unparalleled, the legacy of missionary education is strong, and institutions here truly nurture holistic development."</p>
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

    for (const col of meghalayaColleges) {
        const collegeSlug = slugify(col.name);
        if (false) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'meghalaya', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, collegeSlug), 'utf8');

        let baseScore = 7.7;
        if (['IIM Shillong', 'NIT Meghalaya', 'NEHU'].includes(col.abbr)) baseScore = 9.2;
        else if (['USTM', "St. Anthony's", "St. Edmund's"].includes(col.abbr)) baseScore = 8.6;
        else if (['MLCU', 'Lady Keane', 'Shillong College', 'DBC Shillong'].includes(col.abbr)) baseScore = 8.2;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Meghalaya', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 80 : 65}, nirf: 0,
      link: '../colleges/meghalaya/${collegeSlug}/${collegeSlug}.html',
      rating: '${baseScore >= 8.5 ? "4.6" : "4.1"}', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} Meghalaya Colleges into home.js!`);
        }
    } else {
        console.log("\n❌ No new Meghalaya Colleges to inject.");
    }
}

processAll();
