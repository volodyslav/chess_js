function moveRook(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, colorImgNumber){
    // Draw the circles where rook can move 
    drawCirclesLine(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY); // From utils.js

    // Move forward
     board.addEventListener("mousedown", function handleMouseMove (event) {
        const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
        const movY = event.clientY - board.getBoundingClientRect().top;
        
        console.log(`x: ${movX} y: ${movY}`);  
        const movePositionY = Math.floor(movY / squareHeight); // Get position on the board from the mouse position
        const movePositionX = Math.floor(movX / squareWidth); // Get position on the board from the mouse position
        let allowedMovementY = true; // Whether movement should be allowed
        let allowedMovementX = true; // Whether movement should be allowed
        // Check directionY of movement
        const directionY = movePositionY > imgPositionTop ? 1 : -1; // Get directionY of movement -1 - up;  1 - down
        const directionX = movePositionX > imgPositionLeft ? 1 : -1; // Get directionY of movement -1 - up;  1 - down
    
        for (let startPos = imgPositionTop + directionY; directionY === -1 ? startPos > movePositionY : startPos < movePositionY; startPos += directionY){
            // Check if current position - 1 and until mouse position is empty if not cant move forward (example: from 7 to 5)
            if (boardPosition[startPos][imgPositionLeft] !== 0){
                console.log("Cannot move forward because of a figure");
                allowedMovementY = false
                break;
            }else{
                console.log("Can move forward because of empty space");
            }
        }
        for (let startPos = imgPositionLeft + directionX; directionX === -1 ? startPos > movePositionX : startPos <= movePositionX; startPos += directionX){
            // Check if current position - 1 and until mouse position is empty if not cant move forward (example: from 7 to 5)
            if (boardPosition[imgPositionTop][startPos] !== 0){
                console.log("Cannot move forward because of a figure horizontally");
                allowedMovementX = false
                break;
            }else{
                console.log("Can move forward because of empty space horizontally");
            }
        }
        const conditionHorizontal = movePositionY === imgPositionTop // Condition based on directionX
        const conditionVertical = movePositionX === imgPositionLeft // Condition based on directionY
        //console.log(`Hor = ${conditionHorizontal} and Vertical = ${conditionVertical}`)
        //console.log(`Allowed ${allowedMovementX} and Allowed ${allowedMovementY}`);
        //console.log(`New pos X = ${movePositionX} Y = ${movePositionY}`); 
        if (conditionVertical && !conditionHorizontal && (img.classList.contains("check-image")) && allowedMovementY && boardPosition[movePositionY][movePositionX] === 0){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-top"); // Move top animation piece
            moveRookPosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        else if (conditionHorizontal && !conditionVertical && (img.classList.contains("check-image")) && allowedMovementX && boardPosition[movePositionY][movePositionX] === 0){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-left"); // Move left animation piece
            moveRookPosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber)
            board.removeEventListener("mousedown", handleMouseMove);  
        }
        else if (conditionVertical && !conditionHorizontal && (img.classList.contains("check-image")) && allowedMovementY && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX])){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-top"); // Move top animation piece
            deleteImage(movePositionY, movePositionX);
            moveRookPosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber)
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        else if (!conditionVertical && conditionHorizontal && (img.classList.contains("check-image")) && allowedMovementY && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX])){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-left"); // Move top animation piece
            deleteImage(movePositionY, movePositionX);
            moveRookPosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber)
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        //console.log(boardPosition[movePositionY][movePositionX] !== 0, !currentColorArray.includes(boardPosition[movePositionY][movePositionX]));
    })
}