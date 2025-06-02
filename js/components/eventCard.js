/**
 * Event Card Component
 * Renders an event card for the event listings
 * 
 * @param {Object} event - Event data
 * @returns {string} - HTML for the event card
 */
export function createEventCard(event) {
  // Format date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Format price
  const formattedPrice = event.price.toFixed(2);
  
  // Calculate availability status
  let availabilityClass = 'bg-success';
  let availabilityText = 'Available';
  
  if (event.availableSeats <= 0) {
    availabilityClass = 'bg-error';
    availabilityText = 'Sold Out';
  } else if (event.availableSeats < event.capacity * 0.2) {
    availabilityClass = 'bg-warning';
    availabilityText = 'Almost Sold Out';
  }
  
  return `
    <div class="card event-card">
      <div class="card-img-container">
        <img src="${event.image}" alt="${event.title}" class="card-img">
        <span class="event-category">${getCategoryName(event.category)}</span>
      </div>
      <div class="card-content">
        <h3 class="card-title">${event.title}</h3>
        <p class="card-subtitle">
          <i class="far fa-calendar-alt"></i> ${formattedDate} at ${event.time}
        </p>
        <p class="card-subtitle">
          <i class="fas fa-map-marker-alt"></i> ${event.venue}, ${event.location}
        </p>
        <div class="card-footer">
          <span class="card-price">$${formattedPrice}</span>
          <span class="availability-badge ${availabilityClass}">${availabilityText}</span>
        </div>
        <a href="/event/${event.id}" class="btn btn-primary mt-2 full-width" data-navlink>View Details</a>
      </div>
    </div>
  `;
}

/**
 * Get human-readable category name
 * @param {string} categorySlug - Category slug
 * @returns {string} - Category display name
 */
function getCategoryName(categorySlug) {
  const categories = {
    'concerts': 'Concert',
    'sports': 'Sports',
    'theater': 'Theater',
    'movies': 'Movie'
  };
  
  return categories[categorySlug] || categorySlug;
}