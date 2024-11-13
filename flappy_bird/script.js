// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 480;

// Game variables
let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, velocity: 0, jump: -10 };
let pipes = [];
let pipeWidth = 30;
let pipeGap = 100;
let frame = 0;
let score = 0;
let gameOver = false;

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    frame = 0;
    score = 0;
    gameOver = false;
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
        pipe.x -= 2;

        if (pipe.x + pipeWidth < 0) {
            pipes.shift();
            score++;
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

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        bird.velocity = bird.jump;
    }
});

gameLoop();
