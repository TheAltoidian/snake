var canvas = document.getElementById("gameCanvas")
var snake = { location: [0], direction: "right", length: 1 }
var food = { location: 43 }

const highScoreText = document.getElementById("highScore")
const scoreText = document.getElementById("score")
const grid = document.getElementById("grid")
let squares = Array.from(document.getElementsByClassName("square"))
const width = 10
var highScore = 10
var score = 0

var gameState = "ready"

// returns a random number between 0 and provided maximum
function RNG(max) {
    return Math.floor(Math.random() * max);
}

// Increments score by 1, increments high score by 1 if applicable
const scoreUp = function () {
    score = score + 1
    scoreText.textContent = ("Current score: " + score)
    // if (score > highScore) {
    //     highScoreText.textContent = ("High score: " + score)
    // }
}

// Adds an additional segment to the snake
const feedSnake = function () {
    const newSegment = snake.location[0]
    snake.location.push(newSegment)
}

// Checks if the space with the snake has food in it, removes the food, and calls to increment score
const checkFood = function () {
    if (squares[snake.location[0]].classList.contains("food")) {
        squares[snake.location[0]].classList.remove('food')
        feedSnake()
        makeFood()
        scoreUp()
    }
}

// Listen for arrow keys
document.addEventListener("keydown", function (event) {
    if (gameState == "playing") {
        switch (event.key) {
            case "ArrowUp":
                moveSnakeUp()
                break
            case "ArrowDown":
                moveSnakeDown()
                break
            case "ArrowLeft":
                moveSnakeLeft()
                break
            case "ArrowRight":
                moveSnakeRight()
                break
            default:
                break
        }
    }
});
// Moves the snake 1 right, unless snake will hit tail or edge of board
const moveSnakeRight = function () {
    if (snake.location[0] % 10 == 9) {
        gameOver()
    } else if (snake.direction == "left") { }
    else if (snake.location.includes(snake.location[0] + 1)) {
        gameOver()
    }
    else {
        pullTail()
        squares[snake.location[0]].classList.remove('snake')
        snake.location[0] += 1
        squares[snake.location[0]].classList.add('snake')
        snake.direction = "right"
    }
    checkFood()
}
// Moves the snake 1 left, unless snake will hit tail or edge of board
const moveSnakeLeft = function () {
    if (snake.location[0] % 10 == 0) {
        gameOver()
    } else if (snake.direction == "right") { }
    else if (snake.location.includes(snake.location[0] - 1)) {
        gameOver()
    }
    else {
        pullTail()
        squares[snake.location[0]].classList.remove('snake')
        snake.location[0] -= 1
        squares[snake.location[0]].classList.add('snake')
        snake.direction = "left"
    }
    checkFood()
}
// Moves the snake 1 up, unless snake will hit tail or edge of board
const moveSnakeUp = function () {
    if (snake.location[0] < 10) {
        gameOver()
    } else if (snake.direction == "down") { }
    else if (snake.location.includes(snake.location[0] - 10)) {
        gameOver()
    }
    else {
        pullTail()
        squares[snake.location[0]].classList.remove('snake')
        snake.location[0] -= 10
        squares[snake.location[0]].classList.add('snake')
        snake.direction = "up"
    }
    checkFood()
}
// Moves the snake 1 down, unless snake will hit tail or edge of board
const moveSnakeDown = function () {
    if (snake.location[0] > 89) {
        gameOver()
    } else if (snake.direction == "up") { }
    else if (snake.location.includes(snake.location[0] + 10)) {
        gameOver()
    }
    else {
        pullTail()
        squares[snake.location[0]].classList.remove('snake')
        snake.location[0] += 10
        squares[snake.location[0]].classList.add('snake')
        snake.direction = "down"
    }
    checkFood()
}
// Pulls the tail along after the snake head
const pullTail = function () {
    squares[snake.location[snake.location.length - 1]].classList.remove('snakeTail')
    for (let i = snake.location.length - 1; i > 0; i--) {
        snake.location[i] = snake.location[i - 1]
        squares[snake.location[i]].classList.add('snakeTail')
    }
}

// Makes food at a random location that doesn't have the snake 
const makeFood = function () {
    do {
        food.location = RNG(100)
    }
    while (squares[food.location].classList.contains("snake") || squares[food.location].classList.contains("snakeTail"))
    squares[food.location].classList.add('food')
}

// Ends the game, stores a high score if achieved
const gameOver = function () {

    gameState = "over"
    if (score > highScore) {
        localStorage.setItem("highScore", score)
        document.getElementById("status").textContent = "Game over, new high score!"
    } else { document.getElementById("status").textContent = "Game over :(" }
}

// Sets high score based on stored record, if it exists
if (localStorage.getItem("highScore")) {
    console.log("high score loaded")
    highScoreText.textContent = ("High score: " + localStorage.getItem("highScore"))
} 
// Starts the game
const startGame = function () {
    document.getElementById("startButton").remove()
    document.getElementById("status").textContent = "Collect the pellets!"
    gameState = "playing"
    squares[0].classList.add('snake')
    snake.location[0] = 0
    makeFood()
}