const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'frontend', 'colleges');
const lpuCssPath = path.join(basePath, 'lpu', 'lpu.css');
const homeJsPath = path.join(__dirname, 'frontend', 'home', 'home.js');

const gftis = [
    { slug: "aus", name: "Assam University", abbr: "AUS", city: "Silchar", state: "Assam", est: 1994, nirf: 0, qs: 0, campus: 600, students: 3000, programs: 40, rate: 65, high: "&#8377;15 LPA", avg: "&#8377;5-7 LPA", companies: 50, website: "http://www.aus.ac.in" },
    { slug: "bitmesra", name: "Birla Institute of Technology, Mesra", abbr: "BIT Mesra", city: "Ranchi", state: "Jharkhand", est: 1955, nirf: 53, qs: 0, campus: 780, students: 5000, programs: 50, rate: 85, high: "&#8377;51 LPA", avg: "&#8377;10-12 LPA", companies: 150, website: "https://www.bitmesra.ac.in" },
    { slug: "gkv", name: "Gurukula Kangri Vishwavidyalaya", abbr: "GKV", city: "Haridwar", state: "Uttarakhand", est: 1902, nirf: 0, qs: 0, campus: 200, students: 2000, programs: 25, rate: 60, high: "&#8377;12 LPA", avg: "&#8377;4-6 LPA", companies: 40, website: "https://www.gkv.ac.in" },
    { slug: "iitram", name: "Institute of Infrastructure, Tech, Research and Mgt", abbr: "IITRAM", city: "Ahmedabad", state: "Gujarat", est: 2012, nirf: 0, qs: 0, campus: 50, students: 1000, programs: 10, rate: 70, high: "&#8377;18 LPA", avg: "&#8377;5-7 LPA", companies: 50, website: "https://iitram.ac.in" },
    { slug: "ictmumbai", name: "Institute of Chemical Technology", abbr: "ICT", city: "Mumbai", state: "Maharashtra", est: 1933, nirf: 24, qs: 0, campus: 16, students: 2500, programs: 20, rate: 90, high: "&#8377;18 LPA", avg: "&#8377;7-9 LPA", companies: 100, website: "https://www.ictmumbai.edu.in" },
    { slug: "jmi", name: "Jamia Millia Islamia", abbr: "JMI", city: "New Delhi", state: "Delhi", est: 1920, nirf: 26, qs: 0, campus: 216, students: 18000, programs: 200, rate: 80, high: "&#8377;25 LPA", avg: "&#8377;8-10 LPA", companies: 100, website: "https://www.jmi.ac.in" },
    { slug: "sliet", name: "Sant Longowal Institute of Engineering and Tech", abbr: "SLIET", city: "Longowal", state: "Punjab", est: 1989, nirf: 0, qs: 0, campus: 451, students: 3000, programs: 30, rate: 70, high: "&#8377;18 LPA", avg: "&#8377;5-7 LPA", companies: 60, website: "http://sliet.ac.in" },
    { slug: "smvdu", name: "Shri Mata Vaishno Devi University", abbr: "SMVDU", city: "Katra", state: "J&K", est: 1999, nirf: 0, qs: 0, campus: 470, students: 2500, programs: 25, rate: 65, high: "&#8377;12 LPA", avg: "&#8377;4-6 LPA", companies: 50, website: "https://smvdu.ac.in" },
    { slug: "tezu", name: "Tezpur University", abbr: "TU", city: "Tezpur", state: "Assam", est: 1994, nirf: 0, qs: 0, campus: 262, students: 4000, programs: 35, rate: 65, high: "&#8377;15 LPA", avg: "&#8377;5-7 LPA", companies: 40, website: "http://www.tezu.ernet.in" },
    { slug: "pec", name: "Punjab Engineering College", abbr: "PEC", city: "Chandigarh", state: "Chandigarh", est: 1921, nirf: 0, qs: 0, campus: 146, students: 3500, programs: 20, rate: 85, high: "&#8377;83 LPA", avg: "&#8377;15 LPA", companies: 120, website: "https://pec.ac.in" },
    { slug: "uoh", name: "University of Hyderabad", abbr: "UoH", city: "Hyderabad", state: "Telangana", est: 1974, nirf: 71, qs: 0, campus: 2300, students: 5000, programs: 40, rate: 70, high: "&#8377;15 LPA", avg: "&#8377;6-8 LPA", companies: 80, website: "https://uohyd.ac.in" },
    { slug: "jnu", name: "Jawaharlal Nehru University", abbr: "JNU", city: "New Delhi", state: "Delhi", est: 1969, nirf: 2, qs: 0, campus: 1000, students: 8000, programs: 100, rate: 75, high: "&#8377;30 LPA", avg: "&#8377;8-10 LPA", companies: 90, website: "https://www.jnu.ac.in" },
    { slug: "mzu", name: "Mizoram University", abbr: "MZU", city: "Aizawl", state: "Mizoram", est: 2001, nirf: 0, qs: 0, campus: 978, students: 3000, programs: 30, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-6 LPA", companies: 30, website: "https://mzu.edu.in" },
    { slug: "spadelhi", name: "School of Planning and Architecture", abbr: "SPA Delhi", city: "New Delhi", state: "Delhi", est: 1941, nirf: 5, qs: 0, campus: 20, students: 1200, programs: 15, rate: 90, high: "&#8377;18 LPA", avg: "&#8377;7-9 LPA", companies: 50, website: "http://spa.ac.in" },
    { slug: "spabhopal", name: "School of Planning and Arch", abbr: "SPA Bhopal", city: "Bhopal", state: "Madhya Pradesh", est: 2008, nirf: 0, qs: 0, campus: 75, students: 800, programs: 10, rate: 85, high: "&#8377;15 LPA", avg: "&#8377;6-8 LPA", companies: 40, website: "http://spabhopal.ac.in" },
    { slug: "spav", name: "School of Planning and Arch", abbr: "SPAV", city: "Vijayawada", state: "Andhra Pradesh", est: 2008, nirf: 0, qs: 0, campus: 10, students: 800, programs: 10, rate: 85, high: "&#8377;15 LPA", avg: "&#8377;6-8 LPA", companies: 40, website: "https://www.spav.ac.in" },
    { slug: "curaj", name: "Central University of Rajasthan", abbr: "CURAJ", city: "Ajmer", state: "Rajasthan", est: 2009, nirf: 0, qs: 0, campus: 518, students: 3000, programs: 25, rate: 65, high: "&#8377;12 LPA", avg: "&#8377;4-6 LPA", companies: 40, website: "https://www.curaj.ac.in" },
    { slug: "amu", name: "Aligarh Muslim University", abbr: "AMU", city: "Aligarh", state: "Uttar Pradesh", est: 1920, nirf: 9, qs: 0, campus: 1155, students: 28000, programs: 300, rate: 70, high: "&#8377;16 LPA", avg: "&#8377;5-7 LPA", companies: 80, website: "https://www.amu.ac.in" },
    { slug: "hbtu", name: "Harcourt Butler Technical University", abbr: "HBTU", city: "Kanpur", state: "Uttar Pradesh", est: 1921, nirf: 0, qs: 0, campus: 277, students: 2500, programs: 15, rate: 80, high: "&#8377;44 LPA", avg: "&#8377;8-10 LPA", companies: 100, website: "http://hbtu.ac.in" },
    { slug: "iict-bh", name: "Indian Institute of Carpet Tech", abbr: "IICT", city: "Bhadohi", state: "Uttar Pradesh", est: 2001, nirf: 0, qs: 0, campus: 10, students: 200, programs: 2, rate: 85, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 20, website: "http://iict.ac.in" },
    { slug: "cuh", name: "Central University of Haryana", abbr: "CUH", city: "Mahendragarh", state: "Haryana", est: 2009, nirf: 0, qs: 0, campus: 488, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "http://www.cuh.ac.in" },
    { slug: "cujam", name: "Central University of Jammu", abbr: "CUJ", city: "Jammu", state: "J&K", est: 2011, nirf: 0, qs: 0, campus: 658, students: 2000, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://cujammu.ac.in" },
    { slug: "cujkd", name: "Central University of Jharkhand", abbr: "CUJ", city: "Ranchi", state: "Jharkhand", est: 2009, nirf: 0, qs: 0, campus: 45, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "http://cuj.ac.in" },
    { slug: "cukr", name: "Central University of Karnataka", abbr: "CUK", city: "Kalaburagi", state: "Karnataka", est: 2009, nirf: 0, qs: 0, campus: 654, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://www.cuk.ac.in" },
    { slug: "cupb", name: "Central University of Punjab", abbr: "CUP", city: "Bathinda", state: "Punjab", est: 2009, nirf: 0, qs: 0, campus: 500, students: 2000, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "http://cup.edu.in" },
    { slug: "cusb", name: "Central University of South Bihar", abbr: "CUSB", city: "Gaya", state: "Bihar", est: 2009, nirf: 0, qs: 0, campus: 300, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://www.cusb.ac.in" },
    { slug: "cutn", name: "Central University of Tamil Nadu", abbr: "CUTN", city: "Thiruvarur", state: "Tamil Nadu", est: 2009, nirf: 0, qs: 0, campus: 516, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://cutn.ac.in" },
    { slug: "cug", name: "Central University of Gujarat", abbr: "CUG", city: "Gandhinagar", state: "Gujarat", est: 2009, nirf: 0, qs: 0, campus: 100, students: 2000, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://www.cug.ac.in" },
    { slug: "cuap", name: "Central University of Andhra Pradesh", abbr: "CUAP", city: "Anantapur", state: "Andhra Pradesh", est: 2018, nirf: 0, qs: 0, campus: 491, students: 1000, programs: 10, rate: 50, high: "&#8377;8 LPA", avg: "&#8377;3-5 LPA", companies: 20, website: "https://cuap.ac.in" },
    { slug: "cuhp", name: "Central University of Himachal Pradesh", abbr: "CUHP", city: "Dharamshala", state: "Himachal Pradesh", est: 2009, nirf: 0, qs: 0, campus: 150, students: 2000, programs: 15, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "http://www.cuhimachal.ac.in" },
    { slug: "cuker", name: "Central University of Kerala", abbr: "CUK", city: "Kasaragod", state: "Kerala", est: 2009, nirf: 0, qs: 0, campus: 310, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://www.cukerala.ac.in" },
    { slug: "cuo", name: "Central University of Odisha", abbr: "CUO", city: "Koraput", state: "Odisha", est: 2009, nirf: 0, qs: 0, campus: 430, students: 2000, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "http://cuo.ac.in" },
    { slug: "cunag", name: "Central University of Nagaland", abbr: "NU", city: "Lumami", state: "Nagaland", est: 1989, nirf: 0, qs: 0, campus: 400, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://nagalanduniversity.ac.in" },
    { slug: "cutrip", name: "Central University of Tripura", abbr: "TU", city: "Suryamaninagar", state: "Tripura", est: 1987, nirf: 0, qs: 0, campus: 87, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://www.tripurauniv.ac.in" },
    { slug: "cuman", name: "Central University of Manipur", abbr: "MU", city: "Imphal", state: "Manipur", est: 1980, nirf: 0, qs: 0, campus: 287, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "http://www.manipuruniv.ac.in" },
    { slug: "cumeg", name: "Central University of Meghalaya", abbr: "NEHU", city: "Shillong", state: "Meghalaya", est: 1973, nirf: 0, qs: 0, campus: 1225, students: 3000, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://nehu.ac.in" },
    { slug: "cusik", name: "Central University of Sikkim", abbr: "SU", city: "Gangtok", state: "Sikkim", est: 2007, nirf: 0, qs: 0, campus: 300, students: 2000, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "https://cus.ac.in" },
    { slug: "cuwb", name: "Central University of West Bengal", abbr: "VB", city: "Santiniketan", state: "West Bengal", est: 1921, nirf: 0, qs: 0, campus: 1130, students: 2500, programs: 20, rate: 60, high: "&#8377;10 LPA", avg: "&#8377;4-5 LPA", companies: 30, website: "http://www.visvabharati.ac.in" },
    { slug: "culad", name: "Central University of Ladakh", abbr: "CUL", city: "Ladakh", state: "Ladakh", est: 2019, nirf: 0, qs: 0, campus: 100, students: 500, programs: 10, rate: 50, high: "&#8377;8 LPA", avg: "&#8377;3-5 LPA", companies: 20, website: "https://sindhucentraluniversity.ac.in" }
];

function generateHtml(col) {
    const nirfBadge = col.nirf > 0 ? `&#127942; NIRF #${col.nirf}` : `&#127942; Govt. Institute`;
    const nirfRow = col.nirf > 0 ? `<tr><td>NIRF</td><td><strong>#${col.nirf}</strong></td><td>2024</td></tr>` : `<tr><td>NIRF</td><td>Emerging / Unranked</td><td>2024</td></tr>`;
    const qsRow = col.qs > 0 ? `<tr><td>QS World Rankings</td><td>#${col.qs}</td><td>2025</td></tr>` : ``;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) — NextCampus</title>
    <meta name="description" content="Explore ${col.name} — courses, fees, placements, admissions, scholarships, and campus life. Apply now at NextCampus.">
    <link rel="icon" type="image/svg+xml" href="../../favicon/favicon.svg">
    <link rel="icon" type="image/png" sizes="96x96" href="../../favicon/favicon-96x96.png">
    <link rel="shortcut icon" href="../../favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="../../favicon/apple-touch-icon.png">
    <link rel="manifest" href="../../favicon/site.webmanifest">
    <meta name="theme-color" content="#0056D2">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../shared/global.css">
    <link rel="stylesheet" href="../../shared/header.css">
    <link rel="stylesheet" href="../../shared/footer.css">
    <link rel="stylesheet" href="../../shared/college.css">
    <link rel="stylesheet" href="${col.slug}.css">
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, ${col.state}</span>
            </div>
            <a href="${col.website}/" target="_blank" class="btn-lpu-apply">Apply Now &#8594;</a>
        </div>
    </div>

    <section class="lpu-hero" id="lpu-hero"
        style="background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url('images/cover/${col.slug}_cover.png'); background-size: cover; background-position: center;">
        <div class="container">
            <div class="lpu-hero-grid">
                <div class="lpu-hero-info">
                    <img src="images/logo/${col.slug}_logo.png" alt="${col.name} Logo" class="lpu-logo-img">
                    <div>
                        <h1>${col.name} <span class="lpu-abbr">(${col.abbr})</span></h1>
                        <p class="lpu-location">&#128205; ${col.city}, ${col.state}, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.0</strong>/5
                            <span class="review-count">(100+ reviews)</span>
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>Public (Govt.)</strong></span>
                            <span class="divider">|</span>
                            <span>Category: <strong>Govt. Funded</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">${nirfBadge}</span>
                            <span class="badge-accr">UGC</span>
                            <span class="badge-accr">AICTE</span>
                        </div>
                        <div class="lpu-ctas">
                            <a href="${col.website}/" target="_blank" class="btn-lpu-apply">Apply Now &#8594;</a>
                            <a href="#" class="btn-lpu-brochure" onclick="alert('Brochure download coming soon!');return false;">&#128196; Download Brochure</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <nav class="lpu-tabs-nav" id="lpu-tabs-nav">
        <div class="container">
            <div class="lpu-tabs" id="lpu-tabs">
                <button class="lpu-tab active" data-tab="overview">Overview</button>
                <button class="lpu-tab" data-tab="courses">Courses &amp; Fees</button>
                <button class="lpu-tab" data-tab="admission">Admission</button>
                <button class="lpu-tab" data-tab="fees">Fees &amp; Scholarships</button>
                <button class="lpu-tab" data-tab="placements">Placements</button>
                <button class="lpu-tab" data-tab="reviews">Reviews</button>
                <button class="lpu-tab" data-tab="gallery">Gallery</button>
            </div>
        </div>
    </nav>

    <main class="lpu-main">
        <div class="container">

            <section class="lpu-panel active" id="panel-overview">
                <div class="lpu-card">
                    <h2>About ${col.name}</h2>
                    <p>${col.name} (${col.abbr}) is a government-funded educational institution established in ${col.est}. Located in ${col.city}, ${col.state}, it is recognized for its academic standards, sprawling campus, and affordable education.</p>
                </div>

                <div class="lpu-card">
                    <h3>Key Highlights</h3>
                    <div class="highlights-grid">
                        <div class="highlight-item">
                            <div class="highlight-icon">&#127891;</div>
                            <div class="highlight-val">${col.students}+</div>
                            <div class="highlight-lbl">Students</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">&#128218;</div>
                            <div class="highlight-val">${col.programs}+</div>
                            <div class="highlight-lbl">Programs</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">&#127963;</div>
                            <div class="highlight-val">${col.campus}</div>
                            <div class="highlight-lbl">Acres Campus</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">&#128188;</div>
                            <div class="highlight-val">${col.rate}%+</div>
                            <div class="highlight-lbl">Placement Rate</div>
                        </div>
                    </div>
                </div>

                <div class="lpu-card">
                    <h3>Rankings & Accreditations</h3>
                    <div class="accreditation-list">
                        <div class="accr-badge"><strong>UGC</strong><span>University Grants Commission</span></div>
                        <div class="accr-badge"><strong>AICTE</strong><span>Technical Education</span></div>
                    </div>
                    <table class="lpu-table" style="margin-top:20px;">
                        <tbody>
                            ${nirfRow}
                            ${qsRow}
                        </tbody>
                    </table>
                </div>

                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128218; Popular Courses &amp; Fees</h3>
                        <button class="btn-view-tab" data-target="courses">View All &#8594;</button>
                    </div>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th></tr></thead>
                            <tbody>
                                <tr><td><strong>UG (B.Tech/BA/BSc/BCom)</strong></td><td>3-4 Years</td><td>&#8377;1L — &#8377;3L</td><td>10+2 & Entrance (CUET/JEE Main)</td></tr>
                                <tr><td><strong>PG (M.Tech/MA/MSc/MCom)</strong></td><td>2 Years</td><td>&#8377;50K — &#8377;1.5L</td><td>UG & Entrance (CUET PG/GATE)</td></tr>
                                <tr><td><strong>PhD</strong></td><td>3–6 Years</td><td>Nominal</td><td>PG Degree + Interview/NET</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128188; Placement Highlights</h3>
                        <button class="btn-view-tab" data-target="placements">View All &#8594;</button>
                    </div>
                    <div class="placement-stats">
                        <div class="p-stat-card"><div class="p-stat-val">${col.high}</div><div class="p-stat-lbl">Highest Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${col.avg}</div><div class="p-stat-lbl">Average Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${col.companies}+</div><div class="p-stat-lbl">Companies</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${col.rate}%+</div><div class="p-stat-lbl">Placement Rate</div></div>
                    </div>
                </div>

            </section>

            <!-- COURSES -->
            <section class="lpu-panel" id="panel-courses">
                <div class="lpu-card">
                    <h2>Courses &amp; Fees</h2>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>
                                <tr><td><strong>UG Degrees (B.Tech, BA, B.Sc)</strong></td><td>3-4 Years</td><td>&#8377;1L — &#8377;3L</td><td>10+2 + JEE Main/CUET</td><td><a href="${col.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>PG Degrees (M.Tech, MA, M.Sc)</strong></td><td>2 Years</td><td>&#8377;50K — &#8377;1.5L</td><td>Batchelor's + GATE/CUET PG</td><td><a href="${col.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>PhD</strong></td><td>3–6 Years</td><td>Nominal</td><td>PG Degree + NET/GATE</td><td><a href="${col.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- ADMISSION -->
            <section class="lpu-panel" id="panel-admission">
                <div class="lpu-card">
                    <h2>Admission Process</h2>
                    <div class="steps-list">
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Entrance Exam</h4><p>Appear for CUET UG/PG, JEE Main, GATE, or University Entrance.</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling</h4><p>Register online for university counselling or JoSAA/CSAB (for engineering).</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Pay fee online to confirm seat.</p></div></div>
                        <div class="step-item"><div class="step-num">4</div><div><h4>Physical Verification</h4><p>Report to campus with original documents.</p></div></div>
                    </div>
                </div>
            </section>

            <!-- FEES -->
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Government funded institutions generally offer structured financial aid through National Scholarship Portal (NSP), fee waivers for SC/ST students, and merit-cum-means scholarships.</p>
                </div>
            </section>

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Placement Highlights</h2>
                    <div class="placement-stats">
                        <div class="p-stat-card"><div class="p-stat-val">${col.high}</div><div class="p-stat-lbl">Highest Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${col.avg}</div><div class="p-stat-lbl">Avg Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${col.companies}+</div><div class="p-stat-lbl">Companies</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${col.rate}%+</div><div class="p-stat-lbl">Placement Rate</div></div>
                    </div>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Students highlight the sprawling green campus, highly experienced government faculty, and affordability as the key strengths of ${col.name}.</p>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Admin Block</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Central Library</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels</span></div>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <div class="mobile-apply-bar" id="mobile-apply-bar">
        <a href="${col.website}/" target="_blank" class="btn-lpu-apply mobile-apply-btn">Apply Now &#8594;</a>
    </div>

    <script src="../../shared/header.js"></script>
    <script src="../../shared/footer.js"></script>
    <script src="${col.slug}.js"></script>
</body>
</html>`;
}

function generateJs(col) {
    return `/* ${col.name} (${col.abbr}) JS */
document.addEventListener('DOMContentLoaded', () => { setupTabs(); setupStickyHeader(); setupMobileApplyBar(); });
function setupTabs() {
    const tabs = document.querySelectorAll('.lpu-tab');
    const panels = document.querySelectorAll('.lpu-panel');
    function switchTab(n) {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        const t = [...tabs].find(t => t.dataset.tab === n);
        if (t) t.classList.add('active');
        const p = document.getElementById('panel-' + n);
        if (p) { p.classList.add('active'); p.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
    tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
    document.querySelectorAll('.btn-view-tab').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));
}
function setupStickyHeader() {
    const s = document.getElementById('lpu-sticky-header');
    const h = document.getElementById('lpu-hero');
    const n = document.getElementById('lpu-tabs-nav');
    if (!s || !h) return;
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        if (scrollY > h.offsetTop + h.offsetHeight) { s.classList.add('visible'); if (n) n.style.top = s.offsetHeight + 'px'; }
        else { s.classList.remove('visible'); if (n) n.style.top = '0px'; }
    }, { passive: true });
}
function setupMobileApplyBar() {
    const b = document.getElementById('mobile-apply-bar');
    if (!b) return;
    window.addEventListener('scroll', () => { if (window.innerWidth <= 768) b.style.display = window.pageYOffset > 300 ? 'block' : 'none'; }, { passive: true });
}
`;
}

function processAll() {
    const newCards = [];

    for (const col of gftis) {
        const dir = path.join(basePath, col.slug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        fs.writeFileSync(path.join(dir, col.slug + '.css'), getFullCss());

        fs.writeFileSync(path.join(dir, col.slug + '.html'), generateHtml(col), 'utf8');
        fs.writeFileSync(path.join(dir, col.slug + '.js'), generateJs(col), 'utf8');

        console.log(`Generated: ${col.name} (${col.slug})`);

        const score = "8.8"; // Default score for display
        const cardStr = `    {
      name: '${col.name} (${col.abbr})',
      city: '${col.city}', state: '${col.state}', type: 'Government',
      score: ${score}, totalFees: '&#8377;1L — 3L', avgPackage: '${col.avg}',
      placementRate: ${col.rate}, nirf: ${col.nirf},
      link: '../colleges/${col.slug}/${col.slug}.html',
      rating: '4.0', accr: '${col.nirf > 0 ? "NIRF #" + col.nirf : "Govt. Approv"}'
    }`;
        newCards.push(cardStr);
    }

    let homeContent = fs.readFileSync(homeJsPath, 'utf8');
    const injectToken = "const colleges = [";
    const injectionPoint = homeContent.indexOf(injectToken);

    if (injectionPoint !== -1) {
        const startOfArray = injectionPoint + injectToken.length;
        homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
        fs.writeFileSync(homeJsPath, homeContent, 'utf8');
        console.log(`\n✅ Injected ${gftis.length} GFTIs into home.js !`);
    } else {
        console.log("\n❌ Could not find injection point in home.js.");
    }
}

processAll();

