/* Admin Panel JS */
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('nc_token');
  const user = JSON.parse(localStorage.getItem('nc_user') || 'null');
  if (!token || !user || user.role !== 'admin') { window.location.href = pagePath('login'); return; }

  setupTabs();
  await loadStats();
  await loadColleges();
  await loadUsers();
  await loadPrograms();
});

function setupTabs() {
  document.querySelectorAll('.dash-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.dash-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });
}

async function loadStats() {
  try {
    const res = await apiFetch('/admin/stats');
    const s = res.data;
    document.getElementById('admin-stats').innerHTML = `
      <div class="stat-card"><div class="val">${s.totalColleges}</div><div class="lbl">Colleges</div></div>
      <div class="stat-card"><div class="val">${s.totalUsers}</div><div class="lbl">Users</div></div>
      <div class="stat-card"><div class="val">${s.totalPrograms}</div><div class="lbl">Programs</div></div>
      <div class="stat-card"><div class="val">${s.totalLoans}</div><div class="lbl">Loans</div></div>
      <div class="stat-card"><div class="val">${s.totalReviews}</div><div class="lbl">Reviews</div></div>
      <div class="stat-card"><div class="val">${s.pendingLoans}</div><div class="lbl">Pending Loans</div></div>
    `;
  } catch (e) { console.log('Stats error:', e.message); }
}

async function loadColleges() {
  try {
    const res = await apiFetch('/colleges?limit=100');
    const colleges = res.data;
    document.getElementById('colleges-table').innerHTML = `
      <table class="admin-table">
        <thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Fees</th><th>Score</th><th>Actions</th></tr></thead>
        <tbody>${colleges.map(c => `
          <tr>
            <td><strong>${c.name}</strong></td>
            <td>${c.location.city}, ${c.location.state}</td>
            <td><span class="badge ${c.type === 'Government' ? 'badge-success' : 'badge-primary'}">${c.type}</span></td>
            <td>${formatCurrency(c.totalFees)}</td>
            <td>${c.nextcampusScore}/10</td>
            <td class="action-btns">
              <a href="/college/${c._id}" class="btn btn-primary">View</a>
              <button class="btn btn-secondary" onclick="deleteCollege('${c._id}')">Delete</button>
            </td>
          </tr>
        `).join('')}</tbody>
      </table>
    `;
  } catch (e) { document.getElementById('colleges-table').innerHTML = '<p class="text-muted">Error loading colleges.</p>'; }
}

async function loadUsers() {
  try {
    const res = await apiFetch('/admin/users');
    document.getElementById('users-table').innerHTML = `
      <table class="admin-table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
        <tbody>${res.data.map(u => `
          <tr>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td><span class="badge ${u.role === 'admin' ? 'badge-warning' : 'badge-primary'}">${u.role}</span></td>
            <td>${new Date(u.createdAt).toLocaleDateString()}</td>
            <td class="action-btns">
              ${u.role !== 'admin' ? `<button class="btn btn-secondary" onclick="deleteUser('${u._id}')">Delete</button>` : '<span class="text-muted">-</span>'}
            </td>
          </tr>
        `).join('')}</tbody>
      </table>
    `;
  } catch (e) { document.getElementById('users-table').innerHTML = '<p class="text-muted">Error loading users.</p>'; }
}

async function loadPrograms() {
  try {
    const res = await apiFetch('/programs');
    document.getElementById('programs-table').innerHTML = `
      <table class="admin-table">
        <thead><tr><th>Name</th><th>Category</th><th>Avg Fees</th><th>Avg Salary</th><th>Colleges</th><th>Actions</th></tr></thead>
        <tbody>${res.data.map(p => `
          <tr>
            <td><strong>${p.name}</strong></td>
            <td><span class="badge badge-primary">${p.category}</span></td>
            <td>${formatCurrency(p.avgFees)}</td>
            <td>${formatCurrency(p.avgSalary)}</td>
            <td>${p.totalColleges}+</td>
            <td class="action-btns">
              <button class="btn btn-secondary" onclick="deleteProgram('${p._id}')">Delete</button>
            </td>
          </tr>
        `).join('')}</tbody>
      </table>
    `;
  } catch (e) { document.getElementById('programs-table').innerHTML = '<p class="text-muted">Error loading programs.</p>'; }
}

async function deleteCollege(id) {
  if (!confirm('Delete this college?')) return;
  try { await apiFetch(`/admin/colleges/${id}`, { method: 'DELETE' }); loadColleges(); loadStats(); } catch (e) { alert(e.message); }
}

async function deleteUser(id) {
  if (!confirm('Delete this user?')) return;
  try { await apiFetch(`/admin/users/${id}`, { method: 'DELETE' }); loadUsers(); loadStats(); } catch (e) { alert(e.message); }
}

async function deleteProgram(id) {
  if (!confirm('Delete this program?')) return;
  try { await apiFetch(`/admin/programs/${id}`, { method: 'DELETE' }); loadPrograms(); loadStats(); } catch (e) { alert(e.message); }
}
