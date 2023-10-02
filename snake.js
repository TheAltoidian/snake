var canvas = document.getElementById("gameCanvas")
var snake = { xLocation: 0, yLocation: 0, direction: "left", length: 1 }
var food = { xLocation: 0, yLocation: 0 }

const highScore = document.getElementById("highScore")
const score = document.getElementById("score")
const grid = document.getElementById("grid")
let squares = Array.from(document.getElementsByClassName("square"))
const width = 10

const startGame = function () {
    console.log("start")
    // console.log("square 43: " + squares[43])
    // document.getElementsByClassName("square").style.backgroundColor = "blue"
    squares[44].classList.add('snake')
}

console.log(squares)