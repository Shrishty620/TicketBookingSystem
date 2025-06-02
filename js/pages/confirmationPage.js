import { getBookingById, getEventById } from '../utils/dataService.js';

/**
 * Render the confirmation page
 * @param {HTMLElement} container - Container element
 * @param {Object} params - Route parameters
 */
export function renderConfirmationPage(container, params) {
  // Get booking by ID
  const booking = getBookingById(params.id);
  
  // If booking not found, show error
  if (!booking) {
    container.innerHTML = `
      <div class="container">
        <div class="error-container">
          <h2>Booking Not Found</h2>
          <p>The booking you're looking for doesn't exist or has been removed.</p>
          <a href="/events" class="btn btn-primary" data-navlink>Browse Events</a>
        </div>
      </div>
    `;
    return;
  }
  
  // Get event details
  const event = getEventById(booking.eventId);
  
  // Format date
  const eventDate = new Date(booking.eventDate);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Format booking date
  const bookingDate = new Date(booking.createdAt);
  const formattedBookingDate = bookingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Generate QR code placeholder (in a real app, this would be an actual QR code)
  const qrCodePlaceholder = `
    <div class="qr-placeholder">
      <i class="fas fa-qrcode"></i>
    </div>
  `;
  
  // Create HTML content
  let html = `
    <div class="container confirmation-page fade-in">
      <div class="confirmation-header">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h1>Booking Confirmed!</h1>
        <p>Your tickets have been booked successfully. Confirmation details have been sent to your email.</p>
      </div>
      
      <div class="confirmation-card">
        <div class="confirmation-card-header">
          <h2>Booking Details</h2>
          <div class="booking-ref">
            <span>Booking Reference:</span>
            <span class="ref-number">${booking.id}</span>
          </div>
        </div>
        
        <div class="confirmation-card-content">
          <div class="event-details">
            <div class="event-image">
              <img src="${event.image}" alt="${booking.eventTitle}">
            </div>
            <div class="event-info">
              <h3>${booking.eventTitle}</h3>
              <p><i class="far fa-calendar-alt"></i> ${formattedDate}</p>
              <p><i class="far fa-clock"></i> ${booking.eventTime}</p>
              <p><i class="fas fa-map-marker-alt"></i> ${booking.eventVenue}</p>
            </div>
          </div>
          
          <div class="ticket-details">
            <h3>Ticket Information</h3>
            <div class="ticket-seats">
              <p>Seats:</p>
              <div class="seat-list">
                ${booking.seats.map(seat => `<span class="seat-item">Seat ${seat.label}</span>`).join('')}
              </div>
            </div>
            <div class="ticket-qr">
              ${qrCodePlaceholder}
              <p>Scan this QR code at the venue</p>
            </div>
          </div>
          
          <div class="payment-details">
            <h3>Payment Information</h3>
            <div class="payment-info">
              <div class="payment-row">
                <span>Subtotal:</span>
                <span>$${booking.price.subtotal.toFixed(2)}</span>
              </div>
              <div class="payment-row">
                <span>Booking Fee:</span>
                <span>$${booking.price.bookingFee.toFixed(2)}</span>
              </div>
              <div class="payment-row total">
                <span>Total Paid:</span>
                <span>$${booking.price.total.toFixed(2)}</span>
              </div>
              <div class="payment-row">
                <span>Payment Method:</span>
                <span>${booking.paymentMethod}</span>
              </div>
              <div class="payment-row">
                <span>Payment Date:</span>
                <span>${formattedBookingDate}</span>
              </div>
            </div>
          </div>
          
          <div class="customer-details">
            <h3>Customer Information</h3>
            <div class="customer-info">
              <div class="customer-row">
                <span>Name:</span>
                <span>${booking.customer.firstName} ${booking.customer.lastName}</span>
              </div>
              <div class="customer-row">
                <span>Email:</span>
                <span>${booking.customer.email}</span>
              </div>
              <div class="customer-row">
                <span>Phone:</span>
                <span>${booking.customer.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="confirmation-actions">
        <button id="download-tickets" class="btn btn-primary"><i class="fas fa-download"></i> Download Tickets</button>
        <button id="email-tickets" class="btn btn-outline"><i class="fas fa-envelope"></i> Email Tickets</button>
      </div>
      
      <div class="next-steps">
        <h2>What's Next?</h2>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-icon">
              <i class="fas fa-ticket-alt"></i>
            </div>
            <h3>Your Tickets</h3>
            <p>Your tickets have been emailed to you. You can also download them or access them from your account.</p>
          </div>
          
          <div class="step-card">
            <div class="step-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <h3>Event Day</h3>
            <p>Arrive at the venue at least 30 minutes before the event starts. Have your tickets ready for scanning.</p>
          </div>
          
          <div class="step-card">
            <div class="step-icon">
              <i class="fas fa-user"></i>
            </div>
            <h3>Your Account</h3>
            <p>View your booking history and manage your tickets from your account dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Set HTML content
  container.innerHTML = html;
  
  // Add CSS for confirmation page specific components
  addConfirmationPageStyles();
  
  // Add event listeners
  setupEventListeners(container, booking);
}

/**
 * Set up event listeners for the confirmation page
 * @param {HTMLElement} container - Container element
 * @param {Object} booking - Booking data
 */
function setupEventListeners(container, booking) {
  // Download tickets button
  const downloadButton = container.querySelector('#download-tickets');
  
  downloadButton.addEventListener('click', () => {
    // In a real app, this would generate and download a PDF
    alert('In a real application, this would download a PDF ticket.');
  });
  
  // Email tickets button
  const emailButton = container.querySelector('#email-tickets');
  
  emailButton.addEventListener('click', () => {
    // In a real app, this would send an email
    alert(`Tickets have been re-sent to ${booking.customer.email}`);
  });
}

/**
 * Add confirmation page specific styles
 */
function addConfirmationPageStyles() {
  // Check if styles already exist
  if (document.getElementById('confirmation-page-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'confirmation-page-styles';
  
  styleElement.textContent = `
    .confirmation-header {
      text-align: center;
      margin-bottom: var(--space-4);
    }
    
    .success-icon {
      font-size: 4rem;
      color: var(--color-success);
      margin-bottom: var(--space-2);
    }
    
    .confirmation-card {
      background-color: white;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      margin-bottom: var(--space-4);
    }
    
    .confirmation-card-header {
      background-color: var(--color-primary);
      color: white;
      padding: var(--space-2);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .confirmation-card-header h2 {
      margin: 0;
      color: white;
    }
    
    .booking-ref {
      background-color: rgba(255, 255, 255, 0.2);
      padding: 0.5rem 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
    }
    
    .ref-number {
      font-weight: 600;
      margin-left: 0.5rem;
    }
    
    .confirmation-card-content {
      padding: var(--space-3);
    }
    
    .event-details {
      display: flex;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .event-image {
      width: 120px;
      flex-shrink: 0;
    }
    
    .event-image img {
      width: 100%;
      border-radius: var(--radius-md);
    }
    
    .event-info h3 {
      margin-top: 0;
      margin-bottom: var(--space-1);
    }
    
    .event-info p {
      margin: 0 0 var(--space-1) 0;
      color: var(--color-neutral-700);
    }
    
    .ticket-details {
      margin-bottom: var(--space-3);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .ticket-seats {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-2);
    }
    
    .seat-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .seat-item {
      background-color: var(--color-primary-light);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-sm);
      font-size: 0.875rem;
    }
    
    .ticket-qr {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: var(--space-2);
    }
    
    .qr-placeholder {
      width: 120px;
      height: 120px;
      background-color: var(--color-neutral-100);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      color: var(--color-neutral-800);
      margin-bottom: var(--space-1);
    }
    
    .ticket-qr p {
      font-size: 0.875rem;
      color: var(--color-neutral-600);
    }
    
    .payment-details,
    .customer-details {
      margin-bottom: var(--space-3);
    }
    
    .payment-row,
    .customer-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-1);
    }
    
    .payment-row.total {
      font-weight: 600;
      color: var(--color-primary);
      font-size: 1.125rem;
      padding-top: var(--space-1);
      margin-top: var(--space-1);
      border-top: 1px solid var(--color-neutral-200);
      margin-bottom: var(--space-2);
    }
    
    .confirmation-actions {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
    }
    
    .next-steps {
      text-align: center;
      margin-bottom: var(--space-4);
    }
    
    .next-steps h2 {
      margin-bottom: var(--space-3);
    }
    
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-3);
    }
    
    .step-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      box-shadow: var(--shadow-sm);
      text-align: center;
    }
    
    .step-icon {
      font-size: 2.5rem;
      color: var(--color-primary);
      margin-bottom: var(--space-2);
    }
    
    .step-card h3 {
      margin-bottom: var(--space-1);
    }
    
    .step-card p {
      color: var(--color-neutral-700);
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .confirmation-card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-1);
      }
      
      .event-details {
        flex-direction: column;
      }
      
      .event-image {
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
      }
      
      .ticket-seats {
        flex-direction: column;
        gap: var(--space-1);
      }
      
      .confirmation-actions {
        flex-direction: column;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}