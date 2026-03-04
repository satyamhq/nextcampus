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

const duColleges = [
    // North Campus
    { slug: "ststephens", name: "St. Stephen’s College", abbr: "SSC", city: "New Delhi", est: 1881 },
    { slug: "hinducollege", name: "Hindu College", abbr: "HC", city: "New Delhi", est: 1899 },
    { slug: "mirandahouse", name: "Miranda House", abbr: "MH", city: "New Delhi", est: 1948 },
    { slug: "srcc", name: "Shri Ram College of Commerce", abbr: "SRCC", city: "New Delhi", est: 1926 },
    { slug: "hansraj", name: "Hansraj College", abbr: "HRC", city: "New Delhi", est: 1948 },
    { slug: "kirorimal", name: "Kirori Mal College", abbr: "KMC", city: "New Delhi", est: 1954 },
    { slug: "ramjas", name: "Ramjas College", abbr: "RC", city: "New Delhi", est: 1917 },
    { slug: "daulatram", name: "Daulat Ram College", abbr: "DRC", city: "New Delhi", est: 1960 },
    { slug: "indraprasthawomen", name: "Indraprastha College for Women", abbr: "IPCW", city: "New Delhi", est: 1924 },
    { slug: "sgtbkhalsa", name: "Sri Guru Tegh Bahadur Khalsa College", abbr: "SGTB", city: "New Delhi", est: 1951 },
    { slug: "shyamlal", name: "Shyam Lal College", abbr: "SLC", city: "New Delhi", est: 1964 },
    { slug: "shyamlaleve", name: "Shyam Lal College (Evening)", abbr: "SLC Eve", city: "New Delhi", est: 1969 },
    { slug: "zakirhusain", name: "Zakir Husain Delhi College", abbr: "ZHDC", city: "New Delhi", est: 1792 },
    { slug: "zakirhusaineve", name: "Zakir Husain Delhi College (Evening)", abbr: "ZHDC Eve", city: "New Delhi", est: 1958 },
    { slug: "satyawati", name: "Satyawati College", abbr: "SC", city: "New Delhi", est: 1972 },
    { slug: "satyawatieve", name: "Satyawati College (Evening)", abbr: "SC Eve", city: "New Delhi", est: 1973 },

    // South Campus
    { slug: "lsr", name: "Lady Shri Ram College", abbr: "LSR", city: "New Delhi", est: 1956 },
    { slug: "gargi", name: "Gargi College", abbr: "GC", city: "New Delhi", est: 1967 },
    { slug: "maitreyi", name: "Maitreyi College", abbr: "MC", city: "New Delhi", est: 1967 },
    { slug: "arsd", name: "Atma Ram Sanatan Dharma College", abbr: "ARSD", city: "New Delhi", est: 1959 },
    { slug: "dduc", name: "Deen Dayal Upadhyaya College", abbr: "DDUC", city: "New Delhi", est: 1990 },
    { slug: "deshbandhu", name: "Deshbandhu College", abbr: "DC", city: "New Delhi", est: 1952 },
    { slug: "motilalnehru", name: "Motilal Nehru College", abbr: "MLNC", city: "New Delhi", est: 1964 },
    { slug: "motilalnehrueve", name: "Motilal Nehru College (Evening)", abbr: "MLNC Eve", city: "New Delhi", est: 1965 },
    { slug: "pgdav", name: "P.G.D.A.V College", abbr: "PGDAV", city: "New Delhi", est: 1957 },
    { slug: "pgdaveve", name: "P.G.D.A.V College (Evening)", abbr: "PGDAV Eve", city: "New Delhi", est: 1958 },
    { slug: "ramlalanand", name: "Ram Lal Anand College", abbr: "RLA", city: "New Delhi", est: 1973 },
    { slug: "srivenkateswara", name: "Sri Venkateswara College", abbr: "SVC", city: "New Delhi", est: 1961 },
    { slug: "cvs", name: "College of Vocational Studies", abbr: "CVS", city: "New Delhi", est: 1972 },
    { slug: "kamalanehru", name: "Kamala Nehru College", abbr: "KNC", city: "New Delhi", est: 1964 },

    // Other DU Affiliated
    { slug: "andc", name: "Acharya Narendra Dev College", abbr: "ANDC", city: "New Delhi", est: 1991 },
    { slug: "aditimaha", name: "Aditi Mahavidyalaya", abbr: "AM", city: "New Delhi", est: 1994 },
    { slug: "aryabhatta", name: "Aryabhatta College", abbr: "AC", city: "New Delhi", est: 2014 },
    { slug: "bhagininivedita", name: "Bhagini Nivedita College", abbr: "BNC", city: "New Delhi", est: 1993 },
    { slug: "bcas", name: "Bhaskaracharya College of Applied Sciences", abbr: "BCAS", city: "New Delhi", est: 1995 },
    { slug: "bharaticollege", name: "Bharati College", abbr: "BC", city: "New Delhi", est: 1971 },
    { slug: "collegeofart", name: "College of Art", abbr: "CoA", city: "New Delhi", est: 1942 },
    { slug: "dcac", name: "Delhi College of Arts & Commerce", abbr: "DCAC", city: "New Delhi", est: 1987 },
    { slug: "dyalsingh", name: "Dyal Singh College", abbr: "DSC", city: "New Delhi", est: 1959 },
    { slug: "dyalsingheve", name: "Dyal Singh College (Evening)", abbr: "DSC Eve", city: "New Delhi", est: 1959 },
    { slug: "jmc", name: "Jesus & Mary College", abbr: "JMC", city: "New Delhi", est: 1968 },
    { slug: "kalindi", name: "Kalindi College", abbr: "KC", city: "New Delhi", est: 1967 },
    { slug: "keshavmahavidyalaya", name: "Keshav Mahavidyalaya", abbr: "KMV", city: "New Delhi", est: 1994 },
    { slug: "lakshmibai", name: "Lakshmibai College", abbr: "LBC", city: "New Delhi", est: 1965 },
    { slug: "maharajaagrasen", name: "Maharaja Agrasen College", abbr: "MAC", city: "New Delhi", est: 1994 },
    { slug: "maharshivalmiki", name: "Maharshi Valmiki College of Education", abbr: "MVCE", city: "New Delhi", est: 1995 },
    { slug: "matasundri", name: "Mata Sundri College for Women", abbr: "MSC", city: "New Delhi", est: 1967 },
    { slug: "rajdhani", name: "Rajdhani College", abbr: "RC", city: "New Delhi", est: 1964 },
    { slug: "ramanujan", name: "Ramanujan College", abbr: "RC", city: "New Delhi", est: 2010 },
    { slug: "sbsc", name: "Shaheed Bhagat Singh College", abbr: "SBSC", city: "New Delhi", est: 1967 },
    { slug: "sbsceve", name: "Shaheed Bhagat Singh College (Evening)", abbr: "SBSC Eve", city: "New Delhi", est: 1973 },
    { slug: "shaheedrajguru", name: "Shaheed Rajguru College of Applied Sciences", abbr: "SRCASW", city: "New Delhi", est: 1989 },
    { slug: "shivaji", name: "Shivaji College", abbr: "SC", city: "New Delhi", est: 1961 },
    { slug: "sriaurobindo", name: "Sri Aurobindo College", abbr: "SAC", city: "New Delhi", est: 1972 },
    { slug: "sriaurobindoeve", name: "Sri Aurobindo College (Evening)", abbr: "SAC Eve", city: "New Delhi", est: 1984 },
    { slug: "sggscc", name: "Sri Guru Gobind Singh College of Commerce", abbr: "SGGSCC", city: "New Delhi", est: 1984 },
    { slug: "swamishraddhanand", name: "Swami Shraddhanand College", abbr: "SSNC", city: "New Delhi", est: 1967 },
    { slug: "vivekananda", name: "Vivekananda College", abbr: "VC", city: "New Delhi", est: 1970 },
    { slug: "drbrambedkar", name: "Dr. Bhim Rao Ambedkar College", abbr: "BRAC", city: "New Delhi", est: 1991 },
    { slug: "igipess", name: "Indira Gandhi Institute of Physical Education", abbr: "IGIPESS", city: "New Delhi", est: 1987 },
    { slug: "ihe", name: "Institute of Home Economics", abbr: "IHE", city: "New Delhi", est: 1961 },
    { slug: "ladyirwin", name: "Lady Irwin College", abbr: "LIC", city: "New Delhi", est: 1932 },
    { slug: "dusol", name: "School of Open Learning", abbr: "SOL", city: "New Delhi", est: 1962 },
    { slug: "ncweb", name: "Non-Collegiate Women’s Education Board", abbr: "NCWEB", city: "New Delhi", est: 1943 },

    // DU Medical & Professional
    { slug: "lhmc", name: "Lady Hardinge Medical College", abbr: "LHMC", city: "New Delhi", est: 1916 },
    { slug: "mamc", name: "Maulana Azad Medical College", abbr: "MAMC", city: "New Delhi", est: 1959 },
    { slug: "ucms", name: "University College of Medical Sciences", abbr: "UCMS", city: "New Delhi", est: 1971 },
    { slug: "vmmc", name: "Vardhman Mahavir Medical College", abbr: "VMMC", city: "New Delhi", est: 2001 },
    { slug: "foldu", name: "Faculty of Law", abbr: "FoL DU", city: "New Delhi", est: 1924 },
    { slug: "fmsdu", name: "Faculty of Management Studies", abbr: "FMS", city: "New Delhi", est: 1954 }
];

