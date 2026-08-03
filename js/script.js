document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const menuButton = document.getElementById("astronav-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 2. Carousel Controller
  const carouselItems = document.getElementById('carousel-items');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  if (carouselItems && prevButton && nextButton) {
    let currentIndex = 0;
    const totalSlides = carouselItems.children.length;

    function updateCarousel() {
      carouselItems.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    });

    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
  }

  // 3. Header Scroll Effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('shadow-xl');
      } else {
        header.classList.remove('shadow-xl');
      }
    });
  }

});