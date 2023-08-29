var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var box = 20;
var snake = [];
snake[0] = { x: 9 * box, y: 10 * box };
var food = { x: Math.floor(Math.random() * 20 + 1) * box, y: Math.floor(Math.random() * 20 + 1) * box };
var score = 0;
var direction = "left";
var paused = false;
var pauseMessageVisible = true;


function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "lightblue" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "purple";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    ctx.fillStyle = "green";
    ctx.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", movements);

function movements(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
    if(event.code == "Space") togglePause();
}

function eatFood(snakeHead, food) {
    if (snakeHead.x == food.x && snakeHead.y == food.y) {
        food = { x: Math.floor(Math.random() * 20 + 1) * box, y: Math.floor(Math.random() * 20 + 1) * box };
        score++;
    } else {
        snake.pop();
    }
}

function checkGameOver(snakeHead, snake) {
    for (var i = 1; i < snake.length; i++) {
        if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y) {
            clearInterval(game);
            // alert("Perdiste!");
        }
    }
    if (snakeHead.x < 0 || snakeHead.x > 19 * box || snakeHead.y < 0 || snakeHead.y > 19 * box) {
        clearInterval(game);
        // alert("Game Overa!");
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    var snakeHead = { x: snakeX, y: snakeY };

    snake.unshift(snakeHead);

    eatFood(snakeHead, food);
    checkGameOver(snakeHead, snake);

    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("El Score es: " + score, 10, 30);

    if(paused) {
        if (paused) {
            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("Juego pausado", 10, canvas.height / 2);
        } else {
            // Si no está pausado, borra el mensaje de pausa
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        clearInterval(game);
        return;
    }
}

function togglePause() {
    paused = !paused;
    if(!paused) {
        game = setInterval(gameLoop, 100);
    }
}

var game = setInterval(gameLoop, 100);
