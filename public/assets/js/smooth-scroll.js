// Get mobile menu elements
const menuToggle = document.querySelector('.cs-toggle');
const navList = document.getElementById('cs-expanded');

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.cs-li-link');

// Function to close mobile menu
function closeMobileMenu() {
  if (menuToggle && navList) {
    menuToggle.classList.remove('cs-active');
    navList.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('cs-open');
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // Prevent default link behavior
    e.preventDefault();
    
    // Close mobile menu if open
    closeMobileMenu();
    
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
