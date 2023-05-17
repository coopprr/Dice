var buttonNew = document.querySelector('.btn-new');
var buttonRoll = document.querySelector('.btn-roll');
var buttonHold = document.querySelector('.btn-hold');
var dice = document.querySelector('.dice');

var score, currentScore, currentPlayer, activePlayerPanel;

var init = function () {
    score = [0,0];
    currentScore = 0;
    activePlayer = 0;
    activePlayerPanel = document.querySelector('.player-' + activePlayer + '-panel');
    
    dice.style.display = 'none';

    document.querySelector('.player-0-panel .player-name').textContent = 'Player 1';
    document.querySelector('.player-1-panel .player-name').textContent = 'Player 2';
    document.querySelector('.player-0-panel .player-current-score').textContent = 0;
    document.querySelector('.player-1-panel .player-current-score').textContent = 0;
    document.querySelector('.player-0-panel').className = 'player-0-panel active';
    document.querySelector('.player-1-panel').className = 'player-1-panel';
}

init();

function next () {
    currentScore = 0;
    activePlayerPanel.querySelector('.player-current-score').textContent = 0;
    activePlayerPanel.classList.remove('active');
    activePlayer = activePlayer == 0 ? 1 : 0;
    activePlayerPanel = document.querySelector('.player-' + activePlayer + '-panel');
    activePlayerPanel.classList.add('active');
    dice.style.display = 'none';
}

buttonRoll.addEventListener('click', function () {
    var randomNumber = Math.floor((Math.random()*6)+1);
    currentScore = currentScore + randomNumber;
    dice.src = 'img/dice-' + randomNumber +'.png';
    dice.style.display = 'block';

    if (randomNumber !== 1) {
        activePlayerPanel.querySelector('.player-current-score').textContent = currentScore;
    } else {
        currentScore = 0;
        activePlayerPanel.querySelector('.player-current-score').textContent = 0;
        activePlayerPanel.classList.remove('active');
        activePlayer = activePlayer == 0 ? 1 : 0;
        activePlayerPanel = document.querySelector('.player-' + activePlayer + '-panel');
        activePlayerPanel.classList.add('active');
    }
});

buttonHold.addEventListener('click', function () {
    score[activePlayer] += currentScore;
    activePlayerPanel.querySelector('.player-score').textContent = score[activePlayer];
    activePlayerPanel.querySelector('.player-current-score').textContent = 0;

    if (score[activePlayer] >= document.querySelector('.center .final-score').value) {
        activePlayerPanel.classList.remove('active');
        activePlayerPanel.classList.add('winner');
        activePlayerPanel.querySelector('.player-name').textContent = "Winner";
    } else {
        next();
    }
});

buttonNew.addEventListener('click', function () {
    init();
});