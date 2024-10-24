function pawnMovement(imgPositionTop, imgPositionLeft, imgTop, rect, img){
    if (((boardPosition[imgPositionTop - 1][imgPositionLeft]) === 0)){
        //console.log(`top: ${rect.top} bottom: ${rect.bottom}`)
        // Move forward
        board.addEventListener("mousedown", function handleMouseMove (event) {
            const mov_x = event.clientX; // Mouse coordinates
            const mov_y = event.clientY;
            //console.log(`x: ${mov_x} y: ${mov_y}`);  
            //console.log(`left: ${rect.left} top: ${rect.top}`)
            if (mov_x > rect.left && mov_x < rect.right && mov_y < rect.top  && mov_y > rect.top - squareHeight && (img.classList.contains("check-image"))){ // Check it between left and right side and move y --  
                img.style.top = (imgTop - squareHeight) + 'px'; 
                boardPosition[imgPositionTop - 1][imgPositionLeft] = 11; // Move forward
                boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
                console.log(boardPosition);
                img.classList.remove("first-move"); // Remove the first move (i made a fisrt move)
                img.classList.remove("check-image"); // Remove the check image
                imgPositionTop --; // Reduce the position in order to prevent ([11, 11], [11, 11])
                board.removeEventListener("mousedown", handleMouseMove);
                
            }
        })
    }
    else if (((boardPosition[imgPositionTop - 1][imgPositionLeft]) === 0) && ((boardPosition[imgPositionTop - 2][imgPositionLeft]) === 0) && img.classList.contains("first-move")){
        //console.log(`top: ${rect.top} bottom: ${rect.bottom}`)
        // Move forward
        board.addEventListener("mousedown", function handleMouseMove (event) {
            const mov_x = event.clientX; // Mouse coordinates
            const mov_y = event.clientY;
            //console.log(`x: ${mov_x} y: ${mov_y}`);  
            //console.log(`left: ${rect.left} top: ${rect.top}`)
            if (mov_x > rect.left && mov_x < rect.right && mov_y < rect.top - squareHeight  && mov_y > rect.top - squareHeight * 2 && (img.classList.contains("check-image"))){ // Check it between left and right side and move y --  
                img.style.top = (imgTop - squareHeight * 2) + 'px'; 
                boardPosition[imgPositionTop - 2][imgPositionLeft] = 11; // Move forward
                boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
                console.log(boardPosition);
                img.classList.remove("first-move"); // Remove the first move (i made a fisrt move)
                img.classList.remove("check-image"); // Remove the check image
                imgPositionTop --; // Reduce the position in order to prevent ([11, 11], [11, 11])
                board.removeEventListener("mousedown", handleMouseMove);
               
            }
        })
    }
}