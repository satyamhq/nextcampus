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
