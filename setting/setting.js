const bgmToggle = document.getElementById('bgm-toggle');
const volumeSlider = document.getElementById('volume-slider');
const resetBtn = document.getElementById('reset-settings');
const colorPicker = document.getElementById('color-picker');

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

bgmToggle.addEventListener('change', () => {
  localStorage.setItem('bgmEnabled', bgmToggle.checked);
});

volumeSlider.addEventListener('input', () => {
  localStorage.setItem('bgmVolume', volumeSlider.value);
});

colorPicker.addEventListener('input', () => {
  const newColor = colorPicker.value;
  localStorage.setItem('pointColor', newColor);
  document.documentElement.style.setProperty('--point-color', newColor);
});

resetBtn.addEventListener('click', () => {
  localStorage.removeItem('bgmEnabled');
  localStorage.removeItem('bgmVolume');
  localStorage.removeItem('pointColor');

  bgmToggle.checked = false;
  volumeSlider.value = 0.5;
  colorPicker.value = '#8ecdf1';
  document.documentElement.style.setProperty('--point-color', '#8ecdf1');
});
