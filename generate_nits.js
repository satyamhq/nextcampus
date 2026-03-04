const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'frontend', 'colleges');
const lpuCssPath = path.join(basePath, 'lpu', 'lpu.css');
const homeJsPath = path.join(__dirname, 'frontend', 'home', 'home.js');

const nits = [
    { slug: "nitt", name: "NIT Trichy", abbr: "NITT", city: "Tiruchirappalli", state: "Tamil Nadu", est: 1964, nirf: 9, qs: 781, campus: 800, students: 6500, programs: 40, rate: 90, high: "&#8377;52 LPA", avg: "&#8377;12-15 LPA", companies: 250, website: "https://www.nitt.edu" },
    { slug: "nitsk", name: "NIT Surathkal", abbr: "NITK", city: "Surathkal", state: "Karnataka", est: 1960, nirf: 12, qs: 0, campus: 295, students: 6000, programs: 35, rate: 89, high: "&#8377;54 LPA", avg: "&#8377;13-16 LPA", companies: 300, website: "https://www.nitk.ac.in" },
    { slug: "nitr", name: "NIT Rourkela", abbr: "NITR", city: "Rourkela", state: "Odisha", est: 1961, nirf: 16, qs: 0, campus: 1200, students: 7000, programs: 45, rate: 85, high: "&#8377;50 LPA", avg: "&#8377;11-14 LPA", companies: 240, website: "https://www.nitrkl.ac.in" },
    { slug: "nitw", name: "NIT Warangal", abbr: "NITW", city: "Warangal", state: "Telangana", est: 1959, nirf: 21, qs: 0, campus: 248, students: 5000, programs: 30, rate: 88, high: "&#8377;88 LPA", avg: "&#8377;13-17 LPA", companies: 250, website: "https://www.nitw.ac.in" },
    { slug: "nitc", name: "NIT Calicut", abbr: "NITC", city: "Kozhikode", state: "Kerala", est: 1961, nirf: 23, qs: 0, campus: 296, students: 6000, programs: 35, rate: 85, high: "&#8377;50 LPA", avg: "&#8377;11-14 LPA", companies: 200, website: "https://www.nitc.ac.in" },
    { slug: "mnit", name: "MNIT Jaipur", abbr: "MNIT", city: "Jaipur", state: "Rajasthan", est: 1963, nirf: 37, qs: 0, campus: 317, students: 5000, programs: 30, rate: 84, high: "&#8377;64 LPA", avg: "&#8377;10-13 LPA", companies: 220, website: "https://www.mnit.ac.in" },
    { slug: "vnit", name: "VNIT Nagpur", abbr: "VNIT", city: "Nagpur", state: "Maharashtra", est: 1960, nirf: 41, qs: 0, campus: 214, students: 4500, programs: 25, rate: 82, high: "&#8377;34 LPA", avg: "&#8377;9-12 LPA", companies: 180, website: "https://vnit.ac.in" },
    { slug: "nitk", name: "NIT Kurukshetra", abbr: "NITKKR", city: "Kurukshetra", state: "Haryana", est: 1963, nirf: 58, qs: 0, campus: 300, students: 4000, programs: 25, rate: 80, high: "&#8377;42 LPA", avg: "&#8377;9-12 LPA", companies: 150, website: "https://nitkkr.ac.in" },
    { slug: "nits", name: "NIT Silchar", abbr: "NITS", city: "Silchar", state: "Assam", est: 1967, nirf: 40, qs: 0, campus: 625, students: 4000, programs: 25, rate: 80, high: "&#8377;44 LPA", avg: "&#8377;9-12 LPA", companies: 140, website: "http://www.nits.ac.in" },
    { slug: "nitdgp", name: "NIT Durgapur", abbr: "NITDGP", city: "Durgapur", state: "West Bengal", est: 1960, nirf: 43, qs: 0, campus: 187, students: 4500, programs: 25, rate: 80, high: "&#8377;33 LPA", avg: "&#8377;9-12 LPA", companies: 160, website: "https://nitdgp.ac.in" },
    { slug: "nitp", name: "NIT Patna", abbr: "NITP", city: "Patna", state: "Bihar", est: 1886, nirf: 56, qs: 0, campus: 40, students: 3500, programs: 20, rate: 78, high: "&#8377;52 LPA", avg: "&#8377;8-11 LPA", companies: 130, website: "http://www.nitp.ac.in" },
    { slug: "nitj", name: "NIT Jalandhar", abbr: "NITJ", city: "Jalandhar", state: "Punjab", est: 1987, nirf: 46, qs: 0, campus: 154, students: 3500, programs: 20, rate: 78, high: "&#8377;51 LPA", avg: "&#8377;8-11 LPA", companies: 140, website: "https://www.nitj.ac.in" },
    { slug: "nitm", name: "NIT Meghalaya", abbr: "NITM", city: "Shillong", state: "Meghalaya", est: 2010, nirf: 72, qs: 0, campus: 300, students: 1500, programs: 15, rate: 75, high: "&#8377;32 LPA", avg: "&#8377;7-10 LPA", companies: 80, website: "http://www.nitm.ac.in" },
    { slug: "nitr", name: "NIT Raipur", abbr: "NITRR", city: "Raipur", state: "Chhattisgarh", est: 1956, nirf: 70, qs: 0, campus: 100, students: 4000, programs: 25, rate: 75, high: "&#8377;55 LPA", avg: "&#8377;8-11 LPA", companies: 150, website: "http://www.nitrr.ac.in" },
    { slug: "nita", name: "NIT Agartala", abbr: "NITA", city: "Agartala", state: "Tripura", est: 1965, nirf: 91, qs: 0, campus: 365, students: 3000, programs: 20, rate: 75, high: "&#8377;36 LPA", avg: "&#8377;7-10 LPA", companies: 100, website: "https://www.nita.ac.in" },
    { slug: "nitg", name: "NIT Goa", abbr: "NITG", city: "Ponda", state: "Goa", est: 2010, nirf: 90, qs: 0, campus: 250, students: 1000, programs: 10, rate: 75, high: "&#8377;44 LPA", avg: "&#8377;7-10 LPA", companies: 60, website: "http://www.nitgoa.ac.in" },
    { slug: "nitap", name: "NIT Arunachal Pradesh", abbr: "NITAP", city: "Yupia", state: "Arunachal Pradesh", est: 2010, nirf: 100, qs: 0, campus: 288, students: 1000, programs: 10, rate: 70, high: "&#8377;24 LPA", avg: "&#8377;6-9 LPA", companies: 50, website: "https://www.nitap.ac.in" },
    { slug: "nitmiz", name: "NIT Mizoram", abbr: "NITMZ", city: "Aizawl", state: "Mizoram", est: 2010, nirf: 0, qs: 0, campus: 190, students: 800, programs: 8, rate: 68, high: "&#8377;20 LPA", avg: "&#8377;6-8 LPA", companies: 40, website: "https://www.nitmz.ac.in" },
    { slug: "nitsikkim", name: "NIT Sikkim", abbr: "NITSKM", city: "Ravangla", state: "Sikkim", est: 2010, nirf: 0, qs: 0, campus: 50, students: 800, programs: 8, rate: 68, high: "&#8377;20 LPA", avg: "&#8377;6-8 LPA", companies: 40, website: "https://nitsikkim.ac.in" },
    { slug: "nitsr", name: "NIT Srinagar", abbr: "NITSRI", city: "Srinagar", state: "Jammu and Kashmir", est: 1960, nirf: 82, qs: 0, campus: 67, students: 3500, programs: 20, rate: 72, high: "&#8377;20 LPA", avg: "&#8377;6-9 LPA", companies: 80, website: "https://nitsri.ac.in" },
    { slug: "nitdelhi", name: "NIT Delhi", abbr: "NITD", city: "New Delhi", state: "Delhi", est: 2010, nirf: 51, qs: 0, campus: 51, students: 1500, programs: 12, rate: 80, high: "&#8377;55 LPA", avg: "&#8377;9-12 LPA", companies: 100, website: "https://nitdelhi.ac.in" },
    { slug: "nitmanipur", name: "NIT Manipur", abbr: "NITMN", city: "Imphal", state: "Manipur", est: 2010, nirf: 95, qs: 0, campus: 341, students: 1000, programs: 10, rate: 70, high: "&#8377;20 LPA", avg: "&#8377;6-8 LPA", companies: 50, website: "http://www.nitmanipur.ac.in" },
    { slug: "nitnagaland", name: "NIT Nagaland", abbr: "NITN", city: "Dimapur", state: "Nagaland", est: 2010, nirf: 0, qs: 0, campus: 293, students: 800, programs: 8, rate: 65, high: "&#8377;15 LPA", avg: "&#8377;5-8 LPA", companies: 40, website: "http://nitnagaland.ac.in" },
    { slug: "nita", name: "NIT Andhra Pradesh", abbr: "NITANP", city: "Tadepalligudem", state: "Andhra Pradesh", est: 2015, nirf: 0, qs: 0, campus: 137, students: 1500, programs: 12, rate: 70, high: "&#8377;25 LPA", avg: "&#8377;6-9 LPA", companies: 60, website: "https://www.nitandhra.ac.in" },
    { slug: "nitpuducherry", name: "NIT Puducherry", abbr: "NITPY", city: "Karaikal", state: "Puducherry", est: 2010, nirf: 0, qs: 0, campus: 258, students: 1200, programs: 10, rate: 72, high: "&#8377;20 LPA", avg: "&#8377;6-9 LPA", companies: 50, website: "https://www.nitpy.ac.in" },
    { slug: "nituttarakhand", name: "NIT Uttarakhand", abbr: "NITUK", city: "Srinagar", state: "Uttarakhand", est: 2010, nirf: 0, qs: 0, campus: 200, students: 1000, programs: 10, rate: 72, high: "&#8377;20 LPA", avg: "&#8377;6-9 LPA", companies: 50, website: "https://www.nituk.ac.in" },
    { slug: "marmnit", name: "MANIT Bhopal", abbr: "MANIT", city: "Bhopal", state: "Madhya Pradesh", est: 1960, nirf: 80, qs: 0, campus: 650, students: 5000, programs: 30, rate: 82, high: "&#8377;82 LPA", avg: "&#8377;9-12 LPA", companies: 200, website: "http://www.manit.ac.in" },
    { slug: "mnnit", name: "MNNIT Allahabad", abbr: "MNNIT", city: "Prayagraj", state: "Uttar Pradesh", est: 1961, nirf: 49, qs: 0, campus: 222, students: 5000, programs: 30, rate: 85, high: "&#8377;1.18 Cr", avg: "&#8377;12-15 LPA", companies: 250, website: "http://www.mnnit.ac.in" },
    { slug: "svnit", name: "SVNIT Surat", abbr: "SVNIT", city: "Surat", state: "Gujarat", est: 1961, nirf: 65, qs: 0, campus: 250, students: 4500, programs: 25, rate: 80, high: "&#8377;44 LPA", avg: "&#8377;9-12 LPA", companies: 180, website: "https://www.svnit.ac.in" },
    { slug: "nitjamshedpur", name: "NIT Jamshedpur", abbr: "NITJSR", city: "Jamshedpur", state: "Jharkhand", est: 1960, nirf: 90, qs: 0, campus: 341, students: 3500, programs: 20, rate: 80, high: "&#8377;56 LPA", avg: "&#8377;9-12 LPA", companies: 150, website: "http://www.nitjsr.ac.in" },
    { slug: "nith", name: "NIT Hamirpur", abbr: "NITH", city: "Hamirpur", state: "Himachal Pradesh", est: 1986, nirf: 0, qs: 0, campus: 320, students: 3000, programs: 20, rate: 75, high: "&#8377;1.12 Cr", avg: "&#8377;7-10 LPA", companies: 120, website: "https://nith.ac.in" }
];

