window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('pointColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--point-color', savedColor);
    }
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.main-nav a');
    const currentPage = location.pathname.split('/').pop().replace('.html', '');

    links.forEach(link => {
      if (link.dataset.page === currentPage) {
        link.classList.add('active');
      }
    });
  });