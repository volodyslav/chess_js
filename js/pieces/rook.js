function moveRook(imgPositionTop, imgPositionLeft, img, colorImgNumber){
    // Draw the circles where rook can move 
    drawCirclesLine(imgPositionTop, imgPositionLeft); // From utils.js
    // Move forward
     board.addEventListener("mousedown", function handleMouseMove (event) {
        const {movePositionY, movePositionX} = getPositions(event, board); // utils.js
        
        const canMoveForwardDiv = document.querySelector(`#board .circle[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`)  // Check if pos equals the circles on the field
        const canBeatDiv = document.querySelector(`#board .circle-enemy[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`) 
        console.log("can move", canMoveForwardDiv)

        if (canMoveForwardDiv && (img.classList.contains("check-image")) && boardPosition[movePositionY][movePositionX] === 0){ // Check it between left and right side and move y --  
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        
        else if (canBeatDiv && (img.classList.contains("check-image")) && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX])){ // Check it between left and right side and move y --  
            deleteImage(movePositionY, movePositionX);
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber)
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        
    })
}