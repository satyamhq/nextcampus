const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'frontend');
const collegesDir = path.join(frontendDir, 'colleges');
const homeJsPath = path.join(frontendDir, 'home', 'home.js');

let homeContent = fs.readFileSync(homeJsPath, 'utf8');

function slugify(text) {
    if (!text) return 'unknown';
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

const items = fs.readdirSync(collegesDir);
const migrations = [];

for (const item of items) {
    const oldDirPath = path.join(collegesDir, item);
    if (!fs.statSync(oldDirPath).isDirectory()) continue;

    const oldHtmlPath = path.join(oldDirPath, item + '.html');
    if (!fs.existsSync(oldHtmlPath)) continue;

    let htmlContent = fs.readFileSync(oldHtmlPath, 'utf8');

    let state = 'unknown';
    const stateMatch = htmlContent.match(/<p class="lpu-location">&#128205;.*?, (.*?), India/);
    if (stateMatch && stateMatch[1]) {
        state = stateMatch[1].trim();
    } else {
        const altStateMatch = htmlContent.match(/<span class="lpu-sticky-loc">&#128205;.*?, (.*?)<\/span>/);
        if (altStateMatch && altStateMatch[1]) {
            state = altStateMatch[1].replace('&#128205;', '').split(',').pop().trim();
        }
    }

    let collegeName = item;
    const nameMatch = htmlContent.match(/<span class="lpu-sticky-name">(.*?)<\/span>/);
    if (nameMatch && nameMatch[1]) {
        collegeName = nameMatch[1].trim();
    }

    const stateSlug = slugify(state);
    const collegeSlug = slugify(collegeName.replace(/amp;/g, '').replace(/&/g, 'and'));

    migrations.push({
        oldSlug: item,
        stateSlug,
        collegeSlug,
        oldDirPath,
        newDirPath: path.join(collegesDir, stateSlug, collegeSlug)
    });
}

console.log(`Found ${migrations.length} colleges to migrate.`);

// Execution
for (const m of migrations) {
    fs.mkdirSync(m.newDirPath, { recursive: true });

    const copyRecursiveSync = function (src, dest) {
        if (fs.existsSync(src)) {
            if (fs.statSync(src).isDirectory()) {
                if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
                fs.readdirSync(src).forEach((child) => {
                    copyRecursiveSync(path.join(src, child), path.join(dest, child));
                });
            } else {
                fs.copyFileSync(src, dest);
            }
        }
    };

    copyRecursiveSync(m.oldDirPath, m.newDirPath);
    fs.rmSync(m.oldDirPath, { recursive: true, force: true });

    const oldHtml = path.join(m.newDirPath, m.oldSlug + '.html');
    const newHtml = path.join(m.newDirPath, m.collegeSlug + '.html');
    if (fs.existsSync(oldHtml)) fs.renameSync(oldHtml, newHtml);

    const oldCss = path.join(m.newDirPath, m.oldSlug + '.css');
    const newCss = path.join(m.newDirPath, m.collegeSlug + '.css');
    if (fs.existsSync(oldCss)) fs.renameSync(oldCss, newCss);

    const oldJs = path.join(m.newDirPath, m.oldSlug + '.js');
    const newJs = path.join(m.newDirPath, m.collegeSlug + '.js');
    if (fs.existsSync(oldJs)) fs.renameSync(oldJs, newJs);

    const logoDir = path.join(m.newDirPath, 'images', 'logo');
    const oldLogo = path.join(logoDir, m.oldSlug + '_logo.png');
    const newLogo = path.join(logoDir, m.collegeSlug + '_logo.png');
    if (fs.existsSync(oldLogo)) fs.renameSync(oldLogo, newLogo);

    const coverDir = path.join(m.newDirPath, 'images', 'cover');
    const oldCover = path.join(coverDir, m.oldSlug + '_cover.png');
    const newCover = path.join(coverDir, m.collegeSlug + '_cover.png');
    if (fs.existsSync(oldCover)) fs.renameSync(oldCover, newCover);

    if (fs.existsSync(newHtml)) {
        let content = fs.readFileSync(newHtml, 'utf8');
        content = content.replace(/\.\.\/\.\.\/shared/g, '../../../shared');
        content = content.replace(/\.\.\/\.\.\/favicon/g, '../../../favicon');
        content = content.replace(new RegExp(m.oldSlug + '\\.css', 'g'), m.collegeSlug + '.css');
        content = content.replace(new RegExp(m.oldSlug + '\\.js', 'g'), m.collegeSlug + '.js');
        content = content.replace(new RegExp(m.oldSlug + '_logo\\.png', 'g'), m.collegeSlug + '_logo.png');
        content = content.replace(new RegExp(m.oldSlug + '_cover\\.png', 'g'), m.collegeSlug + '_cover.png');
        content = content.replace(new RegExp(`/colleges/${m.oldSlug}/${m.oldSlug}\\.html`, 'g'), `/colleges/${m.stateSlug}/${m.collegeSlug}/${m.collegeSlug}.html`);
        fs.writeFileSync(newHtml, content, 'utf8');
    }

    if (fs.existsSync(newJs)) {
        let jsContent = fs.readFileSync(newJs, 'utf8');
        fs.writeFileSync(newJs, jsContent, 'utf8');
    }

    const oldLinkRegex = new RegExp(`\\.\\./colleges/${m.oldSlug}/${m.oldSlug}\\.html`, 'g');
    homeContent = homeContent.replace(oldLinkRegex, `../colleges/${m.stateSlug}/${m.collegeSlug}/${m.collegeSlug}.html`);
    console.log(`Migrated ${m.oldSlug} -> ${m.stateSlug}/${m.collegeSlug}`);
}

fs.writeFileSync(homeJsPath, homeContent, 'utf8');

// Also update colleges.js and other files if they exist
function updateLinksInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const m of migrations) {
        let before = content;
        content = content.replace(new RegExp(`\\.\\./colleges/${m.oldSlug}/${m.oldSlug}\\.html`, 'g'), `../colleges/${m.stateSlug}/${m.collegeSlug}/${m.collegeSlug}.html`);
        content = content.replace(new RegExp(`/colleges/${m.oldSlug}/${m.oldSlug}\\.html`, 'g'), `/colleges/${m.stateSlug}/${m.collegeSlug}/${m.collegeSlug}.html`);
        if (before !== content) changed = true;
    }
    if (changed) fs.writeFileSync(filePath, content, 'utf8');
}

updateLinksInFile(path.join(frontendDir, 'colleges', 'colleges.js'));
updateLinksInFile(path.join(frontendDir, 'home', 'home.html'));
