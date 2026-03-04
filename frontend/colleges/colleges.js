/* Header component — injected on every page */

// Resolve path from current page to another page
function pagePath(page) {
    const loc = window.location.pathname;
    // If running on Express server (no .html in URL and not /frontend/), use server routes
    if (!loc.includes('.html') && !loc.includes('/frontend/')) {
        const map = {
            'home': '/', 'programs': '/programs', 'colleges': '/colleges',
            'compare': '/compare', 'exams': '/exams', 'placements': '/placements',
            'budget-loan': '/budget-loan', 'login': '/login', 'signup': '/signup',
            'dashboard': '/dashboard', 'admin': '/admin'
        };
        return map[page] || '/';
    }
    // Target paths relative to frontend/
    const targetMap = {
        'home': 'home/home.html',
        'programs': 'programs/programs.html',
        'colleges': 'colleges/colleges.html',
        'compare': 'compare/compare.html',
        'exams': 'exams/exams.html',
        'placements': 'placements/placements.html',
        'budget-loan': 'budget-loan/budget-loan.html',
        'college-detail': 'college-detail/college-detail.html',
        'login': 'auth/login.html',
        'signup': 'auth/signup.html',
        'dashboard': 'dashboard/dashboard.html',
        'admin': 'admin/admin.html'
    };
    const target = targetMap[page];
    if (!target) return '/frontend/home/home.html';

    // Use absolute path from site root for reliability across all nesting depths
    const frontendIdx = loc.indexOf('/frontend/');
    if (frontendIdx !== -1) {
        const basePath = loc.substring(0, frontendIdx) + '/frontend/';
        return basePath + target;
    }
    // Fallback: relative path
    return target;
}

function initHeader() {
    const currentPath = window.location.pathname;
    const isActive = (page) => {
        if (page === 'home' && (currentPath === '/' || currentPath.endsWith('home.html') || currentPath === '')) return 'active';
        if (page !== 'home' && currentPath.includes(page)) return 'active';
        return '';
    };

    const token = localStorage.getItem('nc_token');
    const user = JSON.parse(localStorage.getItem('nc_user') || 'null');

    const authBtn = token
        ? `<a href="${pagePath('dashboard')}" class="btn btn-primary btn-sm">Dashboard</a>`
        : `<a href="${pagePath('login')}" class="btn btn-primary btn-sm">Login</a>`;

    const header = document.createElement('header');
    header.className = 'nc-header';
    header.id = 'nc-header';
    header.innerHTML = `
    <div class="container">
      <button class="nc-mobile-toggle" id="mobile-toggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <a href="${pagePath('home')}" class="nc-logo">
        <span class="nc-wordmark">Next<span>Campus</span></span>
      </a>
      <nav class="nc-nav" id="nc-nav">
        <a href="${pagePath('home')}" class="${isActive('home')}">Home</a>
        <a href="${pagePath('programs')}" class="${isActive('programs')}">Programs</a>
        <a href="${pagePath('colleges')}" class="${isActive('colleges')}">Colleges</a>
        <a href="${pagePath('compare')}" class="${isActive('compare')}">Compare</a>
        <a href="${pagePath('exams')}" class="${isActive('exams')}">Exams</a>
        <a href="${pagePath('budget-loan')}" class="${isActive('budget-loan')}">Budget & Loans</a>
      </nav>
      <div class="nc-search" id="nc-search">
        <input type="text" class="nc-search-input" id="nc-search-input" placeholder="Which college you want to study?" autocomplete="off">
        <svg class="nc-search-icon" id="nc-search-icon-btn" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <button class="nc-search-close" id="nc-search-close" aria-label="Close search">&times;</button>
      </div>
      <div class="nc-header-actions">
        ${token
            ? `<a href="${pagePath('dashboard')}" class="btn btn-primary btn-sm">Dashboard</a>`
            : `<a href="${pagePath('login')}" class="nc-login-link">Log In</a>
             <a href="${pagePath('signup')}" class="nc-join-btn">Join for Free</a>`
        }
      </div>
    </div>
  `;

    document.body.prepend(header);
    document.body.style.paddingTop = 'var(--header-height)';

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nc-nav');
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close mobile menu on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Search bar
    const searchContainer = document.getElementById('nc-search');
    const searchIconBtn = document.getElementById('nc-search-icon-btn');
    const searchInput = document.getElementById('nc-search-input');
    const searchClose = document.getElementById('nc-search-close');

    // Mobile: tap icon to expand, tap close to collapse
    searchIconBtn.addEventListener('click', () => {
        searchContainer.classList.add('expanded');
        searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
        searchContainer.classList.remove('expanded');
        searchInput.value = '';
    });

    // Enter to search
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            const q = encodeURIComponent(searchInput.value.trim());
            window.location.href = pagePath('colleges') + '?q=' + q;
        }
    });


}

