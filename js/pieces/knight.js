function moveKnight(imgPositionTop, imgPositionLeft, img, colorImgNumber){
    // Draw circles
    for (let i = -1; i < 2; i+=2){
        for (let j = -2; j < 3; j+=4){
            drawCirclesKnight(i, j, imgPositionLeft, imgPositionTop);
            drawCirclesKnight(j, i, imgPositionLeft, imgPositionTop);
        }
    }

    board.addEventListener("mousedown", function handleMouseMove (event) {
        const {movePositionY, movePositionX} = getPositions(event, board); // utils.js
        
        const canMoveForwardDiv = document.querySelector(`#board .circle[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`)  // Check if pos equals the circles on the field
        const canBeatDiv = document.querySelector(`#board .circle-enemy[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`) 
        console.log("can move", canMoveForwardDiv)

        // Move left and right, top and bottom
        if (canMoveForwardDiv && boardPosition[movePositionY][movePositionX] === 0 && (img.classList.contains("check-image"))){
            img.classList.add("chess-piece-animation"); // Move left animation piece
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove);  
        }
        // Delete the enemy image
        else if (canBeatDiv && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX]) && (img.classList.contains("check-image"))){
            img.classList.add("chess-piece-animation"); // Move left animation piece
            deleteImage(movePositionY, movePositionX);
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove);  
        }
    })
}

