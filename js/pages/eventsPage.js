import { getAllEvents, getEventsByCategory } from '../utils/dataService.js';
import { createEventCard } from '../components/eventCard.js';

/**
 * Render the events page
 * @param {HTMLElement} container - Container element
 */
export function renderEventsPage(container) {
  // Parse query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get('category') || 'all';
  
  // Get events based on category
  const events = selectedCategory === 'all' ? 
    getAllEvents() : 
    getEventsByCategory(selectedCategory);
  
  // Create HTML content
  let html = `
    <div class="container fade-in">
      <div class="page-header">
        <h1>Browse Events</h1>
        <p>Find your next unforgettable experience</p>
      </div>
      
      <div class="events-filters">
        <div class="filter-group">
          <h3>Categories</h3>
          <div class="filter-buttons">
            <button class="filter-btn ${selectedCategory === 'all' ? 'active' : ''}" data-category="all">All</button>
            <button class="filter-btn ${selectedCategory === 'concerts' ? 'active' : ''}" data-category="concerts">Concerts</button>
            <button class="filter-btn ${selectedCategory === 'sports' ? 'active' : ''}" data-category="sports">Sports</button>
            <button class="filter-btn ${selectedCategory === 'theater' ? 'active' : ''}" data-category="theater">Theater</button>
            <button class="filter-btn ${selectedCategory === 'movies' ? 'active' : ''}" data-category="movies">Movies</button>
          </div>
        </div>
        
        <div class="search-box">
          <input type="text" id="event-search" placeholder="Search events..." class="form-control">
          <button class="search-btn"><i class="fas fa-search"></i></button>
        </div>
      </div>
      
      <div class="event-results">
        <p class="results-count">${events.length} events found</p>
        
        <div class="event-grid">
          ${events.map(event => createEventCard(event)).join('')}
        </div>
        
        ${events.length === 0 ? '<p class="no-results">No events found. Try a different category.</p>' : ''}
      </div>
    </div>
  `;
  
  // Set HTML content
  container.innerHTML = html;
  
  // Add CSS for events page specific components
  addEventsPageStyles();
  
  // Add event listeners
  setupEventListeners(container);
}

/**
 * Set up event listeners for the events page
 * @param {HTMLElement} container - Container element
 */
function setupEventListeners(container) {
  // Category filter buttons
  const filterButtons = container.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      
      // Update URL with selected category
      const url = new URL(window.location);
      
      if (category === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', category);
      }
      
      history.pushState(null, '', url);
      
      // Re-render the page
      renderEventsPage(container);
    });
  });
  
  // Search functionality
  const searchInput = container.querySelector('#event-search');
  const searchButton = container.querySelector('.search-btn');
  
  const performSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
      // Reset search
      const eventCards = container.querySelectorAll('.event-card');
      eventCards.forEach(card => {
        card.style.display = '';
      });
      updateResultsCount();
      return;
    }
    
    // Filter visible events based on search term
    const eventCards = container.querySelectorAll('.event-card');
    let visibleCount = 0;
    
    eventCards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const location = card.querySelector('.card-subtitle:nth-child(3)').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || location.includes(searchTerm)) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    updateResultsCount(visibleCount);
  };
  
  searchInput.addEventListener('input', performSearch);
  searchButton.addEventListener('click', performSearch);
}

/**
 * Update the results count display
 * @param {number} count - Number of visible events
 */
function updateResultsCount(count) {
  const resultsCountElement = document.querySelector('.results-count');
  
  if (!count) {
    // Count visible event cards
    const visibleCards = document.querySelectorAll('.event-card[style="display: none;"]');
    count = document.querySelectorAll('.event-card').length - visibleCards.length;
  }
  
  resultsCountElement.textContent = `${count} events found`;
}

/**
 * Add events page specific styles
 */
function addEventsPageStyles() {
  // Check if styles already exist
  if (document.getElementById('events-page-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'events-page-styles';
  
  styleElement.textContent = `
    .page-header {
      margin-bottom: var(--space-3);
    }
    
    .events-filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-3);
      gap: var(--space-2);
    }
    
    .filter-group h3 {
      margin-bottom: var(--space-1);
    }
    
    .filter-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }
    
    .filter-btn {
      padding: 0.5rem 1rem;
      background-color: var(--color-neutral-100);
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .filter-btn:hover {
      background-color: var(--color-primary-light);
      color: white;
    }
    
    .filter-btn.active {
      background-color: var(--color-primary);
      color: white;
    }
    
    .search-box {
      position: relative;
      max-width: 300px;
      width: 100%;
    }
    
    .search-btn {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--color-neutral-600);
      cursor: pointer;
    }
    
    .results-count {
      margin-bottom: var(--space-2);
      color: var(--color-neutral-700);
    }
    
    .no-results {
      text-align: center;
      padding: var(--space-4);
      color: var(--color-neutral-600);
    }
    
    @media (max-width: 768px) {
      .events-filters {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .search-box {
        max-width: 100%;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}