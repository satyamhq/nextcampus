/* Dashboard Page JS */
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('nc_token');
    if (!token) { window.location.href = pagePath('login'); return; }
    setupDashTabs();
    await loadDashboard();
    setupProfile();
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('nc_token');
        localStorage.removeItem('nc_user');
        window.location.href = pagePath('home');
    });
});

async function loadDashboard() {
    try {
        const res = await apiFetch('/dashboard');
        const { user, savedColleges, comparisons, loans } = res.data;
        document.getElementById('welcome-msg').textContent = `Welcome back, ${user.name}!`;
        document.getElementById('p-name').value = user.name || '';
        document.getElementById('p-phone').value = user.phone || '';
        renderSaved(savedColleges);
        renderComparisons(comparisons);
        renderLoans(loans);
    } catch (e) {
        document.getElementById('welcome-msg').textContent = 'Error loading dashboard. Please try logging in again.';
    }
}

function renderSaved(colleges) {
    const el = document.getElementById('saved-list');
    if (!colleges || colleges.length === 0) {
        el.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><h3>No Saved Colleges</h3><p>Browse colleges and save your favorites!</p><a href="/colleges" class="btn btn-primary btn-sm mt-2">Browse Colleges</a></div>';
        return;
    }
    el.innerHTML = colleges.map(c => `
    <div class="saved-card">
      <h3>${c.name}</h3>
      <p>${c.location?.city || ''}, ${c.location?.state || ''} &bull; ${c.type}</p>
      <div class="meta">
        <div><span>Fees</span><strong>${formatCurrency(c.totalFees)}</strong></div>
        <div><span>Package</span><strong>${formatCurrency(c.avgPackage)}</strong></div>
      </div>
      <div class="actions">
        <a href="/college/${c._id}" class="btn btn-primary btn-sm">View</a>
        <button class="btn btn-secondary btn-sm" onclick="removeSaved('${c._id}')">Remove</button>
      </div>
    </div>
  `).join('');
}

function renderComparisons(comps) {
    const el = document.getElementById('comparisons-list');
    if (!comps || comps.length === 0) {
        el.innerHTML = '<div class="empty-state"><h3>No Saved Comparisons</h3><p>Compare colleges and save the results!</p></div>';
        return;
    }
    el.innerHTML = comps.map(c => `
    <div class="comp-card">
      <div><h4>${c.title}</h4><span class="colleges-list">${c.colleges.map(col => col.name).join(' vs ')}</span></div>
      <a href="/compare" class="btn btn-primary btn-sm">View</a>
    </div>
  `).join('');
}

function renderLoans(loans) {
    const el = document.getElementById('loans-list');
    if (!loans || loans.length === 0) {
        el.innerHTML = '<div class="empty-state"><h3>No Loan Applications</h3><p>Apply for education loans through Budget & Loans page.</p></div>';
        return;
    }
    el.innerHTML = loans.map(l => `
    <div class="loan-card">
      <div><div class="lbl">College</div><strong>${l.collegeName || 'N/A'}</strong></div>
      <div><div class="lbl">Amount</div><strong>${formatCurrency(l.loanAmount)}</strong></div>
      <div><div class="lbl">EMI</div><strong>${formatCurrency(l.emiAmount)}/mo</strong></div>
      <div><span class="loan-status ${l.status}">${l.status}</span></div>
    </div>
  `).join('');
}

function setupDashTabs() {
    document.querySelectorAll('.dash-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.dash-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
        });
    });
}

function setupProfile() {
    document.getElementById('profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await apiFetch('/dashboard/profile', {
                method: 'PUT',
                body: JSON.stringify({ name: document.getElementById('p-name').value, phone: document.getElementById('p-phone').value })
            });
            alert('Profile updated!');
        } catch (e) { alert(e.message); }
    });
}

async function removeSaved(id) {
    try {
        await apiFetch('/dashboard/save-college', { method: 'POST', body: JSON.stringify({ collegeId: id }) });
        loadDashboard();
    } catch (e) { alert(e.message); }
}
