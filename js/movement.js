function drawCirclesLine(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY){
    // Check vertical circles up
    for (let i = imgPositionTop + 1; i < 8; i++) {
        if (boardPosition[i][imgPositionLeft] === 0){
            drawCirclesRookY(imgOffsetX, i, 0)
        }else if(!currentColorArray.includes(boardPosition[i][imgPositionLeft]) && boardPosition[i][imgPositionLeft] > 0){
            drawCirclesRookY(imgOffsetX, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
    // Check vertical circles down
    for (let i = imgPositionTop - 1; i >= 0; i--) {
        if (boardPosition[i][imgPositionLeft] === 0){
            drawCirclesRookY(imgOffsetX, i, 0) // 0 - draw movement circlel; 1 - enemy
        }else if(!currentColorArray.includes(boardPosition[i][imgPositionLeft]) && boardPosition[i][imgPositionLeft] > 0){
            drawCirclesRookY(imgOffsetX, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
    // Check horizontal circles left
    for (let i = imgPositionLeft - 1; i >= 0; i--) {
        if (boardPosition[imgPositionTop][i] === 0){
            drawCirclesRookX(imgOffsetY, i, 0)
        }else if(!currentColorArray.includes(boardPosition[imgPositionTop][i]) && boardPosition[imgPositionTop][i] > 0){
            drawCirclesRookX(imgOffsetY, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
    // Check horizontal circles right
    for (let i = imgPositionLeft + 1; i < 8; i++) {
        if (boardPosition[imgPositionTop][i] === 0){
            drawCirclesRookX(imgOffsetY, i, 0)
        }else if(!currentColorArray.includes(boardPosition[imgPositionTop][i]) && boardPosition[imgPositionTop][i] > 0){
            drawCirclesRookX(imgOffsetY, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }

}

function moveRook(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, colorImgNumber){
    // Draw the circles where rook can move 
    drawCirclesLine(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY)

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
    
        for (let startPos = imgPositionTop + directionY; directionY === -1 ? startPos >= movePositionY : startPos <= movePositionY; startPos += directionY){
            // Check if current position - 1 and until mouse position is empty if not cant move forward (example: from 7 to 5)
            if (boardPosition[startPos][imgPositionLeft] !== 0){
                console.log("Cannot move forward because of a figure");
                allowedMovementY = false
                break;
            }else{
                console.log("Can move forward because of empty space");
            }
        }
        for (let startPos = imgPositionLeft + directionX; directionX === -1 ? startPos >= movePositionX : startPos <= movePositionX; startPos += directionX){
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
        if (conditionVertical && !conditionHorizontal && (img.classList.contains("check-image")) 
            && allowedMovementY){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-top"); // Move top animation piece
            img.style.top = `${movePositionY * squareHeight}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
            boardPosition[movePositionY][imgPositionLeft] = colorImgNumber; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
           
            img.classList.remove("check-image"); // Remove the check image
            deleteCircles()
            changeCurrentMoveColor();
            setTimeout(() => {
                img.classList.remove("chess-piece-animation-top"); // remove top animation 
            }, 300)
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        else if (conditionHorizontal && !conditionVertical && (img.classList.contains("check-image")) 
            && allowedMovementX){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-left"); // Move left animation piece
            img.style.left = `${movePositionX * squareWidth}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
            boardPosition[imgPositionTop][movePositionX] = colorImgNumber; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
            img.classList.remove("check-image"); // Remove the check image
            deleteCircles();
            changeCurrentMoveColor();
            setTimeout(() => {
                img.classList.remove("chess-piece-animation-left"); // remove the animation left on order to let to move to the top after 300ms 
            }, 300)
            board.removeEventListener("mousedown", handleMouseMove);  
        }
    })
}

function drawCirclesDiagonal(imgPositionTop, imgPositionLeft){
    for (let i = -1; i <= 1; i+=2){
        for (let j = -1; j <= 1; j +=2){
            drawCirclesBishop(j, i, imgPositionTop, imgPositionLeft)
        }
    }
}


function moveBishop(imgPositionTop, imgPositionLeft, img, colorImgNumber){
    drawCirclesDiagonal(imgPositionTop, imgPositionLeft);

    board.addEventListener("mousedown", function handleMouseMove (event) {
        const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
        const movY = event.clientY - board.getBoundingClientRect().top;
        
        console.log(`x: ${movX} y: ${movY}`);  
        const movePositionY = Math.floor(movY / squareHeight); // Get position on the board from the mouse position
        const movePositionX = Math.floor(movX / squareWidth); // Get position on the board from the mouse position

        const directionY = movePositionY > imgPositionTop ? 1 : -1; // Get directionY of movement -1 - up;  1 - down
        const directionX = movePositionX > imgPositionLeft ? 1 : -1; // Get directionY of movement -1 - up;  1 - down

        const conditionOnEqualXOrY = (movePositionX !== imgPositionLeft) && (movePositionY !== imgPositionTop); // Check if the difference between y and x is the same absolute value

        const condition = (0 <= movePositionY < 8) && (0 <= movePositionX < 8) && boardPosition[movePositionY][movePositionX] !== colorImgNumber && conditionOnEqualXOrY;

        const differenceX = imgPositionLeft - movePositionX; //
        const differenceY = imgPositionTop - movePositionY;
        const conditionXEqualY = Math.abs(differenceX) === Math.abs(differenceY); // Check if the difference between x and y is the same absolute value
        
        let canMove = false; // Can move on the board if the board pos = 0

        if (conditionXEqualY && condition){ // Needs check !!!
            for (let i = 1, j = 1; i <= Math.abs(differenceY); i++, j++) {
                if(boardPosition[imgPositionTop + i * directionY][imgPositionLeft + j * directionX] === 0){ // Can move this position on the board (i=2 5 - 1 = 4, 5 - 2 = 3 if it's 0 can move)
                   canMove = true;
                }else{
                    canMove = false;
                    break;
                }
                console.log(`posible move ${imgPositionLeft + j * directionX} ${imgPositionTop + i * directionY}`);
            }
        }

        console.log(`Bishop condition can move${canMove} condition ${condition} ${conditionXEqualY} ${boardPosition[movePositionY][movePositionX] !== colorImgNumber}`)

        if (canMove && condition && conditionXEqualY && boardPosition[movePositionY][movePositionX] === 0 && (img.classList.contains("check-image"))){
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
    })
}


function moveQueen(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, colorImgNumber){
    drawCirclesDiagonal(imgPositionTop, imgPositionLeft);
    drawCirclesLine(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY);

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
            for (let startPos = imgPositionTop + directionY; directionY === -1 ? startPos >= movePositionY : startPos <= movePositionY; startPos += directionY){
                if (boardPosition[startPos][imgPositionLeft] !== 0){
                    console.log("Cannot move forward because of a figure");
                    allowedMovementY = false
                    break;
                }else{
                    console.log("Can move forward because of empty space");
                }
            }
        }
        
        if(!conditionVertical && conditionHorizontal){
            for (let startPos = imgPositionLeft + directionX; directionX === -1 ? startPos >= movePositionX : startPos <= movePositionX; startPos += directionX){
                if (boardPosition[imgPositionTop][startPos] !== 0){
                    console.log("Cannot move forward because of a figure horizontally");
                    allowedMovementX = false
                    break;
                }else{
                    console.log("Can move forward because of empty space horizontally");
                }
            }
        }
        
        console.log(`Hor = ${conditionHorizontal} and Vertical = ${conditionVertical}`)
        //console.log(`Allowed ${allowedMovementX} and Allowed ${allowedMovementY}`);
        //console.log(`New pos X = ${movePositionX} Y = ${movePositionY}`); 
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
        else if (conditionVertical && !conditionHorizontal && (img.classList.contains("check-image")) && allowedMovementY){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-top"); // Move top animation piece
            img.style.top = `${movePositionY * squareHeight}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
            boardPosition[movePositionY][imgPositionLeft] = colorImgNumber; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
           
            img.classList.remove("check-image"); // Remove the check image
            deleteCircles()
            changeCurrentMoveColor();
            setTimeout(() => {
                img.classList.remove("chess-piece-animation-top"); // remove top animation 
            }, 300)
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        else if (conditionHorizontal && !conditionVertical && (img.classList.contains("check-image")) && allowedMovementX){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-left"); // Move left animation piece
            img.style.left = `${movePositionX * squareWidth}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
            boardPosition[imgPositionTop][movePositionX] = colorImgNumber; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
            img.classList.remove("check-image"); // Remove the check image
            deleteCircles();
            changeCurrentMoveColor();
            setTimeout(() => {
                img.classList.remove("chess-piece-animation-left"); // remove the animation left on order to let to move to the top after 300ms 
            }, 300)
            board.removeEventListener("mousedown", handleMouseMove);  
        }
    })
}

function moveKing(imgPositionTop, imgPositionLeft, img, colorImgNumber){
    // Horizontal and vertical circles
    for (let i = -1; i <= 1; i += 2){
        drawCirclesKing(0, i, imgPositionTop, imgPositionLeft);
        drawCirclesKing(i, 0, imgPositionTop, imgPositionLeft);
    }
    // Diagonal circles
    for (let i = -1; i <= 1; i += 2){
        for (let j = -1; j <= 1; j += 2){
            drawCirclesKing(i, j, imgPositionTop, imgPositionLeft);
        }
    }

    board.addEventListener("mousedown", function handleMouseMove (event) {
        const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
        const movY = event.clientY - board.getBoundingClientRect().top;
        
        console.log(`x: ${movX} y: ${movY}`);  
        const movePositionY = Math.floor(movY / squareHeight); // Get position on the board from the mouse position
        const movePositionX = Math.floor(movX / squareWidth); // Get position on the board from the mouse position
       
        const conditionX = Math.abs(movePositionX - imgPositionLeft) === 1 && imgPositionTop === movePositionY;
        const conditionY = Math.abs(movePositionY - imgPositionTop) === 1  && imgPositionLeft === movePositionX;
        const conditionDiagonal = (Math.abs(movePositionX - imgPositionLeft) === 1 && Math.abs(movePositionY - imgPositionTop) === 1) && (imgPositionTop !== movePositionY && imgPositionLeft !== movePositionX); // Check diagonal movement

        console.log(`can x: ${conditionX} can y: ${conditionY}`); 

        if ((conditionX || conditionY || conditionDiagonal) && boardPosition[movePositionY][movePositionX] === 0 && (img.classList.contains("check-image"))) {
            img.classList.add("chess-king-animation"); // Move left animation piece
            img.style.left = `${movePositionX * squareWidth}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
            img.style.top = `${movePositionY * squareHeight}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
            boardPosition[movePositionY][movePositionX] = colorImgNumber; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
            img.classList.remove("check-image"); // Remove the check image
            img.classList.remove("first-move-king"); // Remove the first move
            deleteCircles();
            changeCurrentMoveColor();
            setTimeout(() => {
                img.classList.remove("chess-king-animation"); // remove the animation left on order to let to move to the top after 300ms 
            }, 300)
            board.removeEventListener("mousedown", handleMouseMove);  
        }
    });
}