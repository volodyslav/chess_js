// Load elements
const container = document.querySelector("#container");
const board = document.querySelector("#board");

// Resize container and board
container.style.width = containerWidth + "px";
container.style.height = containerHeight + "px";

board.style.width = boardWidth + "px";
board.style.height = boardHeight + "px";

// Initial figures' position on the board
let boardPosition = Array.from({ length: squareAmount }, () => Array.from({ length: squareAmount }, () => 0));

drawSquares();
function drawSquares(){
    // Draw squares on the board
    let index = 0 // (gonna be more than 8*8 ) Count change color on the board with 7, 14 etc
    board.style.gridTemplateColumns = `repeat(${squareAmount}, ${squareWidth}px)`;
    for (let i = 0; i < squareAmount * squareAmount; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.style.width = squareWidth + "px";
        square.style.height = squareHeight + "px";
        if (i % 8 === 0){index++;} // Check square with different color (change counting and start with a new color if new row)
        // Add color based on module index
        square.style.backgroundColor = (index % 2 === 0)? "white" : "black";
        board.appendChild(square); // Add a square to the board
        index++; 
    };
}