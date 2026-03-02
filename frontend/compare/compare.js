/* Compare Page JS */
let allColleges = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllColleges();
    prefillFromStorage();
    document.getElementById('compare-btn').addEventListener('click', compareColleges);
});

async function loadAllColleges() {
    try {
        const res = await apiFetch('/colleges?limit=100');
        allColleges = res.data;
        document.querySelectorAll('.compare-select').forEach(sel => {
            allColleges.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c._id;
                opt.textContent = `${c.name} (${c.location.city})`;
                sel.appendChild(opt);
            });
        });
    } catch (e) {
        console.log('Backend not available');
    }
}

function prefillFromStorage() {
    const saved = JSON.parse(localStorage.getItem('nc_compare') || '[]');
    saved.forEach((item, i) => {
        const sel = document.querySelector(`.compare-select[data-slot="${i}"]`);
        if (sel && item.id) sel.value = item.id;
    });
}

function removeSlot(index) {
    const sel = document.querySelector(`.compare-select[data-slot="${index}"]`);
    sel.value = '';
    const saved = JSON.parse(localStorage.getItem('nc_compare') || '[]');
    saved.splice(index, 1);
    localStorage.setItem('nc_compare', JSON.stringify(saved));
}

async function compareColleges() {
    const ids = [];
    document.querySelectorAll('.compare-select').forEach(sel => { if (sel.value) ids.push(sel.value); });
    if (ids.length < 2) { alert('Please select at least 2 colleges to compare.'); return; }

    try {
        const res = await apiFetch(`/colleges/compare?ids=${ids.join(',')}`);
        renderComparison(res.data);
    } catch (e) { alert(e.message); }
}

function renderComparison(colleges) {
    const container = document.getElementById('compare-result');
    container.style.display = 'block';

    const headers = colleges.map(c => `<th><span class="college-name">${c.name}</span><br><small style="color:var(--text-muted)">${c.location.city}, ${c.location.state}</small></th>`).join('');

    const rows = [
        { label: 'Type', values: colleges.map(c => c.type) },
        { label: 'NIRF Ranking', values: colleges.map(c => `#${c.ranking.nirf}`), best: 'low-num' },
        { label: 'NC Score', values: colleges.map(c => `${c.nextcampusScore}/10`), best: 'high-num' },
        { label: 'Total Fees', values: colleges.map(c => formatCurrency(c.totalFees)), rawValues: colleges.map(c => c.totalFees), best: 'low' },
        { label: 'Avg Package', values: colleges.map(c => formatCurrency(c.avgPackage)), rawValues: colleges.map(c => c.avgPackage), best: 'high' },
        { label: 'Highest Package', values: colleges.map(c => formatCurrency(c.highestPackage || 0)), rawValues: colleges.map(c => c.highestPackage || 0), best: 'high' },
        { label: 'Placement Rate', values: colleges.map(c => `${c.placementRate}%`), rawValues: colleges.map(c => c.placementRate), best: 'high' },
        { label: 'ROI', values: colleges.map(c => `${((c.avgPackage / c.totalFees) * 100).toFixed(0)}%`), rawValues: colleges.map(c => c.avgPackage / c.totalFees), best: 'high' },
        { label: 'Accreditation', values: colleges.map(c => c.accreditation || 'N/A') },
        { label: 'Established', values: colleges.map(c => c.established || 'N/A') },
        { label: 'Exam Accepted', values: colleges.map(c => (c.examAccepted || []).join(', ') || 'N/A') },
        { label: 'Loan EMI (7yr @8.5%)', values: colleges.map(c => { const P = c.totalFees; const R = 8.5 / 12 / 100; const N = 84; const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1); return formatCurrency(Math.round(emi)) + '/mo'; }) }
    ];

    const rowsHTML = rows.map(row => {
        let bestIdx = -1;
        if (row.best && row.rawValues) {
            if (row.best === 'high') bestIdx = row.rawValues.indexOf(Math.max(...row.rawValues));
            else if (row.best === 'low') bestIdx = row.rawValues.indexOf(Math.min(...row.rawValues));
        }
        const cells = row.values.map((v, i) => `<td class="${i === bestIdx ? 'best-value' : ''}">${v}</td>`).join('');
        return `<tr><td>${row.label}</td>${cells}</tr>`;
    }).join('');

    document.getElementById('compare-table').innerHTML = `
    <thead><tr><th>Criteria</th>${headers}</tr></thead>
    <tbody>${rowsHTML}</tbody>
  `;

    container.scrollIntoView({ behavior: 'smooth' });
}
