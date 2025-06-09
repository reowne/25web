// 메뉴에서 추후 설정, 크레딧 등에 사용할 수 있는 공간
console.log("메뉴 스크립트 로딩 완료!");

document.querySelectorAll(".menu-btn").forEach(button => {
  button.addEventListener("click", () => {
    console.log(`${button.textContent} 버튼 클릭됨`);
    // 나중에 설정/크레딧 로직 추가 가능
  });
  
});

window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('pointColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--point-color', savedColor);
    }
});

