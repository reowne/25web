window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('pointColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--point-color', savedColor);
    }
  
    const tooltip = document.getElementById('tooltip');
    const questBoxes = document.querySelectorAll('.quest-box');
  
    questBoxes.forEach(box => {
      box.addEventListener('mouseenter', e => {
        tooltip.textContent = box.getAttribute('data-desc');
        tooltip.classList.remove('hidden');
      });
  
      box.addEventListener('mousemove', e => {
        tooltip.style.top = `${e.pageY + 20}px`;
        tooltip.style.left = `${e.pageX + 20}px`;
      });
  
      box.addEventListener('mouseleave', () => {
        tooltip.classList.add('hidden');
      });
    });
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