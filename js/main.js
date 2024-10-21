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

console.log(boardPosition)

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
        square.style.backgroundColor = (index % 2 === 0)? "white" : "rgb(49, 48, 48)";
        board.appendChild(square); // Add a square to the board
        index++; 
    };
}

function drawFigures(){
    for (let i = 0; i < boardPosition.length; i++) {
        for (let j = 0; j < boardPosition[i].length; j++) {
            const img = document.createElement("img");
            switch (boardPosition[i][j]) {
                case 1: img.src = blackPawn; break;
                case 2: img.src = blackKnight;  break;
                case 3: img.src = blackBishop; break;
                case 4: img.src = blackRook; break;
                case 5: img.src = blackQueen; break;
                case 6: img.src = blackKing; break;
                case 11: img.src = whitePawn; break;
                case 12: img.src = whiteKnight; break;
                case 13: img.src = whiteBishop; break;
                case 14: img.src = whiteRook; break;
                case 15: img.src = whiteQueen; break;
                case 16: img.src = whiteKing; break;
                case 0: continue; // Skip over 0 squares
                default: break;
            }
            img.style.width = squareWidth + "px"; // Figures' size
            img.style.height = squareHeight + "px";
            img.classList.add("image-figure");

            img.style.left = squareWidth * j  + "px";
            img.style.top = squareHeight * i  + "px";

            img.style.position = "absolute";
            
            actions(img);

            board.appendChild(img); // Add a figure to the board
        }
    }
}

function actions(img){
    const imgLeft = img.style.left;
    const imgTop = img.style.top;
    // Parse coordinates
    const left = parseInt(imgLeft);
    const top = parseInt(imgTop);
    document.addEventListener('mousedown', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        const distanceX = x - left;
        const distanceY = y - top;
        console.log(`Mouse X: ${x}, Mouse Y: ${y}`);
        console.log(`Mouse dis X: ${distanceX}, Mouse dis Y: ${distanceY}`);
        if (range(left + distanceX, left + squareWidth + distanceX).includes(x) && range(top + distanceY, top + distanceY + squareHeight).includes(y)){
            
           
            
            // Calculate new position
            // Find distance between figure and left-top screen coordinates
            img.style.backgroundColor = 'red'
            
        }
        
    });
}




function main(){
    // Main function, calls all code
    drawSquares();
    drawFigures();
}

main(); // Start the game when the page loads.
