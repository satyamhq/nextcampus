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

const hpColleges = [
    // Universities in Himachal Pradesh
    { name: "Himachal Pradesh University", abbr: "HPU", city: "Shimla", type: "State", est: 1970, category: "Arts & Science" },
    { name: "Central University of Himachal Pradesh", abbr: "CUHP", city: "Dharamshala", type: "Central", est: 2009, category: "Arts & Science" },
    { name: "Dr. Yashwant Singh Parmar University of Horticulture and Forestry", abbr: "UHF", city: "Nauni", type: "State", est: 1985, category: "Agriculture" },
    { name: "CSK Himachal Pradesh Agricultural University", abbr: "CSKHPKV", city: "Palampur", type: "State", est: 1978, category: "Agriculture" },
    { name: "Jaypee University of Information Technology", abbr: "JUIT", city: "Solan", type: "Private", est: 2002, category: "Engineering" },
    { name: "Shoolini University", abbr: "SU", city: "Solan", type: "Private", est: 2009, category: "Engineering" },
    { name: "Baddi University of Emerging Sciences and Technology", abbr: "BUEST", city: "Baddi", type: "Private", est: 2002, category: "Engineering" },
    { name: "Maharaja Agrasen University", abbr: "MAU", city: "Baddi", type: "Private", est: 2013, category: "Engineering" },
    { name: "Arni University", abbr: "Arni", city: "Kangra", type: "Private", est: 2009, category: "Arts & Science" },
    { name: "Career Point University Hamirpur", abbr: "CPU", city: "Hamirpur", type: "Private", est: 2012, category: "Engineering" },

    // Engineering Colleges
    { name: "National Institute of Technology Hamirpur", abbr: "NIT Hamirpur", city: "Hamirpur", type: "Government", est: 1986, category: "Engineering" },
    { name: "Indian Institute of Technology Mandi", abbr: "IIT Mandi", city: "Mandi", type: "Government", est: 2009, category: "Engineering" },
    { name: "Himachal Pradesh Technical University", abbr: "HPTU", city: "Hamirpur", type: "State", est: 2010, category: "Engineering" },
    { name: "Government Engineering College Hamirpur", abbr: "GEC Hamirpur", city: "Hamirpur", type: "Government", est: 2014, category: "Engineering" },
    { name: "Atal Bihari Vajpayee Government Institute of Engineering and Technology", abbr: "ABVGIET", city: "Pragatinagar", type: "Government", est: 2011, category: "Engineering" },
    { name: "Green Hills Engineering College", abbr: "GHEC", city: "Kumarhatti", type: "Private", est: 2003, category: "Engineering" },
    { name: "LR Institute of Engineering and Technology", abbr: "LRIET", city: "Solan", type: "Private", est: 2008, category: "Engineering" },
    { name: "Bahra University", abbr: "BU", city: "Waknaghat", type: "Private", est: 2011, category: "Engineering" },
    { name: "IEC University", abbr: "IEC", city: "Baddi", type: "Private", est: 2012, category: "Engineering" },
    { name: "Indus International University", abbr: "IIU", city: "Una", type: "Private", est: 2010, category: "Arts & Science" },

    // Medical Colleges
    { name: "Indira Gandhi Medical College Shimla", abbr: "IGMC", city: "Shimla", type: "Government", est: 1966, category: "Medical" },
    { name: "Dr. Rajendra Prasad Government Medical College", abbr: "RPGMC", city: "Tanda", type: "Government", est: 1996, category: "Medical" },
    { name: "Pt. Jawahar Lal Nehru Government Medical College", abbr: "JLNGMC", city: "Chamba", type: "Government", est: 2016, category: "Medical" },
    { name: "Dr. Yashwant Singh Parmar Government Medical College", abbr: "YSPGMC", city: "Nahan", type: "Government", est: 2016, category: "Medical" },
    { name: "Maharishi Markandeshwar Medical College", abbr: "MMU", city: "Kumarhatti", type: "Private", est: 2013, category: "Medical" },

    // Government Degree Colleges
    { name: "Government College Shimla", abbr: "GC Shimla", city: "Shimla", type: "Government", est: 1969, category: "Arts & Science" },
    { name: "Government College Dharamshala", abbr: "GC Dharamshala", city: "Dharamshala", type: "Government", est: 1926, category: "Arts & Science" },
    { name: "Government College Hamirpur", abbr: "GC Hamirpur", city: "Hamirpur", type: "Government", est: 1965, category: "Arts & Science" },
    { name: "Government College Mandi", abbr: "GC Mandi", city: "Mandi", type: "Government", est: 1948, category: "Arts & Science" },
    { name: "Government College Kullu", abbr: "GC Kullu", city: "Kullu", type: "Government", est: 1967, category: "Arts & Science" },
    { name: "Government College Una", abbr: "GC Una", city: "Una", type: "Government", est: 1968, category: "Arts & Science" },
    { name: "Government College Solan", abbr: "GC Solan", city: "Solan", type: "Government", est: 1959, category: "Arts & Science" },
    { name: "Government College Bilaspur", abbr: "GC Bilaspur", city: "Bilaspur", type: "Government", est: 1952, category: "Arts & Science" },
    { name: "Government College Kangra", abbr: "GC Kangra", city: "Kangra", type: "Government", est: 1976, category: "Arts & Science" },
    { name: "Government College Chamba", abbr: "GC Chamba", city: "Chamba", type: "Government", est: 1958, category: "Arts & Science" },
    { name: "Government College Sirmaur", abbr: "GC Sirmaur", city: "Sirmaur", type: "Government", est: 1975, category: "Arts & Science" },
    { name: "Government College Kinnaur", abbr: "GC Kinnaur", city: "Kinnaur", type: "Government", est: 1994, category: "Arts & Science" },
    { name: "Government College Lahaul & Spiti", abbr: "GC Kukumseri", city: "Lahaul & Spiti", type: "Government", est: 2006, category: "Arts & Science" },
    { name: "Government College Palampur", abbr: "GC Palampur", city: "Palampur", type: "Government", est: 1994, category: "Arts & Science" },
    { name: "Government College Nurpur", abbr: "GC Nurpur", city: "Nurpur", type: "Government", est: 1978, category: "Arts & Science" },

    // Management / Business Colleges
    { name: "Indian Institute of Management Sirmaur", abbr: "IIM Sirmaur", city: "Sirmaur", type: "Government", est: 2015, category: "Management" },
    { name: "Institute of Management Studies Himachal Pradesh University", abbr: "IMS HPU", city: "Shimla", type: "State", est: 1971, category: "Management" },
    { name: "Shoolini University School of Business", abbr: "SUSB", city: "Solan", type: "Private", est: 2009, category: "Management" },
    { name: "Bahra University School of Management", abbr: "BUSM", city: "Waknaghat", type: "Private", est: 2011, category: "Management" }
];


