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
      // Smooth scroll to the target section
      window.scrollTo({
        top: targetSection.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
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
