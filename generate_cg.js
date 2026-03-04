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

const chhattisgarhColleges = [
    // Universities
    { name: "Guru Ghasidas Vishwavidyalaya", abbr: "GGU", city: "Bilaspur", type: "Central", est: 1983, category: "Arts & Science" },
    { name: "Pt. Ravishankar Shukla University", abbr: "PRSU", city: "Raipur", type: "State", est: 1964, category: "Arts & Science" },
    { name: "Indira Gandhi Krishi Vishwavidyalaya", abbr: "IGKV", city: "Raipur", type: "State", est: 1987, category: "Arts & Science" },
    { name: "Chhattisgarh Swami Vivekanand Technical University", abbr: "CSVTU", city: "Bhilai", type: "State", est: 2005, category: "Engineering" },
    { name: "Hidayatullah National Law University", abbr: "HNLU", city: "New Raipur", type: "State", est: 2003, category: "Law" },
    { name: "Pandit Sundarlal Sharma Open University", abbr: "PSSOU", city: "Bilaspur", type: "State", est: 2005, category: "Arts & Science" },
    { name: "Ayush and Health Sciences University of Chhattisgarh", abbr: "AHSU", city: "Raipur", type: "State", est: 2008, category: "Medical" },
    { name: "Kushabhau Thakre Patrakarita Avam Jansanchar Vishwavidyalaya", abbr: "KTUJM", city: "Raipur", type: "State", est: 2005, category: "Arts & Science" },

    // Engineering Colleges
    { name: "Indian Institute of Technology Bhilai", abbr: "IIT Bhilai", city: "Bhilai", type: "Government", est: 2016, category: "Engineering" },
    { name: "National Institute of Technology Raipur", abbr: "NIT Raipur", city: "Raipur", type: "Government", est: 1956, category: "Engineering" },
    { name: "Bhilai Institute of Technology", abbr: "BIT", city: "Durg", type: "Private", est: 1986, category: "Engineering" },
    { name: "Rungta College of Engineering and Technology", abbr: "RCET", city: "Bhilai", type: "Private", est: 1999, category: "Engineering" }, // Assuming RCET Bhilai is same
    { name: "Shri Shankaracharya Technical Campus", abbr: "SSTC", city: "Bhilai", type: "Private", est: 1999, category: "Engineering" },
    { name: "Chhattisgarh Engineering College", abbr: "CEC", city: "Durg", type: "Private", est: 2008, category: "Engineering" },

    // Medical Colleges
    { name: "All India Institute of Medical Sciences Raipur", abbr: "AIIMS Raipur", city: "Raipur", type: "Government", est: 2012, category: "Medical" },
    { name: "Pt. Jawahar Lal Nehru Memorial Medical College", abbr: "JNMC", city: "Raipur", type: "Government", est: 1963, category: "Medical" },
    { name: "Late Baliram Kashyap Memorial Government Medical College", abbr: "GMC Jagdalpur", city: "Jagdalpur", type: "Government", est: 2001, category: "Medical" },
    { name: "Chhattisgarh Institute of Medical Sciences", abbr: "CIMS", city: "Bilaspur", type: "Government", est: 2001, category: "Medical" },
    { name: "Government Medical College Rajnandgaon", abbr: "GMC Rajnandgaon", city: "Rajnandgaon", type: "Government", est: 2014, category: "Medical" },

    // Government Degree Colleges
    { name: "Government Science College Raipur", abbr: "GSC Raipur", city: "Raipur", type: "Government", est: 1948, category: "Arts & Science" },
    { name: "Government College Durg", abbr: "GC Durg", city: "Durg", type: "Government", est: 1958, category: "Arts & Science" },
    { name: "Government College Bilaspur", abbr: "GC Bilaspur", city: "Bilaspur", type: "Government", est: 1944, category: "Arts & Science" },
    { name: "Government College Jagdalpur", abbr: "GC Jagdalpur", city: "Jagdalpur", type: "Government", est: 1961, category: "Arts & Science" },
    { name: "Government College Raigarh", abbr: "GC Raigarh", city: "Raigarh", type: "Government", est: 1958, category: "Arts & Science" },
    { name: "Government College Korba", abbr: "GC Korba", city: "Korba", type: "Government", est: 1981, category: "Arts & Science" },
    { name: "Government College Ambikapur", abbr: "GC Ambikapur", city: "Ambikapur", type: "Government", est: 1960, category: "Arts & Science" },
    { name: "Government College Dantewada", abbr: "GC Dantewada", city: "Dantewada", type: "Government", est: 1982, category: "Arts & Science" },
    { name: "Government College Kanker", abbr: "GC Kanker", city: "Kanker", type: "Government", est: 1962, category: "Arts & Science" },

    // Private Colleges
    { name: "Rungta Engineering College Raipur", abbr: "REC Raipur", city: "Raipur", type: "Private", est: 2009, category: "Engineering" },
    { name: "Columbia Institute of Engineering and Technology Raipur", abbr: "CIET", city: "Raipur", type: "Private", est: 2008, category: "Engineering" },
    { name: "MATS University Raipur", abbr: "MATS", city: "Raipur", type: "Private", est: 2006, category: "Arts & Science" },
    { name: "Amity University Raipur", abbr: "Amity Raipur", city: "Raipur", type: "Private", est: 2014, category: "Arts & Science" },
    { name: "ITM University Raipur", abbr: "ITM Raipur", city: "Raipur", type: "Private", est: 2012, category: "Arts & Science" },
    { name: "Kalinga University Raipur", abbr: "KU Raipur", city: "Raipur", type: "Private", est: 2013, category: "Arts & Science" },
    { name: "ICFAI University Raipur", abbr: "ICFAI Raipur", city: "Raipur", type: "Private", est: 2011, category: "Arts & Science" },
    { name: "Shri Rawatpura Sarkar University Raipur", abbr: "SRU", city: "Raipur", type: "Private", est: 2018, category: "Arts & Science" },

    // Other Professional Colleges
    { name: "Government Dental College Raipur", abbr: "GDC Raipur", city: "Raipur", type: "Government", est: 2003, category: "Medical" },
    { name: "Rungta Dental College Bhilai", abbr: "RDC Bhilai", city: "Bhilai", type: "Private", est: 2005, category: "Medical" },
    { name: "Raipur Institute of Technology", abbr: "RITEE", city: "Raipur", type: "Private", est: 1995, category: "Engineering" },
    { name: "Shri Shankaracharya Institute of Medical Sciences", abbr: "SSIMS", city: "Bhilai", type: "Private", est: 2016, category: "Medical" },
    { name: "Rungta Institute of Pharmaceutical Sciences", abbr: "RIPS", city: "Bhilai", type: "Private", est: 2005, category: "Pharmacy" },
    { name: "Columbia College of Pharmacy", abbr: "CCP", city: "Raipur", type: "Private", est: 2004, category: "Pharmacy" },
    { name: "Government Ayurvedic College Raipur", abbr: "GAC Raipur", city: "Raipur", type: "Government", est: 1955, category: "Medical" },
    { name: "Government Homeopathic Medical College Raipur", abbr: "GHMC Raipur", city: "Raipur", type: "Government", est: 2000, category: "Medical" },
    { name: "Raipur Nursing College", abbr: "RNC", city: "Raipur", type: "Government", est: 2006, category: "Medical" },
    { name: "Government Polytechnic Raipur", abbr: "GPR", city: "Raipur", type: "Government", est: 1956, category: "Engineering" },
    { name: "Bhilai Polytechnic College", abbr: "BPC", city: "Bhilai", type: "Government", est: 1961, category: "Engineering" }, // Simplified year for government polys
    { name: "Raigarh Polytechnic College", abbr: "RPC", city: "Raigarh", type: "Government", est: 1960, category: "Engineering" } // Simplified year
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category === 'Medical') {
        let isDentalOrAyur = col.name.includes("Dental") || col.name.includes("Ayurvedic") || col.name.includes("Homeopathic") || col.name.includes("Nursing");
        if (isDentalOrAyur) {
            coursesHtml = `<tr><td><strong>BDS/BAMS/BHMS/B.Sc Nursing</strong></td><td>4.5-5.5 Yrs</td><td>&#8377;20K — &#8377;12L</td><td>10+2 PCB + NEET/State Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
            admissionHtml = "State quota seats through Directorate of Medical Education (DME) Chhattisgarh based on NEET UG scores.";
            placementInfo = "Mandatory clinical internship in affiliated hospitals and dispensaries.";
        } else {
            coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>&#8377;50K — &#8377;15L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                       <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>&#8377;1L — &#8377;25L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
            admissionHtml = "State quota and all-India seats through Director of Medical Education Chhattisgarh based on NEET scores.";
            placementInfo = "Mandatory 1-year clinical internship in affiliated state government hospitals with a monthly stipend.";
        }
    } else if (col.category === 'Engineering') {
        coursesHtml = `<tr><td><strong>B.Tech / B.E. / Diploma</strong></td><td>3-4 Years</td><td>&#8377;20K — &#8377;4L</td><td>10+2 PCM + CG PET / JEE Main</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech / M.E.</strong></td><td>2 Years</td><td>&#8377;50K — &#8377;2L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "State engineering admissions are primarily through CG PET (Chhattisgarh Pre Engineering Test) and JEE Main through DTE Counseling.";
        placementInfo = "Strong placements in core manufacturing due to proximity to Bhilai Steel Plant, along with mass IT recruiters like TCS and Wipro.";
    } else if (col.category === 'Pharmacy') {
        coursesHtml = `<tr><td><strong>B.Pharm</strong></td><td>4 Years</td><td>&#8377;50K — &#8377;2.5L</td><td>10+2 PCB/PCM + CG PPHT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>D.Pharm</strong></td><td>2 Years</td><td>&#8377;40K — &#8377;1L</td><td>10+2 PCB/PCM</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions via Chhattisgarh Pre Pharmacy Test (CG PPHT).";
        placementInfo = "Opportunities in pharmaceutical manufacturing units in central India and pharmacy retail/hospitals.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>&#8377;5L — &#8377;8L</td><td>10+2 + CLAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1 Year</td><td>&#8377;1L — &#8377;2L</td><td>LLB + CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions explicitly through the Common Law Admission Test (CLAT).";
        placementInfo = "Placements in top-tier law firms, corporate legal departments, and excellent judicial services coaching environment.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com / Krishi</strong></td><td>3-4 Years</td><td>&#8377;5K — &#8377;40K</td><td>10+2 / CUET / State Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>&#8377;10K — &#8377;60K</td><td>Bachelor's Degree</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions based on 10+2 merit. Agriculture and technical universities have specific state-level entrance exams.";
        placementInfo = "Students majorly opt for higher education, state civil services (CGPSC), or regional private sector jobs.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const feesSectionHtml = col.category !== 'Medical' ? `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Details about the fee structure and Chhattisgarh state specific scholarships.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>Chhattisgarh State Scholarship Portal</h4><p>Post-Matric Scholarships for SC/ST/OBC students of Chhattisgarh.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>BPL Scholarship</h4><p>Fee concessions and stipends for students belonging to Below Poverty Line families.</p></div>
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
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, ${col.abbr} fees, Chhattisgarh colleges, CG PET, NextCampus">
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
      "url": "https://nextcampus.com/colleges/chhattisgarh/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/chhattisgarh/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Chhattisgarh</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Chhattisgarh, India</p>
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
                    <p>${col.name} (${col.abbr}) is a significant educational institution located in ${col.city}, Chhattisgarh. Established in ${col.est}, it has played a vital role in providing quality education and fostering development in central India.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Qualify Entrance Exam / Merit</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling & Allocation</h4><p>Participate in state (DTE/DME Chhattisgarh) or central counselling processes based on your entrance rank or 12th percentage.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Report to the college with original documents and Domicile certificates (if applicable) after seat allocation.</p></div></div>
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
                        <p>"Good academic environment with supportive faculty. The campus has good facilities and the state scholarships are very helpful."</p>
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
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Canteen & Hostels</span></div>
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
    let homeContent = fs.readFileSync(homeJsPath, 'utf8');

    for (const col of chhattisgarhColleges) {
        const collegeSlug = slugify(col.name);

        // Check if college already exists in home.js to avoid duplicates
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping ${col.name} (${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'chhattisgarh', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        // Create card data
        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")} (${col.abbr})',
      city: '${col.city}', state: 'Chhattisgarh', type: '${col.type}',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/${collegeSlug}/${collegeSlug}.html',
      rating: '4.1', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    // Inject into home.js if there are new cards
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Chhattisgarh Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Chhattisgarh Colleges to inject.`);
    }
}

processAll();

