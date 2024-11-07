function movePawn(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, colorImgNumber){
    // Draw circles where we can move
    const directionY = colorImgNumber === 11 ? -1 : 1; // If white pawn then up -1
    const circlesAmount = img.classList.contains("first-move") ? 3 : 2;

    for (let i = 1; i < circlesAmount; i++) {
        if (boardPosition[imgPositionTop + i * directionY][imgPositionLeft] === 0){
            const circle = document.createElement("div");
            circle.classList.add("circle");
            circle.style.left = imgPositionLeft * squareWidth + 'px';
            circle.style.top = (imgPositionTop + i *  directionY) * squareHeight + 'px'; // center the circle
            circle.style.width = squareWidth + 'px';
            circle.style.height = squareHeight + 'px'; // Set the size of the circle
            console.log(circle.style.left);
            board.appendChild(circle);
        }
        else{
            break;
        }
    }
    
    // Check if there is an enemy piece on the right and left sides
    for (let i = -1; i < 2; i+=2) {
        if(boardPosition[imgPositionTop + 1 * directionY][imgPositionLeft + 1 * i] > 0 && !currentColorArray.includes(boardPosition[imgPositionTop + 1 * directionY][imgPositionLeft + 1 * i])){
            const circle = document.createElement("div");
            circle.classList.add("circle-enemy");
            circle.style.left = (imgPositionLeft + i) * squareWidth + 'px';
            circle.style.top = (imgPositionTop + directionY) * squareHeight + 'px'; // 
            circle.style.width = squareWidth + 'px';
            circle.style.height = squareHeight + 'px'; // Set the size of the circle
            board.appendChild(circle);
        }
    }
    
    // Move forward
    board.addEventListener("mousedown", function handleMouseMove (event) {
        const {movePositionY, movePositionX} = getPositions(event, board); // utils.js
        const conditionX = movePositionX === imgPositionLeft; // Check on X position
        const conditionCheckImg = img.classList.contains("check-image"); // Chekc if the image is covered by check

        const canMoveForwardDiv = document.querySelector(`#board .circle[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`)  // Check if pos equals the circles on the field
        const canBeatDiv = document.querySelector(`#board .circle-enemy[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`) 
        console.log("can move", canMoveForwardDiv)
        
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