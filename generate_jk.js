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

const jkColleges = [
    // Universities in Jammu & Kashmir
    { name: "University of Kashmir", abbr: "KU", city: "Srinagar", type: "State", est: 1948, category: "Arts & Science" },
    { name: "University of Jammu", abbr: "JU", city: "Jammu", type: "State", est: 1969, category: "Arts & Science" },
    { name: "Sher-e-Kashmir University of Agricultural Sciences and Technology of Kashmir", abbr: "SKUAST-K", city: "Srinagar", type: "State", est: 1982, category: "Agriculture" },
    { name: "Sher-e-Kashmir University of Agricultural Sciences and Technology of Jammu", abbr: "SKUAST-J", city: "Jammu", type: "State", est: 1999, category: "Agriculture" },
    { name: "Islamic University of Science and Technology", abbr: "IUST", city: "Awantipora", type: "State", est: 2005, category: "Engineering" },
    { name: "Central University of Jammu", abbr: "CUJ", city: "Samba", type: "Central", est: 2011, category: "Arts & Science" },
    { name: "Central University of Kashmir", abbr: "CUK", city: "Ganderbal", type: "Central", est: 2009, category: "Arts & Science" },
    { name: "Shri Mata Vaishno Devi University", abbr: "SMVDU", city: "Katra", type: "State", est: 1999, category: "Engineering" },
    { name: "Cluster University Srinagar", abbr: "CUS", city: "Srinagar", type: "State", est: 2016, category: "Arts & Science" },
    { name: "Cluster University Jammu", abbr: "CUJ", city: "Jammu", type: "State", est: 2016, category: "Arts & Science" }, // Acronym overlap with Central Univ

    // Engineering Colleges
    { name: "National Institute of Technology Srinagar", abbr: "NIT Srinagar", city: "Srinagar", type: "Government", est: 1960, category: "Engineering" },
    { name: "Indian Institute of Technology Jammu", abbr: "IIT Jammu", city: "Jammu", type: "Government", est: 2016, category: "Engineering" },
    { name: "Government College of Engineering and Technology Jammu", abbr: "GCET Jammu", city: "Jammu", type: "Government", est: 1994, category: "Engineering" },
    { name: "SSM College of Engineering", abbr: "SSMCE", city: "Parihaspora", type: "Private", est: 1988, category: "Engineering" },
    { name: "Islamia College of Science and Commerce", abbr: "ICSC", city: "Srinagar", type: "Government", est: 1961, category: "Arts & Science" }, // Contains Engg/Comm aspects

    // Medical Colleges
    { name: "Government Medical College Srinagar", abbr: "GMC Srinagar", city: "Srinagar", type: "Government", est: 1959, category: "Medical" },
    { name: "Government Medical College Jammu", abbr: "GMC Jammu", city: "Jammu", type: "Government", est: 1973, category: "Medical" },
    { name: "Sher-i-Kashmir Institute of Medical Sciences", abbr: "SKIMS", city: "Srinagar", type: "Autonomous", est: 1977, category: "Medical" },
    { name: "Government Medical College Anantnag", abbr: "GMC Anantnag", city: "Anantnag", type: "Government", est: 2019, category: "Medical" },
    { name: "Government Medical College Baramulla", abbr: "GMC Baramulla", city: "Baramulla", type: "Government", est: 2018, category: "Medical" },

    // Major Degree Colleges
    { name: "Sri Pratap College Srinagar", abbr: "SP College", city: "Srinagar", type: "Government", est: 1905, category: "Arts & Science" },
    { name: "Amar Singh College Srinagar", abbr: "AS College", city: "Srinagar", type: "Government", est: 1913, category: "Arts & Science" },
    { name: "Gandhi Memorial College Srinagar", abbr: "GMC Srinagar (Arts)", city: "Srinagar", type: "Private Aided", est: 1943, category: "Arts & Science" },
    { name: "Women’s College Srinagar", abbr: "GCW MA Road", city: "Srinagar", type: "Government", est: 1950, category: "Arts & Science" },
    { name: "Women’s College Baramulla", abbr: "GCW Baramulla", city: "Baramulla", type: "Government", est: 1986, category: "Arts & Science" },
    { name: "Government College Anantnag", abbr: "GDC Anantnag", city: "Anantnag", type: "Government", est: 1950, category: "Arts & Science" },
    { name: "Government College Pulwama", abbr: "GDC Pulwama", city: "Pulwama", type: "Government", est: 1986, category: "Arts & Science" },
    { name: "Government College Kupwara", abbr: "GDC Kupwara", city: "Kupwara", type: "Government", est: 1988, category: "Arts & Science" },
    { name: "Government College Kulgam", abbr: "GDC Kulgam", city: "Kulgam", type: "Government", est: 2004, category: "Arts & Science" },
    { name: "Government College Bandipora", abbr: "GDC Bandipora", city: "Bandipora", type: "Government", est: 2005, category: "Arts & Science" },

    // Management Colleges
    { name: "Indian Institute of Management Jammu", abbr: "IIM Jammu", city: "Jammu", type: "Government", est: 2016, category: "Management" },
    { name: "The Business School University of Jammu", abbr: "TBS JU", city: "Jammu", type: "State", est: 1986, category: "Management" },
    { name: "Department of Management Studies University of Kashmir", abbr: "TBS KU", city: "Srinagar", type: "State", est: 1991, category: "Management" },

    // Law Colleges
    { name: "National Law University Jammu", abbr: "NLU Jammu", city: "Jammu", type: "State", est: 2009, category: "Law" }, // Placeholder for NLUJAA/J&K NLU development
    { name: "Faculty of Law University of Jammu", abbr: "Law JU", city: "Jammu", type: "State", est: 1969, category: "Law" },
    { name: "School of Law University of Kashmir", abbr: "Law KU", city: "Srinagar", type: "State", est: 1978, category: "Law" },

    // Other Colleges (Polytechnics)
    { name: "Government Polytechnic Srinagar", abbr: "KGP Srinagar", city: "Srinagar", type: "Government", est: 1958, category: "Engineering" },
    { name: "Government Polytechnic Jammu", abbr: "GP Jammu", city: "Jammu", type: "Government", est: 1960, category: "Engineering" },
    { name: "Government Polytechnic Anantnag", abbr: "GP Anantnag", city: "Anantnag", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Baramulla", abbr: "GP Baramulla", city: "Baramulla", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Pulwama", abbr: "GP Pulwama", city: "Pulwama", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Kupwara", abbr: "GP Kupwara", city: "Kupwara", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Kulgam", abbr: "GP Kulgam", city: "Kulgam", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Bandipora", abbr: "GP Bandipora", city: "Bandipora", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Kathua", abbr: "GP Kathua", city: "Kathua", type: "Government", est: 2012, category: "Engineering" },
    { name: "Government Polytechnic Udhampur", abbr: "GP Udhampur", city: "Udhampur", type: "Government", est: 2012, category: "Engineering" }
];


