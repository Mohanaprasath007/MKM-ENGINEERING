document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     Burger Menu Toggle
  ================================ */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('active');
    }
  });

  /* ===============================
     Contact Form Submission
  ================================ */
  const contactForm = document.getElementById('contactForm');
  const API_URL = 'https://mkm-engineering-2.onrender.com';

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      const responseDiv = document.getElementById('form-response');
      responseDiv.innerHTML =
        '<p style="color: blue;">Please wait… sending your message.</p>';

      try {
        const response = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          responseDiv.innerHTML =
            '<p style="color: green;">Thank you! Your message has been sent successfully.</p>';
          contactForm.reset();
        } else {
          responseDiv.innerHTML =
            '<p style="color: red;">Unable to send message. Please try again later.</p>';
        }

      } catch (error) {
        console.error('Contact form error:', error);
        responseDiv.innerHTML =
          '<p style="color: red;">Server is temporarily unavailable. Please try again shortly.</p>';
      }
    });
  }

  /* ===============================
     Home Page Carousel
  ================================ */
  if (document.querySelector('.carousel-container')) {
    startCarousel();
  }

  function startCarousel() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    if (!slides.length) return;

    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');

    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      indicators.appendChild(dot);
    });

    document.querySelector('.carousel-container').appendChild(indicators);
    const dots = indicators.querySelectorAll('span');

    function showSlides() {
      slides.forEach((slide, i) => {
        slide.style.display = 'none';
        dots[i].classList.remove('active');
      });

      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].style.display = 'block';
      dots[slideIndex].classList.add('active');

      setTimeout(showSlides, 3000);
    }

    slides[slideIndex].style.display = 'block';
    dots[slideIndex].classList.add('active');
    setTimeout(showSlides, 3000);
  }

  /* ===============================
     WhatsApp Floating Button
  ================================ */
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.style.display = 'flex';
  }

  /* ===============================
     Hover Effects (UI Polish)
  ================================ */
  const interactiveElements = document.querySelectorAll(
    '.product-card, .container-a, .container-b, .container-d, .hero-section, .cta-button'
  );

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
