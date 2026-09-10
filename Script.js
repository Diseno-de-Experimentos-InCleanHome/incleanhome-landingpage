document.addEventListener('DOMContentLoaded', () => {

  // Menu movil
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);

      const bars = hamburger.querySelectorAll('span');

      if (isOpen) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars.forEach(bar => {
          bar.style.transform = '';
          bar.style.opacity = '';
        });
      }
    });
  }

  // Animaciones
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // Sombra del navbar
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 4px 20px rgba(26, 46, 74, 0.1)';
      } else {
        navbar.style.boxShadow = '0 2px 10px rgba(26, 46, 74, 0.05)';
      }
    });
  }

  // Navegacion
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        if (mobileMenu) {
          mobileMenu.classList.remove('open');
        }

        if (hamburger) {
          hamburger.setAttribute('aria-expanded', 'false');

          const bars = hamburger.querySelectorAll('span');

          bars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '';
          });
        }
      }
    });
  });

});