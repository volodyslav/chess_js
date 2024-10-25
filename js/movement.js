function pawnMovement(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img){
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