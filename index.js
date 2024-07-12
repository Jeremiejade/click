let countElement, container;
let count = 0, timeToLooseTime = 1500;
let isMoving = false;

document.addEventListener('DOMContentLoaded', () => {
  container = document.querySelector('.content');
  countElement = document.querySelector('.score');
  const start = document.querySelector('.start');
  const moving = document.querySelector('.moving');
  moving.checked = isMoving
  moving.addEventListener('change', (e) => {
    isMoving = e.target.checked
  })
  start.addEventListener('click', ()=> {
    countElement.classList.remove('.hide')
    buildTarget()
    refreshCount()
    document.querySelector('.toolbar').removeChild(start);
    document.querySelector('.toolbar').removeChild(document.querySelector('.moving_label'));
  })
});

function buildTarget() {
  const targetTime = 1000;
  const target = document.createElement('button');
  container.appendChild(target);
  target.classList.add('target');

  const positionLeft = Math.round(Math.random() * container.offsetWidth - target.offsetWidth/2)
  target.style.top = `${ Math.round(Math.random() * container.offsetHeight - target.offsetHeight/2)}px`;
  target.style.left = `${positionLeft}px`;

  if(count > 0) {
    timeToLooseTime = 1500 - (100 * Math.round(count/2))
  } else {
    timeToLooseTime = 1500
  }
  if(isMoving) {
    target.style.transform = `translateX(${translation(positionLeft)})`
    target.style.transitionDuration = `${(timeToLooseTime/1000)*2}s`
  }
  const timeToLoose = window.setTimeout(()=> {
    refreshTarget(targetTime, false, target)
  }, timeToLooseTime)
  target.addEventListener('click', ()=> {
    window.clearTimeout(timeToLoose)
    refreshTarget(targetTime, true, target)
  })
}

function refreshTarget (time, isSuccess, targetNode) {
  if(isSuccess) {
    count++;
  }else {
    count--;
  }
  refreshCount(countElement)
  container.removeChild(targetNode);
  setTimeout(()=> {
    buildTarget()
  }, time)
}

function translation(targetX) {
  const middle = container.offsetWidth / 2;

  if(targetX < middle) {
    return `${middle/2}px`
  }
  return `${-middle/2}px`
}

function refreshCount() {
  countElement.innerText = count
}