function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B92.5L — \u20B914L</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>B.Sc Nursing</strong></td><td>4 Years</td><td>\u20B960K — \u20B93L</td><td>10+2 PCB + Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "HP University conducts state-level counseling for 85% state quota seats based on NEET scores. AIQ counseling is strictly by MCC.";
        placementInfo = "Government doctors serve a mandatory peripheral bond, ensuring postings in Primary Health Centers across hilly terrains.";
    } else if (col.category === 'Engineering') {
        let isElite = col.abbr === "IIT Mandi" || col.abbr === "NIT Hamirpur";
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isElite ? '5L' : '2.5L'} — \u20B9${isElite ? '10L' : '6L'}</td><td>10+2 PCM + ${isElite ? 'JEE Main/Adv' : 'HPCET / JEE Main'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech</strong></td><td>2 Years</td><td>\u20B91L — \u20B92.5L</td><td>B.Tech + GATE</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isElite ? "JoSAA counseling purely." : "HPTU conducts state-level counseling primarily using HPCET and JEE Main AIR.";
        placementInfo = "High focus on Civil, CS, and hydro-energy sectors. Core companies heavily recruit from NIT and IIT.";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA</strong></td><td>2 Years</td><td>\u20B92L — \u20B916L</td><td>Graduation + CAT/HPU-MAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA</strong></td><td>3 Years</td><td>\u20B91L — \u20B93L</td><td>10+2 Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "IIM Sirmaur" ? "CAT followed by centralized CAP interview process." : "HPU conducts its own MAT, while privates accept MAT/CMAT.";
        placementInfo = "Decent reach across Baddi's booming pharmaceutical hub and tourism sectors.";
    } else if (col.category === 'Agriculture') {
        coursesHtml = `<tr><td><strong>B.Sc (Hons) Agriculture / Horticulture</strong></td><td>4 Years</td><td>\u20B960K — \u20B92L</td><td>10+2 PCB/PCM + ICAR AIEEA</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Sc Forestry / Agri</strong></td><td>2 Years</td><td>\u20B980K — \u20B91.5L</td><td>B.Sc + ICAR PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "State agriculture counseling heavily reliant on ICAR scores and specific state entrance mandates.";
        placementInfo = "Immense scope in HP's booming horticulture, apple-farming research, and central government eco-projects.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3 Years</td><td>\u20B910K — \u20B930K</td><td>10+2 Merit</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B915K — \u20B940K</td><td>Bachelor's + Merit/Entrance</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Direct admission based on 12th board aggregate under HPU’s affiliated structure.";
        placementInfo = "Serves as the foundation for HPAS (state services), judiciary, and teaching streams.";
    }

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, ${col.name} placements, HPCET, HP University, NextCampus">
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
      "url": "https://nextcampus.com/colleges/himachal-pradesh/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/himachal-pradesh/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, HP</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Himachal Pradesh, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.2</strong>/5
                        </div>
                        <div class="lpu-meta">
                            <span>Est. <strong>${col.est}</strong></span>
                            <span class="divider">|</span>
                            <span>Type: <strong>${col.type}</strong></span>
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
                    <p>${col.name} (${col.abbr}) is a pivotal institute situated amidst the serene environment of ${col.city}, Himachal Pradesh. Established in ${col.est}, it has significantly contributed to the academic ecosystem of the Himalayan region.</p>
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
                        <div class="step-item"><div class="step-num">1</div><div><h4>Entrance / Merit</h4><p>${admissionHtml}</p></div></div>
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling</h4><p>Appropriate state or central level counseling protocol.</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Verification</h4><p>Verification of local domicile certificates (Himachali Bonafide) is crucial for claiming state quotas.</p></div></div>
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
                    <p>Average Rating: <strong>4.2 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Alumnus</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The campus environment is peaceful and extremely conducive to studying. Highly recommend for the beautiful serene location."</p>
                    </div>
                </div>
            </section>

            <!-- GALLERY -->
            <section class="lpu-panel" id="panel-gallery">
                <div class="lpu-card">
                    <h2>Campus Gallery</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item"><div class="gallery-placeholder">&#127963;</div><span>Campus Block</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#128218;</div><span>Knowledge Resource</span></div>
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Student Activity Center</span></div>
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

    for (const col of hpColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'himachal-pradesh', collegeSlug);
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
      city: '${col.city}', state: 'Himachal Pradesh', type: '${col.type}',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
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
            console.log(`\n✅ Injected ${newCards.length} HP Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new HP Colleges to inject.`);
    }
}

processAll();
