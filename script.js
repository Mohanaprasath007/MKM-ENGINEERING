document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  const burger = document.querySelector('.burger');
  const content = document.getElementById('content');

  burger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const page = e.target.getAttribute('data-page');
      loadPage(page);
      navLinks.classList.remove('active');
    }
  });

  function loadPage(page) {
    let html = '';
    switch (page) {
      case 'home':
        html = `
          <div class="carousel-container">
            <div class="carousel-slide fade">
              <img src="MONO-200 img.jpg" alt="Machine 1" />
              <div class="caption">COSMOS CVM 1160<br>1100 x 650 x 650</div>
            </div>
            <div class="carousel-slide fade">
              <img src="vibrant 800 super vertical img.jpg" alt="Machine 2" />
              <div class="caption">STM-MANFORD VL 1200<br>1200 x 690 x 690</div>
            </div>
            <div class="carousel-slide fade">
              <img src="VIBRANT 800 SUPER machine conigurations.jpg" alt="VIBRANT 800 SUPER machine conigurations" />
              <div class="caption">HIGH PRECISION LATHE<br>900 x 600 x 600</div>
            </div>
            <div class="carousel-slide fade">
              <img src="MONO SERIES machine conigurations.jpg" alt="MONO SERIES machine conigurations" />
              <div class="caption">HIGH PRECISION LATHE<br>900 x 600 x 600</div>
            </div>
          </div>
        `;
        break;
      case 'products':
        html = `
          <center><h1>Our Products</h1>
          <ul>
            <li>Floral Patterns</li>
            <li>Geometric Designs</li>
            <li>Abstract Art</li>
          </ul></center>
        `;
        break;
      case 'contact':
        html = `
          <center><h1>Contact Us</h1>
          <p>Email: mkmengineeringworks2023@gmail.com</p>
          <p>Phone: +91-8220718067</p>
          <h1>Our Location</h1>
          <p>Sarada Devi, Beside Cri Foundry, 11-1, Thiru.VE. Ka St, Ramakrishnapuram, Coimbatore, Tamil Nadu 641006</p>
          <iframe 
            src="https://www.google.com/maps?q=Sarada Devi, Beside Cri Foundry, 11-1, Thiru.VE. Ka St, Ramakrishnapuram, Coimbatore, Tamil Nadu 641006&output=embed" 
            width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen="" loading="lazy">
          </iframe></center>
        `;
        break;
      case 'aboutus':
        html = `
          <center>
        <div class="container-a">
            <h1>ABOUT US</h1>
            <h2>MKM ENGINEERING</h2>
            <h5>All Types Of Precision Machining Components</h5>
            <ul>
                <li></li>
            </ul>
            <p>ISO 9001:2015 certified company has started in 2023 with 25 plus years of experienced background through
                high precision CNC machining industry.</p>
            <div class="about">
                <p>We MKM Engineering in to CNC machining service for high precision machining
                    required industries like Aerospace / Defense / Medical-Implants & Automobile, Oil & Gas Industries,
                    We can supply batch and high-volume requirements sectors with continues production by CNC Auto Lathe
                    and High Precision CNC turning centers.

                    We earned a reputation for excellence through the efficient delivery of high quality and innovative
                    CNC Machining From engineering design to machining solutions, to take projects of all components and
                    complexity from concept to completion.

                    Our uncompromising standards and attention to detail ensure that every project is machining to exact
                    specifications, completed within budget, and delivered on schedule.
                </p>
            </div>

        </div>
    </center>
        `;
        break;
      default:
        html = `<h1>Page Not Found</h1>`;
    }
    content.innerHTML = html;
    if (page === 'home') setTimeout(startCarousel, 100);
  }

  function startCarousel() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const indicators = document.createElement("div");
    indicators.classList.add("carousel-indicators");

    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      if (index === 0) dot.classList.add("active");
      indicators.appendChild(dot);
    });

    document.querySelector(".carousel-container").appendChild(indicators);

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

  loadPage('home');
});
