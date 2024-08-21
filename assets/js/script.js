let score = 0;

// Access game html elements
let fly = document.getElementById('fly');
let scoreBoard = document.getElementById('score-board')
let gameContainer = document.getElementById('game-container')

// calculates a random position for fly.
function getRandomPosition() {
    const x = Math.floor(Math.random() * (gameContainer.clientWidth - fly.clientWidth));
    const y = Math.floor(Math.random() * (gameContainer.clientHeight - fly.clientHeight));
    return { x, y };
}

// Position fly at random location
function moveFly() {
    const { x, y } = getRandomPosition();
    fly.style.left = `${x}px`;
    fly.style.top = `${y}px`;
}

// Increases the score and moves fly when clicked
function swatFly() {
    score++;
    scoreBoard.textContent = `Score: ${score}`;
    moveFly();
}

fly.addEventListener('click', swatFly);

// Start game for random test
function startGame() {
    moveFly();
    setInterval(moveFly, 1000); // Fly moves every second
}

startGame();