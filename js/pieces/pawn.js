function movePawn(imgPositionTop, imgPositionLeft, img, colorImgNumber){
    // Draw circles where we can move
    const directionY = colorImgNumber === 11 ? -1 : 1; // If white pawn then up -1
    const circlesAmount = img.classList.contains("first-move") ? 3 : 2;

    for (let i = 1; i < circlesAmount; i++) {
        if (boardPosition[imgPositionTop + i * directionY][imgPositionLeft] === 0){
            console.log("Protect the king ", )
            if (kingIsChecked === false && !checkEqualPositions(positionsSameColorKing, imgPositionTop, imgPositionLeft)){ // Check if the image between same king and the enemy
                drawCirclesOnBoard((imgPositionTop + i *  directionY), imgPositionLeft, 0);
            }else if (kingIsChecked === true && checkEqualPositions(positionsKingChecked, imgPositionTop + i * directionY, imgPositionLeft)){
                drawCirclesOnBoard((imgPositionTop + i *  directionY), imgPositionLeft, 0);
            }
        }
        else{
            break;
        }
    }
    
    // Check if there is an enemy piece on the right and left sides
    for (let i = -1; i < 2; i+=2) {
        if(boardPosition[imgPositionTop + 1 * directionY][imgPositionLeft + 1 * i] > 0 && !currentColorArray.includes(boardPosition[imgPositionTop + 1 * directionY][imgPositionLeft + 1 * i])){
            if (kingIsChecked === false && !checkEqualPositions(positionsSameColorKing, imgPositionTop, imgPositionLeft)){
                drawCirclesOnBoard((imgPositionTop + directionY), (imgPositionLeft + i), 1);
            }else if(kingIsChecked === true && checkEqualPositions(positionsKingChecked, imgPositionTop + 1 * directionY, imgPositionLeft + 1 * i) ){
                drawCirclesOnBoard((imgPositionTop + directionY), (imgPositionLeft + i), 1);
            }
        } 
    }
    
    // Move forward
    board.addEventListener("mousedown", function handleMouseMove (event) {
        const {movePositionY, movePositionX} = getPositions(event, board); // utils.js
        const conditionX = movePositionX === imgPositionLeft; // Check on X position
        const conditionCheckImg = img.classList.contains("check-image"); // Chekc if the image is covered by check

        const canMoveForwardDiv = document.querySelector(`#board .circle[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`)  // Check if pos equals the circles on the field
        const canBeatDiv = document.querySelector(`#board .circle-enemy[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`) 
        //console.log("can move", canMoveForwardDiv)
        
        if (conditionX && canMoveForwardDiv && conditionCheckImg){ // Check it between left and right side and move y --  
            deleteImage(movePositionY, movePositionX);
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove);  
        }else if(conditionCheckImg && canBeatDiv){ // Beat another piece
            deleteImage(movePositionY, movePositionX);
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove);   
        }
    })
}