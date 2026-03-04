const fs = require('fs');
const path = require('path');

const collegesDir = path.join(__dirname, 'frontend', 'colleges');

function optimizeDir(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            optimizeDir(fullPath);
        } else if (file.endsWith('.html')) {
            optimizeHtml(fullPath);
        }
    }
}

function optimizeHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Parse College Name and Abbreviation from title
    const titleRegex1 = /<title>(.+?) \((.*?)\) — NextCampus<\/title>/;
    const titleRegex2 = /<title>(.*?) — NextCampus<\/title>/;

    let colName = "College";
    let colAbbr = "";

    let titleMatch = content.match(titleRegex1);
    if (!titleMatch) titleMatch = content.match(titleRegex2);

    // Skip if we can't parse or if it's the main colleges index page
    if (!titleMatch || path.basename(filePath) === 'colleges.html') return;

    colName = titleMatch[1].trim();
    if (titleMatch[2]) colAbbr = titleMatch[2].trim();

    const slug = path.basename(filePath, '.html');
    const abbrText = colAbbr ? `(${colAbbr})` : '';

    // 1. Update Title
    const optimizedTitle = `<title>${colName} ${abbrText} - Admission, Fees, Placements & Courses 2026 | NextCampus</title>`;
    content = content.replace(/<title>.*?<\/title>/, optimizedTitle);

    // 2. Update Description
    const optimizedDesc = `<meta name="description" content="Explore ${colName} ${abbrText} admissions 2026, courses, detailed fee structure, highest placement packages, scholarships, and campus life. Get verified details at NextCampus.">`;
    content = content.replace(/<meta name="description" content="[^"]*">/, optimizedDesc);

    // 3. Add Keywords
    if (!content.includes('<meta name="keywords"')) {
        const keywords = `<meta name="keywords" content="${colName}, ${colAbbr}, ${colAbbr} admission 2026, ${colName} placements, ${colAbbr} fees, engineering colleges, medical colleges, university ranking, NextCampus, higher education">`;
        content = content.replace('</head>', `    ${keywords}\n</head>`);
    }

    // 4. Structured Data (JSON-LD)
    if (!content.includes('application/ld+json')) {
        const ldJson = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "${colName}",
      "alternateName": "${colAbbr}",
      "url": "https://nextcampus.com/colleges/${slug}/${slug}.html",
      "logo": "https://nextcampus.com/colleges/${slug}/images/logo/${slug}_logo.png"
    }
    </script>
`;
        content = content.replace('</head>', `${ldJson}</head>`);
    }

    // 5. Update Alt tags for Logo
    content = content.replace(/<img([^>]*)alt="([^"]*?Logo[^"]*?)"([^>]*)>/gi, (match, p1, p2, p3) => {
        return `<img${p1}alt="Official Logo of ${colName} ${abbrText} - NextCampus"${p3}>`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
}

console.log("Starting SEO optimization script...");
optimizeDir(collegesDir);
console.log("✅ All college pages have been optimized for SEO.");
