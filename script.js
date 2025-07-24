
// Dark mode toggle functionality with mobile optimization
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);
    
    // Add touch event for better mobile experience
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('touchend', function(e) {
        e.preventDefault();
        toggleTheme();
    });
    
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    }
    
    function updateToggleIcon(theme) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Optimize scroll performance on mobile
    let ticking = false;
    function updateScrollState() {
        // Add any scroll-based optimizations here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollState);
            ticking = true;
        }
    }, { passive: true });
    
    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});


// The below I'm not quite sure about code and its use
const testimonialsList = document.querySelector('.testimonials-list');
const dots = document.querySelectorAll('.carousel-dot');
let currentIndex = 0;

function goToSlide(index) {
  // Prevent going out of bounds
  if (index < 0) {
    currentIndex = dots.length - 1;
  } else if (index >= dots.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // Adjust the carousel's translate position
  testimonialsList.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update active dot
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Set up navigation dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => goToSlide(index));
});

// Optionally, add navigation buttons if you want
document.querySelector('.carousel-prev').addEventListener('click', () => goToSlide(currentIndex - 1));
document.querySelector('.carousel-next').addEventListener('click', () => goToSlide(currentIndex + 1));
// Not quite sure about the above and its use