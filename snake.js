var canvas = document.getElementById("gameCanvas")
var snake = { location: 0, direction: "right", length: 1 }
var food = { location: 43, }

const highScore = document.getElementById("highScore")
const score = document.getElementById("score")
const grid = document.getElementById("grid")
let squares = Array.from(document.getElementsByClassName("square"))
const width = 10

const startGame = function () {
    console.log("start")
    squares[0].classList.add('snake')
    snake.location = 0
    console.log(snake)
}
// console.log(squares)

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
        console.log("end of board")
    }
    else {
        squares[snake.location].classList.remove('snake')
        snake.location += 1
        console.log(snake)
        squares[snake.location].classList.add('snake')
    }
}
// Moves the snake 1 left, unless snake is at left side of board
const moveSnakeLeft = function () {
    if (snake.location % 10 == 0) {
        console.log("end of board")
    }
    else {
        squares[snake.location].classList.remove('snake')
        snake.location -= 1
        console.log(snake)
        squares[snake.location].classList.add('snake')
    }
}
// Moves the snake 1 up, unless snake is at top of board
const moveSnakeUp = function () {
    if (snake.location < 10) {
        console.log("end of board")
    }
    else {
        squares[snake.location].classList.remove('snake')
        snake.location -= 10
        console.log(snake)
        squares[snake.location].classList.add('snake')
    }
}
// Moves the snake 1 down, unless snake is at bottom of board
const moveSnakeDown = function () {
    if (snake.location > 89) {
        console.log("end of board")
    }
    else {
        squares[snake.location].classList.remove('snake')
        snake.location += 10
        console.log(snake)
        squares[snake.location].classList.add('snake')
    }
}