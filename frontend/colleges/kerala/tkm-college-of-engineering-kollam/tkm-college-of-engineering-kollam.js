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
\n\n/* Footer component — injected on every page */

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
\n\n/* --- END SHARED --- */\n\n/* TKM College of Engineering Kollam (TKMCE) — NextCampus College Detail JS */
document.addEventListener('DOMContentLoaded', () => { setupTabs(); setupStickyHeader(); setupMobileApplyBar(); });
function setupTabs() {
    const tabs = document.querySelectorAll('.lpu-tab');
    const panels = document.querySelectorAll('.lpu-panel');
    function switchTab(n) {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        const t = [...tabs].find(t => t.dataset.tab === n);
        if (t) t.classList.add('active');
        const p = document.getElementById('panel-' + n);
        if (p) { p.classList.add('active'); p.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
    tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
    document.querySelectorAll('.btn-view-tab').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));
}
function setupStickyHeader() {
    const s = document.getElementById('lpu-sticky-header');
    const h = document.getElementById('lpu-hero');
    const n = document.getElementById('lpu-tabs-nav');
    if (!s || !h) return;
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        if (scrollY > h.offsetTop + h.offsetHeight) { s.classList.add('visible'); if (n) n.style.top = s.offsetHeight + 'px'; }
        else { s.classList.remove('visible'); if (n) n.style.top = '0px'; }
    }, { passive: true });
}
function setupMobileApplyBar() {
    const b = document.getElementById('mobile-apply-bar');
    if (!b) return;
    window.addEventListener('scroll', () => { if (window.innerWidth <= 768) b.style.display = window.pageYOffset > 300 ? 'block' : 'none'; }, { passive: true });
}
