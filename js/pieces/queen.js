function moveQueen(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, colorImgNumber){
    drawCirclesDiagonal(imgPositionTop, imgPositionLeft);
    drawCirclesLine(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY);

    board.addEventListener("mousedown", function handleMouseMove (event) {
        const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
        const movY = event.clientY - board.getBoundingClientRect().top;
        
        const movePositionY = Math.floor(movY / squareHeight); // Get position on the board from the mouse position
        const movePositionX = Math.floor(movX / squareWidth); // Get position on the board from the mouse position

        let allowedMovementY = true; // Whether movement should be allowed
        let allowedMovementX = true; // Whether movement should be allowed
        // Check directionY of movement
        const directionY = movePositionY > imgPositionTop ? 1 : -1; // Get directionY of movement -1 - up;  1 - down
        const directionX = movePositionX > imgPositionLeft ? 1 : -1; // Get directionY of movement -1 - up;  1 - down
    
        const differenceX = imgPositionLeft - movePositionX; //
        const differenceY = imgPositionTop - movePositionY;
        console.log("Differences: ", differenceX, differenceY)
        const conditionXEqualY = Math.abs(differenceX) === Math.abs(differenceY); // Check if the difference between x and y is the same absolute value
        
        let canMove = false; // Can move on the board if the board pos = 0

        const conditionHorizontal = movePositionY === imgPositionTop // Condition based on directionX
        const conditionVertical = movePositionX === imgPositionLeft // Condition based on directionY

        const condition =  boardPosition[movePositionY][movePositionX] === 0; // Check if the difference between y and x is the same absolute value;

        if (conditionXEqualY && condition){ // Needs check !!!
            for (let i = 1, j = 1; i <= Math.abs(differenceY); i++, j++) {
                if(boardPosition[imgPositionTop + i * directionY][imgPositionLeft + j * directionX] === 0){
                   canMove = true;
                }else{
                    canMove = false;
                    break;
                }
                console.log(`posible move ${imgPositionLeft + j * directionX} ${imgPositionTop + i * directionY}`);
            }
        }

        if(conditionVertical && !conditionHorizontal){
            for (let startPos = imgPositionTop + directionY; directionY === -1 ? startPos > movePositionY : startPos < movePositionY; startPos += directionY){
                if (boardPosition[startPos][imgPositionLeft] !== 0){
                    allowedMovementY = false
                    break;
                }
            }
        }
        
        if(!conditionVertical && conditionHorizontal){
            for (let startPos = imgPositionLeft + directionX; directionX === -1 ? startPos > movePositionX : startPos < movePositionX; startPos += directionX){
                if (boardPosition[imgPositionTop][startPos] !== 0){
                    allowedMovementX = false
                    break;
                }
            }
        }
        
        if (!conditionVertical && !conditionHorizontal && canMove && condition  && boardPosition[movePositionY][movePositionX] === 0 && (img.classList.contains("check-image"))){
            img.classList.add("chess-bishop-animation"); // Move left animation piece
            img.style.left = `${movePositionX * squareWidth}px`;  
            img.style.top = `${movePositionY * squareHeight}px`;  
            boardPosition[movePositionY][movePositionX] = colorImgNumber; 
            boardPosition[imgPositionTop][imgPositionLeft] = 0;
            img.classList.remove("check-image"); // Remove the check image
            deleteCircles()
            changeCurrentMoveColor();
            setTimeout(() => {
                img.classList.remove("chess-bishop-animation"); // remove the animation left on order to let to move to the top after 300ms 
            }, 300)
            board.removeEventListener("mousedown", handleMouseMove);    
        }
        else if (conditionVertical && !conditionHorizontal && (img.classList.contains("check-image")) && allowedMovementY && boardPosition[movePositionY][movePositionX] === 0){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-top"); // Move top animation piece
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        else if (conditionHorizontal && !conditionVertical && (img.classList.contains("check-image")) && allowedMovementX && boardPosition[movePositionY][movePositionX] === 0){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-left"); // Move left animation piece
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            board.removeEventListener("mousedown", handleMouseMove);  
        }
        else if (conditionVertical && !conditionHorizontal && (img.classList.contains("check-image")) && allowedMovementY && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX])){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-top"); // Move top animation piece
            deleteImage(movePositionY, movePositionX); // utils.js
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        else if (conditionHorizontal && !conditionVertical && (img.classList.contains("check-image")) && allowedMovementX && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX])){ // Check it between left and right side and move y --  and enemy image
            img.classList.add("chess-piece-animation-left"); // Move left animation piece
            deleteImage(movePositionY, movePositionX); // utils.js
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            board.removeEventListener("mousedown", handleMouseMove);  
        }
    })
}