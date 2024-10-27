// Load elements
const container = document.querySelector("#container");
const board = document.querySelector("#board");

// Resize container and board
container.style.width = containerWidth + "px";
container.style.height = containerHeight + "px";

board.style.width = boardWidth + "px";
board.style.height = boardHeight + "px";

// Initial figures' position on the board
// Black figures: 1 - pawn, 2 - knight, 3 - bishop, 4 - rook, 5 - queen, 6 - king; White figures: 11 - pawn, 12 - knight, 13 - bishop, 14 - rook, 15 - queen, 16 - king
let boardPosition = [
    [4, 2, 3, 6, 5, 3, 2, 4],
    Array.from({length: squareAmount}, () => 1),
    Array.from({length: squareAmount}, () => 0),
    Array.from({length: squareAmount}, () => 0),
    Array.from({length: squareAmount}, () => 0),
    Array.from({length: squareAmount}, () => 0),
    Array.from({length: squareAmount}, () => 11),
    [14, 12, 13, 15, 16, 13, 12, 14],
]

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
