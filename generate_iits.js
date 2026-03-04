const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'frontend', 'colleges');
const lpuCssPath = path.join(basePath, 'lpu', 'lpu.css');
const homeJsPath = path.join(__dirname, 'frontend', 'home', 'home.js');

const iits = [
    { slug: "iitd", name: "IIT Delhi", abbr: "IITD", city: "New Delhi", state: "Delhi", est: 1961, nirf: 2, qs: 150, campus: 325, students: 10000, programs: 65, rate: 92, high: "&#8377;2 Cr+", avg: "&#8377;20-25 LPA", companies: 400, website: "https://home.iitd.ac.in" },
    { slug: "iitk", name: "IIT Kanpur", abbr: "IITK", city: "Kanpur", state: "Uttar Pradesh", est: 1959, nirf: 4, qs: 278, campus: 1055, students: 8500, programs: 60, rate: 90, high: "&#8377;1.5 Cr+", avg: "&#8377;18-22 LPA", companies: 350, website: "https://www.iitk.ac.in" },
    { slug: "iitkgp", name: "IIT Kharagpur", abbr: "IIT KGP", city: "Kharagpur", state: "West Bengal", est: 1951, nirf: 5, qs: 271, campus: 2100, students: 22000, programs: 100, rate: 88, high: "&#8377;1.5 Cr+", avg: "&#8377;16-20 LPA", companies: 450, website: "https://www.iitkgp.ac.in" },
    { slug: "iitr", name: "IIT Roorkee", abbr: "IITR", city: "Roorkee", state: "Uttarakhand", est: 1847, nirf: 6, qs: 369, campus: 365, students: 10000, programs: 70, rate: 88, high: "&#8377;1 Cr+", avg: "&#8377;15-18 LPA", companies: 350, website: "https://www.iitr.ac.in" },
    { slug: "iitg", name: "IIT Guwahati", abbr: "IITG", city: "Guwahati", state: "Assam", est: 1994, nirf: 7, qs: 395, campus: 285, students: 7000, programs: 55, rate: 87, high: "&#8377;1 Cr+", avg: "&#8377;14-18 LPA", companies: 300, website: "https://www.iitg.ac.in" },
    { slug: "iith", name: "IIT Hyderabad", abbr: "IITH", city: "Hyderabad", state: "Telangana", est: 2008, nirf: 8, qs: 601, campus: 576, students: 5000, programs: 40, rate: 85, high: "&#8377;80 LPA", avg: "&#8377;14-18 LPA", companies: 200, website: "https://iith.ac.in" },
    { slug: "iitbhu", name: "IIT (BHU) Varanasi", abbr: "IIT BHU", city: "Varanasi", state: "Uttar Pradesh", est: 2012, nirf: 10, qs: 801, campus: 1350, students: 6500, programs: 50, rate: 85, high: "&#8377;70 LPA", avg: "&#8377;12-16 LPA", companies: 250, website: "https://iitbhu.ac.in" },
    { slug: "iiti", name: "IIT Indore", abbr: "IITI", city: "Indore", state: "Madhya Pradesh", est: 2009, nirf: 11, qs: 801, campus: 510, students: 3500, programs: 30, rate: 88, high: "&#8377;60 LPA", avg: "&#8377;14-17 LPA", companies: 180, website: "https://www.iiti.ac.in" },
    { slug: "iitism", name: "IIT (ISM) Dhanbad", abbr: "IIT ISM", city: "Dhanbad", state: "Jharkhand", est: 1926, nirf: 19, qs: 1001, campus: 218, students: 8000, programs: 60, rate: 82, high: "&#8377;50 LPA", avg: "&#8377;10-14 LPA", companies: 200, website: "https://www.iitism.ac.in" },
    { slug: "iitgn", name: "IIT Gandhinagar", abbr: "IITGN", city: "Gandhinagar", state: "Gujarat", est: 2008, nirf: 18, qs: 801, campus: 400, students: 2500, programs: 25, rate: 86, high: "&#8377;60 LPA", avg: "&#8377;13-16 LPA", companies: 150, website: "https://www.iitgn.ac.in" },
    { slug: "iitj", name: "IIT Jodhpur", abbr: "IITJ", city: "Jodhpur", state: "Rajasthan", est: 2008, nirf: 35, qs: 1001, campus: 852, students: 2800, programs: 25, rate: 80, high: "&#8377;50 LPA", avg: "&#8377;10-14 LPA", companies: 130, website: "https://iitj.ac.in" },
    { slug: "iitp", name: "IIT Patna", abbr: "IITP", city: "Patna", state: "Bihar", est: 2008, nirf: 43, qs: 1001, campus: 501, students: 2500, programs: 22, rate: 80, high: "&#8377;45 LPA", avg: "&#8377;10-13 LPA", companies: 120, website: "https://www.iitp.ac.in" },
    { slug: "iitbbs", name: "IIT Bhubaneswar", abbr: "IITBBS", city: "Bhubaneswar", state: "Odisha", est: 2008, nirf: 45, qs: 1001, campus: 936, students: 2500, programs: 22, rate: 80, high: "&#8377;45 LPA", avg: "&#8377;10-13 LPA", companies: 120, website: "https://www.iitbbs.ac.in" },
    { slug: "iitmandi", name: "IIT Mandi", abbr: "IIT Mandi", city: "Mandi", state: "Himachal Pradesh", est: 2009, nirf: 50, qs: 1001, campus: 529, students: 2000, programs: 20, rate: 78, high: "&#8377;40 LPA", avg: "&#8377;9-12 LPA", companies: 100, website: "https://www.iitmandi.ac.in" },
    { slug: "iitropar", name: "IIT Ropar", abbr: "IIT Ropar", city: "Rupnagar", state: "Punjab", est: 2008, nirf: 50, qs: 1001, campus: 501, students: 2000, programs: 20, rate: 78, high: "&#8377;42 LPA", avg: "&#8377;9-12 LPA", companies: 100, website: "https://www.iitrpr.ac.in" },
    { slug: "iitpkd", name: "IIT Palakkad", abbr: "IITPKD", city: "Palakkad", state: "Kerala", est: 2015, nirf: 0, qs: 0, campus: 600, students: 1500, programs: 15, rate: 76, high: "&#8377;35 LPA", avg: "&#8377;8-11 LPA", companies: 80, website: "https://iitpkd.ac.in" },
    { slug: "iittirupati", name: "IIT Tirupati", abbr: "IITTP", city: "Tirupati", state: "Andhra Pradesh", est: 2015, nirf: 0, qs: 0, campus: 543, students: 1500, programs: 15, rate: 76, high: "&#8377;35 LPA", avg: "&#8377;8-11 LPA", companies: 80, website: "https://iittp.ac.in" },
    { slug: "iitbhilai", name: "IIT Bhilai", abbr: "IIT Bhilai", city: "Bhilai", state: "Chhattisgarh", est: 2016, nirf: 0, qs: 0, campus: 446, students: 1200, programs: 12, rate: 74, high: "&#8377;30 LPA", avg: "&#8377;7-10 LPA", companies: 60, website: "https://www.iitbhilai.ac.in" },
    { slug: "iitgoa", name: "IIT Goa", abbr: "IIT Goa", city: "Ponda", state: "Goa", est: 2016, nirf: 0, qs: 0, campus: 250, students: 1200, programs: 12, rate: 74, high: "&#8377;30 LPA", avg: "&#8377;7-10 LPA", companies: 60, website: "https://www.iitgoa.ac.in" },
    { slug: "iitjammu", name: "IIT Jammu", abbr: "IIT Jammu", city: "Jammu", state: "Jammu & Kashmir", est: 2016, nirf: 0, qs: 0, campus: 450, students: 1200, programs: 12, rate: 74, high: "&#8377;30 LPA", avg: "&#8377;7-10 LPA", companies: 60, website: "https://www.iitjammu.ac.in" },
    { slug: "iitdharwad", name: "IIT Dharwad", abbr: "IIT DWD", city: "Dharwad", state: "Karnataka", est: 2016, nirf: 0, qs: 0, campus: 470, students: 1200, programs: 12, rate: 74, high: "&#8377;30 LPA", avg: "&#8377;7-10 LPA", companies: 60, website: "https://www.iitdh.ac.in" }
];

