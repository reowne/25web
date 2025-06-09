const character = document.getElementById('character');
const piecesContainer = document.getElementById('pieces-container');
const infoPopup = document.getElementById('info-popup');
const infoText = document.getElementById('info-text');
const closeInfoBtn = document.getElementById('close-info');
const knowledgeFill = document.getElementById('knowledge-fill');

const mapWidth = 800;
const mapHeight = 600;
const characterSize = 50;
const pieceSize = 60;
const step = 20;

let posX = 375;
let posY = 275;
let discoveredCount = 0;

const piecesData = [
  { img: 'piece1.png', description: '크래프팅, 코딩 : 모든 로직을 구현할 수 있습니다.' },
  { img: 'piece2.png', description: '크래프팅, 게임 : 오브젝트 시스템을 연습할 수 있습니다.' },
  { img: 'piece3.png', description: '크래프팅, 그림 : 공간감각과 캔버스 API연마에 도움이 됩니다.' },
  { img: 'piece4.png', description: '크래프팅, 뜨개질: 패턴 설계와 규칙적인 반복문을 연습할 수 있습니다.' },
];

function getRandomPositionByQuadrant(quadrant) {
  const margin = 40;
  let xMin, xMax, yMin, yMax;
  switch (quadrant) {
    case 1:
      xMin = 0 + margin;
      xMax = 400 - margin;
      yMin = 0 + margin;
      yMax = 300 - margin;
      break;
    case 2:
      xMin = 400 + margin;
      xMax = 800 - margin;
      yMin = 0 + margin;
      yMax = 300 - margin;
      break;
    case 3:
      xMin = 0 + margin;
      xMax = 400 - margin;
      yMin = 300 + margin;
      yMax = 600 - margin;
      break;
    case 4:
      xMin = 400 + margin;
      xMax = 800 - margin;
      yMin = 300 + margin;
      yMax = 600 - margin;
      break;
  }
  return {
    x: Math.floor(Math.random() * (xMax - xMin)) + xMin,
    y: Math.floor(Math.random() * (yMax - yMin)) + yMin
  };
}

const pieces = piecesData.map((piece, idx) => {
  const pos = getRandomPositionByQuadrant(idx + 1);
  const div = document.createElement('img');
  div.src = piece.img;
  div.alt = '석판';
  div.classList.add('piece');
  div.style.left = pos.x + 'px';
  div.style.top = pos.y + 'px';
  piecesContainer.appendChild(div);
  return { element: div, x: pos.x, y: pos.y, description: piece.description, found: false };
});

function isNear(x1, y1, x2, y2, distance = 70) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy) <= distance;
}

function showInfo(text) {
    infoText.textContent = text;
    infoPopup.classList.remove('hidden');
    infoPopup.classList.add('show');
  }
  

  function hideInfo() {
    infoPopup.classList.remove('show');
    infoPopup.classList.add('hidden');
  }
  

  function checkNearbyPiece() {
    pieces.forEach((piece) => {
      if (!piece.found && isNear(posX, posY, piece.x, piece.y)) {
        piece.found = true;
        showInfo(piece.description);
        discoveredCount++;
  
        piece.element.style.transition = 'opacity 0.5s';
        piece.element.style.opacity = '0';
  
        setTimeout(() => {
          piece.element.style.display = 'none';
        }, 500);
  
        updateKnowledgeBar();
      }
    });
  }
  

function updateKnowledgeBar() {
  const percentage = (discoveredCount / pieces.length) * 100;
  knowledgeFill.style.width = percentage + '%';
  if (percentage === 100) {
    setTimeout(() => {
      alert('창작은 곧 코딩과 직결됩니다. 실을 엮고, 코드를 엮고, 객체를 불어넣어 움직이는 세상을 만듭니다.');
      location.href = '../growth/growth.html';
    }, 500);a
  }
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': posY = Math.max(0, posY - step); break;
    case 'ArrowDown': posY = Math.min(mapHeight - characterSize, posY + step); break;
    case 'ArrowLeft': posX = Math.max(0, posX - step); break;
    case 'ArrowRight': posX = Math.min(mapWidth - characterSize, posX + step); break;
    case ' ': e.preventDefault(); checkNearbyPiece(); break;
  }
  character.style.top = posY + 'px';
  character.style.left = posX + 'px';
});

closeInfoBtn.addEventListener('click', hideInfo);

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