/**
 * reorganize_colleges.js
 * 
 * Moves all misplaced college folders into the correct structure:
 *   /colleges/{state}/{college-slug}/
 *
 * Handles:
 *   1. `cu/`            → `punjab/chandigarh-university/` (already exists, skip CU files if there)
 *   2. `iitb/`          → `maharashtra/indian-institute-of-technology-bombay/`
 *   3. `jk/`            → empty/orphan → remove
 *   4. `jammu-kashmir/` → merge into `jammu-and-kashmir/`
 *   5. `mumbai-maharashtra/` → merge sub-folders into `maharashtra/`
 *
 * Also scans ALL state folders and ensures every college sub-folder
 * that directly contains .html/.css/.js files (flat layout) is left
 * as-is (already in {state}/{slug}/ structure).
 */

const fs = require('fs');
const path = require('path');

const COLLEGES_DIR = path.join(__dirname, 'frontend', 'colleges');

// ─── Helper ───────────────────────────────────────────────────────────────

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '').replace(/-+$/, '');
}

/** Move src directory into dest. If dest already exists, merge children. */
function moveDir(src, dest) {
    if (!fs.existsSync(src)) { console.log(`  SKIP (not found): ${src}`); return; }
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
        const srcItem = path.join(src, item);
        const destItem = path.join(dest, item);
        if (fs.statSync(srcItem).isDirectory()) {
            moveDir(srcItem, destItem);
        } else {
            if (!fs.existsSync(destItem)) {
                fs.renameSync(srcItem, destItem);
            } else {
                console.log(`  SKIP (dest exists): ${destItem}`);
            }
        }
    }
    // Remove src dir if now empty
    try { fs.rmdirSync(src); } catch (_) { }
}

/** Remove a directory tree if it is empty or after contents moved */
function removeIfEmpty(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    if (items.length === 0) {
        fs.rmdirSync(dir);
        console.log(`  Removed empty dir: ${dir}`);
    } else {
        console.log(`  WARNING – not empty, skipping removal: ${dir} (${items.join(', ')})`);
    }
}

// ─── Known state slugs ────────────────────────────────────────────────────
const KNOWN_STATES = new Set([
    'andhra-pradesh', 'arunachal-pradesh', 'assam', 'bihar', 'chandigarh',
    'chhattisgarh', 'delhi', 'goa', 'gujarat', 'haryana', 'himachal-pradesh',
    'jammu-and-kashmir', 'jharkhand', 'karnataka', 'kerala', 'ladakh',
    'madhya-pradesh', 'maharashtra', 'manipur', 'meghalaya', 'mizoram',
    'nagaland', 'odisha', 'puducherry', 'punjab', 'rajasthan', 'sikkim',
    'tamil-nadu', 'telangana', 'tripura', 'uttarakhand', 'uttar-pradesh', 'west-bengal'
]);

// ─── Step 1: Fix `cu/` ────────────────────────────────────────────────────
// The `cu/` folder at the top level is the old Chandigarh University page
// (cu.html, cu.css, cu.js + images). CU is in Punjab.
// The correct path is punjab/chandigarh-university/
function fixCu() {
    const src = path.join(COLLEGES_DIR, 'cu');
    const dest = path.join(COLLEGES_DIR, 'punjab', 'chandigarh-university');
    if (!fs.existsSync(src)) { console.log('[CU] Already gone.'); return; }

    console.log('\n[CU] Moving cu/ → punjab/chandigarh-university/');
    fs.mkdirSync(dest, { recursive: true });

    // Rename cu.* files to chandigarh-university.*
    const renames = { 'cu.html': 'chandigarh-university.html', 'cu.css': 'chandigarh-university.css', 'cu.js': 'chandigarh-university.js' };
    for (const [oldName, newName] of Object.entries(renames)) {
        const srcFile = path.join(src, oldName);
        const destFile = path.join(dest, newName);
        if (fs.existsSync(srcFile) && !fs.existsSync(destFile)) {
            fs.renameSync(srcFile, destFile);
            console.log(`  Renamed & moved: ${oldName} → ${newName}`);
        }
    }
    // Move images/
    const imgSrc = path.join(src, 'images');
    const imgDest = path.join(dest, 'images');
    if (fs.existsSync(imgSrc)) { moveDir(imgSrc, imgDest); }

    // Move any sub-college folders that ended up inside cu/ (from earlier JK runs)
    for (const item of fs.readdirSync(src)) {
        const itemPath = path.join(src, item);
        if (fs.statSync(itemPath).isDirectory()) {
            // These are college slugs – determine their state from home.js lookup or best-guess
            // They were likely JK colleges put in wrong place; move to jammu-and-kashmir
            const jkDest = path.join(COLLEGES_DIR, 'jammu-and-kashmir', item);
            console.log(`  Moving orphan sub-dir cu/${item} → jammu-and-kashmir/${item}`);
            moveDir(itemPath, jkDest);
        }
    }

    removeIfEmpty(src);
}

