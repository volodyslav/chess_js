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
            img.classList.add("chess-piece-animation"); // Move left animation piece
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            img.classList.remove("first-move-king"); // Remove the first move
            board.removeEventListener("mousedown", handleMouseMove);  
        }
        else if ((conditionX || conditionY || conditionDiagonal) && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX]) && (img.classList.contains("check-image"))) {
            img.classList.add("chess-piece-animation"); // Move left animation piece
            deleteImage(movePositionY, movePositionX); // utils.js
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            img.classList.remove("first-move-king"); // Remove the first move
            board.removeEventListener("mousedown", handleMouseMove);  
        }
    });
}