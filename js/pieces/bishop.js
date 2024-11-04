function moveBishop(imgPositionTop, imgPositionLeft, img, colorImgNumber){
    drawCirclesDiagonal(imgPositionTop, imgPositionLeft);

    board.addEventListener("mousedown", function handleMouseMove (event) {
        const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
        const movY = event.clientY - board.getBoundingClientRect().top;
        
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
            img.classList.add("chess-piece-animation"); // Move left animation piece
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            board.removeEventListener("mousedown", handleMouseMove);    
        }
        else if (canMove && condition && conditionXEqualY && boardPosition[movePositionY][movePositionX] !== 0 && (img.classList.contains("check-image")) && !currentColorArray.includes(boardPosition[movePositionY][movePositionX])){
            img.classList.add("chess-piece-animation"); // Move left animation piece
            deleteImage(movePositionY, movePositionX); // utils.js
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            board.removeEventListener("mousedown", handleMouseMove);    
        }
    })
}