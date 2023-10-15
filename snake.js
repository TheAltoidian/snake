var canvas = document.getElementById("gameCanvas")
var snake = { location: [0], direction: "right", length: 1 }
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
// Moves the snake 1 right, unless snake will hit tail or edge of board
const moveSnakeRight = function () {
    if (snake.location[0] % 10 == 9) {
        console.log("Game Over")
    } else if (snake.direction == "left") { }
    else if (snake.location.includes(snake.location[0] + 1)) {
        console.log("Game Over: tail")
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
        console.log("Game Over")
    } else if (snake.direction == "right") { }
    else if (snake.location.includes(snake.location[0] - 1)) {
        console.log("Game Over: tail")
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
        console.log("Game Over")
    } else if (snake.direction == "down") { }
    else if (snake.location.includes(snake.location[0] - 10)) {
        console.log("Game Over: tail")
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
        console.log("Game Over")
    } else if (snake.direction == "up") { }
    else if (snake.location.includes(snake.location[0] + 10)) {
        console.log("Game Over: tail")
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

// Starts the game
const startGame = function () {
    document.getElementById("startButton").remove()
    squares[0].classList.add('snake')
    snake.location[0] = 0
    makeFood()
}