const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'frontend', 'colleges', 'nagaland');

async function getImageUrl(query) {
    try {
        const bingUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2`;
        const res = await axios.get(bingUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            }
        });
        const $ = cheerio.load(res.data);
        const m = $('a.iusc').first().attr('m');
        if (m) {
            const data = JSON.parse(m);
            return data.murl;
        }
    } catch (e) {
        console.error(`Failed to find image for query: ${query}`);
    }
    return null;
}

async function downloadAndOptimize(url, destPath) {
    if (!url) return false;
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 15000 });
        const buffer = Buffer.from(response.data, 'binary');
        fs.writeFileSync(destPath, buffer);
        return true;
    } catch (e) {
        console.error(`  Error downloading ${url}: ${e.message.split('\\n')[0].substring(0, 100)}`);
        return false;
    }
}

async function processCollege(folderName) {
    const collegePath = path.join(basePath, folderName);
    if (!fs.statSync(collegePath).isDirectory()) return;

    const htmlPath = path.join(collegePath, `${folderName}.html`);
    if (!fs.existsSync(htmlPath)) return;
    const cssPath = path.join(collegePath, `${folderName}.css`);
    if (!fs.existsSync(cssPath)) return;

    // Create folders
    const logoDir = path.join(collegePath, 'images', 'logo');
    const coverDir = path.join(collegePath, 'images', 'cover');
    fs.mkdirSync(logoDir, { recursive: true });
    fs.mkdirSync(coverDir, { recursive: true });

    const logoDest = path.join(logoDir, `${folderName}_logo.png`);
    const coverDest = path.join(coverDir, `${folderName}_cover.png`);

    // Read name from HTML
    let collegeName = folderName.replace(/-/g, ' ');
    if (collegeName.includes('${col.name}')) return;
    try {
        const html = fs.readFileSync(htmlPath, 'utf8');
        const titleMatch = html.match(/<title>([^(<]+)/);
        if (titleMatch && titleMatch[1]) {
            collegeName = titleMatch[1].trim();
            if (collegeName.includes('${col.name}')) return;
        }
    } catch (e) { }

    console.log(`\nProcessing: ${collegeName}`);

    // Logo
    const logoQuery = `${collegeName} logo`;
    const logoUrl = await getImageUrl(logoQuery);
    if (logoUrl) {
        console.log(`  Logo query: ${logoQuery} -> ${logoUrl.substring(0, 50)}...`);
        const success = await downloadAndOptimize(logoUrl, logoDest);
        if (success) console.log(`  ✅ Logo saved`);
    } else {
        console.log(`  ❌ Logo not found for ${collegeName}`);
    }

    // Cover
    const coverQuery = `${collegeName} campus building`;
    const coverUrl = await getImageUrl(coverQuery);
    if (coverUrl) {
        console.log(`  Cover query: ${coverQuery} -> ${coverUrl.substring(0, 50)}...`);
        const success = await downloadAndOptimize(coverUrl, coverDest);
        if (success) console.log(`  ✅ Cover saved`);
    } else {
        console.log(`  ❌ Cover not found for ${collegeName}`);
    }
}

async function run() {
    console.log('Starting image downloader...');
    const folders = fs.readdirSync(basePath);
    for (const folder of folders) {
        if (folder.startsWith('.') || folder.includes('$') || folder.includes('col.name')) continue;
        await processCollege(folder);
        // Delay to prevent getting blocked by Bing
        await new Promise(r => setTimeout(r, 1500));
    }
    console.log('\nFinished processing all colleges in Manipur!');
}

run();
