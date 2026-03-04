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

const apColleges = [
    // Central Universities
    { name: "Central University of Andhra Pradesh", abbr: "CUAP", city: "Anantapur", type: "Central", est: 2018, category: "Arts & Science" },
    { name: "Central Tribal University of Andhra Pradesh", abbr: "CTUAP", city: "Vizianagaram", type: "Central", est: 2019, category: "Arts & Science" },
    { name: "National Sanskrit University", abbr: "NSU", city: "Tirupati", type: "Central", est: 1961, category: "Arts & Science" },

    // State Universities
    { name: "Andhra University", abbr: "AU", city: "Visakhapatnam", type: "State", est: 1926, category: "Arts & Science" },
    { name: "Acharya Nagarjuna University", abbr: "ANU", city: "Guntur", type: "State", est: 1976, category: "Arts & Science" },
    { name: "Sri Venkateswara University", abbr: "SVU", city: "Tirupati", type: "State", est: 1954, category: "Arts & Science" },
    { name: "Adikavi Nannaya University", abbr: "AKNU", city: "Rajahmundry", type: "State", est: 2006, category: "Arts & Science" },
    { name: "Dr. B. R. Ambedkar University", abbr: "BRAU", city: "Srikakulam", type: "State", est: 2008, category: "Arts & Science" },
    { name: "Krishna University", abbr: "KRU", city: "Machilipatnam", type: "State", est: 2008, category: "Arts & Science" },
    { name: "Rayalaseema University", abbr: "RU", city: "Kurnool", type: "State", est: 2008, category: "Arts & Science" },
    { name: "Vikram Simhapuri University", abbr: "VSU", city: "Nellore", type: "State", est: 2008, category: "Arts & Science" },
    { name: "Dr. YSR Architecture and Fine Arts University", abbr: "YSRU", city: "Kadapa", type: "State", est: 2020, category: "Arts & Science" },

    // Engineering
    { name: "Indian Institute of Technology Tirupati", abbr: "IIT Tirupati", city: "Tirupati", type: "Government", est: 2015, category: "Engineering" },
    { name: "National Institute of Technology Andhra Pradesh", abbr: "NIT AP", city: "Tadepalligudem", type: "Government", est: 2015, category: "Engineering" },
    { name: "Indian Institute of Information Technology Sri City", abbr: "IIIT Sri City", city: "Sri City", type: "Government", est: 2013, category: "Engineering" },
    { name: "GITAM Institute of Technology", abbr: "GITAM", city: "Visakhapatnam", type: "Private", est: 1980, category: "Engineering" },
    { name: "Vignan's Foundation for Science, Technology and Research", abbr: "VFSTR", city: "Guntur", type: "Private", est: 1997, category: "Engineering" },
    { name: "Sri Venkateswara College of Engineering", abbr: "SVCE", city: "Tirupati", type: "Private", est: 2007, category: "Engineering" },
    { name: "Pragati Engineering College", abbr: "PEC", city: "Surampalem", type: "Private", est: 2001, category: "Engineering" },

    // Medical
    { name: "AIIMS Mangalagiri", abbr: "AIIMS-M", city: "Mangalagiri", type: "Government", est: 2018, category: "Medical" },
    { name: "Andhra Medical College", abbr: "AMC", city: "Visakhapatnam", type: "Government", est: 1923, category: "Medical" },
    { name: "Guntur Medical College", abbr: "GMC", city: "Guntur", type: "Government", est: 1946, category: "Medical" },
    { name: "Kurnool Medical College", abbr: "KMC", city: "Kurnool", type: "Government", est: 1956, category: "Medical" },
    { name: "Rangaraya Medical College", abbr: "RMC", city: "Kakinada", type: "Government", est: 1958, category: "Medical" },
    { name: "Sri Venkateswara Medical College", abbr: "SVMC", city: "Tirupati", type: "Government", est: 1960, category: "Medical" },
    { name: "Narayana Medical College", abbr: "NMC", city: "Nellore", type: "Private", est: 1999, category: "Medical" },
    { name: "NRI Medical College", abbr: "NRIMC", city: "Chinakakani", type: "Private", est: 2003, category: "Medical" },
    { name: "Alluri Sitarama Raju Academy of Medical Sciences", abbr: "ASRAM", city: "Eluru", type: "Private", est: 1999, category: "Medical" },

    // Pharmacy
    { name: "Andhra University College of Pharmaceutical Sciences", abbr: "AUCPS", city: "Visakhapatnam", type: "Government", est: 1951, category: "Pharmacy" },
    { name: "Apollo College of Pharmacy", abbr: "ACP", city: "Chittoor", type: "Private", est: 1994, category: "Pharmacy" },

    // Arts / Science / Commerce
    { name: "Andhra Loyola College", abbr: "ALC", city: "Vijayawada", type: "Private", est: 1953, category: "Arts & Science" },
    { name: "Gayatri Vidya Parishad College", abbr: "GVPC", city: "Visakhapatnam", type: "Private", est: 1989, category: "Arts & Science" },
    { name: "A.N.R. College", abbr: "ANR", city: "Gudivada", type: "Private", est: 1950, category: "Arts & Science" }
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>&#8377;15K — &#8377;20L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>&#8377;50K — &#8377;30L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "NEET UG for MBBS followed by Dr. YSR HUS centralized counseling.";
        placementInfo = "Mandatory 1-year clinical internship in affiliated hospitals.";
    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>&#8377;1L — &#8377;4L</td><td>10+2 PCM + AP EAPCET / JEE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>&#8377;60K — &#8377;2L</td><td>B.Tech + GATE / AP PGECET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "State-level AP EAPCET (EAMCET) is the primary gateway for government and private engineering colleges in AP.";
        placementInfo = "Strong placements in leading IT companies (TCS, Infosys, Wipro) and core engineering sectors.";
    } else if (col.category === 'Pharmacy') {
        coursesHtml = `<tr><td><strong>B.Pharm</strong></td><td>4 Years</td><td>&#8377;50K — &#8377;2L</td><td>10+2 PCB/PCM + AP EAPCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Pharm.D</strong></td><td>6 Years</td><td>&#8377;1L — &#8377;4L</td><td>10+2 PCB/PCM + AP EAPCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions primarily via AP EAPCET for undergraduate programs.";
        placementInfo = "Placements in top pharmaceutical companies, research organizations, and hospital pharmacies.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3-4 Years</td><td>&#8377;10K — &#8377;50K</td><td>10+2 / CUET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>&#8377;20K — &#8377;60K</td><td>Bachelor's Degree + AP PGCET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions based on 10+2 merit, APPGCET for post-graduation, or CUET for Central Universities.";
        placementInfo = "Placements across banking, education, sciences, and administrative sectors.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const feesSectionHtml = col.category !== 'Medical' ? `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Details about the fee structure and AP Govt scheme Jagananna Vidya Deevena fee reimbursement.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>Jagananna Vidya Deevena</h4><p>Full fee reimbursement for eligible students based on income criteria.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>Merit Scholarships</h4><p>Available for top performers in university and state-level exams.</p></div>
                    </div>
                </div>
            </section>
  ` : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, highest placement packages, scholarships, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, ${col.abbr} fees, Andhra Pradesh, AP EAPCET, NextCampus, higher education">
    <link rel="icon" type="image/svg+xml" href="../../../favicon/favicon.svg">
    <link rel="icon" type="image/png" sizes="96x96" href="../../../favicon/favicon-96x96.png">
    <link rel="shortcut icon" href="../../../favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="../../../favicon/apple-touch-icon.png">
    <link rel="manifest" href="../../../favicon/site.webmanifest">
    <meta name="theme-color" content="#0056D2">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../../shared/global.css">
    <link rel="stylesheet" href="../../../shared/header.css">
    <link rel="stylesheet" href="../../../shared/footer.css">
    <link rel="stylesheet" href="../../../shared/college.css">
    <link rel="stylesheet" href="${collegeSlug}.css">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "${col.name}",
      "alternateName": "${col.abbr}",
      "url": "https://nextcampus.com/colleges/andhra-pradesh/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/andhra-pradesh/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Andhra Pradesh</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Andhra Pradesh, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.1</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${col.type}</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">&#127942; Top Rated</span>
                            <span class="badge-accr">Recognized</span>
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
                    <p>${col.name} (${col.abbr}) is a prominent educational institution located in ${col.city}, Andhra Pradesh. Established in ${col.est}, it has a strong reputation for academic excellence and student development across various disciplines.</p>
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
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling & Allocation</h4><p>Participate in state or national level counselling processes based on your entrance rank.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Report to the college with original documents after seat allocation to lock admission.</p></div></div>
                    </div>
                </div>
            </section>
            
            <!-- FEES -->
            ${feesSectionHtml}

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>${col.category === 'Medical' || col.category === 'Dental' ? 'Internships & Residency' : 'Placements & Internships'}</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>4.1 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Student</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Great faculty, solid infrastructure, and decent placements. A good place to build a career foundation."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Library & Campus</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Canteen & Lawns</span></div>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <div class="mobile-apply-bar" id="mobile-apply-bar">
        <a href="#" class="btn-lpu-apply mobile-apply-btn">Apply Now &#8594;</a>
    </div>

    <script src="../../../shared/header.js"></script>
    <script src="../../../shared/footer.js"></script>
    <script src="${collegeSlug}.js"></script>
</body>
</html>`;
}

function processAll() {
    const newCards = [];

    for (const col of apColleges) {
        const collegeSlug = slugify(col.name);
        const dir = path.join(basePath, 'andhra-pradesh', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug), 'utf8'); // It uses col.slug inside gen_utils safely

        // Create card data
        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")} (${col.abbr})',
      city: '${col.city}', state: 'Andhra Pradesh', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/${collegeSlug}/${collegeSlug}.html',
      rating: '4.1', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    // Inject into home.js
    let homeContent = fs.readFileSync(homeJsPath, 'utf8');
    const injectToken = "const colleges = [";
    const injectionPoint = homeContent.indexOf(injectToken);

    if (injectionPoint !== -1) {
        const startOfArray = injectionPoint + injectToken.length;
        homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
        fs.writeFileSync(homeJsPath, homeContent, 'utf8');
        console.log(`\n✅ Injected ${apColleges.length} AP Colleges into home.js !`);
    } else {
        console.log("\n❌ Could not find injection point in home.js.");
    }
}

processAll();

