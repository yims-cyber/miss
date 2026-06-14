// Main Application Script

// Populate Candidates Gallery
function populateCandidates() {
  const gallery = document.getElementById('candidatesGallery');
  
  APP_DATA.candidates.forEach(candidate => {
    const card = document.createElement('div');
    card.className = 'candidate-card fade-in';
    card.innerHTML = `
      <img src="${candidate.image}" alt="${candidate.name}" loading="lazy">
      <div class="candidate-info">
        <div class="candidate-number">${candidate.number}</div>
        <div class="candidate-name">${candidate.name}</div>
        <div class="candidate-province">${candidate.province}</div>
      </div>
    `;
    
    gallery.appendChild(card);
    observer.observe(card);
  });
}

// Populate Timeline
function populateTimeline() {
  const container = document.getElementById('timelineContainer');
  
  APP_DATA.timelineSteps.forEach((step, index) => {
    const item = document.createElement('div');
    item.className = `timeline-item fade-in ${step.status === 'OUVERT' ? 'active' : ''}`;
    
    const statusClass = step.status === 'OUVERT' ? 'ouvert' : 'avenir';
    const statusText = step.status === 'OUVERT' ? '✓ OUVERT' : step.status;
    
    item.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="timeline-step">${step.step}</div>
        <div class="timeline-date">${step.date}</div>
        <div class="timeline-title">${step.title}</div>
        <div class="timeline-status ${statusClass}">${statusText}</div>
        <div class="timeline-description">${step.description}</div>
      </div>
    `;
    
    container.appendChild(item);
    observer.observe(item);
  });
}

// Populate Partners
function populatePartners() {
  const grid = document.getElementById('partnersGrid');
  
  APP_DATA.partners.forEach(partner => {
    const logo = document.createElement('div');
    logo.className = 'partner-logo fade-in';
    logo.innerHTML = `<div class="partner-name">${partner.name}</div>`;
    
    grid.appendChild(logo);
    observer.observe(logo);
  });
}

// Initialize Application
function initApp() {
  populateCandidates();
  populateTimeline();
  populatePartners();
  
  console.log('Miss Nationale DRC 2026 - Website Initialized');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