// ─── Step 2: Fix `iitb/` ──────────────────────────────────────────────────
// iitb/ is the old IIT Bombay standalone page. Should be in maharashtra/
function fixIitb() {
    const src = path.join(COLLEGES_DIR, 'iitb');
    const dest = path.join(COLLEGES_DIR, 'maharashtra', 'indian-institute-of-technology-bombay');
    if (!fs.existsSync(src)) { console.log('[IITB] Already gone.'); return; }

    console.log('\n[IITB] Moving iitb/ → maharashtra/indian-institute-of-technology-bombay/');
    fs.mkdirSync(dest, { recursive: true });

    // Rename iitb.* → indian-institute-of-technology-bombay.*
    const renames = {
        'iitb.html': 'indian-institute-of-technology-bombay.html',
        'iitb.css': 'indian-institute-of-technology-bombay.css',
        'iitb.js': 'indian-institute-of-technology-bombay.js'
    };
    for (const [oldName, newName] of Object.entries(renames)) {
        const srcFile = path.join(src, oldName);
        const destFile = path.join(dest, newName);
        if (fs.existsSync(srcFile) && !fs.existsSync(destFile)) {
            fs.renameSync(srcFile, destFile);
            console.log(`  Renamed & moved: ${oldName} → ${newName}`);
        }
    }
    // Move images/
    const imgSrc = path.join(src, 'images');
    if (fs.existsSync(imgSrc)) moveDir(imgSrc, path.join(dest, 'images'));

    // Move any remaining files/dirs
    for (const item of fs.readdirSync(src)) {
        const srcItem = path.join(src, item);
        const destItem = path.join(dest, item);
        if (!fs.existsSync(destItem)) fs.renameSync(srcItem, destItem);
    }
    removeIfEmpty(src);
}

// ─── Step 3: Fix `jk/` and `jammu-kashmir/` ──────────────────────────────
// Both are duplicate/alias dirs for Jammu & Kashmir. Canonical = jammu-and-kashmir/
function fixJk() {
    for (const alias of ['jk', 'jammu-kashmir']) {
        const src = path.join(COLLEGES_DIR, alias);
        const dest = path.join(COLLEGES_DIR, 'jammu-and-kashmir');
        if (!fs.existsSync(src)) { console.log(`[JK] ${alias}/ not found — skipping.`); continue; }
        console.log(`\n[JK] Merging ${alias}/ → jammu-and-kashmir/`);
        moveDir(src, dest);
        removeIfEmpty(src);
    }
}