// API helper
const API_BASE = '/api';

async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('nc_token');
    const config = {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options
    };
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'API Error');
    return data;
}

// Format currency (INR)
function formatCurrency(amount) {
    if (amount >= 10000000) return `\u20B9${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `\u20B9${(amount / 100000).toFixed(1)} L`;
    if (amount >= 1000) return `\u20B9${(amount / 1000).toFixed(1)}K`;
    return `\u20B9${amount}`;
}

// Format number
function formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initScrollAnimations();
});


/* --- END SHARED --- */

/* Footer component — injected on every page */

function initFooter() {
  const footer = document.createElement('footer');
  footer.className = 'nc-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="nc-footer-grid">
        <div class="nc-footer-brand">
          <h3 class="nc-wordmark">Next<span>Campus</span></h3>
          <p>India's smartest college discovery platform. Find, compare, and afford the best college for your dream career based on your rank, budget, and goals.</p>
          <div class="nc-footer-social">
            <a href="#" aria-label="Facebook">&#102;</a>
            <a href="#" aria-label="Twitter">&#120;</a>
            <a href="#" aria-label="LinkedIn">&#105;&#110;</a>
            <a href="#" aria-label="YouTube">&#9654;</a>
          </div>
        </div>
        <div class="nc-footer-col">
          <h4>Programs</h4>
          <ul>
            <li><a href="${pagePath('programs')}">Engineering</a></li>
            <li><a href="${pagePath('programs')}">Medical</a></li>
            <li><a href="${pagePath('programs')}">MBA</a></li>
            <li><a href="${pagePath('programs')}">Law</a></li>
            <li><a href="${pagePath('programs')}">Design</a></li>
          </ul>
        </div>
        <div class="nc-footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="${pagePath('colleges')}">Top Colleges</a></li>
            <li><a href="${pagePath('compare')}">Compare</a></li>
            <li><a href="${pagePath('exams')}">Exams</a></li>
            <li><a href="${pagePath('budget-loan')}">Loans</a></li>
          </ul>
        </div>
        <div class="nc-footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div class="nc-footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div class="nc-footer-bottom">
        <p>&copy; ${new Date().getFullYear()} NextCampus. All rights reserved.</p>
        <p>Made with &#10084; for students across India</p>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', initFooter);


/* Colleges Listing Page JS */
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    applyURLParams();
    loadColleges();
    setupFilterEvents();
});

// Store search query from URL
let searchQuery = '';

function applyURLParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('q')) searchQuery = params.get('q');
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
    if (searchQuery) params.set('search', searchQuery);
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
          <a href="${getCollegeLink(c)}" class="btn btn-primary btn-sm">View Details</a>
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

// Link any college to the template detail page
function getCollegeLink(college) {
    const loc = window.location.pathname;
    const slug = college.slug || college._id;
    // On static file serving, use query param
    if (loc.includes('.html') || loc.includes('/frontend/')) {
        return '../college-detail/college-detail.html?slug=' + slug;
    }
    // On Express server, use clean slug URL
    return '/colleges/' + slug;
}
