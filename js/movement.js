function movePawn(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img){
    // Move forward
    board.addEventListener("mousedown", function handleMouseMove (event) {
        const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
        const movY = event.clientY - board.getBoundingClientRect().top;
        console.log(`x: ${movX} y: ${movY}`); 
 
        const conditionX = movX > imgOffsetX && movX < imgOffsetX + squareWidth; // Check on X position
        const conditionCheckImg = (img.classList.contains("check-image")); // Chekc if the image is covered by check

        if (conditionX && movY < imgOffsetY  && movY > (imgOffsetY - squareHeight) && conditionCheckImg && boardPosition[imgPositionTop - 1][imgPositionLeft] === 0){ // Check it between left and right side and move y --  
            img.style.top = (imgOffsetY - squareHeight) + 'px'; 
            boardPosition[imgPositionTop - 1][imgPositionLeft] = 11; // Move forward
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
            img.classList.remove("first-move"); // Remove the first move (i made a fisrt move)
            img.classList.remove("check-image"); // Remove the check image
            board.removeEventListener("mousedown", handleMouseMove);  
        }else if ( conditionX  && movY < (imgOffsetY - squareHeight)  && movY > (imgOffsetY - squareHeight * 2) && conditionCheckImg && (img.classList.contains("first-move")) && boardPosition[imgPositionTop - 2][imgPositionLeft] === 0){ // Check it between left and right side and move y --  
            img.style.top = (imgOffsetY - squareHeight * 2) + 'px'; 
            boardPosition[imgPositionTop - 2][imgPositionLeft] = 11; // Move forward
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
            img.classList.remove("first-move"); // Remove the first move (i made a fisrt move)
            img.classList.remove("check-image"); // Remove the check image
            board.removeEventListener("mousedown", handleMouseMove);
                        
        }
    })
}


function moveRook(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img){
    
    
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

        const conditionByX = movX > imgOffsetX && movX < imgOffsetX + squareWidth // Condition if x == x_new -> means we mobe vertically
        const conditionByY = movY > imgOffsetY && movY < imgOffsetY + squareHeight // Condition if y == y_new -> means we mobe horizontally

        const conditionHorizontal = directionX === -1 ? movX < imgOffsetX : movX > imgOffsetX + squareWidth // Condition based on directionX
        const conditionVertical = directionY === -1 ? movY < imgOffsetY : movY > imgOffsetY + squareHeight // Condition based on directionY

        const conditionStyleLeft = directionX === -1 ? (imgPositionLeft - movePositionX) : (movePositionX - imgPositionLeft) // Condition based on directionX, move on the screen position
        const conditionStyleTop = directionY === -1 ? (imgPositionTop - movePositionY) : (movePositionY - imgPositionTop) // Condition based on directionY, move on the screen position

        console.log(`New pos X = ${movePositionX} Y = ${movePositionY}`); 
        if (conditionByX && !conditionByY && conditionVertical && (img.classList.contains("check-image")) 
            && allowedMovementY){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-top"); // Move top animation piece
            img.style.top = `${imgOffsetY + directionY * squareHeight * conditionStyleTop}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
            boardPosition[imgPositionTop + directionY * conditionStyleTop][imgPositionLeft] = 14; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
           
            img.classList.remove("check-image"); // Remove the check image
            setTimeout(() => {
                img.classList.remove("chess-piece-animation-top"); // remove top animation 
            }, 300)
            board.removeEventListener("mousedown", handleMouseMove); // Let do only one move
        }
        else if (conditionByY && !conditionByX && conditionHorizontal && (img.classList.contains("check-image")) 
            && allowedMovementX){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-left"); // Move left animation piece
            img.style.left = `${imgOffsetX + directionX * squareWidth * conditionStyleLeft}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
            boardPosition[imgPositionTop][imgPositionLeft + directionX * conditionStyleLeft] = 14; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
            img.classList.remove("check-image"); // Remove the check image
            setTimeout(() => {
                img.classList.remove("chess-piece-animation-left"); // remove the animation left on order to let to move to the top after 300ms 
            }, 300)
            board.removeEventListener("mousedown", handleMouseMove);  
        }
    })
}