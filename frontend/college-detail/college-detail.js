/* College Detail Page JS */
let college = null;
let reviews = [];

document.addEventListener('DOMContentLoaded', async () => {
    const id = window.location.pathname.split('/').pop();
    await loadCollege(id);
    setupTabs();
});

async function loadCollege(id) {
    try {
        const res = await apiFetch(`/colleges/${id}`);
        college = res.data;
        reviews = res.reviews || [];
        document.title = `${college.name} — NextCampus`;
        renderHero();
        renderOverview();
        renderFees();
        renderPlacements();
        renderInfrastructure();
        renderReviews();
        renderAdmission();
        renderSidebar();
    } catch (e) {
        document.getElementById('hero-content').innerHTML = '<h1>College not found</h1><p>Please check the URL or go back to <a href="/colleges">colleges listing</a>.</p>';
    }
}

function renderHero() {
    const c = college;
    document.getElementById('hero-content').innerHTML = `
    <div class="detail-hero-top">
      <div class="detail-hero-info">
        <h1>${c.name}</h1>
        <p class="location">&#128205; ${c.location.city}, ${c.location.state} &bull; Est. ${c.established || 'N/A'}</p>
        <div class="detail-hero-badges">
          <span class="badge ${c.type === 'Government' ? 'badge-success' : 'badge-primary'}">${c.type}</span>
          ${c.accreditation ? `<span class="badge badge-warning">${c.accreditation}</span>` : ''}
          <span class="badge badge-primary">NIRF #${c.ranking.nirf}</span>
        </div>
        <div class="hero-stats-row">
          <div class="hero-stat-item"><strong>${formatCurrency(c.totalFees)}</strong><span>Total Fees</span></div>
          <div class="hero-stat-item"><strong>${formatCurrency(c.avgPackage)}</strong><span>Avg Package</span></div>
          <div class="hero-stat-item"><strong>${c.placementRate}%</strong><span>Placement Rate</span></div>
          <div class="hero-stat-item"><strong>${c.nextcampusScore}/10</strong><span>NC Score</span></div>
        </div>
      </div>
      <div class="detail-hero-score">
        <div class="score-circle">${c.nextcampusScore}<small>/10</small></div>
        <span>NextCampus Score</span>
      </div>
    </div>
  `;
}

function renderOverview() {
    const c = college;
    document.getElementById('tab-overview').innerHTML = `
    <div class="detail-card">
      <h3>About ${c.name}</h3>
      <p style="color:var(--text-secondary);line-height:1.8">${c.description || 'No description available.'}</p>
    </div>
    <div class="detail-card">
      <h3>Key Statistics</h3>
      <div class="stats-grid">
        <div class="stat-box"><div class="val">${formatCurrency(c.avgPackage)}</div><div class="lbl">Average Package</div></div>
        <div class="stat-box"><div class="val">${formatCurrency(c.highestPackage || 0)}</div><div class="lbl">Highest Package</div></div>
        <div class="stat-box"><div class="val">${c.placementRate}%</div><div class="lbl">Placement Rate</div></div>
        <div class="stat-box"><div class="val">#${c.ranking.nirf}</div><div class="lbl">NIRF Ranking</div></div>
        <div class="stat-box"><div class="val">${c.nextcampusScore}/10</div><div class="lbl">NC Score</div></div>
        <div class="stat-box"><div class="val">${formatCurrency(c.totalFees)}</div><div class="lbl">Total Fees</div></div>
      </div>
    </div>
  `;
}

