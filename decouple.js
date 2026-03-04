const fs = require('fs');
const path = require('path');

const sharedDir = path.join(__dirname, 'frontend', 'shared');
const collegesDir = path.join(__dirname, 'frontend', 'colleges');

// 1. Read shared contents
const sharedCSS = [
    fs.readFileSync(path.join(sharedDir, 'global.css'), 'utf8'),
    fs.readFileSync(path.join(sharedDir, 'header.css'), 'utf8'),
    fs.readFileSync(path.join(sharedDir, 'footer.css'), 'utf8'),
    fs.readFileSync(path.join(sharedDir, 'college.css'), 'utf8')
].join('\n\n/* --- END SHARED --- */\n\n');

const sharedJS = [
    fs.readFileSync(path.join(sharedDir, 'header.js'), 'utf8'),
    fs.readFileSync(path.join(sharedDir, 'footer.js'), 'utf8')
].join('\n\n/* --- END SHARED --- */\n\n');

// Arrays to track
const updatedFiles = [];
const errors = [];

function decoupleDir(dir) {
    const files = fs.readdirSync(dir);

    // Check if this directory is a leaf college directory (contains .html)
    const htmlFile = files.find(f => f.endsWith('.html'));

    if (htmlFile) {
        const slug = htmlFile.replace('.html', '');
        const cssFile = `${slug}.css`;
        const jsFile = `${slug}.js`;

        const htmlPath = path.join(dir, htmlFile);
        const cssPath = path.join(dir, cssFile);
        const jsPath = path.join(dir, jsFile);

        let htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // If it still contains "shared/", it needs decoupling
        if (htmlContent.includes('/shared/')) {
            // Remove shared lines from HTML
            const htmlLines = htmlContent.split('\n').filter(line => !line.includes('/shared/'));
            htmlContent = htmlLines.join('\n');
            fs.writeFileSync(htmlPath, htmlContent, 'utf8');

            // Prepend shared CSS to college CSS
            if (fs.existsSync(cssPath)) {
                let colCss = fs.readFileSync(cssPath, 'utf8');
                // Avoid double prepending
                if (!colCss.includes('/* --- END SHARED --- */')) {
                    fs.writeFileSync(cssPath, sharedCSS + '\n\n' + colCss, 'utf8');
                }
            } else {
                fs.writeFileSync(cssPath, sharedCSS, 'utf8');
            }

            // Prepend shared JS to college JS
            if (fs.existsSync(jsPath)) {
                let colJs = fs.readFileSync(jsPath, 'utf8');
                if (!colJs.includes('/* --- END SHARED --- */')) {
                    fs.writeFileSync(jsPath, sharedJS + '\n\n' + colJs, 'utf8');
                }
            } else {
                fs.writeFileSync(jsPath, sharedJS, 'utf8');
            }

            updatedFiles.push(slug);
        }
    }

    // Recurse into subdirectories
    for (const f of files) {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            decoupleDir(fullPath);
        }
    }
}

console.log("Starting decoupling process...");
decoupleDir(collegesDir);
console.log(`Decoupled ${updatedFiles.length} colleges.`);
if (errors.length) console.log("Errors:", errors);
