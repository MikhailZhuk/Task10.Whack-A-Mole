const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
let lastHole;
let timeUp = false;
let score = 0;
const levelEasy = document.querySelector('.easy');
const levelNormal = document.querySelector('.normal');
const levelHard = document.querySelector('.hard');
const levelExteme = document.querySelector('.extreme');

function randomTime(min, max) {
  return Math.round(Math.random()) * (max - min) + min;
}

min=300;
max=900;

levelEasy.addEventListener('click', () => {
  levelEasy.classList.add('focus');
  levelNormal.classList.remove('focus');
  levelHard.classList.remove('focus');
  levelExteme.classList.remove('focus');
  min=400;
  max=1000;
})

levelNormal.addEventListener('click', () => {
  levelNormal.classList.add('focus');
  levelEasy.classList.remove('focus');
  levelHard.classList.remove('focus');
  levelExteme.classList.remove('focus');
  min=300;
  max=900;
})

levelHard.addEventListener('click', () => {
  levelHard.classList.add('focus');
  levelEasy.classList.remove('focus');
  levelNormal.classList.remove('focus');
  levelExteme.classList.remove('focus');
  min=200;
  max=700;
})

levelExteme.addEventListener('click', () => {
  levelExteme.classList.add('focus');
  levelEasy.classList.remove('focus');
  levelNormal.classList.remove('focus');
  levelHard.classList.remove('focus');
  min=200;
  max=500;
})

function randomHole(holes) {
  const idx = Math.floor( Math.random() * holes.length);
  const hole = holes[idx];
  if( hole === lastHole) {
    console.log('ah sorry');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(min, max);
  console.log(time);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) peep();
  }, time); 
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
  if(e.isTruested) return;
  score++;
  console.log(score);
  this.classList.remove("up")
  scoreBoard.textContent = score;
}

moles.forEach( mole => mole.addEventListener('click', bonk));