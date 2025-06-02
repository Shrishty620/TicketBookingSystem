import { getEventById, createBooking } from '../utils/dataService.js';
import { navigateTo } from '../utils/router.js';
import { initSeatSelector, getSelectedSeats } from '../components/seatSelector.js';
import { showModal } from '../components/modal.js';

/**
 * Render the booking page
 * @param {HTMLElement} container - Container element
 * @param {Object} params - Route parameters
 */
export function renderBookingPage(container, params) {
  // Get event by ID
  const event = getEventById(params.id);
  
  // If event not found or sold out, show error
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
  
  if (event.availableSeats <= 0) {
    container.innerHTML = `
      <div class="container">
        <div class="error-container">
          <h2>Event Sold Out</h2>
          <p>Sorry, this event is sold out. Please check back later or browse other events.</p>
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
  
  // Create HTML content
  let html = `
    <div class="container booking-page fade-in">
      <div class="booking-header">
        <div class="breadcrumbs">
          <a href="/" data-navlink>Home</a> &gt;
          <a href="/events" data-navlink>Events</a> &gt;
          <a href="/event/${event.id}" data-navlink>${event.title}</a> &gt;
          <span>Book Tickets</span>
        </div>
        
        <h1>Book Tickets</h1>
      </div>
      
      <div class="booking-progress">
        <div class="progress-step active">
          <div class="step-number">1</div>
          <div class="step-label">Select Seats</div>
        </div>
        <div class="progress-step">
          <div class="step-number">2</div>
          <div class="step-label">Your Details</div>
        </div>
        <div class="progress-step">
          <div class="step-number">3</div>
          <div class="step-label">Payment</div>
        </div>
        <div class="progress-step">
          <div class="step-number">4</div>
          <div class="step-label">Confirmation</div>
        </div>
      </div>
      
      <div class="booking-content">
        <div class="booking-main">
          <!-- Step 1: Seat Selection -->
          <div class="booking-step active" id="step-1">
            <div class="booking-section">
              <h2>Select Your Seats</h2>
              <p>Click on available seats to select them. Click again to deselect.</p>
              
              <div id="seat-selector"></div>
            </div>
          </div>
          
          <!-- Step 2: User Details -->
          <div class="booking-step" id="step-2">
            <div class="booking-section">
              <h2>Your Details</h2>
              <p>Please provide your contact information.</p>
              
              <form id="booking-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" id="firstName" class="form-control" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" id="lastName" class="form-control" required>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">Email Address</label>
                  <input type="email" id="email" class="form-control" required>
                </div>
                
                <div class="form-group">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input type="tel" id="phone" class="form-control" required>
                </div>
              </form>
            </div>
          </div>
          
          <!-- Step 3: Payment -->
          <div class="booking-step" id="step-3">
            <div class="booking-section">
              <h2>Payment Details</h2>
              <p>Enter your payment information to complete the booking.</p>
              
              <form id="payment-form">
                <div class="form-group">
                  <label for="cardName" class="form-label">Name on Card</label>
                  <input type="text" id="cardName" class="form-control" required>
                </div>
                
                <div class="form-group">
                  <label for="cardNumber" class="form-label">Card Number</label>
                  <input type="text" id="cardNumber" class="form-control" placeholder="XXXX XXXX XXXX XXXX" required>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="expiry" class="form-label">Expiry Date</label>
                    <input type="text" id="expiry" class="form-control" placeholder="MM/YY" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="cvv" class="form-label">CVV</label>
                    <input type="text" id="cvv" class="form-control" placeholder="XXX" required>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div class="booking-sidebar">
          <div class="order-summary">
            <div class="order-summary-header">
              <h3>Order Summary</h3>
            </div>
            
            <div class="order-summary-content">
              <div class="event-summary">
                <img src="${event.image}" alt="${event.title}" class="event-summary-img">
                <div class="event-summary-details">
                  <h4>${event.title}</h4>
                  <p><i class="far fa-calendar-alt"></i> ${formattedDate} at ${event.time}</p>
                  <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                </div>
              </div>
              
              <div class="order-items">
                <div id="order-seats">
                  <p>No seats selected</p>
                </div>
              </div>
              
              <div class="order-total">
                <div class="order-line">
                  <span>Subtotal:</span>
                  <span id="subtotal">$0.00</span>
                </div>
                <div class="order-line">
                  <span>Booking Fee:</span>
                  <span id="booking-fee">$0.00</span>
                </div>
                <div class="order-line total">
                  <span>Total:</span>
                  <span id="total-amount">$0.00</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="booking-actions">
            <button id="prev-step" class="btn btn-outline" disabled>Previous</button>
            <button id="next-step" class="btn btn-primary" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Set HTML content
  container.innerHTML = html;
  
  // Add CSS for booking page specific components
  addBookingPageStyles();
  
  // Initialize the seat selector
  const seatSelectorContainer = document.getElementById('seat-selector');
  initSeatSelector(seatSelectorContainer, event, updateOrderSummary);
  
  // Add event listeners
  setupEventListeners(container, event);
}

/**
 * Update the order summary based on selected seats
 * @param {Array} selectedSeats - Array of selected seat objects
 */
function updateOrderSummary(selectedSeats) {
  const orderSeatsElement = document.getElementById('order-seats');
  const subtotalElement = document.getElementById('subtotal');
  const bookingFeeElement = document.getElementById('booking-fee');
  const totalAmountElement = document.getElementById('total-amount');
  const nextButton = document.getElementById('next-step');
  
  if (selectedSeats.length === 0) {
    orderSeatsElement.innerHTML = '<p>No seats selected</p>';
    subtotalElement.textContent = '$0.00';
    bookingFeeElement.textContent = '$0.00';
    totalAmountElement.textContent = '$0.00';
    nextButton.disabled = true;
    return;
  }
  
  // Get event price from the DOM (in a real app, would be better to pass this in)
  const eventPrice = parseFloat(document.querySelector('.event-summary-details h4').textContent.split('$')[1]) || 0;
  
  // Calculate values
  const subtotal = selectedSeats.length * eventPrice;
  const bookingFee = selectedSeats.length * 2.50; // $2.50 per ticket
  const total = subtotal + bookingFee;
  
  // Sort seats by label for better presentation
  const sortedSeats = [...selectedSeats].sort((a, b) => a.label.localeCompare(b.label));
  
  // Update order seats
  let seatsHtml = `<div class="order-item-header">Selected Seats:</div>`;
  
  sortedSeats.forEach(seat => {
    seatsHtml += `
      <div class="order-item">
        <span>Seat ${seat.label}</span>
        <span>$${eventPrice.toFixed(2)}</span>
      </div>
    `;
  });
  
  orderSeatsElement.innerHTML = seatsHtml;
  
  // Update totals
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  bookingFeeElement.textContent = `$${bookingFee.toFixed(2)}`;
  totalAmountElement.textContent = `$${total.toFixed(2)}`;
  
  // Enable next button
  nextButton.disabled = false;
}

/**
 * Set up event listeners for the booking page
 * @param {HTMLElement} container - Container element
 * @param {Object} event - Event data
 */
function setupEventListeners(container, event) {
  const prevButton = document.getElementById('prev-step');
  const nextButton = document.getElementById('next-step');
  
  let currentStep = 1;
  const totalSteps = 3;
  
  // Handle navigation buttons
  prevButton.addEventListener('click', () => {
    if (currentStep > 1) {
      updateStep(currentStep - 1);
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        updateStep(currentStep + 1);
      } else {
        // Final step - process booking
        processBooking(event);
      }
    }
  });
  
  /**
   * Update the visible step
   * @param {number} step - Step number to show
   */
  function updateStep(step) {
    // Update current step
    currentStep = step;
    
    // Update step visibility
    const steps = container.querySelectorAll('.booking-step');
    steps.forEach((stepElement, index) => {
      if (index + 1 === step) {
        stepElement.classList.add('active');
      } else {
        stepElement.classList.remove('active');
      }
    });
    
    // Update progress indicator
    const progressSteps = container.querySelectorAll('.progress-step');
    progressSteps.forEach((progressStep, index) => {
      if (index + 1 <= step) {
        progressStep.classList.add('active');
      } else {
        progressStep.classList.remove('active');
      }
    });
    
    // Update button states
    prevButton.disabled = (step === 1);
    nextButton.textContent = (step === totalSteps) ? 'Complete Booking' : 'Next';
  }
  
  /**
   * Validate the current step
   * @returns {boolean} - Whether the step is valid
   */
  function validateCurrentStep() {
    if (currentStep === 1) {
      // Validate seat selection
      const selectedSeats = getSelectedSeats();
      return selectedSeats.length > 0;
    } else if (currentStep === 2) {
      // Validate user details form
      const form = document.getElementById('booking-form');
      return form.checkValidity();
    } else if (currentStep === 3) {
      // Validate payment form
      const form = document.getElementById('payment-form');
      return form.checkValidity();
    }
    
    return true;
  }
  
  /**
   * Process the booking
   * @param {Object} event - Event data
   */
  function processBooking(event) {
    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Get selected seats
    const selectedSeats = getSelectedSeats();
    
    // Calculate totals
    const subtotal = selectedSeats.length * event.price;
    const bookingFee = selectedSeats.length * 2.50;
    const total = subtotal + bookingFee;
    
    // Create booking object
    const booking = {
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      customer: {
        firstName,
        lastName,
        email,
        phone
      },
      seats: selectedSeats,
      price: {
        subtotal,
        bookingFee,
        total
      },
      paymentMethod: 'Credit Card'
    };
    
    // In a real app, this would call an API to process payment
    // For this demo, we'll simulate a successful payment
    
    // Show loading modal
    const loadingModal = showModal({
      title: 'Processing Payment',
      content: `
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Please wait while we process your payment...</p>
        </div>
      `,
      buttons: []
    });
    
    // Simulate API call
    setTimeout(() => {
      // Close loading modal
      loadingModal.close();
      
      // Create booking in data service
      const newBooking = createBooking(booking);
      
      // Navigate to confirmation page
      navigateTo(`/confirmation/${newBooking.id}`);
    }, 2000);
  }
}

