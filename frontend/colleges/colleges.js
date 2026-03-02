/* Colleges Listing Page JS */
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    applyURLParams();
    loadColleges();
    setupFilterEvents();
});

function applyURLParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('program')) document.getElementById('f-program').value = params.get('program');
    if (params.get('budgetMax')) {
        document.getElementById('f-budget-max').value = params.get('budgetMax');
        document.getElementById('f-budget-slider').value = params.get('budgetMax');
        updateBudgetLabel();
    }
    if (params.get('location')) document.getElementById('f-location').value = params.get('location');
    if (params.get('type')) document.getElementById('f-type').value = params.get('type');
    if (params.get('sort')) document.getElementById('f-sort').value = params.get('sort');
}

async function loadColleges(page = 1) {
    currentPage = page;
    const list = document.getElementById('college-list');
    list.innerHTML = Array(4).fill('<div class="skeleton skeleton-card"></div>').join('');

    const params = new URLSearchParams();
    const program = document.getElementById('f-program').value;
    const budgetMin = document.getElementById('f-budget-min').value;
    const budgetMax = document.getElementById('f-budget-max').value;
    const location = document.getElementById('f-location').value;
    const type = document.getElementById('f-type').value;
    const sort = document.getElementById('f-sort').value;

    if (program) params.set('program', program);
    if (budgetMin) params.set('budgetMin', budgetMin);
    if (budgetMax) params.set('budgetMax', budgetMax);
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (sort) params.set('sort', sort);
    params.set('page', page);
    params.set('limit', 8);

    try {
        const res = await apiFetch(`/colleges?${params.toString()}`);
        const { data, pagination } = res;
        document.getElementById('results-count').textContent = pagination.total;

        if (data.length === 0) {
            list.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;padding:60px">No colleges found matching your filters. Try adjusting your criteria.</p>';
            return;
        }

        list.innerHTML = data.map(c => `
      <div class="clg-card">
        <div class="clg-card-top">
          <div class="clg-card-info">
            <h3>${c.name}</h3>
            <p>&#128205; ${c.location.city}, ${c.location.state}</p>
            <span class="badge ${c.type === 'Government' ? 'badge-success' : 'badge-primary'}">${c.type}</span>
          </div>
          <div class="clg-score">${c.nextcampusScore}</div>
        </div>
        <div class="clg-card-stats">
          <div class="clg-stat"><label>Total Fees</label><strong>${formatCurrency(c.totalFees)}</strong></div>
          <div class="clg-stat"><label>Avg Package</label><strong>${formatCurrency(c.avgPackage)}</strong></div>
          <div class="clg-stat"><label>Placement</label><strong>${c.placementRate}%</strong></div>
          <div class="clg-stat"><label>NIRF Rank</label><strong>#${c.ranking.nirf}</strong></div>
        </div>
        <div class="clg-card-actions">
          <a href="/college/${c._id}" class="btn btn-primary btn-sm">View Details</a>
          <button class="btn btn-secondary btn-sm" onclick="addToCompare('${c._id}','${c.name.replace(/'/g, "\\'")}')">&#9878; Compare</button>
          <button class="btn btn-sm" style="background:var(--gray-100);color:var(--text)" onclick="saveCollege('${c._id}')">&#9829;</button>
        </div>
      </div>
    `).join('');

        renderPagination(pagination);
    } catch (e) {
        list.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;padding:60px">Start the backend server to see colleges.</p>';
    }
}

function renderPagination(pagination) {
    const el = document.getElementById('pagination');
    if (pagination.pages <= 1) { el.innerHTML = ''; return; }

    let html = '';
    for (let i = 1; i <= pagination.pages; i++) {
        html += `<button class="page-btn ${i === pagination.page ? 'active' : ''}" onclick="loadColleges(${i})">${i}</button>`;
    }
    el.innerHTML = html;
}

function setupFilterEvents() {
    document.getElementById('apply-filters').addEventListener('click', () => {
        loadColleges(1);
        document.getElementById('filter-sidebar').classList.remove('open');
    });

    document.getElementById('clear-filters').addEventListener('click', () => {
        document.getElementById('f-program').value = '';
        document.getElementById('f-budget-slider').value = 5000000;
        document.getElementById('f-budget-min').value = '';
        document.getElementById('f-budget-max').value = '5000000';
        updateBudgetLabel();
        document.getElementById('f-location').value = '';
        document.getElementById('f-type').value = '';
        document.getElementById('f-sort').value = 'score';
        loadColleges(1);
    });

    document.getElementById('toggle-mobile-filters').addEventListener('click', () => {
        document.getElementById('filter-sidebar').classList.toggle('open');
    });

    // Budget slider
    document.getElementById('f-budget-slider').addEventListener('input', () => {
        updateBudgetLabel();
        document.getElementById('f-budget-max').value = document.getElementById('f-budget-slider').value;
    });
}

function updateBudgetLabel() {
    const val = Number(document.getElementById('f-budget-slider').value);
    const label = document.getElementById('f-budget-val');
    if (val >= 5000000) {
        label.innerHTML = 'Up to &#8377;50 Lakh (All)';
    } else if (val === 0) {
        label.innerHTML = 'Any Budget';
    } else {
        label.innerHTML = `Up to &#8377;${(val / 100000).toFixed(0)} Lakh`;
    }
}

function addToCompare(id, name) {
    let compareList = JSON.parse(localStorage.getItem('nc_compare') || '[]');
    if (compareList.find(c => c.id === id)) { alert('Already in compare list!'); return; }
    if (compareList.length >= 3) { alert('Max 3 colleges for comparison.'); return; }
    compareList.push({ id, name });
    localStorage.setItem('nc_compare', JSON.stringify(compareList));
    alert(`${name} added to comparison!`);
}

async function saveCollege(id) {
    const token = localStorage.getItem('nc_token');
    if (!token) { window.location.href = pagePath('login'); return; }
    try {
        const res = await apiFetch('/dashboard/save-college', { method: 'POST', body: JSON.stringify({ collegeId: id }) });
        alert(res.message);
    } catch (e) { alert(e.message); }
}
