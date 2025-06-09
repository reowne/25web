const bgmToggle = document.getElementById('bgm-toggle');
const volumeSlider = document.getElementById('volume-slider');
const resetBtn = document.getElementById('reset-settings');
const colorPicker = document.getElementById('color-picker');

// 초기 설정 반영
window.addEventListener('DOMContentLoaded', () => {
  const savedBgm = localStorage.getItem('bgmEnabled');
  const savedVolume = localStorage.getItem('bgmVolume');
  const savedColor = localStorage.getItem('pointColor');

  if (savedBgm === 'true') {
    bgmToggle.checked = true;
  }

  if (savedVolume !== null) {
    volumeSlider.value = savedVolume;
  }

  if (savedColor) {
    document.documentElement.style.setProperty('--point-color', savedColor);
    colorPicker.value = savedColor;
  }
});

// BGM 켜기/끄기 저장
bgmToggle.addEventListener('change', () => {
  localStorage.setItem('bgmEnabled', bgmToggle.checked);
});

// 볼륨 조절 저장
volumeSlider.addEventListener('input', () => {
  localStorage.setItem('bgmVolume', volumeSlider.value);
});

// 색상 선택 저장
colorPicker.addEventListener('input', () => {
  const newColor = colorPicker.value;
  localStorage.setItem('pointColor', newColor);
  document.documentElement.style.setProperty('--point-color', newColor);
});

// 초기화 버튼
resetBtn.addEventListener('click', () => {
  localStorage.removeItem('bgmEnabled');
  localStorage.removeItem('bgmVolume');
  localStorage.removeItem('pointColor');

  bgmToggle.checked = false;
  volumeSlider.value = 0.5;
  colorPicker.value = '#8ecdf1';
  document.documentElement.style.setProperty('--point-color', '#8ecdf1');
});
