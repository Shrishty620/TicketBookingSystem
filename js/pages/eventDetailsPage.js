import { getEventById } from '../utils/dataService.js';
import { navigateTo } from '../utils/router.js';

/**
 * Render the event details page
 * @param {HTMLElement} container - Container element
 * @param {Object} params - Route parameters
 */
export function renderEventDetailsPage(container, params) {
  // Get event by ID
  const event = getEventById(params.id);
  
  // If event not found, show error
  if (!event) {
    container.innerHTML = `
      <div class="container">
        <div class="error-container">
          <h2>Event Not Found</h2>
          <p>The event you're looking for doesn't exist or has been removed.</p>
          <a href="/events" class="btn btn-primary" data-navlink>Browse Events</a>
        </div>
      </div>
    `;
    return;
  }
  
  // Format date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Calculate availability status
  let availabilityClass = 'text-success';
  let availabilityText = 'Available';
  
  if (event.availableSeats <= 0) {
    availabilityClass = 'text-error';
    availabilityText = 'Sold Out';
  } else if (event.availableSeats < event.capacity * 0.2) {
    availabilityClass = 'text-warning';
    availabilityText = 'Almost Sold Out';
  }
  
  // Create HTML content
  let html = `
    <div class="container event-details fade-in">
      <div class="event-header">
        <div class="breadcrumbs">
          <a href="/" data-navlink>Home</a> &gt;
          <a href="/events" data-navlink>Events</a> &gt;
          <span>${event.title}</span>
        </div>
        
        <div class="event-banner" style="background-image: url('${event.image}');">
          <div class="event-banner-overlay"></div>
          <div class="event-banner-content">
            <h1>${event.title}</h1>
            <div class="event-meta">
              <span><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
              <span><i class="far fa-clock"></i> ${event.time}</span>
              <span><i class="fas fa-map-marker-alt"></i> ${event.venue}, ${event.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="event-content">
        <div class="event-main">
          <div class="event-section">
            <h2>About this Event</h2>
            <p>${event.description}</p>
          </div>
          
          <div class="event-section">
            <h2>Venue Information</h2>
            <p><strong>${event.venue}</strong></p>
            <p>${event.location}</p>
            <div class="venue-map">
              <!-- In a real app, this would be an interactive map -->
              <div class="map-placeholder">
                <i class="fas fa-map-marked-alt"></i>
                <span>Map view would display here</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="event-sidebar">
          <div class="booking-card">
            <div class="booking-card-header">
              <h3>Ticket Information</h3>
            </div>
            <div class="booking-card-content">
              <div class="ticket-price">
                <span class="price-label">Price:</span>
                <span class="price-value">$${event.price.toFixed(2)}</span>
              </div>
              
              <div class="ticket-availability">
                <span class="availability-label">Availability:</span>
                <span class="availability-value ${availabilityClass}">${availabilityText}</span>
              </div>
              
              <div class="ticket-count">
                <span class="count-label">Remaining:</span>
                <span class="count-value">${event.availableSeats} / ${event.capacity} tickets</span>
              </div>
              
              <div class="booking-actions">
                <button class="btn btn-primary btn-book" ${event.availableSeats <= 0 ? 'disabled' : ''}>
                  ${event.availableSeats <= 0 ? 'Sold Out' : 'Book Tickets'}
                </button>
              </div>
            </div>
          </div>
          
          <div class="share-card">
            <h3>Share this Event</h3>
            <div class="share-buttons">
              <button class="share-btn facebook"><i class="fab fa-facebook-f"></i></button>
              <button class="share-btn twitter"><i class="fab fa-twitter"></i></button>
              <button class="share-btn email"><i class="fas fa-envelope"></i></button>
              <button class="share-btn link"><i class="fas fa-link"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Set HTML content
  container.innerHTML = html;
  
  // Add CSS for event details page specific components
  addEventDetailsStyles();
  
  // Add event listeners
  setupEventListeners(container, event);
}

/**
 * Set up event listeners for the event details page
 * @param {HTMLElement} container - Container element
 * @param {Object} event - Event data
 */
function setupEventListeners(container, event) {
  // Book button
  const bookButton = container.querySelector('.btn-book');
  
  if (bookButton && !bookButton.disabled) {
    bookButton.addEventListener('click', () => {
      navigateTo(`/booking/${event.id}`);
    });
  }
  
  // Share buttons (in a real app, these would open share dialogs)
  const shareButtons = container.querySelectorAll('.share-btn');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      const url = window.location.href;
      const title = `Check out ${event.title} on TicketWave!`;
      
      if (button.classList.contains('facebook')) {
        alert(`Share on Facebook: ${title} - ${url}`);
      } else if (button.classList.contains('twitter')) {
        alert(`Share on Twitter: ${title} - ${url}`);
      } else if (button.classList.contains('email')) {
        alert(`Share via Email: ${title} - ${url}`);
      } else if (button.classList.contains('link')) {
        // Copy to clipboard
        navigator.clipboard.writeText(url)
          .then(() => {
            alert('Link copied to clipboard!');
          })
          .catch(err => {
            console.error('Failed to copy link: ', err);
          });
      }
    });
  });
}

/**
 * Add event details page specific styles
 */
function addEventDetailsStyles() {
  // Check if styles already exist
  if (document.getElementById('event-details-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'event-details-styles';
  
  styleElement.textContent = `
    .event-details {
      padding-bottom: var(--space-4);
    }
    
    .breadcrumbs {
      margin-bottom: var(--space-2);
      color: var(--color-neutral-600);
    }
    
    .breadcrumbs a {
      color: var(--color-primary);
      text-decoration: none;
    }
    
    .breadcrumbs a:hover {
      text-decoration: underline;
    }
    
    .event-banner {
      position: relative;
      height: 400px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background-size: cover;
      background-position: center;
      margin-bottom: var(--space-3);
    }
    
    .event-banner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
    }
    
    .event-banner-content {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: var(--space-3);
      color: white;
    }
    
    .event-banner-content h1 {
      margin-bottom: var(--space-1);
      color: white;
    }
    
    .event-meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .event-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-3);
    }
    
    .event-section {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      margin-bottom: var(--space-3);
      box-shadow: var(--shadow-sm);
    }
    
    .event-section h2 {
      margin-bottom: var(--space-2);
      color: var(--color-neutral-900);
    }
    
    .venue-map {
      margin-top: var(--space-2);
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    
    .map-placeholder {
      height: 200px;
      background-color: var(--color-neutral-200);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--color-neutral-600);
    }
    
    .map-placeholder i {
      font-size: 2rem;
      margin-bottom: var(--space-1);
    }
    
    .booking-card {
      background-color: white;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      margin-bottom: var(--space-3);
    }
    
    .booking-card-header {
      background-color: var(--color-primary);
      color: white;
      padding: var(--space-2);
    }
    
    .booking-card-header h3 {
      margin: 0;
      color: white;
    }
    
    .booking-card-content {
      padding: var(--space-2);
    }
    
    .ticket-price,
    .ticket-availability,
    .ticket-count {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-1);
      padding-bottom: var(--space-1);
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .price-value {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-primary);
    }
    
    .booking-actions {
      margin-top: var(--space-2);
    }
    
    .btn-book {
      width: 100%;
    }
    
    .btn-book[disabled] {
      background-color: var(--color-neutral-400);
      cursor: not-allowed;
    }
    
    .share-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-2);
      box-shadow: var(--shadow-sm);
    }
    
    .share-card h3 {
      margin-bottom: var(--space-2);
    }
    
    .share-buttons {
      display: flex;
      justify-content: space-between;
    }
    
    .share-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border: none;
      cursor: pointer;
      transition: transform var(--transition-fast);
    }
    
    .share-btn:hover {
      transform: translateY(-2px);
    }
    
    .share-btn.facebook {
      background-color: #3b5998;
    }
    
    .share-btn.twitter {
      background-color: #1da1f2;
    }
    
    .share-btn.email {
      background-color: #ea4335;
    }
    
    .share-btn.link {
      background-color: var(--color-neutral-700);
    }
    
    @media (max-width: 992px) {
      .event-content {
        grid-template-columns: 1fr;
      }
      
      .event-banner {
        height: 300px;
      }
    }
    
    @media (max-width: 576px) {
      .event-meta {
        flex-direction: column;
        gap: var(--space-1);
      }
      
      .event-banner {
        height: 250px;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}