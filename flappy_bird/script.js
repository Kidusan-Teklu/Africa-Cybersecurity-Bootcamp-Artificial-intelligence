// script.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(320, window.innerWidth * 0.9);
canvas.height = canvas.width * 1.5;

let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, velocity: 0, jump: -10 };
let pipes = [];
let pipeWidth = 30;
let pipeGap = 100;  // Default gap for medium difficulty
let frame = 0;
let score = 0;
let gameOver = false;
let pipeSpeed = 2;  // Default pipe speed

const difficultySelect = document.getElementById("difficulty");
const replayButton = document.getElementById("replayButton");

// Update difficulty settings based on selection
difficultySelect.addEventListener("change", (event) => {
    const selectedDifficulty = event.target.value;
    switch (selectedDifficulty) {
        case "medium":
            pipeGap = 130;  // Medium difficulty with default gap
            pipeSpeed = 3;
            break;
        case "hard":
            pipeGap = 100;   // Hard difficulty with narrower gap
            pipeSpeed = 4;
            break;
        default:  // Easy mode settings
            pipeGap = 200;  // Wider gap for easier navigation
            pipeSpeed = 2;
            break;
    }
});

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    frame = 0;
    score = 0;
    gameOver = false;
    replayButton.style.display = "none";
    document.getElementById("score").innerText = "Score: 0";
}

function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap);
    });
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // End game if the bird hits the ground
    if (bird.y + bird.height > canvas.height) {
        endGame();
    }
}

function updatePipes() {
    // Create new pipes at a fixed interval
    if (frame % 90 === 0) {
        let pipeY = Math.floor(Math.random() * (canvas.height - pipeGap - 20)) + 10;
        pipes.push({ x: canvas.width, y: pipeY });
    }

    // Move pipes and check for collisions
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;

        // Remove pipes that are off screen
        if (pipe.x + pipeWidth < 0) {
            pipes.shift();
            score++;
            document.getElementById("score").innerText = "Score: " + score;
        }

        // Check for collision with bird
        if (bird.x < pipe.x + pipeWidth && bird.x + bird.width > pipe.x &&
            (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)) {
            endGame();
        }
    });
}

function drawScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 25);
}

function endGame() {
    gameOver = true;
    replayButton.style.display = "block";  // Show replay button when game ends
}

function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();
    drawScore();
    
    updateBird();
    updatePipes();

    frame++;
    requestAnimationFrame(gameLoop);
}

// Add event listeners for both click/tap and spacebar controls
canvas.addEventListener("click", () => {
    if (!gameOver) bird.velocity = bird.jump;
});

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (!gameOver) bird.velocity = bird.jump;
    }
});

// Replay button functionality
replayButton.addEventListener("click", () => {
    resetGame();
    gameLoop();
});

// Start the game loop
gameLoop();