// ─── Step 4: Fix `mumbai-maharashtra/` ────────────────────────────────────
// All sub-folders belong in maharashtra/
function fixMumbaiMaharashtra() {
    const src = path.join(COLLEGES_DIR, 'mumbai-maharashtra');
    const dest = path.join(COLLEGES_DIR, 'maharashtra');
    if (!fs.existsSync(src)) { console.log('[MumbaiMH] Already gone.'); return; }

    console.log('\n[MumbaiMH] Merging mumbai-maharashtra/ → maharashtra/');
    fs.mkdirSync(dest, { recursive: true });

    for (const item of fs.readdirSync(src)) {
        const srcItem = path.join(src, item);
        const destItem = path.join(dest, item);
        if (fs.statSync(srcItem).isDirectory()) {
            console.log(`  Moving: mumbai-maharashtra/${item} → maharashtra/${item}`);
            moveDir(srcItem, destItem);
        } else {
            // Loose files at top of mumbai-maharashtra/ – skip (not college pages)
            console.log(`  Skipping loose file: ${item}`);
        }
    }
    removeIfEmpty(src);
}

// ─── Step 5: Scan for any remaining top-level non-state dirs ─────────────
function auditTopLevel() {
    console.log('\n[AUDIT] Checking for other top-level anomalies...');
    const entries = fs.readdirSync(COLLEGES_DIR);
    const anomalies = [];

    for (const entry of entries) {
        const entryPath = path.join(COLLEGES_DIR, entry);
        const stat = fs.statSync(entryPath);
        // Files at top level are fine (colleges.html, colleges.css, colleges.js)
        if (!stat.isDirectory()) continue;
        if (KNOWN_STATES.has(entry)) continue;
        anomalies.push(entry);
    }

    if (anomalies.length === 0) {
        console.log('  ✅ No anomalies found! All top-level dirs are valid state folders.');
    } else {
        console.log(`  ⚠️  Unknown top-level dirs remaining: ${anomalies.join(', ')}`);
        console.log('  These may need manual review.');
    }
}

// ─── Step 6: Update home.js links ─────────────────────────────────────────
// Fix any stale references in home.js for the moved files
function fixHomeJsLinks() {
    const homeJsPath = path.join(__dirname, 'frontend', 'home', 'home.js');
    if (!fs.existsSync(homeJsPath)) { console.log('\n[HomeJS] Not found, skipping.'); return; }

    console.log('\n[HomeJS] Updating stale links in home.js...');
    let content = fs.readFileSync(homeJsPath, 'utf8');
    let changes = 0;

    const replacements = [
        // cu/ → punjab/chandigarh-university/
        [/\.\.\/colleges\/cu\/cu\.html/g,
            '../colleges/punjab/chandigarh-university/chandigarh-university.html'],
        // iitb/ → maharashtra/indian-institute-of-technology-bombay/
        [/\.\.\/colleges\/iitb\/iitb\.html/g,
            '../colleges/maharashtra/indian-institute-of-technology-bombay/indian-institute-of-technology-bombay.html'],
        // jk/ → jammu-and-kashmir/
        [/\.\.\/colleges\/jk\//g, '../colleges/jammu-and-kashmir/'],
        // jammu-kashmir/ → jammu-and-kashmir/
        [/\.\.\/colleges\/jammu-kashmir\//g, '../colleges/jammu-and-kashmir/'],
        // mumbai-maharashtra/ → maharashtra/
        [/\.\.\/colleges\/mumbai-maharashtra\//g, '../colleges/maharashtra/'],
    ];

    for (const [pattern, replacement] of replacements) {
        const before = content;
        content = content.replace(pattern, replacement);
        if (content !== before) {
            changes++;
            console.log(`  Fixed: ${pattern} → ${replacement}`);
        }
    }

    fs.writeFileSync(homeJsPath, content, 'utf8');
    console.log(`  ✅ home.js updated — ${changes} pattern(s) replaced.`);
}

// ─── Run ───────────────────────────────────────────────────────────────────
console.log('═══════════════════════════════════════════════════');
console.log(' NextCampus — College Folder Reorganization Script');
console.log('═══════════════════════════════════════════════════');

fixCu();
fixIitb();
fixJk();
fixMumbaiMaharashtra();
fixHomeJsLinks();
auditTopLevel();

console.log('\n✅ Reorganization complete!');
