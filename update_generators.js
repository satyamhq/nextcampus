const fs = require('fs');
const path = require('path');
const dir = __dirname;

const files = fs.readdirSync(dir).filter(f => f.startsWith('generate_') && f.endsWith('.js'));

for (const f of files) {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');

    // Check if it's importing getFullCss
    if (content.includes('gen_utils') && !content.includes('getFullCss')) {
        content = content.replace(/const\s+\{\s*getTabsHtml,\s*getJsContent\s*\}\s*=\s*require\('\.\/gen_utils(?:\.js)?'\);/g,
            "const { getTabsHtml, getJsContent, getFullCss } = require('./gen_utils.js');");
    }

    // Replace copyFileSync for css
    content = content.replace(/fs\.copyFileSync\([^;]+?,\s*(path\.join\([^;]+?\.css'\))\);/g,
        "fs.writeFileSync($1, getFullCss());");

    fs.writeFileSync(path.join(dir, f), content);
    console.log('Updated ' + f);
}
