// Load elements
const container = document.querySelector("#container");
const board = document.querySelector("#board");

// Resize container and board
container.style.width = containerWidth + "px";
container.style.height = containerHeight + "px";

board.style.width = boardWidth + "px";
board.style.height = boardHeight + "px";

const boardLength = boardPosition.length; // Get length of the board

console.log(boardPosition)

function actions(img){
    chooseFigure(img);
}

function main(){
    // Main function, calls all code
    drawSquares();
    drawFigures();
}

main(); // Start the game when the page loads.
