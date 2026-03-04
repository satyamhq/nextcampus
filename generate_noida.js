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

const noidaColleges = [
    // Universities in Noida / Greater Noida
    { name: "Amity University Noida", abbr: "Amity", city: "Noida", type: "Private", est: 2005, category: "Multidisciplinary" },
    { name: "Bennett University", abbr: "Bennett", city: "Greater Noida", type: "Private", est: 2016, category: "Multidisciplinary" },
    { name: "Sharda University", abbr: "Sharda", city: "Greater Noida", type: "Private", est: 2009, category: "Multidisciplinary" },
    { name: "Galgotias University", abbr: "Galgotias", city: "Greater Noida", type: "Private", est: 2011, category: "Multidisciplinary" },
    { name: "Noida International University", abbr: "NIU", city: "Greater Noida", type: "Private", est: 2010, category: "Multidisciplinary" },
    { name: "Gautam Buddha University", abbr: "GBU", city: "Greater Noida", type: "State", est: 2002, category: "Multidisciplinary" },
    { name: "Shiv Nadar University", abbr: "SNU", city: "Greater Noida", type: "Private", est: 2011, category: "Multidisciplinary" },
    { name: "IILM University Greater Noida", abbr: "IILM", city: "Greater Noida", type: "Private", est: 2001, category: "Multidisciplinary" },

    // Engineering & Technology Colleges
    { name: "Jaypee Institute of Information Technology", abbr: "JIIT", city: "Noida", type: "Deemed", est: 2001, category: "Engineering" },
    { name: "Noida Institute of Engineering and Technology", abbr: "NIET", city: "Greater Noida", type: "Private Autonomous", est: 2001, category: "Engineering" },
    { name: "GL Bajaj Institute of Technology and Management", abbr: "GLBITM", city: "Greater Noida", type: "Private", est: 2005, category: "Engineering" },
    { name: "Galgotias College of Engineering and Technology", abbr: "GCET", city: "Greater Noida", type: "Private", est: 2000, category: "Engineering" },
    { name: "Greater Noida Institute of Technology", abbr: "GNIOT", city: "Greater Noida", type: "Private", est: 2001, category: "Engineering" },
    { name: "JSS Academy of Technical Education Noida", abbr: "JSSATE", city: "Noida", type: "Private", est: 1998, category: "Engineering" },
    { name: "ABES Engineering College", abbr: "ABES", city: "Ghaziabad", type: "Private", est: 2000, category: "Engineering" }, // Nearby
    { name: "KIET Group of Institutions", abbr: "KIET", city: "Ghaziabad", type: "Private", est: 1998, category: "Engineering" }, // Nearby
    { name: "Lloyd Institute of Engineering & Technology", abbr: "LIET", city: "Greater Noida", type: "Private", est: 2002, category: "Engineering" },
    { name: "KCC Institute of Technology and Management", abbr: "KCC ITM", city: "Greater Noida", type: "Private", est: 1998, category: "Engineering" },
    { name: "IEC College of Engineering and Technology", abbr: "IEC", city: "Greater Noida", type: "Private", est: 1999, category: "Engineering" },
    { name: "Delhi Technical Campus", abbr: "DTC", city: "Greater Noida", type: "Private", est: 1998, category: "Engineering" },
    { name: "IIMT College of Engineering", abbr: "IIMT", city: "Greater Noida", type: "Private", est: 2005, category: "Engineering" },
    { name: "Mangalmay Institute of Engineering & Technology", abbr: "MIET", city: "Greater Noida", type: "Private", est: 2002, category: "Engineering" },
    { name: "Accurate Institute of Management & Technology", abbr: "AIMT", city: "Greater Noida", type: "Private", est: 2006, category: "Engineering" },
    { name: "Harlal Institute of Management & Technology", abbr: "HIMT", city: "Greater Noida", type: "Private", est: 1998, category: "Engineering" },
    { name: "Dronacharya Group of Institutions", abbr: "DGI", city: "Greater Noida", type: "Private", est: 2006, category: "Engineering" },

    // Management / Business Colleges
    { name: "Jaipuria Institute of Management Noida", abbr: "Jaipuria", city: "Noida", type: "Private", est: 2004, category: "Management" },
    { name: "Institute of Management Studies Noida", abbr: "IMS Noida", city: "Noida", type: "Private", est: 1998, category: "Management" },
    { name: "Birla Institute of Management Technology", abbr: "BIMTECH", city: "Greater Noida", type: "Private", est: 1988, category: "Management" },
    { name: "Asian Business School", abbr: "ABS", city: "Noida", type: "Private", est: 2011, category: "Management" },
    { name: "I Business Institute Greater Noida", abbr: "IBI", city: "Greater Noida", type: "Private", est: 2008, category: "Management" },

    // Law Colleges
    { name: "Lloyd Law College", abbr: "LLC", city: "Greater Noida", type: "Private", est: 2003, category: "Law" },
    { name: "Sharda University School of Law", abbr: "SUSL", city: "Greater Noida", type: "Private", est: 2009, category: "Law" },
    { name: "Bennett University School of Law", abbr: "BUSL", city: "Greater Noida", type: "Private", est: 2016, category: "Law" },
    { name: "Amity Law School Noida", abbr: "ALS", city: "Noida", type: "Private", est: 2004, category: "Law" },

    // Media / Film / Design Colleges
    { name: "Asian Academy of Film and Television", abbr: "AAFT", city: "Noida", type: "Private", est: 1993, category: "Design" }, // Media/Design
    { name: "AAFT School of Media and Arts", abbr: "AAFT", city: "Noida", type: "Private", est: 1993, category: "Design" },
    { name: "Footwear Design and Development Institute Noida", abbr: "FDDI", city: "Noida", type: "Government", est: 1986, category: "Design" },
    { name: "National Institute of Fashion Technology Noida", abbr: "NIFT Noida", city: "Noida", type: "Government", est: 1997, category: "Design" },

    // Medical Colleges
    { name: "Government Institute of Medical Sciences Greater Noida", abbr: "GIMS", city: "Greater Noida", type: "Government", est: 2016, category: "Medical" },
    { name: "Sharda Medical College", abbr: "SMS&R", city: "Greater Noida", type: "Private", est: 2009, category: "Medical" },
    { name: "Noida International Institute of Medical Sciences", abbr: "NIIMS", city: "Greater Noida", type: "Private", est: 2020, category: "Medical" },

    // Other Colleges / Institutes
    { name: "Delhi Metropolitan Education", abbr: "DME", city: "Noida", type: "Private", est: 2012, category: "Law" }, // Offers Law/Mgmt
    { name: "Jagran Institute of Management and Mass Communication", abbr: "JIMMC", city: "Noida", type: "Private", est: 2004, category: "Design" }, // Media
    { name: "Global Institute of Management & Technology", abbr: "GIMT", city: "Noida", type: "Private", est: 2004, category: "Management" },
    { name: "Indian Institute of Tourism and Travel Management", abbr: "IITTM Noida", city: "Noida", type: "Autonomous", est: 2007, category: "Management" },
    { name: "Army Institute of Management and Technology", abbr: "AIMT", city: "Greater Noida", type: "Private Aided", est: 2004, category: "Management" },
    { name: "BBS Institute of Management Studies", abbr: "BBSIMS", city: "Greater Noida", type: "Private", est: 1993, category: "Management" },
    { name: "Aster College of Education", abbr: "Aster", city: "Greater Noida", type: "Private", est: 2004, category: "Arts & Science" },
    { name: "Bakson Homoeopathic Medical College", abbr: "BHMC", city: "Greater Noida", type: "Private", est: 2002, category: "Medical" },
    { name: "IIMT Group of Colleges", abbr: "IIMT Noida", city: "Greater Noida", type: "Private", est: 1994, category: "Multidisciplinary" }
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B94L — \u20B960L (Govt/Private)</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS / DM / M.Ch</strong></td><td>3 Years</td><td>\u20B92L — \u20B925L</td><td>MBBS/MD + NEET PG/SS</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "GIMS" ? "UPDGME state counseling for the competitive government seats (85% state quota)." : "Admissions via UPDGME for 85% state and private quotas mapped purely against NEET rankings.";
        placementInfo = "Noida boasts massive infrastructure. Super-specialty hospitals regularly acquire graduates, and government bonds secure early career footing in state facilities.";
    } else if (col.category === 'Engineering') {
        let isElite = col.abbr === "JIIT" || col.abbr === "SNU";
        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B95L — \u20B915L</td><td>10+2 PCM + ${isElite ? 'JEE Main' : 'JEE Main / UPTAC (CUET)'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech / MCA</strong></td><td>2 Years</td><td>\u20B92L — \u20B94L</td><td>B.Tech / BCA + GATE / CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = isElite ? "Independent counseling heavily relying on JEE Main AIR or proprietary entrance tests." : "UPTAC counseling manages the vast pool of AKTU affiliated institutions in Greater Noida/Noida.";
        placementInfo = "The Noida/Greater Noida tech belt provides unbridled access to massive MNC pools (TCS, Wipro, Infosys, Adobe, Amazon) hosting massive pool drives.";
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B96L — \u20B920L</td><td>Graduation + CAT/XAT/MAT/CUET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA</strong></td><td>3 Years</td><td>\u20B93L — \u20B98L</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Institutes like BIMTECH and Jaipuria maintain strict CAT/XAT cutoffs accompanied by GD-PI matrices. AKTU-affiliated MBA relies on CUET PG / UPTAC.";
        placementInfo = "High proximity to the Delhi NCR corporate ecosystem yields excellent FMCG, Banking, and Consulting placements.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons) / BBA LLB</strong></td><td>5 Years</td><td>\u20B95L — \u20B915L</td><td>10+2 + CLAT/LSAT/CUET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1-2 Years</td><td>\u20B91L — \u20B93L</td><td>LLB Merit / CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Leading players like Lloyd Law College conduct tests (LET) or use CLAT/LSAT India scores heavily.";
        placementInfo = "Tremendous networking leveraging the massive corporate firm presence alongside Delhi High Court and Supreme Court circuits.";
    } else if (col.category === 'Design') {
        coursesHtml = `<tr><td><strong>B.Des / B.FTech / B.Sc (Media)</strong></td><td>3-4 Years</td><td>\u20B94L — \u20B912L</td><td>10+2 Merit / NIFT Ent. / AAFT Ent.</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Des / M.FTech / M.A</strong></td><td>2 Years</td><td>\u20B92L — \u20B96L</td><td>Bachelor's + Respective Ent.</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr.includes("NIFT") ? "NIFT conducts an all-India entrance examination (CAT/GAT)." : "Media colleges like AAFT hold aptitude tests and personal interviews.";
        placementInfo = "Noida's Film City is a media juggernaut. Graduates filter directly into major news networks, fashion houses, and mega productions.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com / BBA</strong></td><td>3-4 Years</td><td>\u20B93L — \u20B912L</td><td>10+2 Merit / CUET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B92L — \u20B97L</td><td>Bachelor's + Univ Test / CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Massive private clusters like Amity, Sharda, and Galgotias administer independent entrance and interview arrays besides utilizing CUET scores.";
        placementInfo = "A sprawling canvas scaling everything from core engineering to multi-channel journalism, feeding directly into the NCR employment reservoirs.";
    }

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life in NCR. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, NCR Colleges, Greater Noida Institutes, NextCampus">
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
      "url": "https://nextcampus.com/colleges/uttar-pradesh/${collegeSlug}/${collegeSlug}.html",
      "logo": "https://nextcampus.com/colleges/uttar-pradesh/${collegeSlug}/images/logo/${collegeSlug}_logo.png"
    }
    </script>
</head>
<body>

    <div class="lpu-sticky-header" id="lpu-sticky-header">
        <div class="container lpu-sticky-inner">
            <div class="lpu-sticky-left">
                <span class="lpu-sticky-name">${col.name}</span>
                <span class="lpu-sticky-loc">&#128205; ${col.city}, UP (NCR)</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Uttar Pradesh (Delhi NCR), India</p>
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
                    <p>${col.name} (${col.abbr}) anchors the explosive infrastructure boom of ${col.city} within the Delhi NCR grid. Established in ${col.est}, it has propelled the area into a massive educational hub, combining sprawling modern campuses with direct access to Fortune 500 tech and corporate corridors.</p>
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
                        <div class="step-item"><div class="step-num">2</div><div><h4>Counselling Procedures</h4><p>Entities rely heavily on either independent interview structures or nodal agency counseling like UPTAC depending on whether they maintain direct affiliations with APJ Abdul Kalam Technical University (AKTU) or operate autonomously.</p></div></div>
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
                        <div class="review-top"><strong>Verified NCR Alumnus</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The exposure of living so close to Delhi while enjoying a massive, 100+ acre modern campus in Greater Noida is brilliant. Countless companies drop by the campus organically mapping from Gurgaon/Noida sectors."</p>
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
                        <div class="gallery-item"><div class="gallery-placeholder">&#127968;</div><span>Hostels & Tech Parks</span></div>
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

    for (const col of noidaColleges) {
        const collegeSlug = slugify(col.name);

        // Check dupe
        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'uttar-pradesh', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // CSS base
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // HTML/JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 8.0;
        if (col.abbr === "BIMTECH" || col.abbr === "JIIT" || col.abbr === "SNU") baseScore = 8.8;
        else if (col.abbr === "NIFT Noida" || col.abbr === "Amity") baseScore = 8.6;

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Uttar Pradesh', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    // Inject
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Noida & Greater Noida Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Noida Colleges to inject.`);
    }
}

processAll();
