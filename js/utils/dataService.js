/**
 * Data Service
 * Handles data loading, storage and manipulation
 */

// Sample data
let events = [];
let bookings = [];

/**
 * Load initial data
 */
export async function loadInitialData() {
  // In a real app, this would fetch data from an API
  // For this demo, we'll use sample data
  events = [
    {
      id: '1',
      title: 'Summer Music Festival',
      category: 'concerts',
      date: '2025-07-15',
      time: '18:00',
      venue: 'Central Park Amphitheater',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      description: 'Join us for the biggest music festival of the summer featuring top artists from around the world. Experience amazing performances across multiple stages in a beautiful outdoor setting.',
      price: 89.99,
      capacity: 200,
      availableSeats: 152,
      featured: true
    },
    {
      id: '2',
      title: 'NBA Finals 2025',
      category: 'sports',
      date: '2025-06-10',
      time: '20:00',
      venue: 'Madison Square Garden',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/163452/basketball-dunk-scored-points-163452.jpeg',
      description: 'Witness basketball history at the NBA Finals 2025. Experience the thrill and excitement as the top teams battle for the championship trophy.',
      price: 199.99,
      capacity: 300,
      availableSeats: 75,
      featured: true
    },
    {
      id: '3',
      title: 'Hamilton - Broadway Musical',
      category: 'theater',
      date: '2025-08-25',
      time: '19:30',
      venue: 'Richard Rodgers Theatre',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/11323792/pexels-photo-11323792.jpeg',
      description: 'Experience the Tony Award-winning musical that has taken the world by storm. Hamilton tells the story of America\'s founding father Alexander Hamilton through a blend of hip-hop, jazz, R&B, and Broadway.',
      price: 299.99,
      capacity: 150,
      availableSeats: 32,
      featured: true
    },
    {
      id: '4',
      title: 'Interstellar - IMAX Re-release',
      category: 'movies',
      date: '2025-05-30',
      time: '21:00',
      venue: 'AMC Empire 25',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg',
      description: 'Experience Christopher Nolan\'s epic sci-fi masterpiece on the big IMAX screen once again. Join Cooper and his team as they travel through a wormhole in search of a new home for humanity.',
      price: 24.99,
      capacity: 120,
      availableSeats: 63,
      featured: false
    },
    {
      id: '5',
      title: 'Taylor Swift - The Eras Tour',
      category: 'concerts',
      date: '2025-09-12',
      time: '19:00',
      venue: 'SoFi Stadium',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      description: 'Taylor Swift brings her record-breaking Eras Tour back for another run! Experience a journey through all of Taylor\'s musical eras in this spectacular 3+ hour show.',
      price: 249.99,
      capacity: 400,
      availableSeats: 128,
      featured: true
    },
    {
      id: '6',
      title: 'World Cup Qualifier',
      category: 'sports',
      date: '2025-10-05',
      time: '15:00',
      venue: 'MetLife Stadium',
      location: 'East Rutherford, NJ',
      image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
      description: 'Watch as top national teams compete in this crucial World Cup qualifier match. The road to the World Cup starts here!',
      price: 79.99,
      capacity: 250,
      availableSeats: 183,
      featured: false
    },
    {
      id: '7',
      title: 'The Lion King',
      category: 'theater',
      date: '2025-07-08',
      time: '19:30',
      venue: 'Minskoff Theatre',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg',
      description: 'Disney\'s award-winning musical has been captivating audiences for over 20 years. Experience the stunning visuals, music, and puppetry that bring the African savanna to life.',
      price: 149.99,
      capacity: 180,
      availableSeats: 42,
      featured: false
    },
    {
      id: '8',
      title: 'Avengers: Secret Wars - Premiere',
      category: 'movies',
      date: '2025-06-25',
      time: '20:00',
      venue: 'TCL Chinese Theatre',
      location: 'Hollywood, CA',
      image: 'https://images.pexels.com/photos/3945324/pexels-photo-3945324.jpeg',
      description: 'Be among the first to see the most anticipated Marvel movie of the decade. The culmination of the Multiverse Saga brings together heroes from across dimensions.',
      price: 39.99,
      capacity: 200,
      availableSeats: 15,
      featured: true
    }
  ];
  
  // Load any saved bookings from localStorage
  const savedBookings = localStorage.getItem('bookings');
  if (savedBookings) {
    bookings = JSON.parse(savedBookings);
  }
  
  return { events, bookings };
}

/**
 * Get all events
 * @returns {Array} - Array of events
 */
export function getAllEvents() {
  return events;
}

/**
 * Get events by category
 * @param {string} category - Category name
 * @returns {Array} - Filtered events
 */
export function getEventsByCategory(category) {
  if (!category || category === 'all') {
    return events;
  }
  return events.filter(event => event.category === category);
}

/**
 * Get featured events
 * @returns {Array} - Featured events
 */
export function getFeaturedEvents() {
  return events.filter(event => event.featured);
}

/**
 * Get event by ID
 * @param {string} id - Event ID
 * @returns {Object|null} - Event object or null
 */
export function getEventById(id) {
  return events.find(event => event.id === id) || null;
}

/**
 * Create a new booking
 * @param {Object} bookingData - Booking information
 * @returns {Object} - Created booking
 */
export function createBooking(bookingData) {
  const bookingId = generateId();
  const newBooking = {
    id: bookingId,
    ...bookingData,
    createdAt: new Date().toISOString()
  };
  
  // Update available seats for the event
  const event = getEventById(bookingData.eventId);
  if (event) {
    event.availableSeats -= bookingData.seats.length;
  }
  
  // Add booking to array
  bookings.push(newBooking);
  
  // Save to localStorage
  saveBookings();
  
  return newBooking;
}

/**
 * Get all user bookings
 * @returns {Array} - User bookings
 */
export function getUserBookings() {
  return bookings;
}

/**
 * Get booking by ID
 * @param {string} id - Booking ID
 * @returns {Object|null} - Booking object or null
 */
export function getBookingById(id) {
  return bookings.find(booking => booking.id === id) || null;
}

/**
 * Save bookings to localStorage
 */
function saveBookings() {
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

/**
 * Generate a unique ID
 * @returns {string} - Unique ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}