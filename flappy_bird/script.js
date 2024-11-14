// script.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(320, window.innerWidth * 0.9);
canvas.height = canvas.width * 1.5; 

let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, velocity: 0, jump: -10 };
let pipes = [];
let pipeWidth = 30;
let pipeGap = 100;
let frame = 0;
let score = 0;
let gameOver = false;
let difficulty = "easy";
let pipeSpeed = 2;

// Get difficulty level from the settings dropdown
const difficultySelect = document.getElementById("difficulty");
difficultySelect.addEventListener("change", (event) => {
    difficulty = event.target.value;
    switch (difficulty) {
        case "medium":
            pipeSpeed = 3;
            break;
        case "hard":
            pipeSpeed = 4;
            break;
        default:
            pipeSpeed = 2;
    }
});

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    frame = 0;
    score = 0;
    gameOver = false;
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

    if (bird.y + bird.height > canvas.height) {
        gameOver = true;
    }
}

function updatePipes() {
    if (frame % 90 === 0) {
        let pipeY = Math.floor(Math.random() * (canvas.height - pipeGap - 20)) + 10;
        pipes.push({ x: canvas.width, y: pipeY });
    }

    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;

        if (pipe.x + pipeWidth < 0) {
            pipes.shift();
            score++;
            document.getElementById("score").innerText = "Score: " + score;
        }

        if (bird.x < pipe.x + pipeWidth && bird.x + bird.width > pipe.x &&
            (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)) {
            gameOver = true;
        }
    });
}

function drawScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 25);
}

function gameLoop() {
    if (gameOver) {
        resetGame();
        return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();
    drawScore();
    
    updateBird();
    updatePipes();

    frame++;
    requestAnimationFrame(gameLoop);
}

// Allow clicking or tapping anywhere to make the bird jump
canvas.addEventListener("click", () => {
    bird.velocity = bird.jump;
});

gameLoop();
