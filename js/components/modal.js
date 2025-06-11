/**
 
 * Creates and manages modal dialogs
 */

let activeModal = null;

/**
 * Create and show a modal
 * @param {Object} options - Modal options
 * @param {string} options.title - Modal title
 * @param {string} options.content - Modal content HTML
 * @param {Array} options.buttons - Array of button objects {text, type, onClick}
 * @returns {Object} - Modal control object
 */
export function showModal(options) {
  // Close any existing modal
  if (activeModal) {
    closeModal(activeModal);
  }
  
  // Create modal element
  const modalElement = document.createElement('div');
  modalElement.className = 'modal-overlay';
  modalElement.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">${options.title || 'Modal'}</h3>
        <button class="modal-close" aria-label="Close modal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        ${options.content || ''}
      </div>
      <div class="modal-footer">
        ${createModalButtons(options.buttons || [])}
      </div>
    </div>
  `;
  
  // Add modal to the DOM
  document.body.appendChild(modalElement);
  
  // Create modal control object
  const modal = {
    element: modalElement,
    close: () => closeModal(modal)
  };
  
  activeModal = modal;
  
  // Add event listeners
  setupModalEventListeners(modal, options.buttons || []);
  
  // Show modal with animation
  setTimeout(() => {
    modalElement.classList.add('active');
  }, 10);
  
  return modal;
}

/**
 * Create HTML for modal buttons
 * @param {Array} buttons - Array of button objects
 * @returns {string} - Button HTML
 */
function createModalButtons(buttons) {
  if (!buttons || buttons.length === 0) {
    return `<button class="btn btn-primary modal-btn" data-action="close">OK</button>`;
  }
  
  return buttons.map((button, index) => {
    const type = button.type || (index === 0 ? 'primary' : 'outline');
    return `
      <button class="btn btn-${type} modal-btn" data-action="${button.action || ''}" data-index="${index}">
        ${button.text || 'Button'}
      </button>
    `;
  }).join('');
}

/**
 * Set up event listeners for the modal
 * @param {Object} modal - Modal control object
 * @param {Array} buttons - Array of button objects
 */
function setupModalEventListeners(modal, buttons) {
  const modalElement = modal.element;
  
  // Close button
  const closeButton = modalElement.querySelector('.modal-close');
  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });
  
  // Close when clicking outside
  modalElement.addEventListener('click', (e) => {
    if (e.target === modalElement) {
      closeModal(modal);
    }
  });
  
  // Escape key to close
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  };
  document.addEventListener('keydown', escHandler);
  
  // Store the handler to remove it later
  modal.escHandler = escHandler;
  
  // Button clicks
  const modalButtons = modalElement.querySelectorAll('.modal-btn');
  modalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const index = parseInt(button.dataset.index);
      
      if (action === 'close' || !buttons[index]) {
        closeModal(modal);
        return;
      }
      
      // Execute button callback if exists
      if (buttons[index].onClick) {
        buttons[index].onClick(modal);
      }
      
      // Close automatically unless specified not to
      if (buttons[index].keepOpen !== true) {
        closeModal(modal);
      }
    });
  });
}

/**
 * Close the modal
 * @param {Object} modal - Modal control object
 */
function closeModal(modal) {
  if (!modal || !modal.element) return;
  
  // Remove active class to trigger transition
  modal.element.classList.remove('active');
  
  // Remove event listeners
  if (modal.escHandler) {
    document.removeEventListener('keydown', modal.escHandler);
  }
  
  // Remove from DOM after transition
  setTimeout(() => {
    if (modal.element && modal.element.parentNode) {
      modal.element.parentNode.removeChild(modal.element);
    }
    
    if (activeModal === modal) {
      activeModal = null;
    }
  }, 300); // Match transition duration
}
