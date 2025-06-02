import { getUserBookings, getEventById } from '../utils/dataService.js';
import { navigateTo } from '../utils/router.js';

/**
 * Render the account page
 * @param {HTMLElement} container - Container element
 */
export function renderAccountPage(container) {
  // Get user bookings
  const bookings = getUserBookings();
  
  // Create HTML content
  let html = `
    <div class="container account-page fade-in">
      <div class="account-header">
        <h1>My Account</h1>
      </div>
      
      <div class="account-content">
        <div class="account-sidebar">
          <div class="user-info">
            <div class="user-avatar">
              <i class="fas fa-user"></i>
            </div>
            <div class="user-details">
              <h3>Guest User</h3>
              <p>guest@example.com</p>
            </div>
          </div>
          
          <div class="account-nav">
            <button class="account-nav-item active" data-tab="bookings">
              <i class="fas fa-ticket-alt"></i> My Bookings
            </button>
            <button class="account-nav-item" data-tab="profile">
              <i class="fas fa-user-edit"></i> Profile
            </button>
            <button class="account-nav-item" data-tab="preferences">
              <i class="fas fa-cog"></i> Preferences
            </button>
            <button class="account-nav-item" data-tab="payment">
              <i class="fas fa-credit-card"></i> Payment Methods
            </button>
          </div>
        </div>
        
        <div class="account-main">
          <!-- Bookings Tab -->
          <div class="account-tab active" id="bookings-tab">
            <div class="tab-header">
              <h2>My Bookings</h2>
              <a href="/events" class="btn btn-outline" data-navlink>Find Events</a>
            </div>
            
            ${bookings.length === 0 ? 
              `<div class="empty-state">
                <div class="empty-icon">
                  <i class="fas fa-ticket-alt"></i>
                </div>
                <h3>No Bookings Yet</h3>
                <p>You haven't booked any tickets yet. Browse events to find something you'll love!</p>
                <a href="/events" class="btn btn-primary" data-navlink>Browse Events</a>
              </div>` 
              : 
              `<div class="bookings-list">
                ${bookings.map(booking => {
                  const event = getEventById(booking.eventId);
                  
                  // Format date
                  const eventDate = new Date(booking.eventDate);
                  const formattedDate = eventDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  
                  // Format booking date
                  const bookingDate = new Date(booking.createdAt);
                  const formattedBookingDate = bookingDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });
                  
                  // Check if event is past
                  const isPastEvent = new Date(booking.eventDate) < new Date();
                  
                  return `
                    <div class="booking-item ${isPastEvent ? 'past-event' : ''}">
                      <div class="booking-image">
                        <img src="${event.image}" alt="${booking.eventTitle}">
                        ${isPastEvent ? '<div class="past-badge">Past</div>' : ''}
                      </div>
                      <div class="booking-details">
                        <h3>${booking.eventTitle}</h3>
                        <div class="booking-meta">
                          <span><i class="far fa-calendar-alt"></i> ${formattedDate} at ${booking.eventTime}</span>
                          <span><i class="fas fa-map-marker-alt"></i> ${booking.eventVenue}</span>
                          <span><i class="fas fa-ticket-alt"></i> ${booking.seats.length} ticket(s)</span>
                        </div>
                        <div class="booking-info">
                          <span>Booked on: ${formattedBookingDate}</span>
                          <span>Total: $${booking.price.total.toFixed(2)}</span>
                        </div>
                      </div>
                      <div class="booking-actions">
                        <a href="/confirmation/${booking.id}" class="btn btn-outline" data-navlink>View Details</a>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>`
            }
          </div>
          
          <!-- Profile Tab -->
          <div class="account-tab" id="profile-tab">
            <div class="tab-header">
              <h2>Profile Information</h2>
              <button class="btn btn-outline">Edit Profile</button>
            </div>
            
            <div class="profile-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-firstName" class="form-label">First Name</label>
                  <input type="text" id="profile-firstName" class="form-control" value="Guest" disabled>
                </div>
                
                <div class="form-group">
                  <label for="profile-lastName" class="form-label">Last Name</label>
                  <input type="text" id="profile-lastName" class="form-control" value="User" disabled>
                </div>
              </div>
              
              <div class="form-group">
                <label for="profile-email" class="form-label">Email Address</label>
                <input type="email" id="profile-email" class="form-control" value="guest@example.com" disabled>
              </div>
              
              <div class="form-group">
                <label for="profile-phone" class="form-label">Phone Number</label>
                <input type="tel" id="profile-phone" class="form-control" value="(555) 123-4567" disabled>
              </div>
              
              <p class="profile-note">
                <i class="fas fa-info-circle"></i> 
                This is a demo. In a real application, you would be able to edit your profile information.
              </p>
            </div>
          </div>
          
          <!-- Preferences Tab -->
          <div class="account-tab" id="preferences-tab">
            <div class="tab-header">
              <h2>Preferences</h2>
              <button class="btn btn-outline">Save Changes</button>
            </div>
            
            <div class="preferences-form">
              <div class="form-group">
                <label class="form-label">Email Notifications</label>
                <div class="checkbox-group">
                  <div class="checkbox-item">
                    <input type="checkbox" id="notify-bookings" checked>
                    <label for="notify-bookings">Booking confirmations</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="notify-reminders" checked>
                    <label for="notify-reminders">Event reminders</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="notify-promotions" checked>
                    <label for="notify-promotions">Promotions and special offers</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="notify-similar" checked>
                    <label for="notify-similar">Similar events</label>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label">Event Preferences</label>
                <div class="checkbox-group">
                  <div class="checkbox-item">
                    <input type="checkbox" id="pref-concerts" checked>
                    <label for="pref-concerts">Concerts</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="pref-sports" checked>
                    <label for="pref-sports">Sports</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="pref-theater">
                    <label for="pref-theater">Theater</label>
                  </div>
                  <div class="checkbox-item">
                    <input type="checkbox" id="pref-movies">
                    <label for="pref-movies">Movies</label>
                  </div>
                </div>
              </div>
              
              <p class="preferences-note">
                <i class="fas fa-info-circle"></i> 
                This is a demo. In a real application, your preferences would be saved and used to personalize your experience.
              </p>
            </div>
          </div>
          
          <!-- Payment Methods Tab -->
          <div class="account-tab" id="payment-tab">
            <div class="tab-header">
              <h2>Payment Methods</h2>
              <button class="btn btn-outline">Add Payment Method</button>
            </div>
            
            <div class="payment-methods">
              <div class="payment-card">
                <div class="card-type">
                  <i class="fab fa-cc-visa"></i>
                </div>
                <div class="card-details">
                  <div class="card-number">**** **** **** 1234</div>
                  <div class="card-expiry">Expires: 12/25</div>
                </div>
                <div class="card-actions">
                  <button class="btn-icon"><i class="fas fa-pencil-alt"></i></button>
                  <button class="btn-icon"><i class="fas fa-trash-alt"></i></button>
                </div>
              </div>
              
              <p class="payment-note">
                <i class="fas fa-info-circle"></i> 
                This is a demo. In a real application, you would be able to manage your payment methods securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Set HTML content
  container.innerHTML = html;
  
  // Add CSS for account page specific components
  addAccountPageStyles();
  
  // Add event listeners
  setupEventListeners(container);
}

