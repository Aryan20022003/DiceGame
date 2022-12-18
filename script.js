'use strict';

const RollDice = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentSrcEL0 = document.querySelector('#current--0');
const currentSrcEL1 = document.querySelector('#current--1');
const hold = document.querySelector('.btn--hold');
const resetbtn = document.querySelector('.btn--new');

//Initial configuration
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hide');

//declaring the nessary variables;

let Score0 = 0;
let Score1 = 0;
let player = 0;
let currentscore = 0;
let haswinner = 0;

//implimenting the dice roll event handler
function rolldice() {
  if (haswinner === 1) {
    return;
  }

  //declaring the random number
  //setting the image

  let randomNumbe = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${randomNumbe}.png`;
  dice.classList.remove('hide');

  //if 1 then switching
  if (randomNumbe == 1) {
    switchuser();
    return;
  }
  //updating the score of current player
  currentscore += randomNumbe;
  updateCurrentSrc();
}
function updateCurrentSrc() {
  if (player == 0) {
    currentSrcEL0.textContent = currentscore;
    return;
  }
  currentSrcEL1.textContent = currentscore;
}
function holdfunction() {
  if (haswinner === 1) return;
  if (player == 0) {
    score0El.textContent = Score0 + currentscore;
    Score0 = Number(score0El.textContent);
    if (Score0 >= 100) {
      declarewinner(player);
      return;
    }
  } else {
    score1El.textContent = Score1 + currentscore;
    Score1 = Number(score1El.textContent);
    if (Score1 >= 100) {
      declarewinner(player);
      return;
    }
  }
  switchuser();
}

function switchuser() {
  currentscore = 0;
  updateCurrentSrc();
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--active');
  player = (player + 1) % 2;
  document.querySelector(`.player--${player}`).classList.add('player--active');

  //   dice.classList.add('hide');
}
function resetfxn() {
  currentscore = 0;
  updateCurrentSrc();
  score0El.textContent = 0;
  score1El.textContent = 0;
  dice.classList.add('hide');
  //   document
  //     .querySelector(`.player--${player}`)
  //     .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');

  player = 0;
  haswinner = 0;
}
function declarewinner(player) {
  document.querySelector(`.player--${player}`).classList.add('player--winner');
  haswinner = 1;
  dice.classList.add('hide');
  return;
}
RollDice.addEventListener('click', rolldice);
hold.addEventListener('click', holdfunction);
resetbtn.addEventListener('click', resetfxn);
