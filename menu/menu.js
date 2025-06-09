console.log("메뉴 스크립트 로딩 완료!");

document.querySelectorAll(".menu-btn").forEach(button => {
  button.addEventListener("click", () => {
    console.log(`${button.textContent} 버튼 클릭됨`);
  });
  
});

window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('pointColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--point-color', savedColor);
    }
});

