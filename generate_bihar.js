const fs = require('fs');
const path = require('path');
const { getTabsHtml, getJsContent, getFullCss } = require('./gen_utils.js');

const basePath = path.join(__dirname, 'frontend', 'colleges');
const lpuCssPath = path.join(basePath, 'lpu', 'lpu.css');

const biharColleges = [
    // Govt Engineering
    { slug: "iiitbh", name: "IIIT Bhagalpur", abbr: "IIITBH", city: "Bhagalpur", type: "Government", est: 2017 },
    { slug: "mitmuz", name: "Muzaffarpur Institute of Technology", abbr: "MIT", city: "Muzaffarpur", type: "Government", est: 1954 },
    { slug: "bcebh", name: "Bhagalpur College of Engineering", abbr: "BCE", city: "Bhagalpur", type: "Government", est: 1960 },
    { slug: "gcegaya", name: "Gaya College of Engineering", abbr: "GCE", city: "Gaya", type: "Government", est: 1981 },
    { slug: "ncechandi", name: "Nalanda College of Engineering", abbr: "NCE", city: "Chandi", type: "Government", est: 2008 },
    { slug: "dcedarbhanga", name: "Darbhanga College of Engineering", abbr: "DCE", city: "Darbhanga", type: "Government", est: 2008 },
    { slug: "mcemotihari", name: "Motihari College of Engineering", abbr: "MCE", city: "Motihari", type: "Government", est: 1980 },
    { slug: "gecnawada", name: "Government Engineering College, Nawada", abbr: "GEC Nawada", city: "Nawada", type: "Government", est: 2019 },
    { slug: "geckishanganj", name: "Government Engineering College, Kishanganj", abbr: "GEC Kish", city: "Kishanganj", type: "Government", est: 2019 },
    { slug: "gecmunger", name: "Government Engineering College, Munger", abbr: "GEC Munger", city: "Munger", type: "Government", est: 2019 },
    { slug: "gecsheohar", name: "Government Engineering College, Sheohar", abbr: "GEC Sheohar", city: "Sheohar", type: "Government", est: 2019 },
    { slug: "gecbettiah", name: "Government Engineering College, Bettiah", abbr: "GEC Bettiah", city: "Bettiah", type: "Government", est: 2019 },
    { slug: "gecdarbhanga", name: "Government Engineering College, Darbhanga", abbr: "GEC DBG", city: "Darbhanga", type: "Government", est: 2019 },

    // Private Engineering
    { slug: "bitpatna", name: "Bihar Institute of Technology", abbr: "BIT Patna", city: "Patna", type: "Private", est: 2006 },
    { slug: "bitgaya", name: "Buddha Institute of Technology", abbr: "BIT Gaya", city: "Gaya", type: "Private", est: 2008 },
    { slug: "nsitpatna", name: "Netaji Subhas Institute of Technology", abbr: "NSIT", city: "Patna", type: "Private", est: 2007 },
    { slug: "rpsharma", name: "R.P. Sharma Institute of Technology", abbr: "RPSIT", city: "Patna", type: "Private", est: 1980 },
    { slug: "macetpatna", name: "Maulana Azad College of Engineering & Tech", abbr: "MACET", city: "Patna", type: "Private", est: 1988 },
    { slug: "sandipuni", name: "Sandip University", abbr: "SU", city: "Madhubani", type: "Private", est: 2017 },
    { slug: "azmetpatna", name: "Azmet Institute of Technology", abbr: "AZMET", city: "Patna", type: "Private", est: 2008 },
    { slug: "vidyadaan", name: "Vidyadaan Institute of Technology & Mgt", abbr: "VITM", city: "Patna", type: "Private", est: 2010 },
    { slug: "dypatilpatna", name: "D.Y. Patil College of Engineering", abbr: "DY Patil", city: "Patna", type: "Private", est: 2023 },
    { slug: "gyanganga", name: "Gyan Ganga College of Engineering", abbr: "GGCE", city: "Patna", type: "Private", est: 2010 },
    { slug: "darshanengg", name: "Darshan Institute of Engineering", abbr: "DIET", city: "Patna", type: "Private", est: 2012 },
    { slug: "globalengg", name: "Global Institute of Engineering", abbr: "GIET", city: "Patna", type: "Private", est: 2011 },
    { slug: "kiranmemorial", name: "Col. Satsangi’s Kiran Memorial Group", abbr: "CSKMG", city: "Patna", type: "Private", est: 2010 },
    { slug: "patnasahib", name: "Patna Sahib Group of Colleges", abbr: "PSGC", city: "Vaishali", type: "Private", est: 2011 },
    { slug: "rpcollege", name: "R.P. College of Engineering", abbr: "RPCE", city: "Patna", type: "Private", est: 2014 },
    { slug: "vaishaliengg", name: "Vaishali Institute of Technology", abbr: "VIT", city: "Vaishali", type: "Private", est: 2011 },
    { slug: "mahavirengg", name: "Mahavir Institute of Engineering", abbr: "MIET", city: "Patna", type: "Private", est: 2010 },
    { slug: "motiengg", name: "Moti Institute of Technology", abbr: "MIT", city: "Patna", type: "Private", est: 2011 },

    // Govt Medical
    { slug: "aiimspatna", name: "AIIMS Patna", abbr: "AIIMS", city: "Patna", type: "Government", est: 2012 },
    { slug: "pmch", name: "Patna Medical College & Hospital", abbr: "PMCH", city: "Patna", type: "Government", est: 1925 },
    { slug: "igims", name: "Indira Gandhi Institute of Medical Sciences", abbr: "IGIMS", city: "Patna", type: "Government", est: 1983 },
    { slug: "anmmch", name: "Anugrah Narayan Magadh Medical College & Hospital", abbr: "ANMMCH", city: "Gaya", type: "Government", est: 1969 },
    { slug: "dmch", name: "Darbhanga Medical College & Hospital", abbr: "DMCH", city: "Darbhanga", type: "Government", est: 1946 },
    { slug: "nmch", name: "Nalanda Medical College & Hospital", abbr: "NMCH", city: "Patna", type: "Government", est: 1970 },
    { slug: "skmch", name: "Sri Krishna Medical College & Hospital", abbr: "SKMCH", city: "Muzaffarpur", type: "Government", est: 1970 },
    { slug: "gmcbtt", name: "Government Medical College, Bettiah", abbr: "GMC", city: "Bettiah", type: "Government", est: 2013 },
    { slug: "gmcpu", name: "Government Medical College, Purnea", abbr: "GMC", city: "Purnea", type: "Government", est: 2023 },
    { slug: "jktmch", name: "Jannayak Karpoori Thakur Medical College", abbr: "JKTMCH", city: "Madhepura", type: "Government", est: 2020 },

    // Private Medical
    { slug: "kmckatihar", name: "Katihar Medical College", abbr: "KMC", city: "Katihar", type: "Private", est: 1987 },
    { slug: "mgmmc", name: "Mata Gujri Memorial Medical College", abbr: "MGMMC", city: "Kishanganj", type: "Private", est: 1990 },
    { slug: "nmchsasaram", name: "Narayan Medical College & Hospital", abbr: "NMCH", city: "Sasaram", type: "Private", est: 2008 },
    { slug: "lbkmc", name: "Lord Buddha Koshi Medical College", abbr: "LBKMC", city: "Saharsa", type: "Private", est: 2012 },
    { slug: "mmcmadhubani", name: "Madhubani Medical College", abbr: "MMC", city: "Madhubani", type: "Private", est: 2018 },
    { slug: "nsmcpatna", name: "Netaji Subhas Medical College", abbr: "NSMC", city: "Patna", type: "Private", est: 2020 },
    { slug: "rdjmmc", name: "Radha Devi J.M. Medical College", abbr: "RDJMMC", city: "Muzaffarpur", type: "Private", est: 2021 },
    { slug: "snmih", name: "Shree Narayan Medical Institute & Hospital", abbr: "SNMIH", city: "Saharsa", type: "Private", est: 2021 },
    { slug: "hmcpatna", name: "Himalaya Medical College", abbr: "HMC", city: "Patna", type: "Private", est: 2022 },

    // Pharmacy
    { slug: "gpcbettiah", name: "Government Pharmacy College", abbr: "GPC", city: "Bettiah", type: "Government", est: 2019 },
    { slug: "pcppatna", name: "Patna College of Pharmacy", abbr: "PCP", city: "Patna", type: "Private", est: 2018 },
    { slug: "niperhajipur", name: "NIPER Hajipur", abbr: "NIPER", city: "Patna", type: "Government", est: 2007 },
    { slug: "bnmupharm", name: "BNMU Pharmacy Dept", abbr: "BNMU", city: "Madhepura", type: "Government", est: 1992 },
    { slug: "ncppatna", name: "Nalanda College of Pharmacy", abbr: "NCP", city: "Patna", type: "Private", est: 2020 },
    { slug: "ripchapra", name: "Rajendra Institute of Pharmacy", abbr: "RIP", city: "Chapra", type: "Private", est: 2019 },

    // Dental
    { slug: "pdcpatna", name: "Patna Dental College & Hospital", abbr: "PDC", city: "Patna", type: "Government", est: 1960 },
    { slug: "bidsh", name: "Buddha Institute of Dental Sciences & Hospital", abbr: "BIDSH", city: "Patna", type: "Private", est: 1984 },
    { slug: "bdcpatna", name: "Bihar Dental College", abbr: "BDC", city: "Patna", type: "Private", est: 1985 }
];

