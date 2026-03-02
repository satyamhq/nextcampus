/* Programs Page JS */
const programIcons = {
    'Engineering': '&#9881;', 'Medical': '&#9829;', 'MBA': '&#128200;',
    'Law': '&#9878;', 'Design': '&#127912;', 'Arts & Science': '&#128218;',
    'Commerce': '&#128176;', 'Online Degrees': '&#128187;', 'Study Abroad': '&#127758;'
};

let allPrograms = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadPrograms();
    setupFilters();
});

async function loadPrograms() {
    try {
        const res = await apiFetch('/programs');
        allPrograms = res.data;
        renderPrograms(allPrograms);
    } catch (e) {
        document.getElementById('programs-list').innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;padding:40px">Start the backend server to view programs.</p>';
    }
}

function renderPrograms(programs) {
    document.getElementById('programs-list').innerHTML = programs.map(p => `
    <div class="program-detail-card fade-in visible">
      <div class="pdc-icon">${programIcons[p.category] || '&#128218;'}</div>
      <div class="pdc-category">${p.category}</div>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="pdc-meta">
        <div class="pdc-meta-item"><label>Avg Fees</label><strong>${formatCurrency(p.avgFees)}</strong></div>
        <div class="pdc-meta-item"><label>Duration</label><strong>${p.duration}</strong></div>
        <div class="pdc-meta-item"><label>Avg Salary</label><strong>${formatCurrency(p.avgSalary)}</strong></div>
        <div class="pdc-meta-item"><label>Colleges</label><strong>${p.totalColleges.toLocaleString()}+</strong></div>
      </div>
      <div class="pdc-specs">
        ${p.specializations.slice(0, 4).map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
        ${p.specializations.length > 4 ? `<span class="badge badge-primary">+${p.specializations.length - 4} more</span>` : ''}
      </div>
      <a href="/colleges?program=${encodeURIComponent(p.category)}" class="btn btn-primary btn-sm">Explore Colleges &#8594;</a>
    </div>
  `).join('');
}

function setupFilters() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const cat = chip.dataset.category;
            const filtered = cat ? allPrograms.filter(p => p.category === cat) : allPrograms;
            renderPrograms(filtered);
        });
    });
}
