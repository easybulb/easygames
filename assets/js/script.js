let score = 0;
let countdown;
let timeLeft;

// Select and store references to DOM elements that will be manipulated
const fly = document.getElementById('fly');
const scoreBoard = document.getElementById('score-board');
const gameContainer = document.getElementById('game-container');
const timer = document.getElementById('timer');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const finalScore = document.getElementById('final-score');
const timeSelect = document.getElementById('time-select');

// Calculates a random position for the fly element within the boundaries of the game container.
function getRandomPosition() {
    const containerRect = gameContainer.getBoundingClientRect(); // Get container bounds
    const flyWidth = fly.clientWidth; // Get the current width of the fly element
    const flyHeight = fly.clientHeight; // Get the current height of the fly element

        // Calculate the maximum X and Y coordinates the fly can have while remaining fully visible within the game container
    const maxX = containerRect.width - flyWidth;
    const maxY = containerRect.height - flyHeight;

    // Generate random X and Y coordinates within the allowed range
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    return { x, y };
}

// Function to move the fly to a new random position
function moveFly() {
    const { x, y } = getRandomPosition();
    fly.style.left = `${x}px`;
    fly.style.top = `${y}px`;
}

// Function to handle the fly being swatted by the player
function swatFly() {
    score++;
    scoreBoard.textContent = `Score: ${score}`;
    moveFly();
}

// Attach the swatFly function to both click and touchstart events on the fly element
fly.addEventListener('click', swatFly);
fly.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents the default touch behavior
    swatFly();
});

// Function to start the game
function startGame() {
    score = 0; // Reset the score to 0 at the start of the game
    scoreBoard.textContent = `Score: ${score}`; // Reset the scoreboard
    timeLeft = parseInt(timeSelect.value);
    timer.textContent = `Time: ${timeLeft}s`;

    // Hide the start screen and show the game container
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    endScreen.style.display = 'none';

    moveFly();

    // Start the countdown timer, decreasing the timeLeft by 1 every second
    countdown = setInterval(() => {
        timeLeft--; // Decrease the remaining time by 1 second
        timer.textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) { // Check if the time has run out
            endGame(); // End the game if the time is up
        }
    }, 1000); // Run the interval every 1000ms (1 second)
}

// Function to end the game
function endGame() {
    clearInterval(countdown);
    gameContainer.style.display = 'none';
    endScreen.style.display = 'flex';
    finalScore.textContent = `Your final score is ${score}`;
}

// Attach the startGame function to both click and touchstart events on the start button
startButton.addEventListener('click', startGame);
startButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startGame();
});

// Attach the restartGame function to both click and touchstart events on the restart button
restartButton.addEventListener('click', () => {
    startScreen.style.display = 'flex';
    endScreen.style.display = 'none';
    gameContainer.style.display = 'none';
});

restartButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startScreen.style.display = 'flex';
    endScreen.style.display = 'none';
    gameContainer.style.display = 'none';
});
