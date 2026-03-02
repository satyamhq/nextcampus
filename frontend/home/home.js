/* Home Page — JavaScript */

const programIcons = {
    'Engineering': '&#9881;', 'Medical': '&#9829;', 'MBA': '&#128200;',
    'Law': '&#9878;', 'Design': '&#127912;', 'Arts & Science': '&#128218;',
    'Commerce': '&#128176;', 'Online Degrees': '&#128187;', 'Study Abroad': '&#127758;'
};

document.addEventListener('DOMContentLoaded', async () => {
    loadPrograms();
    loadFeaturedColleges();
    setupSearch();
});

async function loadPrograms() {
    const grid = document.getElementById('programs-grid');
    try {
        const res = await apiFetch('/programs');
        const programs = res.data;
        grid.innerHTML = programs.map(p => `
      <a href="/colleges?program=${encodeURIComponent(p.category)}" class="program-card">
        <div class="program-card-icon">${programIcons[p.category] || '&#128218;'}</div>
        <div>
          <h3>${p.name}</h3>
          <p>${p.totalColleges.toLocaleString()}+ Colleges &bull; ${p.specializations.length} Specializations</p>
        </div>
      </a>
    `).join('');
    } catch (e) {
        grid.innerHTML = getStaticPrograms();
    }
}

function getStaticPrograms() {
    const items = [
        { name: 'Engineering', count: '4,500+', specs: 7, cat: 'Engineering' },
        { name: 'Medical', count: '600+', specs: 6, cat: 'Medical' },
        { name: 'MBA', count: '3,500+', specs: 6, cat: 'MBA' },
        { name: 'Law', count: '1,500+', specs: 5, cat: 'Law' },
        { name: 'Design', count: '500+', specs: 5, cat: 'Design' },
        { name: 'Arts & Science', count: '8,000+', specs: 7, cat: 'Arts & Science' },
        { name: 'Commerce', count: '5,000+', specs: 5, cat: 'Commerce' },
        { name: 'Online Degrees', count: '300+', specs: 5, cat: 'Online Degrees' },
        { name: 'Study Abroad', count: '10,000+', specs: 6, cat: 'Study Abroad' }
    ];
    return items.map(i => `
    <a href="/colleges?program=${encodeURIComponent(i.cat)}" class="program-card">
      <div class="program-card-icon">${programIcons[i.cat] || '&#128218;'}</div>
      <div>
        <h3>${i.name}</h3>
        <p>${i.count} Colleges &bull; ${i.specs} Specializations</p>
      </div>
    </a>
  `).join('');
}

async function loadFeaturedColleges() {
    const grid = document.getElementById('featured-colleges');
    try {
        const res = await apiFetch('/colleges?limit=6&sort=score');
        const colleges = res.data;
        grid.innerHTML = colleges.map(c => createCollegeCard(c)).join('');
    } catch (e) {
        grid.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;padding:40px;">Start the backend server to see featured colleges.</p>';
    }
}

function createCollegeCard(c) {
    return `
    <div class="college-card">
      <div class="college-card-header">
        <h3>${c.name}</h3>
        <p>&#128205; ${c.location.city}, ${c.location.state} &bull; ${c.type}</p>
        <div class="college-score">${c.nextcampusScore}</div>
      </div>
      <div class="college-card-body">
        <div class="college-stat">
          <label>Total Fees</label>
          <strong>${formatCurrency(c.totalFees)}</strong>
        </div>
        <div class="college-stat">
          <label>Avg Package</label>
          <strong>${formatCurrency(c.avgPackage)}</strong>
        </div>
        <div class="college-stat">
          <label>Placement</label>
          <strong>${c.placementRate}%</strong>
        </div>
        <div class="college-stat">
          <label>NIRF Rank</label>
          <strong>#${c.ranking.nirf}</strong>
        </div>
      </div>
      <div class="college-card-footer">
        <a href="/college/${c._id}" class="btn btn-primary btn-sm">View Details</a>
        <button class="btn btn-secondary btn-sm" onclick="addToCompare('${c._id}','${c.name.replace(/'/g, "\\'")}')">&#9878; Compare</button>
      </div>
    </div>
  `;
}

function setupSearch() {
    const btn = document.getElementById('search-btn');
    btn.addEventListener('click', () => {
        const program = document.getElementById('search-program').value;
        const rank = document.getElementById('search-rank').value;
        const budget = document.getElementById('search-budget').value;
        const location = document.getElementById('search-location').value;

        const params = new URLSearchParams();
        if (program) params.set('program', program);
        if (rank) params.set('rankMax', rank);
        if (budget) params.set('budgetMax', budget);
        if (location) params.set('location', location);

        window.location.href = `/colleges?${params.toString()}`;
    });
}

// Compare list (stored in localStorage)
function addToCompare(id, name) {
    let compareList = JSON.parse(localStorage.getItem('nc_compare') || '[]');
    if (compareList.find(c => c.id === id)) {
        alert('College already added to compare!');
        return;
    }
    if (compareList.length >= 3) {
        alert('You can compare up to 3 colleges. Remove one first.');
        return;
    }
    compareList.push({ id, name });
    localStorage.setItem('nc_compare', JSON.stringify(compareList));
    alert(`${name} added to compare!`);
}
