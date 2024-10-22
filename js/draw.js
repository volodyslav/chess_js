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
            //console.log(`Image: ${img.style.left}`)
            
            img.style.position = "absolute";
            
            actions(img); // Actions for the figure (move, choose)

            board.appendChild(img); // Add a figure to the board
        }
    }
}