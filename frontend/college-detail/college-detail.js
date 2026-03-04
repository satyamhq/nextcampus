/* College Detail Page — Template-driven JS
   Fetches college data by slug and renders all 7 tabs dynamically */

let college = null;
let collegeReviews = [];

document.addEventListener('DOMContentLoaded', async () => {
  const slug = getSlugFromURL();
  if (!slug) {
    showError('No college specified. Please go back to the <a href="' + pagePath('colleges') + '">colleges listing</a>.');
    return;
  }
  await loadCollege(slug);
  setupTabs();
  setupStickyHeader();
  setupMobileApplyBar();
});

// Extract slug from URL — supports /colleges/:slug (Express) and ?slug=xxx (static)
function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('slug')) return params.get('slug');
  if (params.get('id')) return params.get('id'); // backward compat
  // Try to extract from pathname: /colleges/lpu → lpu
  const path = window.location.pathname;
  const match = path.match(/\/colleges\/([^/]+)\/?$/);
  if (match) return match[1];
  // Old format: /college/:id
  const idMatch = path.match(/\/college\/([^/]+)\/?$/);
  if (idMatch) return idMatch[1];
  return null;
}

async function loadCollege(slug) {
  try {
    let res;
    // Try slug-based first, then ID-based as fallback
    try {
      res = await apiFetch(`/colleges/slug/${slug}`);
    } catch {
      res = await apiFetch(`/colleges/${slug}`);
    }
    college = res.data;
    collegeReviews = res.reviews || [];
    document.title = `${college.name} — NextCampus`;
    updateMeta();
    renderHero();
    renderOverview();
    renderCourses();
    renderAdmission();
    renderFees();
    renderPlacements();
    renderReviews();
    renderGallery();
    updateApplyLinks();
  } catch (e) {
    showError('College not found. Please check the URL or go back to the <a href="' + pagePath('colleges') + '">colleges listing</a>.');
  }
}

function showError(msg) {
  document.getElementById('hero-content').innerHTML = `<div class="cd-error"><h2>Oops!</h2><p>${msg}</p></div>`;
}

function updateMeta() {
  const c = college;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = `Explore ${c.name}, ${c.location.city} — courses, fees, placements, admission process, reviews. Apply now at NextCampus.`;
}

function updateApplyLinks() {
  const c = college;
  const url = c.website ? c.website + '/admissions/' : '#';
  const stickyApply = document.getElementById('cd-sticky-apply');
  const mobileApply = document.getElementById('cd-mobile-apply-link');
  if (stickyApply) stickyApply.href = url;
  if (mobileApply) mobileApply.href = url;
  document.getElementById('cd-sticky-name').textContent = c.name;
  document.getElementById('cd-sticky-loc').innerHTML = '&#128205; ' + c.location.city + ', ' + c.location.state;
}

