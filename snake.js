var canvas = document.getElementById("gameCanvas")
var snake = { location: 0, direction: "right", length: 1 }
var food = { location: 43 }

const highScoreText = document.getElementById("highScore")
const scoreText = document.getElementById("score")
const grid = document.getElementById("grid")
let squares = Array.from(document.getElementsByClassName("square"))
const width = 10
var highScore = 20
var score = 0

// returns a random number between 0 and provided maximum
function RNG(max) {
    return Math.floor(Math.random() * max);
}

// Increments score by 1, increments high score by 1 if applicable
const scoreUp = function () {
    score = score + 1
    scoreText.textContent = ("Current score: " + score)
    if (score > highScore) {
        highScoreText.textContent = ("High score: " + score)
    }
}

// Checks if the space with the snake has food in it, removes the food, and calls to increment score
const checkFood = function () {
    if (squares[snake.location].classList.contains("food")) {
        console.log("food eaten")
        squares[snake.location].classList.remove('food')
        makeFood()
        scoreUp()
    }
    else {
        console.log("no food")
    }
}

// Listen for arrow keys
document.addEventListener("keydown", function (event) {
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
});
// Moves the snake 1 right, unless snake is at right side of board
const moveSnakeRight = function () {
    if (snake.location % 10 == 9) {
        console.log("Game Over")
    }
    else {
        squares[snake.location].classList.remove('snake')
        snake.location += 1
        squares[snake.location].classList.add('snake')
        snake.direction = "right"
    }
    checkFood()
}
// Moves the snake 1 left, unless snake is at left side of board
const moveSnakeLeft = function () {
    if (snake.location % 10 == 0) {
        console.log("Game Over")
    }
    else {
        squares[snake.location].classList.remove('snake')
        snake.location -= 1
        squares[snake.location].classList.add('snake')
        snake.direction = "left"
    }
    checkFood()
}
// Moves the snake 1 up, unless snake is at top of board
const moveSnakeUp = function () {
    if (snake.location < 10) {
        console.log("Game Over")
    }
    else {
        squares[snake.location].classList.remove('snake')
        snake.location -= 10
        squares[snake.location].classList.add('snake')
        snake.direction = "up"
    }
    checkFood()
}
// Moves the snake 1 down, unless snake is at bottom of board
const moveSnakeDown = function () {
    if (snake.location > 89) {
        console.log("Game Over")
    }
    else {
        squares[snake.location].classList.remove('snake')
        snake.location += 10
        squares[snake.location].classList.add('snake')
        snake.direction = "down"
    }
    checkFood()
}

// Makes food at a random location that doesn't have the snake 
const makeFood = function () {
    do {
        food.location = RNG(100)
        console.log(food.location)
    }
    while (squares[food.location].classList.contains("snake"))
    squares[food.location].classList.add('food')
}

// Starts the game
const startGame = function () {
    document.getElementById("startButton").remove()
    squares[0].classList.add('snake')
    snake.location = 0
    makeFood()
}