document.addEventListener('DOMContentLoaded', () => {
  // Burger menu toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('active');
    }
  });

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      const responseDiv = document.getElementById('form-response');
      responseDiv.innerHTML = '<p style="color: blue;">Sending...</p>';

      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
          responseDiv.innerHTML = '<p style="color: green;">Message sent successfully!</p>';
          contactForm.reset();
        } else {
          responseDiv.innerHTML = '<p style="color: red;">Error sending message. Please try again.</p>';
        }
      } catch (error) {
        console.error('Error:', error);
        responseDiv.innerHTML = '<p style="color: red;">Error sending message. Please try again.</p>';
      }
    });
  }

  // Carousel for home page
  if (document.querySelector('.carousel-container')) {
    startCarousel();
  }

  function startCarousel() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    if (slides.length === 0) return;

    const indicators = document.createElement("div");
    indicators.classList.add("carousel-indicators");

    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      indicators.appendChild(dot);
    });

    const container = document.querySelector(".carousel-container");
    container.appendChild(indicators);
    const dots = indicators.querySelectorAll("span");

    function showSlides() {
      slides.forEach((slide, i) => {
        slide.style.display = "none";
        dots[i].classList.remove("active");
      });
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].style.display = "block";
      dots[slideIndex].classList.add("active");
      setTimeout(showSlides, 3000);
    }

    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
    setTimeout(showSlides, 3000);
  }

  // WhatsApp button visibility - show immediately on all pages
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.style.display = 'flex'; // Ensure it's visible from the start
  }

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('.product-card, .container-a, .container-b, .container-d, .hero-section, .cta-button');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.02)';
      el.style.transition = 'transform 0.3s ease';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
    });
  });
});
