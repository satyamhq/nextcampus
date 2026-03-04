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

const upColleges = [
    // Top Universities
    { name: "Banaras Hindu University", abbr: "BHU", city: "Varanasi", type: "Central", est: 1916, category: "Multidisciplinary" },
    { name: "Aligarh Muslim University", abbr: "AMU", city: "Aligarh", type: "Central", est: 1920, category: "Multidisciplinary" },
    { name: "University of Allahabad", abbr: "AU", city: "Prayagraj", type: "Central", est: 1887, category: "Arts & Science" },
    { name: "Lucknow University", abbr: "LU", city: "Lucknow", type: "State", est: 1920, category: "Arts & Science" },
    { name: "Dr. A.P.J. Abdul Kalam Technical University", abbr: "AKTU", city: "Lucknow", type: "State", est: 2000, category: "Engineering" },
    { name: "Mahatma Gandhi Kashi Vidyapith", abbr: "MGKVP", city: "Varanasi", type: "State", est: 1921, category: "Arts & Science" },
    { name: "Deen Dayal Upadhyay Gorakhpur University", abbr: "DDU", city: "Gorakhpur", type: "State", est: 1957, category: "Arts & Science" },
    { name: "Chaudhary Charan Singh University", abbr: "CCSU", city: "Meerut", type: "State", est: 1965, category: "Arts & Science" },
    { name: "Bundelkhand University", abbr: "BU", city: "Jhansi", type: "State", est: 1975, category: "Arts & Science" },

    // Engineering Colleges
    { name: "Indian Institute of Technology Kanpur", abbr: "IIT Kanpur", city: "Kanpur", type: "Government", est: 1959, category: "Engineering" },
    { name: "Indian Institute of Technology BHU", abbr: "IIT BHU", city: "Varanasi", type: "Government", est: 1919, category: "Engineering" },
    { name: "Indian Institute of Information Technology Allahabad", abbr: "IIIT Allahabad", city: "Prayagraj", type: "Government", est: 1999, category: "Engineering" },
    { name: "Motilal Nehru National Institute of Technology Allahabad", abbr: "MNNIT", city: "Prayagraj", type: "Government", est: 1961, category: "Engineering" },
    { name: "Harish Chandra Research Institute", abbr: "HRI", city: "Prayagraj", type: "Government", est: 1965, category: "Science" },
    { name: "Indian Institute of Information Technology Lucknow", abbr: "IIIT Lucknow", city: "Lucknow", type: "PPP Mode", est: 2015, category: "Engineering" },
    { name: "Harcourt Butler Technical University", abbr: "HBTU", city: "Kanpur", type: "State", est: 1921, category: "Engineering" },
    { name: "Madan Mohan Malaviya University of Technology", abbr: "MMMUT", city: "Gorakhpur", type: "State", est: 1962, category: "Engineering" },
    { name: "Jaypee Institute of Information Technology", abbr: "JIIT", city: "Noida", type: "Private", est: 2001, category: "Engineering" },
    { name: "Shiv Nadar University", abbr: "SNU", city: "Greater Noida", type: "Private", est: 2011, category: "Multidisciplinary" },

    // Medical Colleges
    { name: "Sanjay Gandhi Postgraduate Institute of Medical Sciences", abbr: "SGPGIMS", city: "Lucknow", type: "State", est: 1983, category: "Medical" },
    { name: "King George's Medical University", abbr: "KGMU", city: "Lucknow", type: "State", est: 1905, category: "Medical" },
    { name: "Institute of Medical Sciences BHU", abbr: "IMS BHU", city: "Varanasi", type: "Central", est: 1960, category: "Medical" },
    { name: "Jawaharlal Nehru Medical College AMU", abbr: "JNMC", city: "Aligarh", type: "Central", est: 1962, category: "Medical" },
    { name: "Uttar Pradesh University of Medical Sciences", abbr: "UPUMS", city: "Saifai", type: "State", est: 2005, category: "Medical" },

    // Management Colleges
    { name: "Indian Institute of Management Lucknow", abbr: "IIM Lucknow", city: "Lucknow", type: "Government", est: 1984, category: "Management" },
    { name: "Indian Institute of Management Kashipur", abbr: "IIM Kashipur", city: "Kashipur", type: "Government", est: 2011, category: "Management" }, // Added to list conceptually via user req, skipping handled
    { name: "Institute of Management Technology Ghaziabad", abbr: "IMT", city: "Ghaziabad", type: "Private", est: 1980, category: "Management" },
    { name: "Jaipuria Institute of Management", abbr: "Jaipuria", city: "Lucknow", type: "Private", est: 1995, category: "Management" },
    { name: "Amity University Noida", abbr: "Amity", city: "Noida", type: "Private", est: 2005, category: "Multidisciplinary" },

    // Law Colleges
    { name: "Dr. Ram Manohar Lohiya National Law University", abbr: "RMLNLU", city: "Lucknow", type: "State", est: 2005, category: "Law" },
    { name: "Faculty of Law Banaras Hindu University", abbr: "Law BHU", city: "Varanasi", type: "Central", est: 1923, category: "Law" },
    { name: "Faculty of Law Aligarh Muslim University", abbr: "Law AMU", city: "Aligarh", type: "Central", est: 1891, category: "Law" },

    // Other Major Colleges (Private / NCR)
    { name: "Galgotias University", abbr: "Galgotias", city: "Greater Noida", type: "Private", est: 2011, category: "Engineering" },
    { name: "Noida International University", abbr: "NIU", city: "Greater Noida", type: "Private", est: 2010, category: "Multidisciplinary" },
    { name: "Sharda University", abbr: "Sharda", city: "Greater Noida", type: "Private", est: 2009, category: "Multidisciplinary" },
    { name: "Bennett University", abbr: "Bennett", city: "Greater Noida", type: "Private", est: 2016, category: "Engineering" },
    { name: "SRM Institute of Science and Technology Ghaziabad", abbr: "SRM NCR", city: "Ghaziabad", type: "Deemed", est: 1997, category: "Engineering" },
    { name: "AKG Engineering College", abbr: "AKGEC", city: "Ghaziabad", type: "Private", est: 1998, category: "Engineering" },
    { name: "KIET Group of Institutions", abbr: "KIET", city: "Ghaziabad", type: "Private", est: 1998, category: "Engineering" },
    { name: "GL Bajaj Institute of Technology and Management", abbr: "GLBITM", city: "Greater Noida", type: "Private", est: 2005, category: "Engineering" },
    { name: "JSS Academy of Technical Education Noida", abbr: "JSSATE", city: "Noida", type: "Private", est: 1998, category: "Engineering" },
    { name: "ABES Engineering College", abbr: "ABES", city: "Ghaziabad", type: "Private", est: 2000, category: "Engineering" },
    { name: "IILM University Greater Noida", abbr: "IILM", city: "Greater Noida", type: "Private", est: 2001, category: "Management" },
    { name: "IMS Ghaziabad", abbr: "IMS", city: "Ghaziabad", type: "Private", est: 1990, category: "Management" },
    { name: "Birla Institute of Technology Noida Campus", abbr: "BIT Noida", city: "Noida", type: "Deemed Off-Campus", est: 1998, category: "Engineering" },
    { name: "Amity School of Engineering Noida", abbr: "ASE", city: "Noida", type: "Private", est: 2003, category: "Engineering" },
    { name: "Amity Business School Noida", abbr: "ABS", city: "Noida", type: "Private", est: 1995, category: "Management" },
    { name: "Galgotias College of Engineering and Technology", abbr: "GCET", city: "Greater Noida", type: "Private", est: 2000, category: "Engineering" },
    { name: "Accurate Institute of Management", abbr: "AIMT", city: "Greater Noida", type: "Private", est: 2006, category: "Management" },

    // State Govt Engineering Colleges
    { name: "Institute of Engineering and Technology Lucknow", abbr: "IET Lucknow", city: "Lucknow", type: "Government", est: 1984, category: "Engineering" },
    { name: "Kamla Nehru Institute of Technology Sultanpur", abbr: "KNIT", city: "Sultanpur", type: "Government", est: 1976, category: "Engineering" },
    { name: "Bundelkhand Institute of Engineering and Technology", abbr: "BIET", city: "Jhansi", type: "Government", est: 1989, category: "Engineering" },

    // Rajkiya Engineering Colleges (RECs)
    { name: "Rajkiya Engineering College Kannauj", abbr: "REC Kannauj", city: "Kannauj", type: "Government", est: 2015, category: "Engineering" },
    { name: "Rajkiya Engineering College Banda", abbr: "REC Banda", city: "Banda", type: "Government", est: 2010, category: "Engineering" },
    { name: "Rajkiya Engineering College Azamgarh", abbr: "REC Azamgarh", city: "Azamgarh", type: "Government", est: 2010, category: "Engineering" },
    { name: "Rajkiya Engineering College Mainpuri", abbr: "REC Mainpuri", city: "Mainpuri", type: "Government", est: 2015, category: "Engineering" },
    { name: "Rajkiya Engineering College Ambedkar Nagar", abbr: "REC Ambedkar Nagar", city: "Ambedkar Nagar", type: "Government", est: 2010, category: "Engineering" },
    { name: "Rajkiya Engineering College Sonbhadra", abbr: "REC Sonbhadra", city: "Sonbhadra", type: "Government", est: 2015, category: "Engineering" },
    { name: "Rajkiya Engineering College Bijnor", abbr: "REC Bijnor", city: "Bijnor", type: "Government", est: 2010, category: "Engineering" },
    { name: "Rajkiya Engineering College Etawah", abbr: "REC Etawah", city: "Etawah", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Gonda", abbr: "REC Gonda", city: "Gonda", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Mirzapur", abbr: "REC Mirzapur", city: "Mirzapur", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Amethi", abbr: "REC Amethi", city: "Amethi", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Pratapgarh", abbr: "REC Pratapgarh", city: "Pratapgarh", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Ghazipur", abbr: "REC Ghazipur", city: "Ghazipur", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Bareilly", abbr: "REC Bareilly", city: "Bareilly", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Saharanpur", abbr: "REC Saharanpur", city: "Saharanpur", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Firozabad", abbr: "REC Firozabad", city: "Firozabad", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Sitapur", abbr: "REC Sitapur", city: "Sitapur", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Hardoi", abbr: "REC Hardoi", city: "Hardoi", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Lakhimpur", abbr: "REC Lakhimpur", city: "Lakhimpur Kheri", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Balrampur", abbr: "REC Balrampur", city: "Balrampur", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Deoria", abbr: "REC Deoria", city: "Deoria", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Bahraich", abbr: "REC Bahraich", city: "Bahraich", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Shravasti", abbr: "REC Shravasti", city: "Shravasti", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Chandauli", abbr: "REC Chandauli", city: "Chandauli", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Jaunpur", abbr: "REC Jaunpur", city: "Jaunpur", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Mau", abbr: "REC Mau", city: "Mau", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Basti", abbr: "REC Basti", city: "Basti", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Siddharthnagar", abbr: "REC Siddharthnagar", city: "Siddharthnagar", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Kushinagar", abbr: "REC Kushinagar", city: "Kushinagar", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Maharajganj", abbr: "REC Maharajganj", city: "Maharajganj", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Sant Kabir Nagar", abbr: "REC Sant Kabir Nagar", city: "Sant Kabir Nagar", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Farrukhabad", abbr: "REC Farrukhabad", city: "Farrukhabad", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Shahjahanpur", abbr: "REC Shahjahanpur", city: "Shahjahanpur", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Pilibhit", abbr: "REC Pilibhit", city: "Pilibhit", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Rampur", abbr: "REC Rampur", city: "Rampur", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Sambhal", abbr: "REC Sambhal", city: "Sambhal", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Moradabad", abbr: "REC Moradabad", city: "Moradabad", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Amroha", abbr: "REC Amroha", city: "Amroha", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Baghpat", abbr: "REC Baghpat", city: "Baghpat", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Shamli", abbr: "REC Shamli", city: "Shamli", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Bulandshahr", abbr: "REC Bulandshahr", city: "Bulandshahr", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Hathras", abbr: "REC Hathras", city: "Hathras", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Kasganj", abbr: "REC Kasganj", city: "Kasganj", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Etah", abbr: "REC Etah", city: "Etah", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Auraiya", abbr: "REC Auraiya", city: "Auraiya", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Lalitpur", abbr: "REC Lalitpur", city: "Lalitpur", type: "Government", est: 2024, category: "Engineering" },
    { name: "Rajkiya Engineering College Chitrakoot", abbr: "REC Chitrakoot", city: "Chitrakoot", type: "Government", est: 2024, category: "Engineering" }
];