function generateHtml(col, collegeSlug) {
    let category = "Arts & Science";
    let coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3-4 Years</td><td>&#8377;10K — &#8377;30K</td><td>10+2 + CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                 <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>&#8377;15K — &#8377;40K</td><td>Bachelor's + CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
    let admissionHtml = "CUET UG & CUET PG through Delhi University Common Seat Allocation System (CSAS).";
    let placementInfo = "Students undergo summer internships and final placements with top corporate recruiters across consulting, finance, and IT.";

    const nameLower = col.name.toLowerCase();

    if (nameLower.includes("medical")) {
        category = "Medical";
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>&#8377;15K — &#8377;50K</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>&#8377;50K — &#8377;2L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "NEET UG for MBBS. Admissions are handled through central MCC counselling.";
        placementInfo = "Mandatory 1-year internship in affiliated government hospitals with monthly stipend.";
    } else if (nameLower.includes("commerce") || nameLower.includes("management") || col.slug === "fmsdu") {
        category = "MBA / Commerce";
        if (col.slug === "fmsdu") {
            coursesHtml = `<tr><td><strong>MBA</strong></td><td>2 Years</td><td>&#8377;2L (Total)</td><td>Bachelor's + CAT (high percentile)</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                         <tr><td><strong>Executive MBA</strong></td><td>2 Years</td><td>&#8377;1.5L</td><td>Bachelor's + Work Exp</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
            admissionHtml = "Extremely competitive admission via CAT score, extempore, and personal interview.";
            placementInfo = "Considered the highest ROI B-school in India with average packages crossing ₹30-34 LPA from top MBB and FMCG firms.";
        } else {
            coursesHtml = `<tr><td><strong>B.Com (Hons)</strong></td><td>3-4 Years</td><td>&#8377;15K — &#8377;35K</td><td>10+2 + CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                         <tr><td><strong>BA Economics (Hons)</strong></td><td>3-4 Years</td><td>&#8377;15K — &#8377;35K</td><td>10+2 + CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        }
    } else if (nameLower.includes("law")) {
        category = "Law";
        coursesHtml = `<tr><td><strong>LLB</strong></td><td>3 Years</td><td>&#8377;15K — &#8377;25K</td><td>Bachelor's Degree + CUET PG/DU LLB</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>2 Years</td><td>&#8377;15K — &#8377;25K</td><td>LLB + PG Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Admissions historically through DU Entrance Exam, now transitioning towards CUET PG.";
        placementInfo = "Excellent alumni network across Indian judiciary and tier-1 corporate law firms with great litigation exposure.";
    }

    const tabsHtml = getTabsHtml(category);
    const feesSectionHtml = category !== 'Medical' ? `
            <section class="lpu-panel" id="panel-fees">
                <div class="lpu-card">
                    <h2>Fee Structure & Scholarships</h2>
                    <p>Subsidized higher education means nominal tuition fees. Financial backing is available through NSP and DU specific endowments.</p>
                    <div class="scholarship-grid">
                        <div class="scholarship-item"><div class="scholarship-icon">&#127775;</div><h4>Merit & Means Scholarships</h4><p>Fee waivers based on family income and past academic merit.</p></div>
                        <div class="scholarship-item"><div class="scholarship-icon">&#128188;</div><h4>NSP & State Scholarships</h4><p>National Scholarship Portal grants applicable.</p></div>
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
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, ${col.abbr} fees, Delhi University, DU colleges, NextCampus, higher education">
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
      "url": "https://nextcampus.com/colleges/delhi/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/delhi/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, Delhi</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Delhi, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.3</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>Public/Central</strong></span>
                            <span class="divider">|</span>
                            <span>Affiliation: <strong>Delhi University</strong></span>
                        </div>
                        <div class="lpu-badges">
                            <span class="badge-rank nirf">&#127942; DU Affiliate</span>
                            <span class="badge-accr">NAAC Accredited</span>
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
                    <p>${col.name} (${col.abbr}) is a premier constituent college of the University of Delhi, located in ${col.city}. Established in ${col.est}, it holds a legacy of academic excellence, distinguished alumni, and vibrant college life.</p>
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
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling & Allocation</h4><p>Register online for central counselling (CSAS for DU/MCC for Medical) using your entrance rank.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Seat Acceptance</h4><p>Report to the college with original documents after seat allocation to lock admission.</p></div></div>
                    </div>
                </div>
            </section>
            
            <!-- FEES -->
            ${feesSectionHtml}

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>${category === 'Medical' || category === 'Dental' ? 'Internships & Residency' : 'Placements & Internships'}</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>4.3 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Student</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The exposure at a DU college is unmatched. Societies, fests, and deeply knowledgeable faculty create an incredible 3-year transformation."</p>
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

    for (const col of duColleges) {
        const collegeSlug = slugify(col.name);
        const dir = path.join(basePath, 'delhi', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug), 'utf8');

        // Create card data
        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")} (${col.abbr})',
      city: '${col.city}', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/${collegeSlug}/${collegeSlug}.html',
      rating: '4.3', accr: 'DU Affiliated'
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
        console.log(`\n✅ Injected ${duColleges.length} DU Colleges into home.js !`);
    } else {
        console.log("\n❌ Could not find injection point in home.js.");
    }
}

processAll();

