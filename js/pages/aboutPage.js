/**
 * Render the about page
 * @param {HTMLElement} container - Container element
 */
export function renderAboutPage(container) {
  // Create HTML content
  let html = `
    <div class="container about-page fade-in">
      <div class="about-header">
        <h1>About TicketWave</h1>
        <p class="subtitle">Your go-to platform for booking tickets to your favorite events</p>
      </div>
      
      <div class="about-section">
        <div class="about-image">
          <img src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg" alt="About TicketWave">
        </div>
        <div class="about-content">
          <h2>Our Story</h2>
          <p>TicketWave was founded in 2025 with a simple mission: to make ticket booking simple, secure, and stress-free. We believe that experiencing live events is one of life's greatest joys, and we're dedicated to making that experience as seamless as possible from start to finish.</p>
          <p>What started as a small idea has grown into a platform that helps thousands of people discover and attend their favorite events every day. We're proud to be a trusted partner for event-goers around the world.</p>
        </div>
      </div>
      
      <div class="values-section">
        <h2 class="text-center">Our Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-user-shield"></i>
            </div>
            <h3>Trust & Security</h3>
            <p>We prioritize the security of your data and transactions, implementing the highest standards of protection.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-handshake"></i>
            </div>
            <h3>Customer First</h3>
            <p>Your satisfaction is our top priority. We're committed to providing exceptional service at every step.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-lightbulb"></i>
            </div>
            <h3>Innovation</h3>
            <p>We continually improve our platform to offer the most intuitive and feature-rich booking experience.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-globe"></i>
            </div>
            <h3>Accessibility</h3>
            <p>We believe everyone should have access to great events, so we work to make our platform inclusive and accessible.</p>
          </div>
        </div>
      </div>
      
      <div class="team-section">
        <h2 class="text-center">Our Team</h2>
        <div class="team-grid">
          <div class="team-card">
            <div class="team-avatar">
              <img src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg" alt="Team Member">
            </div>
            <h3>Sarah Johnson</h3>
            <p class="team-role">CEO & Founder</p>
          </div>
          
          <div class="team-card">
            <div class="team-avatar">
              <img src="https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg" alt="Team Member">
            </div>
            <h3>David Chen</h3>
            <p class="team-role">CTO</p>
          </div>
          
          <div class="team-card">
            <div class="team-avatar">
              <img src="https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg" alt="Team Member">
            </div>
            <h3>Maya Rodriguez</h3>
            <p class="team-role">Head of Customer Success</p>
          </div>
          
          <div class="team-card">
            <div class="team-avatar">
              <img src="https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg" alt="Team Member">
            </div>
            <h3>Alex Patel</h3>
            <p class="team-role">Lead Designer</p>
          </div>
        </div>
      </div>
      
      <div class="contact-section">
        <h2 class="text-center">Contact Us</h2>
        <div class="contact-container">
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h3>Address</h3>
                <p>123 Event Street<br>New York, NY 10001</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div>
                <h3>Email</h3>
                <p>info@ticketwave.com<br>support@ticketwave.com</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567<br>+1 (555) 987-6543</p>
              </div>
            </div>
          </div>
          
          <div class="contact-form">
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input type="text" id="name" class="form-control">
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" class="form-control">
            </div>
            
            <div class="form-group">
              <label for="subject" class="form-label">Subject</label>
              <input type="text" id="subject" class="form-control">
            </div>
            
            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea id="message" class="form-control" rows="5"></textarea>
            </div>
            
            <button class="btn btn-primary">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Set HTML content
  container.innerHTML = html;
  
  // Add CSS for about page specific components
  addAboutPageStyles();
  
  // Add event listeners
  setupEventListeners(container);
}

/**
 * Set up event listeners for the about page
 * @param {HTMLElement} container - Container element
 */
function setupEventListeners(container) {
  // Contact form submit
  const contactForm = container.querySelector('.contact-form');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real app, this would send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

/**
 * Add about page specific styles
 */
function addAboutPageStyles() {
  // Check if styles already exist
  if (document.getElementById('about-page-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'about-page-styles';
  
  styleElement.textContent = `
    .about-page {
      padding-bottom: var(--space-4);
    }
    
    .about-header {
      text-align: center;
      margin-bottom: var(--space-4);
    }
    
    .subtitle {
      font-size: 1.25rem;
      color: var(--color-neutral-600);
    }
    
    .about-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      margin-bottom: var(--space-4);
    }
    
    .about-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--radius-lg);
    }
    
    .about-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .about-content h2 {
      margin-bottom: var(--space-2);
    }
    
    .values-section {
      margin-bottom: var(--space-4);
    }
    
    .values-section h2 {
      margin-bottom: var(--space-3);
    }
    
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-3);
    }
    
    .value-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      text-align: center;
      box-shadow: var(--shadow-sm);
      transition: transform var(--transition-normal);
    }
    
    .value-card:hover {
      transform: translateY(-5px);
    }
    
    .value-icon {
      font-size: 2.5rem;
      color: var(--color-primary);
      margin-bottom: var(--space-2);
    }
    
    .team-section {
      margin-bottom: var(--space-4);
    }
    
    .team-section h2 {
      margin-bottom: var(--space-3);
    }
    
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-3);
    }
    
    .team-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      text-align: center;
      box-shadow: var(--shadow-sm);
    }
    
    .team-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto var(--space-2);
    }
    
    .team-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .team-role {
      color: var(--color-neutral-600);
      font-size: 0.875rem;
    }
    
    .contact-section h2 {
      margin-bottom: var(--space-3);
    }
    
    .contact-container {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: var(--space-3);
    }
    
    .contact-info {
      background-color: var(--color-primary);
      color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-3);
    }
    
    .contact-item {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }
    
    .contact-item:last-child {
      margin-bottom: 0;
    }
    
    .contact-icon {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .contact-item h3 {
      margin: 0 0 var(--space-1) 0;
      color: white;
    }
    
    .contact-item p {
      margin: 0;
      opacity: 0.8;
    }
    
    .contact-form {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      box-shadow: var(--shadow-sm);
    }
    
    @media (max-width: 992px) {
      .about-section {
        grid-template-columns: 1fr;
      }
      
      .contact-container {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .values-grid,
      .team-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 576px) {
      .values-grid,
      .team-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}