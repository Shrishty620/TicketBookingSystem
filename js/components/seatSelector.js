/**
 * Seat Selector Component
 * Provides interactive seat selection for booking
 */

// Keep track of selected seats
let selectedSeats = [];
let eventData = null;

/**
 * Initialize the seat selector
 * @param {HTMLElement} container - Container element
 * @param {Object} event - Event data
 * @param {Function} onChange - Callback for selection changes
 */
export function initSeatSelector(container, event, onChange) {
  eventData = event;
  selectedSeats = [];
  
  // Create seats layout based on event capacity
  renderSeatLayout(container, event);
  
  // Set up event listeners
  setupEventListeners(container, onChange);
}

/**
 * Render the seat layout
 * @param {HTMLElement} container - Container element
 * @param {Object} event - Event data
 */
function renderSeatLayout(container, event) {
  const { capacity, availableSeats } = event;
  
  // Create rows and columns based on capacity
  const totalSeats = capacity;
  const columns = Math.min(10, Math.ceil(Math.sqrt(totalSeats)));
  const rows = Math.ceil(totalSeats / columns);
  
  // Generate random booked seats
  const bookedSeatsCount = capacity - availableSeats;
  const bookedSeats = generateRandomBookedSeats(totalSeats, bookedSeatsCount);
  
  let html = `
    <div class="seat-layout-container">
      <div class="screen-container">
        <div class="screen"></div>
        <p>STAGE / SCREEN</p>
      </div>
      <div class="seat-grid" style="grid-template-columns: repeat(${columns}, 1fr);">
  `;
  
  for (let i = 0; i < totalSeats; i++) {
    const row = Math.floor(i / columns) + 1;
    const col = (i % columns) + 1;
    const seatNumber = i + 1;
    const isBooked = bookedSeats.includes(seatNumber);
    const seatClass = isBooked ? 'seat booked' : 'seat available';
    const seatLabel = `${String.fromCharCode(64 + row)}${col}`;
    
    html += `
      <div class="${seatClass}" data-seat="${seatNumber}" data-seat-label="${seatLabel}">
        <span class="seat-label">${seatLabel}</span>
      </div>
    `;
  }
  
  html += `
      </div>
      <div class="seat-legend">
        <div class="legend-item">
          <div class="seat-sample available"></div>
          <span>Available</span>
        </div>
        <div class="legend-item">
          <div class="seat-sample selected"></div>
          <span>Selected</span>
        </div>
        <div class="legend-item">
          <div class="seat-sample booked"></div>
          <span>Booked</span>
        </div>
      </div>
      <div class="selected-seats-container">
        <h3>Selected Seats:</h3>
        <div class="selected-seats-list"></div>
        <div class="selected-seats-summary">
          <p>Total: <span class="total-amount">$0.00</span></p>
        </div>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

/**
 * Generate random booked seats
 * @param {number} totalSeats - Total number of seats
 * @param {number} bookedCount - Number of booked seats
 * @returns {Array} - Array of booked seat numbers
 */
function generateRandomBookedSeats(totalSeats, bookedCount) {
  const bookedSeats = [];
  
  while (bookedSeats.length < bookedCount) {
    const randomSeat = Math.floor(Math.random() * totalSeats) + 1;
    if (!bookedSeats.includes(randomSeat)) {
      bookedSeats.push(randomSeat);
    }
  }
  
  return bookedSeats;
}

/**
 * Set up event listeners for seat selection
 * @param {HTMLElement} container - Container element
 * @param {Function} onChange - Callback for selection changes
 */
function setupEventListeners(container, onChange) {
  const seatGrid = container.querySelector('.seat-grid');
  
  seatGrid.addEventListener('click', (e) => {
    const seatElement = e.target.closest('.seat');
    
    if (seatElement && !seatElement.classList.contains('booked')) {
      const seatNumber = parseInt(seatElement.dataset.seat);
      const seatLabel = seatElement.dataset.seatLabel;
      
      // Toggle selection
      if (seatElement.classList.contains('selected')) {
        // Remove from selected
        seatElement.classList.remove('selected');
        selectedSeats = selectedSeats.filter(seat => seat.number !== seatNumber);
      } else {
        // Add to selected
        seatElement.classList.add('selected');
        selectedSeats.push({
          number: seatNumber,
          label: seatLabel
        });
      }
      
      // Update the UI
      updateSelectedSeatsUI(container);
      
      // Call the onChange callback
      if (onChange) {
        onChange(selectedSeats);
      }
    }
  });
}

/**
 * Update the selected seats UI
 * @param {HTMLElement} container - Container element
 */
function updateSelectedSeatsUI(container) {
  const selectedSeatsList = container.querySelector('.selected-seats-list');
  const totalAmountElement = container.querySelector('.total-amount');
  
  if (selectedSeats.length === 0) {
    selectedSeatsList.innerHTML = '<p>No seats selected</p>';
    totalAmountElement.textContent = '$0.00';
    return;
  }
  
  // Sort seats by label for better presentation
  const sortedSeats = [...selectedSeats].sort((a, b) => a.label.localeCompare(b.label));
  
  let html = '';
  let totalAmount = 0;
  
  sortedSeats.forEach(seat => {
    html += `<div class="selected-seat-item">Seat ${seat.label}</div>`;
    totalAmount += eventData.price;
  });
  
  selectedSeatsList.innerHTML = html;
  totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
}

/**
 * Get the currently selected seats
 * @returns {Array} - Array of selected seat objects
 */
export function getSelectedSeats() {
  return selectedSeats;
}