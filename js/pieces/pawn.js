function movePawn(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, colorImgNumber){
    // Draw circles where we can move
    const directionY = colorImgNumber === 11 ? -1 : 1; // If white pawn then up -1
    const circlesAmount = img.classList.contains("first-move") ? 3 : 2;

    for (let i = 1; i < circlesAmount; i++) {
        if (boardPosition[imgPositionTop + i * directionY][imgPositionLeft] === 0){
            const circle = document.createElement("div");
            circle.classList.add("circle");
            circle.style.left = imgOffsetX + squareWidth / 2 + 'px';
            circle.style.top = (imgOffsetY + directionY * (squareHeight * i) + squareHeight / 2) + 'px'; // center the circle
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
            circle.style.left = imgOffsetX + squareWidth * i + squareWidth / 2 + 'px';
            circle.style.top = (imgOffsetY + directionY * squareHeight  + squareHeight / 2) + 'px'; // 
            board.appendChild(circle);
        }
    }
    
    // Move forward
    board.addEventListener("mousedown", function handleMouseMove (event) {
        const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
        const movY = event.clientY - board.getBoundingClientRect().top;
        console.log(`x: ${movX} y: ${movY}`); 

        const movePositionY = Math.floor(movY / squareHeight); // Get position on the board from the mouse position
        const movePositionX = Math.floor(movX / squareWidth); // Get position on the board from the mouse position

        const conditionX = movePositionX === imgPositionLeft; // Check on X position
        const conditionCheckImg = (img.classList.contains("check-image")); // Chekc if the image is covered by check

        let canMoveForward = false; // Check if the image cam move forward
        if (movePositionY === imgPositionTop + 1 * directionY && boardPosition[movePositionY][imgPositionLeft] === 0){
            canMoveForward = true;
        }else if (movePositionY === imgPositionTop + 2 * directionY && img.classList.contains("first-move") && boardPosition[movePositionY][imgPositionLeft] === 0 && boardPosition[imgPositionTop + 1 * directionY][imgPositionLeft] === 0){
            canMoveForward = true;
        }else{
            canMoveForward = false;
        }

        const directionX = movePositionX > imgPositionLeft ? 1 : -1; // Direction to beat enemy 
        let canBeat = false; // Can move and beat enemy
        if (movePositionY === imgPositionTop + 1 * directionY && movePositionX === imgPositionLeft + 1 * directionX && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX])){
            canBeat = true;
        }else{
            canBeat = false;
        }

        if (conditionX && canMoveForward && conditionCheckImg){ // Check it between left and right side and move y --  
            img.classList.add("chess-piece-animation-top"); // Move top animation piece
            img.style.top = movePositionY  * squareHeight + 'px'; 
            boardPosition[movePositionY][imgPositionLeft] = colorImgNumber; // Move forward
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
            img.classList.remove("first-move"); // Remove the first move (i made a fisrt move)
            img.classList.remove("check-image"); // Remove the check image
            deleteCircles()
            changeCurrentMoveColor();
            board.removeEventListener("mousedown", handleMouseMove);  
            setTimeout(() => {
                img.classList.remove("chess-piece-animation-top"); // remove the animation left in order to let to move to the top after 300ms 
            }, 300)
        }else if(conditionCheckImg && canBeat){ // Beat another piece
            img.classList.add("chech-piece-animation"); // Move top animation piece
            const image = document.querySelector(
                `#board img[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]` // Finds coordinates of the image on div
            );
            console.log(image)
            if (image) {
                image.remove(); // remove image when it's on meat postion
            }
            img.style.top = movePositionY * squareHeight + 'px'; 
            img.style.left = movePositionX * squareWidth + 'px'; 
            boardPosition[movePositionY][movePositionX] = colorImgNumber; // Move forward
            boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
            console.log(boardPosition);
            img.classList.remove("first-move"); // Remove the first move (i made a fisrt move)
            img.classList.remove("check-image"); // Remove the check image
            deleteCircles()
            changeCurrentMoveColor();
            board.removeEventListener("mousedown", handleMouseMove);  
            setTimeout(() => {
                img.classList.remove("chech-piece-animation"); // remove the animation left in order to let to move to the top after 300ms 
            }, 300)
        }
    })
}