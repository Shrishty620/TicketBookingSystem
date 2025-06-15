import './style.css';
import { initRouter } from './js/utils/router.js';
import { renderHeader } from './js/components/header.js';
import { renderFooter } from './js/components/footer.js';
import { loadInitialData } from './js/utils/dataService.js';


const initApp = async () => {
  // Get the app container
  const appContainer = document.querySelector('#app');
  
  // Create main structure
  appContainer.innerHTML = `
    <header id="main-header"></header>
    <main id="main-content"></main>
    <footer id="main-footer"></footer>
  `;
  
  // Render header and footer
  renderHeader();
  renderFooter();
  
  // Load initial data
  await loadInitialData();
  
  // Initialize router
  initRouter();
};

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