// ==================== HERO ====================
function renderHero() {
  const c = college;
  const abbr = c.name.match(/\(([^)]+)\)/);
  const abbrText = abbr ? abbr[1] : c.name.split(' ').map(w => w[0]).join('').substring(0, 4);

  document.getElementById('hero-content').innerHTML = `
        <div class="cd-hero-info">
            <div class="cd-logo-placeholder">${abbrText}</div>
            <div>
                <h1>${c.name}</h1>
                <p class="cd-location">&#128205; ${c.location.city}, ${c.location.state}</p>
                <div class="cd-rating">
                    <span class="stars">${'&#9733;'.repeat(Math.round(c.nextcampusScore / 2))}${'&#9734;'.repeat(5 - Math.round(c.nextcampusScore / 2))}</span>
                    <strong>${(c.nextcampusScore / 2).toFixed(1)}</strong>/5
                </div>
                <div class="cd-meta">
                    <span>Est. <strong>${c.established || 'N/A'}</strong></span>
                    <span class="divider">|</span>
                    <span>Type: <strong>${c.type}</strong></span>
                    <span class="divider">|</span>
                    <span>Approved by: <strong>${c.accreditation || 'N/A'}</strong></span>
                </div>
                <div class="cd-badges">
                    ${c.ranking.nirf ? `<span class="badge-rank nirf">&#127942; NIRF #${c.ranking.nirf}</span>` : ''}
                    ${c.accreditation ? `<span class="badge-accr">${c.accreditation}</span>` : ''}
                </div>
                <div class="cd-ctas">
                    <a href="${c.website ? c.website + '/admissions/' : '#'}" target="_blank" class="btn-cd-apply">Apply Now &#8594;</a>
                    <a href="#" class="btn-cd-brochure" onclick="alert('Brochure download coming soon!');return false;">&#128196; Download Brochure</a>
                </div>
            </div>
        </div>
    `;
}

// ==================== OVERVIEW ====================
function renderOverview() {
  const c = college;
  const highlightsHTML = (c.highlights || []).length > 0 ? `
        <div class="cd-card">
            <h3>Key Highlights</h3>
            <div class="highlights-grid">
                ${c.highlights.map((h, i) => {
    const icons = ['&#127891;', '&#128218;', '&#127963;', '&#128188;', '&#127942;', '&#11088;'];
    return `<div class="highlight-item">
                        <div class="highlight-icon">${icons[i % icons.length]}</div>
                        <div class="highlight-val">${h}</div>
                    </div>`;
  }).join('')}
            </div>
        </div>` : '';

  const accredHTML = c.accreditation ? `
        <div class="cd-card">
            <h3>Accreditations & Approvals</h3>
            <div class="accreditation-list">
                ${c.accreditation.split(',').map(a => `<div class="accr-badge"><strong>${a.trim()}</strong></div>`).join('')}
                ${(c.examAccepted || []).length > 0 ? c.examAccepted.slice(0, 2).map(e => `<div class="accr-badge"><strong>${e}</strong><span>Accepted</span></div>`).join('') : ''}
            </div>
        </div>` : '';

  const rankingsHTML = c.ranking.nirf ? `
        <div class="cd-card">
            <h3>Rankings</h3>
            <table class="cd-table">
                <thead><tr><th>Ranking Body</th><th>Rank / Band</th></tr></thead>
                <tbody>
                    <tr><td>NIRF (Overall)</td><td>#${c.ranking.nirf}</td></tr>
                    <tr><td>NextCampus Score</td><td>${c.nextcampusScore}/10</td></tr>
                </tbody>
            </table>
        </div>` : '';

  document.getElementById('panel-overview').innerHTML = `
        <div class="cd-card">
            <h2>About ${c.name}</h2>
            <p>${c.description || 'No description available.'}</p>
        </div>
        ${highlightsHTML}
        ${accredHTML}
        ${rankingsHTML}
    `;
}

// ==================== COURSES & FEES ====================
function renderCourses() {
  const c = college;
  const rows = (c.programs || []).map(p => `
        <tr>
            <td><strong>${p.name}</strong></td>
            <td>${p.duration || '-'}</td>
            <td>${p.totalFees ? formatCurrency(p.totalFees) : (p.fees ? formatCurrency(p.fees) + '/yr' : '-')}</td>
            <td>${p.eligibility || '-'}</td>
            <td><a href="${c.website ? c.website + '/admissions/' : '#'}" target="_blank" class="apply-link">Apply &#8594;</a></td>
        </tr>
    `).join('');

  document.getElementById('panel-courses').innerHTML = `
        <div class="cd-card">
            <h2>Popular Courses & Fees</h2>
            <div class="table-scroll">
                <table class="cd-table courses-table">
                    <thead>
                        <tr><th>Course</th><th>Duration</th><th>Total Fees (Approx.)</th><th>Eligibility</th><th>Apply</th></tr>
                    </thead>
                    <tbody>${rows || '<tr><td colspan="5" class="text-center">No programs available</td></tr>'}</tbody>
                </table>
            </div>
        </div>
    `;
}

// ==================== ADMISSION ====================
function renderAdmission() {
  const c = college;
  const stepsHTML = (c.admissionSteps || []).length > 0
    ? `<div class="steps-list">${c.admissionSteps.map(s => `
            <div class="step-item">
                <div class="step-num">${s.step}</div>
                <div><h4>${s.title}</h4><p>${s.description}</p></div>
            </div>`).join('')}</div>`
    : `<p>${c.admissionProcess || 'Contact the college for admission details.'}</p>`;

  const datesHTML = (c.importantDates || []).length > 0 ? `
        <div class="cd-card">
            <h3>Important Dates</h3>
            <table class="cd-table">
                <thead><tr><th>Event</th><th>Date</th></tr></thead>
                <tbody>${c.importantDates.map(d => `<tr><td>${d.event}</td><td>${d.date}</td></tr>`).join('')}</tbody>
            </table>
        </div>` : '';

  const eligHTML = (c.eligibility || []).length > 0 ? `
        <div class="cd-card">
            <h3>Eligibility Criteria</h3>
            <ul class="eligibility-list">${c.eligibility.map(e => `<li>${e}</li>`).join('')}</ul>
            <div style="margin-top:24px">
                <a href="${c.website ? c.website + '/admissions/' : '#'}" target="_blank" class="btn-cd-apply">Start Application &#8594;</a>
            </div>
        </div>` : '';

  document.getElementById('panel-admission').innerHTML = `
        <div class="cd-card">
            <h2>Admission Process</h2>
            ${stepsHTML}
        </div>
        ${datesHTML}
        ${eligHTML}
    `;
}

// ==================== FEES & SCHOLARSHIPS ====================
function renderFees() {
  const c = college;
  const feeRows = (c.programs || []).map(p => `
        <tr>
            <td>${p.name} (${p.duration || 'N/A'})</td>
            <td>${p.fees ? formatCurrency(p.fees) : '-'}</td>
            <td>${p.totalFees ? formatCurrency(p.totalFees) : '-'}</td>
        </tr>
    `).join('');

  const scholarHTML = (c.scholarships || []).length > 0 ? `
        <div class="cd-card">
            <h3>Scholarships</h3>
            <div class="scholarship-grid">
                ${c.scholarships.map((s, i) => {
    const icons = ['&#127942;', '&#9917;', '&#127760;'];
    return `<div class="scholarship-item">
                        <div class="scholarship-icon">${icons[i % icons.length]}</div>
                        <h4>${s.name}</h4>
                        <p>${s.description}</p>
                        <span class="scholarship-range">Range: ${s.range}</span>
                    </div>`;
  }).join('')}
            </div>
        </div>` : '';

  document.getElementById('panel-fees').innerHTML = `
        <div class="cd-card">
            <h2>Fee Structure</h2>
            <div class="table-scroll">
                <table class="cd-table">
                    <thead><tr><th>Course</th><th>Annual Fee (Approx.)</th><th>Total Fee (Approx.)</th></tr></thead>
                    <tbody>${feeRows || '<tr><td colspan="3" class="text-center">No data</td></tr>'}</tbody>
                </table>
            </div>
        </div>
        ${scholarHTML}
    `;
}

// ==================== PLACEMENTS ====================
function renderPlacements() {
  const c = college;
  const trendsHTML = (c.placementTrends || []).length > 0 ? `
        <div class="cd-card">
            <h3>Placement Trend (By Year)</h3>
            <div class="bar-chart">
                ${c.placementTrends.map(t => `
                    <div class="bar-row">
                        <span class="bar-label">${t.year}</span>
                        <div class="bar-track"><div class="bar-fill" style="width:${t.rate}%"><span>${t.rate}%</span></div></div>
                    </div>`).join('')}
            </div>
        </div>` : '';

  document.getElementById('panel-placements').innerHTML = `
        <div class="cd-card">
            <h2>Placement Highlights</h2>
            <div class="placement-stats">
                <div class="p-stat-card"><div class="p-stat-val">${formatCurrency(c.highestPackage || 0)}</div><div class="p-stat-lbl">Highest Package</div></div>
                <div class="p-stat-card"><div class="p-stat-val">${formatCurrency(c.avgPackage)}</div><div class="p-stat-lbl">Average Package</div></div>
                <div class="p-stat-card"><div class="p-stat-val">${(c.recruiters || []).length}+</div><div class="p-stat-lbl">Recruiters</div></div>
                <div class="p-stat-card"><div class="p-stat-val">${c.placementRate}%</div><div class="p-stat-lbl">Placement Rate</div></div>
            </div>
        </div>
        <div class="cd-card">
            <h3>Top Recruiters</h3>
            <div class="recruiter-chips">
                ${(c.recruiters || []).map(r => `<span class="r-chip">${r}</span>`).join('')}
            </div>
        </div>
        ${trendsHTML}
    `;
}

// ==================== REVIEWS ====================
function renderReviews() {
  const c = college;
  const allReviews = [...(c.staticReviews || [])];
  // Add API reviews if available
  collegeReviews.forEach(r => {
    allReviews.push({ name: r.user?.name || 'Anonymous', course: '', rating: r.rating, comment: r.comment });
  });

  const avgRating = allReviews.length > 0 ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1) : '0';
  const ratingCounts = [0, 0, 0, 0, 0];
  allReviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating - 1]++; });
  const total = allReviews.length || 1;

  const reviewCardsHTML = allReviews.length > 0 ? allReviews.map(r => `
        <div class="review-item">
            <div class="review-top">
                <strong>${r.name}</strong>
                ${r.course ? `<span class="review-course">${r.course}</span>` : ''}
                <span class="rev-stars">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</span>
            </div>
            <p>"${r.comment}"</p>
        </div>`).join('')
    : '<p class="text-muted">No reviews yet. Be the first to review!</p>';

  document.getElementById('panel-reviews').innerHTML = `
        <div class="cd-card">
            <h2>Student Reviews</h2>
            <div class="rating-overview">
                <div class="rating-big">
                    <div class="rating-num">${avgRating}</div>
                    <div class="rating-stars">${'&#9733;'.repeat(Math.round(avgRating))}${'&#9734;'.repeat(5 - Math.round(avgRating))}</div>
                    <div class="rating-total">${allReviews.length} reviews</div>
                </div>
                <div class="rating-bars">
                    ${[5, 4, 3, 2, 1].map(star => `
                        <div class="rb-row"><span>${star} &#9733;</span>
                            <div class="rb-track"><div class="rb-fill" style="width:${(ratingCounts[star - 1] / total * 100).toFixed(0)}%"></div></div>
                            <span>${(ratingCounts[star - 1] / total * 100).toFixed(0)}%</span>
                        </div>`).join('')}
                </div>
            </div>
        </div>
        <div class="cd-card">${reviewCardsHTML}</div>
    `;
}

// ==================== GALLERY ====================
function renderGallery() {
  const c = college;
  const labels = c.galleryLabels || ['Campus', 'Library', 'Labs', 'Hostel', 'Sports', 'Auditorium'];
  const icons = ['&#127963;', '&#128218;', '&#128300;', '&#127968;', '&#9917;', '&#127916;'];

  document.getElementById('panel-gallery').innerHTML = `
        <div class="cd-card">
            <h2>Campus Gallery</h2>
            <div class="gallery-grid">
                ${labels.map((label, i) => `
                    <div class="gallery-item">
                        <div class="gallery-placeholder">${icons[i % icons.length]}</div>
                        <span>${label}</span>
                    </div>`).join('')}
            </div>
        </div>
    `;
}

// ==================== TABS ====================
function setupTabs() {
  document.querySelectorAll('.cd-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cd-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.cd-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`panel-${btn.dataset.tab}`).classList.add('active');
    });
  });
}

// ==================== STICKY HEADER ====================
function setupStickyHeader() {
  const hero = document.getElementById('cd-hero');
  const stickyHeader = document.getElementById('cd-sticky-header');
  window.addEventListener('scroll', () => {
    if (!hero) return;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    stickyHeader.classList.toggle('visible', window.scrollY > heroBottom);
  });
}

// ==================== MOBILE APPLY BAR ====================
function setupMobileApplyBar() {
  const bar = document.getElementById('cd-mobile-apply');
  window.addEventListener('scroll', () => {
    bar.classList.toggle('visible', window.scrollY > 400);
  });
}

// ==================== HELPERS ====================
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
  if (!token) { window.location.href = pagePath('login'); return; }
  try {
    const res = await apiFetch('/dashboard/save-college', { method: 'POST', body: JSON.stringify({ collegeId: id }) });
    alert(res.message);
  } catch (e) { alert(e.message); }
}