function generateHtml(nit) {
    const nirfBadge = nit.nirf > 0 ? `&#127942; NIRF #${nit.nirf}` : `&#127942; New NIT`;
    const nirfRow = nit.nirf > 0 ? `<tr><td>NIRF (Engineering)</td><td><strong>#${nit.nirf}</strong></td><td>2024</td></tr>` : `<tr><td>NIRF</td><td>Emerging</td><td>2024</td></tr>`;
    const qsRow = nit.qs > 0 ? `<tr><td>QS World Rankings</td><td>#${nit.qs}</td><td>2025</td></tr>` : ``;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${nit.name} (${nit.abbr}) — NextCampus</title>
    <meta name="description" content="Explore ${nit.name} — courses, fees, placements, admissions, scholarships, and campus life. Apply now at NextCampus.">
    <meta name="keywords" content="${nit.name}, ${nit.abbr}, ${nit.abbr} admissions, ${nit.abbr} fees, ${nit.abbr} placements, JEE Main, NIT, NextCampus">
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
    <link rel="stylesheet" href="${nit.slug}.css">
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${nit.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${nit.city}, ${nit.state}</span>
            </div>
            <a href="${nit.website}/" target="_blank" class="btn-lpu-apply">Apply Now &#8594;</a>
        </div>
    </div>

    <section class="lpu-hero" id="lpu-hero"
        style="background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url('images/cover/${nit.slug}_cover.png'); background-size: cover; background-position: center;">
        <div class="container">
            <div class="lpu-hero-grid">
                <div class="lpu-hero-info">
                    <img src="images/logo/${nit.slug}_logo.png" alt="${nit.name} Logo" class="lpu-logo-img">
                    <div>
                        <h1>${nit.name} <span class="lpu-abbr">(${nit.abbr})</span></h1>
                        <p class="lpu-location">&#128205; ${nit.city}, ${nit.state}, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.2</strong>/5
                            <span class="review-count">(300+ reviews)</span>
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${nit.est}</strong></span>
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
                            <a href="${nit.website}/" target="_blank" class="btn-lpu-apply">Apply Now &#8594;</a>
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
                    <h2>About ${nit.name}</h2>
                    <p>${nit.name} (${nit.abbr}) is a premier engineering institution, established in ${nit.est} as an Institute of National Importance by the Government of India. Located in ${nit.city}, ${nit.state}, ${nit.abbr} is recognized for its academic rigor, experienced faculty, and strong industry connections.</p>
                    <p>The institute spans a ${nit.campus}-acre campus and offers excellent infrastructure, vibrant student life, and a strong alumni network, making it one of the most sought-after NITs in India.</p>
                </div>

                <div class="lpu-card">
                    <h3>Key Highlights</h3>
                    <div class="highlights-grid">
                        <div class="highlight-item">
                            <div class="highlight-icon">&#127891;</div>
                            <div class="highlight-val">${nit.students}+</div>
                            <div class="highlight-lbl">Students</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">&#128218;</div>
                            <div class="highlight-val">${nit.programs}+</div>
                            <div class="highlight-lbl">Programs</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">&#127963;</div>
                            <div class="highlight-val">${nit.campus}</div>
                            <div class="highlight-lbl">Acres Campus</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">&#128188;</div>
                            <div class="highlight-val">${nit.rate}%+</div>
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
                                <tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>&#8377;5L — &#8377;6L</td><td>JEE Main + JoSAA</td></tr>
                                <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>&#8377;1.5L — &#8377;2.5L</td><td>B.Tech + GATE</td></tr>
                                <tr><td><strong>M.Sc</strong></td><td>2 Years</td><td>&#8377;40K — &#8377;80K</td><td>B.Sc + IIT JAM</td></tr>
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
                        <div class="overview-step"><div class="step-num">1</div><div><h4>Qualify JEE Main / GATE</h4><p>Appear and clear the national entrance exam.</p></div></div>
                        <div class="overview-step"><div class="step-num">2</div><div><h4>JoSAA / CSAB Counselling</h4><p>Register online for seat allocation based on AIR.</p></div></div>
                        <div class="overview-step"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Pay fee online and freeze/float seat.</p></div></div>
                        <div class="overview-step"><div class="step-num">4</div><div><h4>Physical Reporting</h4><p>Verify documents on campus and confirm enrollment.</p></div></div>
                    </div>
                    <div style="margin-top:20px;"><a href="${nit.website}/" target="_blank" class="btn-lpu-apply">View Admissions &#8594;</a></div>
                </div>

                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128188; Placement Highlights</h3>
                        <button class="btn-view-tab" data-target="placements">View All &#8594;</button>
                    </div>
                    <div class="placement-stats">
                        <div class="p-stat-card"><div class="p-stat-val">${nit.high}</div><div class="p-stat-lbl">Highest Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${nit.avg}</div><div class="p-stat-lbl">Average Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${nit.companies}+</div><div class="p-stat-lbl">Companies</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${nit.rate}%+</div><div class="p-stat-lbl">Placement Rate</div></div>
                    </div>
                </div>

                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128176; Fees &amp; Scholarships</h3>
                        <button class="btn-view-tab" data-target="fees">View All &#8594;</button>
                    </div>
                    <div class="overview-scholarship-summary">
                        <div class="scholarship-item-mini"><strong>&#127942; Income Based Fee Waiver</strong><span>2/3rd or Full tuition waiver</span></div>
                        <div class="scholarship-item-mini"><strong>&#127775; SC/ST Waiver</strong><span>100% tuition fee waiver</span></div>
                        <div class="scholarship-item-mini"><strong>&#128188; State/NSP Scholarships</strong><span>Based on state/central schemes</span></div>
                    </div>
                </div>

                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#127912; Campus Gallery</h3>
                        <button class="btn-view-tab" data-target="gallery">View All &#8594;</button>
                    </div>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Library</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#9917;</div><span>Sports Ground</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127916;</div><span>Student Activity Center</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128300;</div><span>Laboratories</span></div>
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
                                <tr><td><strong>B.Tech (CSE, ECE, Mech, Civil, EE, etc.)</strong></td><td>4 Years</td><td>&#8377;5L — &#8377;6L</td><td>JEE Main + JoSAA</td><td><a href="${nit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>B.Arch</strong></td><td>5 Years</td><td>&#8377;6L — &#8377;7.5L</td><td>JEE Main Paper 2 + JoSAA</td><td><a href="${nit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>&#8377;1.5L — &#8377;2.5L</td><td>B.Tech + GATE + CCMT</td><td><a href="${nit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>M.Sc</strong></td><td>2 Years</td><td>&#8377;40K — &#8377;80K</td><td>B.Sc + IIT JAM + CCMN</td><td><a href="${nit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
                                <tr><td><strong>PhD</strong></td><td>3–6 Years</td><td>Nominal + Stipend</td><td>PG Degree + Interview</td><td><a href="${nit.website}/" target="_blank" class="apply-link">Apply &#8594;</a></td></tr>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Entrance Exam</h4><p>JEE Main for B.Tech/B.Arch, GATE for M.Tech, IIT JAM for M.Sc.</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Centralized Counselling</h4><p>JoSAA/CSAB (B.Tech), CCMT (M.Tech), or CCMN (M.Sc) based on AIR.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Pay provisional fee online to freeze, float, or slide your allocated seat.</p></div></div>
                        <div class="step-item"><div class="step-num">4</div><div><h4>Physical Verification</h4><p>Report to the NIT campus with original documents.</p></div></div>
                        <div class="step-item"><div class="step-num">5</div><div><h4>Orientation</h4><p>Complete final registration and attend the fresher orientation.</p></div></div>
                    </div>
                </div>
                <div class="lpu-card">
                    <h3>Eligibility Criteria</h3>
                    <ul class="eligibility-list">
                        <li><strong>B.Tech:</strong> 10+2 with PCM, min. 75% marks (65% for SC/ST). Must rank high in JEE Main.</li>
                        <li><strong>M.Tech:</strong> B.Tech/B.E. in relevant discipline with valid GATE score.</li>
                        <li><strong>M.Sc:</strong> B.Sc with relevant subject. Valid IIT JAM score required.</li>
                        <li><strong>PhD:</strong> Master's in relevant field. Institute written test + interview.</li>
                    </ul>
                    <div style="margin-top:24px;"><a href="${nit.website}/" target="_blank" class="btn-lpu-apply">View Admissions &#8594;</a></div>
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
                                <tr><td>B.Tech (4 yrs)</td><td>&#8377;1,25,000 — &#8377;1,40,000</td><td>&#8377;5,00,000 — &#8377;6,00,000</td></tr>
                                <tr><td>B.Arch (5 yrs)</td><td>&#8377;1,25,000 — &#8377;1,40,000</td><td>&#8377;6,00,000 — &#8377;7,50,000</td></tr>
                                <tr><td>M.Tech (2 yrs)</td><td>&#8377;70,000 — &#8377;1,20,000</td><td>&#8377;1,50,000 — &#8377;2,50,000</td></tr>
                                <tr><td>M.Sc (2 yrs)</td><td>&#8377;20,000 — &#8377;40,000</td><td>&#8377;40,000 — &#8377;80,000</td></tr>
                                <tr><td>Hostel & Mess</td><td>&#8377;40,000 — &#8377;65,000</td><td>—</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);">&#9432; Gen/OBC students with family income < 1L get 100% tuition waiver. Income 1L-5L gets 2/3rd waiver.</p>
                </div>
                <div class="lpu-card">
                    <h3>Scholarships &amp; Waivers</h3>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127942;</div><h4>Income-Based Tuition Waiver</h4><p>100% waiver for Gen/OBC income < &#8377;1L/yr; 2/3rd waiver for income &#8377;1L–5L/yr.</p><span class="scholarship-range">67% — 100% Tuition Waiver</span></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>SC/ST/PwD Waiver</h4><p>Complete tuition fee waiver for all SC/ST and PwD students regardless of income.</p><span class="scholarship-range">100% Tuition Waiver</span></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>NSP & State Scholarships</h4><p>Various state and central govt scholarships applicable through the National Scholarship Portal.</p><span class="scholarship-range">Variable Amount</span></div>
                    </div>
                </div>
            </section>

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Placement Highlights</h2>
                    <div class="placement-stats">
                        <div class="p-stat-card"><div class="p-stat-val">${nit.high}</div><div class="p-stat-lbl">Highest Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${nit.avg}</div><div class="p-stat-lbl">Avg Package</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${nit.companies}+</div><div class="p-stat-lbl">Companies</div></div>
                        <div class="p-stat-card"><div class="p-stat-val">${nit.rate}%+</div><div class="p-stat-lbl">Placement Rate</div></div>
                    </div>
                </div>
                <div class="lpu-card">
                    <h3>Top Recruiters</h3>
                    <div class="recruiter-chips">
                        <span class="r-chip">Amazon</span><span class="r-chip">Oracle</span><span class="r-chip">Atlassian</span>
                        <span class="r-chip">Goldman Sachs</span><span class="r-chip">Texas Instruments</span><span class="r-chip">Qualcomm</span>
                        <span class="r-chip">Siemens</span><span class="r-chip">L&T</span><span class="r-chip">Tata Motors</span>
                        <span class="r-chip">Infosys</span><span class="r-chip">TCS</span><span class="r-chip">Cognizant</span>
                    </div>
                </div>
                <div class="lpu-card">
                    <h3>Placement Trend</h3>
                    <div class="bar-chart">
                        <div class="bar-row"><span class="bar-label">2024-25</span><div class="bar-track"><div class="bar-fill" style="width:${nit.rate}%"><span>${nit.rate}%</span></div></div></div>
                        <div class="bar-row"><span class="bar-label">2023-24</span><div class="bar-track"><div class="bar-fill" style="width:${nit.rate - 2}%"><span>${nit.rate - 2}%</span></div></div></div>
                        <div class="bar-row"><span class="bar-label">2022-23</span><div class="bar-track"><div class="bar-fill" style="width:${nit.rate - 4}%"><span>${nit.rate - 4}%</span></div></div></div>
                    </div>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <div class="rating-overview">
                        <div class="rating-big">
                            <div class="rating-num">4.2</div>
                            <div class="rating-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                            <div class="rating-total">300+ reviews</div>
                        </div>
                        <div class="rating-bars">
                            <div class="rb-row"><span>5 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:45%"></div></div><span>45%</span></div>
                            <div class="rb-row"><span>4 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:35%"></div></div><span>35%</span></div>
                            <div class="rb-row"><span>3 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:15%"></div></div><span>15%</span></div>
                            <div class="rb-row"><span>2 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:4%"></div></div><span>4%</span></div>
                            <div class="rb-row"><span>1 &#9733;</span><div class="rb-track"><div class="rb-fill" style="width:1%"></div></div><span>1%</span></div>
                        </div>
                    </div>
                </div>
                <div class="lpu-card">
                    <div class="review-item">
                        <div class="review-top"><strong>Student Review</strong><span class="review-course">B.Tech, 2024</span><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Studying at ${nit.abbr} is a great experience. The peer group is excellent and coding culture is strong. Hostel facilities are decent, and placements for CSE/ECE are phenomenal."</p>
                    </div>
                    <div class="review-item">
                        <div class="review-top"><strong>Alumni Review</strong><span class="review-course">B.Tech, 2022</span><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
                        <p>"The ROI is unbeatable because of the low tuition fee and strong placement records. I got placed in a top product-based company. The fests and clubs here add a lot to personality development."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Admin Block</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Central Library</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Mega Hostel</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#9917;</div><span>Sports Field</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127916;</div><span>Student Activity Center</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128300;</div><span>Computing Center</span></div>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <div class="mobile-apply-bar" id="mobile-apply-bar">
        <a href="${nit.website}/" target="_blank" class="btn-lpu-apply mobile-apply-btn">Apply Now &#8594;</a>
    </div>

    <script src="../../shared/header.js"></script>
    <script src="../../shared/footer.js"></script>
    <script src="${nit.slug}.js"></script>
</body>
</html>`;
}

function generateJs(nit) {
    return `/* ${nit.name} (${nit.abbr}) — NextCampus College Detail JS */
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

    for (const nit of nits) {
        const dir = path.join(basePath, nit.slug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // Copy lpu.css
        fs.writeFileSync(path.join(dir, nit.slug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, nit.slug + '.html'), generateHtml(nit), 'utf8');
        fs.writeFileSync(path.join(dir, nit.slug + '.js'), generateJs(nit), 'utf8');

        console.log(`Generated: ${nit.name} (${nit.slug})`);

        // Prepare card for home.js
        const score = (10 - (nit.nirf > 0 ? (nit.nirf / 20) : 1)).toFixed(1);
        const cardStr = `    {
      name: '${nit.name} (${nit.abbr})',
      city: '${nit.city}', state: '${nit.state}', type: 'Government',
      score: ${score}, totalFees: '&#8377;5L — 6L', avgPackage: '${nit.avg}',
      placementRate: ${nit.rate}, nirf: ${nit.nirf},
      link: '../colleges/${nit.slug}/${nit.slug}.html',
      rating: '4.2', accr: 'NIRF #${nit.nirf || "New"}'
    }`;
        newCards.push(cardStr);
    }

    // Inject into home.js
    let homeContent = fs.readFileSync(homeJsPath, 'utf8');
    const injectToken = "const colleges = [";
    const injectionPoint = homeContent.indexOf(injectToken);

    if (injectionPoint !== -1) {
        const startOfArray = injectionPoint + injectToken.length;
        homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
        fs.writeFileSync(homeJsPath, homeContent, 'utf8');
        console.log(`\n✅ Injected ${nits.length} NITs into home.js !`);
    } else {
        console.log("\n❌ Could not find injection point in home.js.");
    }
}

processAll();