/**
 * Add booking page specific styles
 */
function addBookingPageStyles() {
  // Check if styles already exist
  if (document.getElementById('booking-page-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'booking-page-styles';
  
  styleElement.textContent = `
    .booking-header {
      margin-bottom: var(--space-3);
    }
    
    .booking-progress {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-3);
      padding: 0 var(--space-3);
    }
    
    .progress-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      flex: 1;
    }
    
    .progress-step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 20px;
      left: 50%;
      width: 100%;
      height: 2px;
      background-color: var(--color-neutral-300);
      z-index: 1;
    }
    
    .progress-step.active:not(:last-child)::after {
      background-color: var(--color-primary);
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--color-neutral-300);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-bottom: var(--space-1);
      position: relative;
      z-index: 2;
    }
    
    .progress-step.active .step-number {
      background-color: var(--color-primary);
    }
    
    .step-label {
      font-size: 0.875rem;
      color: var(--color-neutral-600);
    }
    
    .progress-step.active .step-label {
      color: var(--color-primary);
      font-weight: 500;
    }
    
    .booking-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-3);
    }
    
    .booking-section {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      margin-bottom: var(--space-3);
      box-shadow: var(--shadow-sm);
    }
    
    .booking-section h2 {
      margin-bottom: var(--space-2);
    }
    
    .booking-step {
      display: none;
    }
    
    .booking-step.active {
      display: block;
    }
    
    .order-summary {
      background-color: white;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      margin-bottom: var(--space-3);
    }
    
    .order-summary-header {
      background-color: var(--color-primary);
      color: white;
      padding: var(--space-2);
    }
    
    .order-summary-header h3 {
      margin: 0;
      color: white;
    }
    
    .order-summary-content {
      padding: var(--space-2);
    }
    
    .event-summary {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-2);
      padding-bottom: var(--space-2);
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .event-summary-img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: var(--radius-md);
    }
    
    .event-summary-details h4 {
      margin: 0 0 var(--space-1) 0;
      font-size: 1rem;
    }
    
    .event-summary-details p {
      margin: 0 0 var(--space-1) 0;
      font-size: 0.875rem;
      color: var(--color-neutral-600);
    }
    
    .order-items {
      margin-bottom: var(--space-2);
      padding-bottom: var(--space-2);
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .order-item-header {
      font-weight: 500;
      margin-bottom: var(--space-1);
    }
    
    .order-item {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      margin-bottom: var(--space-1);
    }
    
    .order-total {
      margin-top: var(--space-2);
    }
    
    .order-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-1);
    }
    
    .order-line.total {
      font-weight: 600;
      font-size: 1.125rem;
      margin-top: var(--space-1);
      padding-top: var(--space-1);
      border-top: 1px solid var(--color-neutral-200);
    }
    
    .booking-actions {
      display: flex;
      justify-content: space-between;
    }
    
    .form-row {
      display: flex;
      gap: var(--space-2);
    }
    
    .form-row .form-group {
      flex: 1;
    }
    
    /* Seat layout styles */
    .seat-layout-container {
      margin-top: var(--space-3);
    }
    
    .screen-container {
      text-align: center;
      margin-bottom: var(--space-3);
    }
    
    .screen {
      height: 10px;
      background-color: var(--color-primary);
      width: 80%;
      margin: 0 auto var(--space-1);
      border-radius: var(--radius-md);
    }
    
    .seat-grid {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: 8px;
      margin-bottom: var(--space-3);
    }
    
    .seat {
      aspect-ratio: 1/1;
      background-color: var(--color-neutral-200);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .seat.available:hover {
      background-color: var(--color-primary-light);
      transform: scale(1.05);
    }
    
    .seat.selected {
      background-color: var(--color-primary);
      color: white;
    }
    
    .seat.booked {
      background-color: var(--color-neutral-400);
      cursor: not-allowed;
    }
    
    .seat-label {
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .seat-legend {
      display: flex;
      justify-content: center;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }
    
    .seat-sample {
      width: 20px;
      height: 20px;
      border-radius: var(--radius-sm);
    }
    
    .seat-sample.available {
      background-color: var(--color-neutral-200);
    }
    
    .seat-sample.selected {
      background-color: var(--color-primary);
    }
    
    .seat-sample.booked {
      background-color: var(--color-neutral-400);
    }
    
    .selected-seats-container {
      background-color: var(--color-neutral-100);
      padding: var(--space-2);
      border-radius: var(--radius-md);
    }
    
    .selected-seats-container h3 {
      margin-bottom: var(--space-1);
      font-size: 1rem;
    }
    
    .selected-seats-list {
      margin-bottom: var(--space-2);
    }
    
    .selected-seats-summary {
      display: flex;
      justify-content: flex-end;
      font-weight: 600;
    }
    
    /* Loading styles */
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-3) 0;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--color-neutral-200);
      border-top: 4px solid var(--color-primary);
      border-radius: 50%;
      margin-bottom: var(--space-2);
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 992px) {
      .booking-content {
        grid-template-columns: 1fr;
      }
      
      .form-row {
        flex-direction: column;
        gap: var(--space-2);
      }
    }
    
    @media (max-width: 768px) {
      .booking-progress {
        padding: 0;
      }
      
      .step-label {
        display: none;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}