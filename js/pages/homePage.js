import { getFeaturedEvents } from '../utils/dataService.js';
import { createEventCard } from '../components/eventCard.js';

/**
 * Render the home page
 * @param {HTMLElement} container - Container element
 */
export function renderHomePage(container) {
  // Get featured events
  const featuredEvents = getFeaturedEvents();
  
  // Create HTML content
  let html = `
    <div class="hero fade-in">
      <img src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" alt="Event Hero" class="hero-img">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Experience Unforgettable Events</h1>
        <p class="hero-subtitle">Book tickets to your favorite concerts, sports events, movies, and more.</p>
        <a href="/events" class="btn btn-primary" data-navlink>Browse Events</a>
      </div>
    </div>
    
    <div class="container">
      <section class="featured-events py-4">
        <div class="section-header">
          <h2 class="text-center mb-3">Featured Events</h2>
          <p class="text-center mb-4">Don't miss out on these popular events</p>
        </div>
        
        <div class="event-grid">
          ${featuredEvents.map(event => createEventCard(event)).join('')}
        </div>
        
        <div class="text-center mt-4">
          <a href="/events" class="btn btn-outline" data-navlink>View All Events</a>
        </div>
      </section>
      
      <section class="categories py-4">
        <div class="section-header">
          <h2 class="text-center mb-3">Browse by Category</h2>
          <p class="text-center mb-4">Find your perfect event</p>
        </div>
        
        <div class="category-grid">
          <a href="/events?category=concerts" class="category-card" data-navlink>
            <div class="category-icon">
              <i class="fas fa-music"></i>
            </div>
            <h3>Concerts</h3>
          </a>
          
          <a href="/events?category=sports" class="category-card" data-navlink>
            <div class="category-icon">
              <i class="fas fa-basketball-ball"></i>
            </div>
            <h3>Sports</h3>
          </a>
          
          <a href="/events?category=theater" class="category-card" data-navlink>
            <div class="category-icon">
              <i class="fas fa-theater-masks"></i>
            </div>
            <h3>Theater</h3>
          </a>
          
          <a href="/events?category=movies" class="category-card" data-navlink>
            <div class="category-icon">
              <i class="fas fa-film"></i>
            </div>
            <h3>Movies</h3>
          </a>
        </div>
      </section>
      
      <section class="benefits py-4">
        <div class="section-header">
          <h2 class="text-center mb-3">Why Choose TicketWave</h2>
          <p class="text-center mb-4">We make booking easy and secure</p>
        </div>
        
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-ticket-alt"></i>
            </div>
            <h3>Easy Booking</h3>
            <p>Book tickets in just a few clicks</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-lock"></i>
            </div>
            <h3>Secure Payments</h3>
            <p>Your transactions are always protected</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-tags"></i>
            </div>
            <h3>Best Prices</h3>
            <p>Get access to exclusive deals and offers</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Our team is always here to help</p>
          </div>
        </div>
      </section>
    </div>
  `;
  
  // Set HTML content
  container.innerHTML = html;
  
  // Add CSS for home page specific components
  addHomePageStyles();
}

/**
 * Add home page specific styles
 */
function addHomePageStyles() {
  // Check if styles already exist
  if (document.getElementById('home-page-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'home-page-styles';
  
  styleElement.textContent = `
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-3);
      margin: var(--space-3) 0;
    }
    
    .category-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-3);
      text-align: center;
      text-decoration: none;
      color: var(--color-neutral-900);
      transition: transform var(--transition-normal), box-shadow var(--transition-normal);
    }
    
    .category-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .category-icon {
      font-size: 2.5rem;
      color: var(--color-primary);
      margin-bottom: var(--space-2);
    }
    
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-3);
      margin: var(--space-3) 0;
    }
    
    .benefit-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-3);
      text-align: center;
      transition: transform var(--transition-normal);
    }
    
    .benefit-card:hover {
      transform: translateY(-4px);
    }
    
    .benefit-icon {
      font-size: 2.5rem;
      color: var(--color-primary);
      margin-bottom: var(--space-2);
    }
    
    .event-card .card-img-container {
      position: relative;
      overflow: hidden;
      height: 200px;
    }
    
    .event-card .card-img {
      transition: transform var(--transition-normal);
    }
    
    .event-card:hover .card-img {
      transform: scale(1.05);
    }
    
    .event-category {
      position: absolute;
      top: var(--space-1);
      right: var(--space-1);
      background-color: var(--color-primary);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-md);
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--space-1);
    }
    
    .availability-badge {
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      color: white;
    }
    
    .full-width {
      width: 100%;
    }
    
    @media (max-width: 768px) {
      .category-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 576px) {
      .category-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}