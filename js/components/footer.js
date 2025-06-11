/**
 
 * Renders the application footer
 */
export function renderFooter() {
  const footer = document.getElementById('main-footer');
  
  footer.innerHTML = `
    <div class="container">
      <div class="footer-container">
        <div>
          <h3 class="footer-title">TicketWave</h3>
          <p>Book tickets for your favorite events quickly and securely.</p>
        </div>
        <div>
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-list">
            <li><a href="/" class="footer-link">Home</a></li>
            <li><a href="/events" class="footer-link">All Events</a></li>
            <li><a href="/about" class="footer-link">About Us</a></li>
            <li><a href="/account" class="footer-link">My Account</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-title">Categories</h4>
          <ul class="footer-list">
            <li><a href="/events?category=concerts" class="footer-link">Concerts</a></li>
            <li><a href="/events?category=sports" class="footer-link">Sports</a></li>
            <li><a href="/events?category=theater" class="footer-link">Theater</a></li>
            <li><a href="/events?category=movies" class="footer-link">Movies</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-title">Connect With Us</h4>
          <ul class="footer-list">
            <li><a href="#" class="footer-link"><i class="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="#" class="footer-link"><i class="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="#" class="footer-link"><i class="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="#" class="footer-link"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} TicketWave. All Rights Reserved.</p>
      </div>
    </div>
  `;
}
