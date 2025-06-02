/**
 * Render the 404 Not Found page
 * @param {HTMLElement} container - Container element
 */
export function renderNotFoundPage(container) {
  // Create HTML content
  let html = `
    <div class="container not-found-page fade-in">
      <div class="not-found-content">
        <div class="not-found-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div class="not-found-actions">
          <a href="/" class="btn btn-primary" data-navlink>Go Home</a>
          <a href="/events" class="btn btn-outline" data-navlink>Browse Events</a>
        </div>
      </div>
    </div>
  `;
  
  // Set HTML content
  container.innerHTML = html;
  
  // Add CSS for 404 page specific components
  addNotFoundPageStyles();
}

/**
 * Add 404 page specific styles
 */
function addNotFoundPageStyles() {
  // Check if styles already exist
  if (document.getElementById('not-found-page-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'not-found-page-styles';
  
  styleElement.textContent = `
    .not-found-page {
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .not-found-content {
      text-align: center;
      max-width: 500px;
      padding: var(--space-4);
    }
    
    .not-found-icon {
      font-size: 5rem;
      color: var(--color-warning);
      margin-bottom: var(--space-2);
    }
    
    .not-found-page h1 {
      font-size: 4rem;
      color: var(--color-primary);
      margin-bottom: var(--space-1);
    }
    
    .not-found-page h2 {
      margin-bottom: var(--space-2);
    }
    
    .not-found-page p {
      margin-bottom: var(--space-3);
      color: var(--color-neutral-600);
    }
    
    .not-found-actions {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
    }
    
    @media (max-width: 576px) {
      .not-found-actions {
        flex-direction: column;
        gap: var(--space-2);
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}