function renderFees() {
    const c = college;
    const rows = (c.programs || []).map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td>${p.specialization || '-'}</td>
      <td>${p.duration || '-'}</td>
      <td>${p.fees ? formatCurrency(p.fees) + '/yr' : '-'}</td>
      <td>${p.seats || '-'}</td>
    </tr>
  `).join('');

    document.getElementById('tab-fees').innerHTML = `
    <div class="detail-card">
      <h3>Programs & Fee Structure</h3>
      <div style="overflow-x:auto">
        <table class="fee-table">
          <thead><tr><th>Program</th><th>Specialization</th><th>Duration</th><th>Fee/Year</th><th>Seats</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="5" style="text-align:center;color:var(--text-muted)">No program data available</td></tr>'}</tbody>
        </table>
      </div>
    </div>
    <div class="detail-card">
      <h3>Total Cost Estimate</h3>
      <div class="stats-grid" style="grid-template-columns:repeat(2,1fr)">
        <div class="stat-box"><div class="val">${formatCurrency(c.totalFees)}</div><div class="lbl">Total Program Cost</div></div>
        <div class="stat-box"><div class="val">${c.programs && c.programs[0] ? formatCurrency(c.programs[0].fees || 0) + '/yr' : 'N/A'}</div><div class="lbl">Annual Fee</div></div>
      </div>
    </div>
  `;
}

function renderPlacements() {
    const c = college;
    document.getElementById('tab-placements').innerHTML = `
    <div class="detail-card">
      <h3>Placement Statistics</h3>
      <div class="stats-grid">
        <div class="stat-box"><div class="val">${c.placementRate}%</div><div class="lbl">Placement Rate</div></div>
        <div class="stat-box"><div class="val">${formatCurrency(c.avgPackage)}</div><div class="lbl">Average Package</div></div>
        <div class="stat-box"><div class="val">${formatCurrency(c.highestPackage || 0)}</div><div class="lbl">Highest Package</div></div>
      </div>
      <div class="placement-bars">
        <div class="p-bar"><div class="p-bar-label">Placement %</div><div class="p-bar-track"><div class="p-bar-fill" style="width:${c.placementRate}%">${c.placementRate}%</div></div></div>
        <div class="p-bar"><div class="p-bar-label">ROI</div><div class="p-bar-track"><div class="p-bar-fill" style="width:${Math.min(((c.avgPackage / c.totalFees) * 100), 100).toFixed(0)}%">${((c.avgPackage / c.totalFees) * 100).toFixed(0)}%</div></div></div>
      </div>
    </div>
    <div class="detail-card">
      <h3>Top Recruiters</h3>
      <div class="recruiter-list">
        ${(c.recruiters || []).map(r => `<span class="recruiter-chip">${r}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderInfrastructure() {
    const c = college;
    const infra = c.infrastructure || {};
    document.getElementById('tab-infrastructure').innerHTML = `
    <div class="detail-card">
      <h3>Campus & Infrastructure</h3>
      <div class="infra-grid">
        <div class="infra-item"><div class="icon">&#127963;</div><strong>${infra.campus || 'N/A'}</strong>Campus Area</div>
        <div class="infra-item"><div class="icon">${infra.hostel ? '&#10003;' : '&#10007;'}</div><strong>Hostel</strong>${infra.hostel ? 'Available' : 'Not Available'}</div>
        <div class="infra-item"><div class="icon">&#128218;</div><strong>Library</strong>${infra.library ? 'Available' : 'Not Available'}</div>
        <div class="infra-item"><div class="icon">&#128300;</div><strong>${infra.labs || 0} Labs</strong>Research Labs</div>
        <div class="infra-item"><div class="icon">&#9917;</div><strong>Sports</strong>${infra.sportsFacilities ? 'Available' : 'Not Available'}</div>
        <div class="infra-item"><div class="icon">&#128246;</div><strong>WiFi</strong>${infra.wifi ? 'Campus-wide' : 'Not Available'}</div>
      </div>
    </div>
  `;
}

function renderReviews() {
    const html = reviews.length > 0 ? reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="review-author">${r.user?.name || 'Anonymous'}</span>
        <span class="review-rating">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</span>
      </div>
      <p>${r.comment}</p>
    </div>
  `).join('') : '<p class="text-muted">No reviews yet. Be the first to review!</p>';

    document.getElementById('tab-reviews').innerHTML = `<div class="detail-card"><h3>Student Reviews</h3>${html}</div>`;
}

function renderAdmission() {
    const c = college;
    document.getElementById('tab-admission').innerHTML = `
    <div class="detail-card">
      <h3>Admission Process</h3>
      <p style="color:var(--text-secondary);line-height:1.8;margin-bottom:20px">${c.admissionProcess || 'Contact the college for admission details.'}</p>
      <h4 style="font-size:0.95rem;margin-bottom:12px">Exams Accepted</h4>
      <div class="recruiter-list" style="margin-bottom:20px">
        ${(c.examAccepted || []).map(e => `<span class="recruiter-chip">${e}</span>`).join('')}
      </div>
      ${c.cutoff ? `
      <h4 style="font-size:0.95rem;margin-bottom:12px">Cutoff Ranks (Last Year)</h4>
      <div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
        <div class="stat-box"><div class="val">${formatNumber(c.cutoff.general)}</div><div class="lbl">General</div></div>
        <div class="stat-box"><div class="val">${formatNumber(c.cutoff.obc)}</div><div class="lbl">OBC</div></div>
        <div class="stat-box"><div class="val">${formatNumber(c.cutoff.sc)}</div><div class="lbl">SC</div></div>
        <div class="stat-box"><div class="val">${formatNumber(c.cutoff.st)}</div><div class="lbl">ST</div></div>
      </div>` : ''}
    </div>
  `;
}

function renderSidebar() {
    const c = college;
    document.getElementById('detail-sidebar').innerHTML = `
    <div class="detail-card">
      <div class="sidebar-actions">
        <button class="btn btn-primary" onclick="applyNow()">Apply Now &#8594;</button>
        <button class="btn btn-secondary" onclick="saveCollege('${c._id}')">&#9829; Save College</button>
        <button class="btn btn-secondary" onclick="addToCompare('${c._id}','${c.name.replace(/'/g, "\\'")}')">&#9878; Add to Compare</button>
        <a href="/budget-loan" class="btn btn-accent">&#128176; Check Loan Eligibility</a>
      </div>
    </div>
    <div class="detail-card">
      <h3>Highlights</h3>
      <ul class="sidebar-highlights">
        ${(c.highlights || []).map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>
    ${c.website ? `<div class="detail-card"><h3>Website</h3><a href="${c.website}" target="_blank">${c.website}</a></div>` : ''}
  `;
}

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
        });
    });
}

function applyNow() { alert('Application process will be available soon. Please check the college website for now.'); }

function addToCompare(id, name) {
    let list = JSON.parse(localStorage.getItem('nc_compare') || '[]');
    if (list.find(c => c.id === id)) { alert('Already in compare!'); return; }
    if (list.length >= 3) { alert('Max 3 colleges.'); return; }
    list.push({ id, name });
    localStorage.setItem('nc_compare', JSON.stringify(list));
    alert(`${name} added to comparison!`);
}

async function saveCollege(id) {
    const token = localStorage.getItem('nc_token');
    if (!token) { window.location.href = '/login'; return; }
    try {
        const res = await apiFetch('/dashboard/save-college', { method: 'POST', body: JSON.stringify({ collegeId: id }) });
        alert(res.message);
    } catch (e) { alert(e.message); }
}