/**
 * Set up event listeners for the account page
 * @param {HTMLElement} container - Container element
 */
function setupEventListeners(container) {
  // Tab navigation
  const navItems = container.querySelectorAll('.account-nav-item');
  const tabs = container.querySelectorAll('.account-tab');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.dataset.tab;
      
      // Update active navigation item
      navItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      item.classList.add('active');
      
      // Show target tab
      tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === `${targetTab}-tab`) {
          tab.classList.add('active');
        }
      });
    });
  });
}

/**
 * Add account page specific styles
 */
function addAccountPageStyles() {
  // Check if styles already exist
  if (document.getElementById('account-page-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'account-page-styles';
  
  styleElement.textContent = `
    .account-header {
      margin-bottom: var(--space-3);
    }
    
    .account-content {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: var(--space-3);
    }
    
    .account-sidebar {
      background-color: white;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2);
      background-color: var(--color-primary);
      color: white;
    }
    
    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .user-details h3 {
      margin: 0;
      color: white;
    }
    
    .user-details p {
      margin: 0;
      font-size: 0.875rem;
      opacity: 0.8;
    }
    
    .account-nav {
      padding: var(--space-2);
    }
    
    .account-nav-item {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-1) var(--space-2);
      width: 100%;
      text-align: left;
      background: none;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
      margin-bottom: 0.25rem;
    }
    
    .account-nav-item:hover {
      background-color: var(--color-neutral-100);
    }
    
    .account-nav-item.active {
      background-color: var(--color-primary-light);
      color: white;
    }
    
    .account-main {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
    }
    
    .account-tab {
      display: none;
      padding: var(--space-3);
    }
    
    .account-tab.active {
      display: block;
    }
    
    .tab-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-3);
      padding-bottom: var(--space-2);
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .tab-header h2 {
      margin: 0;
    }
    
    .empty-state {
      padding: var(--space-4);
      text-align: center;
    }
    
    .empty-icon {
      font-size: 3rem;
      color: var(--color-neutral-400);
      margin-bottom: var(--space-2);
    }
    
    .bookings-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    
    .booking-item {
      display: grid;
      grid-template-columns: 100px 1fr auto;
      gap: var(--space-2);
      padding: var(--space-2);
      border-radius: var(--radius-md);
      background-color: var(--color-neutral-50);
      transition: transform var(--transition-fast);
    }
    
    .booking-item:hover {
      transform: translateY(-2px);
    }
    
    .booking-item.past-event {
      opacity: 0.7;
    }
    
    .booking-image {
      position: relative;
    }
    
    .booking-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--radius-sm);
    }
    
    .past-badge {
      position: absolute;
      top: 5px;
      right: 5px;
      background-color: var(--color-neutral-600);
      color: white;
      font-size: 0.75rem;
      padding: 0.1rem 0.5rem;
      border-radius: var(--radius-sm);
    }
    
    .booking-details h3 {
      margin: 0 0 var(--space-1) 0;
      font-size: 1.125rem;
    }
    
    .booking-meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      font-size: 0.875rem;
      color: var(--color-neutral-700);
      margin-bottom: var(--space-1);
    }
    
    .booking-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: var(--color-neutral-600);
    }
    
    .booking-actions {
      display: flex;
      align-items: center;
    }
    
    .form-row {
      display: flex;
      gap: var(--space-2);
    }
    
    .form-row .form-group {
      flex: 1;
    }
    
    .profile-note,
    .preferences-note,
    .payment-note {
      margin-top: var(--space-2);
      padding: var(--space-2);
      background-color: var(--color-neutral-100);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      color: var(--color-neutral-700);
    }
    
    .checkbox-group {
      margin-top: var(--space-1);
    }
    
    .checkbox-item {
      display: flex;
      align-items: center;
      margin-bottom: var(--space-1);
    }
    
    .checkbox-item input {
      margin-right: var(--space-1);
    }
    
    .payment-card {
      display: flex;
      align-items: center;
      padding: var(--space-2);
      background-color: var(--color-neutral-100);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-2);
    }
    
    .card-type {
      font-size: 2rem;
      color: var(--color-primary);
      margin-right: var(--space-2);
    }
    
    .card-details {
      flex: 1;
    }
    
    .card-number {
      font-weight: 500;
    }
    
    .card-expiry {
      font-size: 0.875rem;
      color: var(--color-neutral-600);
    }
    
    .card-actions {
      display: flex;
      gap: var(--space-1);
    }
    
    .btn-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-neutral-200);
      border: none;
      cursor: pointer;
      transition: background-color var(--transition-fast);
    }
    
    .btn-icon:hover {
      background-color: var(--color-neutral-300);
    }
    
    @media (max-width: 992px) {
      .account-content {
        grid-template-columns: 1fr;
      }
      
      .account-nav {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-1);
      }
      
      .account-nav-item {
        flex: 1;
        min-width: 120px;
      }
    }
    
    @media (max-width: 768px) {
      .booking-item {
        grid-template-columns: 1fr;
      }
      
      .booking-image {
        width: 100%;
        max-width: 200px;
      }
      
      .booking-actions {
        justify-content: flex-start;
        margin-top: var(--space-1);
      }
      
      .form-row {
        flex-direction: column;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}