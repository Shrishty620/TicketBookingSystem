/**
 * Header component
 * Renders the application header with navigation
 */
export function renderHeader() {
  const header = document.getElementById('main-header');
  
  header.innerHTML = `
    <div class="header-container container">
      <a href="/" class="logo">
        <i class="fas fa-ticket-alt"></i> TicketWave
      </a>
      <nav>
        <ul class="nav-menu">
          <li><a href="/" class="nav-link" data-navlink>Home</a></li>
          <li><a href="/events" class="nav-link" data-navlink>Events</a></li>
          <li><a href="/about" class="nav-link" data-navlink>About</a></li>
          <li><a href="/account" class="nav-link" data-navlink>My Account</a></li>
        </ul>
      </nav>
    </div>
  `;
  
  // Update active link based on current path
  updateActiveLink();
}

/**
 * Updates the active link in the navigation based on current path
 */
function updateActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    if (currentPath === linkPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Update active link when the page is loaded or history state changes
window.addEventListener('popstate', updateActiveLink);