function generateHtml(col, collegeSlug) {
    let coursesHtml = "";
    let admissionHtml = "";
    let placementInfo = "";

    if (col.category === 'Medical') {
        coursesHtml = `<tr><td><strong>MBBS</strong></td><td>5.5 Years</td><td>\u20B92L — \u20B915L (Govt/Central)</td><td>10+2 PCB + NEET UG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>MD/MS / DM / M.Ch</strong></td><td>3 Years</td><td>\u20B91L — \u20B912L</td><td>MBBS/MD + NEET PG/SS</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = `UPDGME handles the intricate state quota (85%) counseling utilizing NEET indices. Central bodies (BHU/AMU) use pure MCC matrix allocations.`;
        placementInfo = "Highest tier clinical exposure due to Uttar Pradesh's vast patient influx. KGMU and BHU represent the absolute medical hegemony of North India.";
    } else if (col.category === 'Engineering') {
        let isElite = col.abbr.includes("IIT") || col.abbr.includes("NIT") || col.abbr.includes("IIIT");
        let isRec = col.name.includes("Rajkiya Engineering College");

        coursesHtml = `<tr><td><strong>B.Tech</strong></td><td>4 Years</td><td>\u20B9${isElite ? '6L' : (isRec ? '2.5L' : '4L')} — \u20B9${isElite ? '10L' : (isRec ? '3.5L' : '15L')}</td><td>10+2 PCM + ${isElite ? 'JEE Main/Adv' : 'JEE Main / UPSEE (CUET)'}</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.Tech / MCA</strong></td><td>2 Years</td><td>\u20B91L — \u20B94L</td><td>B.Tech / BCA + GATE / CUET PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;

        admissionHtml = isElite ? "JoSAA / CSAB centralized counseling." : "UPTAC (UP Technical Admission Counselling) acts as the colossal nodal agency, aligning JEE Main and CUET scores for almost all state and private tech seats.";
        if (col.abbr === "HBTU" || col.abbr === "MMMUT") admissionHtml = "Independent university-level counseling strictly utilizing JEE Main AIR for B.Tech.";

        placementInfo = isElite ? "The absolute pinnacle of Indian engineering. IITK and IIT BHU dictate global tech ceilings." :
            (isRec ? "Steady influx of state-driven core placements, heavily supplemented by off-campus IT hirings in NCR ecosystems." :
                "Exceptional mass hirings in the Noida/Greater Noida/Ghaziabad tech corridor by giants like TCS, Infosys, Wipro, and emerging SaaS entities.");
    } else if (col.category === 'Management') {
        coursesHtml = `<tr><td><strong>MBA / PGDM</strong></td><td>2 Years</td><td>\u20B96L — \u20B925L</td><td>Graduation + CAT/XAT/MAT</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>BBA</strong></td><td>3 Years</td><td>\u20B93L — \u20B912L</td><td>10+2 Merit / CUET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr.includes("IIM") ? "Strictly CAT profiles." : "Private entities like IMT leverage CAT/XAT. State universities orchestrate admits via CUET PG vectors.";
        placementInfo = "IIML holds 'BLACKI' status yielding ungodly packages. The NCR ecosystem robustly absorbs talent from IMT and emerging B-Schools.";
    } else if (col.category === 'Law') {
        coursesHtml = `<tr><td><strong>BA LLB (Hons)</strong></td><td>5 Years</td><td>\u20B93L — \u20B912L</td><td>10+2 + CLAT/CUET</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>LLM</strong></td><td>1-2 Years</td><td>\u20B950K — \u20B92L</td><td>LLB Merit / CUET PG / CLAT PG</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = col.abbr === "RMLNLU" ? "CLAT exclusively." : "BHU and AMU rely on highly competitive university-specific entrance tests or CUET structures.";
        placementInfo = "Powerhouses feeding the Allahabad High Court litigation circles and Delhi-NCR corporate firm placements.";
    } else {
        coursesHtml = `<tr><td><strong>B.A. / B.Sc / B.Com</strong></td><td>3-4 Years</td><td>\u20B910K — \u20B91L</td><td>10+2 + CUET UG / Univ Test</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>
                     <tr><td><strong>M.A. / M.Sc / M.Com</strong></td><td>2 Years</td><td>\u20B915K — \u20B980K</td><td>Bachelor's + CUET PG / Univ Test</td><td><a href="#" class="apply-link">Apply &#8594;</a></td></tr>`;
        admissionHtml = "Massive paradigm shift leaning towards CUET for central varsities (BHU, AMU, AU). State universities mix direct entrances with merit algorithms.";
        placementInfo = "Bedrock foundations for the UPSC (Civil Services Belt) and UPPCS (State Administrative lines).";
    }

    const tabsHtml = getTabsHtml(col.category);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${col.name} (${col.abbr}) - Admission, Fees, Placements & Courses 2026 | NextCampus</title>
    <meta name="description" content="Explore ${col.name} admissions 2026, courses, detailed fee structure, placement packages, scholarships, and campus life in UP. Get verified details at NextCampus.">
    <meta name="keywords" content="${col.name}, ${col.abbr}, ${col.abbr} admission 2026, UPTAC, Uttar Pradesh Colleges, NCR Universities, NextCampus">
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
                <span class="lpu-sticky-loc">&#128205; ${col.city}, UP</span>
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
                        <p class="lpu-location">&#128205; ${col.city}, Uttar Pradesh, India</p>
                        <div class="lpu-rating">
                            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                            <strong>4.3</strong>/5
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
                    <p>${col.name} (${col.abbr}) forms the backbone of the intricate educational landscape in ${col.city}, Uttar Pradesh. Established in ${col.est}, it channels the enormous talent pool of North India toward state-level bureaucracy, massive IT/manufacturing deployments in the NCR ecosystem, and supreme national technical roles.</p>
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
                        <div class="step-item"><div class="step-num">2</div><div><h4>UPTAC / State Counselling</h4><p>The colossal UPTAC grid manages allocation logic scaling across thousands of seats using complex UP state domiciliary reservations (OBC/SC/ST matrices).</p></div></div>
                        <div class="step-item"><div class="step-num">3</div><div><h4>Final Submission</h4><p>Rigorous tracking of UP Native Domicile Certificates and Category verification.</p></div></div>
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
                    <p>Average Rating: <strong>4.3 / 5</strong></p>
                    <div class="review-item">
                        <div class="review-top"><strong>Verified Uttar Pradesh Scholar</strong><span class="rev-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></div>
                        <p>"The robust alumni network spanning the political, technical, and administrative spheres of the absolute most populous state in India creates unmatched networking pipelines."</p>
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

    for (const col of upColleges) {
        const collegeSlug = slugify(col.name);

        if (homeContent.includes(collegeSlug)) {
            console.log(`Skipping \${col.name} (\${collegeSlug}) - Already exists.`);
            continue;
        }

        const dir = path.join(basePath, 'uttar-pradesh', collegeSlug);
        fs.mkdirSync(path.join(dir, 'images', 'logo'), { recursive: true });
        fs.mkdirSync(path.join(dir, 'images', 'cover'), { recursive: true });

        // Use LPU CSS as base for rapid decoupling
        const lpuBaseCssPath = path.join(basePath, 'punjab', 'lovely-professional-university', 'lovely-professional-university.css');
        fs.writeFileSync(path.join(dir, collegeSlug + '.css'), getFullCss());

        // Write HTML & JS
        fs.writeFileSync(path.join(dir, collegeSlug + '.html'), generateHtml(col, collegeSlug), 'utf8');
        fs.writeFileSync(path.join(dir, collegeSlug + '.js'), getJsContent(col.name, col.abbr, col.slug || collegeSlug), 'utf8');

        let baseScore = 8.1; // Default
        if (col.abbr.includes("IIT") || col.abbr === "BHU" || col.abbr === "AMU" || col.abbr === "KGMU" || col.abbr.includes("IIM")) baseScore = 9.8;
        else if (col.abbr.includes("IIIT") || col.abbr === "RMLNLU" || col.abbr === "HBTU" || col.abbr === "MMMUT") baseScore = 9.2;
        else if (col.name.includes("Rajkiya Engineering College")) baseScore = 7.7; // State RECs slightly lower abstract score

        newCards.push(`    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Uttar Pradesh', type: '${col.type}',
      score: ${baseScore}, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: ${baseScore > 8.5 ? 90 : 80}, nirf: 0,
      link: '../colleges/uttar-pradesh/${collegeSlug}/${collegeSlug}.html',
      rating: '4.3', accr: '${col.type}'
    }`);
        console.log(`Generated: ${col.name} (${collegeSlug})`);
    }

    // Inject into home.js
    if (newCards.length > 0) {
        const injectToken = "const colleges = [";
        const injectionPoint = homeContent.indexOf(injectToken);

        if (injectionPoint !== -1) {
            const startOfArray = injectionPoint + injectToken.length;
            homeContent = homeContent.slice(0, startOfArray) + "\n" + newCards.join(",\n") + ",\n" + homeContent.slice(startOfArray);
            fs.writeFileSync(homeJsPath, homeContent, 'utf8');
            console.log(`\n✅ Injected ${newCards.length} Uttar Pradesh Colleges into home.js !`);
        } else {
            console.log("\n❌ Could not find injection point in home.js.");
        }
    } else {
        console.log(`\n❌ No new Uttar Pradesh Colleges to inject.`);
    }
}

processAll();
