// Load elements
const container = document.querySelector("#container");
const board = document.querySelector("#board");

// Text turn
const textTurn = document.querySelector("#turn-text");
textTurn.textContent = `White moves now`

//Check text
const checkKingText = document.querySelector("#check-text");

// Buttons and div to change pawn's image
const choosePawnDiv = document.querySelector("#choose-pawn-div");

let canChooseNewPiece = true; // Whether you can choose a new piece

// Resize container and board
container.style.width = containerWidth + "px";
container.style.height = containerHeight + "px";

board.style.width = boardWidth + "px";
board.style.height = boardHeight + "px";

const boardLength = boardPosition.length; // Get length of the board

function actions(img){
    chooseFigure(img);
}

function main(){
    // Main function, calls all code
    drawSquares();
    drawFigures();
}

main(); // Start the game when the page loads.
