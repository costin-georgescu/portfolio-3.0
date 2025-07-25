// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.cs-li-link');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // Prevent default link behavior
    e.preventDefault();
    
    // Close mobile menu if open
    if (typeof window.closeMobileMenu === 'function') {
      window.closeMobileMenu();
    }
    
    // Get the target section ID from the href
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Calculate the target position with header offset
      const headerOffset = 80;
      const targetPosition = targetSection.offsetTop - headerOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // Increased duration for smoother scroll (1 second)
      let start = null;

      // Use requestAnimationFrame for smoother animation
      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        // Ease in out function for smooth acceleration/deceleration
        const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
        const percent = Math.min(progress / duration, 1);
        const easePercent = easeInOutQuad(percent);
        
        window.scrollTo(0, startPosition + (distance * easePercent));
        
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
      
      window.requestAnimationFrame(step);
    }
  });
});

// Add active state to navigation links when scrolling
document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.cs-li-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 100) && scrollY < (sectionTop + sectionHeight - 100)) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('cs-active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('cs-active');
    }
  });
});
