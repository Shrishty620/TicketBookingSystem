import { renderHomePage } from '../pages/homePage.js';
import { renderEventsPage } from '../pages/eventsPage.js';
import { renderEventDetailsPage } from '../pages/eventDetailsPage.js';
import { renderBookingPage } from '../pages/bookingPage.js';
import { renderConfirmationPage } from '../pages/confirmationPage.js';
import { renderAccountPage } from '../pages/accountPage.js';
import { renderAboutPage } from '../pages/aboutPage.js';
import { renderNotFoundPage } from '../pages/notFoundPage.js';

// Define routes
const routes = [
  { path: '/', component: renderHomePage },
  { path: '/events', component: renderEventsPage },
  { path: '/event/:id', component: renderEventDetailsPage },
  { path: '/booking/:id', component: renderBookingPage },
  { path: '/confirmation/:id', component: renderConfirmationPage },
  { path: '/account', component: renderAccountPage },
  { path: '/about', component: renderAboutPage }
];

/**
 * Initialize the router
 */
export function initRouter() {
  // Initial route rendering
  handleRouteChange();
  
  // Handle click events on navigation links
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-navlink]');
    
    if (target) {
      e.preventDefault();
      const url = target.getAttribute('href');
      navigateTo(url);
    }
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', handleRouteChange);
}

/**
 * Navigate to a specific URL
 * @param {string} url - The URL to navigate to
 */
export function navigateTo(url) {
  window.history.pushState(null, null, url);
  handleRouteChange();
}

/**
 * Handle route changes
 */
function handleRouteChange() {
  const path = window.location.pathname;
  const mainContent = document.getElementById('main-content');
  
  // Find matching route
  const route = findMatchingRoute(path);
  
  if (route) {
    const params = extractRouteParams(route.path, path);
    mainContent.innerHTML = ''; // Clear content
    route.component(mainContent, params);
    scrollToTop();
  } else {
    renderNotFoundPage(mainContent);
  }
  
  // Update active link in header
  updateActiveLink();
}

/**
 * Find a matching route for the given path
 * @param {string} path - Current path
 * @returns {object|null} - Matching route or null
 */
function findMatchingRoute(path) {
  // First check for exact matches
  const exactMatch = routes.find(route => route.path === path);
  if (exactMatch) return exactMatch;
  
  // Then check for parameterized routes
  return routes.find(route => {
    // Convert route path to regex pattern
    const routePathSegments = route.path.split('/');
    const pathSegments = path.split('/');
    
    if (routePathSegments.length !== pathSegments.length) return false;
    
    for (let i = 0; i < routePathSegments.length; i++) {
      // If it's a parameter segment (starts with :), it matches anything
      if (routePathSegments[i].startsWith(':')) continue;
      // Otherwise, segments should match exactly
      if (routePathSegments[i] !== pathSegments[i]) return false;
    }
    
    return true;
  });
}

/**
 * Extract route parameters from path
 * @param {string} routePath - Route path pattern
 * @param {string} currentPath - Current path
 * @returns {object} - Object with parameter values
 */
function extractRouteParams(routePath, currentPath) {
  const params = {};
  
  const routePathSegments = routePath.split('/');
  const pathSegments = currentPath.split('/');
  
  for (let i = 0; i < routePathSegments.length; i++) {
    if (routePathSegments[i].startsWith(':')) {
      const paramName = routePathSegments[i].substring(1);
      params[paramName] = pathSegments[i];
    }
  }
  
  return params;
}

/**
 * Update active link in navigation
 */
function updateActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('[data-navlink]');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Exact match for home and other main pages
    if (href === currentPath) {
      link.classList.add('active');
    } 
    // Partial match for subpages (e.g. /events/1 should highlight /events)
    else if (currentPath.startsWith(href) && href !== '/') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Scroll to top of the page
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}