function generateHtml(iit) {
    const nirfBadge = iit.nirf > 0 ? `&#127942; NIRF #${iit.nirf}` : `&#127942; New IIT`;
    const nirfRow = iit.nirf > 0 ? `<tr><td>NIRF (Engineering)</td><td><strong>#${iit.nirf}</strong></td><td>2024</td></tr>` : `<tr><td>NIRF</td><td>Emerging</td><td>2024</td></tr>`;
    const qsRow = iit.qs > 0 ? `<tr><td>QS World Rankings</td><td>#${iit.qs}</td><td>2025</td></tr>` : ``;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${iit.name} (${iit.abbr}) — NextCampus</title>
    <meta name="description" content="Explore ${iit.name} — courses, fees, placements, admissions, scholarships, and campus life. Apply now at NextCampus.">
    <meta name="keywords" content="${iit.name}, ${iit.abbr}, ${iit.abbr} admissions, ${iit.abbr} fees, ${iit.abbr} placements, JEE Advanced, IIT, NextCampus">
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
    <link rel="stylesheet" href="${iit.slug}.css">
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${iit.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${iit.city}, ${iit.state}</span>
            </div>
            <a href="${iit.website}/" target="_blank" class="btn-lpu-apply">Apply Now &#8594;</a>
        </div>
    </div>

    <section class="lpu-hero" id="lpu-hero"
        style="background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url('images/cover/${iit.slug}_cover.png'); background-size: cover; background-position: center;">
        <div class="container">
            <div class="lpu-hero-grid">
                <div class="lpu-hero-info">
                    <img src="images/logo/${iit.slug}_logo.png" alt="${iit.name} Logo" class="lpu-logo-img">
                    <div>
                        <h1>${iit.name} <span class="lpu-abbr">(${iit.abbr})</span></h1>
                        <p class="lpu-location">&#128205; ${iit.city}, ${iit.state}, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.5</strong>/5
                            <span class="review-count">(500+ reviews)</span>
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${iit.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>Public (Govt.)</strong></span>
                            <span class="divider">|</span>
                            <span>Status: <strong>Institute of National Importance</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">${nirfBadge}</span>
                            <span class="badge-accr">UGC</span>
                            <span class="badge-accr">AICTE</span>
                        </div>
                        <div class="lpu-ctas">
                            <a href="${iit.website}/" target="_blank" class="btn-lpu-apply">Apply Now &#8594;</a>
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

            <!-- OVERVIEW -->
            <section class="lpu-panel active" id="panel-overview">
                <div class="lpu-card">
                    <h2>About ${iit.name}</h2>
                    <p>${iit.name} (${iit.abbr}) is one of India's premier engineering institutions, established in ${iit.est} as an Institute of National Importance by the Government of India. Located in ${iit.city}, ${iit.state}, ${iit.abbr} is recognized for its research excellence, academic rigor, and strong industry connections.</p>
                    <p>The institute spans a ${iit.campus}-acre campus and offers programs across engineering, science, management, and humanities. With a dedicated placement cell and strong alumni network, ${iit.abbr} consistently delivers excellent career outcomes for its graduates.</p>
                </div>

                <div class="lpu-card">
                    <h3>Key Highlights</h3>
                    <div class="highlights-grid">
                        <div class="highlight-item">
                            <div class="highlight-icon">&#127891;</div>
                            <div class="highlight-val">${iit.students}+</div>
                            <div class="highlight-lbl">Students</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">&#128218;</div>
                            <div class="highlight-val">${iit.programs}+</div>
                            <div class="highlight-lbl">Programs</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">&#127963;</div>
                            <div class="highlight-val">${iit.campus}</div>
                            <div class="highlight-lbl">Acres Campus</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">&#128188;</div>
                            <div class="highlight-val">${iit.rate}%+</div>
                            <div class="highlight-lbl">Placement Rate</div>
                        </div>
                    </div>
                </div>

                <div class="lpu-card">
                    <h3>Accreditations &amp; Approvals</h3>
                    <div class="accreditation-list">
                        <div class="accr-badge"><strong>UGC</strong><span>University Grants Commission</span></div>
                        <div class="accr-badge"><strong>AICTE</strong><span>Technical Education</span></div>
                        <div class="accr-badge"><strong>NBA</strong><span>Accredited Programs</span></div>
                        <div class="accr-badge"><strong>Govt. of India</strong><span>National Importance</span></div>
                    </div>
                </div>

                <div class="lpu-card">
                    <h3>Rankings</h3>
                    <table class="lpu-table">
                        <thead><tr><th>Ranking Body</th><th>Rank</th><th>Year</th></tr></thead>
                        <tbody>
                            ${nirfRow}
                            ${qsRow}
                            <tr><td>Institute of National Importance</td><td>Govt. of India</td><td>Ongoing</td></tr>
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
                                <tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>&#8377;8L — &#8377;10L</td><td>JEE Advanced + 10+2 PCM</td></tr>
                                <tr><td><strong>Dual Degree</strong></td><td>5 Years</td><td>&#8377;10L — &#8377;12L</td><td>JEE Advanced + 10+2 PCM</td></tr>
                                <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>&#8377;2L — &#8377;3.5L</td><td>B.Tech + GATE</td></tr>
                                <tr><td><strong>PhD</strong></td><td>3–6 Years</td><td>Nominal + Stipend</td><td>PG Degree + Interview</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128221; Admission Process</h3>
                        <button class="btn-view-tab" data-target="admission">View All &#8594;</button>
                    </div>
                    <div class="overview-steps">
                        <div class="overview-step"><div class="step-num">1</div><div><h4>Qualify JEE Advanced / GATE</h4><p>Clear the relevant national entrance exam.</p></div></div>
                        <div class="overview-step"><div class="step-num">2</div><div><h4>JoSAA / CCMT Counselling</h4><p>Register and participate in seat allotment.</p></div></div>
                        <div class="overview-step"><div class="step-num">3</div><div><h4>Document Verification</h4><p>Report to campus with original documents.</p></div></div>
                        <div class="overview-step"><div class="step-num">4</div><div><h4>Fee Payment &amp; Enrollment</h4><p>Pay fees and confirm your enrollment.</p></div></div>
                    </div>
                    <div style="margin-top:20px;"><a href="${iit.website}/" target="_blank" class="btn-lpu-apply">View Admissions &#8594;</a></div>
                </div>

                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128188; Placement Highlights</h3>
                        <button class="btn-view-tab" data-target="placements">View All &#8594;</button>
                    </div>
                    <div class="placement-stats">
                        <div class="p-stat-card"><div class="p-stat-val">${iit.high}</div><div class="p-stat-lbl">Highest Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${iit.avg}</div><div class="p-stat-lbl">Average Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${iit.companies}+</div><div class="p-stat-lbl">Companies</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${iit.rate}%+</div><div class="p-stat-lbl">Placement Rate</div></div>
                    </div>
                </div>

                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128176; Fees &amp; Scholarships</h3>
                        <button class="btn-view-tab" data-target="fees">View All &#8594;</button>
                    </div>
                    <div class="overview-scholarship-summary">
                        <div class="scholarship-item-mini"><strong>&#127942; Merit-cum-Means</strong><span>Full / partial tuition waiver</span></div>
                        <div class="scholarship-item-mini"><strong>&#127775; SC/ST Waiver</strong><span>100% tuition fee waiver</span></div>
                        <div class="scholarship-item-mini"><strong>&#128188; PhD Stipend</strong><span>&#8377;31,000–35,000/month</span></div>
                    </div>
                </div>

                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#127912; Campus Gallery</h3>
                        <button class="btn-view-tab" data-target="gallery">View All &#8594;</button>
                    </div>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Gate</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Library</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#9917;</div><span>Sports Complex</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127916;</div><span>Auditorium</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128300;</div><span>Labs</span></div>
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
                                <tr><td><strong>B.Tech (CSE, EE, Mech, Civil, Chem, etc.)</strong></td><td>4 Years</td><td>&#8377;8L — &#8377;10L</td><td>JEE Advanced + 10+2 PCM</td><td><a href="${iit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>Dual Degree (B.Tech + M.Tech)</strong></td><td>5 Years</td><td>&#8377;10L — &#8377;12L</td><td>JEE Advanced + 10+2 PCM</td><td><a href="${iit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>&#8377;2L — &#8377;3.5L</td><td>B.Tech + GATE</td><td><a href="${iit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>M.Sc</strong></td><td>2 Years</td><td>&#8377;50K — &#8377;1L</td><td>B.Sc + JAM</td><td><a href="${iit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>PhD</strong></td><td>3–6 Years</td><td>Nominal + Stipend</td><td>PG Degree + Interview</td><td><a href="${iit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Entrance Exam</h4><p>JEE Advanced (B.Tech), GATE (M.Tech), JAM (M.Sc), or institute's written test (PhD).</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>JoSAA / CCMT Counselling</h4><p>Register for centralized counselling and accept your allotted seat.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Pay Provisional Fee</h4><p>Pay the provisional admission fee online to freeze your seat.</p></div></div>
                        <div class="step-item"><div class="step-num">4</div><div><h4>Document Verification</h4><p>Report to the institute campus with original academic certificates.</p></div></div>
                        <div class="step-item"><div class="step-num">5</div><div><h4>Enrollment &amp; Orientation</h4><p>Complete enrollment and attend the induction/orientation program.</p></div></div>
                    </div>
                </div>
                <div class="lpu-card">
                    <h3>Eligibility Criteria</h3>
                    <ul class="eligibility-list">
                        <li><strong>B.Tech:</strong> 10+2 with PCM, min. 75% (or top 20 percentile). Must qualify JEE Advanced.</li>
                        <li><strong>M.Tech:</strong> B.Tech/B.E. in relevant discipline with valid GATE score.</li>
                        <li><strong>M.Sc:</strong> B.Sc with relevant subject. Valid JAM score required.</li>
                        <li><strong>PhD:</strong> PG degree in relevant field. Institute written test + interview.</li>
                    </ul>
                    <div style="margin-top:24px;"><a href="${iit.website}/" target="_blank" class="btn-lpu-apply">View Admissions &#8594;</a></div>
                </div>
            </section>

            <!-- FEES -->
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure</h2>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Annual Fee (Approx.)</th><th>Total Fee (Approx.)</th></tr></thead>
                            <tbody>
                                <tr><td>B.Tech (4 yrs)</td><td>&#8377;2,00,000 — &#8377;2,50,000</td><td>&#8377;8,00,000 — &#8377;10,00,000</td></tr>
                                <tr><td>Dual Degree (5 yrs)</td><td>&#8377;2,00,000 — &#8377;2,50,000</td><td>&#8377;10,00,000 — &#8377;12,00,000</td></tr>
                                <tr><td>M.Tech (2 yrs)</td><td>&#8377;1,00,000 — &#8377;1,75,000</td><td>&#8377;2,00,000 — &#8377;3,50,000</td></tr>
                                <tr><td>M.Sc (2 yrs)</td><td>&#8377;25,000 — &#8377;50,000</td><td>&#8377;50,000 — &#8377;1,00,000</td></tr>
                                <tr><td>Hostel (per year)</td><td>&#8377;25,000 — &#8377;60,000</td><td>—</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);">&#9432; SC/ST students receive full tuition fee waiver. EWS/OBC-NCL concessions also available.</p>
                </div>
                <div class="lpu-card">
                    <h3>Scholarships</h3>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127942;</div><h4>Merit-cum-Means</h4><p>For students with financial need and good academic standing.</p><span class="scholarship-range">Partial — Full Tuition</span></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>SC/ST Fee Waiver</h4><p>Full tuition fee waiver for SC/ST students in all programs.</p><span class="scholarship-range">100% Tuition Waiver</span></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>PhD Stipend</h4><p>Monthly stipend for all registered PhD scholars from Ministry of Education.</p><span class="scholarship-range">&#8377;31,000–35,000/month</span></div>
                    </div>
                </div>
            </section>

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Placement Highlights</h2>
                    <div class="placement-stats">
                        <div class="p-stat-card"><div class="p-stat-val">${iit.high}</div><div class="p-stat-lbl">Highest Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${iit.avg}</div><div class="p-stat-lbl">Avg Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${iit.companies}+</div><div class="p-stat-lbl">Companies</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${iit.rate}%+</div><div class="p-stat-lbl">Placement Rate</div></div>
                    </div>
                </div>
                <div class="lpu-card">
                    <h3>Top Recruiters</h3>
                    <div class="recruiter-chips">
                        <span class="r-chip">Google</span><span class="r-chip">Microsoft</span><span class="r-chip">Amazon</span>
                        <span class="r-chip">Goldman Sachs</span><span class="r-chip">McKinsey</span><span class="r-chip">Qualcomm</span>
                        <span class="r-chip">Texas Instruments</span><span class="r-chip">Intel</span><span class="r-chip">Samsung</span>
                        <span class="r-chip">Infosys</span><span class="r-chip">TCS</span><span class="r-chip">Wipro</span>
                    </div>
                </div>
                <div class="lpu-card">
                    <h3>Placement Trend</h3>
                    <div class="bar-chart">
                        <div class="bar-row"><span class="bar-label">2024-25</span><div class="bar-track"><div class="bar-fill" style="width:${iit.rate}%"><span>${iit.rate}%</span></div></div></div>
                        <div class="bar-row"><span class="bar-label">2023-24</span><div class="bar-track"><div class="bar-fill" style="width:${iit.rate - 2}%"><span>${iit.rate - 2}%</span></div></div></div>
                        <div class="bar-row"><span class="bar-label">2022-23</span><div class="bar-track"><div class="bar-fill" style="width:${iit.rate - 4}%"><span>${iit.rate - 4}%</span></div></div></div>
                    </div>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <div class="rating-overview">
                        <div class="rating-big">
                            <div class="rating-num">4.5</div>
                            <div class="rating-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                            <div class="rating-total">500+ reviews</div>
                        </div>
                        <div class="rating-bars">
                            <div class="rb-row"><span>5 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:55%"></div></div><span>55%</span></div>
                            <div class="rb-row"><span>4 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:30%"></div></div><span>30%</span></div>
                            <div class="rb-row"><span>3 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:10%"></div></div><span>10%</span></div>
                            <div class="rb-row"><span>2 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:4%"></div></div><span>4%</span></div>
                            <div class="rb-row"><span>1 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:1%"></div></div><span>1%</span></div>
                        </div>
                    </div>
                </div>
                <div class="lpu-card">
                    <div class="review-item">
                        <div class="review-top"><strong>Student Review</strong><span class="review-course">B.Tech, 2024</span><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
                        <p>"${iit.name} provided an exceptional academic environment. The faculty is world-class, research opportunities are immense, and the campus life is vibrant. Highly recommended for engineering aspirants."</p>
                    </div>
                    <div class="review-item">
                        <div class="review-top"><strong>Alumni Review</strong><span class="review-course">M.Tech, 2023</span><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Great infrastructure and research culture. The placement support was excellent and I received a great offer through campus placements. The IIT brand truly opens many doors in the industry."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Gate</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Central Library</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#9917;</div><span>Sports Complex</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127916;</div><span>Auditorium</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128300;</div><span>Research Labs</span></div>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <div class="mobile-apply-bar" id="mobile-apply-bar">
        <a href="${iit.website}/" target="_blank" class="btn-lpu-apply mobile-apply-btn">Apply Now &#8594;</a>
    </div>

    <script src="../../shared/header.js"></script>
    <script src="../../shared/footer.js"></script>
    <script src="${iit.slug}.js"></script>
</body>
</html>`;
}

function generateJs(iit) {
    return `/* ${iit.name} (${iit.abbr}) — NextCampus College Detail JS */
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

    for (const iit of iits) {
        const dir = path.join(basePath, iit.slug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // Copy lpu.css
        fs.writeFileSync(path.join(dir, iit.slug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, iit.slug + '.html'), generateHtml(iit), 'utf8');
        fs.writeFileSync(path.join(dir, iit.slug + '.js'), generateJs(iit), 'utf8');

        console.log(`Generated: ${iit.name} (${iit.slug})`);

        // Prepare card for home.js
        const score = (10 - (iit.nirf > 0 ? (iit.nirf / 10) : 1)).toFixed(1);
        const cardStr = `    {
      name: '${iit.name} (${iit.abbr})',
      city: '${iit.city}', state: '${iit.state}', type: 'Government',
      score: ${score}, totalFees: '&#8377;8L — 10L', avgPackage: '${iit.avg}',
      placementRate: ${iit.rate}, nirf: ${iit.nirf},
      link: '../colleges/${iit.slug}/${iit.slug}.html',
      rating: '4.5', accr: 'NIRF #${iit.nirf || "New"}'
    }`;
        newCards.push(cardStr);
    }

    // Inject into home.js
    let homeContent = fs.readFileSync(homeJsPath, 'utf8');
    const injectToken = "const colleges = [";
    const injectionPoint = homeContent.indexOf(injectToken);

    if (injectionPoint !== -1) {
        const startOfArray = injectionPoint + injectToken.length;
        homeContent = homeContent.slice(0, startOfArray) + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
        fs.writeFileSync(homeJsPath, homeContent, 'utf8');
        console.log(`\n✅ Injected ${iits.length} IITs into home.js !`);
    } else {
        console.log("\n❌ Could not find injection point in home.js.");
    }
}

processAll();

