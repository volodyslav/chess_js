function moveKnight(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, colorImgNumber){
    // Draw circles
    for (let i = -1; i < 2; i+=2){
        for (let j = -2; j < 3; j+=4){
            drawCirclesKnight(i, j, imgPositionLeft, imgPositionTop, imgOffsetX, imgOffsetY);
            drawCirclesKnight(j, i, imgPositionLeft, imgPositionTop, imgOffsetX, imgOffsetY);
        }
    }

    board.addEventListener("mousedown", function handleMouseMove (event) {
        const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
        const movY = event.clientY - board.getBoundingClientRect().top;
        
        const movePositionY = Math.floor(movY / squareHeight); // Get position on the board from the mouse position
        const movePositionX = Math.floor(movX / squareWidth); // Get position on the board from the mouse position

        const directionY = movePositionY > imgPositionTop ? 1 : -1; // Get directionY of movement -1 - up;  1 - down
        const directionX = movePositionX > imgPositionLeft ? 1 : -1; // Get directionY of movement -1 - up;  1 - down

        // Check can move up and down
        const conditionXVertically = directionX === 1 ? (movX > imgOffsetX + squareWidth && movX < imgOffsetX + squareWidth * 2) : (movX < imgOffsetX && movX > imgOffsetX - squareWidth ) ;
        const conditionYVertically = directionY === 1 ? (movY > imgOffsetY + squareHeight * 2 && movY < imgOffsetY + (squareHeight * 3)) : (movY < imgOffsetY - squareHeight && movY > imgOffsetY - (squareHeight * 2));
        
        // Check can move left and right
        const conditionXHorizontally = directionX === 1 ? (movX > imgOffsetX + squareWidth * 2 && movX < imgOffsetX + squareWidth * 3) : (movX < imgOffsetX - squareWidth && movX > imgOffsetX - squareWidth * 2) ;
        const conditionYHorizontally = directionY === 1 ? (movY > imgOffsetY + squareHeight && movY < imgOffsetY + squareHeight * 2 ) : (movY < imgOffsetY && movY > imgOffsetY - squareHeight);

        // Move left and right, top and bottom
        if ((conditionXVertically && !conditionXHorizontally) && (conditionYVertically && !conditionYHorizontally) && boardPosition[movePositionY][movePositionX] === 0 && (img.classList.contains("check-image"))){
            moveKnightPosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove);  
        }
        else if ((!conditionXVertically && conditionXHorizontally) && (!conditionYVertically && conditionYHorizontally) && boardPosition[movePositionY][movePositionX] === 0 && (img.classList.contains("check-image"))){
            moveKnightPosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove);  
        }
        // Delete the enemy image
        else if ((conditionXVertically && !conditionXHorizontally) && (conditionYVertically && !conditionYHorizontally) && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX]) && (img.classList.contains("check-image"))){
            
            deleteImage(movePositionY, movePositionX);
            moveKnightPosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove);  
        }
        else if ((!conditionXVertically && conditionXHorizontally) && (!conditionYVertically && conditionYHorizontally) && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX]) && (img.classList.contains("check-image"))){
            deleteImage(movePositionY, movePositionX);
            moveKnightPosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber);
            board.removeEventListener("mousedown", handleMouseMove);  
        }
    })
}

