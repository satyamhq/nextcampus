/* Exams Page JS */
let allExams = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadExams();
  setupFilters();
});

async function loadExams() {
  try {
    const res = await apiFetch('/exams');
    allExams = res.data;
    renderExams(allExams);
  } catch (e) {
    document.getElementById('exams-grid').innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;padding:40px">Start backend to view exams.</p>';
  }
}

function renderExams(exams) {
  document.getElementById('exams-grid').innerHTML = exams.map(e => `
    <div class="exam-card" onclick="showExamDetail('${e.id}')">
      <div class="exam-card-header">
        <h3>${e.name}</h3>
        <span class="badge badge-primary category-badge">${e.category}</span>
      </div>
      <p class="full-name">${e.fullName}</p>
      <div class="exam-meta">
        <div class="exam-meta-item"><label>Conducted By</label><strong>${e.conductedBy}</strong></div>
        <div class="exam-meta-item"><label>Frequency</label><strong>${e.frequency}</strong></div>
        <div class="exam-meta-item"><label>Exam Mode</label><strong>${e.examMode}</strong></div>
        <div class="exam-meta-item"><label>Total Marks</label><strong>${e.totalMarks}</strong></div>
      </div>
      <div class="exam-subjects">
        ${e.subjects.map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
      </div>
      <div class="cutoff-chart">
        <h4>Cutoff Trends (General Category)</h4>
        <canvas id="chart-${e.id}" class="chart-canvas"></canvas>
      </div>
    </div>
  `).join('');

  // Draw mini cutoff charts
  exams.forEach(e => drawCutoffChart(e));
}

function drawCutoffChart(exam) {
  const canvas = document.getElementById(`chart-${exam.id}`);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = 200;

  const trends = exam.cutoffTrends;
  const values = trends.map(t => t.general);
  const maxVal = Math.max(...values) * 1.15;
  const minVal = Math.min(...values) * 0.85;

  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const chartW = canvas.width - padding.left - padding.right;
  const chartH = canvas.height - padding.top - padding.bottom;

  // Background
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim() || '#f9fafb';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(canvas.width - padding.right, y);
    ctx.stroke();
  }

  // Draw line
  ctx.beginPath();
  ctx.strokeStyle = '#0056D2';
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  trends.forEach((t, i) => {
    const x = padding.left + (chartW / (trends.length - 1)) * i;
    const y = padding.top + chartH - ((t.general - minVal) / (maxVal - minVal)) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Dots and labels
  ctx.fillStyle = '#0056D2';
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#6b7280';
  trends.forEach((t, i) => {
    const x = padding.left + (chartW / (trends.length - 1)) * i;
    const y = padding.top + chartH - ((t.general - minVal) / (maxVal - minVal)) * chartH;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Value
    ctx.fillStyle = '#0056D2';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(t.general, x, y - 12);

    // Year
    ctx.fillStyle = textColor;
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText(t.year, x, canvas.height - 10);

    ctx.fillStyle = '#0056D2';
  });
}

function showExamDetail(id) {
  const exam = allExams.find(e => e.id === id);
  if (!exam) return;

  const modal = document.getElementById('exam-modal');
  modal.style.display = 'block';
  modal.innerHTML = `
    <div class="exam-expanded">
      <h2>${exam.name} — ${exam.fullName}</h2>
      <p class="subtitle">${exam.conductedBy} | ${exam.frequency} | ${exam.examMode}</p>
      <div class="exam-detail-grid">
        <div class="exam-detail-box"><div class="val">${exam.totalMarks}</div><div class="lbl">Total Marks</div></div>
        <div class="exam-detail-box"><div class="val">${exam.duration}</div><div class="lbl">Duration</div></div>
        <div class="exam-detail-box"><div class="val">\u20B9${exam.registrationFee}</div><div class="lbl">Registration Fee</div></div>
        <div class="exam-detail-box"><div class="val">${exam.subjects.length}</div><div class="lbl">Subjects</div></div>
      </div>
      <h3 style="margin-bottom:12px">Eligibility</h3>
      <p style="color:var(--text-secondary);margin-bottom:24px">${exam.eligibility}</p>
      <h3 style="margin-bottom:12px">Important Dates</h3>
      <div class="exam-detail-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:24px">
        <div class="exam-detail-box"><div class="val">${exam.importantDates.registration}</div><div class="lbl">Registration</div></div>
        <div class="exam-detail-box"><div class="val">${exam.importantDates.examDate}</div><div class="lbl">Exam Date</div></div>
        <div class="exam-detail-box"><div class="val">${exam.importantDates.result}</div><div class="lbl">Result</div></div>
      </div>
      <h3 style="margin-bottom:12px">Top Colleges Accepting ${exam.name}</h3>
      <div class="top-colleges-list">
        ${exam.topColleges.map(c => `<span class="recruiter-chip">${c}</span>`).join('')}
      </div>
      <div style="margin-top:24px;text-align:center">
        <button class="btn btn-secondary" onclick="document.getElementById('exam-modal').style.display='none'">Close</button>
      </div>
    </div>
  `;
  modal.scrollIntoView({ behavior: 'smooth' });
}

function setupFilters() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat;
      renderExams(cat ? allExams.filter(e => e.category === cat) : allExams);
    });
  });
}
