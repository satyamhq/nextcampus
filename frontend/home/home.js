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
    grid.innerHTML = getStaticCollegeCards();
  }
}

function getStaticCollegeCards() {
  const colleges = [
    {
      name: 'Nagaland University',
      city: 'Lumami', state: 'Nagaland', type: 'Central',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/nagaland/nagaland-university/nagaland-university.html',
      rating: '4.5', accr: 'Central'
    },
    {
      name: 'ICFAI University Nagaland',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/icfai-university-nagaland/icfai-university-nagaland.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'St Joseph University Nagaland',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/st-joseph-university-nagaland/st-joseph-university-nagaland.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'The Global Open University Nagaland',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/the-global-open-university-nagaland/the-global-open-university-nagaland.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Kohima Science College',
      city: 'Kohima', state: 'Nagaland', type: 'Government Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/kohima-science-college/kohima-science-college.html',
      rating: '4.5', accr: 'Government Autonomous'
    },
    {
      name: 'Dimapur Government College',
      city: 'Dimapur', state: 'Nagaland', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/dimapur-government-college/dimapur-government-college.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Zunheboto Government College',
      city: 'Zunheboto', state: 'Nagaland', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/zunheboto-government-college/zunheboto-government-college.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Mokokchung College',
      city: 'Mokokchung', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/mokokchung-college/mokokchung-college.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Tuensang Government College',
      city: 'Tuensang', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/tuensang-government-college/tuensang-government-college.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Wokha Government College',
      city: 'Wokha', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/wokha-government-college/wokha-government-college.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'St Joseph College Jakhama',
      city: 'Kohima', state: 'Nagaland', type: 'Private Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/st-joseph-college-jakhama/st-joseph-college-jakhama.html',
      rating: '4.5', accr: 'Private Autonomous'
    },
    {
      name: 'Patkai Christian College',
      city: 'Dimapur', state: 'Nagaland', type: 'Private Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/patkai-christian-college/patkai-christian-college.html',
      rating: '4.5', accr: 'Private Autonomous'
    },
    {
      name: 'North East Christian University',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/north-east-christian-university/north-east-christian-university.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Mount Mary College Chumukedima',
      city: 'Chumukedima', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/mount-mary-college-chumukedima/mount-mary-college-chumukedima.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Modern College Piphema',
      city: 'Piphema', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/modern-college-piphema/modern-college-piphema.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Fazl Ali College Mokokchung',
      city: 'Mokokchung', state: 'Nagaland', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/fazl-ali-college-mokokchung/fazl-ali-college-mokokchung.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Yingli College Longleng',
      city: 'Longleng', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/yingli-college-longleng/yingli-college-longleng.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Sao Chang College Tuensang',
      city: 'Tuensang', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/sao-chang-college-tuensang/sao-chang-college-tuensang.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Baptist College Kohima',
      city: 'Kohima', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/baptist-college-kohima/baptist-college-kohima.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Khelhoshe Polytechnic Atoizu',
      city: 'Zunheboto', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/khelhoshe-polytechnic-atoizu/khelhoshe-polytechnic-atoizu.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Kohima',
      city: 'Kohima', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/government-polytechnic-kohima/government-polytechnic-kohima.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Sedem',
      city: 'Tuensang', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/government-polytechnic-sedem/government-polytechnic-sedem.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Longleng',
      city: 'Longleng', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/government-polytechnic-longleng/government-polytechnic-longleng.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Peren',
      city: 'Peren', state: 'Nagaland', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/government-polytechnic-peren/government-polytechnic-peren.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'City College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/city-college-dimapur/city-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Eastern Christian College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/eastern-christian-college-dimapur/eastern-christian-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Model Christian College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/model-christian-college-dimapur/model-christian-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Unity College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/unity-college-dimapur/unity-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Great Commission College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/great-commission-college-dimapur/great-commission-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Cornerstone College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/cornerstone-college-dimapur/cornerstone-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Jubilee Memorial College Mokokchung',
      city: 'Mokokchung', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/jubilee-memorial-college-mokokchung/jubilee-memorial-college-mokokchung.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Alder College Kohima',
      city: 'Kohima', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/alder-college-kohima/alder-college-kohima.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Tetso College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/tetso-college-dimapur/tetso-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Capital College Kohima',
      city: 'Kohima', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/capital-college-kohima/capital-college-kohima.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Don Bosco College Kohima',
      city: 'Kohima', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/don-bosco-college-kohima/don-bosco-college-kohima.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Salt Christian College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/salt-christian-college-dimapur/salt-christian-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Faith Theological College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/faith-theological-college-dimapur/faith-theological-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Oriental College Kohima',
      city: 'Kohima', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/oriental-college-kohima/oriental-college-kohima.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'St John College Dimapur',
      city: 'Dimapur', state: 'Nagaland', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 62, nirf: 0,
      link: '../colleges/nagaland/st-john-college-dimapur/st-john-college-dimapur.html',
      rating: '4.0', accr: 'Private'
    },

    {
      name: 'North Eastern Hill University',
      city: 'Shillong', state: 'Meghalaya', type: 'Central',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/meghalaya/north-eastern-hill-university/north-eastern-hill-university.html',
      rating: '4.6', accr: 'Central'
    },
    {
      name: 'Indian Institute of Management Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Government',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/meghalaya/indian-institute-of-management-shillong/indian-institute-of-management-shillong.html',
      rating: '4.6', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Meghalaya',
      city: 'Shillong', state: 'Meghalaya', type: 'Government',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/meghalaya/national-institute-of-technology-meghalaya/national-institute-of-technology-meghalaya.html',
      rating: '4.6', accr: 'Government'
    },
    {
      name: 'University of Science and Technology Meghalaya',
      city: 'Ri Bhoi', state: 'Meghalaya', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/meghalaya/university-of-science-and-technology-meghalaya/university-of-science-and-technology-meghalaya.html',
      rating: '4.6', accr: 'Private'
    },
    {
      name: 'Martin Luther Christian University',
      city: 'Shillong', state: 'Meghalaya', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/martin-luther-christian-university/martin-luther-christian-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'CMJ University',
      city: 'Ri Bhoi', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/cmj-university/cmj-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'William Carey University Meghalaya',
      city: 'Shillong', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/william-carey-university-meghalaya/william-carey-university-meghalaya.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'St Edmund\'s College Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Government Aided',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/meghalaya/st-edmunds-college-shillong/st-edmunds-college-shillong.html',
      rating: '4.6', accr: 'Government Aided'
    },
    {
      name: 'St Anthony\'s College Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Government Aided',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/meghalaya/st-anthonys-college-shillong/st-anthonys-college-shillong.html',
      rating: '4.6', accr: 'Government Aided'
    },
    {
      name: 'Shillong College',
      city: 'Shillong', state: 'Meghalaya', type: 'Government Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/shillong-college/shillong-college.html',
      rating: '4.1', accr: 'Government Aided'
    },
    {
      name: 'Tura Government College',
      city: 'Tura', state: 'Meghalaya', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/tura-government-college/tura-government-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Kiang Nangbah Government College',
      city: 'Jowai', state: 'Meghalaya', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/kiang-nangbah-government-college/kiang-nangbah-government-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Ri Bhoi College Nongpoh',
      city: 'Nongpoh', state: 'Meghalaya', type: 'Government Aided',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/ri-bhoi-college-nongpoh/ri-bhoi-college-nongpoh.html',
      rating: '4.1', accr: 'Government Aided'
    },
    {
      name: 'Seng Khasi College Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Government Aided',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/seng-khasi-college-shillong/seng-khasi-college-shillong.html',
      rating: '4.1', accr: 'Government Aided'
    },
    {
      name: 'Don Bosco College Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/don-bosco-college-shillong/don-bosco-college-shillong.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Don Bosco College Tura',
      city: 'Tura', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/don-bosco-college-tura/don-bosco-college-tura.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Lady Keane College Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Private (Women)',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/lady-keane-college-shillong/lady-keane-college-shillong.html',
      rating: '4.1', accr: 'Private (Women)'
    },
    {
      name: 'Synod College Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/synod-college-shillong/synod-college-shillong.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Union Christian College Meghalaya',
      city: 'Umiam', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/union-christian-college-meghalaya/union-christian-college-meghalaya.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Capt Williamson Sangma College',
      city: 'Baghmara', state: 'Meghalaya', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/capt-williamson-sangma-college/capt-williamson-sangma-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Nongstoin College',
      city: 'Nongstoin', state: 'Meghalaya', type: 'Government Aided',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/nongstoin-college/nongstoin-college.html',
      rating: '4.1', accr: 'Government Aided'
    },
    {
      name: 'Baghmara College',
      city: 'Baghmara', state: 'Meghalaya', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/baghmara-college/baghmara-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Mendipathar College',
      city: 'Mendipathar', state: 'Meghalaya', type: 'Government Aided',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/mendipathar-college/mendipathar-college.html',
      rating: '4.1', accr: 'Government Aided'
    },
    {
      name: 'Ampati College',
      city: 'Ampati', state: 'Meghalaya', type: 'Government Aided',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/ampati-college/ampati-college.html',
      rating: '4.1', accr: 'Government Aided'
    },
    {
      name: 'Williamnagar College',
      city: 'Williamnagar', state: 'Meghalaya', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/williamnagar-college/williamnagar-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Tirot Sing Memorial College',
      city: 'Mairang', state: 'Meghalaya', type: 'Government Aided',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/tirot-sing-memorial-college/tirot-sing-memorial-college.html',
      rating: '4.1', accr: 'Government Aided'
    },
    {
      name: 'Shangpung College',
      city: 'Shangpung', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/shangpung-college/shangpung-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Umsning College',
      city: 'Umsning', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/umsning-college/umsning-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Mawlai Presbyterian College',
      city: 'Shillong', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/mawlai-presbyterian-college/mawlai-presbyterian-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'North East Adventist College',
      city: 'Jowai', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/north-east-adventist-college/north-east-adventist-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Bosco College of Teacher Education',
      city: 'Dimapur', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/bosco-college-of-teacher-education/bosco-college-of-teacher-education.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'St Mary\'s College Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Private (Women)',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/st-marys-college-shillong/st-marys-college-shillong.html',
      rating: '4.1', accr: 'Private (Women)'
    },
    {
      name: 'KJP Synod Mihngi College',
      city: 'Jowai', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/kjp-synod-mihngi-college/kjp-synod-mihngi-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Pine Mount College Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/pine-mount-college-shillong/pine-mount-college-shillong.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'College of Community Science Meghalaya',
      city: 'Tura', state: 'Meghalaya', type: 'Central',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/college-of-community-science-meghalaya/college-of-community-science-meghalaya.html',
      rating: '4.1', accr: 'Central'
    },
    {
      name: 'Government Polytechnic Shillong',
      city: 'Shillong', state: 'Meghalaya', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/government-polytechnic-shillong/government-polytechnic-shillong.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Tura',
      city: 'Tura', state: 'Meghalaya', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/government-polytechnic-tura/government-polytechnic-tura.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Meghalaya Institute of Entrepreneurship',
      city: 'Shillong', state: 'Meghalaya', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/meghalaya-institute-of-entrepreneurship/meghalaya-institute-of-entrepreneurship.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Meghalaya Institute of Hotel Management',
      city: 'Shillong', state: 'Meghalaya', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 65, nirf: 0,
      link: '../colleges/meghalaya/meghalaya-institute-of-hotel-management/meghalaya-institute-of-hotel-management.html',
      rating: '4.1', accr: 'Private'
    },

    {
      name: 'University of Ladakh',
      city: 'Leh/Kargil', state: 'Ladakh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/ladakh/university-of-ladakh/university-of-ladakh.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Government Degree College Leh',
      city: 'Leh', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-leh/government-degree-college-leh.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Degree College Kargil',
      city: 'Kargil', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-kargil/government-degree-college-kargil.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Degree College Nubra',
      city: 'Nubra', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-nubra/government-degree-college-nubra.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Degree College Drass',
      city: 'Drass', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-drass/government-degree-college-drass.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Degree College Zanskar',
      city: 'Zanskar', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-zanskar/government-degree-college-zanskar.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Eliezer Joldan Memorial College of Engineering and Technology',
      city: 'Leh', state: 'Ladakh', type: 'Government',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/eliezer-joldan-memorial-college-of-engineering-and-technology/eliezer-joldan-memorial-college-of-engineering-and-technology.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Institute of Hotel Management Leh',
      city: 'Leh', state: 'Ladakh', type: 'Government',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/institute-of-hotel-management-leh/institute-of-hotel-management-leh.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Central Institute of Buddhist Studies',
      city: 'Leh', state: 'Ladakh', type: 'Deemed',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/ladakh/central-institute-of-buddhist-studies/central-institute-of-buddhist-studies.html',
      rating: '4.0', accr: 'Deemed'
    },

    {
      name: 'Government Degree College Leh',
      city: 'Leh', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-leh/government-degree-college-leh.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Degree College Kargil',
      city: 'Kargil', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-kargil/government-degree-college-kargil.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Degree College Nubra',
      city: 'Nubra', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-nubra/government-degree-college-nubra.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Degree College Drass',
      city: 'Drass', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-drass/government-degree-college-drass.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Degree College Zanskar',
      city: 'Zanskar', state: 'Ladakh', type: 'Government',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/government-degree-college-zanskar/government-degree-college-zanskar.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Eliezer Joldan Memorial College of Engineering and Technology',
      city: 'Leh', state: 'Ladakh', type: 'Government',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/eliezer-joldan-memorial-college-of-engineering-and-technology/eliezer-joldan-memorial-college-of-engineering-and-technology.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Institute of Hotel Management Leh',
      city: 'Leh', state: 'Ladakh', type: 'Government',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 60, nirf: 0,
      link: '../colleges/ladakh/institute-of-hotel-management-leh/institute-of-hotel-management-leh.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Central Institute of Buddhist Studies',
      city: 'Leh', state: 'Ladakh', type: 'Deemed',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/ladakh/central-institute-of-buddhist-studies/central-institute-of-buddhist-studies.html',
      rating: '4.0', accr: 'Deemed'
    },

    {
      name: 'Manipur University',
      city: 'Imphal', state: 'Manipur', type: 'Central',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/manipur/manipur-university/manipur-university.html',
      rating: '4.6', accr: 'Central'
    },
    {
      name: 'National Institute of Technology Manipur',
      city: 'Imphal', state: 'Manipur', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/manipur/national-institute-of-technology-manipur/national-institute-of-technology-manipur.html',
      rating: '4.6', accr: 'Government'
    },
    {
      name: 'Indian Institute of Information Technology Manipur',
      city: 'Imphal', state: 'Manipur', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/indian-institute-of-information-technology-manipur/indian-institute-of-information-technology-manipur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'National Sports University',
      city: 'Imphal', state: 'Manipur', type: 'Central',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/manipur/national-sports-university/national-sports-university.html',
      rating: '4.6', accr: 'Central'
    },
    {
      name: 'Central Agricultural University',
      city: 'Imphal', state: 'Manipur', type: 'Central',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/central-agricultural-university/central-agricultural-university.html',
      rating: '4.1', accr: 'Central'
    },
    {
      name: 'Regional Institute of Medical Sciences',
      city: 'Imphal', state: 'Manipur', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/manipur/regional-institute-of-medical-sciences/regional-institute-of-medical-sciences.html',
      rating: '4.6', accr: 'Government'
    },
    {
      name: 'Jawaharlal Nehru Institute of Medical Sciences',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/jawaharlal-nehru-institute-of-medical-sciences/jawaharlal-nehru-institute-of-medical-sciences.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Manipur Institute of Technology',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/manipur-institute-of-technology/manipur-institute-of-technology.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dhanamanjuri University',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/dhanamanjuri-university/dhanamanjuri-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dhanamanjuri College of Arts',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/dhanamanjuri-college-of-arts/dhanamanjuri-college-of-arts.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dhanamanjuri College of Science',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/dhanamanjuri-college-of-science/dhanamanjuri-college-of-science.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dhanamanjuri College of Commerce',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/dhanamanjuri-college-of-commerce/dhanamanjuri-college-of-commerce.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Imphal College',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/imphal-college/imphal-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Oriental College Imphal',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/oriental-college-imphal/oriental-college-imphal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Moreh College',
      city: 'Moreh', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/moreh-college/moreh-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Churachandpur College',
      city: 'Churachandpur', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/churachandpur-college/churachandpur-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'United College Lambung',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/united-college-lambung/united-college-lambung.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Pettigrew College Ukhrul',
      city: 'Ukhrul', state: 'Manipur', type: 'Private Aided',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/pettigrew-college-ukhrul/pettigrew-college-ukhrul.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Presidency College Motbung',
      city: 'Motbung', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/presidency-college-motbung/presidency-college-motbung.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Tamenglong College',
      city: 'Tamenglong', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/tamenglong-college/tamenglong-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Kha Manipur College Kakching',
      city: 'Kakching', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/kha-manipur-college-kakching/kha-manipur-college-kakching.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Standard College Kongba',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/standard-college-kongba/standard-college-kongba.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Liberal College Luwangsangbam',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/liberal-college-luwangsangbam/liberal-college-luwangsangbam.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Hill College Tadubi',
      city: 'Senapati', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/hill-college-tadubi/hill-college-tadubi.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'S Kula Women\'s College',
      city: 'Imphal', state: 'Manipur', type: 'State (Women)',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/s-kula-womens-college/s-kula-womens-college.html',
      rating: '4.1', accr: 'State (Women)'
    },
    {
      name: 'Manipur College',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/manipur-college/manipur-college.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Ideal Girls College Akampat',
      city: 'Imphal', state: 'Manipur', type: 'Private (Women)',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/ideal-girls-college-akampat/ideal-girls-college-akampat.html',
      rating: '4.1', accr: 'Private (Women)'
    },
    {
      name: 'Waikhom Mani Girls College',
      city: 'Thoubal', state: 'Manipur', type: 'Private (Women)',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/waikhom-mani-girls-college/waikhom-mani-girls-college.html',
      rating: '4.1', accr: 'Private (Women)'
    },
    {
      name: 'Heirok Higher Secondary College',
      city: 'Thoubal', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/heirok-higher-secondary-college/heirok-higher-secondary-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Modern College Imphal',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/modern-college-imphal/modern-college-imphal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Manipur Institute of Management Studies',
      city: 'Imphal', state: 'Manipur', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/manipur-institute-of-management-studies/manipur-institute-of-management-studies.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Sangeet Natak Academy Imphal',
      city: 'Imphal', state: 'Manipur', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/sangeet-natak-academy-imphal/sangeet-natak-academy-imphal.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Imphal',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-imphal/government-polytechnic-imphal.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Polytechnic Chandel',
      city: 'Chandel', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-chandel/government-polytechnic-chandel.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Polytechnic Senapati',
      city: 'Senapati', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-senapati/government-polytechnic-senapati.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Polytechnic Ukhrul',
      city: 'Ukhrul', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-ukhrul/government-polytechnic-ukhrul.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Polytechnic Tamenglong',
      city: 'Tamenglong', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-tamenglong/government-polytechnic-tamenglong.html',
      rating: '4.1', accr: 'State'
    },

    {
      name: 'Manipur University',
      city: 'Imphal', state: 'Manipur', type: 'Central',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/manipur/manipur-university/manipur-university.html',
      rating: '4.6', accr: 'Central'
    },
    {
      name: 'National Institute of Technology Manipur',
      city: 'Imphal', state: 'Manipur', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/manipur/national-institute-of-technology-manipur/national-institute-of-technology-manipur.html',
      rating: '4.6', accr: 'Government'
    },
    {
      name: 'National Sports University',
      city: 'Imphal', state: 'Manipur', type: 'Central',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/manipur/national-sports-university/national-sports-university.html',
      rating: '4.6', accr: 'Central'
    },
    {
      name: 'Central Agricultural University',
      city: 'Imphal', state: 'Manipur', type: 'Central',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/central-agricultural-university/central-agricultural-university.html',
      rating: '4.1', accr: 'Central'
    },
    {
      name: 'Regional Institute of Medical Sciences',
      city: 'Imphal', state: 'Manipur', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/manipur/regional-institute-of-medical-sciences/regional-institute-of-medical-sciences.html',
      rating: '4.6', accr: 'Government'
    },
    {
      name: 'Jawaharlal Nehru Institute of Medical Sciences',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/jawaharlal-nehru-institute-of-medical-sciences/jawaharlal-nehru-institute-of-medical-sciences.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Manipur Institute of Technology',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/manipur-institute-of-technology/manipur-institute-of-technology.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dhanamanjuri University',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/dhanamanjuri-university/dhanamanjuri-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dhanamanjuri College of Arts',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/dhanamanjuri-college-of-arts/dhanamanjuri-college-of-arts.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dhanamanjuri College of Science',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/dhanamanjuri-college-of-science/dhanamanjuri-college-of-science.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dhanamanjuri College of Commerce',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/dhanamanjuri-college-of-commerce/dhanamanjuri-college-of-commerce.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Imphal College',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/imphal-college/imphal-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Oriental College Imphal',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/oriental-college-imphal/oriental-college-imphal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Moreh College',
      city: 'Moreh', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/moreh-college/moreh-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Churachandpur College',
      city: 'Churachandpur', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/churachandpur-college/churachandpur-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'United College Lambung',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/united-college-lambung/united-college-lambung.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Pettigrew College Ukhrul',
      city: 'Ukhrul', state: 'Manipur', type: 'Private Aided',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/pettigrew-college-ukhrul/pettigrew-college-ukhrul.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Presidency College Motbung',
      city: 'Motbung', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/presidency-college-motbung/presidency-college-motbung.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Tamenglong College',
      city: 'Tamenglong', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/tamenglong-college/tamenglong-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Kha Manipur College Kakching',
      city: 'Kakching', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/kha-manipur-college-kakching/kha-manipur-college-kakching.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Standard College Kongba',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/standard-college-kongba/standard-college-kongba.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Liberal College Luwangsangbam',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/liberal-college-luwangsangbam/liberal-college-luwangsangbam.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Hill College Tadubi',
      city: 'Senapati', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/hill-college-tadubi/hill-college-tadubi.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'S Kula Women\'s College',
      city: 'Imphal', state: 'Manipur', type: 'State (Women)',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/s-kula-womens-college/s-kula-womens-college.html',
      rating: '4.1', accr: 'State (Women)'
    },
    {
      name: 'Manipur College',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/manipur-college/manipur-college.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Ideal Girls College Akampat',
      city: 'Imphal', state: 'Manipur', type: 'Private (Women)',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/ideal-girls-college-akampat/ideal-girls-college-akampat.html',
      rating: '4.1', accr: 'Private (Women)'
    },
    {
      name: 'Waikhom Mani Girls College',
      city: 'Thoubal', state: 'Manipur', type: 'Private (Women)',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/waikhom-mani-girls-college/waikhom-mani-girls-college.html',
      rating: '4.1', accr: 'Private (Women)'
    },
    {
      name: 'Heirok Higher Secondary College',
      city: 'Thoubal', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/heirok-higher-secondary-college/heirok-higher-secondary-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Modern College Imphal',
      city: 'Imphal', state: 'Manipur', type: 'Private Aided',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/modern-college-imphal/modern-college-imphal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Manipur Institute of Management Studies',
      city: 'Imphal', state: 'Manipur', type: 'Private',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/manipur-institute-of-management-studies/manipur-institute-of-management-studies.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Sangeet Natak Academy Imphal',
      city: 'Imphal', state: 'Manipur', type: 'Government',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/sangeet-natak-academy-imphal/sangeet-natak-academy-imphal.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Imphal',
      city: 'Imphal', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-imphal/government-polytechnic-imphal.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Polytechnic Chandel',
      city: 'Chandel', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-chandel/government-polytechnic-chandel.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Polytechnic Senapati',
      city: 'Senapati', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-senapati/government-polytechnic-senapati.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Polytechnic Ukhrul',
      city: 'Ukhrul', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-ukhrul/government-polytechnic-ukhrul.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Polytechnic Tamenglong',
      city: 'Tamenglong', state: 'Manipur', type: 'State',
      score: 7.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 68, nirf: 0,
      link: '../colleges/manipur/government-polytechnic-tamenglong/government-polytechnic-tamenglong.html',
      rating: '4.1', accr: 'State'
    },

    {
      name: 'Panjab University',
      city: 'Chandigarh', state: 'Chandigarh', type: 'Central',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/chandigarh/panjab-university/panjab-university.html',
      rating: '4.9', accr: 'Central'
    },
    {
      name: 'Postgraduate Institute of Medical Education and Research',
      city: 'Chandigarh', state: 'Chandigarh', type: 'INI',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/chandigarh/postgraduate-institute-of-medical-education-and-research/postgraduate-institute-of-medical-education-and-research.html',
      rating: '4.9', accr: 'INI'
    },
    {
      name: 'Government Medical College and Hospital Chandigarh',
      city: 'Chandigarh', state: 'Chandigarh', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/chandigarh/government-medical-college-and-hospital-chandigarh/government-medical-college-and-hospital-chandigarh.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Dr BR Ambedkar Institute of Medical Education and Research',
      city: 'Chandigarh', state: 'Chandigarh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chandigarh/dr-br-ambedkar-institute-of-medical-education-and-research/dr-br-ambedkar-institute-of-medical-education-and-research.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'University Institute of Engineering and Technology',
      city: 'Chandigarh', state: 'Chandigarh', type: 'Central (Autonomous)',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/chandigarh/university-institute-of-engineering-and-technology/university-institute-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Central (Autonomous)'
    },
    {
      name: 'University Institute of Legal Studies',
      city: 'Chandigarh', state: 'Chandigarh', type: 'Central (Autonomous)',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/chandigarh/university-institute-of-legal-studies/university-institute-of-legal-studies.html',
      rating: '4.3', accr: 'Central (Autonomous)'
    },
    {
      name: 'Goswami Ganesh Dutta Sanatan Dharma College',
      city: 'Chandigarh', state: 'Chandigarh', type: 'Private Aided',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/chandigarh/goswami-ganesh-dutta-sanatan-dharma-college/goswami-ganesh-dutta-sanatan-dharma-college.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'DAV College Chandigarh',
      city: 'Chandigarh', state: 'Chandigarh', type: 'Private Aided',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chandigarh/dav-college-chandigarh/dav-college-chandigarh.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'MCM DAV College for Women',
      city: 'Chandigarh', state: 'Chandigarh', type: 'Private Aided (Women)',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chandigarh/mcm-dav-college-for-women/mcm-dav-college-for-women.html',
      rating: '4.3', accr: 'Private Aided (Women)'
    },
    {
      name: 'DAV College for Girls Chandigarh',
      city: 'Chandigarh', state: 'Chandigarh', type: 'Private Aided (Women)',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chandigarh/dav-college-for-girls-chandigarh/dav-college-for-girls-chandigarh.html',
      rating: '4.3', accr: 'Private Aided (Women)'
    },
    {
      name: 'Sri Guru Gobind Singh College Chandigarh',
      city: 'Chandigarh', state: 'Chandigarh', type: 'Private Aided',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chandigarh/sri-guru-gobind-singh-college-chandigarh/sri-guru-gobind-singh-college-chandigarh.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Government College for Girls Chandigarh',
      city: 'Chandigarh', state: 'Chandigarh', type: 'State (Women)',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chandigarh/government-college-for-girls-chandigarh/government-college-for-girls-chandigarh.html',
      rating: '4.3', accr: 'State (Women)'
    },
    {
      name: 'Government College of Commerce and Business Administration Chandigarh',
      city: 'Chandigarh', state: 'Chandigarh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chandigarh/government-college-of-commerce-and-business-administration-chandigarh/government-college-of-commerce-and-business-administration-chandigarh.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Home Science College Chandigarh',
      city: 'Chandigarh', state: 'Chandigarh', type: 'State (Women)',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chandigarh/government-home-science-college-chandigarh/government-home-science-college-chandigarh.html',
      rating: '4.3', accr: 'State (Women)'
    },
    {
      name: 'Post Graduate Government College Sector 11',
      city: 'Chandigarh', state: 'Chandigarh', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/chandigarh/post-graduate-government-college-sector-11/post-graduate-government-college-sector-11.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Post Graduate Government College Sector 46',
      city: 'Chandigarh', state: 'Chandigarh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chandigarh/post-graduate-government-college-sector-46/post-graduate-government-college-sector-46.html',
      rating: '4.3', accr: 'State'
    },

    {
      name: 'Indian Institute of Technology Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'Government',
      score: 9.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/assam/indian-institute-of-technology-guwahati/indian-institute-of-technology-guwahati.html',
      rating: '4.7', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Silchar',
      city: 'Silchar', state: 'Assam', type: 'Government',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/assam/national-institute-of-technology-silchar/national-institute-of-technology-silchar.html',
      rating: '4.7', accr: 'Government'
    },
    {
      name: 'Gauhati University',
      city: 'Guwahati', state: 'Assam', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/assam/gauhati-university/gauhati-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Dibrugarh University',
      city: 'Dibrugarh', state: 'Assam', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/assam/dibrugarh-university/dibrugarh-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Assam Agricultural University',
      city: 'Jorhat', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/assam-agricultural-university/assam-agricultural-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Bodoland University',
      city: 'Kokrajhar', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/bodoland-university/bodoland-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Assam Medical College Dibrugarh',
      city: 'Dibrugarh', state: 'Assam', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/assam/assam-medical-college-dibrugarh/assam-medical-college-dibrugarh.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Gauhati Medical College',
      city: 'Guwahati', state: 'Assam', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/assam/gauhati-medical-college/gauhati-medical-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Silchar Medical College',
      city: 'Silchar', state: 'Assam', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/silchar-medical-college/silchar-medical-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Jorhat Medical College',
      city: 'Jorhat', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/jorhat-medical-college/jorhat-medical-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Fakhruddin Ali Ahmed Medical College',
      city: 'Barpeta', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/fakhruddin-ali-ahmed-medical-college/fakhruddin-ali-ahmed-medical-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Assam Engineering College',
      city: 'Guwahati', state: 'Assam', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/assam/assam-engineering-college/assam-engineering-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Jorhat Engineering College',
      city: 'Jorhat', state: 'Assam', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/jorhat-engineering-college/jorhat-engineering-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Bineswar Brahma Engineering College',
      city: 'Kokrajhar', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/bineswar-brahma-engineering-college/bineswar-brahma-engineering-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Golaghat Engineering College',
      city: 'Golaghat', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/golaghat-engineering-college/golaghat-engineering-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Dibrugarh Polytechnic',
      city: 'Dibrugarh', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/dibrugarh-polytechnic/dibrugarh-polytechnic.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Assam Down Town University',
      city: 'Guwahati', state: 'Assam', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/assam-down-town-university/assam-down-town-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Kaziranga University',
      city: 'Jorhat', state: 'Assam', type: 'Private',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/kaziranga-university/kaziranga-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Assam Don Bosco University',
      city: 'Guwahati', state: 'Assam', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/assam-don-bosco-university/assam-don-bosco-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Royal Global University',
      city: 'Guwahati', state: 'Assam', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/royal-global-university/royal-global-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Mahapurusha Srimanta Sankaradeva Viswavidyalaya',
      city: 'Nagaon', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/mahapurusha-srimanta-sankaradeva-viswavidyalaya/mahapurusha-srimanta-sankaradeva-viswavidyalaya.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Krishna Kanta Handiqui State Open University',
      city: 'Guwahati', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/krishna-kanta-handiqui-state-open-university/krishna-kanta-handiqui-state-open-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'ICFAI University Assam',
      city: 'Guwahati', state: 'Assam', type: 'Private',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/icfai-university-assam/icfai-university-assam.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Apex Professional University Assam',
      city: 'Pasighat', state: 'Assam', type: 'Private',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/apex-professional-university-assam/apex-professional-university-assam.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Cotton University Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/assam/cotton-university-guwahati/cotton-university-guwahati.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Handique Girls College Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'State (Women)',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/handique-girls-college-guwahati/handique-girls-college-guwahati.html',
      rating: '4.2', accr: 'State (Women)'
    },
    {
      name: 'B Borooah College Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'Private Aided',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/b-borooah-college-guwahati/b-borooah-college-guwahati.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'Nowgong College Nagaon',
      city: 'Nagaon', state: 'Assam', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/nowgong-college-nagaon/nowgong-college-nagaon.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Jagannath Barooah College Jorhat',
      city: 'Jorhat', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/jagannath-barooah-college-jorhat/jagannath-barooah-college-jorhat.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Dibru College Dibrugarh',
      city: 'Dibrugarh', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/dibru-college-dibrugarh/dibru-college-dibrugarh.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Lakhimpur Girls College',
      city: 'North Lakhimpur', state: 'Assam', type: 'State (Women)',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/lakhimpur-girls-college/lakhimpur-girls-college.html',
      rating: '4.2', accr: 'State (Women)'
    },
    {
      name: 'Pandu College Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/pandu-college-guwahati/pandu-college-guwahati.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Tinsukia College Tinsukia',
      city: 'Tinsukia', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/tinsukia-college-tinsukia/tinsukia-college-tinsukia.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Nalbari College Nalbari',
      city: 'Nalbari', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/nalbari-college-nalbari/nalbari-college-nalbari.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Arya Vidyapeeth College Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'Private Aided',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/arya-vidyapeeth-college-guwahati/arya-vidyapeeth-college-guwahati.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'Pragjyotish College Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'Private Aided',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/pragjyotish-college-guwahati/pragjyotish-college-guwahati.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'Dispur College Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'Private Aided',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/dispur-college-guwahati/dispur-college-guwahati.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'Dimoria College Guwahati',
      city: 'Dimoria', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/dimoria-college-guwahati/dimoria-college-guwahati.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Dakshin Kamrup College',
      city: 'Mirza', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/dakshin-kamrup-college/dakshin-kamrup-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Mangaldai College',
      city: 'Mangaldai', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/mangaldai-college/mangaldai-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Sibsagar College Joysagar',
      city: 'Sivasagar', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/sibsagar-college-joysagar/sibsagar-college-joysagar.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'North Lakhimpur College',
      city: 'North Lakhimpur', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/north-lakhimpur-college/north-lakhimpur-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Morigaon College',
      city: 'Morigaon', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/morigaon-college/morigaon-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Dhing College Nagaon',
      city: 'Nagaon', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/dhing-college-nagaon/dhing-college-nagaon.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Chaiduar College',
      city: 'Gohpur', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/chaiduar-college/chaiduar-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Gargaon College Sivasagar',
      city: 'Sivasagar', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/gargaon-college-sivasagar/gargaon-college-sivasagar.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Darrang College Tezpur',
      city: 'Tezpur', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/darrang-college-tezpur/darrang-college-tezpur.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'B H College Howly',
      city: 'Howly', state: 'Assam', type: 'State',
      score: 7.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 72, nirf: 0,
      link: '../colleges/assam/b-h-college-howly/b-h-college-howly.html',
      rating: '4.2', accr: 'State'
    },

    {
      name: 'National Institute of Technology Mizoram',
      city: 'Aizawl', state: 'Mizoram', type: 'Government',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/mizoram/national-institute-of-technology-mizoram/national-institute-of-technology-mizoram.html',
      rating: '4.6', accr: 'Government'
    },
    {
      name: 'ICFAI University Mizoram',
      city: 'Aizawl', state: 'Mizoram', type: 'Private',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/icfai-university-mizoram/icfai-university-mizoram.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Pachhunga University College',
      city: 'Aizawl', state: 'Mizoram', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/pachhunga-university-college/pachhunga-university-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Aizawl College',
      city: 'Aizawl', state: 'Mizoram', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-aizawl-college/government-aizawl-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Hrangbana College',
      city: 'Aizawl', state: 'Mizoram', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-hrangbana-college/government-hrangbana-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Serchhip College',
      city: 'Serchhip', state: 'Mizoram', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-serchhip-college/government-serchhip-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Champhai College',
      city: 'Champhai', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-champhai-college/government-champhai-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Kolasib College',
      city: 'Kolasib', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-kolasib-college/government-kolasib-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Lunglei College',
      city: 'Lunglei', state: 'Mizoram', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-lunglei-college/government-lunglei-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'St Edmund\'s College Aizawl',
      city: 'Aizawl', state: 'Mizoram', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/st-edmunds-college-aizawl/st-edmunds-college-aizawl.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'St Paul\'s College Aizawl',
      city: 'Aizawl', state: 'Mizoram', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/st-pauls-college-aizawl/st-pauls-college-aizawl.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Mizoram Christian College',
      city: 'Aizawl', state: 'Mizoram', type: 'Private Aided',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/mizoram-christian-college/mizoram-christian-college.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Trinity College Aizawl',
      city: 'Aizawl', state: 'Mizoram', type: 'Private',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/trinity-college-aizawl/trinity-college-aizawl.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Helen Lowry College Aizawl',
      city: 'Aizawl', state: 'Mizoram', type: 'Private (Women)',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/helen-lowry-college-aizawl/helen-lowry-college-aizawl.html',
      rating: '4.1', accr: 'Private (Women)'
    },
    {
      name: 'Mizoram Polytechnic College Lunglei',
      city: 'Lunglei', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/mizoram-polytechnic-college-lunglei/mizoram-polytechnic-college-lunglei.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Women\'s Polytechnic Aizawl',
      city: 'Aizawl', state: 'Mizoram', type: 'State (Women)',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/womens-polytechnic-aizawl/womens-polytechnic-aizawl.html',
      rating: '4.1', accr: 'State (Women)'
    },
    {
      name: 'Industrial Training Institute Aizawl',
      city: 'Aizawl', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/industrial-training-institute-aizawl/industrial-training-institute-aizawl.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Regional Institute of Paramedical and Nursing Sciences',
      city: 'Aizawl', state: 'Mizoram', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/regional-institute-of-paramedical-and-nursing-sciences/regional-institute-of-paramedical-and-nursing-sciences.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Zirtiri Residential Science College',
      city: 'Aizawl', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/zirtiri-residential-science-college/zirtiri-residential-science-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Lunglei Government College',
      city: 'Lunglei', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/lunglei-government-college/lunglei-government-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Aizawl Theological College',
      city: 'Aizawl', state: 'Mizoram', type: 'Private',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/aizawl-theological-college/aizawl-theological-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Baptist College of Theology',
      city: 'Aizawl', state: 'Mizoram', type: 'Private',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/baptist-college-of-theology/baptist-college-of-theology.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Mizoram Law College',
      city: 'Aizawl', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/mizoram-law-college/mizoram-law-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Mizoram Institute of Teacher Education',
      city: 'Aizawl', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/mizoram-institute-of-teacher-education/mizoram-institute-of-teacher-education.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Mamit College',
      city: 'Mamit', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-mamit-college/government-mamit-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Saiha College',
      city: 'Saiha', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-saiha-college/government-saiha-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Lawngtlai College',
      city: 'Lawngtlai', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-lawngtlai-college/government-lawngtlai-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Saitual College',
      city: 'Saitual', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-saitual-college/government-saitual-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Khawzawl College',
      city: 'Khawzawl', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-khawzawl-college/government-khawzawl-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Hnahthial College',
      city: 'Hnahthial', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-hnahthial-college/government-hnahthial-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Thenzawl College',
      city: 'Thenzawl', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-thenzawl-college/government-thenzawl-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government East Lungdar College',
      city: 'East Lungdar', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-east-lungdar-college/government-east-lungdar-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Darlawn College',
      city: 'Darlawn', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-darlawn-college/government-darlawn-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Biate College',
      city: 'Biate', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-biate-college/government-biate-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Tlabung College',
      city: 'Tlabung', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-tlabung-college/government-tlabung-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Zawlnuam College',
      city: 'Zawlnuam', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-zawlnuam-college/government-zawlnuam-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government North Vanlaiphai College',
      city: 'North Vanlaiphai', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-north-vanlaiphai-college/government-north-vanlaiphai-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government South Vanlaiphai College',
      city: 'South Vanlaiphai', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-south-vanlaiphai-college/government-south-vanlaiphai-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Thingsulthliah College',
      city: 'Thingsulthliah', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-thingsulthliah-college/government-thingsulthliah-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Vairengte College',
      city: 'Vairengte', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-vairengte-college/government-vairengte-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Reiek College',
      city: 'Reiek', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-reiek-college/government-reiek-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Sialsuk College',
      city: 'Sialsuk', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-sialsuk-college/government-sialsuk-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Khawbung College',
      city: 'Khawbung', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-khawbung-college/government-khawbung-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Sangau College',
      city: 'Sangau', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-sangau-college/government-sangau-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Bungtlang College',
      city: 'Bungtlang', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-bungtlang-college/government-bungtlang-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Farkawn College',
      city: 'Farkawn', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-farkawn-college/government-farkawn-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Bawngkawn College',
      city: 'Bawngkawn', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-bawngkawn-college/government-bawngkawn-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Zemabawk College',
      city: 'Zemabawk', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-zemabawk-college/government-zemabawk-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Tanhril College',
      city: 'Tanhril', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-tanhril-college/government-tanhril-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Aibawk College',
      city: 'Aibawk', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-aibawk-college/government-aibawk-college.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government Seling College',
      city: 'Seling', state: 'Mizoram', type: 'State',
      score: 7.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/mizoram/government-seling-college/government-seling-college.html',
      rating: '4.1', accr: 'State'
    },

    {
      name: 'Indian Institute of Education Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/indian-institute-of-education-pune/indian-institute-of-education-pune.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Tata Institute of Social Sciences',
      city: 'Mumbai', state: 'Maharashtra', type: 'Deemed',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/tata-institute-of-social-sciences/tata-institute-of-social-sciences.html',
      rating: '4.7', accr: 'Deemed'
    },
    {
      name: 'Dr Babasaheb Ambedkar Technological University',
      city: 'Lonere', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/dr-babasaheb-ambedkar-technological-university/dr-babasaheb-ambedkar-technological-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'North Maharashtra University',
      city: 'Jalgaon', state: 'Maharashtra', type: 'State',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/north-maharashtra-university/north-maharashtra-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Sant Gadge Baba Amravati University',
      city: 'Amravati', state: 'Maharashtra', type: 'State',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/sant-gadge-baba-amravati-university/sant-gadge-baba-amravati-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Yashwantrao Chavan Maharashtra Open University',
      city: 'Nashik', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/yashwantrao-chavan-maharashtra-open-university/yashwantrao-chavan-maharashtra-open-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Fr. Agnel College of Engineering Navi Mumbai',
      city: 'Navi Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/fr-agnel-college-of-engineering-navi-mumbai/fr-agnel-college-of-engineering-navi-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Shah and Anchor Kutchhi Engineering College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/shah-and-anchor-kutchhi-engineering-college-mumbai/shah-and-anchor-kutchhi-engineering-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Don Bosco Institute of Technology Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/don-bosco-institute-of-technology-mumbai/don-bosco-institute-of-technology-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Thakur College of Engineering and Technology Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/thakur-college-of-engineering-and-technology-mumbai/thakur-college-of-engineering-and-technology-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Atharva College of Engineering Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/atharva-college-of-engineering-mumbai/atharva-college-of-engineering-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Pillai College of Engineering Navi Mumbai',
      city: 'Navi Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/pillai-college-of-engineering-navi-mumbai/pillai-college-of-engineering-navi-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Terna Engineering College Navi Mumbai',
      city: 'Navi Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/terna-engineering-college-navi-mumbai/terna-engineering-college-navi-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Datta Meghe College of Engineering Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/datta-meghe-college-of-engineering-mumbai/datta-meghe-college-of-engineering-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'G H Raisoni College of Engineering Nagpur',
      city: 'Nagpur', state: 'Maharashtra', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/g-h-raisoni-college-of-engineering-nagpur/g-h-raisoni-college-of-engineering-nagpur.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Yeshwantrao Chavan College of Engineering Nagpur',
      city: 'Nagpur', state: 'Maharashtra', type: 'Private Aided',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/yeshwantrao-chavan-college-of-engineering-nagpur/yeshwantrao-chavan-college-of-engineering-nagpur.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Seth GS Medical College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'State',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/seth-gs-medical-college-mumbai/seth-gs-medical-college-mumbai.html',
      rating: '4.7', accr: 'State'
    },
    {
      name: 'Lokmanya Tilak Municipal Medical College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Municipal',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/lokmanya-tilak-municipal-medical-college-mumbai/lokmanya-tilak-municipal-medical-college-mumbai.html',
      rating: '4.7', accr: 'Municipal'
    },
    {
      name: 'KEM Hospital Medical College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Municipal',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/kem-hospital-medical-college-mumbai/kem-hospital-medical-college-mumbai.html',
      rating: '4.7', accr: 'Municipal'
    },
    {
      name: 'Government Medical College Aurangabad',
      city: 'Aurangabad', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/government-medical-college-aurangabad/government-medical-college-aurangabad.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Medical College Miraj',
      city: 'Miraj', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/government-medical-college-miraj/government-medical-college-miraj.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Dr Vasantrao Pawar Medical College Nashik',
      city: 'Nashik', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/dr-vasantrao-pawar-medical-college-nashik/dr-vasantrao-pawar-medical-college-nashik.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Jamnalal Bajaj Institute of Management Studies Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'State (Autonomous)',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/jamnalal-bajaj-institute-of-management-studies-mumbai/jamnalal-bajaj-institute-of-management-studies-mumbai.html',
      rating: '4.7', accr: 'State (Autonomous)'
    },
    {
      name: 'S P Jain Institute of Management and Research Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/s-p-jain-institute-of-management-and-research-mumbai/s-p-jain-institute-of-management-and-research-mumbai.html',
      rating: '4.7', accr: 'Private'
    },
    {
      name: 'Welingkar Institute of Management Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/welingkar-institute-of-management-mumbai/welingkar-institute-of-management-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Symbiosis Institute of Business Management Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Deemed',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/symbiosis-institute-of-business-management-pune/symbiosis-institute-of-business-management-pune.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'National Institute of Bank Management Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/national-institute-of-bank-management-pune/national-institute-of-bank-management-pune.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Jai Hind College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/jai-hind-college-mumbai/jai-hind-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'HR College of Commerce and Economics Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/hr-college-of-commerce-and-economics-mumbai/hr-college-of-commerce-and-economics-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'KC College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/kc-college-mumbai/kc-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Mithibai College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/mithibai-college-mumbai/mithibai-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Sophia College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private (Women)',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/sophia-college-mumbai/sophia-college-mumbai.html',
      rating: '4.3', accr: 'Private (Women)'
    },
    {
      name: 'BMCC College Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private Aided',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/bmcc-college-pune/bmcc-college-pune.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Garware College Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/garware-college-pune/garware-college-pune.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'St Mira\'s College Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/st-miras-college-pune/st-miras-college-pune.html',
      rating: '4.3', accr: 'Private (Women)'
    },
    {
      name: 'Modern College of Arts Science and Commerce Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/modern-college-of-arts-science-and-commerce-pune/modern-college-of-arts-science-and-commerce-pune.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Abasaheb Garware College Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/abasaheb-garware-college-pune/abasaheb-garware-college-pune.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Parle Tilak Vidyalaya College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/parle-tilak-vidyalaya-college-mumbai/parle-tilak-vidyalaya-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Nagindas Khandwala College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/nagindas-khandwala-college-mumbai/nagindas-khandwala-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Kishinchand Chellaram College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/kishinchand-chellaram-college-mumbai/kishinchand-chellaram-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Mulund College of Commerce Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/mulund-college-of-commerce-mumbai/mulund-college-of-commerce-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Sydenham College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/maharashtra/sydenham-college-mumbai/sydenham-college-mumbai.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Podar College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/podar-college-mumbai/podar-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Hinduja College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/hinduja-college-mumbai/hinduja-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Lala Lajpatrai College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/lala-lajpatrai-college-mumbai/lala-lajpatrai-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'D G Ruparel College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/d-g-ruparel-college-mumbai/d-g-ruparel-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'SIES College Mumbai',
      city: 'Navi Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/sies-college-mumbai/sies-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Ramnarain Ruia Autonomous College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'State (Autonomous)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/ramnarain-ruia-autonomous-college-mumbai/ramnarain-ruia-autonomous-college-mumbai.html',
      rating: '4.3', accr: 'State (Autonomous)'
    },
    {
      name: 'V G Vaze College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/v-g-vaze-college-mumbai/v-g-vaze-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'S K Somaiya College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/s-k-somaiya-college-mumbai/s-k-somaiya-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },

    {
      name: 'Indian Institute of Technology Bombay',
      city: 'Mumbai', state: 'Maharashtra', type: 'Government',
      score: 9.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/indian-institute-of-technology-bombay/indian-institute-of-technology-bombay.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Indian Institute of Technology Nagpur',
      city: 'Nagpur', state: 'Maharashtra', type: 'Government',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/indian-institute-of-technology-nagpur/indian-institute-of-technology-nagpur.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Nagpur',
      city: 'Nagpur', state: 'Maharashtra', type: 'Government',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/national-institute-of-technology-nagpur/national-institute-of-technology-nagpur.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Tata Institute of Fundamental Research',
      city: 'Mumbai', state: 'Maharashtra', type: 'Government',
      score: 9.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/tata-institute-of-fundamental-research/tata-institute-of-fundamental-research.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Institute of Chemical Technology Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Deemed',
      score: 9.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/institute-of-chemical-technology-mumbai/institute-of-chemical-technology-mumbai.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'Savitribai Phule Pune University',
      city: 'Pune', state: 'Maharashtra', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/savitribai-phule-pune-university/savitribai-phule-pune-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'University of Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/university-of-mumbai/university-of-mumbai.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Nagpur University',
      city: 'Nagpur', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/nagpur-university/nagpur-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Shivaji University Kolhapur',
      city: 'Kolhapur', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/shivaji-university-kolhapur/shivaji-university-kolhapur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Grant Medical College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'State',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/grant-medical-college-mumbai/grant-medical-college-mumbai.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'BJ Medical College Pune',
      city: 'Pune', state: 'Maharashtra', type: 'State',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/bj-medical-college-pune/bj-medical-college-pune.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Government Medical College Nagpur',
      city: 'Nagpur', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/government-medical-college-nagpur/government-medical-college-nagpur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'College of Engineering Pune',
      city: 'Pune', state: 'Maharashtra', type: 'State (Autonomous)',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/college-of-engineering-pune/college-of-engineering-pune.html',
      rating: '4.8', accr: 'State (Autonomous)'
    },
    {
      name: 'Veermata Jijabai Technological Institute',
      city: 'Mumbai', state: 'Maharashtra', type: 'State',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/veermata-jijabai-technological-institute/veermata-jijabai-technological-institute.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Walchand College of Engineering Sangli',
      city: 'Sangli', state: 'Maharashtra', type: 'State (Autonomous)',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/walchand-college-of-engineering-sangli/walchand-college-of-engineering-sangli.html',
      rating: '4.3', accr: 'State (Autonomous)'
    },
    {
      name: 'Government College of Engineering Aurangabad',
      city: 'Aurangabad', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/government-college-of-engineering-aurangabad/government-college-of-engineering-aurangabad.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College of Engineering Amravati',
      city: 'Amravati', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/government-college-of-engineering-amravati/government-college-of-engineering-amravati.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College of Engineering Karad',
      city: 'Karad', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/government-college-of-engineering-karad/government-college-of-engineering-karad.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College of Engineering Chandrapur',
      city: 'Chandrapur', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/government-college-of-engineering-chandrapur/government-college-of-engineering-chandrapur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Symbiosis International University',
      city: 'Pune', state: 'Maharashtra', type: 'Deemed',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/symbiosis-international-university/symbiosis-international-university.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'MIT World Peace University',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/mit-world-peace-university/mit-world-peace-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'DY Patil University Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Deemed',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/dy-patil-university-pune/dy-patil-university-pune.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'NMIMS University Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Deemed',
      score: 9.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/nmims-university-mumbai/nmims-university-mumbai.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'FLAME University Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/flame-university-pune/flame-university-pune.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Shiv Nadar University Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/shiv-nadar-university-mumbai/shiv-nadar-university-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Bharati Vidyapeeth Deemed University Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Deemed',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/bharati-vidyapeeth-deemed-university-pune/bharati-vidyapeeth-deemed-university-pune.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'KJ Somaiya University Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/kj-somaiya-university-mumbai/kj-somaiya-university-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'MIT Art Design and Technology University Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/mit-art-design-and-technology-university-pune/mit-art-design-and-technology-university-pune.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Ajeenkya DY Patil University Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/ajeenkya-dy-patil-university-pune/ajeenkya-dy-patil-university-pune.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'VIT Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/vit-pune/vit-pune.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Pune Institute of Computer Technology',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/pune-institute-of-computer-technology/pune-institute-of-computer-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Vishwakarma Institute of Information Technology Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/vishwakarma-institute-of-information-technology-pune/vishwakarma-institute-of-information-technology-pune.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sardar Patel Institute of Technology Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/sardar-patel-institute-of-technology-mumbai/sardar-patel-institute-of-technology-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Thadomal Shahani Engineering College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/thadomal-shahani-engineering-college-mumbai/thadomal-shahani-engineering-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Fr. Conceicao Rodrigues College of Engineering Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/fr-conceicao-rodrigues-college-of-engineering-mumbai/fr-conceicao-rodrigues-college-of-engineering-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'DJ Sanghvi College of Engineering Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/maharashtra/dj-sanghvi-college-of-engineering-mumbai/dj-sanghvi-college-of-engineering-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'KJ Somaiya College of Engineering Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/kj-somaiya-college-of-engineering-mumbai/kj-somaiya-college-of-engineering-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Vidyalankar Institute of Technology Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/vidyalankar-institute-of-technology-mumbai/vidyalankar-institute-of-technology-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Ramrao Adik Institute of Technology Navi Mumbai',
      city: 'Navi Mumbai', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/ramrao-adik-institute-of-technology-navi-mumbai/ramrao-adik-institute-of-technology-navi-mumbai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sinhgad College of Engineering Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/sinhgad-college-of-engineering-pune/sinhgad-college-of-engineering-pune.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Rajarambapu Institute of Technology Sangli',
      city: 'Sangli', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/rajarambapu-institute-of-technology-sangli/rajarambapu-institute-of-technology-sangli.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'MIT College of Engineering Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/mit-college-of-engineering-pune/mit-college-of-engineering-pune.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Bharati Vidyapeeth College of Engineering Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/bharati-vidyapeeth-college-of-engineering-pune/bharati-vidyapeeth-college-of-engineering-pune.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Pimpri Chinchwad College of Engineering Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/pimpri-chinchwad-college-of-engineering-pune/pimpri-chinchwad-college-of-engineering-pune.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Modern College Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/modern-college-pune/modern-college-pune.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Fergusson College Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/fergusson-college-pune/fergusson-college-pune.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'St Xavier\'s College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/st-xaviers-college-mumbai/st-xaviers-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Ruia College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/ruia-college-mumbai/ruia-college-mumbai.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Wilson College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/wilson-college-mumbai/wilson-college-mumbai.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Elphinstone College Mumbai',
      city: 'Mumbai', state: 'Maharashtra', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/elphinstone-college-mumbai/elphinstone-college-mumbai.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Wadia College Pune',
      city: 'Pune', state: 'Maharashtra', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/maharashtra/wadia-college-pune/wadia-college-pune.html',
      rating: '4.3', accr: 'Private Aided'
    },

    {
      name: 'Indian Institute of Technology Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/indian-institute-of-technology-indore/indian-institute-of-technology-indore.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Maulana Azad National Institute of Technology Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/maulana-azad-national-institute-of-technology-bhopal/maulana-azad-national-institute-of-technology-bhopal.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Indian Institute of Science Education and Research Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/indian-institute-of-science-education-and-research-bhopal/indian-institute-of-science-education-and-research-bhopal.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Atal Bihari Vajpayee Indian Institute of Information Technology and Management Gwalior',
      city: 'Gwalior', state: 'Madhya Pradesh', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/atal-bihari-vajpayee-indian-institute-of-information-technology-and-management-gwalior/atal-bihari-vajpayee-indian-institute-of-information-technology-and-management-gwalior.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'National Law Institute University Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/national-law-institute-university-bhopal/national-law-institute-university-bhopal.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Indian Institute of Forest Management',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/indian-institute-of-forest-management/indian-institute-of-forest-management.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Devi Ahilya Vishwavidyalaya',
      city: 'Indore', state: 'Madhya Pradesh', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/devi-ahilya-vishwavidyalaya/devi-ahilya-vishwavidyalaya.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Jiwaji University',
      city: 'Gwalior', state: 'Madhya Pradesh', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/jiwaji-university/jiwaji-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Rani Durgavati Vishwavidyalaya',
      city: 'Jabalpur', state: 'Madhya Pradesh', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/rani-durgavati-vishwavidyalaya/rani-durgavati-vishwavidyalaya.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Mahatma Gandhi Memorial Medical College',
      city: 'Indore', state: 'Madhya Pradesh', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/mahatma-gandhi-memorial-medical-college/mahatma-gandhi-memorial-medical-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Gandhi Medical College Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/gandhi-medical-college-bhopal/gandhi-medical-college-bhopal.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Netaji Subhash Chandra Bose Medical College',
      city: 'Jabalpur', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/netaji-subhash-chandra-bose-medical-college/netaji-subhash-chandra-bose-medical-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Gajra Raja Medical College',
      city: 'Gwalior', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/gajra-raja-medical-college/gajra-raja-medical-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Shyam Shah Medical College',
      city: 'Rewa', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/shyam-shah-medical-college/shyam-shah-medical-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Shri Govindram Seksaria Institute of Technology and Science',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Private Aided',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/madhya-pradesh/shri-govindram-seksaria-institute-of-technology-and-science/shri-govindram-seksaria-institute-of-technology-and-science.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Samrat Ashok Technological Institute',
      city: 'Vidisha', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/samrat-ashok-technological-institute/samrat-ashok-technological-institute.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Ujjain',
      city: 'Ujjain', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/government-engineering-college-ujjain/government-engineering-college-ujjain.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Jabalpur',
      city: 'Jabalpur', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/government-engineering-college-jabalpur/government-engineering-college-jabalpur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Rewa',
      city: 'Rewa', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/government-engineering-college-rewa/government-engineering-college-rewa.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'VIT Bhopal University',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/vit-bhopal-university/vit-bhopal-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Amity University Gwalior',
      city: 'Gwalior', state: 'Madhya Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/amity-university-gwalior/amity-university-gwalior.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Symbiosis University of Applied Sciences',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/symbiosis-university-of-applied-sciences/symbiosis-university-of-applied-sciences.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'LNCT University Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/lnct-university-bhopal/lnct-university-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Jagran Lakecity University',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/jagran-lakecity-university/jagran-lakecity-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'ITM University Gwalior',
      city: 'Gwalior', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/itm-university-gwalior/itm-university-gwalior.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'People\'s University Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/peoples-university-bhopal/peoples-university-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Oriental University Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/oriental-university-indore/oriental-university-indore.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Medi-Caps University Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/medi-caps-university-indore/medi-caps-university-indore.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'SAGE University Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/sage-university-indore/sage-university-indore.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Lakshmi Narain College of Technology Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/lakshmi-narain-college-of-technology-bhopal/lakshmi-narain-college-of-technology-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'IPS Academy Institute of Engineering and Science Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/ips-academy-institute-of-engineering-and-science-indore/ips-academy-institute-of-engineering-and-science-indore.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Acropolis Institute of Technology and Research Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/acropolis-institute-of-technology-and-research-indore/acropolis-institute-of-technology-and-research-indore.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Oriental Institute of Science and Technology Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/oriental-institute-of-science-and-technology-bhopal/oriental-institute-of-science-and-technology-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Bansal Institute of Science and Technology Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/bansal-institute-of-science-and-technology-bhopal/bansal-institute-of-science-and-technology-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Corporate Institute of Science and Technology Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/corporate-institute-of-science-and-technology-bhopal/corporate-institute-of-science-and-technology-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Truba Institute of Engineering and Information Technology Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/truba-institute-of-engineering-and-information-technology-bhopal/truba-institute-of-engineering-and-information-technology-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'RKDF University Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/rkdf-university-bhopal/rkdf-university-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'IES College of Technology Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/ies-college-of-technology-bhopal/ies-college-of-technology-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sagar Institute of Science and Technology Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/sagar-institute-of-science-and-technology-bhopal/sagar-institute-of-science-and-technology-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Bhopal School of Social Sciences',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/bhopal-school-of-social-sciences/bhopal-school-of-social-sciences.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Career College Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/career-college-bhopal/career-college-bhopal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Prestige Institute of Management and Research Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/prestige-institute-of-management-and-research-indore/prestige-institute-of-management-and-research-indore.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Daly College Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/daly-college-indore/daly-college-indore.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'St Aloysius College Jabalpur',
      city: 'Jabalpur', state: 'Madhya Pradesh', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/st-aloysius-college-jabalpur/st-aloysius-college-jabalpur.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Government Holkar Science College Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/government-holkar-science-college-indore/government-holkar-science-college-indore.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Model Science College Jabalpur',
      city: 'Jabalpur', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/government-model-science-college-jabalpur/government-model-science-college-jabalpur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Maharani Laxmi Bai Government College Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'State (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/maharani-laxmi-bai-government-college-bhopal/maharani-laxmi-bai-government-college-bhopal.html',
      rating: '4.3', accr: 'State (Women)'
    },
    {
      name: 'Government Autonomous Science College Gwalior',
      city: 'Gwalior', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/government-autonomous-science-college-gwalior/government-autonomous-science-college-gwalior.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Arts and Commerce College Indore',
      city: 'Indore', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/government-arts-and-commerce-college-indore/government-arts-and-commerce-college-indore.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government PG College Satna',
      city: 'Satna', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/government-pg-college-satna/government-pg-college-satna.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government PG College Sagar',
      city: 'Sagar', state: 'Madhya Pradesh', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/madhya-pradesh/government-pg-college-sagar/government-pg-college-sagar.html',
      rating: '4.3', accr: 'State'
    },

    {
      name: 'Indian Institute of Technology Palakkad',
      city: 'Palakkad', state: 'Kerala', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/indian-institute-of-technology-palakkad/indian-institute-of-technology-palakkad.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Calicut',
      city: 'Kozhikode', state: 'Kerala', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/national-institute-of-technology-calicut/national-institute-of-technology-calicut.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Indian Institute of Space Science and Technology',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/indian-institute-of-space-science-and-technology/indian-institute-of-space-science-and-technology.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Indian Institute of Information Technology Kottayam',
      city: 'Kottayam', state: 'Kerala', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/indian-institute-of-information-technology-kottayam/indian-institute-of-information-technology-kottayam.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Indian Institute of Science Education and Research Thiruvananthapuram',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/indian-institute-of-science-education-and-research-thiruvananthapuram/indian-institute-of-science-education-and-research-thiruvananthapuram.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Cochin University of Science and Technology',
      city: 'Kochi', state: 'Kerala', type: 'State',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/cochin-university-of-science-and-technology/cochin-university-of-science-and-technology.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Mahatma Gandhi University Kottayam',
      city: 'Kottayam', state: 'Kerala', type: 'State',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/mahatma-gandhi-university-kottayam/mahatma-gandhi-university-kottayam.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'University of Calicut',
      city: 'Malappuram', state: 'Kerala', type: 'State',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/university-of-calicut/university-of-calicut.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Government Medical College Thiruvananthapuram',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/government-medical-college-thiruvananthapuram/government-medical-college-thiruvananthapuram.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Medical College Kozhikode',
      city: 'Kozhikode', state: 'Kerala', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/government-medical-college-kozhikode/government-medical-college-kozhikode.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Medical College Kottayam',
      city: 'Kottayam', state: 'Kerala', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/government-medical-college-kottayam/government-medical-college-kottayam.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Thrissur',
      city: 'Thrissur', state: 'Kerala', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/government-engineering-college-thrissur/government-engineering-college-thrissur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'College of Engineering Trivandrum',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/college-of-engineering-trivandrum/college-of-engineering-trivandrum.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Kozhikode',
      city: 'Kozhikode', state: 'Kerala', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/government-engineering-college-kozhikode/government-engineering-college-kozhikode.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Barton Hill',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/government-engineering-college-barton-hill/government-engineering-college-barton-hill.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College for Women Thiruvananthapuram',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'State (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/government-college-for-women-thiruvananthapuram/government-college-for-women-thiruvananthapuram.html',
      rating: '4.3', accr: 'State (Women)'
    },
    {
      name: 'Maharaja\'s College Ernakulam',
      city: 'Ernakulam', state: 'Kerala', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/maharajas-college-ernakulam/maharajas-college-ernakulam.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'University College Thiruvananthapuram',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/university-college-thiruvananthapuram/university-college-thiruvananthapuram.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Rajagiri College of Social Sciences',
      city: 'Kalamassery', state: 'Kerala', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/rajagiri-college-of-social-sciences/rajagiri-college-of-social-sciences.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sacred Heart College Thevara',
      city: 'Ernakulam', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/sacred-heart-college-thevara/sacred-heart-college-thevara.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'St Teresa\'s College Ernakulam',
      city: 'Ernakulam', state: 'Kerala', type: 'Private (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/st-teresas-college-ernakulam/st-teresas-college-ernakulam.html',
      rating: '4.3', accr: 'Private (Women)'
    },
    {
      name: 'Mar Ivanios College',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/mar-ivanios-college/mar-ivanios-college.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'St Thomas College Thrissur',
      city: 'Thrissur', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/st-thomas-college-thrissur/st-thomas-college-thrissur.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'St Joseph\'s College Devagiri',
      city: 'Kozhikode', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/st-josephs-college-devagiri/st-josephs-college-devagiri.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Union Christian College Aluva',
      city: 'Aluva', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/union-christian-college-aluva/union-christian-college-aluva.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'CMS College Kottayam',
      city: 'Kottayam', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/cms-college-kottayam/cms-college-kottayam.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Farook College Kozhikode',
      city: 'Kozhikode', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/farook-college-kozhikode/farook-college-kozhikode.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Rajagiri School of Engineering and Technology',
      city: 'Kakkanad', state: 'Kerala', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/rajagiri-school-of-engineering-and-technology/rajagiri-school-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'TKM College of Engineering Kollam',
      city: 'Kollam', state: 'Kerala', type: 'Private Aided',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/tkm-college-of-engineering-kollam/tkm-college-of-engineering-kollam.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Model Engineering College Kochi',
      city: 'Thrikkakara', state: 'Kerala', type: 'State',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/kerala/model-engineering-college-kochi/model-engineering-college-kochi.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Sree Chitra Thirunal College of Engineering',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/sree-chitra-thirunal-college-of-engineering/sree-chitra-thirunal-college-of-engineering.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Idukki',
      city: 'Idukki', state: 'Kerala', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/government-engineering-college-idukki/government-engineering-college-idukki.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'NSS College Pandalam',
      city: 'Pandalam', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/nss-college-pandalam/nss-college-pandalam.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Sree Kerala Varma College Thrissur',
      city: 'Thrissur', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/sree-kerala-varma-college-thrissur/sree-kerala-varma-college-thrissur.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Bishop Moore College Mavelikara',
      city: 'Mavelikara', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/bishop-moore-college-mavelikara/bishop-moore-college-mavelikara.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Nirmala College Muvattupuzha',
      city: 'Muvattupuzha', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/nirmala-college-muvattupuzha/nirmala-college-muvattupuzha.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'St Albert\'s College Ernakulam',
      city: 'Ernakulam', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/st-alberts-college-ernakulam/st-alberts-college-ernakulam.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Baselios College Kottayam',
      city: 'Kottayam', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/baselios-college-kottayam/baselios-college-kottayam.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Marian College Kuttikkanam',
      city: 'Kuttikkanam', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/marian-college-kuttikkanam/marian-college-kuttikkanam.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'St Berchmans College Changanassery',
      city: 'Changanassery', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/st-berchmans-college-changanassery/st-berchmans-college-changanassery.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Christ College Irinjalakuda',
      city: 'Irinjalakuda', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/christ-college-irinjalakuda/christ-college-irinjalakuda.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'De Paul Institute of Science and Technology',
      city: 'Angamaly', state: 'Kerala', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/de-paul-institute-of-science-and-technology/de-paul-institute-of-science-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Assumption College Changanassery',
      city: 'Changanassery', state: 'Kerala', type: 'Private (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/assumption-college-changanassery/assumption-college-changanassery.html',
      rating: '4.3', accr: 'Private (Women)'
    },
    {
      name: 'Loyola College of Social Sciences',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/loyola-college-of-social-sciences/loyola-college-of-social-sciences.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'St Xavier\'s College Thumba',
      city: 'Thiruvananthapuram', state: 'Kerala', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/st-xaviers-college-thumba/st-xaviers-college-thumba.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'SN College Kollam',
      city: 'Kollam', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/sn-college-kollam/sn-college-kollam.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'SN College Alappuzha',
      city: 'Alappuzha', state: 'Kerala', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/sn-college-alappuzha/sn-college-alappuzha.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Government Brennen College Thalassery',
      city: 'Thalassery', state: 'Kerala', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/government-brennen-college-thalassery/government-brennen-college-thalassery.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Victoria College Palakkad',
      city: 'Palakkad', state: 'Kerala', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/kerala/government-victoria-college-palakkad/government-victoria-college-palakkad.html',
      rating: '4.3', accr: 'State'
    },

    {
      name: 'Indian Institute of Technology Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/indian-institute-of-technology-bhubaneswar/indian-institute-of-technology-bhubaneswar.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Rourkela',
      city: 'Rourkela', state: 'Odisha', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/national-institute-of-technology-rourkela/national-institute-of-technology-rourkela.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'All India Institute of Medical Sciences Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'INI',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/all-india-institute-of-medical-sciences-bhubaneswar/all-india-institute-of-medical-sciences-bhubaneswar.html',
      rating: '4.8', accr: 'INI'
    },
    {
      name: 'National Institute of Science Education and Research',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/national-institute-of-science-education-and-research/national-institute-of-science-education-and-research.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Utkal University',
      city: 'Bhubaneswar', state: 'Odisha', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/utkal-university/utkal-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Sambalpur University',
      city: 'Sambalpur', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/sambalpur-university/sambalpur-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Berhampur University',
      city: 'Berhampur', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/berhampur-university/berhampur-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Biju Patnaik University of Technology',
      city: 'Rourkela', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/biju-patnaik-university-of-technology/biju-patnaik-university-of-technology.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'SCB Medical College Cuttack',
      city: 'Cuttack', state: 'Odisha', type: 'State',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/scb-medical-college-cuttack/scb-medical-college-cuttack.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'MKCG Medical College Berhampur',
      city: 'Berhampur', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/mkcg-medical-college-berhampur/mkcg-medical-college-berhampur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'VSS Medical College Burla',
      city: 'Burla', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/vss-medical-college-burla/vss-medical-college-burla.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College of Engineering Keonjhar',
      city: 'Keonjhar', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/government-college-of-engineering-keonjhar/government-college-of-engineering-keonjhar.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Parala Maharaja Engineering College',
      city: 'Berhampur', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/parala-maharaja-engineering-college/parala-maharaja-engineering-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'College of Engineering and Technology Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/college-of-engineering-and-technology-bhubaneswar/college-of-engineering-and-technology-bhubaneswar.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Bhawanipatna',
      city: 'Bhawanipatna', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/government-engineering-college-bhawanipatna/government-engineering-college-bhawanipatna.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Malkangiri',
      city: 'Malkangiri', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/government-engineering-college-malkangiri/government-engineering-college-malkangiri.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Rourkela',
      city: 'Rourkela', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/government-college-rourkela/government-college-rourkela.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Ravenshaw College Cuttack',
      city: 'Cuttack', state: 'Odisha', type: 'State Unitary',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/ravenshaw-college-cuttack/ravenshaw-college-cuttack.html',
      rating: '4.3', accr: 'State Unitary'
    },
    {
      name: 'KIIT University',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Deemed',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/kiit-university/kiit-university.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'Siksha \'O\' Anusandhan',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Deemed',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/siksha-o-anusandhan/siksha-o-anusandhan.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'Centurion University of Technology and Management',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/centurion-university-of-technology-and-management/centurion-university-of-technology-and-management.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'CV Raman Global University',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/cv-raman-global-university/cv-raman-global-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sri Sri University',
      city: 'Cuttack', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/sri-sri-university/sri-sri-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Birla Global University',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/birla-global-university/birla-global-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'ICFAI University Odisha',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/icfai-university-odisha/icfai-university-odisha.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Xavier University Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/xavier-university-bhubaneswar/xavier-university-bhubaneswar.html',
      rating: '4.8', accr: 'Private'
    },
    {
      name: 'Kalinga Institute of Social Sciences University',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Deemed',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/kalinga-institute-of-social-sciences-university/kalinga-institute-of-social-sciences-university.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'Silicon Institute of Technology Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/silicon-institute-of-technology-bhubaneswar/silicon-institute-of-technology-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Institute of Technical Education and Research Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/institute-of-technical-education-and-research-bhubaneswar/institute-of-technical-education-and-research-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Gandhi Institute for Technology Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/gandhi-institute-for-technology-bhubaneswar/gandhi-institute-for-technology-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Trident Academy of Technology Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/trident-academy-of-technology-bhubaneswar/trident-academy-of-technology-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Orissa Engineering College Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/orissa-engineering-college-bhubaneswar/orissa-engineering-college-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Hi-Tech Institute of Technology Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/hi-tech-institute-of-technology-bhubaneswar/hi-tech-institute-of-technology-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'DRIEMS University Cuttack',
      city: 'Cuttack', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/driems-university-cuttack/driems-university-cuttack.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'C.V. Raman College of Engineering Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/cv-raman-college-of-engineering-bhubaneswar/cv-raman-college-of-engineering-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Gandhi Engineering College Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/gandhi-engineering-college-bhubaneswar/gandhi-engineering-college-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Indira Gandhi Institute of Technology Sarang',
      city: 'Sarang', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/indira-gandhi-institute-of-technology-sarang/indira-gandhi-institute-of-technology-sarang.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Odisha University of Technology and Research',
      city: 'Bhubaneswar', state: 'Odisha', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/odisha/odisha-university-of-technology-and-research/odisha-university-of-technology-and-research.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Bhadrak Engineering College',
      city: 'Bhadrak', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/bhadrak-engineering-college/bhadrak-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Padmanava College of Engineering Rourkela',
      city: 'Rourkela', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/padmanava-college-of-engineering-rourkela/padmanava-college-of-engineering-rourkela.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Krupajal Engineering College Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/krupajal-engineering-college-bhubaneswar/krupajal-engineering-college-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Nalanda Institute of Technology Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/nalanda-institute-of-technology-bhubaneswar/nalanda-institute-of-technology-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Synergy Institute of Engineering and Technology Dhenkanal',
      city: 'Dhenkanal', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/synergy-institute-of-engineering-and-technology-dhenkanal/synergy-institute-of-engineering-and-technology-dhenkanal.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Ajay Binay Institute of Technology Cuttack',
      city: 'Cuttack', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/ajay-binay-institute-of-technology-cuttack/ajay-binay-institute-of-technology-cuttack.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Jagannath Institute of Engineering and Technology Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/jagannath-institute-of-engineering-and-technology-bhubaneswar/jagannath-institute-of-engineering-and-technology-bhubaneswar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Biju Patnaik Institute of Information Technology Rourkela',
      city: 'Rourkela', state: 'Odisha', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/biju-patnaik-institute-of-information-technology-rourkela/biju-patnaik-institute-of-information-technology-rourkela.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Government College Koraput',
      city: 'Koraput', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/government-college-koraput/government-college-koraput.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Balasore',
      city: 'Balasore', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/government-college-balasore/government-college-balasore.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Puri',
      city: 'Puri', state: 'Odisha', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/odisha/government-college-puri/government-college-puri.html',
      rating: '4.3', accr: 'State'
    },

    {
      name: 'All India Institute of Medical Sciences New Delhi',
      city: 'New Delhi', state: 'Delhi', type: 'Government/INI',
      score: 10, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 1,
      link: '../colleges/delhi/all-india-institute-of-medical-sciences-new-delhi/all-india-institute-of-medical-sciences-new-delhi.html',
      rating: '5.0', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Government/INI',
      score: 9.8, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/madhya-pradesh/aiims-bhopal/aiims-bhopal.html',
      rating: '4.9', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Bhubaneswar',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Government/INI',
      score: 9.8, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/odisha/aiims-bhubaneswar/aiims-bhubaneswar.html',
      rating: '4.9', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Jodhpur',
      city: 'Jodhpur', state: 'Rajasthan', type: 'Government/INI',
      score: 9.8, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/rajasthan/aiims-jodhpur/aiims-jodhpur.html',
      rating: '4.9', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Raipur',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government/INI',
      score: 9.8, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/chhattisgarh/aiims-raipur/aiims-raipur.html',
      rating: '4.9', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Nagpur',
      city: 'Nagpur', state: 'Maharashtra', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/maharashtra/aiims-nagpur/aiims-nagpur.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Gorakhpur',
      city: 'Gorakhpur', state: 'Uttar Pradesh', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/uttar-pradesh/aiims-gorakhpur/aiims-gorakhpur.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Kalyani',
      city: 'Kalyani', state: 'West Bengal', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/west-bengal/aiims-kalyani/aiims-kalyani.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Deoghar',
      city: 'Deoghar', state: 'Jharkhand', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/jharkhand/aiims-deoghar/aiims-deoghar.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Bibinagar',
      city: 'Bibinagar', state: 'Telangana', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/telangana/aiims-bibinagar/aiims-bibinagar.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Raebareli',
      city: 'Raebareli', state: 'Uttar Pradesh', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/uttar-pradesh/aiims-raebareli/aiims-raebareli.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Bilaspur',
      city: 'Bilaspur', state: 'Himachal Pradesh', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/himachal-pradesh/aiims-bilaspur/aiims-bilaspur.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/assam/aiims-guwahati/aiims-guwahati.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Vijaypur',
      city: 'Vijaypur', state: 'Jammu and Kashmir', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/jammu-and-kashmir/aiims-vijaypur/aiims-vijaypur.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Rajkot',
      city: 'Rajkot', state: 'Gujarat', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/gujarat/aiims-rajkot/aiims-rajkot.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Madurai',
      city: 'Madurai', state: 'Tamil Nadu', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/tamil-nadu/aiims-madurai/aiims-madurai.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Darbhanga',
      city: 'Darbhanga', state: 'Bihar', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/bihar/aiims-darbhanga/aiims-darbhanga.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Rewari',
      city: 'Manethi', state: 'Haryana', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/haryana/aiims-rewari/aiims-rewari.html',
      rating: '4.6', accr: 'INI / NMC'
    },
    {
      name: 'AIIMS Awantipora',
      city: 'Awantipora', state: 'Jammu and Kashmir', type: 'Government/INI',
      score: 9.3, totalFees: '₹5.8K Total', avgPackage: 'Variable',
      placementRate: 99, nirf: 0,
      link: '../colleges/jammu-and-kashmir/aiims-awantipora/aiims-awantipora.html',
      rating: '4.6', accr: 'INI / NMC'
    },

    {
      name: 'Pondicherry University',
      city: 'Puducherry', state: 'Puducherry', type: 'Central',
      score: 9.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/puducherry/pondicherry-university/pondicherry-university.html',
      rating: '4.8', accr: 'Central'
    },
    {
      name: 'Jawaharlal Institute of Postgraduate Medical Education and Research',
      city: 'Puducherry', state: 'Puducherry', type: 'Institute of National Importance',
      score: 9.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/puducherry/jawaharlal-institute-of-postgraduate-medical-education-and-research/jawaharlal-institute-of-postgraduate-medical-education-and-research.html',
      rating: '4.8', accr: 'Institute of National Importance'
    },
    {
      name: 'Puducherry Technological University',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/puducherry-technological-university/puducherry-technological-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'National Institute of Technology Puducherry',
      city: 'Karaikal', state: 'Puducherry', type: 'Government',
      score: 9.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/puducherry/national-institute-of-technology-puducherry/national-institute-of-technology-puducherry.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Indira Gandhi Medical College and Research Institute',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/indira-gandhi-medical-college-and-research-institute/indira-gandhi-medical-college-and-research-institute.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Rajiv Gandhi Government Women and Children Hospital Medical College',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/rajiv-gandhi-government-women-and-children-hospital-medical-college/rajiv-gandhi-government-women-and-children-hospital-medical-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Tagore Government Arts and Science College',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/tagore-government-arts-and-science-college/tagore-government-arts-and-science-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Kanchi Mamunivar Government Institute for Postgraduate Studies and Research',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/kanchi-mamunivar-government-institute-for-postgraduate-studies-and-research/kanchi-mamunivar-government-institute-for-postgraduate-studies-and-research.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Arts College Puducherry',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/government-arts-college-puducherry/government-arts-college-puducherry.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Sri Balaji Vidyapeeth',
      city: 'Puducherry', state: 'Puducherry', type: 'Deemed',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/sri-balaji-vidyapeeth/sri-balaji-vidyapeeth.html',
      rating: '4.2', accr: 'Deemed'
    },
    {
      name: 'Vinayaka Missions Research Foundation Puducherry Campus',
      city: 'Puducherry', state: 'Puducherry', type: 'Deemed',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/vinayaka-missions-research-foundation-puducherry-campus/vinayaka-missions-research-foundation-puducherry-campus.html',
      rating: '4.2', accr: 'Deemed'
    },
    {
      name: 'Puducherry Engineering College',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/puducherry-engineering-college/puducherry-engineering-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Sri Manakula Vinayagar Engineering College',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/sri-manakula-vinayagar-engineering-college/sri-manakula-vinayagar-engineering-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Rajiv Gandhi College of Engineering and Technology',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/rajiv-gandhi-college-of-engineering-and-technology/rajiv-gandhi-college-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Christ College of Engineering and Technology',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/christ-college-of-engineering-and-technology/christ-college-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Achariya College of Engineering Technology',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/achariya-college-of-engineering-technology/achariya-college-of-engineering-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Achariya Bala Siksha Mandir Engineering College',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/achariya-bala-siksha-mandir-engineering-college/achariya-bala-siksha-mandir-engineering-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Mahatma Gandhi Medical College and Research Institute',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/mahatma-gandhi-medical-college-and-research-institute/mahatma-gandhi-medical-college-and-research-institute.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Sri Lakshmi Narayana Institute of Medical Sciences',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/sri-lakshmi-narayana-institute-of-medical-sciences/sri-lakshmi-narayana-institute-of-medical-sciences.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Aarupadai Veedu Medical College',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/aarupadai-veedu-medical-college/aarupadai-veedu-medical-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Bharathidasan Government College for Women',
      city: 'Puducherry', state: 'Puducherry', type: 'State (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/bharathidasan-government-college-for-women/bharathidasan-government-college-for-women.html',
      rating: '4.2', accr: 'State (Women)'
    },
    {
      name: 'Saradha Gangadharan College',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/saradha-gangadharan-college/saradha-gangadharan-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Pope John Paul II College',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/pope-john-paul-ii-college/pope-john-paul-ii-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Immaculate College for Women',
      city: 'Puducherry', state: 'Puducherry', type: 'Private (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/immaculate-college-for-women/immaculate-college-for-women.html',
      rating: '4.2', accr: 'Private (Women)'
    },
    {
      name: 'Perunthalaivar Kamarajar Government Arts College',
      city: 'Kariakal', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/perunthalaivar-kamarajar-government-arts-college/perunthalaivar-kamarajar-government-arts-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Arignar Anna Government Arts and Science College',
      city: 'Karaikal', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/arignar-anna-government-arts-and-science-college/arignar-anna-government-arts-and-science-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Rajiv Gandhi Arts and Science College',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/rajiv-gandhi-arts-and-science-college/rajiv-gandhi-arts-and-science-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Indira Gandhi Arts and Science College',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/indira-gandhi-arts-and-science-college/indira-gandhi-arts-and-science-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Mother Teresa Institute of Science and Technology',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/mother-teresa-institute-of-science-and-technology/mother-teresa-institute-of-science-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Don Bosco College Puducherry',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/don-bosco-college-puducherry/don-bosco-college-puducherry.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Annai Sivagami Government College',
      city: 'Puducherry', state: 'Puducherry', type: 'State (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/annai-sivagami-government-college/annai-sivagami-government-college.html',
      rating: '4.2', accr: 'State (Women)'
    },
    {
      name: 'Thanthai Periyar Government College',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/thanthai-periyar-government-college/thanthai-periyar-government-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Dr Ambedkar Government Arts College',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/dr-ambedkar-government-arts-college/dr-ambedkar-government-arts-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Rajiv Gandhi College of Education',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/rajiv-gandhi-college-of-education/rajiv-gandhi-college-of-education.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Sri Venkateswara College of Engineering and Technology',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/sri-venkateswara-college-of-engineering-and-technology/sri-venkateswara-college-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Alpha College of Engineering and Technology',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/alpha-college-of-engineering-and-technology/alpha-college-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Surya College of Engineering and Technology',
      city: 'Villupuram', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/surya-college-of-engineering-and-technology/surya-college-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'ECR Institute of Management Studies',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/ecr-institute-of-management-studies/ecr-institute-of-management-studies.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'St Joseph College of Arts and Science',
      city: 'Cuddalore', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/st-joseph-college-of-arts-and-science/st-joseph-college-of-arts-and-science.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'St Patrick College of Education',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/st-patrick-college-of-education/st-patrick-college-of-education.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Indira Gandhi Institute of Dental Sciences',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/indira-gandhi-institute-of-dental-sciences/indira-gandhi-institute-of-dental-sciences.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Mahatma Gandhi Dental College',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/mahatma-gandhi-dental-college/mahatma-gandhi-dental-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Sri Venkateswara Dental College',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/sri-venkateswara-dental-college/sri-venkateswara-dental-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Mother Theresa Postgraduate and Research Institute of Health Sciences',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/mother-theresa-postgraduate-and-research-institute-of-health-sciences/mother-theresa-postgraduate-and-research-institute-of-health-sciences.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Sri Manakula Vinayagar Medical College',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/sri-manakula-vinayagar-medical-college/sri-manakula-vinayagar-medical-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Pondicherry Institute of Medical Sciences',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/pondicherry-institute-of-medical-sciences/pondicherry-institute-of-medical-sciences.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Aarupadai Veedu Institute of Technology',
      city: 'Puducherry', state: 'Puducherry', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/aarupadai-veedu-institute-of-technology/aarupadai-veedu-institute-of-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Rajiv Gandhi Polytechnic College',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/rajiv-gandhi-polytechnic-college/rajiv-gandhi-polytechnic-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Polytechnic College Puducherry',
      city: 'Puducherry', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/government-polytechnic-college-puducherry/government-polytechnic-college-puducherry.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Polytechnic College Karaikal',
      city: 'Karaikal', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/government-polytechnic-college-karaikal/government-polytechnic-college-karaikal.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Polytechnic College Mahe',
      city: 'Mahe', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/government-polytechnic-college-mahe/government-polytechnic-college-mahe.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Polytechnic College Yanam',
      city: 'Yanam', state: 'Puducherry', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/puducherry/government-polytechnic-college-yanam/government-polytechnic-college-yanam.html',
      rating: '4.2', accr: 'State'
    },

    {
      name: 'Indian Institute of Technology Ropar',
      city: 'Rupnagar', state: 'Punjab', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/punjab/indian-institute-of-technology-ropar/indian-institute-of-technology-ropar.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Jalandhar',
      city: 'Jalandhar', state: 'Punjab', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/punjab/national-institute-of-technology-jalandhar/national-institute-of-technology-jalandhar.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'AIIMS Bathinda',
      city: 'Bathinda', state: 'Punjab', type: 'Government',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/punjab/aiims-bathinda/aiims-bathinda.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Punjab Agricultural University',
      city: 'Ludhiana', state: 'Punjab', type: 'State',
      score: 9.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/punjab/punjab-agricultural-university/punjab-agricultural-university.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Punjabi University Patiala',
      city: 'Patiala', state: 'Punjab', type: 'State',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/punjab/punjabi-university-patiala/punjabi-university-patiala.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Guru Nanak Dev University',
      city: 'Amritsar', state: 'Punjab', type: 'State',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/punjab/guru-nanak-dev-university/guru-nanak-dev-university.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Government Medical College Patiala',
      city: 'Patiala', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-medical-college-patiala/government-medical-college-patiala.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Medical College Amritsar',
      city: 'Amritsar', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-medical-college-amritsar/government-medical-college-amritsar.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Ludhiana',
      city: 'Ludhiana', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-ludhiana/government-college-ludhiana.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Hoshiarpur',
      city: 'Hoshiarpur', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-hoshiarpur/government-college-hoshiarpur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Mohali',
      city: 'Mohali', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-mohali/government-college-mohali.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Gurdaspur',
      city: 'Gurdaspur', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-engineering-college-gurdaspur/government-engineering-college-gurdaspur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Bathinda',
      city: 'Bathinda', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-engineering-college-bathinda/government-engineering-college-bathinda.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Engineering College Amritsar',
      city: 'Amritsar', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-engineering-college-amritsar/government-engineering-college-amritsar.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Polytechnic College Patiala',
      city: 'Patiala', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-polytechnic-college-patiala/government-polytechnic-college-patiala.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Polytechnic College Bathinda',
      city: 'Bathinda', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-polytechnic-college-bathinda/government-polytechnic-college-bathinda.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Thapar Institute of Engineering and Technology',
      city: 'Patiala', state: 'Punjab', type: 'Deemed',
      score: 9.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/punjab/thapar-institute-of-engineering-and-technology/thapar-institute-of-engineering-and-technology.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'Amity University Punjab',
      city: 'Mohali', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/amity-university-punjab/amity-university-punjab.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Chitkara University Punjab',
      city: 'Rajpura', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/chitkara-university-punjab/chitkara-university-punjab.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Rayat Bahra University',
      city: 'Mohali', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/rayat-bahra-university/rayat-bahra-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Desh Bhagat University',
      city: 'Mandi Gobindgarh', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/desh-bhagat-university/desh-bhagat-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'CT University Ludhiana',
      city: 'Ludhiana', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/ct-university-ludhiana/ct-university-ludhiana.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'GNA University',
      city: 'Phagwara', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/gna-university/gna-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Akal University',
      city: 'Bathinda', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/akal-university/akal-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Shaheed Bhagat Singh State University',
      city: 'Ferozepur', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/shaheed-bhagat-singh-state-university/shaheed-bhagat-singh-state-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Guru Kashi University',
      city: 'Bathinda', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/guru-kashi-university/guru-kashi-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sant Baba Bhag Singh University',
      city: 'Jalandhar', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/sant-baba-bhag-singh-university/sant-baba-bhag-singh-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Baba Farid University of Health Sciences',
      city: 'Faridkot', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/baba-farid-university-of-health-sciences/baba-farid-university-of-health-sciences.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Khalsa College Amritsar',
      city: 'Amritsar', state: 'Punjab', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/khalsa-college-amritsar/khalsa-college-amritsar.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'DAV College Jalandhar',
      city: 'Jalandhar', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/dav-college-jalandhar/dav-college-jalandhar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'DAV College Amritsar',
      city: 'Amritsar', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/dav-college-amritsar/dav-college-amritsar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Lyallpur Khalsa College Jalandhar',
      city: 'Jalandhar', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/lyallpur-khalsa-college-jalandhar/lyallpur-khalsa-college-jalandhar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Doaba College Jalandhar',
      city: 'Jalandhar', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/doaba-college-jalandhar/doaba-college-jalandhar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Guru Nanak Khalsa College',
      city: 'Ludhiana', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/guru-nanak-khalsa-college/guru-nanak-khalsa-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'SCD Government College Ludhiana',
      city: 'Ludhiana', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/scd-government-college-ludhiana/scd-government-college-ludhiana.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'SD College Chandigarh',
      city: 'Chandigarh', state: 'Punjab', type: 'Private Aided',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/sd-college-chandigarh/sd-college-chandigarh.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Mehr Chand Mahajan DAV College',
      city: 'Chandigarh', state: 'Punjab', type: 'Private (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/mehr-chand-mahajan-dav-college/mehr-chand-mahajan-dav-college.html',
      rating: '4.3', accr: 'Private (Women)'
    },
    {
      name: 'Hindu College Amritsar',
      city: 'Amritsar', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/hindu-college-amritsar/hindu-college-amritsar.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Government College Patiala',
      city: 'Patiala', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-patiala/government-college-patiala.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Bathinda',
      city: 'Bathinda', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-bathinda/government-college-bathinda.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Amritsar',
      city: 'Amritsar', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-amritsar/government-college-amritsar.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Ferozepur',
      city: 'Ferozepur', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-ferozepur/government-college-ferozepur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Sangrur',
      city: 'Sangrur', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-sangrur/government-college-sangrur.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Mansa',
      city: 'Mansa', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-mansa/government-college-mansa.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College Fazilka',
      city: 'Fazilka', state: 'Punjab', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/punjab/government-college-fazilka/government-college-fazilka.html',
      rating: '4.3', accr: 'State'
    },

    {
      name: 'Jai Narain Vyas University',
      city: 'Jodhpur', state: 'Rajasthan', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/jai-narain-vyas-university/jai-narain-vyas-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Mohanlal Sukhadia University',
      city: 'Udaipur', state: 'Rajasthan', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/mohanlal-sukhadia-university/mohanlal-sukhadia-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Maharshi Dayanand Saraswati University',
      city: 'Ajmer', state: 'Rajasthan', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/maharshi-dayanand-saraswati-university/maharshi-dayanand-saraswati-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Vardhman Mahaveer Open University',
      city: 'Kota', state: 'Rajasthan', type: 'State Open',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/vardhman-mahaveer-open-university/vardhman-mahaveer-open-university.html',
      rating: '4.3', accr: 'State Open'
    },
    {
      name: 'Swami Keshvanand Rajasthan Agricultural University',
      city: 'Bikaner', state: 'Rajasthan', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/swami-keshvanand-rajasthan-agricultural-university/swami-keshvanand-rajasthan-agricultural-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Maharaja Ganga Singh University',
      city: 'Bikaner', state: 'Rajasthan', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/maharaja-ganga-singh-university/maharaja-ganga-singh-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'SMS Medical College',
      city: 'Jaipur', state: 'Rajasthan', type: 'State',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/rajasthan/sms-medical-college/sms-medical-college.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'All India Institute of Medical Sciences Jodhpur',
      city: 'Jodhpur', state: 'Rajasthan', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/rajasthan/all-india-institute-of-medical-sciences-jodhpur/all-india-institute-of-medical-sciences-jodhpur.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Dr. S.N. Medical College',
      city: 'Jodhpur', state: 'Rajasthan', type: 'State',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/rajasthan/dr-sn-medical-college/dr-sn-medical-college.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Sardar Patel Medical College',
      city: 'Bikaner', state: 'Rajasthan', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/sardar-patel-medical-college/sardar-patel-medical-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Rabindra Nath Tagore Medical College',
      city: 'Udaipur', state: 'Rajasthan', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/rabindra-nath-tagore-medical-college/rabindra-nath-tagore-medical-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Jhalawar Hospital and Medical College',
      city: 'Jhalawar', state: 'Rajasthan', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/jhalawar-hospital-and-medical-college/jhalawar-hospital-and-medical-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Mahatma Gandhi Medical College and Hospital',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/mahatma-gandhi-medical-college-and-hospital/mahatma-gandhi-medical-college-and-hospital.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'IIHMR University',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/iihmr-university/iihmr-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Arch College of Design and Business',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/arch-college-of-design-and-business/arch-college-of-design-and-business.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Mody University of Science and Technology',
      city: 'Sikar', state: 'Rajasthan', type: 'Private (Women)',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/mody-university-of-science-and-technology/mody-university-of-science-and-technology.html',
      rating: '4.3', accr: 'Private (Women)'
    },
    {
      name: 'Jayoti Vidyapeeth Women\'s University',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private (Women)',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/jayoti-vidyapeeth-womens-university/jayoti-vidyapeeth-womens-university.html',
      rating: '4.3', accr: 'Private (Women)'
    },
    {
      name: 'OPJS University',
      city: 'Churu', state: 'Rajasthan', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/opjs-university/opjs-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Bhagwant University',
      city: 'Ajmer', state: 'Rajasthan', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/bhagwant-university/bhagwant-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Janardan Rai Nagar Rajasthan Vidyapeeth',
      city: 'Udaipur', state: 'Rajasthan', type: 'Deemed',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/janardan-rai-nagar-rajasthan-vidyapeeth/janardan-rai-nagar-rajasthan-vidyapeeth.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'St. Xavier\'s College Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/st-xaviers-college-jaipur/st-xaviers-college-jaipur.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'SS Jain Subodh PG College',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private Aided',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/ss-jain-subodh-pg-college/ss-jain-subodh-pg-college.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Sophia Girls\' College',
      city: 'Ajmer', state: 'Rajasthan', type: 'Private (Women)',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/sophia-girls-college/sophia-girls-college.html',
      rating: '4.3', accr: 'Private (Women)'
    },
    {
      name: 'Government College Ajmer',
      city: 'Ajmer', state: 'Rajasthan', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/government-college-ajmer/government-college-ajmer.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Lachoo Memorial College of Science and Technology',
      city: 'Jodhpur', state: 'Rajasthan', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/lachoo-memorial-college-of-science-and-technology/lachoo-memorial-college-of-science-and-technology.html',
      rating: '4.3', accr: 'Private'
    },

    {
      name: 'Indian Institute of Technology Jodhpur',
      city: 'Jodhpur', state: 'Rajasthan', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 93, nirf: 0,
      link: '../colleges/rajasthan/indian-institute-of-technology-jodhpur/indian-institute-of-technology-jodhpur.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Malaviya National Institute of Technology Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 93, nirf: 0,
      link: '../colleges/rajasthan/malaviya-national-institute-of-technology-jaipur/malaviya-national-institute-of-technology-jaipur.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'MBM Engineering College',
      city: 'Jodhpur', state: 'Rajasthan', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 93, nirf: 0,
      link: '../colleges/rajasthan/mbm-engineering-college/mbm-engineering-college.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'College of Technology and Engineering Udaipur',
      city: 'Udaipur', state: 'Rajasthan', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 93, nirf: 0,
      link: '../colleges/rajasthan/college-of-technology-and-engineering-udaipur/college-of-technology-and-engineering-udaipur.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Engineering College Ajmer',
      city: 'Ajmer', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/government-engineering-college-ajmer/government-engineering-college-ajmer.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Engineering College Bikaner',
      city: 'Bikaner', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/government-engineering-college-bikaner/government-engineering-college-bikaner.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Engineering College Jhalawar',
      city: 'Jhalawar', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/government-engineering-college-jhalawar/government-engineering-college-jhalawar.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Engineering College Bharatpur',
      city: 'Bharatpur', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/government-engineering-college-bharatpur/government-engineering-college-bharatpur.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Engineering College Baran',
      city: 'Baran', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/government-engineering-college-baran/government-engineering-college-baran.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Engineering College Karauli',
      city: 'Karauli', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/government-engineering-college-karauli/government-engineering-college-karauli.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Mahila Engineering College Ajmer',
      city: 'Ajmer', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/government-mahila-engineering-college-ajmer/government-mahila-engineering-college-ajmer.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'MLV Textile & Engineering College Bhilwara',
      city: 'Bhilwara', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/mlv-textile-engineering-college-bhilwara/mlv-textile-engineering-college-bhilwara.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Rajasthan Technical University Kota',
      city: 'Kota', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/rajasthan-technical-university-kota/rajasthan-technical-university-kota.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Birla Institute of Technology and Science Pilani',
      city: 'Pilani', state: 'Rajasthan', type: 'Deemed',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 93, nirf: 0,
      link: '../colleges/rajasthan/birla-institute-of-technology-and-science-pilani/birla-institute-of-technology-and-science-pilani.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'Banasthali Vidyapith',
      city: 'Tonk', state: 'Rajasthan', type: 'Deemed (Women)',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 93, nirf: 0,
      link: '../colleges/rajasthan/banasthali-vidyapith/banasthali-vidyapith.html',
      rating: '4.8', accr: 'Deemed (Women)'
    },
    {
      name: 'The LNM Institute of Information Technology',
      city: 'Jaipur', state: 'Rajasthan', type: 'Deemed',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 93, nirf: 0,
      link: '../colleges/rajasthan/the-lnm-institute-of-information-technology/the-lnm-institute-of-information-technology.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'Amity University Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/amity-university-jaipur/amity-university-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'NIIT University Neemrana',
      city: 'Neemrana', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/niit-university-neemrana/niit-university-neemrana.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'JECRC University Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/jecrc-university-jaipur/jecrc-university-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Poornima College of Engineering',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/poornima-college-of-engineering/poornima-college-of-engineering.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Swami Keshvanand Institute of Technology',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 93, nirf: 0,
      link: '../colleges/rajasthan/swami-keshvanand-institute-of-technology/swami-keshvanand-institute-of-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Arya College of Engineering and Information Technology',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/arya-college-of-engineering-and-information-technology/arya-college-of-engineering-and-information-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Arya College of Engineering & Research Centre',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/arya-college-of-engineering-research-centre/arya-college-of-engineering-research-centre.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Jaipur Engineering College and Research Centre',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/jaipur-engineering-college-and-research-centre/jaipur-engineering-college-and-research-centre.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Global Institute of Technology Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/global-institute-of-technology-jaipur/global-institute-of-technology-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Jagannath University Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/jagannath-university-jaipur/jagannath-university-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'University of Engineering and Management Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/university-of-engineering-and-management-jaipur/university-of-engineering-and-management-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Vivekananda Global University Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/vivekananda-global-university-jaipur/vivekananda-global-university-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Stani Memorial College of Engineering',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/stani-memorial-college-of-engineering/stani-memorial-college-of-engineering.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Anand International College of Engineering',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/anand-international-college-of-engineering/anand-international-college-of-engineering.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'BK Birla Institute of Engineering and Technology Pilani',
      city: 'Pilani', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/bk-birla-institute-of-engineering-and-technology-pilani/bk-birla-institute-of-engineering-and-technology-pilani.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Rajasthan Institute of Engineering and Technology Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/rajasthan-institute-of-engineering-and-technology-jaipur/rajasthan-institute-of-engineering-and-technology-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Sir Padampat Singhania University Udaipur',
      city: 'Udaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/sir-padampat-singhania-university-udaipur/sir-padampat-singhania-university-udaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'NIMS University Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/nims-university-jaipur/nims-university-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Pacific University Udaipur',
      city: 'Udaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/pacific-university-udaipur/pacific-university-udaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Pacific Institute of Technology Udaipur',
      city: 'Udaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/pacific-institute-of-technology-udaipur/pacific-institute-of-technology-udaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Jodhpur Institute of Engineering and Technology',
      city: 'Jodhpur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/jodhpur-institute-of-engineering-and-technology/jodhpur-institute-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Marwar Engineering College Jodhpur',
      city: 'Jodhpur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/marwar-engineering-college-jodhpur/marwar-engineering-college-jodhpur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Modi Institute of Technology Kota',
      city: 'Kota', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/modi-institute-of-technology-kota/modi-institute-of-technology-kota.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Kota Engineering College',
      city: 'Kota', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/kota-engineering-college/kota-engineering-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Sobhasaria Engineering College Sikar',
      city: 'Sikar', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/sobhasaria-engineering-college-sikar/sobhasaria-engineering-college-sikar.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Shekhawati Institute of Engineering and Technology',
      city: 'Sikar', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/shekhawati-institute-of-engineering-and-technology/shekhawati-institute-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Jaipur National University Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/jaipur-national-university-jaipur/jaipur-national-university-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Suresh Gyan Vihar University Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/suresh-gyan-vihar-university-jaipur/suresh-gyan-vihar-university-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Rajasthan College of Engineering for Women Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private (Women)',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/rajasthan-college-of-engineering-for-women-jaipur/rajasthan-college-of-engineering-for-women-jaipur.html',
      rating: '4.2', accr: 'Private (Women)'
    },
    {
      name: 'Apex Institute of Engineering and Technology Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/apex-institute-of-engineering-and-technology-jaipur/apex-institute-of-engineering-and-technology-jaipur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Rawatbhata Engineering College Kota',
      city: 'Rawatbhata', state: 'Rajasthan', type: 'State',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/rawatbhata-engineering-college-kota/rawatbhata-engineering-college-kota.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Shankara Institute of Technology Jaipur',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 7.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/rajasthan/shankara-institute-of-technology-jaipur/shankara-institute-of-technology-jaipur.html',
      rating: '4.2', accr: 'Private'
    },

    {
      name: 'Sikkim University',
      city: 'Gangtok', state: 'Sikkim', type: 'Central',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/sikkim/sikkim-university/sikkim-university.html',
      rating: '4.1', accr: 'Central'
    },
    {
      name: 'Sikkim Manipal University',
      city: 'Gangtok', state: 'Sikkim', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/sikkim/sikkim-manipal-university/sikkim-manipal-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Sikkim Professional University',
      city: 'Gangtok', state: 'Sikkim', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-professional-university/sikkim-professional-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Sikkim Alpine University',
      city: 'Kamrang', state: 'Sikkim', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-alpine-university/sikkim-alpine-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Medhavi Skills University',
      city: 'Singtam', state: 'Sikkim', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/medhavi-skills-university/medhavi-skills-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Vinayaka Missions Sikkim University',
      city: 'Gangtok', state: 'Sikkim', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/vinayaka-missions-sikkim-university/vinayaka-missions-sikkim-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'National Institute of Technology Sikkim',
      city: 'Ravangla', state: 'Sikkim', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/sikkim/national-institute-of-technology-sikkim/national-institute-of-technology-sikkim.html',
      rating: '4.6', accr: 'Government'
    },
    {
      name: 'Sikkim Manipal Institute of Technology',
      city: 'Majhitar', state: 'Sikkim', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/sikkim/sikkim-manipal-institute-of-technology/sikkim-manipal-institute-of-technology.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'SRM Institute of Science and Technology Sikkim',
      city: 'Gangtok', state: 'Sikkim', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/srm-institute-of-science-and-technology-sikkim/srm-institute-of-science-and-technology-sikkim.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Sikkim Manipal Institute of Medical Sciences',
      city: 'Gangtok', state: 'Sikkim', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/sikkim/sikkim-manipal-institute-of-medical-sciences/sikkim-manipal-institute-of-medical-sciences.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Sikkim Government College Tadong',
      city: 'Tadong', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-government-college-tadong/sikkim-government-college-tadong.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Nar Bahadur Bhandari Government College Tadong',
      city: 'Tadong', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/nar-bahadur-bhandari-government-college-tadong/nar-bahadur-bhandari-government-college-tadong.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Sikkim Government College Namchi',
      city: 'Namchi', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-government-college-namchi/sikkim-government-college-namchi.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Sikkim Government College Gyalshing',
      city: 'Gyalshing', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-government-college-gyalshing/sikkim-government-college-gyalshing.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Sikkim Government College Burtuk',
      city: 'Burtuk', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-government-college-burtuk/sikkim-government-college-burtuk.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Sikkim Government B.Ed College Soreng',
      city: 'Soreng', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-government-bed-college-soreng/sikkim-government-bed-college-soreng.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Pakyong Government College',
      city: 'Pakyong', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/pakyong-government-college/pakyong-government-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Rhenock',
      city: 'Rhenock', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/government-college-rhenock/government-college-rhenock.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Advanced Technical Training Centre Bardang',
      city: 'Bardang', state: 'Sikkim', type: 'Government / ISO',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/advanced-technical-training-centre-bardang/advanced-technical-training-centre-bardang.html',
      rating: '4.1', accr: 'Government / ISO'
    },
    {
      name: 'Centre for Computers and Communication Technology Chisopani',
      city: 'Chisopani', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/centre-for-computers-and-communication-technology-chisopani/centre-for-computers-and-communication-technology-chisopani.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Sikkim Government Polytechnic College',
      city: 'Gangtok', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-government-polytechnic-college/sikkim-government-polytechnic-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Himalayan Pharmacy Institute Majhitar',
      city: 'Majhitar', state: 'Sikkim', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/himalayan-pharmacy-institute-majhitar/himalayan-pharmacy-institute-majhitar.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Government Law College Burtuk',
      city: 'Burtuk', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/government-law-college-burtuk/government-law-college-burtuk.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Sikkim Institute of Science and Technology',
      city: 'Chisopani', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-institute-of-science-and-technology/sikkim-institute-of-science-and-technology.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Institute of Hotel Management Gangtok',
      city: 'Gangtok', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/institute-of-hotel-management-gangtok/institute-of-hotel-management-gangtok.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Sikkim Institute of Rural Development',
      city: 'Karfectar', state: 'Sikkim', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/sikkim/sikkim-institute-of-rural-development/sikkim-institute-of-rural-development.html',
      rating: '4.1', accr: 'Government'
    },

    {
      name: 'Indian Institute of Technology Madras',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/indian-institute-of-technology-madras/indian-institute-of-technology-madras.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Tiruchirappalli',
      city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/national-institute-of-technology-tiruchirappalli/national-institute-of-technology-tiruchirappalli.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Indian Institute of Information Technology Design and Manufacturing Kancheepuram',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/indian-institute-of-information-technology-design-and-manufacturing-kancheepuram/indian-institute-of-information-technology-design-and-manufacturing-kancheepuram.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'College of Engineering Guindy',
      city: 'Chennai', state: 'Tamil Nadu', type: 'State',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/college-of-engineering-guindy/college-of-engineering-guindy.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Madras Institute of Technology',
      city: 'Chennai', state: 'Tamil Nadu', type: 'State',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/madras-institute-of-technology/madras-institute-of-technology.html',
      rating: '4.8', accr: 'State'
    },
    {
      name: 'Alagappa College of Technology',
      city: 'Chennai', state: 'Tamil Nadu', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/alagappa-college-of-technology/alagappa-college-of-technology.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government College of Technology Coimbatore',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/government-college-of-technology-coimbatore/government-college-of-technology-coimbatore.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Government College of Engineering Salem',
      city: 'Salem', state: 'Tamil Nadu', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/government-college-of-engineering-salem/government-college-of-engineering-salem.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Government College of Engineering Tirunelveli',
      city: 'Tirunelveli', state: 'Tamil Nadu', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/government-college-of-engineering-tirunelveli/government-college-of-engineering-tirunelveli.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Government College of Engineering Bargur',
      city: 'Krishnagiri', state: 'Tamil Nadu', type: 'Government',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/government-college-of-engineering-bargur/government-college-of-engineering-bargur.html',
      rating: '4.8', accr: 'Government'
    },
    {
      name: 'Vellore Institute of Technology',
      city: 'Vellore', state: 'Tamil Nadu', type: 'Deemed',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/vellore-institute-of-technology/vellore-institute-of-technology.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'Amrita Vishwa Vidyapeetham',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Deemed',
      score: 9.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/amrita-vishwa-vidyapeetham/amrita-vishwa-vidyapeetham.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'SASTRA Deemed University',
      city: 'Thanjavur', state: 'Tamil Nadu', type: 'Deemed',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/sastra-deemed-university/sastra-deemed-university.html',
      rating: '4.8', accr: 'Deemed'
    },
    {
      name: 'PSG College of Technology',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private Aided',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/psg-college-of-technology/psg-college-of-technology.html',
      rating: '4.8', accr: 'Private Aided'
    },
    {
      name: 'SSN College of Engineering',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/ssn-college-of-engineering/ssn-college-of-engineering.html',
      rating: '4.8', accr: 'Private'
    },
    {
      name: 'Thiagarajar College of Engineering',
      city: 'Madurai', state: 'Tamil Nadu', type: 'Private Aided',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/thiagarajar-college-of-engineering/thiagarajar-college-of-engineering.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Kumaraguru College of Technology',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/kumaraguru-college-of-technology/kumaraguru-college-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sri Krishna College of Engineering and Technology',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/sri-krishna-college-of-engineering-and-technology/sri-krishna-college-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Karunya Institute of Technology and Sciences',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Deemed',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/karunya-institute-of-technology-and-sciences/karunya-institute-of-technology-and-sciences.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'Vel Tech University Chennai',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Deemed',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/vel-tech-university-chennai/vel-tech-university-chennai.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'Hindustan Institute of Technology and Science',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Deemed',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/hindustan-institute-of-technology-and-science/hindustan-institute-of-technology-and-science.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'Bannari Amman Institute of Technology',
      city: 'Sathyamangalam', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/bannari-amman-institute-of-technology/bannari-amman-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Coimbatore Institute of Technology',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private Aided',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/coimbatore-institute-of-technology/coimbatore-institute-of-technology.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Kongu Engineering College',
      city: 'Erode', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/kongu-engineering-college/kongu-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sri Sairam Engineering College',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/sri-sairam-engineering-college/sri-sairam-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'RMK Engineering College',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/rmk-engineering-college/rmk-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'RMK College of Engineering and Technology',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/rmk-college-of-engineering-and-technology/rmk-college-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'R.M.D Engineering College',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/rmd-engineering-college/rmd-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Rajalakshmi Engineering College',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/rajalakshmi-engineering-college/rajalakshmi-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Rajalakshmi Institute of Technology',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/rajalakshmi-institute-of-technology/rajalakshmi-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'St Joseph’s College of Engineering Chennai',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/st-josephs-college-of-engineering-chennai/st-josephs-college-of-engineering-chennai.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Panimalar Engineering College',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/panimalar-engineering-college/panimalar-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Meenakshi Sundararajan Engineering College',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/meenakshi-sundararajan-engineering-college/meenakshi-sundararajan-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Easwari Engineering College',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/easwari-engineering-college/easwari-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Velammal Engineering College',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/velammal-engineering-college/velammal-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Velammal Institute of Technology',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/velammal-institute-of-technology/velammal-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sathyabama Institute of Science and Technology',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Deemed',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/sathyabama-institute-of-science-and-technology/sathyabama-institute-of-science-and-technology.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'Saveetha Engineering College',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/saveetha-engineering-college/saveetha-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Dr Mahalingam College of Engineering and Technology',
      city: 'Pollachi', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/dr-mahalingam-college-of-engineering-and-technology/dr-mahalingam-college-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Mepco Schlenk Engineering College',
      city: 'Sivakasi', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/mepco-schlenk-engineering-college/mepco-schlenk-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Adhiyamaan College of Engineering',
      city: 'Hosur', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/adhiyamaan-college-of-engineering/adhiyamaan-college-of-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Park College of Engineering and Technology',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/park-college-of-engineering-and-technology/park-college-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Dhanalakshmi Srinivasan College of Engineering',
      city: 'Perambalur', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/dhanalakshmi-srinivasan-college-of-engineering/dhanalakshmi-srinivasan-college-of-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Karpagam College of Engineering',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/karpagam-college-of-engineering/karpagam-college-of-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Karpagam Institute of Technology',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/karpagam-institute-of-technology/karpagam-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'SNS College of Technology',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/sns-college-of-technology/sns-college-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Anna University Regional Campus Coimbatore',
      city: 'Coimbatore', state: 'Tamil Nadu', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/anna-university-regional-campus-coimbatore/anna-university-regional-campus-coimbatore.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Anna University Regional Campus Tirunelveli',
      city: 'Tirunelveli', state: 'Tamil Nadu', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/anna-university-regional-campus-tirunelveli/anna-university-regional-campus-tirunelveli.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Anna University Regional Campus Madurai',
      city: 'Madurai', state: 'Tamil Nadu', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/anna-university-regional-campus-madurai/anna-university-regional-campus-madurai.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Anna University Regional Campus Trichy',
      city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/anna-university-regional-campus-trichy/anna-university-regional-campus-trichy.html',
      rating: '4.3', accr: 'State'
    },

    {
      name: 'SRM Institute of Science and Technology Kattankulathur',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Deemed',
      score: 9.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/srm-institute-of-science-and-technology-kattankulathur/srm-institute-of-science-and-technology-kattankulathur.html',
      rating: '4.6', accr: 'Deemed'
    },
    {
      name: 'SRM Institute of Science and Technology Ramapuram',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Deemed Off-Campus',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/srm-institute-of-science-and-technology-ramapuram/srm-institute-of-science-and-technology-ramapuram.html',
      rating: '4.1', accr: 'Deemed Off-Campus'
    },
    {
      name: 'SRM Institute of Science and Technology Vadapalani',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Deemed Off-Campus',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/srm-institute-of-science-and-technology-vadapalani/srm-institute-of-science-and-technology-vadapalani.html',
      rating: '4.1', accr: 'Deemed Off-Campus'
    },
    {
      name: 'SRM Institute of Science and Technology Tiruchirappalli',
      city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Deemed Off-Campus',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/tamil-nadu/srm-institute-of-science-and-technology-tiruchirappalli/srm-institute-of-science-and-technology-tiruchirappalli.html',
      rating: '4.1', accr: 'Deemed Off-Campus'
    },
    {
      name: 'SRM Institute of Science and Technology NCR Campus',
      city: 'Ghaziabad', state: 'Uttar Pradesh', type: 'Deemed Off-Campus',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/srm-institute-of-science-and-technology-ncr-campus/srm-institute-of-science-and-technology-ncr-campus.html',
      rating: '4.1', accr: 'Deemed Off-Campus'
    },
    {
      name: 'SRM University AP',
      city: 'Amaravati', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/andhra-pradesh/srm-university-ap/srm-university-ap.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'SRM University Delhi-NCR Sonepat',
      city: 'Sonepat', state: 'Haryana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/haryana/srm-university-delhi-ncr-sonepat/srm-university-delhi-ncr-sonepat.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'SRM University Sikkim',
      city: 'Gangtok', state: 'Sikkim', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/sikkim/srm-university-sikkim/srm-university-sikkim.html',
      rating: '4.1', accr: 'Private'
    },

    {
      name: 'University College of Engineering Osmania University',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 9.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/telangana/university-college-of-engineering-osmania-university/university-college-of-engineering-osmania-university.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Jawaharlal Nehru Technological University Hyderabad College of Engineering',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 9.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/telangana/jawaharlal-nehru-technological-university-hyderabad-college-of-engineering/jawaharlal-nehru-technological-university-hyderabad-college-of-engineering.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Kakatiya University College of Engineering and Technology',
      city: 'Warangal', state: 'Telangana', type: 'State',
      score: 9.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/telangana/kakatiya-university-college-of-engineering-and-technology/kakatiya-university-college-of-engineering-and-technology.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Rajiv Gandhi University of Knowledge Technologies Basar',
      city: 'Basar', state: 'Telangana', type: 'State',
      score: 9.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/telangana/rajiv-gandhi-university-of-knowledge-technologies-basar/rajiv-gandhi-university-of-knowledge-technologies-basar.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Osmania University College of Technology',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 9.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 92, nirf: 0,
      link: '../colleges/telangana/osmania-university-college-of-technology/osmania-university-college-of-technology.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Chaitanya Bharathi Institute of Technology',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/telangana/chaitanya-bharathi-institute-of-technology/chaitanya-bharathi-institute-of-technology.html',
      rating: '4.4', accr: 'Private'
    },
    {
      name: 'SR University',
      city: 'Warangal', state: 'Telangana', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/telangana/sr-university/sr-university.html',
      rating: '4.4', accr: 'Private'
    },

    {
      name: 'Osmania University',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/telangana/osmania-university/osmania-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Jawaharlal Nehru Technological University Hyderabad',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/telangana/jawaharlal-nehru-technological-university-hyderabad/jawaharlal-nehru-technological-university-hyderabad.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Kakatiya University',
      city: 'Warangal', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/kakatiya-university/kakatiya-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Mahatma Gandhi University Nalgonda',
      city: 'Nalgonda', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/mahatma-gandhi-university-nalgonda/mahatma-gandhi-university-nalgonda.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Satavahana University',
      city: 'Karimnagar', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/satavahana-university/satavahana-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Palamuru University',
      city: 'Mahbubnagar', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/palamuru-university/palamuru-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Telangana University',
      city: 'Nizamabad', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/telangana-university/telangana-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Dr. B. R. Ambedkar Open University',
      city: 'Hyderabad', state: 'Telangana', type: 'State Open',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/dr-b-r-ambedkar-open-university/dr-b-r-ambedkar-open-university.html',
      rating: '4.3', accr: 'State Open'
    },
    {
      name: 'Professor Jayashankar Telangana State Agricultural University',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/professor-jayashankar-telangana-state-agricultural-university/professor-jayashankar-telangana-state-agricultural-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Indian Institute of Technology Hyderabad',
      city: 'Sangareddy', state: 'Telangana', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/telangana/indian-institute-of-technology-hyderabad/indian-institute-of-technology-hyderabad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Warangal',
      city: 'Warangal', state: 'Telangana', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/telangana/national-institute-of-technology-warangal/national-institute-of-technology-warangal.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'BITS Pilani Hyderabad Campus',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 9.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/telangana/bits-pilani-hyderabad-campus/bits-pilani-hyderabad-campus.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'VNR Vignana Jyothi Institute of Engineering and Technology',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/telangana/vnr-vignana-jyothi-institute-of-engineering-and-technology/vnr-vignana-jyothi-institute-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'CBIT Hyderabad',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/telangana/cbit-hyderabad/cbit-hyderabad.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Vasavi College of Engineering',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/vasavi-college-of-engineering/vasavi-college-of-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Gokaraju Rangaraju Institute of Engineering and Technology',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/gokaraju-rangaraju-institute-of-engineering-and-technology/gokaraju-rangaraju-institute-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'CVR College of Engineering',
      city: 'Ibrahimpatnam', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/cvr-college-of-engineering/cvr-college-of-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Mahatma Gandhi Institute of Technology',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/mahatma-gandhi-institute-of-technology/mahatma-gandhi-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Osmania Medical College',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/osmania-medical-college/osmania-medical-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Kakatiya Medical College',
      city: 'Warangal', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/kakatiya-medical-college/kakatiya-medical-college.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'ESI Medical College Hyderabad',
      city: 'Hyderabad', state: 'Telangana', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/esi-medical-college-hyderabad/esi-medical-college-hyderabad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Medical College Nizamabad',
      city: 'Nizamabad', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/government-medical-college-nizamabad/government-medical-college-nizamabad.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Indian School of Business',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/telangana/indian-school-of-business/indian-school-of-business.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Institute of Public Enterprise',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/institute-of-public-enterprise/institute-of-public-enterprise.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'ICFAI Business School Hyderabad',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/icfai-business-school-hyderabad/icfai-business-school-hyderabad.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Woxsen University',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/woxsen-university/woxsen-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'NALSAR University of Law',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/telangana/nalsar-university-of-law/nalsar-university-of-law.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'University College of Law Osmania University',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/university-college-of-law-osmania-university/university-college-of-law-osmania-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Anurag University',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/anurag-university/anurag-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'JNTUH College of Engineering Hyderabad',
      city: 'Hyderabad', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/jntuh-college-of-engineering-hyderabad/jntuh-college-of-engineering-hyderabad.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'JNTUH College of Engineering Karimnagar',
      city: 'Karimnagar', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/jntuh-college-of-engineering-karimnagar/jntuh-college-of-engineering-karimnagar.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'JNTUH College of Engineering Manthani',
      city: 'Manthani', state: 'Telangana', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/jntuh-college-of-engineering-manthani/jntuh-college-of-engineering-manthani.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Guru Nanak Institutions Technical Campus',
      city: 'Ibrahimpatnam', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/guru-nanak-institutions-technical-campus/guru-nanak-institutions-technical-campus.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'MLR Institute of Technology',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/mlr-institute-of-technology/mlr-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Malla Reddy Engineering College',
      city: 'Secunderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/malla-reddy-engineering-college/malla-reddy-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Malla Reddy College of Engineering and Technology',
      city: 'Secunderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/malla-reddy-college-of-engineering-and-technology/malla-reddy-college-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Geethanjali College of Engineering and Technology',
      city: 'Keesara', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/geethanjali-college-of-engineering-and-technology/geethanjali-college-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sreenidhi Institute of Science and Technology',
      city: 'Ghatkesar', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/sreenidhi-institute-of-science-and-technology/sreenidhi-institute-of-science-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'CMR College of Engineering and Technology',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/cmr-college-of-engineering-and-technology/cmr-college-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'CMR Technical Campus',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/cmr-technical-campus/cmr-technical-campus.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Institute of Aeronautical Engineering',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/institute-of-aeronautical-engineering/institute-of-aeronautical-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Vardhaman College of Engineering',
      city: 'Shamshabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/vardhaman-college-of-engineering/vardhaman-college-of-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'BVRIT Hyderabad College of Engineering',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/bvrit-hyderabad-college-of-engineering/bvrit-hyderabad-college-of-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'BVRIT Narsapur',
      city: 'Narsapur', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/bvrit-narsapur/bvrit-narsapur.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'TKR College of Engineering and Technology',
      city: 'Meerpet', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/tkr-college-of-engineering-and-technology/tkr-college-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sreyas Institute of Engineering and Technology',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/sreyas-institute-of-engineering-and-technology/sreyas-institute-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'St. Martin\'s Engineering College',
      city: 'Secunderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/st-martins-engineering-college/st-martins-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Methodist College Hyderabad',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/methodist-college-hyderabad/methodist-college-hyderabad.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'St. Francis College for Women',
      city: 'Hyderabad', state: 'Telangana', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/st-francis-college-for-women/st-francis-college-for-women.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Nizam College',
      city: 'Hyderabad', state: 'Telangana', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/telangana/nizam-college/nizam-college.html',
      rating: '4.3', accr: 'Government'
    },

    {
      name: 'Tripura University',
      city: 'Agartala', state: 'Tripura', type: 'Central',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/tripura/tripura-university/tripura-university.html',
      rating: '4.2', accr: 'Central'
    },
    {
      name: 'Maharaja Bir Bikram University',
      city: 'Agartala', state: 'Tripura', type: 'State',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/maharaja-bir-bikram-university/maharaja-bir-bikram-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'ICFAI University Tripura',
      city: 'Agartala', state: 'Tripura', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/icfai-university-tripura/icfai-university-tripura.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'National Institute of Technology Agartala',
      city: 'Agartala', state: 'Tripura', type: 'Government',
      score: 9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/tripura/national-institute-of-technology-agartala/national-institute-of-technology-agartala.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Tripura Institute of Technology',
      city: 'Narsingarh', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/tripura-institute-of-technology/tripura-institute-of-technology.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Techno India Agartala',
      city: 'Agartala', state: 'Tripura', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/techno-india-agartala/techno-india-agartala.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Agartala Government Medical College',
      city: 'Agartala', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/agartala-government-medical-college/agartala-government-medical-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Tripura Medical College',
      city: 'Hapania', state: 'Tripura', type: 'Private / PPP',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/tripura-medical-college/tripura-medical-college.html',
      rating: '4.2', accr: 'Private / PPP'
    },
    {
      name: 'Maharaja Bir Bikram College',
      city: 'Agartala', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/maharaja-bir-bikram-college/maharaja-bir-bikram-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Ramthakur College',
      city: 'Agartala', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/ramthakur-college/ramthakur-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Women\'s College Agartala',
      city: 'Agartala', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/womens-college-agartala/womens-college-agartala.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Netaji Subhash Mahavidyalaya',
      city: 'Udaipur', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/netaji-subhash-mahavidyalaya/netaji-subhash-mahavidyalaya.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Iswar Chandra Vidyasagar College',
      city: 'Belonia', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/iswar-chandra-vidyasagar-college/iswar-chandra-vidyasagar-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Dharmanagar Government Degree College',
      city: 'Dharmanagar', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/dharmanagar-government-degree-college/dharmanagar-government-degree-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Ambedkar College Fatikroy',
      city: 'Fatikroy', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/ambedkar-college-fatikroy/ambedkar-college-fatikroy.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Santirbazar Government College',
      city: 'Santirbazar', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/santirbazar-government-college/santirbazar-government-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Teliamura Government College',
      city: 'Teliamura', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/teliamura-government-college/teliamura-government-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Sabroom Government Degree College',
      city: 'Sabroom', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/sabroom-government-degree-college/sabroom-government-degree-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Kamalpur Government Degree College',
      city: 'Kamalpur', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/kamalpur-government-degree-college/kamalpur-government-degree-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Longtharai Valley Government College',
      city: 'Chailengta', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/longtharai-valley-government-college/longtharai-valley-government-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Rabindranath Thakur Mahavidyalaya',
      city: 'Bishalgarh', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/rabindranath-thakur-mahavidyalaya/rabindranath-thakur-mahavidyalaya.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Kabi Nazrul Mahavidyalaya',
      city: 'Sonamura', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/kabi-nazrul-mahavidyalaya/kabi-nazrul-mahavidyalaya.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Women\'s Polytechnic Hapania',
      city: 'Agartala', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/womens-polytechnic-hapania/womens-polytechnic-hapania.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Gomati District Polytechnic',
      city: 'Udaipur', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/gomati-district-polytechnic/gomati-district-polytechnic.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Dhalai District Polytechnic',
      city: 'Ambassa', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/dhalai-district-polytechnic/dhalai-district-polytechnic.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Khowai District Polytechnic',
      city: 'Khowai', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/khowai-district-polytechnic/khowai-district-polytechnic.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Tripura Government Law College',
      city: 'Agartala', state: 'Tripura', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/tripura-government-law-college/tripura-government-law-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Holy Cross College Agartala',
      city: 'Agartala', state: 'Tripura', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/holy-cross-college-agartala/holy-cross-college-agartala.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Bhavan\'s Tripura College of Science and Technology',
      city: 'Agartala', state: 'Tripura', type: 'Private',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 70, nirf: 0,
      link: '../colleges/tripura/bhavans-tripura-college-of-science-and-technology/bhavans-tripura-college-of-science-and-technology.html',
      rating: '4.2', accr: 'Private'
    },

    {
      name: 'Gautam Buddha University',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'State',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/gautam-buddha-university/gautam-buddha-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Noida Institute of Engineering and Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private Autonomous',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/noida-institute-of-engineering-and-technology/noida-institute-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private Autonomous'
    },
    {
      name: 'Greater Noida Institute of Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/greater-noida-institute-of-technology/greater-noida-institute-of-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Lloyd Institute of Engineering & Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/lloyd-institute-of-engineering-technology/lloyd-institute-of-engineering-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'KCC Institute of Technology and Management',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/kcc-institute-of-technology-and-management/kcc-institute-of-technology-and-management.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'IEC College of Engineering and Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/iec-college-of-engineering-and-technology/iec-college-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Delhi Technical Campus',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/delhi-technical-campus/delhi-technical-campus.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'IIMT College of Engineering',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/iimt-college-of-engineering/iimt-college-of-engineering.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Mangalmay Institute of Engineering & Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/mangalmay-institute-of-engineering-technology/mangalmay-institute-of-engineering-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Accurate Institute of Management & Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/accurate-institute-of-management-technology/accurate-institute-of-management-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Harlal Institute of Management & Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/harlal-institute-of-management-technology/harlal-institute-of-management-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Dronacharya Group of Institutions',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/dronacharya-group-of-institutions/dronacharya-group-of-institutions.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Jaipuria Institute of Management Noida',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/jaipuria-institute-of-management-noida/jaipuria-institute-of-management-noida.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Institute of Management Studies Noida',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/institute-of-management-studies-noida/institute-of-management-studies-noida.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Birla Institute of Management Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/birla-institute-of-management-technology/birla-institute-of-management-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Asian Business School',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/asian-business-school/asian-business-school.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'I Business Institute Greater Noida',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/i-business-institute-greater-noida/i-business-institute-greater-noida.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Lloyd Law College',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/lloyd-law-college/lloyd-law-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Sharda University School of Law',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/sharda-university-school-of-law/sharda-university-school-of-law.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Bennett University School of Law',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/bennett-university-school-of-law/bennett-university-school-of-law.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Amity Law School Noida',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/amity-law-school-noida/amity-law-school-noida.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Asian Academy of Film and Television',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/asian-academy-of-film-and-television/asian-academy-of-film-and-television.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'AAFT School of Media and Arts',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/aaft-school-of-media-and-arts/aaft-school-of-media-and-arts.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Footwear Design and Development Institute Noida',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Government',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/footwear-design-and-development-institute-noida/footwear-design-and-development-institute-noida.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'National Institute of Fashion Technology Noida',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/national-institute-of-fashion-technology-noida/national-institute-of-fashion-technology-noida.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government Institute of Medical Sciences Greater Noida',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Government',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/government-institute-of-medical-sciences-greater-noida/government-institute-of-medical-sciences-greater-noida.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Sharda Medical College',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/sharda-medical-college/sharda-medical-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Noida International Institute of Medical Sciences',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/noida-international-institute-of-medical-sciences/noida-international-institute-of-medical-sciences.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Delhi Metropolitan Education',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/delhi-metropolitan-education/delhi-metropolitan-education.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Jagran Institute of Management and Mass Communication',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/jagran-institute-of-management-and-mass-communication/jagran-institute-of-management-and-mass-communication.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Global Institute of Management & Technology',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/global-institute-of-management-technology/global-institute-of-management-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Indian Institute of Tourism and Travel Management',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Autonomous',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/indian-institute-of-tourism-and-travel-management/indian-institute-of-tourism-and-travel-management.html',
      rating: '4.2', accr: 'Autonomous'
    },
    {
      name: 'Army Institute of Management and Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private Aided',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/army-institute-of-management-and-technology/army-institute-of-management-and-technology.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'BBS Institute of Management Studies',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/bbs-institute-of-management-studies/bbs-institute-of-management-studies.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Aster College of Education',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/aster-college-of-education/aster-college-of-education.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Bakson Homoeopathic Medical College',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/bakson-homoeopathic-medical-college/bakson-homoeopathic-medical-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'IIMT Group of Colleges',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/iimt-group-of-colleges/iimt-group-of-colleges.html',
      rating: '4.2', accr: 'Private'
    },

    {
      name: 'Banaras Hindu University',
      city: 'Varanasi', state: 'Uttar Pradesh', type: 'Central',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/uttar-pradesh/banaras-hindu-university/banaras-hindu-university.html',
      rating: '4.3', accr: 'Central'
    },
    {
      name: 'University of Allahabad',
      city: 'Prayagraj', state: 'Uttar Pradesh', type: 'Central',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/university-of-allahabad/university-of-allahabad.html',
      rating: '4.3', accr: 'Central'
    },
    {
      name: 'Lucknow University',
      city: 'Lucknow', state: 'Uttar Pradesh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/lucknow-university/lucknow-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Dr. A.P.J. Abdul Kalam Technical University',
      city: 'Lucknow', state: 'Uttar Pradesh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/dr-apj-abdul-kalam-technical-university/dr-apj-abdul-kalam-technical-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Mahatma Gandhi Kashi Vidyapith',
      city: 'Varanasi', state: 'Uttar Pradesh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/mahatma-gandhi-kashi-vidyapith/mahatma-gandhi-kashi-vidyapith.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Deen Dayal Upadhyay Gorakhpur University',
      city: 'Gorakhpur', state: 'Uttar Pradesh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/deen-dayal-upadhyay-gorakhpur-university/deen-dayal-upadhyay-gorakhpur-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Chaudhary Charan Singh University',
      city: 'Meerut', state: 'Uttar Pradesh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/chaudhary-charan-singh-university/chaudhary-charan-singh-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Bundelkhand University',
      city: 'Jhansi', state: 'Uttar Pradesh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/bundelkhand-university/bundelkhand-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Indian Institute of Technology Kanpur',
      city: 'Kanpur', state: 'Uttar Pradesh', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/uttar-pradesh/indian-institute-of-technology-kanpur/indian-institute-of-technology-kanpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Indian Institute of Technology BHU',
      city: 'Varanasi', state: 'Uttar Pradesh', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/uttar-pradesh/indian-institute-of-technology-bhu/indian-institute-of-technology-bhu.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Motilal Nehru National Institute of Technology Allahabad',
      city: 'Prayagraj', state: 'Uttar Pradesh', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/motilal-nehru-national-institute-of-technology-allahabad/motilal-nehru-national-institute-of-technology-allahabad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Harish Chandra Research Institute',
      city: 'Prayagraj', state: 'Uttar Pradesh', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/harish-chandra-research-institute/harish-chandra-research-institute.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Madan Mohan Malaviya University of Technology',
      city: 'Gorakhpur', state: 'Uttar Pradesh', type: 'State',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/uttar-pradesh/madan-mohan-malaviya-university-of-technology/madan-mohan-malaviya-university-of-technology.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Jaypee Institute of Information Technology',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/uttar-pradesh/jaypee-institute-of-information-technology/jaypee-institute-of-information-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Shiv Nadar University',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/shiv-nadar-university/shiv-nadar-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sanjay Gandhi Postgraduate Institute of Medical Sciences',
      city: 'Lucknow', state: 'Uttar Pradesh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/sanjay-gandhi-postgraduate-institute-of-medical-sciences/sanjay-gandhi-postgraduate-institute-of-medical-sciences.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'King George\'s Medical University',
      city: 'Lucknow', state: 'Uttar Pradesh', type: 'State',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/uttar-pradesh/king-georges-medical-university/king-georges-medical-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Institute of Medical Sciences BHU',
      city: 'Varanasi', state: 'Uttar Pradesh', type: 'Central',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/institute-of-medical-sciences-bhu/institute-of-medical-sciences-bhu.html',
      rating: '4.3', accr: 'Central'
    },
    {
      name: 'Jawaharlal Nehru Medical College AMU',
      city: 'Aligarh', state: 'Uttar Pradesh', type: 'Central',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/jawaharlal-nehru-medical-college-amu/jawaharlal-nehru-medical-college-amu.html',
      rating: '4.3', accr: 'Central'
    },
    {
      name: 'Uttar Pradesh University of Medical Sciences',
      city: 'Saifai', state: 'Uttar Pradesh', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/uttar-pradesh-university-of-medical-sciences/uttar-pradesh-university-of-medical-sciences.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Institute of Management Technology Ghaziabad',
      city: 'Ghaziabad', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/institute-of-management-technology-ghaziabad/institute-of-management-technology-ghaziabad.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Jaipuria Institute of Management',
      city: 'Lucknow', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/jaipuria-institute-of-management/jaipuria-institute-of-management.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Amity University Noida',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/amity-university-noida/amity-university-noida.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Faculty of Law Banaras Hindu University',
      city: 'Varanasi', state: 'Uttar Pradesh', type: 'Central',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/faculty-of-law-banaras-hindu-university/faculty-of-law-banaras-hindu-university.html',
      rating: '4.3', accr: 'Central'
    },
    {
      name: 'Faculty of Law Aligarh Muslim University',
      city: 'Aligarh', state: 'Uttar Pradesh', type: 'Central',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/faculty-of-law-aligarh-muslim-university/faculty-of-law-aligarh-muslim-university.html',
      rating: '4.3', accr: 'Central'
    },
    {
      name: 'Galgotias University',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/galgotias-university/galgotias-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Noida International University',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/noida-international-university/noida-international-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sharda University',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/sharda-university/sharda-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Bennett University',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/bennett-university/bennett-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'SRM Institute of Science and Technology Ghaziabad',
      city: 'Ghaziabad', state: 'Uttar Pradesh', type: 'Deemed',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/srm-institute-of-science-and-technology-ghaziabad/srm-institute-of-science-and-technology-ghaziabad.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'AKG Engineering College',
      city: 'Ghaziabad', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/akg-engineering-college/akg-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'KIET Group of Institutions',
      city: 'Ghaziabad', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/kiet-group-of-institutions/kiet-group-of-institutions.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'GL Bajaj Institute of Technology and Management',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/gl-bajaj-institute-of-technology-and-management/gl-bajaj-institute-of-technology-and-management.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'JSS Academy of Technical Education Noida',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/jss-academy-of-technical-education-noida/jss-academy-of-technical-education-noida.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'ABES Engineering College',
      city: 'Ghaziabad', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/abes-engineering-college/abes-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'IILM University Greater Noida',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/iilm-university-greater-noida/iilm-university-greater-noida.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'IMS Ghaziabad',
      city: 'Ghaziabad', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/ims-ghaziabad/ims-ghaziabad.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Birla Institute of Technology Noida Campus',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Deemed Off-Campus',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/birla-institute-of-technology-noida-campus/birla-institute-of-technology-noida-campus.html',
      rating: '4.3', accr: 'Deemed Off-Campus'
    },
    {
      name: 'Amity School of Engineering Noida',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/amity-school-of-engineering-noida/amity-school-of-engineering-noida.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Amity Business School Noida',
      city: 'Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/amity-business-school-noida/amity-business-school-noida.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Galgotias College of Engineering and Technology',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/galgotias-college-of-engineering-and-technology/galgotias-college-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Accurate Institute of Management',
      city: 'Greater Noida', state: 'Uttar Pradesh', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/accurate-institute-of-management/accurate-institute-of-management.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Institute of Engineering and Technology Lucknow',
      city: 'Lucknow', state: 'Uttar Pradesh', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/institute-of-engineering-and-technology-lucknow/institute-of-engineering-and-technology-lucknow.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Kamla Nehru Institute of Technology Sultanpur',
      city: 'Sultanpur', state: 'Uttar Pradesh', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/kamla-nehru-institute-of-technology-sultanpur/kamla-nehru-institute-of-technology-sultanpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Bundelkhand Institute of Engineering and Technology',
      city: 'Jhansi', state: 'Uttar Pradesh', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/bundelkhand-institute-of-engineering-and-technology/bundelkhand-institute-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Kannauj',
      city: 'Kannauj', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-kannauj/rajkiya-engineering-college-kannauj.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Banda',
      city: 'Banda', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-banda/rajkiya-engineering-college-banda.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Azamgarh',
      city: 'Azamgarh', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-azamgarh/rajkiya-engineering-college-azamgarh.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Mainpuri',
      city: 'Mainpuri', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-mainpuri/rajkiya-engineering-college-mainpuri.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Ambedkar Nagar',
      city: 'Ambedkar Nagar', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-ambedkar-nagar/rajkiya-engineering-college-ambedkar-nagar.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Sonbhadra',
      city: 'Sonbhadra', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-sonbhadra/rajkiya-engineering-college-sonbhadra.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Bijnor',
      city: 'Bijnor', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-bijnor/rajkiya-engineering-college-bijnor.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Etawah',
      city: 'Etawah', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-etawah/rajkiya-engineering-college-etawah.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Gonda',
      city: 'Gonda', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-gonda/rajkiya-engineering-college-gonda.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Mirzapur',
      city: 'Mirzapur', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-mirzapur/rajkiya-engineering-college-mirzapur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Amethi',
      city: 'Amethi', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-amethi/rajkiya-engineering-college-amethi.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Pratapgarh',
      city: 'Pratapgarh', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-pratapgarh/rajkiya-engineering-college-pratapgarh.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Ghazipur',
      city: 'Ghazipur', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-ghazipur/rajkiya-engineering-college-ghazipur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Bareilly',
      city: 'Bareilly', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-bareilly/rajkiya-engineering-college-bareilly.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Saharanpur',
      city: 'Saharanpur', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-saharanpur/rajkiya-engineering-college-saharanpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Firozabad',
      city: 'Firozabad', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-firozabad/rajkiya-engineering-college-firozabad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Sitapur',
      city: 'Sitapur', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-sitapur/rajkiya-engineering-college-sitapur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Hardoi',
      city: 'Hardoi', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-hardoi/rajkiya-engineering-college-hardoi.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Lakhimpur',
      city: 'Lakhimpur Kheri', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-lakhimpur/rajkiya-engineering-college-lakhimpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Balrampur',
      city: 'Balrampur', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-balrampur/rajkiya-engineering-college-balrampur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Deoria',
      city: 'Deoria', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-deoria/rajkiya-engineering-college-deoria.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Bahraich',
      city: 'Bahraich', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-bahraich/rajkiya-engineering-college-bahraich.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Shravasti',
      city: 'Shravasti', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-shravasti/rajkiya-engineering-college-shravasti.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Chandauli',
      city: 'Chandauli', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-chandauli/rajkiya-engineering-college-chandauli.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Jaunpur',
      city: 'Jaunpur', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-jaunpur/rajkiya-engineering-college-jaunpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Mau',
      city: 'Mau', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-mau/rajkiya-engineering-college-mau.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Basti',
      city: 'Basti', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-basti/rajkiya-engineering-college-basti.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Siddharthnagar',
      city: 'Siddharthnagar', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-siddharthnagar/rajkiya-engineering-college-siddharthnagar.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Kushinagar',
      city: 'Kushinagar', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-kushinagar/rajkiya-engineering-college-kushinagar.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Maharajganj',
      city: 'Maharajganj', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-maharajganj/rajkiya-engineering-college-maharajganj.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Sant Kabir Nagar',
      city: 'Sant Kabir Nagar', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-sant-kabir-nagar/rajkiya-engineering-college-sant-kabir-nagar.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Farrukhabad',
      city: 'Farrukhabad', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-farrukhabad/rajkiya-engineering-college-farrukhabad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Shahjahanpur',
      city: 'Shahjahanpur', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-shahjahanpur/rajkiya-engineering-college-shahjahanpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Pilibhit',
      city: 'Pilibhit', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-pilibhit/rajkiya-engineering-college-pilibhit.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Rampur',
      city: 'Rampur', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-rampur/rajkiya-engineering-college-rampur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Sambhal',
      city: 'Sambhal', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-sambhal/rajkiya-engineering-college-sambhal.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Moradabad',
      city: 'Moradabad', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-moradabad/rajkiya-engineering-college-moradabad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Amroha',
      city: 'Amroha', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-amroha/rajkiya-engineering-college-amroha.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Baghpat',
      city: 'Baghpat', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-baghpat/rajkiya-engineering-college-baghpat.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Shamli',
      city: 'Shamli', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-shamli/rajkiya-engineering-college-shamli.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Bulandshahr',
      city: 'Bulandshahr', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-bulandshahr/rajkiya-engineering-college-bulandshahr.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Hathras',
      city: 'Hathras', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-hathras/rajkiya-engineering-college-hathras.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Kasganj',
      city: 'Kasganj', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-kasganj/rajkiya-engineering-college-kasganj.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Etah',
      city: 'Etah', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-etah/rajkiya-engineering-college-etah.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Auraiya',
      city: 'Auraiya', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-auraiya/rajkiya-engineering-college-auraiya.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Lalitpur',
      city: 'Lalitpur', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-lalitpur/rajkiya-engineering-college-lalitpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Rajkiya Engineering College Chitrakoot',
      city: 'Chitrakoot', state: 'Uttar Pradesh', type: 'Government',
      score: 7.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/rajkiya-engineering-college-chitrakoot/rajkiya-engineering-college-chitrakoot.html',
      rating: '4.3', accr: 'Government'
    },

    {
      name: 'University of Uttarakhand',
      city: 'Dehradun', state: 'Uttarakhand', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/university-of-uttarakhand/university-of-uttarakhand.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Hemvati Nandan Bahuguna Garhwal University',
      city: 'Srinagar Garhwal', state: 'Uttarakhand', type: 'Central',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/hemvati-nandan-bahuguna-garhwal-university/hemvati-nandan-bahuguna-garhwal-university.html',
      rating: '4.3', accr: 'Central'
    },
    {
      name: 'Kumaun University',
      city: 'Nainital', state: 'Uttarakhand', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/kumaun-university/kumaun-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Uttarakhand Technical University',
      city: 'Dehradun', state: 'Uttarakhand', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/uttarakhand-technical-university/uttarakhand-technical-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Uttarakhand Open University',
      city: 'Haldwani', state: 'Uttarakhand', type: 'State Open',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/uttarakhand-open-university/uttarakhand-open-university.html',
      rating: '4.3', accr: 'State Open'
    },
    {
      name: 'Doon University',
      city: 'Dehradun', state: 'Uttarakhand', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/doon-university/doon-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'G. B. Pant University of Agriculture and Technology',
      city: 'Pantnagar', state: 'Uttarakhand', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/g-b-pant-university-of-agriculture-and-technology/g-b-pant-university-of-agriculture-and-technology.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Forest Research Institute Deemed University',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Deemed',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/forest-research-institute-deemed-university/forest-research-institute-deemed-university.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'UPES Dehradun',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/upes-dehradun/upes-dehradun.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Graphic Era University',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Deemed',
      score: 8.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/graphic-era-university/graphic-era-university.html',
      rating: '4.3', accr: 'Deemed'
    },
    {
      name: 'Indian Institute of Technology Roorkee',
      city: 'Roorkee', state: 'Uttarakhand', type: 'Government',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/indian-institute-of-technology-roorkee/indian-institute-of-technology-roorkee.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Uttarakhand',
      city: 'Srinagar Garhwal', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/national-institute-of-technology-uttarakhand/national-institute-of-technology-uttarakhand.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'DIT University',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/dit-university/dit-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Tula\'s Institute',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/tulas-institute/tulas-institute.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Dev Bhoomi Uttarakhand University',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/dev-bhoomi-uttarakhand-university/dev-bhoomi-uttarakhand-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Quantum University',
      city: 'Roorkee', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/quantum-university/quantum-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'ICFAI University Dehradun',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/icfai-university-dehradun/icfai-university-dehradun.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Uttaranchal University',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/uttaranchal-university/uttaranchal-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Shivalik College of Engineering',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/shivalik-college-of-engineering/shivalik-college-of-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Roorkee Institute of Technology',
      city: 'Roorkee', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/roorkee-institute-of-technology/roorkee-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'AIIMS Rishikesh',
      city: 'Rishikesh', state: 'Uttarakhand', type: 'Autonomous',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/aiims-rishikesh/aiims-rishikesh.html',
      rating: '4.3', accr: 'Autonomous'
    },
    {
      name: 'Government Doon Medical College',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-doon-medical-college/government-doon-medical-college.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Himalayan Institute of Medical Sciences',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/himalayan-institute-of-medical-sciences/himalayan-institute-of-medical-sciences.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sri Guru Ram Rai Institute of Medical and Health Sciences',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/sri-guru-ram-rai-institute-of-medical-and-health-sciences/sri-guru-ram-rai-institute-of-medical-and-health-sciences.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Gautam Buddha Chikitsa Mahavidyalaya',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/gautam-buddha-chikitsa-mahavidyalaya/gautam-buddha-chikitsa-mahavidyalaya.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Doon Business School',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/doon-business-school/doon-business-school.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'IMS Unison University',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/ims-unison-university/ims-unison-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'UPES School of Business',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/upes-school-of-business/upes-school-of-business.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'National Law University Uttarakhand',
      city: 'Bhowali', state: 'Uttarakhand', type: 'State',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/national-law-university-uttarakhand/national-law-university-uttarakhand.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'School of Law UPES',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.9, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/school-of-law-upes/school-of-law-upes.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Law College Dehradun',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Private',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/law-college-dehradun/law-college-dehradun.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Government College Dehradun',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-college-dehradun/government-college-dehradun.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Haldwani',
      city: 'Haldwani', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-college-haldwani/government-college-haldwani.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Nainital',
      city: 'Nainital', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-college-nainital/government-college-nainital.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Almora',
      city: 'Almora', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-college-almora/government-college-almora.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Pithoragarh',
      city: 'Pithoragarh', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-college-pithoragarh/government-college-pithoragarh.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Bageshwar',
      city: 'Bageshwar', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-college-bageshwar/government-college-bageshwar.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Chamoli',
      city: 'Gopeshwar', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-college-chamoli/government-college-chamoli.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Rudraprayag',
      city: 'Rudraprayag', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-college-rudraprayag/government-college-rudraprayag.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Dehradun',
      city: 'Dehradun', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-polytechnic-dehradun/government-polytechnic-dehradun.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Roorkee',
      city: 'Roorkee', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-polytechnic-roorkee/government-polytechnic-roorkee.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Haldwani',
      city: 'Haldwani', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-polytechnic-haldwani/government-polytechnic-haldwani.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Almora',
      city: 'Almora', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-polytechnic-almora/government-polytechnic-almora.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Pithoragarh',
      city: 'Pithoragarh', state: 'Uttarakhand', type: 'Government',
      score: 8.1, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttarakhand/government-polytechnic-pithoragarh/government-polytechnic-pithoragarh.html',
      rating: '4.3', accr: 'Government'
    },

    {
      name: 'Indian Institute of Science',
      city: 'Bangalore', state: 'Karnataka', type: 'Government / Deemed',
      score: 9.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/indian-institute-of-science/indian-institute-of-science.html',
      rating: '4.5', accr: 'Government / Deemed'
    },
    {
      name: 'Indian Institute of Technology Dharwad',
      city: 'Dharwad', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/indian-institute-of-technology-dharwad/indian-institute-of-technology-dharwad.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Surathkal',
      city: 'Surathkal', state: 'Karnataka', type: 'Government',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/national-institute-of-technology-surathkal/national-institute-of-technology-surathkal.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'University Visvesvaraya College of Engineering',
      city: 'Bangalore', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/university-visvesvaraya-college-of-engineering/university-visvesvaraya-college-of-engineering.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Christ University',
      city: 'Bangalore', state: 'Karnataka', type: 'Deemed',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/christ-university/christ-university.html',
      rating: '4.5', accr: 'Deemed'
    },
    {
      name: 'Xavier Institute of Management and Entrepreneurship',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/xavier-institute-of-management-and-entrepreneurship/xavier-institute-of-management-and-entrepreneurship.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Alliance University',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/alliance-university/alliance-university.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Jain University',
      city: 'Bangalore', state: 'Karnataka', type: 'Deemed',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/jain-university/jain-university.html',
      rating: '4.5', accr: 'Deemed'
    },
    {
      name: 'IFIM Business School',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/ifim-business-school/ifim-business-school.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'RV College of Engineering',
      city: 'Bangalore', state: 'Karnataka', type: 'Private Aided',
      score: 9.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/rv-college-of-engineering/rv-college-of-engineering.html',
      rating: '4.5', accr: 'Private Aided'
    },
    {
      name: 'BMS College of Engineering',
      city: 'Bangalore', state: 'Karnataka', type: 'Private Aided',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/bms-college-of-engineering/bms-college-of-engineering.html',
      rating: '4.5', accr: 'Private Aided'
    },
    {
      name: 'MS Ramaiah Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/ms-ramaiah-institute-of-technology/ms-ramaiah-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'PES University',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/pes-university/pes-university.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Dayananda Sagar College of Engineering',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/dayananda-sagar-college-of-engineering/dayananda-sagar-college-of-engineering.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Bangalore Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/bangalore-institute-of-technology/bangalore-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'JSS Science and Technology University',
      city: 'Mysore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/jss-science-and-technology-university/jss-science-and-technology-university.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Manipal Institute of Technology',
      city: 'Manipal', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/manipal-institute-of-technology/manipal-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Nitte Meenakshi Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/nitte-meenakshi-institute-of-technology/nitte-meenakshi-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'New Horizon College of Engineering',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/new-horizon-college-of-engineering/new-horizon-college-of-engineering.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Acharya Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/acharya-institute-of-technology/acharya-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'AMC Engineering College',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/amc-engineering-college/amc-engineering-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'BNM Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/bnm-institute-of-technology/bnm-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'CMR Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/cmr-institute-of-technology/cmr-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'East West Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/east-west-institute-of-technology/east-west-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Global Academy of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/global-academy-of-technology/global-academy-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'HKBK College of Engineering',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/hkbk-college-of-engineering/hkbk-college-of-engineering.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'KLE Technological University',
      city: 'Hubli', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/kle-technological-university/kle-technological-university.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'KLS Gogte Institute of Technology',
      city: 'Belagavi', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/kls-gogte-institute-of-technology/kls-gogte-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'MVJ College of Engineering',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/mvj-college-of-engineering/mvj-college-of-engineering.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Oxford College of Engineering',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/oxford-college-of-engineering/oxford-college-of-engineering.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Reva University',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/reva-university/reva-university.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'RNS Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/rns-institute-of-technology/rns-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'SJB Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/sjb-institute-of-technology/sjb-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Sir MVIT Bangalore',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/sir-mvit-bangalore/sir-mvit-bangalore.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'T John Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/t-john-institute-of-technology/t-john-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Don Bosco Institute of Technology',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/don-bosco-institute-of-technology/don-bosco-institute-of-technology.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'SDM College of Engineering',
      city: 'Dharwad', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/sdm-college-of-engineering/sdm-college-of-engineering.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Bangalore Medical College and Research Institute',
      city: 'Bangalore', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/bangalore-medical-college-and-research-institute/bangalore-medical-college-and-research-institute.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Mysore Medical College',
      city: 'Mysore', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/mysore-medical-college/mysore-medical-college.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Karnataka Institute of Medical Sciences',
      city: 'Hubli', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/karnataka-institute-of-medical-sciences/karnataka-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Vijayanagar Institute of Medical Sciences',
      city: 'Bellary', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/vijayanagar-institute-of-medical-sciences/vijayanagar-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'National Institute of Mental Health and Neurosciences',
      city: 'Bangalore', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/national-institute-of-mental-health-and-neurosciences/national-institute-of-mental-health-and-neurosciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Mandya Institute of Medical Sciences',
      city: 'Mandya', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/mandya-institute-of-medical-sciences/mandya-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Hassan Institute of Medical Sciences',
      city: 'Hassan', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/hassan-institute-of-medical-sciences/hassan-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Gulbarga Institute of Medical Sciences',
      city: 'Kalaburagi', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/gulbarga-institute-of-medical-sciences/gulbarga-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Bidar Institute of Medical Sciences',
      city: 'Bidar', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/bidar-institute-of-medical-sciences/bidar-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Shimoga Institute of Medical Sciences',
      city: 'Shivamogga', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/shimoga-institute-of-medical-sciences/shimoga-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Raichur Institute of Medical Sciences',
      city: 'Raichur', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/raichur-institute-of-medical-sciences/raichur-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Belagavi Institute of Medical Sciences',
      city: 'Belagavi', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/belagavi-institute-of-medical-sciences/belagavi-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Karwar Institute of Medical Sciences',
      city: 'Karwar', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/karwar-institute-of-medical-sciences/karwar-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Gadag Institute of Medical Sciences',
      city: 'Gadag', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/gadag-institute-of-medical-sciences/gadag-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Chikkamagaluru Institute of Medical Sciences',
      city: 'Chikkamagaluru', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/chikkamagaluru-institute-of-medical-sciences/chikkamagaluru-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Tumkur Institute of Medical Sciences',
      city: 'Tumkur', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/tumkur-institute-of-medical-sciences/tumkur-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Chamarajanagar Institute of Medical Sciences',
      city: 'Chamarajanagar', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/chamarajanagar-institute-of-medical-sciences/chamarajanagar-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'Koppal Institute of Medical Sciences',
      city: 'Koppal', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/koppal-institute-of-medical-sciences/koppal-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'St. John\'s Medical College',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/st-johns-medical-college/st-johns-medical-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Kasturba Medical College Manipal',
      city: 'Manipal', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/kasturba-medical-college-manipal/kasturba-medical-college-manipal.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Kasturba Medical College Mangalore',
      city: 'Mangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/kasturba-medical-college-mangalore/kasturba-medical-college-mangalore.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'JSS Medical College',
      city: 'Mysore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/jss-medical-college/jss-medical-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Kempegowda Institute of Medical Sciences',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/kempegowda-institute-of-medical-sciences/kempegowda-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'SDM Medical College Dharwad',
      city: 'Dharwad', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/sdm-medical-college-dharwad/sdm-medical-college-dharwad.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'AJ Institute of Medical Sciences',
      city: 'Mangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/aj-institute-of-medical-sciences/aj-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Father Muller Medical College',
      city: 'Mangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/father-muller-medical-college/father-muller-medical-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Yenepoya Medical College',
      city: 'Mangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/yenepoya-medical-college/yenepoya-medical-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'KVG Medical College',
      city: 'Sullia', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/kvg-medical-college/kvg-medical-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Sapthagiri Medical College',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/sapthagiri-medical-college/sapthagiri-medical-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Vydehi Institute of Medical Sciences',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/vydehi-institute-of-medical-sciences/vydehi-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'RajaRajeswari Medical College',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/rajarajeswari-medical-college/rajarajeswari-medical-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Akash Institute of Medical Sciences',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/akash-institute-of-medical-sciences/akash-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Adichunchanagiri Institute of Medical Sciences',
      city: 'Mandya', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/adichunchanagiri-institute-of-medical-sciences/adichunchanagiri-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Srinivas Institute of Medical Sciences',
      city: 'Mangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/srinivas-institute-of-medical-sciences/srinivas-institute-of-medical-sciences.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Navodaya Medical College',
      city: 'Raichur', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/navodaya-medical-college/navodaya-medical-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'KLE Society\'s Law College',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/kle-societys-law-college/kle-societys-law-college.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Christ University School of Law',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/christ-university-school-of-law/christ-university-school-of-law.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Karnataka State Law University',
      city: 'Hubli', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/karnataka-state-law-university/karnataka-state-law-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'University of Mysore',
      city: 'Mysore', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/university-of-mysore/university-of-mysore.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Karnataka University Dharwad',
      city: 'Dharwad', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/karnataka-university-dharwad/karnataka-university-dharwad.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Visvesvaraya Technological University',
      city: 'Belagavi', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/visvesvaraya-technological-university/visvesvaraya-technological-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Mangalore University',
      city: 'Mangalore', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/mangalore-university/mangalore-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Kuvempu University',
      city: 'Shimoga', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/kuvempu-university/kuvempu-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Presidency University Bangalore',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/presidency-university-bangalore/presidency-university-bangalore.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'CMR University',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/cmr-university/cmr-university.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Garden City University',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/garden-city-university/garden-city-university.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Dayananda Sagar University',
      city: 'Bangalore', state: 'Karnataka', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/dayananda-sagar-university/dayananda-sagar-university.html',
      rating: '4.5', accr: 'Private'
    },
    {
      name: 'Yenepoya University',
      city: 'Mangalore', state: 'Karnataka', type: 'Deemed',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/yenepoya-university/yenepoya-university.html',
      rating: '4.5', accr: 'Deemed'
    },
    {
      name: 'Nitte University',
      city: 'Mangalore', state: 'Karnataka', type: 'Deemed',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/nitte-university/nitte-university.html',
      rating: '4.5', accr: 'Deemed'
    },
    {
      name: 'Gulbarga University',
      city: 'Kalaburagi', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/gulbarga-university/gulbarga-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Tumkur University',
      city: 'Tumkur', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/tumkur-university/tumkur-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Davangere University',
      city: 'Davangere', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/davangere-university/davangere-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Rani Channamma University',
      city: 'Belagavi', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/rani-channamma-university/rani-channamma-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Akkamahadevi Women\'s University',
      city: 'Vijayapura', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/akkamahadevi-womens-university/akkamahadevi-womens-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Bengaluru North University',
      city: 'Kolar', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/bengaluru-north-university/bengaluru-north-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Bengaluru Central University',
      city: 'Bangalore', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/bengaluru-central-university/bengaluru-central-university.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Kannada University Hampi',
      city: 'Hampi', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/kannada-university-hampi/kannada-university-hampi.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Karnataka State Open University',
      city: 'Mysore', state: 'Karnataka', type: 'State Open',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/karnataka-state-open-university/karnataka-state-open-university.html',
      rating: '4.5', accr: 'State Open'
    },
    {
      name: 'Rajiv Gandhi University of Health Sciences',
      city: 'Bangalore', state: 'Karnataka', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/rajiv-gandhi-university-of-health-sciences/rajiv-gandhi-university-of-health-sciences.html',
      rating: '4.5', accr: 'State'
    },
    {
      name: 'Institute for Social and Economic Change',
      city: 'Bangalore', state: 'Karnataka', type: 'Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/institute-for-social-and-economic-change/institute-for-social-and-economic-change.html',
      rating: '4.5', accr: 'Autonomous'
    },
    {
      name: 'National Institute of Fashion Technology Bangalore',
      city: 'Bangalore', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/national-institute-of-fashion-technology-bangalore/national-institute-of-fashion-technology-bangalore.html',
      rating: '4.5', accr: 'Government'
    },
    {
      name: 'National Institute of Design Bangalore',
      city: 'Bangalore', state: 'Karnataka', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/national-institute-of-design-bangalore/national-institute-of-design-bangalore.html',
      rating: '4.5', accr: 'Government'
    },

    {
      name: 'University of Kashmir',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/university-of-kashmir/university-of-kashmir.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Sher-e-Kashmir University of Agricultural Sciences and Technology of Kashmir',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/sher-e-kashmir-university-of-agricultural-sciences-and-technology-of-kashmir/sher-e-kashmir-university-of-agricultural-sciences-and-technology-of-kashmir.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Sher-e-Kashmir University of Agricultural Sciences and Technology of Jammu',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/sher-e-kashmir-university-of-agricultural-sciences-and-technology-of-jammu/sher-e-kashmir-university-of-agricultural-sciences-and-technology-of-jammu.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Islamic University of Science and Technology',
      city: 'Awantipora', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/islamic-university-of-science-and-technology/islamic-university-of-science-and-technology.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Central University of Kashmir',
      city: 'Ganderbal', state: 'Jammu & Kashmir', type: 'Central',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/central-university-of-kashmir/central-university-of-kashmir.html',
      rating: '4.4', accr: 'Central'
    },
    {
      name: 'Cluster University Srinagar',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/cluster-university-srinagar/cluster-university-srinagar.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Cluster University Jammu',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/cluster-university-jammu/cluster-university-jammu.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'National Institute of Technology Srinagar',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/national-institute-of-technology-srinagar/national-institute-of-technology-srinagar.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Indian Institute of Technology Jammu',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/indian-institute-of-technology-jammu/indian-institute-of-technology-jammu.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government College of Engineering and Technology Jammu',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-college-of-engineering-and-technology-jammu/government-college-of-engineering-and-technology-jammu.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'SSM College of Engineering',
      city: 'Parihaspora', state: 'Jammu & Kashmir', type: 'Private',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/ssm-college-of-engineering/ssm-college-of-engineering.html',
      rating: '4.4', accr: 'Private'
    },
    {
      name: 'Islamia College of Science and Commerce',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/islamia-college-of-science-and-commerce/islamia-college-of-science-and-commerce.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Medical College Srinagar',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-medical-college-srinagar/government-medical-college-srinagar.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Medical College Jammu',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-medical-college-jammu/government-medical-college-jammu.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Sher-i-Kashmir Institute of Medical Sciences',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Autonomous',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/sher-i-kashmir-institute-of-medical-sciences/sher-i-kashmir-institute-of-medical-sciences.html',
      rating: '4.4', accr: 'Autonomous'
    },
    {
      name: 'Government Medical College Anantnag',
      city: 'Anantnag', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-medical-college-anantnag/government-medical-college-anantnag.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Medical College Baramulla',
      city: 'Baramulla', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-medical-college-baramulla/government-medical-college-baramulla.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Sri Pratap College Srinagar',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/sri-pratap-college-srinagar/sri-pratap-college-srinagar.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Amar Singh College Srinagar',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/amar-singh-college-srinagar/amar-singh-college-srinagar.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Gandhi Memorial College Srinagar',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Private Aided',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/gandhi-memorial-college-srinagar/gandhi-memorial-college-srinagar.html',
      rating: '4.4', accr: 'Private Aided'
    },
    {
      name: 'Women’s College Srinagar',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/womens-college-srinagar/womens-college-srinagar.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Women’s College Baramulla',
      city: 'Baramulla', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/womens-college-baramulla/womens-college-baramulla.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government College Anantnag',
      city: 'Anantnag', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-college-anantnag/government-college-anantnag.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government College Pulwama',
      city: 'Pulwama', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-college-pulwama/government-college-pulwama.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government College Kupwara',
      city: 'Kupwara', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-college-kupwara/government-college-kupwara.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government College Kulgam',
      city: 'Kulgam', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-college-kulgam/government-college-kulgam.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government College Bandipora',
      city: 'Bandipora', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-college-bandipora/government-college-bandipora.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'The Business School University of Jammu',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/the-business-school-university-of-jammu/the-business-school-university-of-jammu.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Department of Management Studies University of Kashmir',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/department-of-management-studies-university-of-kashmir/department-of-management-studies-university-of-kashmir.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'National Law University Jammu',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/national-law-university-jammu/national-law-university-jammu.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Faculty of Law University of Jammu',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/faculty-of-law-university-of-jammu/faculty-of-law-university-of-jammu.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'School of Law University of Kashmir',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'State',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/school-of-law-university-of-kashmir/school-of-law-university-of-kashmir.html',
      rating: '4.4', accr: 'State'
    },
    {
      name: 'Government Polytechnic Srinagar',
      city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-srinagar/government-polytechnic-srinagar.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Jammu',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-jammu/government-polytechnic-jammu.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Anantnag',
      city: 'Anantnag', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-anantnag/government-polytechnic-anantnag.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Baramulla',
      city: 'Baramulla', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-baramulla/government-polytechnic-baramulla.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Pulwama',
      city: 'Pulwama', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-pulwama/government-polytechnic-pulwama.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Kupwara',
      city: 'Kupwara', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-kupwara/government-polytechnic-kupwara.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Kulgam',
      city: 'Kulgam', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-kulgam/government-polytechnic-kulgam.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Bandipora',
      city: 'Bandipora', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-bandipora/government-polytechnic-bandipora.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Kathua',
      city: 'Kathua', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-kathua/government-polytechnic-kathua.html',
      rating: '4.4', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Udhampur',
      city: 'Udhampur', state: 'Jammu & Kashmir', type: 'Government',
      score: 8.7, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jammu-and-kashmir/government-polytechnic-udhampur/government-polytechnic-udhampur.html',
      rating: '4.4', accr: 'Government'
    },

    {
      name: 'Ranchi University',
      city: 'Ranchi', state: 'Jharkhand', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/ranchi-university/ranchi-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Sidho Kanho Birsha University',
      city: 'Purulia', state: 'Jharkhand', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/sidho-kanho-birsha-university/sidho-kanho-birsha-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Vinoba Bhave University',
      city: 'Hazaribagh', state: 'Jharkhand', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/vinoba-bhave-university/vinoba-bhave-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Kolhan University',
      city: 'Chaibasa', state: 'Jharkhand', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/kolhan-university/kolhan-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Nilamber Pitamber University',
      city: 'Palamu', state: 'Jharkhand', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/nilamber-pitamber-university/nilamber-pitamber-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Amity University Jharkhand',
      city: 'Ranchi', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/amity-university-jharkhand/amity-university-jharkhand.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Usha Martin University',
      city: 'Ranchi', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/usha-martin-university/usha-martin-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Sai Nath University',
      city: 'Ranchi', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/sai-nath-university/sai-nath-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Indian Institute of Technology Dhanbad',
      city: 'Dhanbad', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/indian-institute-of-technology-dhanbad/indian-institute-of-technology-dhanbad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Jamshedpur',
      city: 'Jamshedpur', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/national-institute-of-technology-jamshedpur/national-institute-of-technology-jamshedpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Birsa Institute of Technology Sindri',
      city: 'Dhanbad', state: 'Jharkhand', type: 'State Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/birsa-institute-of-technology-sindri/birsa-institute-of-technology-sindri.html',
      rating: '4.3', accr: 'State Government'
    },
    {
      name: 'RTC Institute of Technology',
      city: 'Ranchi', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/rtc-institute-of-technology/rtc-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Cambridge Institute of Technology Ranchi',
      city: 'Ranchi', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/cambridge-institute-of-technology-ranchi/cambridge-institute-of-technology-ranchi.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Maryland Institute of Technology and Management',
      city: 'Jamshedpur', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/maryland-institute-of-technology-and-management/maryland-institute-of-technology-and-management.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Netaji Subhas Institute of Business Management',
      city: 'Jamshedpur', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/netaji-subhas-institute-of-business-management/netaji-subhas-institute-of-business-management.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Techno India Ramgarh',
      city: 'Ramgarh', state: 'Jharkhand', type: 'PPP Mode',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/techno-india-ramgarh/techno-india-ramgarh.html',
      rating: '4.3', accr: 'PPP Mode'
    },
    {
      name: 'Ramgarh Engineering College',
      city: 'Ramgarh', state: 'Jharkhand', type: 'PPP Mode',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/ramgarh-engineering-college/ramgarh-engineering-college.html',
      rating: '4.3', accr: 'PPP Mode'
    },
    {
      name: 'Rajendra Institute of Medical Sciences',
      city: 'Ranchi', state: 'Jharkhand', type: 'Autonomous',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/rajendra-institute-of-medical-sciences/rajendra-institute-of-medical-sciences.html',
      rating: '4.3', accr: 'Autonomous'
    },
    {
      name: 'MGM Medical College Jamshedpur',
      city: 'Jamshedpur', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/mgm-medical-college-jamshedpur/mgm-medical-college-jamshedpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Patliputra Medical College Dhanbad',
      city: 'Dhanbad', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/patliputra-medical-college-dhanbad/patliputra-medical-college-dhanbad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Shaheed Nirmal Mahto Medical College',
      city: 'Dhanbad', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/shaheed-nirmal-mahto-medical-college/shaheed-nirmal-mahto-medical-college.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Palamu Medical College',
      city: 'Palamu', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/palamu-medical-college/palamu-medical-college.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Ranchi',
      city: 'Ranchi', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-ranchi/government-college-ranchi.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Jamshedpur',
      city: 'Jamshedpur', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-jamshedpur/government-college-jamshedpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Dhanbad',
      city: 'Dhanbad', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-dhanbad/government-college-dhanbad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Hazaribagh',
      city: 'Hazaribagh', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-hazaribagh/government-college-hazaribagh.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Bokaro',
      city: 'Bokaro', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-bokaro/government-college-bokaro.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Chaibasa',
      city: 'Chaibasa', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-chaibasa/government-college-chaibasa.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Palamu',
      city: 'Palamu', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-palamu/government-college-palamu.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Giridih',
      city: 'Giridih', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-giridih/government-college-giridih.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Dumka',
      city: 'Dumka', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-dumka/government-college-dumka.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government College Deoghar',
      city: 'Deoghar', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-college-deoghar/government-college-deoghar.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Xavier Institute of Social Service Ranchi',
      city: 'Ranchi', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/xavier-institute-of-social-service-ranchi/xavier-institute-of-social-service-ranchi.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Institute of Science and Management Ranchi',
      city: 'Ranchi', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/institute-of-science-and-management-ranchi/institute-of-science-and-management-ranchi.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Jharkhand Rai University School of Management',
      city: 'Ranchi', state: 'Jharkhand', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/jharkhand-rai-university-school-of-management/jharkhand-rai-university-school-of-management.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Faculty of Law Ranchi University',
      city: 'Ranchi', state: 'Jharkhand', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/faculty-of-law-ranchi-university/faculty-of-law-ranchi-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Government Polytechnic Ranchi',
      city: 'Ranchi', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-polytechnic-ranchi/government-polytechnic-ranchi.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Jamshedpur',
      city: 'Jamshedpur', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-polytechnic-jamshedpur/government-polytechnic-jamshedpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Dhanbad',
      city: 'Dhanbad', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-polytechnic-dhanbad/government-polytechnic-dhanbad.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Hazaribagh',
      city: 'Hazaribagh', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-polytechnic-hazaribagh/government-polytechnic-hazaribagh.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Bokaro',
      city: 'Bokaro', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-polytechnic-bokaro/government-polytechnic-bokaro.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Chaibasa',
      city: 'Chaibasa', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-polytechnic-chaibasa/government-polytechnic-chaibasa.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Dumka',
      city: 'Dumka', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-polytechnic-dumka/government-polytechnic-dumka.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Deoghar',
      city: 'Deoghar', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-polytechnic-deoghar/government-polytechnic-deoghar.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Palamu',
      city: 'Palamu', state: 'Jharkhand', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 88, nirf: 0,
      link: '../colleges/jharkhand/government-polytechnic-palamu/government-polytechnic-palamu.html',
      rating: '4.3', accr: 'Government'
    },

    {
      name: 'Himachal Pradesh University',
      city: 'Shimla', state: 'Himachal Pradesh', type: 'State',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/himachal-pradesh-university/himachal-pradesh-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Dr. Yashwant Singh Parmar University of Horticulture and Forestry',
      city: 'Nauni', state: 'Himachal Pradesh', type: 'State',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/dr-yashwant-singh-parmar-university-of-horticulture-and-forestry/dr-yashwant-singh-parmar-university-of-horticulture-and-forestry.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'CSK Himachal Pradesh Agricultural University',
      city: 'Palampur', state: 'Himachal Pradesh', type: 'State',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/csk-himachal-pradesh-agricultural-university/csk-himachal-pradesh-agricultural-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Jaypee University of Information Technology',
      city: 'Solan', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/jaypee-university-of-information-technology/jaypee-university-of-information-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Shoolini University',
      city: 'Solan', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/shoolini-university/shoolini-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Baddi University of Emerging Sciences and Technology',
      city: 'Baddi', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/baddi-university-of-emerging-sciences-and-technology/baddi-university-of-emerging-sciences-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Maharaja Agrasen University',
      city: 'Baddi', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/maharaja-agrasen-university/maharaja-agrasen-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Arni University',
      city: 'Kangra', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/arni-university/arni-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Career Point University Hamirpur',
      city: 'Hamirpur', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/career-point-university-hamirpur/career-point-university-hamirpur.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'National Institute of Technology Hamirpur',
      city: 'Hamirpur', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/national-institute-of-technology-hamirpur/national-institute-of-technology-hamirpur.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Indian Institute of Technology Mandi',
      city: 'Mandi', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/indian-institute-of-technology-mandi/indian-institute-of-technology-mandi.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Himachal Pradesh Technical University',
      city: 'Hamirpur', state: 'Himachal Pradesh', type: 'State',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/himachal-pradesh-technical-university/himachal-pradesh-technical-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Government Engineering College Hamirpur',
      city: 'Hamirpur', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-engineering-college-hamirpur/government-engineering-college-hamirpur.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Atal Bihari Vajpayee Government Institute of Engineering and Technology',
      city: 'Pragatinagar', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/atal-bihari-vajpayee-government-institute-of-engineering-and-technology/atal-bihari-vajpayee-government-institute-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Green Hills Engineering College',
      city: 'Kumarhatti', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/green-hills-engineering-college/green-hills-engineering-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'LR Institute of Engineering and Technology',
      city: 'Solan', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/lr-institute-of-engineering-and-technology/lr-institute-of-engineering-and-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Bahra University',
      city: 'Waknaghat', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/bahra-university/bahra-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'IEC University',
      city: 'Baddi', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/iec-university/iec-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Indus International University',
      city: 'Una', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/indus-international-university/indus-international-university.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Indira Gandhi Medical College Shimla',
      city: 'Shimla', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/indira-gandhi-medical-college-shimla/indira-gandhi-medical-college-shimla.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Dr. Rajendra Prasad Government Medical College',
      city: 'Tanda', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/dr-rajendra-prasad-government-medical-college/dr-rajendra-prasad-government-medical-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Pt. Jawahar Lal Nehru Government Medical College',
      city: 'Chamba', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/pt-jawahar-lal-nehru-government-medical-college/pt-jawahar-lal-nehru-government-medical-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Dr. Yashwant Singh Parmar Government Medical College',
      city: 'Nahan', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/dr-yashwant-singh-parmar-government-medical-college/dr-yashwant-singh-parmar-government-medical-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Maharishi Markandeshwar Medical College',
      city: 'Kumarhatti', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/maharishi-markandeshwar-medical-college/maharishi-markandeshwar-medical-college.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Government College Shimla',
      city: 'Shimla', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-shimla/government-college-shimla.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Dharamshala',
      city: 'Dharamshala', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-dharamshala/government-college-dharamshala.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Hamirpur',
      city: 'Hamirpur', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-hamirpur/government-college-hamirpur.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Mandi',
      city: 'Mandi', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-mandi/government-college-mandi.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Kullu',
      city: 'Kullu', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-kullu/government-college-kullu.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Una',
      city: 'Una', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-una/government-college-una.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Solan',
      city: 'Solan', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-solan/government-college-solan.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Kangra',
      city: 'Kangra', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-kangra/government-college-kangra.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Chamba',
      city: 'Chamba', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-chamba/government-college-chamba.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Sirmaur',
      city: 'Sirmaur', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-sirmaur/government-college-sirmaur.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Kinnaur',
      city: 'Kinnaur', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-kinnaur/government-college-kinnaur.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Lahaul & Spiti',
      city: 'Lahaul & Spiti', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-lahaul-spiti/government-college-lahaul-spiti.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Palampur',
      city: 'Palampur', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-palampur/government-college-palampur.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Nurpur',
      city: 'Nurpur', state: 'Himachal Pradesh', type: 'Government',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/government-college-nurpur/government-college-nurpur.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Institute of Management Studies Himachal Pradesh University',
      city: 'Shimla', state: 'Himachal Pradesh', type: 'State',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/institute-of-management-studies-himachal-pradesh-university/institute-of-management-studies-himachal-pradesh-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'Shoolini University School of Business',
      city: 'Solan', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/shoolini-university-school-of-business/shoolini-university-school-of-business.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Bahra University School of Management',
      city: 'Waknaghat', state: 'Himachal Pradesh', type: 'Private',
      score: 8.3, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/himachal-pradesh/bahra-university-school-of-management/bahra-university-school-of-management.html',
      rating: '4.2', accr: 'Private'
    },

    {
      name: 'Kurukshetra University',
      city: 'Kurukshetra', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/kurukshetra-university/kurukshetra-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Maharshi Dayanand University',
      city: 'Rohtak', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/maharshi-dayanand-university/maharshi-dayanand-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Chaudhary Devi Lal University',
      city: 'Sirsa', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/chaudhary-devi-lal-university/chaudhary-devi-lal-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Guru Jambheshwar University of Science and Technology',
      city: 'Hisar', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/guru-jambheshwar-university-of-science-and-technology/guru-jambheshwar-university-of-science-and-technology.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Indira Gandhi University Meerpur',
      city: 'Rewari', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/indira-gandhi-university-meerpur/indira-gandhi-university-meerpur.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Chaudhary Ranbir Singh University',
      city: 'Jind', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/chaudhary-ranbir-singh-university/chaudhary-ranbir-singh-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Ashoka University',
      city: 'Sonipat', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/ashoka-university/ashoka-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'O.P. Jindal Global University',
      city: 'Sonipat', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/op-jindal-global-university/op-jindal-global-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Amity University Haryana',
      city: 'Gurugram', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/amity-university-haryana/amity-university-haryana.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'National Institute of Technology Kurukshetra',
      city: 'Kurukshetra', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/national-institute-of-technology-kurukshetra/national-institute-of-technology-kurukshetra.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Deenbandhu Chhotu Ram University of Science and Technology',
      city: 'Murthal', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/deenbandhu-chhotu-ram-university-of-science-and-technology/deenbandhu-chhotu-ram-university-of-science-and-technology.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'YMCA University of Science and Technology',
      city: 'Faridabad', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/ymca-university-of-science-and-technology/ymca-university-of-science-and-technology.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'BML Munjal University',
      city: 'Gurugram', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/bml-munjal-university/bml-munjal-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Manav Rachna University',
      city: 'Faridabad', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/manav-rachna-university/manav-rachna-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'SRM University Haryana',
      city: 'Sonipat', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/srm-university-haryana/srm-university-haryana.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Geeta University Panipat',
      city: 'Panipat', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/geeta-university-panipat/geeta-university-panipat.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Panipat Institute of Engineering and Technology',
      city: 'Panipat', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/panipat-institute-of-engineering-and-technology/panipat-institute-of-engineering-and-technology.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Lingaya’s Vidyapeeth Faridabad',
      city: 'Faridabad', state: 'Haryana', type: 'Deemed',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/lingayas-vidyapeeth-faridabad/lingayas-vidyapeeth-faridabad.html',
      rating: '4.1', accr: 'Deemed'
    },
    {
      name: 'Pt. B. D. Sharma Post Graduate Institute of Medical Sciences',
      city: 'Rohtak', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/pt-b-d-sharma-post-graduate-institute-of-medical-sciences/pt-b-d-sharma-post-graduate-institute-of-medical-sciences.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Kalpana Chawla Government Medical College',
      city: 'Karnal', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/kalpana-chawla-government-medical-college/kalpana-chawla-government-medical-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Shaheed Hasan Khan Mewati Government Medical College',
      city: 'Nuh', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/shaheed-hasan-khan-mewati-government-medical-college/shaheed-hasan-khan-mewati-government-medical-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Maharaja Agrasen Medical College',
      city: 'Agroha', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/maharaja-agrasen-medical-college/maharaja-agrasen-medical-college.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Adesh Medical College',
      city: 'Kurukshetra', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/adesh-medical-college/adesh-medical-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Management Development Institute Gurgaon',
      city: 'Gurugram', state: 'Haryana', type: 'Autonomous',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/management-development-institute-gurgaon/management-development-institute-gurgaon.html',
      rating: '4.1', accr: 'Autonomous'
    },
    {
      name: 'Great Lakes Institute of Management Gurgaon',
      city: 'Gurugram', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/great-lakes-institute-of-management-gurgaon/great-lakes-institute-of-management-gurgaon.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Apeejay Stya University',
      city: 'Gurugram', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/apeejay-stya-university/apeejay-stya-university.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'IBS Gurgaon',
      city: 'Gurugram', state: 'Haryana', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/ibs-gurgaon/ibs-gurgaon.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Faculty of Law Kurukshetra University',
      city: 'Kurukshetra', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/faculty-of-law-kurukshetra-university/faculty-of-law-kurukshetra-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Faculty of Law Maharshi Dayanand University',
      city: 'Rohtak', state: 'Haryana', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/faculty-of-law-maharshi-dayanand-university/faculty-of-law-maharshi-dayanand-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Government College Hisar',
      city: 'Hisar', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-hisar/government-college-hisar.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Ambala',
      city: 'Ambala', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-ambala/government-college-ambala.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Karnal',
      city: 'Karnal', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-karnal/government-college-karnal.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Rohtak',
      city: 'Rohtak', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-rohtak/government-college-rohtak.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Panipat',
      city: 'Panipat', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-panipat/government-college-panipat.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Faridabad',
      city: 'Faridabad', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-faridabad/government-college-faridabad.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Bhiwani',
      city: 'Bhiwani', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-bhiwani/government-college-bhiwani.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Sirsa',
      city: 'Sirsa', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-sirsa/government-college-sirsa.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Jind',
      city: 'Jind', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-jind/government-college-jind.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Sonipat',
      city: 'Sonipat', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-college-sonipat/government-college-sonipat.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'DAV College Ambala',
      city: 'Ambala', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/dav-college-ambala/dav-college-ambala.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Hindu College Sonipat',
      city: 'Sonipat', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/hindu-college-sonipat/hindu-college-sonipat.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Vaish College Rohtak',
      city: 'Rohtak', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/vaish-college-rohtak/vaish-college-rohtak.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Aggarwal College Ballabgarh',
      city: 'Faridabad', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/aggarwal-college-ballabgarh/aggarwal-college-ballabgarh.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'SD College Ambala',
      city: 'Ambala', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/sd-college-ambala/sd-college-ambala.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Chhotu Ram College Rohtak',
      city: 'Rohtak', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/chhotu-ram-college-rohtak/chhotu-ram-college-rohtak.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Arya College Panipat',
      city: 'Panipat', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/arya-college-panipat/arya-college-panipat.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'DAV College Karnal',
      city: 'Karnal', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/dav-college-karnal/dav-college-karnal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'DAV College Hisar',
      city: 'Hisar', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/dav-college-hisar/dav-college-hisar.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'DAV College Yamunanagar',
      city: 'Yamunanagar', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/dav-college-yamunanagar/dav-college-yamunanagar.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'DAV College Kurukshetra',
      city: 'Kurukshetra', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/dav-college-kurukshetra/dav-college-kurukshetra.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'SD College Panipat',
      city: 'Panipat', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/sd-college-panipat/sd-college-panipat.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'SD College Karnal',
      city: 'Karnal', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/sd-college-karnal/sd-college-karnal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Guru Nanak College Yamunanagar',
      city: 'Yamunanagar', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/guru-nanak-college-yamunanagar/guru-nanak-college-yamunanagar.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'National College Sirsa',
      city: 'Sirsa', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/national-college-sirsa/national-college-sirsa.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Jat College Rohtak',
      city: 'Rohtak', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/jat-college-rohtak/jat-college-rohtak.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Jat College Hisar',
      city: 'Hisar', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/jat-college-hisar/jat-college-hisar.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Dayanand College Hisar',
      city: 'Hisar', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/dayanand-college-hisar/dayanand-college-hisar.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'KVA DAV College Karnal',
      city: 'Karnal', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/kva-dav-college-karnal/kva-dav-college-karnal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Indira Gandhi College Kaithal',
      city: 'Kaithal', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/indira-gandhi-college-kaithal/indira-gandhi-college-kaithal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Chaudhary Devi Lal College Sirsa',
      city: 'Sirsa', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/chaudhary-devi-lal-college-sirsa/chaudhary-devi-lal-college-sirsa.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Saraswati College Palwal',
      city: 'Palwal', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/saraswati-college-palwal/saraswati-college-palwal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Mahila College Hisar',
      city: 'Hisar', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/mahila-college-hisar/mahila-college-hisar.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'SD Mahila College Panipat',
      city: 'Panipat', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/sd-mahila-college-panipat/sd-mahila-college-panipat.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Kanya Mahavidyalaya Sonipat',
      city: 'Sonipat', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/kanya-mahavidyalaya-sonipat/kanya-mahavidyalaya-sonipat.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Kanya Mahavidyalaya Rohtak',
      city: 'Rohtak', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/kanya-mahavidyalaya-rohtak/kanya-mahavidyalaya-rohtak.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Arya Girls College Ambala',
      city: 'Ambala', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/arya-girls-college-ambala/arya-girls-college-ambala.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Hindu Girls College Sonipat',
      city: 'Sonipat', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/hindu-girls-college-sonipat/hindu-girls-college-sonipat.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Vaish Girls College Rohtak',
      city: 'Rohtak', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/vaish-girls-college-rohtak/vaish-girls-college-rohtak.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'DAV Girls College Karnal',
      city: 'Karnal', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/dav-girls-college-karnal/dav-girls-college-karnal.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Jat Girls College Panipat',
      city: 'Panipat', state: 'Haryana', type: 'Private Aided',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/jat-girls-college-panipat/jat-girls-college-panipat.html',
      rating: '4.1', accr: 'Private Aided'
    },
    {
      name: 'Government Polytechnic Ambala',
      city: 'Ambala', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-ambala/government-polytechnic-ambala.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Sonipat',
      city: 'Sonipat', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-sonipat/government-polytechnic-sonipat.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Hisar',
      city: 'Hisar', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-hisar/government-polytechnic-hisar.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Rohtak',
      city: 'Rohtak', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-rohtak/government-polytechnic-rohtak.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Karnal',
      city: 'Karnal', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-karnal/government-polytechnic-karnal.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Panipat',
      city: 'Panipat', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-panipat/government-polytechnic-panipat.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Sirsa',
      city: 'Sirsa', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-sirsa/government-polytechnic-sirsa.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Bhiwani',
      city: 'Bhiwani', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-bhiwani/government-polytechnic-bhiwani.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Yamunanagar',
      city: 'Yamunanagar', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-yamunanagar/government-polytechnic-yamunanagar.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Faridabad',
      city: 'Faridabad', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-faridabad/government-polytechnic-faridabad.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Jhajjar',
      city: 'Jhajjar', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-jhajjar/government-polytechnic-jhajjar.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Jind',
      city: 'Jind', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-jind/government-polytechnic-jind.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Kaithal',
      city: 'Kaithal', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-kaithal/government-polytechnic-kaithal.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Rewari',
      city: 'Rewari', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-rewari/government-polytechnic-rewari.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Palwal',
      city: 'Palwal', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-palwal/government-polytechnic-palwal.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Narnaul',
      city: 'Narnaul', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-narnaul/government-polytechnic-narnaul.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Kurukshetra',
      city: 'Kurukshetra', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-kurukshetra/government-polytechnic-kurukshetra.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Ambala City',
      city: 'Ambala City', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-ambala-city/government-polytechnic-ambala-city.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Bahadurgarh',
      city: 'Bahadurgarh', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-bahadurgarh/government-polytechnic-bahadurgarh.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Hansi',
      city: 'Hansi', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-hansi/government-polytechnic-hansi.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Fatehabad',
      city: 'Fatehabad', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-fatehabad/government-polytechnic-fatehabad.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Tohana',
      city: 'Tohana', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-tohana/government-polytechnic-tohana.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Narwana',
      city: 'Narwana', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-narwana/government-polytechnic-narwana.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Gohana',
      city: 'Gohana', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-gohana/government-polytechnic-gohana.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Safidon',
      city: 'Safidon', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-safidon/government-polytechnic-safidon.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Charkhi Dadri',
      city: 'Charkhi Dadri', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-charkhi-dadri/government-polytechnic-charkhi-dadri.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Meham',
      city: 'Meham', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-meham/government-polytechnic-meham.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Samalkha',
      city: 'Samalkha', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-samalkha/government-polytechnic-samalkha.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Kalka',
      city: 'Kalka', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-kalka/government-polytechnic-kalka.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Radaur',
      city: 'Radaur', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-radaur/government-polytechnic-radaur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Jagadhri',
      city: 'Jagadhri', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-jagadhri/government-polytechnic-jagadhri.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Barwala',
      city: 'Barwala', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-barwala/government-polytechnic-barwala.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Ellenabad',
      city: 'Ellenabad', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-ellenabad/government-polytechnic-ellenabad.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Dabwali',
      city: 'Dabwali', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-dabwali/government-polytechnic-dabwali.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Siwani',
      city: 'Siwani', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-siwani/government-polytechnic-siwani.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Tosham',
      city: 'Tosham', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-tosham/government-polytechnic-tosham.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Loharu',
      city: 'Loharu', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-loharu/government-polytechnic-loharu.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Nuh',
      city: 'Nuh', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-nuh/government-polytechnic-nuh.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Ferozepur Jhirka',
      city: 'Ferozepur Jhirka', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-ferozepur-jhirka/government-polytechnic-ferozepur-jhirka.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Tauru',
      city: 'Tauru', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-tauru/government-polytechnic-tauru.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Sohna',
      city: 'Sohna', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-sohna/government-polytechnic-sohna.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Hathin',
      city: 'Hathin', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-hathin/government-polytechnic-hathin.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Pataudi',
      city: 'Pataudi', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-pataudi/government-polytechnic-pataudi.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Hodal',
      city: 'Hodal', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-hodal/government-polytechnic-hodal.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Kosli',
      city: 'Kosli', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-kosli/government-polytechnic-kosli.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Mahendragarh',
      city: 'Mahendragarh', state: 'Haryana', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/haryana/government-polytechnic-mahendragarh/government-polytechnic-mahendragarh.html',
      rating: '4.1', accr: 'Government'
    },
\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: 'Gujarat', type: '${col.type}',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/gujarat/${collegeSlug}/${collegeSlug}.html',
      rating: '4.2', accr: '${col.type}'
    },\n
    {
      name: 'Indian Institute of Information Technology Allahabad',
      city: 'Prayagraj', state: 'Uttar Pradesh', type: 'Government (CFTI)',
      score: 8.9, totalFees: 'Variable', avgPackage: '28-34 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/uttar-pradesh/indian-institute-of-information-technology-allahabad/indian-institute-of-information-technology-allahabad.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Gwalior',
      city: 'Gwalior', state: 'Madhya Pradesh', type: 'Government (CFTI)',
      score: 8.9, totalFees: 'Variable', avgPackage: '28-34 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/madhya-pradesh/indian-institute-of-information-technology-gwalior/indian-institute-of-information-technology-gwalior.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Jabalpur',
      city: 'Jabalpur', state: 'Madhya Pradesh', type: 'Government (CFTI)',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/madhya-pradesh/indian-institute-of-information-technology-jabalpur/indian-institute-of-information-technology-jabalpur.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Kancheepuram',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Government (CFTI)',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/tamil-nadu/indian-institute-of-information-technology-kancheepuram/indian-institute-of-information-technology-kancheepuram.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Kurnool',
      city: 'Kurnool', state: 'Andhra Pradesh', type: 'Government (CFTI)',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/andhra-pradesh/indian-institute-of-information-technology-kurnool/indian-institute-of-information-technology-kurnool.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Guwahati',
      city: 'Guwahati', state: 'Assam', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/assam/indian-institute-of-information-technology-guwahati/indian-institute-of-information-technology-guwahati.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Una',
      city: 'Una', state: 'Himachal Pradesh', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/himachal-pradesh/indian-institute-of-information-technology-una/indian-institute-of-information-technology-una.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Kota',
      city: 'Kota', state: 'Rajasthan', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/rajasthan/indian-institute-of-information-technology-kota/indian-institute-of-information-technology-kota.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Sonepat',
      city: 'Sonipat', state: 'Haryana', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/haryana/indian-institute-of-information-technology-sonepat/indian-institute-of-information-technology-sonepat.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Kalyani',
      city: 'Kalyani', state: 'West Bengal', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/west-bengal/indian-institute-of-information-technology-kalyani/indian-institute-of-information-technology-kalyani.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Lucknow',
      city: 'Lucknow', state: 'Uttar Pradesh', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '28-34 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/uttar-pradesh/indian-institute-of-information-technology-lucknow/indian-institute-of-information-technology-lucknow.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Dharwad',
      city: 'Dharwad', state: 'Karnataka', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/karnataka/indian-institute-of-information-technology-dharwad/indian-institute-of-information-technology-dharwad.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Pune',
      city: 'Pune', state: 'Maharashtra', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/maharashtra/indian-institute-of-information-technology-pune/indian-institute-of-information-technology-pune.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Nagpur',
      city: 'Nagpur', state: 'Maharashtra', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/maharashtra/indian-institute-of-information-technology-nagpur/indian-institute-of-information-technology-nagpur.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Bhopal',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/madhya-pradesh/indian-institute-of-information-technology-bhopal/indian-institute-of-information-technology-bhopal.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Surat',
      city: 'Surat', state: 'Gujarat', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/gujarat/indian-institute-of-information-technology-surat/indian-institute-of-information-technology-surat.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Vadodara',
      city: 'Vadodara', state: 'Gujarat', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/gujarat/indian-institute-of-information-technology-vadodara/indian-institute-of-information-technology-vadodara.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Bhagalpur',
      city: 'Bhagalpur', state: 'Bihar', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/bihar/indian-institute-of-information-technology-bhagalpur/indian-institute-of-information-technology-bhagalpur.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Manipur',
      city: 'Senapati', state: 'Manipur', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/manipur/indian-institute-of-information-technology-manipur/indian-institute-of-information-technology-manipur.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Ranchi',
      city: 'Ranchi', state: 'Jharkhand', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/jharkhand/indian-institute-of-information-technology-ranchi/indian-institute-of-information-technology-ranchi.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Senapati',
      city: 'Senapati', state: 'Manipur', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/manipur/indian-institute-of-information-technology-senapati/indian-institute-of-information-technology-senapati.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Tiruchirappalli',
      city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/tamil-nadu/indian-institute-of-information-technology-tiruchirappalli/indian-institute-of-information-technology-tiruchirappalli.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Raichur',
      city: 'Raichur', state: 'Karnataka', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/karnataka/indian-institute-of-information-technology-raichur/indian-institute-of-information-technology-raichur.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'Indian Institute of Information Technology Agartala',
      city: 'Agartala', state: 'Tripura', type: 'PPP Mode',
      score: 8.9, totalFees: 'Variable', avgPackage: '12-18 LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/tripura/indian-institute-of-information-technology-agartala/indian-institute-of-information-technology-agartala.html',
      rating: '4.4', accr: 'CFTI'
    },
    {
      name: 'International Institute of Information Technology Hyderabad',
      city: 'Hyderabad', state: 'Telangana', type: 'Not-for-Profit PPP',
      score: 9.7, totalFees: 'Variable', avgPackage: '32+ LPA',
      placementRate: 98, nirf: 0,
      link: '../colleges/telangana/international-institute-of-information-technology-hyderabad/international-institute-of-information-technology-hyderabad.html',
      rating: '4.9', accr: 'CFTI'
    },
\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n    {
      name: '${col.name.replace(/'/g, "\\'")}',
      city: '${col.city}', state: '${col.stateName}', type: '${col.type}',
      score: ${scoreNum}, totalFees: 'Variable', avgPackage: '${avgPkgStr}',
      placementRate: 98, nirf: 0,
      link: '../colleges/${col.stateDir}/${collegeSlug}/${collegeSlug}.html',
      rating: '${ratingNum}', accr: 'CFTI'
    },\n
    {
      name: 'National Law School of India University (NLSIU)',
      city: 'Bengaluru', state: 'Karnataka', type: 'Government Law',
      score: 9.8, totalFees: 'Variable', avgPackage: '16-20 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/karnataka/national-law-school-of-india-university/national-law-school-of-india-university.html',
      rating: '4.8', accr: 'BCI'
    },
    {
      name: 'National Academy of Legal Studies and Research (NALSAR)',
      city: 'Hyderabad', state: 'Telangana', type: 'Government Law',
      score: 9.8, totalFees: 'Variable', avgPackage: '16-20 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/telangana/national-academy-of-legal-studies-and-research/national-academy-of-legal-studies-and-research.html',
      rating: '4.8', accr: 'BCI'
    },
    {
      name: 'National Law Institute University (NLIU)',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Government Law',
      score: 9.8, totalFees: 'Variable', avgPackage: '16-20 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/madhya-pradesh/national-law-institute-university/national-law-institute-university.html',
      rating: '4.8', accr: 'BCI'
    },
    {
      name: 'National Law University Jodhpur (NLUJ)',
      city: 'Jodhpur', state: 'Rajasthan', type: 'Government Law',
      score: 9.8, totalFees: 'Variable', avgPackage: '16-20 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/rajasthan/national-law-university-jodhpur/national-law-university-jodhpur.html',
      rating: '4.8', accr: 'BCI'
    },
    {
      name: 'Gujarat National Law University (GNLU)',
      city: 'Gandhinagar', state: 'Gujarat', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/gujarat/gujarat-national-law-university/gujarat-national-law-university.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Dr. Ram Manohar Lohiya National Law University (RMLNLU)',
      city: 'Lucknow', state: 'Uttar Pradesh', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/uttar-pradesh/dr-ram-manohar-lohiya-national-law-university/dr-ram-manohar-lohiya-national-law-university.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Rajiv Gandhi National University of Law (RGNUL)',
      city: 'Patiala', state: 'Punjab', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/punjab/rajiv-gandhi-national-university-of-law/rajiv-gandhi-national-university-of-law.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Chanakya National Law University (CNLU)',
      city: 'Patna', state: 'Bihar', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/bihar/chanakya-national-law-university/chanakya-national-law-university.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'National University of Advanced Legal Studies (NUALS)',
      city: 'Kochi', state: 'Kerala', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/kerala/national-university-of-advanced-legal-studies/national-university-of-advanced-legal-studies.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'National Law University Odisha (NLUO)',
      city: 'Cuttack', state: 'Odisha', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/odisha/national-law-university-odisha/national-law-university-odisha.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'National University of Study and Research in Law (NUSRL)',
      city: 'Ranchi', state: 'Jharkhand', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/jharkhand/national-university-of-study-and-research-in-law/national-university-of-study-and-research-in-law.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'National Law University and Judicial Academy (NLUJAA)',
      city: 'Guwahati', state: 'Assam', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/assam/national-law-university-and-judicial-academy/national-law-university-and-judicial-academy.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Damodaram Sanjivayya National Law University (DSNLU)',
      city: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/andhra-pradesh/damodaram-sanjivayya-national-law-university/damodaram-sanjivayya-national-law-university.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Tamil Nadu National Law University (TNNLU)',
      city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/tamil-nadu/tamil-nadu-national-law-university/tamil-nadu-national-law-university.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Maharashtra National Law University Mumbai (MNLU Mumbai)',
      city: 'Mumbai', state: 'Maharashtra', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/maharashtra/maharashtra-national-law-university-mumbai/maharashtra-national-law-university-mumbai.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Maharashtra National Law University Nagpur (MNLU Nagpur)',
      city: 'Nagpur', state: 'Maharashtra', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/maharashtra/maharashtra-national-law-university-nagpur/maharashtra-national-law-university-nagpur.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Maharashtra National Law University Aurangabad (MNLU Aurangabad)',
      city: 'Aurangabad', state: 'Maharashtra', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/maharashtra/maharashtra-national-law-university-aurangabad/maharashtra-national-law-university-aurangabad.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Himachal Pradesh National Law University (HPNLU)',
      city: 'Shimla', state: 'Himachal Pradesh', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/himachal-pradesh/himachal-pradesh-national-law-university/himachal-pradesh-national-law-university.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Dharmashastra National Law University (DNLU)',
      city: 'Jabalpur', state: 'Madhya Pradesh', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/madhya-pradesh/dharmashastra-national-law-university/dharmashastra-national-law-university.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'Dr. B. R. Ambedkar National Law University (DBRANLU)',
      city: 'Sonipat', state: 'Haryana', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/haryana/dr-b-r-ambedkar-national-law-university/dr-b-r-ambedkar-national-law-university.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'National Law University Tripura (NLUT)',
      city: 'Agartala', state: 'Tripura', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/tripura/national-law-university-tripura/national-law-university-tripura.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'National Law University Meghalaya (NLU Meghalaya)',
      city: 'Shillong', state: 'Meghalaya', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/meghalaya/national-law-university-meghalaya/national-law-university-meghalaya.html',
      rating: '4.4', accr: 'BCI'
    },
    {
      name: 'National Law University Delhi (NLUD)',
      city: 'New Delhi', state: 'Delhi', type: 'Government Law',
      score: 9.8, totalFees: 'Variable', avgPackage: '16-20 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/delhi/national-law-university-delhi/national-law-university-delhi.html',
      rating: '4.8', accr: 'BCI'
    },
    {
      name: 'National Law University Goa (NLU Goa)',
      city: 'Dharbandora', state: 'Goa', type: 'Government Law',
      score: 8.8, totalFees: 'Variable', avgPackage: '8-14 LPA',
      placementRate: 95, nirf: 0,
      link: '../colleges/goa/national-law-university-goa/national-law-university-goa.html',
      rating: '4.4', accr: 'BCI'
    },

    {
      name: 'Indian Institute of Management Ahmedabad (IIMA)',
      city: 'Ahmedabad', state: 'Gujarat', type: 'Government Autonomous',
      score: 9.8, totalFees: 'Variable', avgPackage: '30+ LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/gujarat/indian-institute-of-management-ahmedabad/indian-institute-of-management-ahmedabad.html',
      rating: '4.9', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Bangalore (IIMB)',
      city: 'Bengaluru', state: 'Karnataka', type: 'Government Autonomous',
      score: 9.8, totalFees: 'Variable', avgPackage: '30+ LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/karnataka/indian-institute-of-management-bangalore/indian-institute-of-management-bangalore.html',
      rating: '4.9', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Calcutta (IIMC)',
      city: 'Kolkata', state: 'West Bengal', type: 'Government Autonomous',
      score: 9.8, totalFees: 'Variable', avgPackage: '30+ LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/west-bengal/indian-institute-of-management-calcutta/indian-institute-of-management-calcutta.html',
      rating: '4.9', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Lucknow (IIML)',
      city: 'Lucknow', state: 'Uttar Pradesh', type: 'Government Autonomous',
      score: 9.8, totalFees: 'Variable', avgPackage: '30+ LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/uttar-pradesh/indian-institute-of-management-lucknow/indian-institute-of-management-lucknow.html',
      rating: '4.9', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Kozhikode (IIMK)',
      city: 'Kozhikode', state: 'Kerala', type: 'Government Autonomous',
      score: 9.8, totalFees: 'Variable', avgPackage: '30+ LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/kerala/indian-institute-of-management-kozhikode/indian-institute-of-management-kozhikode.html',
      rating: '4.9', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Indore (IIMI)',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Government Autonomous',
      score: 9.8, totalFees: 'Variable', avgPackage: '30+ LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/madhya-pradesh/indian-institute-of-management-indore/indian-institute-of-management-indore.html',
      rating: '4.9', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Shillong (IIM Shillong)',
      city: 'Shillong', state: 'Meghalaya', type: 'Government Autonomous',
      score: 9, totalFees: 'Variable', avgPackage: '18-25 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/meghalaya/indian-institute-of-management-shillong/indian-institute-of-management-shillong.html',
      rating: '4.6', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Rohtak (IIM Rohtak)',
      city: 'Rohtak', state: 'Haryana', type: 'Government Autonomous',
      score: 9, totalFees: 'Variable', avgPackage: '18-25 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/haryana/indian-institute-of-management-rohtak/indian-institute-of-management-rohtak.html',
      rating: '4.6', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Ranchi (IIM Ranchi)',
      city: 'Ranchi', state: 'Jharkhand', type: 'Government Autonomous',
      score: 9, totalFees: 'Variable', avgPackage: '18-25 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/jharkhand/indian-institute-of-management-ranchi/indian-institute-of-management-ranchi.html',
      rating: '4.6', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Raipur (IIM Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government Autonomous',
      score: 9, totalFees: 'Variable', avgPackage: '18-25 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/chhattisgarh/indian-institute-of-management-raipur/indian-institute-of-management-raipur.html',
      rating: '4.6', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Tiruchirappalli (IIM Trichy)',
      city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Government Autonomous',
      score: 9, totalFees: 'Variable', avgPackage: '18-25 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/tamil-nadu/indian-institute-of-management-tiruchirappalli/indian-institute-of-management-tiruchirappalli.html',
      rating: '4.6', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Udaipur (IIMU)',
      city: 'Udaipur', state: 'Rajasthan', type: 'Government Autonomous',
      score: 9, totalFees: 'Variable', avgPackage: '18-25 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/rajasthan/indian-institute-of-management-udaipur/indian-institute-of-management-udaipur.html',
      rating: '4.6', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Kashipur (IIM Kashipur)',
      city: 'Kashipur', state: 'Uttarakhand', type: 'Government Autonomous',
      score: 9, totalFees: 'Variable', avgPackage: '18-25 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/uttarakhand/indian-institute-of-management-kashipur/indian-institute-of-management-kashipur.html',
      rating: '4.6', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Amritsar (IIM Amritsar)',
      city: 'Amritsar', state: 'Punjab', type: 'Government Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: '15-18 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/punjab/indian-institute-of-management-amritsar/indian-institute-of-management-amritsar.html',
      rating: '4.3', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Bodh Gaya (IIM Bodh Gaya)',
      city: 'Bodh Gaya', state: 'Bihar', type: 'Government Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: '15-18 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/bihar/indian-institute-of-management-bodh-gaya/indian-institute-of-management-bodh-gaya.html',
      rating: '4.3', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Nagpur (IIM Nagpur)',
      city: 'Nagpur', state: 'Maharashtra', type: 'Government Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: '15-18 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/maharashtra/indian-institute-of-management-nagpur/indian-institute-of-management-nagpur.html',
      rating: '4.3', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Sambalpur (IIM Sambalpur)',
      city: 'Sambalpur', state: 'Odisha', type: 'Government Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: '15-18 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/odisha/indian-institute-of-management-sambalpur/indian-institute-of-management-sambalpur.html',
      rating: '4.3', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Sirmaur (IIM Sirmaur)',
      city: 'Sirmaur', state: 'Himachal Pradesh', type: 'Government Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: '15-18 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/himachal-pradesh/indian-institute-of-management-sirmaur/indian-institute-of-management-sirmaur.html',
      rating: '4.3', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Visakhapatnam (IIMV)',
      city: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'Government Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: '15-18 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/andhra-pradesh/indian-institute-of-management-visakhapatnam/indian-institute-of-management-visakhapatnam.html',
      rating: '4.3', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Jammu (IIM Jammu)',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'Government Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: '15-18 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/jammu-and-kashmir/indian-institute-of-management-jammu/indian-institute-of-management-jammu.html',
      rating: '4.3', accr: 'AMBA/EQUIS'
    },
    {
      name: 'Indian Institute of Management Mumbai (IIM Mumbai)',
      city: 'Mumbai', state: 'Maharashtra', type: 'Government Autonomous',
      score: 8.5, totalFees: 'Variable', avgPackage: '15-18 LPA',
      placementRate: 100, nirf: 0,
      link: '../colleges/maharashtra/indian-institute-of-management-mumbai/indian-institute-of-management-mumbai.html',
      rating: '4.3', accr: 'AMBA/EQUIS'
    },

    {
      name: 'University of Calcutta (CU)',
      city: 'Kolkata', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/university-of-calcutta/university-of-calcutta.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Jadavpur University (JU)',
      city: 'Kolkata', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/jadavpur-university/jadavpur-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Presidency University (PU)',
      city: 'Kolkata', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/presidency-university/presidency-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'University of Burdwan (BU)',
      city: 'Bardhaman', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/university-of-burdwan/university-of-burdwan.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'University of North Bengal (NBU)',
      city: 'Siliguri', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/university-of-north-bengal/university-of-north-bengal.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Kalyani University (KU)',
      city: 'Kalyani', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/kalyani-university/kalyani-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Vidyasagar University (VU)',
      city: 'Midnapore', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/vidyasagar-university/vidyasagar-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Rabindra Bharati University (RBU)',
      city: 'Kolkata', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/rabindra-bharati-university/rabindra-bharati-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'West Bengal State University (WBSU)',
      city: 'Barasat', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/west-bengal-state-university/west-bengal-state-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Aliah University (AU)',
      city: 'Kolkata', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/aliah-university/aliah-university.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Indian Institute of Technology Kharagpur (IIT Kharagpur)',
      city: 'Kharagpur', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/indian-institute-of-technology-kharagpur/indian-institute-of-technology-kharagpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Durgapur (NIT Durgapur)',
      city: 'Durgapur', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/national-institute-of-technology-durgapur/national-institute-of-technology-durgapur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Indian Institute of Engineering Science and Technology Shibpur (IIEST Shibpur)',
      city: 'Howrah', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/indian-institute-of-engineering-science-and-technology-shibpur/indian-institute-of-engineering-science-and-technology-shibpur.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Jadavpur University Faculty of Engineering (JU FOE)',
      city: 'Kolkata', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/jadavpur-university-faculty-of-engineering/jadavpur-university-faculty-of-engineering.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Heritage Institute of Technology (HITK)',
      city: 'Kolkata', state: 'West Bengal', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/heritage-institute-of-technology/heritage-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Haldia Institute of Technology (HIT Haldia)',
      city: 'Haldia', state: 'West Bengal', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/haldia-institute-of-technology/haldia-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Institute of Engineering and Management (IEM)',
      city: 'Kolkata', state: 'West Bengal', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/institute-of-engineering-and-management/institute-of-engineering-and-management.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Techno India University (TIU)',
      city: 'Kolkata', state: 'West Bengal', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/techno-india-university/techno-india-university.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Medical College and Hospital Kolkata (MCK)',
      city: 'Kolkata', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/medical-college-and-hospital-kolkata/medical-college-and-hospital-kolkata.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'RG Kar Medical College and Hospital (RGKMCH)',
      city: 'Kolkata', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/rg-kar-medical-college-and-hospital/rg-kar-medical-college-and-hospital.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Nil Ratan Sircar Medical College (NRSMC)',
      city: 'Kolkata', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/nil-ratan-sircar-medical-college/nil-ratan-sircar-medical-college.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Calcutta National Medical College (CNMC)',
      city: 'Kolkata', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/calcutta-national-medical-college/calcutta-national-medical-college.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Bankura Sammilani Medical College (BSMC)',
      city: 'Bankura', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/bankura-sammilani-medical-college/bankura-sammilani-medical-college.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'North Bengal Medical College (NBMC)',
      city: 'Siliguri', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/north-bengal-medical-college/north-bengal-medical-college.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Presidency College Kolkata (Presidency)',
      city: 'Kolkata', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/presidency-college-kolkata/presidency-college-kolkata.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'St. Xavier\'s College Kolkata (SXC Kolkata)',
      city: 'Kolkata', state: 'West Bengal', type: 'Autonomous',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/st-xaviers-college-kolkata/st-xaviers-college-kolkata.html',
      rating: '4.3', accr: 'Autonomous'
    },
    {
      name: 'Scottish Church College (SCC)',
      city: 'Kolkata', state: 'West Bengal', type: 'Private Aided',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/scottish-church-college/scottish-church-college.html',
      rating: '4.3', accr: 'Private Aided'
    },
    {
      name: 'Bethune College (BC)',
      city: 'Kolkata', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/bethune-college/bethune-college.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Lady Brabourne College (LBC)',
      city: 'Kolkata', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/lady-brabourne-college/lady-brabourne-college.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Maulana Azad College Kolkata (MAC)',
      city: 'Kolkata', state: 'West Bengal', type: 'Government',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/maulana-azad-college-kolkata/maulana-azad-college-kolkata.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'The West Bengal National University of Juridical Sciences (WBNUJS)',
      city: 'Kolkata', state: 'West Bengal', type: 'State',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/the-west-bengal-national-university-of-juridical-sciences/the-west-bengal-national-university-of-juridical-sciences.html',
      rating: '4.3', accr: 'State'
    },
    {
      name: 'Jogesh Chandra Chaudhuri Law College (JCCLC)',
      city: 'Kolkata', state: 'West Bengal', type: 'Private',
      score: 8.6, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/west-bengal/jogesh-chandra-chaudhuri-law-college/jogesh-chandra-chaudhuri-law-college.html',
      rating: '4.3', accr: 'Private'
    },

    {
      name: 'Manipal Academy of Higher Education (MAHE)',
      city: 'Manipal', state: 'Karnataka', type: 'Private Deemed',
      score: 9.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/manipal-academy-of-higher-education/manipal-academy-of-higher-education.html',
      rating: '4.6', accr: 'Private Deemed'
    },
    {
      name: 'Manipal University Jaipur (MUJ)',
      city: 'Jaipur', state: 'Rajasthan', type: 'Private',
      score: 9.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/rajasthan/manipal-university-jaipur/manipal-university-jaipur.html',
      rating: '4.6', accr: 'Private'
    },
    {
      name: 'Manipal University Sikkim (SMU)',
      city: 'Gangtok', state: 'Sikkim', type: 'Private',
      score: 9.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/sikkim/manipal-university-sikkim/manipal-university-sikkim.html',
      rating: '4.6', accr: 'Private'
    },
    {
      name: 'TAPMI Bengaluru Campus (TAPMI)',
      city: 'Bengaluru', state: 'Karnataka', type: 'Private',
      score: 9.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/karnataka/tapmi-bengaluru-campus/tapmi-bengaluru-campus.html',
      rating: '4.6', accr: 'Private'
    },
    {
      name: 'Manipal Tata Medical College (MTMC)',
      city: 'Jamshedpur', state: 'Jharkhand', type: 'Private',
      score: 9.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 90, nirf: 0,
      link: '../colleges/jharkhand/manipal-tata-medical-college/manipal-tata-medical-college.html',
      rating: '4.6', accr: 'Private'
    },

    {
      name: 'Goa University (GU)',
      city: 'Taleigao', state: 'Goa', type: 'State',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-university/goa-university.html',
      rating: '4.2', accr: 'State'
    },
    {
      name: 'BITS Pilani Goa Campus (BITS Goa)',
      city: 'Zuarinagar', state: 'Goa', type: 'Private Deemed',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/bits-pilani-goa-campus/bits-pilani-goa-campus.html',
      rating: '4.2', accr: 'Private Deemed'
    },
    {
      name: 'Goa College of Engineering (GEC)',
      city: 'Farmagudi', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-college-of-engineering/goa-college-of-engineering.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Don Bosco College of Engineering (DBCE)',
      city: 'Fatorda', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/don-bosco-college-of-engineering/don-bosco-college-of-engineering.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Shree Rayeshwar Institute of Engineering and Information Technology (SRIEIT)',
      city: 'Shiroda', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/shree-rayeshwar-institute-of-engineering-and-information-technology/shree-rayeshwar-institute-of-engineering-and-information-technology.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Agnel Institute of Technology and Design (AITD)',
      city: 'Assagao', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/agnel-institute-of-technology-and-design/agnel-institute-of-technology-and-design.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Padre Conceicao College of Engineering (PCCE)',
      city: 'Verna', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/padre-conceicao-college-of-engineering/padre-conceicao-college-of-engineering.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Goa Medical College (GMC)',
      city: 'Bambolim', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-medical-college/goa-medical-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Goa Dental College and Hospital (GDC)',
      city: 'Bambolim', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-dental-college-and-hospital/goa-dental-college-and-hospital.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Goa College of Pharmacy (GCP)',
      city: 'Panaji', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-college-of-pharmacy/goa-college-of-pharmacy.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Institute of Nursing Education (INE Goa)',
      city: 'Bambolim', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/institute-of-nursing-education/institute-of-nursing-education.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Goa College of Homeopathy (GCH)',
      city: 'Shiroda', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-college-of-homeopathy/goa-college-of-homeopathy.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Dhempe College of Arts and Science (DCAS)',
      city: 'Miramar', state: 'Goa', type: 'Private Aided',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/dhempe-college-of-arts-and-science/dhempe-college-of-arts-and-science.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'St. Xavier\'s College Mapusa (SXC Mapusa)',
      city: 'Mapusa', state: 'Goa', type: 'Private Aided',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/st-xaviers-college-mapusa/st-xaviers-college-mapusa.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'Parvatibai Chowgule College of Arts and Science (Chowgule College)',
      city: 'Margao', state: 'Goa', type: 'Autonomous',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/parvatibai-chowgule-college-of-arts-and-science/parvatibai-chowgule-college-of-arts-and-science.html',
      rating: '4.2', accr: 'Autonomous'
    },
    {
      name: 'Rosary College of Commerce and Arts (RCCA)',
      city: 'Navelim', state: 'Goa', type: 'Private Aided',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/rosary-college-of-commerce-and-arts/rosary-college-of-commerce-and-arts.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'S.S. Dempo College of Commerce and Economics (Dempo College)',
      city: 'Cujira', state: 'Goa', type: 'Private Aided',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/ss-dempo-college-of-commerce-and-economics/ss-dempo-college-of-commerce-and-economics.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'Government College of Arts Science and Commerce Sanquelim (GCASCS)',
      city: 'Sanquelim', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/government-college-of-arts-science-and-commerce-sanquelim/government-college-of-arts-science-and-commerce-sanquelim.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Carmel College for Women Nuvem (CCW)',
      city: 'Nuvem', state: 'Goa', type: 'Private Aided',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/carmel-college-for-women-nuvem/carmel-college-for-women-nuvem.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'St. Joseph Vaz College Cortalim (SJVC)',
      city: 'Cortalim', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/st-joseph-vaz-college-cortalim/st-joseph-vaz-college-cortalim.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'VVM\'s Shree Damodar College of Commerce and Economics (Damodar College)',
      city: 'Margao', state: 'Goa', type: 'Private Aided',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/vvms-shree-damodar-college-of-commerce-and-economics/vvms-shree-damodar-college-of-commerce-and-economics.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'Government College Quepem (GC Quepem)',
      city: 'Quepem', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/government-college-quepem/government-college-quepem.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Pernem (GC Pernem)',
      city: 'Pernem', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/government-college-pernem/government-college-pernem.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College Khandola (GC Khandola)',
      city: 'Khandola', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/government-college-khandola/government-college-khandola.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government College of Commerce and Economics Borda (GCCE Borda)',
      city: 'Borda', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/government-college-of-commerce-and-economics-borda/government-college-of-commerce-and-economics-borda.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Narayan Zantye College of Commerce (NZCC)',
      city: 'Bicholim', state: 'Goa', type: 'Private Aided',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/narayan-zantye-college-of-commerce/narayan-zantye-college-of-commerce.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'Goa Multi Faculty College (GMFC)',
      city: 'Dharbandora', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-multi-faculty-college/goa-multi-faculty-college.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'V.M. Salgaocar College of Law (VMSCL)',
      city: 'Miramar', state: 'Goa', type: 'Private Aided',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/vm-salgaocar-college-of-law/vm-salgaocar-college-of-law.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'Government Law College Panaji (GLC Panaji)',
      city: 'Panaji', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/government-law-college-panaji/government-law-college-panaji.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Goa College of Architecture (GCA)',
      city: 'Altinho', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-college-of-architecture/goa-college-of-architecture.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Goa College of Art (GCA Art)',
      city: 'Altinho', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-college-of-art/goa-college-of-art.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Kala Academy College of Music (KACM)',
      city: 'Campal', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/kala-academy-college-of-music/kala-academy-college-of-music.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Institute of Hotel Management Goa (IHM Goa)',
      city: 'Porvorim', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/institute-of-hotel-management-goa/institute-of-hotel-management-goa.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Institute of Hospitality and Tourism Studies (IHTS)',
      city: 'Margao', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/institute-of-hospitality-and-tourism-studies/institute-of-hospitality-and-tourism-studies.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Government Polytechnic Panaji (GPP)',
      city: 'Altinho', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/government-polytechnic-panaji/government-polytechnic-panaji.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Bicholim (GPB)',
      city: 'Bicholim', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/government-polytechnic-bicholim/government-polytechnic-bicholim.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Curchorem (GPC)',
      city: 'Curchorem', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/government-polytechnic-curchorem/government-polytechnic-curchorem.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Agnel Polytechnic Verna (AP Verna)',
      city: 'Verna', state: 'Goa', type: 'Private Aided',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/agnel-polytechnic-verna/agnel-polytechnic-verna.html',
      rating: '4.2', accr: 'Private Aided'
    },
    {
      name: 'National Institute of Oceanography Goa (NIO)',
      city: 'Dona Paula', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/national-institute-of-oceanography-goa/national-institute-of-oceanography-goa.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Goa (NIT Goa)',
      city: 'Farmagudi', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/national-institute-of-technology-goa/national-institute-of-technology-goa.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Goa Institute of Management (GIM)',
      city: 'Sanquelim', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-institute-of-management/goa-institute-of-management.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Goa Business School (GBS)',
      city: 'Taleigao', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-business-school/goa-business-school.html',
      rating: '4.2', accr: 'Government'
    },
    {
      name: 'Xavier Institute of Management and Research Goa (XIMR)',
      city: 'Porvorim', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/xavier-institute-of-management-and-research-goa/xavier-institute-of-management-and-research-goa.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Goa Institute of Maritime Studies (GIMS)',
      city: 'Mormugao', state: 'Goa', type: 'Private',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/goa-institute-of-maritime-studies/goa-institute-of-maritime-studies.html',
      rating: '4.2', accr: 'Private'
    },
    {
      name: 'Institute of Shipbuilding Technology (ISBT)',
      city: 'Vasco da Gama', state: 'Goa', type: 'Government',
      score: 8.4, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 82, nirf: 0,
      link: '../colleges/goa/institute-of-shipbuilding-technology/institute-of-shipbuilding-technology.html',
      rating: '4.2', accr: 'Government'
    },

    {
      name: 'Guru Ghasidas Vishwavidyalaya (GGU)',
      city: 'Bilaspur', state: 'Chhattisgarh', type: 'Central',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/guru-ghasidas-vishwavidyalaya/guru-ghasidas-vishwavidyalaya.html',
      rating: '4.1', accr: 'Central'
    },
    {
      name: 'Pt. Ravishankar Shukla University (PRSU)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/pt-ravishankar-shukla-university/pt-ravishankar-shukla-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Indira Gandhi Krishi Vishwavidyalaya (IGKV)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/indira-gandhi-krishi-vishwavidyalaya/indira-gandhi-krishi-vishwavidyalaya.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Chhattisgarh Swami Vivekanand Technical University (CSVTU)',
      city: 'Bhilai', state: 'Chhattisgarh', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/chhattisgarh-swami-vivekanand-technical-university/chhattisgarh-swami-vivekanand-technical-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Hidayatullah National Law University (HNLU)',
      city: 'New Raipur', state: 'Chhattisgarh', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/hidayatullah-national-law-university/hidayatullah-national-law-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Pandit Sundarlal Sharma Open University (PSSOU)',
      city: 'Bilaspur', state: 'Chhattisgarh', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/pandit-sundarlal-sharma-open-university/pandit-sundarlal-sharma-open-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Ayush and Health Sciences University of Chhattisgarh (AHSU)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/ayush-and-health-sciences-university-of-chhattisgarh/ayush-and-health-sciences-university-of-chhattisgarh.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Kushabhau Thakre Patrakarita Avam Jansanchar Vishwavidyalaya (KTUJM)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'State',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/kushabhau-thakre-patrakarita-avam-jansanchar-vishwavidyalaya/kushabhau-thakre-patrakarita-avam-jansanchar-vishwavidyalaya.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Indian Institute of Technology Bhilai (IIT Bhilai)',
      city: 'Bhilai', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/indian-institute-of-technology-bhilai/indian-institute-of-technology-bhilai.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Raipur (NIT Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/national-institute-of-technology-raipur/national-institute-of-technology-raipur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Bhilai Institute of Technology (BIT)',
      city: 'Durg', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/bhilai-institute-of-technology/bhilai-institute-of-technology.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Rungta College of Engineering and Technology (RCET)',
      city: 'Bhilai', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/rungta-college-of-engineering-and-technology/rungta-college-of-engineering-and-technology.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Shri Shankaracharya Technical Campus (SSTC)',
      city: 'Bhilai', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/shri-shankaracharya-technical-campus/shri-shankaracharya-technical-campus.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Chhattisgarh Engineering College (CEC)',
      city: 'Durg', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/chhattisgarh-engineering-college/chhattisgarh-engineering-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'All India Institute of Medical Sciences Raipur (AIIMS Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/all-india-institute-of-medical-sciences-raipur/all-india-institute-of-medical-sciences-raipur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Pt. Jawahar Lal Nehru Memorial Medical College (JNMC)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/pt-jawahar-lal-nehru-memorial-medical-college/pt-jawahar-lal-nehru-memorial-medical-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Late Baliram Kashyap Memorial Government Medical College (GMC Jagdalpur)',
      city: 'Jagdalpur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/late-baliram-kashyap-memorial-government-medical-college/late-baliram-kashyap-memorial-government-medical-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Chhattisgarh Institute of Medical Sciences (CIMS)',
      city: 'Bilaspur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/chhattisgarh-institute-of-medical-sciences/chhattisgarh-institute-of-medical-sciences.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Medical College Rajnandgaon (GMC Rajnandgaon)',
      city: 'Rajnandgaon', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-medical-college-rajnandgaon/government-medical-college-rajnandgaon.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Science College Raipur (GSC Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-science-college-raipur/government-science-college-raipur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Durg (GC Durg)',
      city: 'Durg', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-college-durg/government-college-durg.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Bilaspur (GC Bilaspur)',
      city: 'Bilaspur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-college-bilaspur/government-college-bilaspur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Jagdalpur (GC Jagdalpur)',
      city: 'Jagdalpur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-college-jagdalpur/government-college-jagdalpur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Raigarh (GC Raigarh)',
      city: 'Raigarh', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-college-raigarh/government-college-raigarh.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Korba (GC Korba)',
      city: 'Korba', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-college-korba/government-college-korba.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Ambikapur (GC Ambikapur)',
      city: 'Ambikapur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-college-ambikapur/government-college-ambikapur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Dantewada (GC Dantewada)',
      city: 'Dantewada', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-college-dantewada/government-college-dantewada.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government College Kanker (GC Kanker)',
      city: 'Kanker', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-college-kanker/government-college-kanker.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Rungta Engineering College Raipur (REC Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/rungta-engineering-college-raipur/rungta-engineering-college-raipur.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Columbia Institute of Engineering and Technology Raipur (CIET)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/columbia-institute-of-engineering-and-technology-raipur/columbia-institute-of-engineering-and-technology-raipur.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'MATS University Raipur (MATS)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/mats-university-raipur/mats-university-raipur.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Amity University Raipur (Amity Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/amity-university-raipur/amity-university-raipur.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'ITM University Raipur (ITM Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/itm-university-raipur/itm-university-raipur.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Kalinga University Raipur (KU Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/kalinga-university-raipur/kalinga-university-raipur.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'ICFAI University Raipur (ICFAI Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/icfai-university-raipur/icfai-university-raipur.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Shri Rawatpura Sarkar University Raipur (SRU)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/shri-rawatpura-sarkar-university-raipur/shri-rawatpura-sarkar-university-raipur.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Government Dental College Raipur (GDC Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-dental-college-raipur/government-dental-college-raipur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Rungta Dental College Bhilai (RDC Bhilai)',
      city: 'Bhilai', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/rungta-dental-college-bhilai/rungta-dental-college-bhilai.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Raipur Institute of Technology (RITEE)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/raipur-institute-of-technology/raipur-institute-of-technology.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Shri Shankaracharya Institute of Medical Sciences (SSIMS)',
      city: 'Bhilai', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/shri-shankaracharya-institute-of-medical-sciences/shri-shankaracharya-institute-of-medical-sciences.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Rungta Institute of Pharmaceutical Sciences (RIPS)',
      city: 'Bhilai', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/rungta-institute-of-pharmaceutical-sciences/rungta-institute-of-pharmaceutical-sciences.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Columbia College of Pharmacy (CCP)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Private',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/columbia-college-of-pharmacy/columbia-college-of-pharmacy.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Government Ayurvedic College Raipur (GAC Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-ayurvedic-college-raipur/government-ayurvedic-college-raipur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Homeopathic Medical College Raipur (GHMC Raipur)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-homeopathic-medical-college-raipur/government-homeopathic-medical-college-raipur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Raipur Nursing College (RNC)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/raipur-nursing-college/raipur-nursing-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Government Polytechnic Raipur (GPR)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/government-polytechnic-raipur/government-polytechnic-raipur.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Bhilai Polytechnic College (BPC)',
      city: 'Bhilai', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/bhilai-polytechnic-college/bhilai-polytechnic-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Raigarh Polytechnic College (RPC)',
      city: 'Raigarh', state: 'Chhattisgarh', type: 'Government',
      score: 8.2, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 78, nirf: 0,
      link: '../colleges/chhattisgarh/raigarh-polytechnic-college/raigarh-polytechnic-college.html',
      rating: '4.1', accr: 'Government'
    },

    {
      name: 'Rajiv Gandhi University (RGU)',
      city: 'Itanagar', state: 'Arunachal Pradesh', type: 'Central',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/rajiv-gandhi-university/rajiv-gandhi-university.html',
      rating: '4.0', accr: 'Central'
    },
    {
      name: 'North Eastern Regional Institute of Science and Technology (NERIST)',
      city: 'Nirjuli', state: 'Arunachal Pradesh', type: 'Deemed',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/north-eastern-regional-institute-of-science-and-technology/north-eastern-regional-institute-of-science-and-technology.html',
      rating: '4.0', accr: 'Deemed'
    },
    {
      name: 'Arunachal University of Studies (AUS)',
      city: 'Namsai', state: 'Arunachal Pradesh', type: 'Private',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/arunachal-university-of-studies/arunachal-university-of-studies.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Himalayan University (HU)',
      city: 'Itanagar', state: 'Arunachal Pradesh', type: 'Private',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/himalayan-university/himalayan-university.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Indira Gandhi Technological and Medical Sciences University (IGTAMSU)',
      city: 'Ziro', state: 'Arunachal Pradesh', type: 'Private',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/indira-gandhi-technological-and-medical-sciences-university/indira-gandhi-technological-and-medical-sciences-university.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Venkateshwara Open University (VOU)',
      city: 'Itanagar', state: 'Arunachal Pradesh', type: 'Private',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/venkateshwara-open-university/venkateshwara-open-university.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Arunodaya University (AU)',
      city: 'Itanagar', state: 'Arunachal Pradesh', type: 'Private',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/arunodaya-university/arunodaya-university.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Apex Professional University (APU)',
      city: 'Pasighat', state: 'Arunachal Pradesh', type: 'Private',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/apex-professional-university/apex-professional-university.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'National Institute of Technology Arunachal Pradesh (NIT Arunachal Pradesh)',
      city: 'Jote', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/national-institute-of-technology-arunachal-pradesh/national-institute-of-technology-arunachal-pradesh.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Tomo Riba Institute of Health and Medical Sciences (TRIHMS)',
      city: 'Naharlagun', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/tomo-riba-institute-of-health-and-medical-sciences/tomo-riba-institute-of-health-and-medical-sciences.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Dera Natung Government College (DNGC)',
      city: 'Itanagar', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/dera-natung-government-college/dera-natung-government-college.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Jawaharlal Nehru College Pasighat (JNC Pasighat)',
      city: 'Pasighat', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/jawaharlal-nehru-college-pasighat/jawaharlal-nehru-college-pasighat.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Indira Gandhi Government College Tezu (IGGC)',
      city: 'Tezu', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/indira-gandhi-government-college-tezu/indira-gandhi-government-college-tezu.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government College Bomdila (GC Bomdila)',
      city: 'Bomdila', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/government-college-bomdila/government-college-bomdila.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government College Seppa (GC Seppa)',
      city: 'Seppa', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/government-college-seppa/government-college-seppa.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government College Ziro (GC Ziro)',
      city: 'Ziro', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/government-college-ziro/government-college-ziro.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government College Yachuli (GC Yachuli)',
      city: 'Yachuli', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/government-college-yachuli/government-college-yachuli.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government College Doimukh (GC Doimukh)',
      city: 'Doimukh', state: 'Arunachal Pradesh', type: 'Government',
      score: 8.0, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 75, nirf: 0,
      link: '../colleges/arunachal-pradesh/government-college-doimukh/government-college-doimukh.html',
      rating: '4.0', accr: 'Government'
    },

    {
      name: 'Indian Institute of Technology Delhi (IIT Delhi)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/indian-institute-of-technology-delhi/indian-institute-of-technology-delhi.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Delhi (NIT Delhi)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/national-institute-of-technology-delhi/national-institute-of-technology-delhi.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Delhi Technological University (DTU)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/delhi-technological-university/delhi-technological-university.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Netaji Subhas University of Technology (NSUT)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/netaji-subhas-university-of-technology/netaji-subhas-university-of-technology.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Indira Gandhi Delhi Technical University for Women (IGDTUW)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/indira-gandhi-delhi-technical-university-for-women/indira-gandhi-delhi-technical-university-for-women.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Indraprastha Institute of Information Technology Delhi (IIIT Delhi)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/indraprastha-institute-of-information-technology-delhi/indraprastha-institute-of-information-technology-delhi.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Jamia Millia Islamia Faculty of Engineering and Technology (JMI FET)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/jamia-millia-islamia-faculty-of-engineering-and-technology/jamia-millia-islamia-faculty-of-engineering-and-technology.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Maharaja Agrasen Institute of Technology (MAIT)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/maharaja-agrasen-institute-of-technology/maharaja-agrasen-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Bhagwan Parshuram Institute of Technology (BPIT)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/bhagwan-parshuram-institute-of-technology/bhagwan-parshuram-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Bharati Vidyapeeth College of Engineering (BVCOE)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/bharati-vidyapeeth-college-of-engineering/bharati-vidyapeeth-college-of-engineering.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'University School of Information, Communication & Technology (USICT)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/university-school-of-information-communication-technology/university-school-of-information-communication-technology.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'University School of Automation & Robotics (USAR)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/university-school-of-automation-robotics/university-school-of-automation-robotics.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'University School of Chemical Technology (USCT)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/university-school-of-chemical-technology/university-school-of-chemical-technology.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'University School of Biotechnology (USBT)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/university-school-of-biotechnology/university-school-of-biotechnology.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Northern India Engineering College (NIEC)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/northern-india-engineering-college/northern-india-engineering-college.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'HMR Institute of Technology & Management (HMRITM)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/hmr-institute-of-technology-management/hmr-institute-of-technology-management.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Guru Tegh Bahadur Institute of Technology (GTBIT)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/guru-tegh-bahadur-institute-of-technology/guru-tegh-bahadur-institute-of-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Ambedkar Institute of Advanced Communication Technologies & Research (AIACTR)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/ambedkar-institute-of-advanced-communication-technologies-research/ambedkar-institute-of-advanced-communication-technologies-research.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'Delhi Institute of Tool Engineering (DITE)',
      city: 'New Delhi', state: 'Delhi NCR', type: 'Government',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/delhi-institute-of-tool-engineering/delhi-institute-of-tool-engineering.html',
      rating: '4.3', accr: 'Government'
    },
    {
      name: 'JIMS Engineering Management Technical Campus (JIMS EMTC)',
      city: 'Greater Noida', state: 'Delhi NCR', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/jims-engineering-management-technical-campus/jims-engineering-management-technical-campus.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Delhi Institute of Engineering & Technology (DIET)',
      city: 'Meerut', state: 'Delhi NCR', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/delhi-institute-of-engineering-technology/delhi-institute-of-engineering-technology.html',
      rating: '4.3', accr: 'Private'
    },
    {
      name: 'Lingaya’s Vidyapeeth (Lingayas)',
      city: 'Faridabad', state: 'Delhi NCR', type: 'Private',
      score: 8.8, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/lingayas-vidyapeeth/lingayas-vidyapeeth.html',
      rating: '4.3', accr: 'Private'
    },

    {
      name: 'Central University of Andhra Pradesh (CUAP)',
      city: 'Anantapur', state: 'Andhra Pradesh', type: 'Central',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/central-university-of-andhra-pradesh/central-university-of-andhra-pradesh.html',
      rating: '4.1', accr: 'Central'
    },
    {
      name: 'Central Tribal University of Andhra Pradesh (CTUAP)',
      city: 'Vizianagaram', state: 'Andhra Pradesh', type: 'Central',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/central-tribal-university-of-andhra-pradesh/central-tribal-university-of-andhra-pradesh.html',
      rating: '4.1', accr: 'Central'
    },
    {
      name: 'National Sanskrit University (NSU)',
      city: 'Tirupati', state: 'Andhra Pradesh', type: 'Central',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/national-sanskrit-university/national-sanskrit-university.html',
      rating: '4.1', accr: 'Central'
    },
    {
      name: 'Andhra University (AU)',
      city: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/andhra-university/andhra-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Acharya Nagarjuna University (ANU)',
      city: 'Guntur', state: 'Andhra Pradesh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/acharya-nagarjuna-university/acharya-nagarjuna-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Sri Venkateswara University (SVU)',
      city: 'Tirupati', state: 'Andhra Pradesh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/sri-venkateswara-university/sri-venkateswara-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Adikavi Nannaya University (AKNU)',
      city: 'Rajahmundry', state: 'Andhra Pradesh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/adikavi-nannaya-university/adikavi-nannaya-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dr. B. R. Ambedkar University (BRAU)',
      city: 'Srikakulam', state: 'Andhra Pradesh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/dr-b-r-ambedkar-university/dr-b-r-ambedkar-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Krishna University (KRU)',
      city: 'Machilipatnam', state: 'Andhra Pradesh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/krishna-university/krishna-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Rayalaseema University (RU)',
      city: 'Kurnool', state: 'Andhra Pradesh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/rayalaseema-university/rayalaseema-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Vikram Simhapuri University (VSU)',
      city: 'Nellore', state: 'Andhra Pradesh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/vikram-simhapuri-university/vikram-simhapuri-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Dr. YSR Architecture and Fine Arts University (YSRU)',
      city: 'Kadapa', state: 'Andhra Pradesh', type: 'State',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/dr-ysr-architecture-and-fine-arts-university/dr-ysr-architecture-and-fine-arts-university.html',
      rating: '4.1', accr: 'State'
    },
    {
      name: 'Indian Institute of Technology Tirupati (IIT Tirupati)',
      city: 'Tirupati', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/indian-institute-of-technology-tirupati/indian-institute-of-technology-tirupati.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'National Institute of Technology Andhra Pradesh (NIT AP)',
      city: 'Tadepalligudem', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/national-institute-of-technology-andhra-pradesh/national-institute-of-technology-andhra-pradesh.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Indian Institute of Information Technology Sri City (IIIT Sri City)',
      city: 'Sri City', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/indian-institute-of-information-technology-sri-city/indian-institute-of-information-technology-sri-city.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'GITAM Institute of Technology (GITAM)',
      city: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/gitam-institute-of-technology/gitam-institute-of-technology.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Vignan\'s Foundation for Science, Technology and Research (VFSTR)',
      city: 'Guntur', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/vignans-foundation-for-science-technology-and-research/vignans-foundation-for-science-technology-and-research.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Sri Venkateswara College of Engineering (SVCE)',
      city: 'Tirupati', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/sri-venkateswara-college-of-engineering/sri-venkateswara-college-of-engineering.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Pragati Engineering College (PEC)',
      city: 'Surampalem', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/pragati-engineering-college/pragati-engineering-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'AIIMS Mangalagiri (AIIMS-M)',
      city: 'Mangalagiri', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/aiims-mangalagiri/aiims-mangalagiri.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Andhra Medical College (AMC)',
      city: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/andhra-medical-college/andhra-medical-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Guntur Medical College (GMC)',
      city: 'Guntur', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/guntur-medical-college/guntur-medical-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Kurnool Medical College (KMC)',
      city: 'Kurnool', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/kurnool-medical-college/kurnool-medical-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Rangaraya Medical College (RMC)',
      city: 'Kakinada', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/rangaraya-medical-college/rangaraya-medical-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Sri Venkateswara Medical College (SVMC)',
      city: 'Tirupati', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/sri-venkateswara-medical-college/sri-venkateswara-medical-college.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Narayana Medical College (NMC)',
      city: 'Nellore', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/narayana-medical-college/narayana-medical-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'NRI Medical College (NRIMC)',
      city: 'Chinakakani', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/nri-medical-college/nri-medical-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Alluri Sitarama Raju Academy of Medical Sciences (ASRAM)',
      city: 'Eluru', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/alluri-sitarama-raju-academy-of-medical-sciences/alluri-sitarama-raju-academy-of-medical-sciences.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Andhra University College of Pharmaceutical Sciences (AUCPS)',
      city: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/andhra-university-college-of-pharmaceutical-sciences/andhra-university-college-of-pharmaceutical-sciences.html',
      rating: '4.1', accr: 'Government'
    },
    {
      name: 'Apollo College of Pharmacy (ACP)',
      city: 'Chittoor', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/apollo-college-of-pharmacy/apollo-college-of-pharmacy.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Andhra Loyola College (ALC)',
      city: 'Vijayawada', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/andhra-loyola-college/andhra-loyola-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'Gayatri Vidya Parishad College (GVPC)',
      city: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/gayatri-vidya-parishad-college/gayatri-vidya-parishad-college.html',
      rating: '4.1', accr: 'Private'
    },
    {
      name: 'A.N.R. College (ANR)',
      city: 'Gudivada', state: 'Andhra Pradesh', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: 'Variable',
      placementRate: 80, nirf: 0,
      link: '../colleges/andhra-pradesh/anr-college/anr-college.html',
      rating: '4.1', accr: 'Private'
    },

    {
      name: 'St. Stephen’s College (SSC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/st-stephens-college/st-stephens-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Hindu College (HC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/hindu-college/hindu-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Miranda House (MH)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/miranda-house/miranda-house.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Shri Ram College of Commerce (SRCC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/shri-ram-college-of-commerce/shri-ram-college-of-commerce.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Hansraj College (HRC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/hansraj-college/hansraj-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Kirori Mal College (KMC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/kirori-mal-college/kirori-mal-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Ramjas College (RC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/ramjas-college/ramjas-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Daulat Ram College (DRC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/daulat-ram-college/daulat-ram-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Indraprastha College for Women (IPCW)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/indraprastha-college-for-women/indraprastha-college-for-women.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Sri Guru Tegh Bahadur Khalsa College (SGTB)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/sri-guru-tegh-bahadur-khalsa-college/sri-guru-tegh-bahadur-khalsa-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Shyam Lal College (SLC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/shyam-lal-college/shyam-lal-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Shyam Lal College (Evening) (SLC Eve)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/shyam-lal-college-evening/shyam-lal-college-evening.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Zakir Husain Delhi College (ZHDC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/zakir-husain-delhi-college/zakir-husain-delhi-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Zakir Husain Delhi College (Evening) (ZHDC Eve)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/zakir-husain-delhi-college-evening/zakir-husain-delhi-college-evening.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Satyawati College (SC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/satyawati-college/satyawati-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Satyawati College (Evening) (SC Eve)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/satyawati-college-evening/satyawati-college-evening.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Lady Shri Ram College (LSR)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/lady-shri-ram-college/lady-shri-ram-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Gargi College (GC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/gargi-college/gargi-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Maitreyi College (MC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/maitreyi-college/maitreyi-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Atma Ram Sanatan Dharma College (ARSD)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/atma-ram-sanatan-dharma-college/atma-ram-sanatan-dharma-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Deen Dayal Upadhyaya College (DDUC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/deen-dayal-upadhyaya-college/deen-dayal-upadhyaya-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Deshbandhu College (DC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/deshbandhu-college/deshbandhu-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Motilal Nehru College (MLNC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/motilal-nehru-college/motilal-nehru-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Motilal Nehru College (Evening) (MLNC Eve)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/motilal-nehru-college-evening/motilal-nehru-college-evening.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'P.G.D.A.V College (PGDAV)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/pgdav-college/pgdav-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'P.G.D.A.V College (Evening) (PGDAV Eve)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/pgdav-college-evening/pgdav-college-evening.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Ram Lal Anand College (RLA)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/ram-lal-anand-college/ram-lal-anand-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Sri Venkateswara College (SVC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/sri-venkateswara-college/sri-venkateswara-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'College of Vocational Studies (CVS)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/college-of-vocational-studies/college-of-vocational-studies.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Kamala Nehru College (KNC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/kamala-nehru-college/kamala-nehru-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Acharya Narendra Dev College (ANDC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/acharya-narendra-dev-college/acharya-narendra-dev-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Aditi Mahavidyalaya (AM)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/aditi-mahavidyalaya/aditi-mahavidyalaya.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Aryabhatta College (AC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/aryabhatta-college/aryabhatta-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Bhagini Nivedita College (BNC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/bhagini-nivedita-college/bhagini-nivedita-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Bhaskaracharya College of Applied Sciences (BCAS)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/bhaskaracharya-college-of-applied-sciences/bhaskaracharya-college-of-applied-sciences.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Bharati College (BC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/bharati-college/bharati-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'College of Art (CoA)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/college-of-art/college-of-art.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Delhi College of Arts & Commerce (DCAC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/delhi-college-of-arts-commerce/delhi-college-of-arts-commerce.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Dyal Singh College (DSC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/dyal-singh-college/dyal-singh-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Dyal Singh College (Evening) (DSC Eve)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/dyal-singh-college-evening/dyal-singh-college-evening.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Jesus & Mary College (JMC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/jesus-mary-college/jesus-mary-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Kalindi College (KC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/kalindi-college/kalindi-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Keshav Mahavidyalaya (KMV)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/keshav-mahavidyalaya/keshav-mahavidyalaya.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Lakshmibai College (LBC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/lakshmibai-college/lakshmibai-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Maharaja Agrasen College (MAC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/maharaja-agrasen-college/maharaja-agrasen-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Maharshi Valmiki College of Education (MVCE)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/maharshi-valmiki-college-of-education/maharshi-valmiki-college-of-education.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Mata Sundri College for Women (MSC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/mata-sundri-college-for-women/mata-sundri-college-for-women.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Rajdhani College (RC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/rajdhani-college/rajdhani-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Ramanujan College (RC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/ramanujan-college/ramanujan-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Shaheed Bhagat Singh College (SBSC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/shaheed-bhagat-singh-college/shaheed-bhagat-singh-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Shaheed Bhagat Singh College (Evening) (SBSC Eve)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/shaheed-bhagat-singh-college-evening/shaheed-bhagat-singh-college-evening.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Shaheed Rajguru College of Applied Sciences (SRCASW)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/shaheed-rajguru-college-of-applied-sciences/shaheed-rajguru-college-of-applied-sciences.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Shivaji College (SC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/shivaji-college/shivaji-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Sri Aurobindo College (SAC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/sri-aurobindo-college/sri-aurobindo-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Sri Aurobindo College (Evening) (SAC Eve)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/sri-aurobindo-college-evening/sri-aurobindo-college-evening.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Sri Guru Gobind Singh College of Commerce (SGGSCC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/sri-guru-gobind-singh-college-of-commerce/sri-guru-gobind-singh-college-of-commerce.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Swami Shraddhanand College (SSNC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/swami-shraddhanand-college/swami-shraddhanand-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Vivekananda College (VC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/vivekananda-college/vivekananda-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Dr. Bhim Rao Ambedkar College (BRAC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/dr-bhim-rao-ambedkar-college/dr-bhim-rao-ambedkar-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Indira Gandhi Institute of Physical Education (IGIPESS)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/indira-gandhi-institute-of-physical-education/indira-gandhi-institute-of-physical-education.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Institute of Home Economics (IHE)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/institute-of-home-economics/institute-of-home-economics.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Lady Irwin College (LIC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/lady-irwin-college/lady-irwin-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'School of Open Learning (SOL)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/school-of-open-learning/school-of-open-learning.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Non-Collegiate Women’s Education Board (NCWEB)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/non-collegiate-womens-education-board/non-collegiate-womens-education-board.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Lady Hardinge Medical College (LHMC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/lady-hardinge-medical-college/lady-hardinge-medical-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Maulana Azad Medical College (MAMC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/maulana-azad-medical-college/maulana-azad-medical-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'University College of Medical Sciences (UCMS)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/university-college-of-medical-sciences/university-college-of-medical-sciences.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Vardhman Mahavir Medical College (VMMC)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/vardhman-mahavir-medical-college/vardhman-mahavir-medical-college.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Faculty of Law (FoL DU)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/faculty-of-law/faculty-of-law.html',
      rating: '4.3', accr: 'DU Affiliated'
    },
    {
      name: 'Faculty of Management Studies (FMS)',
      city: 'New Delhi', state: 'Delhi', type: 'Public',
      score: 8.8, totalFees: '₹15K — 30K', avgPackage: '₹6-9 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/delhi/faculty-of-management-studies/faculty-of-management-studies.html',
      rating: '4.3', accr: 'DU Affiliated'
    },

    {
      name: 'IIIT Bhagalpur (IIITBH)',
      city: 'Bhagalpur', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/iiit-bhagalpur/iiit-bhagalpur.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Muzaffarpur Institute of Technology (MIT)',
      city: 'Muzaffarpur', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/muzaffarpur-institute-of-technology/muzaffarpur-institute-of-technology.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Bhagalpur College of Engineering (BCE)',
      city: 'Bhagalpur', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/bhagalpur-college-of-engineering/bhagalpur-college-of-engineering.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Gaya College of Engineering (GCE)',
      city: 'Gaya', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/gaya-college-of-engineering/gaya-college-of-engineering.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Nalanda College of Engineering (NCE)',
      city: 'Chandi', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/nalanda-college-of-engineering/nalanda-college-of-engineering.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Darbhanga College of Engineering (DCE)',
      city: 'Darbhanga', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/darbhanga-college-of-engineering/darbhanga-college-of-engineering.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Motihari College of Engineering (MCE)',
      city: 'Motihari', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/motihari-college-of-engineering/motihari-college-of-engineering.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Engineering College, Nawada (GEC Nawada)',
      city: 'Nawada', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/government-engineering-college-nawada/government-engineering-college-nawada.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Engineering College, Kishanganj (GEC Kish)',
      city: 'Kishanganj', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/government-engineering-college-kishanganj/government-engineering-college-kishanganj.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Engineering College, Munger (GEC Munger)',
      city: 'Munger', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/government-engineering-college-munger/government-engineering-college-munger.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Engineering College, Sheohar (GEC Sheohar)',
      city: 'Sheohar', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/government-engineering-college-sheohar/government-engineering-college-sheohar.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Engineering College, Bettiah (GEC Bettiah)',
      city: 'Bettiah', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/government-engineering-college-bettiah/government-engineering-college-bettiah.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Engineering College, Darbhanga (GEC DBG)',
      city: 'Darbhanga', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/government-engineering-college-darbhanga/government-engineering-college-darbhanga.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Bihar Institute of Technology (BIT Patna)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/bihar-institute-of-technology/bihar-institute-of-technology.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Buddha Institute of Technology (BIT Gaya)',
      city: 'Gaya', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/buddha-institute-of-technology/buddha-institute-of-technology.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Netaji Subhas Institute of Technology (NSIT)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/netaji-subhas-institute-of-technology/netaji-subhas-institute-of-technology.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'R.P. Sharma Institute of Technology (RPSIT)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/rp-sharma-institute-of-technology/rp-sharma-institute-of-technology.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Maulana Azad College of Engineering & Tech (MACET)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/maulana-azad-college-of-engineering-and-tech/maulana-azad-college-of-engineering-and-tech.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Sandip University (SU)',
      city: 'Madhubani', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/sandip-university/sandip-university.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Azmet Institute of Technology (AZMET)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/azmet-institute-of-technology/azmet-institute-of-technology.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Vidyadaan Institute of Technology & Mgt (VITM)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/vidyadaan-institute-of-technology-and-mgt/vidyadaan-institute-of-technology-and-mgt.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'D.Y. Patil College of Engineering (DY Patil)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/dy-patil-college-of-engineering/dy-patil-college-of-engineering.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Gyan Ganga College of Engineering (GGCE)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/gyan-ganga-college-of-engineering/gyan-ganga-college-of-engineering.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Darshan Institute of Engineering (DIET)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/darshan-institute-of-engineering/darshan-institute-of-engineering.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Global Institute of Engineering (GIET)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/global-institute-of-engineering/global-institute-of-engineering.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Col. Satsangi’s Kiran Memorial Group (CSKMG)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/col-satsangis-kiran-memorial-group/col-satsangis-kiran-memorial-group.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Patna Sahib Group of Colleges (PSGC)',
      city: 'Vaishali', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/patna-sahib-group-of-colleges/patna-sahib-group-of-colleges.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'R.P. College of Engineering (RPCE)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/rp-college-of-engineering/rp-college-of-engineering.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Vaishali Institute of Technology (VIT)',
      city: 'Vaishali', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/vaishali-institute-of-technology/vaishali-institute-of-technology.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Mahavir Institute of Engineering (MIET)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/mahavir-institute-of-engineering/mahavir-institute-of-engineering.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Moti Institute of Technology (MIT)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/moti-institute-of-technology/moti-institute-of-technology.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'AIIMS Patna (AIIMS)',
      city: 'Patna', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/aiims-patna/aiims-patna.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Patna Medical College & Hospital (PMCH)',
      city: 'Patna', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/patna-medical-college-and-hospital/patna-medical-college-and-hospital.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Indira Gandhi Institute of Medical Sciences (IGIMS)',
      city: 'Patna', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/indira-gandhi-institute-of-medical-sciences/indira-gandhi-institute-of-medical-sciences.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Anugrah Narayan Magadh Medical College & Hospital (ANMMCH)',
      city: 'Gaya', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/anugrah-narayan-magadh-medical-college-and-hospital/anugrah-narayan-magadh-medical-college-and-hospital.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Darbhanga Medical College & Hospital (DMCH)',
      city: 'Darbhanga', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/darbhanga-medical-college-and-hospital/darbhanga-medical-college-and-hospital.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Nalanda Medical College & Hospital (NMCH)',
      city: 'Patna', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/nalanda-medical-college-and-hospital/nalanda-medical-college-and-hospital.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Sri Krishna Medical College & Hospital (SKMCH)',
      city: 'Muzaffarpur', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/sri-krishna-medical-college-and-hospital/sri-krishna-medical-college-and-hospital.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Medical College, Bettiah (GMC)',
      city: 'Bettiah', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/government-medical-college-bettiah/government-medical-college-bettiah.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Government Medical College, Purnea (GMC)',
      city: 'Purnea', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/government-medical-college-purnea/government-medical-college-purnea.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Jannayak Karpoori Thakur Medical College (JKTMCH)',
      city: 'Madhepura', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/jannayak-karpoori-thakur-medical-college/jannayak-karpoori-thakur-medical-college.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Katihar Medical College (KMC)',
      city: 'Katihar', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/katihar-medical-college/katihar-medical-college.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Mata Gujri Memorial Medical College (MGMMC)',
      city: 'Kishanganj', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/mata-gujri-memorial-medical-college/mata-gujri-memorial-medical-college.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Narayan Medical College & Hospital (NMCH)',
      city: 'Sasaram', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/narayan-medical-college-and-hospital/narayan-medical-college-and-hospital.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Lord Buddha Koshi Medical College (LBKMC)',
      city: 'Saharsa', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/lord-buddha-koshi-medical-college/lord-buddha-koshi-medical-college.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Madhubani Medical College (MMC)',
      city: 'Madhubani', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/madhubani-medical-college/madhubani-medical-college.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Netaji Subhas Medical College (NSMC)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/netaji-subhas-medical-college/netaji-subhas-medical-college.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Radha Devi J.M. Medical College (RDJMMC)',
      city: 'Muzaffarpur', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/radha-devi-jm-medical-college/radha-devi-jm-medical-college.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Shree Narayan Medical Institute & Hospital (SNMIH)',
      city: 'Saharsa', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/shree-narayan-medical-institute-and-hospital/shree-narayan-medical-institute-and-hospital.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Himalaya Medical College (HMC)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/himalaya-medical-college/himalaya-medical-college.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Government Pharmacy College (GPC)',
      city: 'Bettiah', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/government-pharmacy-college/government-pharmacy-college.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Patna College of Pharmacy (PCP)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/patna-college-of-pharmacy/patna-college-of-pharmacy.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'NIPER Hajipur (NIPER)',
      city: 'Patna', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/niper-hajipur/niper-hajipur.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'BNMU Pharmacy Dept (BNMU)',
      city: 'Madhepura', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/bnmu-pharmacy-dept/bnmu-pharmacy-dept.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Nalanda College of Pharmacy (NCP)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/nalanda-college-of-pharmacy/nalanda-college-of-pharmacy.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Rajendra Institute of Pharmacy (RIP)',
      city: 'Chapra', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/rajendra-institute-of-pharmacy/rajendra-institute-of-pharmacy.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Patna Dental College & Hospital (PDC)',
      city: 'Patna', state: 'Bihar', type: 'Government',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/patna-dental-college-and-hospital/patna-dental-college-and-hospital.html',
      rating: '4.0', accr: 'Government'
    },
    {
      name: 'Buddha Institute of Dental Sciences & Hospital (BIDSH)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/buddha-institute-of-dental-sciences-and-hospital/buddha-institute-of-dental-sciences-and-hospital.html',
      rating: '4.0', accr: 'Private'
    },
    {
      name: 'Bihar Dental College (BDC)',
      city: 'Patna', state: 'Bihar', type: 'Private',
      score: 8.5, totalFees: 'Variable', avgPackage: '-',
      placementRate: 80, nirf: 0,
      link: '../colleges/bihar/bihar-dental-college/bihar-dental-college.html',
      rating: '4.0', accr: 'Private'
    },

    {
      name: 'Assam University (AUS)',
      city: 'Silchar', state: 'Assam', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;5-7 LPA',
      placementRate: 65, nirf: 0,
      link: '../colleges/assam/assam-university/assam-university.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Birla Institute of Technology, Mesra (BIT Mesra)',
      city: 'Ranchi', state: 'Jharkhand', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;10-12 LPA',
      placementRate: 85, nirf: 53,
      link: '../colleges/jharkhand/birla-institute-of-technology-mesra/birla-institute-of-technology-mesra.html',
      rating: '4.0', accr: 'NIRF #53'
    },
    {
      name: 'Gurukula Kangri Vishwavidyalaya (GKV)',
      city: 'Haridwar', state: 'Uttarakhand', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-6 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/uttarakhand/gurukula-kangri-vishwavidyalaya/gurukula-kangri-vishwavidyalaya.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Institute of Infrastructure, Tech, Research and Mgt (IITRAM)',
      city: 'Ahmedabad', state: 'Gujarat', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;5-7 LPA',
      placementRate: 70, nirf: 0,
      link: '../colleges/gujarat/institute-of-infrastructure-tech-research-and-mgt/institute-of-infrastructure-tech-research-and-mgt.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Institute of Chemical Technology (ICT)',
      city: 'Mumbai', state: 'Maharashtra', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;7-9 LPA',
      placementRate: 90, nirf: 24,
      link: '../colleges/maharashtra/institute-of-chemical-technology/institute-of-chemical-technology.html',
      rating: '4.0', accr: 'NIRF #24'
    },
    {
      name: 'Jamia Millia Islamia (JMI)',
      city: 'New Delhi', state: 'Delhi', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;8-10 LPA',
      placementRate: 80, nirf: 26,
      link: '../colleges/delhi/jamia-millia-islamia/jamia-millia-islamia.html',
      rating: '4.0', accr: 'NIRF #26'
    },
    {
      name: 'Sant Longowal Institute of Engineering and Tech (SLIET)',
      city: 'Longowal', state: 'Punjab', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;5-7 LPA',
      placementRate: 70, nirf: 0,
      link: '../colleges/punjab/sant-longowal-institute-of-engineering-and-tech/sant-longowal-institute-of-engineering-and-tech.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Shri Mata Vaishno Devi University (SMVDU)',
      city: 'Katra', state: 'J&K', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-6 LPA',
      placementRate: 65, nirf: 0,
      link: '../colleges/jammu-and-kashmir/shri-mata-vaishno-devi-university/shri-mata-vaishno-devi-university.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Tezpur University (TU)',
      city: 'Tezpur', state: 'Assam', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;5-7 LPA',
      placementRate: 65, nirf: 0,
      link: '../colleges/assam/tezpur-university/tezpur-university.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Punjab Engineering College (PEC)',
      city: 'Chandigarh', state: 'Chandigarh', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;15 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/chandigarh/punjab-engineering-college/punjab-engineering-college.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'University of Hyderabad (UoH)',
      city: 'Hyderabad', state: 'Telangana', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;6-8 LPA',
      placementRate: 70, nirf: 71,
      link: '../colleges/telangana/university-of-hyderabad/university-of-hyderabad.html',
      rating: '4.0', accr: 'NIRF #71'
    },
    {
      name: 'Jawaharlal Nehru University (JNU)',
      city: 'New Delhi', state: 'Delhi', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;8-10 LPA',
      placementRate: 75, nirf: 2,
      link: '../colleges/delhi/jawaharlal-nehru-university/jawaharlal-nehru-university.html',
      rating: '4.0', accr: 'NIRF #2'
    },
    {
      name: 'Mizoram University (MZU)',
      city: 'Aizawl', state: 'Mizoram', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-6 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/mizoram/mizoram-university/mizoram-university.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'School of Planning and Architecture (SPA Delhi)',
      city: 'New Delhi', state: 'Delhi', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;7-9 LPA',
      placementRate: 90, nirf: 5,
      link: '../colleges/delhi/school-of-planning-and-architecture/school-of-planning-and-architecture.html',
      rating: '4.0', accr: 'NIRF #5'
    },
    {
      name: 'School of Planning and Arch (SPA Bhopal)',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;6-8 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/madhya-pradesh/school-of-planning-and-arch/school-of-planning-and-arch.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'School of Planning and Arch (SPAV)',
      city: 'Vijayawada', state: 'Andhra Pradesh', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;6-8 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/andhra-pradesh/school-of-planning-and-arch/school-of-planning-and-arch.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Rajasthan (CURAJ)',
      city: 'Ajmer', state: 'Rajasthan', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-6 LPA',
      placementRate: 65, nirf: 0,
      link: '../colleges/rajasthan/central-university-of-rajasthan/central-university-of-rajasthan.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Aligarh Muslim University (AMU)',
      city: 'Aligarh', state: 'Uttar Pradesh', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;5-7 LPA',
      placementRate: 70, nirf: 9,
      link: '../colleges/uttar-pradesh/aligarh-muslim-university/aligarh-muslim-university.html',
      rating: '4.0', accr: 'NIRF #9'
    },
    {
      name: 'Harcourt Butler Technical University (HBTU)',
      city: 'Kanpur', state: 'Uttar Pradesh', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;8-10 LPA',
      placementRate: 80, nirf: 0,
      link: '../colleges/uttar-pradesh/harcourt-butler-technical-university/harcourt-butler-technical-university.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Indian Institute of Carpet Tech (IICT)',
      city: 'Bhadohi', state: 'Uttar Pradesh', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 85, nirf: 0,
      link: '../colleges/uttar-pradesh/indian-institute-of-carpet-tech/indian-institute-of-carpet-tech.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Haryana (CUH)',
      city: 'Mahendragarh', state: 'Haryana', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/haryana/central-university-of-haryana/central-university-of-haryana.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Jammu (CUJ)',
      city: 'Jammu', state: 'J&K', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/jammu-and-kashmir/central-university-of-jammu/central-university-of-jammu.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Jharkhand (CUJ)',
      city: 'Ranchi', state: 'Jharkhand', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/jharkhand/central-university-of-jharkhand/central-university-of-jharkhand.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Karnataka (CUK)',
      city: 'Kalaburagi', state: 'Karnataka', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/karnataka/central-university-of-karnataka/central-university-of-karnataka.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Punjab (CUP)',
      city: 'Bathinda', state: 'Punjab', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/punjab/central-university-of-punjab/central-university-of-punjab.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of South Bihar (CUSB)',
      city: 'Gaya', state: 'Bihar', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/bihar/central-university-of-south-bihar/central-university-of-south-bihar.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Tamil Nadu (CUTN)',
      city: 'Thiruvarur', state: 'Tamil Nadu', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/tamil-nadu/central-university-of-tamil-nadu/central-university-of-tamil-nadu.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Gujarat (CUG)',
      city: 'Gandhinagar', state: 'Gujarat', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/gujarat/central-university-of-gujarat/central-university-of-gujarat.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Andhra Pradesh (CUAP)',
      city: 'Anantapur', state: 'Andhra Pradesh', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;3-5 LPA',
      placementRate: 50, nirf: 0,
      link: '../colleges/andhra-pradesh/central-university-of-andhra-pradesh/central-university-of-andhra-pradesh.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Himachal Pradesh (CUHP)',
      city: 'Dharamshala', state: 'Himachal Pradesh', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/himachal-pradesh/central-university-of-himachal-pradesh/central-university-of-himachal-pradesh.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Kerala (CUK)',
      city: 'Kasaragod', state: 'Kerala', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/kerala/central-university-of-kerala/central-university-of-kerala.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Odisha (CUO)',
      city: 'Koraput', state: 'Odisha', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/odisha/central-university-of-odisha/central-university-of-odisha.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Nagaland (NU)',
      city: 'Lumami', state: 'Nagaland', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/nagaland/central-university-of-nagaland/central-university-of-nagaland.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Tripura (TU)',
      city: 'Suryamaninagar', state: 'Tripura', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/tripura/central-university-of-tripura/central-university-of-tripura.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Manipur (MU)',
      city: 'Imphal', state: 'Manipur', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/manipur/central-university-of-manipur/central-university-of-manipur.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Meghalaya (NEHU)',
      city: 'Shillong', state: 'Meghalaya', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/meghalaya/central-university-of-meghalaya/central-university-of-meghalaya.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Sikkim (SU)',
      city: 'Gangtok', state: 'Sikkim', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/sikkim/central-university-of-sikkim/central-university-of-sikkim.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of West Bengal (VB)',
      city: 'Santiniketan', state: 'West Bengal', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;4-5 LPA',
      placementRate: 60, nirf: 0,
      link: '../colleges/west-bengal/central-university-of-west-bengal/central-university-of-west-bengal.html',
      rating: '4.0', accr: 'Govt. Approv'
    },
    {
      name: 'Central University of Ladakh (CUL)',
      city: 'Ladakh', state: 'Ladakh', type: 'Government',
      score: 8.8, totalFees: '&#8377;1L — 3L', avgPackage: '&#8377;3-5 LPA',
      placementRate: 50, nirf: 0,
      link: '../colleges/ladakh/central-university-of-ladakh/central-university-of-ladakh.html',
      rating: '4.0', accr: 'Govt. Approv'
    },

    {
      name: 'NIT Trichy (NITT)',
      city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Government',
      score: 9.6, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;12-15 LPA',
      placementRate: 90, nirf: 9,
      link: '../colleges/tamil-nadu/nit-trichy/nit-trichy.html',
      rating: '4.2', accr: 'NIRF #9'
    },
    {
      name: 'NIT Surathkal (NITK)',
      city: 'Surathkal', state: 'Karnataka', type: 'Government',
      score: 9.4, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;13-16 LPA',
      placementRate: 89, nirf: 12,
      link: '../colleges/karnataka/nit-surathkal/nit-surathkal.html',
      rating: '4.2', accr: 'NIRF #12'
    },
    {
      name: 'NIT Rourkela (NITR)',
      city: 'Rourkela', state: 'Odisha', type: 'Government',
      score: 9.2, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;11-14 LPA',
      placementRate: 85, nirf: 16,
      link: '../colleges/chhattisgarh/nit-raipur/nit-raipur.html',
      rating: '4.2', accr: 'NIRF #16'
    },
    {
      name: 'NIT Warangal (NITW)',
      city: 'Warangal', state: 'Telangana', type: 'Government',
      score: 8.9, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;13-17 LPA',
      placementRate: 88, nirf: 21,
      link: '../colleges/telangana/nit-warangal/nit-warangal.html',
      rating: '4.2', accr: 'NIRF #21'
    },
    {
      name: 'NIT Calicut (NITC)',
      city: 'Kozhikode', state: 'Kerala', type: 'Government',
      score: 8.8, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;11-14 LPA',
      placementRate: 85, nirf: 23,
      link: '../colleges/kerala/nit-calicut/nit-calicut.html',
      rating: '4.2', accr: 'NIRF #23'
    },
    {
      name: 'MNIT Jaipur (MNIT)',
      city: 'Jaipur', state: 'Rajasthan', type: 'Government',
      score: 8.2, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;10-13 LPA',
      placementRate: 84, nirf: 37,
      link: '../colleges/rajasthan/mnit-jaipur/mnit-jaipur.html',
      rating: '4.2', accr: 'NIRF #37'
    },
    {
      name: 'VNIT Nagpur (VNIT)',
      city: 'Nagpur', state: 'Maharashtra', type: 'Government',
      score: 8.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 82, nirf: 41,
      link: '../colleges/maharashtra/vnit-nagpur/vnit-nagpur.html',
      rating: '4.2', accr: 'NIRF #41'
    },
    {
      name: 'NIT Kurukshetra (NITKKR)',
      city: 'Kurukshetra', state: 'Haryana', type: 'Government',
      score: 7.1, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 80, nirf: 58,
      link: '../colleges/haryana/nit-kurukshetra/nit-kurukshetra.html',
      rating: '4.2', accr: 'NIRF #58'
    },
    {
      name: 'NIT Silchar (NITS)',
      city: 'Silchar', state: 'Assam', type: 'Government',
      score: 8.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 80, nirf: 40,
      link: '../colleges/assam/nit-silchar/nit-silchar.html',
      rating: '4.2', accr: 'NIRF #40'
    },
    {
      name: 'NIT Durgapur (NITDGP)',
      city: 'Durgapur', state: 'West Bengal', type: 'Government',
      score: 7.8, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 80, nirf: 43,
      link: '../colleges/west-bengal/nit-durgapur/nit-durgapur.html',
      rating: '4.2', accr: 'NIRF #43'
    },
    {
      name: 'NIT Patna (NITP)',
      city: 'Patna', state: 'Bihar', type: 'Government',
      score: 7.2, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;8-11 LPA',
      placementRate: 78, nirf: 56,
      link: '../colleges/bihar/nit-patna/nit-patna.html',
      rating: '4.2', accr: 'NIRF #56'
    },
    {
      name: 'NIT Jalandhar (NITJ)',
      city: 'Jalandhar', state: 'Punjab', type: 'Government',
      score: 7.7, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;8-11 LPA',
      placementRate: 78, nirf: 46,
      link: '../colleges/punjab/nit-jalandhar/nit-jalandhar.html',
      rating: '4.2', accr: 'NIRF #46'
    },
    {
      name: 'NIT Meghalaya (NITM)',
      city: 'Shillong', state: 'Meghalaya', type: 'Government',
      score: 6.4, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;7-10 LPA',
      placementRate: 75, nirf: 72,
      link: '../colleges/meghalaya/nit-meghalaya/nit-meghalaya.html',
      rating: '4.2', accr: 'NIRF #72'
    },
    {
      name: 'NIT Raipur (NITRR)',
      city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
      score: 6.5, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;8-11 LPA',
      placementRate: 75, nirf: 70,
      link: '../colleges/chhattisgarh/nit-raipur/nit-raipur.html',
      rating: '4.2', accr: 'NIRF #70'
    },
    {
      name: 'NIT Agartala (NITA)',
      city: 'Agartala', state: 'Tripura', type: 'Government',
      score: 5.5, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;7-10 LPA',
      placementRate: 75, nirf: 91,
      link: '../colleges/andhra-pradesh/nit-andhra-pradesh/nit-andhra-pradesh.html',
      rating: '4.2', accr: 'NIRF #91'
    },
    {
      name: 'NIT Goa (NITG)',
      city: 'Ponda', state: 'Goa', type: 'Government',
      score: 5.5, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;7-10 LPA',
      placementRate: 75, nirf: 90,
      link: '../colleges/goa/nit-goa/nit-goa.html',
      rating: '4.2', accr: 'NIRF #90'
    },
    {
      name: 'NIT Arunachal Pradesh (NITAP)',
      city: 'Yupia', state: 'Arunachal Pradesh', type: 'Government',
      score: 5.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;6-9 LPA',
      placementRate: 70, nirf: 100,
      link: '../colleges/arunachal-pradesh/nit-arunachal-pradesh/nit-arunachal-pradesh.html',
      rating: '4.2', accr: 'NIRF #100'
    },
    {
      name: 'NIT Mizoram (NITMZ)',
      city: 'Aizawl', state: 'Mizoram', type: 'Government',
      score: 9.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;6-8 LPA',
      placementRate: 68, nirf: 0,
      link: '../colleges/mizoram/nit-mizoram/nit-mizoram.html',
      rating: '4.2', accr: 'NIRF #New'
    },
    {
      name: 'NIT Sikkim (NITSKM)',
      city: 'Ravangla', state: 'Sikkim', type: 'Government',
      score: 9.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;6-8 LPA',
      placementRate: 68, nirf: 0,
      link: '../colleges/sikkim/nit-sikkim/nit-sikkim.html',
      rating: '4.2', accr: 'NIRF #New'
    },
    {
      name: 'NIT Srinagar (NITSRI)',
      city: 'Srinagar', state: 'Jammu and Kashmir', type: 'Government',
      score: 5.9, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;6-9 LPA',
      placementRate: 72, nirf: 82,
      link: '../colleges/jammu-and-kashmir/nit-srinagar/nit-srinagar.html',
      rating: '4.2', accr: 'NIRF #82'
    },
    {
      name: 'NIT Delhi (NITD)',
      city: 'New Delhi', state: 'Delhi', type: 'Government',
      score: 7.5, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 80, nirf: 51,
      link: '../colleges/delhi/nit-delhi/nit-delhi.html',
      rating: '4.2', accr: 'NIRF #51'
    },
    {
      name: 'NIT Manipur (NITMN)',
      city: 'Imphal', state: 'Manipur', type: 'Government',
      score: 5.3, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;6-8 LPA',
      placementRate: 70, nirf: 95,
      link: '../colleges/manipur/nit-manipur/nit-manipur.html',
      rating: '4.2', accr: 'NIRF #95'
    },
    {
      name: 'NIT Nagaland (NITN)',
      city: 'Dimapur', state: 'Nagaland', type: 'Government',
      score: 9.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;5-8 LPA',
      placementRate: 65, nirf: 0,
      link: '../colleges/nagaland/nit-nagaland/nit-nagaland.html',
      rating: '4.2', accr: 'NIRF #New'
    },
    {
      name: 'NIT Andhra Pradesh (NITANP)',
      city: 'Tadepalligudem', state: 'Andhra Pradesh', type: 'Government',
      score: 9.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;6-9 LPA',
      placementRate: 70, nirf: 0,
      link: '../colleges/andhra-pradesh/nit-andhra-pradesh/nit-andhra-pradesh.html',
      rating: '4.2', accr: 'NIRF #New'
    },
    {
      name: 'NIT Puducherry (NITPY)',
      city: 'Karaikal', state: 'Puducherry', type: 'Government',
      score: 9.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;6-9 LPA',
      placementRate: 72, nirf: 0,
      link: '../colleges/puducherry/nit-puducherry/nit-puducherry.html',
      rating: '4.2', accr: 'NIRF #New'
    },
    {
      name: 'NIT Uttarakhand (NITUK)',
      city: 'Srinagar', state: 'Uttarakhand', type: 'Government',
      score: 9.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;6-9 LPA',
      placementRate: 72, nirf: 0,
      link: '../colleges/uttarakhand/nit-uttarakhand/nit-uttarakhand.html',
      rating: '4.2', accr: 'NIRF #New'
    },
    {
      name: 'MANIT Bhopal (MANIT)',
      city: 'Bhopal', state: 'Madhya Pradesh', type: 'Government',
      score: 6.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 82, nirf: 80,
      link: '../colleges/madhya-pradesh/manit-bhopal/manit-bhopal.html',
      rating: '4.2', accr: 'NIRF #80'
    },
    {
      name: 'MNNIT Allahabad (MNNIT)',
      city: 'Prayagraj', state: 'Uttar Pradesh', type: 'Government',
      score: 7.5, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;12-15 LPA',
      placementRate: 85, nirf: 49,
      link: '../colleges/uttar-pradesh/mnnit-allahabad/mnnit-allahabad.html',
      rating: '4.2', accr: 'NIRF #49'
    },
    {
      name: 'SVNIT Surat (SVNIT)',
      city: 'Surat', state: 'Gujarat', type: 'Government',
      score: 6.8, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 80, nirf: 65,
      link: '../colleges/gujarat/svnit-surat/svnit-surat.html',
      rating: '4.2', accr: 'NIRF #65'
    },
    {
      name: 'NIT Jamshedpur (NITJSR)',
      city: 'Jamshedpur', state: 'Jharkhand', type: 'Government',
      score: 5.5, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 80, nirf: 90,
      link: '../colleges/jharkhand/nit-jamshedpur/nit-jamshedpur.html',
      rating: '4.2', accr: 'NIRF #90'
    },
    {
      name: 'NIT Hamirpur (NITH)',
      city: 'Hamirpur', state: 'Himachal Pradesh', type: 'Government',
      score: 9.0, totalFees: '&#8377;5L — 6L', avgPackage: '&#8377;7-10 LPA',
      placementRate: 75, nirf: 0,
      link: '../colleges/himachal-pradesh/nit-hamirpur/nit-hamirpur.html',
      rating: '4.2', accr: 'NIRF #New'
    },
    {
      name: 'IIT Delhi (IITD)',
      city: 'New Delhi', state: 'Delhi', type: 'Government',
      score: 9.8, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;20-25 LPA',
      placementRate: 92, nirf: 2,
      link: '../colleges/delhi/iit-delhi/iit-delhi.html',
      rating: '4.5', accr: 'NIRF #2'
    },
    {
      name: 'IIT Kanpur (IITK)',
      city: 'Kanpur', state: 'Uttar Pradesh', type: 'Government',
      score: 9.6, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;18-22 LPA',
      placementRate: 90, nirf: 4,
      link: '../colleges/uttar-pradesh/iit-kanpur/iit-kanpur.html',
      rating: '4.5', accr: 'NIRF #4'
    },
    {
      name: 'IIT Kharagpur (IIT KGP)',
      city: 'Kharagpur', state: 'West Bengal', type: 'Government',
      score: 9.5, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;16-20 LPA',
      placementRate: 88, nirf: 5,
      link: '../colleges/west-bengal/iit-kharagpur/iit-kharagpur.html',
      rating: '4.5', accr: 'NIRF #5'
    },
    {
      name: 'IIT Roorkee (IITR)',
      city: 'Roorkee', state: 'Uttarakhand', type: 'Government',
      score: 9.4, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;15-18 LPA',
      placementRate: 88, nirf: 6,
      link: '../colleges/uttarakhand/iit-roorkee/iit-roorkee.html',
      rating: '4.5', accr: 'NIRF #6'
    },
    {
      name: 'IIT Guwahati (IITG)',
      city: 'Guwahati', state: 'Assam', type: 'Government',
      score: 9.3, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;14-18 LPA',
      placementRate: 87, nirf: 7,
      link: '../colleges/assam/iit-guwahati/iit-guwahati.html',
      rating: '4.5', accr: 'NIRF #7'
    },
    {
      name: 'IIT Hyderabad (IITH)',
      city: 'Hyderabad', state: 'Telangana', type: 'Government',
      score: 9.2, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;14-18 LPA',
      placementRate: 85, nirf: 8,
      link: '../colleges/telangana/iit-hyderabad/iit-hyderabad.html',
      rating: '4.5', accr: 'NIRF #8'
    },
    {
      name: 'IIT (BHU) Varanasi (IIT BHU)',
      city: 'Varanasi', state: 'Uttar Pradesh', type: 'Government',
      score: 9.0, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;12-16 LPA',
      placementRate: 85, nirf: 10,
      link: '../colleges/uttar-pradesh/iit-bhu-varanasi/iit-bhu-varanasi.html',
      rating: '4.5', accr: 'NIRF #10'
    },
    {
      name: 'IIT Indore (IITI)',
      city: 'Indore', state: 'Madhya Pradesh', type: 'Government',
      score: 8.9, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;14-17 LPA',
      placementRate: 88, nirf: 11,
      link: '../colleges/madhya-pradesh/iit-indore/iit-indore.html',
      rating: '4.5', accr: 'NIRF #11'
    },
    {
      name: 'IIT (ISM) Dhanbad (IIT ISM)',
      city: 'Dhanbad', state: 'Jharkhand', type: 'Government',
      score: 8.1, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;10-14 LPA',
      placementRate: 82, nirf: 19,
      link: '../colleges/jharkhand/iit-ism-dhanbad/iit-ism-dhanbad.html',
      rating: '4.5', accr: 'NIRF #19'
    },
    {
      name: 'IIT Gandhinagar (IITGN)',
      city: 'Gandhinagar', state: 'Gujarat', type: 'Government',
      score: 8.2, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;13-16 LPA',
      placementRate: 86, nirf: 18,
      link: '../colleges/gujarat/iit-gandhinagar/iit-gandhinagar.html',
      rating: '4.5', accr: 'NIRF #18'
    },
    {
      name: 'IIT Jodhpur (IITJ)',
      city: 'Jodhpur', state: 'Rajasthan', type: 'Government',
      score: 6.5, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;10-14 LPA',
      placementRate: 80, nirf: 35,
      link: '../colleges/rajasthan/iit-jodhpur/iit-jodhpur.html',
      rating: '4.5', accr: 'NIRF #35'
    },
    {
      name: 'IIT Patna (IITP)',
      city: 'Patna', state: 'Bihar', type: 'Government',
      score: 5.7, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;10-13 LPA',
      placementRate: 80, nirf: 43,
      link: '../colleges/bihar/iit-patna/iit-patna.html',
      rating: '4.5', accr: 'NIRF #43'
    },
    {
      name: 'IIT Bhubaneswar (IITBBS)',
      city: 'Bhubaneswar', state: 'Odisha', type: 'Government',
      score: 5.5, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;10-13 LPA',
      placementRate: 80, nirf: 45,
      link: '../colleges/odisha/iit-bhubaneswar/iit-bhubaneswar.html',
      rating: '4.5', accr: 'NIRF #45'
    },
    {
      name: 'IIT Mandi (IIT Mandi)',
      city: 'Mandi', state: 'Himachal Pradesh', type: 'Government',
      score: 5.0, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 78, nirf: 50,
      link: '../colleges/himachal-pradesh/iit-mandi/iit-mandi.html',
      rating: '4.5', accr: 'NIRF #50'
    },
    {
      name: 'IIT Ropar (IIT Ropar)',
      city: 'Rupnagar', state: 'Punjab', type: 'Government',
      score: 5.0, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;9-12 LPA',
      placementRate: 78, nirf: 50,
      link: '../colleges/punjab/iit-ropar/iit-ropar.html',
      rating: '4.5', accr: 'NIRF #50'
    },
    {
      name: 'IIT Palakkad (IITPKD)',
      city: 'Palakkad', state: 'Kerala', type: 'Government',
      score: 9.0, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;8-11 LPA',
      placementRate: 76, nirf: 0,
      link: '../colleges/kerala/iit-palakkad/iit-palakkad.html',
      rating: '4.5', accr: 'NIRF #New'
    },
    {
      name: 'IIT Tirupati (IITTP)',
      city: 'Tirupati', state: 'Andhra Pradesh', type: 'Government',
      score: 9.0, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;8-11 LPA',
      placementRate: 76, nirf: 0,
      link: '../colleges/andhra-pradesh/iit-tirupati/iit-tirupati.html',
      rating: '4.5', accr: 'NIRF #New'
    },
    {
      name: 'IIT Bhilai (IIT Bhilai)',
      city: 'Bhilai', state: 'Chhattisgarh', type: 'Government',
      score: 9.0, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;7-10 LPA',
      placementRate: 74, nirf: 0,
      link: '../colleges/chhattisgarh/iit-bhilai/iit-bhilai.html',
      rating: '4.5', accr: 'NIRF #New'
    },
    {
      name: 'IIT Goa (IIT Goa)',
      city: 'Ponda', state: 'Goa', type: 'Government',
      score: 9.0, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;7-10 LPA',
      placementRate: 74, nirf: 0,
      link: '../colleges/goa/iit-goa/iit-goa.html',
      rating: '4.5', accr: 'NIRF #New'
    },
    {
      name: 'IIT Jammu (IIT Jammu)',
      city: 'Jammu', state: 'Jammu & Kashmir', type: 'Government',
      score: 9.0, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;7-10 LPA',
      placementRate: 74, nirf: 0,
      link: '../colleges/jammu-and-kashmir/iit-jammu/iit-jammu.html',
      rating: '4.5', accr: 'NIRF #New'
    },
    {
      name: 'IIT Dharwad (IIT DWD)',
      city: 'Dharwad', state: 'Karnataka', type: 'Government',
      score: 9.0, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;7-10 LPA',
      placementRate: 74, nirf: 0,
      link: '../colleges/karnataka/iit-dharwad/iit-dharwad.html',
      rating: '4.5', accr: 'NIRF #New'
    },

    {
      name: 'Lovely Professional University (LPU)',
      city: 'Phagwara', state: 'Punjab', type: 'Private',
      score: 8.2, totalFees: '&#8377;7.8L — 12.6L', avgPackage: '&#8377;7.2 LPA',
      placementRate: 85, nirf: 38,
      link: '../colleges/punjab/lovely-professional-university/lovely-professional-university.html',
      rating: '4.2', accr: 'NAAC A++'
    },
    {
      name: 'Chandigarh University (CU)',
      city: 'Mohali', state: 'Punjab', type: 'Private',
      score: 7.9, totalFees: '&#8377;7.2L — 8.8L', avgPackage: '&#8377;6–8 LPA',
      placementRate: 90, nirf: 101,
      link: '../colleges/punjab/chandigarh-university/chandigarh-university.html',
      rating: '4.1', accr: 'NAAC A+'
    },
    {
      name: 'IIT Madras (IITM)',
      city: 'Chennai', state: 'Tamil Nadu', type: 'Government',
      score: 9.8, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;17–22 LPA',
      placementRate: 92, nirf: 1,
      link: '../colleges/tamil-nadu/iit-madras/iit-madras.html',
      rating: '4.8', accr: 'NIRF #1'
    },
    {
      name: 'IIT Bombay (IITB)',
      city: 'Mumbai', state: 'Maharashtra', type: 'Government',
      score: 9.7, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;18–22 LPA',
      placementRate: 92, nirf: 3,
      link: '../colleges/maharashtra/indian-institute-of-technology-bombay/indian-institute-of-technology-bombay.html',
      rating: '4.7', accr: 'NIRF #3'
    },
    {
      name: 'IIT Delhi',
      city: 'New Delhi', state: 'Delhi', type: 'Government',
      score: 9.6, totalFees: '&#8377;8L — 10L', avgPackage: '&#8377;21 LPA',
      placementRate: 95, nirf: 2,
      link: '../college-detail/college-detail.html?slug=iit-delhi',
      rating: '4.8', accr: 'NAAC A++'
    },
    {
      name: 'BITS Pilani',
      city: 'Pilani', state: 'Rajasthan', type: 'Private',
      score: 9.1, totalFees: '&#8377;20L — 24L', avgPackage: '&#8377;16 LPA',
      placementRate: 92, nirf: 25,
      link: '../college-detail/college-detail.html?slug=bits-pilani',
      rating: '4.5', accr: 'UGC'
    },
    {
      name: 'VIT Vellore',
      city: 'Vellore', state: 'Tamil Nadu', type: 'Private',
      score: 8.5, totalFees: '&#8377;7.5L — 10L', avgPackage: '&#8377;8.5 LPA',
      placementRate: 88, nirf: 12,
      link: '../college-detail/college-detail.html?slug=vit-vellore',
      rating: '4.3', accr: 'NAAC A++'
    }
  ];
  return colleges.map(c => `
    <div class="college-card">
      <div class="college-card-header">
        <h3>${c.name}</h3>
        <p>&#128205; ${c.city}, ${c.state} &bull; ${c.type}</p>
        <div class="college-score">${c.score}</div>
      </div>
      <div class="college-card-badges">
        <span class="card-badge-rating">&#9733; ${c.rating}</span>
        <span class="card-badge-accr">${c.accr}</span>
      </div>
      <div class="college-card-body">
        <div class="college-stat">
          <label>Total Fees</label>
          <strong>${c.totalFees}</strong>
        </div>
        <div class="college-stat">
          <label>Avg Package</label>
          <strong>${c.avgPackage}</strong>
        </div>
        <div class="college-stat">
          <label>Placement</label>
          <strong>${c.placementRate}%</strong>
        </div>
        <div class="college-stat">
          <label>NIRF Rank</label>
          <strong>#${c.nirf}</strong>
        </div>
      </div>
      <div class="college-card-footer">
        <a href="${c.link}" class="btn btn-primary btn-sm">View Details</a>
        <button class="btn btn-secondary btn-sm" onclick="addToCompare('static-${c.nirf}','${c.name.replace(/'/g, "\\\\'")}')" >Compare</button>
      </div>
    </div>
  `).join('');
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
        <button class="btn btn-secondary btn-sm" onclick="addToCompare('${c._id}','${c.name.replace(/'/g, "\\\\'")}')" >Compare</button>
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