function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";
    let isPolytechnic = col.name.includes("Polytechnic");
    let boardName = "JKBOPEE (J&K Board of Professional Entrance Examinations)";

    if (isPolytechnic) {
        coursesHtml = `<tr><td><strong>Diploma in Engineering</strong></td><td>3 Years</td><td>\u20B93K — \u20B915K</td><td>10th Pass with Math/Science</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>Lateral Entry Diploma</strong></td><td>2 Years</td><td>\u20B93K — \u20B915K</td><td>12th PCM / ITI</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `Admissions strictly via ${boardName} Polytechnic Entrance Test (PET).`;
        placementInfo = "Placements primarily focus on local PWD, PDD, and infrastructural companies involved in tunnel and highway projects across J&K.";
    } else if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B925K — \u20B91.5L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS</strong></td><td>3 Years</td><td>\u20B950K — \u20B92.5L</td><td>MBBS + NEET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `State quota (100% historically, gradually pooling to AIQ) counseling run by ${boardName} purely on NEET score matrices.`;
        placementInfo = "Elite medical institutions forming the backbone of healthcare in J&K. Mandatory rural service ensures complete absorbtion into state medical systems post-qualification.";
    } else if (col.category === 'Agriculture') {
        coursesHtml = `<tr><td><strong>B.Sc (Hons) Agriculture/Horticulture</strong></td><td>4 Years</td><td>\u20B915K — \u20B935K</td><td>10+2 PCB/PCM + SKUAST Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>B.V.Sc & A.H.</strong></td><td>5.5 Years</td><td>\u20B920K — \u20B940K</td><td>10+2 PCB + SKUAST Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Both Kashmir & Jammu agrivarsities conduct their independent pan-state Common Entrance Tests (UET).";
        placementInfo = "High focus on apple economy, saffron cultivation, and veterinary sciences; immense scope in state agro-research departments.";
    } else if (col.category === 'Engineering') {
        let isElite = col.abbr.includes("IIT") || col.abbr.includes("NIT");
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isElite ? '6L' : '1.5L'} — \u20B9${isElite ? '10L' : '4L'}</td><td>10+2 PCM + ${isElite ? 'JEE Main/Adv' : 'JKBOPEE CET / JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91.5L — \u20B93L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isElite ? "CSAB / JoSAA centralized counseling." : `${boardName} acts as the nodal agency for all state engineering allocations (CET).`;
        if (col.abbr === "SMVDU") admissionHtml += " Also takes direct JEE Main AIR for out-of-state quotas.";
        placementInfo = isElite ? "Solid packages extending to global roles." : "Active drives by state utilities and regional telecom/IT branches. IUST and SMVDU secure prominent off-campus mass hirings.";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA</strong></td><td>2 Years</td><td>\u20B92L — \u20B918L</td><td>Graduation + CAT/CMAT/MAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA</strong></td><td>3 Years</td><td>\u20B960K — \u20B92.5L</td><td>10+2 Merit + UGAT (if applicable)</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "IIM Jammu" ? "Strictly CAT." : "Kashmir University evaluates via CMAT, while Jammu University may consider MAT/CMAT followed by rigorous Group Discussions.";
        placementInfo = "Management roles heavily skew towards banking (J&K Bank, HDFC), tourism, and HR.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB</strong></td><td>5 Years</td><td>\u20B91.5L — \u20B910L</td><td>10+2 + Law Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>2 Years</td><td>\u20B950K — \u20B92L</td><td>LLB Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "State Universities conduct distinct faculty-level entrance examinations.";
        placementInfo = "Dominant success rates in J&K Public Service Commission (Judicial) examinations and Srinagar/Jammu High Court litigations.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3-4 Years</td><td>\u20B95K — \u20B920K</td><td>10+2 Merit / CUET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B910K — \u20B940K</td><td>Bachelor's + KU/JU Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Under NEP 2020, colleges under Kashmir/Jammu/Cluster universities use centralized portal admissions relying on CUET/merit formulas.";
        placementInfo = "Prime feeders for JKAS (State Administrative Services) and central examinations.";
    }

    const tabsHtml = getTabsHtml(col.category);
    const typeLabel = isPolytechnic ? 'Government Diploma' : col.type;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life in J&K. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, JKBOPEE, J&K Colleges, Jammu Kashmir University, NextCampus">
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
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "${col.name}",
      "alternateName": "${col.abbr}",
      "url": "https://nextcampus.com/colleges/jammu-and-kashmir/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/jammu-and-kashmir/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, J&K</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Jammu & Kashmir, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.4</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${typeLabel}</strong></span>
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
                    <p>${col.name} (${col.abbr}) is a premier institution located in ${col.city}, Jammu & Kashmir. Since its establishment in ${col.est}, it has stood as a beacon of academic excellence amidst the valley, driving immense sociocultural and intellectual development globally.</p>
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
            
            <!-- COURSES & FEES -->
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance Matrix</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>JKBOPEE / University Counselling</h4><p>Extensive counseling relying strictly on merit lists (domicile restrictions apply for state quotas).</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Final Submission</h4><p>Submission of Domicile Certificates natively generated by Tehsildars within J&K territories, coupled with academic credentials.</p></div></div>
                    </div>
                </div>
            </section>

            <!-- PLACEMENTS -->
            <section class="lpu-panel" id="panel-placements">
                <div class="lpu-card">
                    <h2>Career & Placements</h2>
                    <p>${placementInfo}</p>
                </div>
            </section>

            <!-- REVIEWS -->
            <section class="lpu-panel" id="panel-reviews">
                <div class="lpu-card">
                    <h2>Student Reviews</h2>
                    <p>Average Rating: <strong>4.4 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified J&K Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"Studying here provides an incredible balance of rigorous academics against the backdrop of unparalleled natural beauty. The faculty is highly experienced and cooperative."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Main Building</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Libraries & Grounds</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels</span></div>
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

    for (const col of jkColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'jammu-and-kashmir', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // Use LPU CSS as base, already fully decoupled safely
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Jammu & Kashmir', type: '${col.type}',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/${collegeSlug}/${collegeSlug}.html',
      rating: '4.4', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} J&K Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new J&K Colleges to inject.`);
    }
}

processAll();
