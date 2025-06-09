const nodes = document.querySelectorAll('.node');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const actionBtn = document.getElementById('action-btn');
const closeBtn = document.getElementById('close-btn');
const svg = document.getElementById('lines');

let selectedNode = null;

const nodeDescriptions = {
  1: '파이썬 및 다양한 언어들의 기본 문법과 프로그래밍 사고를 습득한다.',
  2: '간단한 자동화 스크립트를 작성해 문제 해결 경험을 쌓는다.',
  3: '객체지향 개념을 익히고 코드를 구조화한다.',
  4: '파이썬으로 간단한 게임 또는 창작 프로젝트를 완성한다.',
  5: '웹과 파이썬을 연동해 사용자 인터페이스를 구현한다.',
  6: '데이터 처리와 시각화 기법을 학습하여 의미 있는 정보를 도출한다.',
  7: '협업 도구와 버전 관리를 활용해 팀 프로젝트에 참여한다.',
  8: '창작 코딩을 통해 예술적 표현과 기술을 결합한다.',
  9: '다양한 창작 도구와 라이브러리를 연동해 프로젝트 범위를 확장한다.',
  10: '개인 프로젝트로 창작 도구 또는 게임을 개발한다.',
  11: '창작 코딩의 종합 역량을 보여준다.',
};

function initNodes() {
  nodes.forEach(node => {
    node.classList.add('locked');
    node.classList.remove('active', 'selected');
  });

  updateLockStates(); 

}

function drawLines() {
  svg.innerHTML = '';
  nodes.forEach(node => {
    const parentId = node.dataset.parent;
    if (parentId) {
      const parent = document.querySelector(`.node[data-id="${parentId}"]`);
      if (!parent) return;

      const x1 = parent.offsetLeft + parent.offsetWidth / 2;
      const y1 = parent.offsetTop + parent.offsetHeight / 2;
      const x2 = node.offsetLeft + node.offsetWidth / 2;
      const y2 = node.offsetTop + node.offsetHeight / 2;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', '#8ecdf1');
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);
    }
  });
}

window.addEventListener('resize', drawLines);
window.addEventListener('load', () => {
  initNodes();
  drawLines();
});

nodes.forEach(node => {
  node.addEventListener('click', () => {
    selectedNode = node;
    const id = node.dataset.id;

    popupText.textContent = nodeDescriptions[id] || '설명이 없습니다.';

    if (node.classList.contains('active')) {
      actionBtn.textContent = '확인';
    } else {
      actionBtn.textContent = '습득하기';
    }

    nodes.forEach(n => n.classList.remove('selected'));
    if (!node.classList.contains('active')) {
      node.classList.add('selected');
    }

    popup.classList.remove('hidden');
  });
});

actionBtn.addEventListener('click', () => {
  if (!selectedNode) return;

  if (actionBtn.textContent === '확인') {
    popup.classList.add('hidden');
    selectedNode.classList.remove('selected');
    selectedNode = null;
    return;
  }

  selectedNode.classList.remove('selected');
  selectedNode.classList.add('active');
  selectedNode.classList.remove('locked');

  const currentId = selectedNode.dataset.id;
  const children = document.querySelectorAll(`.node[data-parent="${currentId}"]`);
  
  children.forEach(child => {
    if (selectedNode.classList.contains('active')) {
      child.classList.remove('locked');
    } else {
      child.classList.add('locked'); 
    }
  });

  popup.classList.add('hidden');
  selectedNode = null;
  drawLines();
});

function updateLockStates() {
  nodes.forEach(node => {
    const parentId = node.dataset.parent;
    if (parentId) {
      const parent = document.querySelector(`.node[data-id="${parentId}"]`);
      if (!parent || !parent.classList.contains('active')) {
        node.classList.add('locked');
      }
    }
  });
}


closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
  if (selectedNode) {
    selectedNode.classList.remove('selected');
    selectedNode = null;
  }
});

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