function generateHtml(col) {
    let category = "Engineering";
    let coursesHtml = `<tr><td><strong>B.Tech / B.E.</strong></td><td>4 Years</td><td>&#8377;1L — &#8377;4L</td><td>10+2 PCM + Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                 <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>&#8377;1L — &#8377;2L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
    let admissionHtml = "JEE Main, BCECE (Bihar Combined Entrance Competitive Examination), or direct admission in private colleges.";

    const nameLower = col.name.toLowerCase();

    if (nameLower.includes("medical") || nameLower.includes("aiims") || nameLower.includes("igims")) {
        category = "Medical";
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>&#8377;1L (Govt) — &#8377;10L+ (Private)</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>&#8377;50K — &#8377;5L+</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>B.Sc Nursing</strong></td><td>4 Years</td><td>&#8377;50K — &#8377;2L</td><td>10+2 PCB</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "NEET UG for MBBS. Admissions are done through Bihar UGMAC counselling (BCECEB) or All India Quota (MCC).";
    } else if (nameLower.includes("pharmacy") || nameLower.includes("niper") || nameLower.includes("pharm")) {
        category = "Pharmacy";
        coursesHtml = `<tr><td><strong>B.Pharm</strong></td><td>4 Years</td><td>&#8377;1.5L — &#8377;4L</td><td>10+2 PCM/PCB</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>D.Pharm</strong></td><td>2 Years</td><td>&#8377;80K — &#8377;2L</td><td>10+2 PCM/PCB</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions based on 10+2 merit, BCECE entrance exam, or specific university entrance exams.";
    } else if (nameLower.includes("dental")) {
        category = "Dental";
        coursesHtml = `<tr><td><strong>BDS</strong></td><td>5 Years</td><td>&#8377;2L — &#8377;15L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MDS</strong></td><td>3 Years</td><td>&#8377;3L — &#8377;20L</td><td>BDS + NEET MDS</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Based on NEET UG scores via state counseling (UDMAC).";
    }

    const tabsHtml = getTabsHtml(category);

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
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Bihar</span>
            </div>
            <a href="#" class="btn-lpu-apply">Apply Now &#8594;</a>
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
                        <p class="lpu-location">&#128205; ${col.city}, Bihar, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.0</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${col.type}</strong></span>
                            <span class="divider">|</span>
                            <span>Category: <strong>${category}</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">&#127942; State Recognized</span>
                            <span class="badge-accr">Approved</span>
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

            <!-- OVERVIEW -->
            <section class="lpu-panel active" id="panel-overview">
                <div class="lpu-card">
                    <h2>About ${col.name}</h2>
                    <p>${col.name} (${col.abbr}) is a notable ${col.type.toLowerCase()} institution located in ${col.city}, Bihar. It is highly regarded in the ${category} field.</p>
                </div>
                
                <div class="lpu-card">
                    <div class="overview-section-header">
                        <h3>&#128218; Top Courses &amp; Eligibility</h3>
                        <button class="btn-view-tab" data-target="courses">View All &#8594;</button>
                    </div>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>
                                ${coursesHtml}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="lpu-card">
                    <h3>Admissions Route</h3>
                    <p>${admissionHtml}</p>
                    <button class="btn-view-tab" data-target="admission" style="margin-top: 10px;">View Admission Process &#8594;</button>
                </div>
            </section>
            
            <!-- COURSES -->
            <section class="lpu-panel" id="panel-courses">
                <div class="lpu-card">
                    <h2>Academic Programs</h2>
                    <div class="table-scroll">
                        <table class="lpu-table">
                            <thead><tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr></thead>
                            <tbody>
                                ${coursesHtml}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            
            <!-- ADMISSION -->
            <section class="lpu-panel" id="panel-admission">
                <div class="lpu-card">
                    <h2>Admission Information</h2>
                    <div class="steps-list">
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Entrance Exam</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling</h4><p>Register online for state or central counselling based on your rank.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance & Document Verification</h4><p>Report to campus with original documents and pay the fee.</p></div></div>
                    </div>
                </div>
            </section>
            
            <!-- FEES -->
            ${category !== 'Medical' ? `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Financial backing is available through government portals (NSP) and state-specific post-matric scholarships.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>SC/ST/OBC Scholarships</h4><p>Full or partial tuition fee waiver based on state category rules.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>NSP & State Scholarships</h4><p>Various state scholarships applicable through the National Scholarship Portal.</p></div>
                    </div>
                </div>
            </section>
            ` : ``}

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>${category === 'Medical' || category === 'Dental' ? 'Internships & Residency' : 'Placements'}</h2>
                    <p>${category === 'Medical' || category === 'Dental' ?
            'Students undergo a mandatory 1-year rotating internship at the parent hospital or affiliated medical centers. Paid stipends are provided as per government norms.' :
            'Students are recruited by top tech, manufacturing, and consulting firms through campus drives.'}
                    </p>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>4.0 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Student</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Great faculty and good infrastructure. The campus is well-connected and offers a competitive environment for ${category.toLowerCase()} studies."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Campus</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Library & Labs</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels / Canteen</span></div>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <div class="mobile-apply-bar" id="mobile-apply-bar">
        <a href="#" class="btn-lpu-apply mobile-apply-btn">Apply Now &#8594;</a>
    </div>

    <script src="../../shared/header.js"></script>
    <script src="../../shared/footer.js"></script>
    <script src="${col.slug}.js"></script>
</body>
</html>`;
}

function processAll() {
    // Note: Since we injected these earlier, we don't need to inject into home.js again, 
    // just re-serialize the HTML and JS files in the respective domains to ensure valid missing tabs are added!

    for (const col of biharColleges) {
        const dir = path.join(basePath, col.slug);
        // Overwrite with the corrected, full feature HTML
        fs.writeFileSync(path.join(dir, col.slug + '.html'), generateHtml(col), 'utf8');
        fs.writeFileSync(path.join(dir, col.slug + '.js'), getJsContent(col.name, col.abbr, col.slug), 'utf8');

        console.log(`Updated: ${col.name} (${col.slug})`);
    }
}

processAll();

