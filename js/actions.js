function chooseFigure(img){
    // Choosing a figure with color over its background
    img.addEventListener('mousedown', (event) => {
        const images = document.querySelectorAll('.check-image');
        images.forEach((i) => i.classList.remove("check-image")); // Remove the check image class if exists (change the figure to be choosen later)
        const x = event.clientX; // Mouse coordinates
        const y = event.clientY;
        const rect = img.getBoundingClientRect(); // Get the bounds of the image
        const canCheck = canMoveCheck(img); // Check if the figure can be checked
        if (canCheck && (x >= rect.left && x <= rect.right &&
            y >= rect.top && y <= rect.bottom)){ // Check if mouse inside the image
            img.classList.add("check-image"); // Change color in choosen figure
            moveFigure(img);
        }   
    });
}

function canMoveCheck(img){
    // Check if the figure can move or be checked
    const imgLeft = parseInt(img.style.left);
    const imgTop = parseInt(img.style.top);
    //console.log(`Image left: ${imgLeft} top: ${imgTop}`)
    const imgPositionLeft = imgLeft / squareWidth; // Get the position of the figure in array structure (0, 0) or (1, 4)
    const imgPositionTop = imgTop / squareHeight;
    //console.log(`Image position: ${imgPositionLeft} ${imgPositionTop} `);
    // Check if the figure can move or be checked
    if (currentColorArray.includes(boardPosition[imgPositionTop][imgPositionLeft])){
        //console.log(`Figure ${boardPosition[imgPositionTop][imgPositionLeft]}`)
        return true;
    }else {
        return false;
    }
}

function moveFigure(img){
    // Check if the figure can move
    const canMove = canMoveCheck(img);
    if ((img.classList.contains("check-image")) && canMove){
        // Check if this figure is checked
        const imgOffsetX = img.offsetLeft; // Get the position Offset of the figure 
        const imgOffsetY = img.offsetTop; // Get the position Offset of the figure
        //console.log("Left board", board.offsetLeft, "Top board", board.offsetTop)
        //console.log(`Image left: ${imgLeft} top: ${imgTop}`)
        const imgPositionLeft = imgOffsetX / squareWidth; // Get the position of the figure in array structure (0, 0) or (1, 4)
        const imgPositionTop = imgOffsetY / squareHeight;
        //console.log(`Image position: ${imgPositionLeft} ${imgPositionTop} `);
        //console.log(`Figure ${boardPosition[imgPositionTop][imgPositionLeft]}`)
        console.log("Left offset img", imgOffsetX, "Top img", imgOffsetY)
        //const rect = img.getBoundingClientRect();
        
        switch (boardPosition[imgPositionTop][imgPositionLeft]){
            case 11:
                // Move pawn
                pawnMovement(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY,  img)    
                break;
            case 14:
                // Move forward
                board.addEventListener("mousedown", function handleMouseMove (event) {
                    const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
                    const movY = event.clientY - board.getBoundingClientRect().top;
                    
                    console.log(`x: ${movX} y: ${movY}`);  
                    const movePositionY = Math.floor(movY / squareHeight); // Get position on the board from the mouse position
                    let allowedMovement = true; // Whether movement should be allowed
                    // Check direction of movement
                    const direction = movePositionY > imgPositionTop ? 1 : -1; // Get direction of movement -1 - up;  1 - down
                
                    for (let startPos = imgPositionTop + direction; direction === -1 ? startPos >= movePositionY : startPos < movePositionY; startPos += direction){
                        // Check if current position - 1 and until mouse position is empty if not cant move forward (example: from 7 to 5)
                        if (boardPosition[startPos][imgPositionLeft] !== 0){
                            console.log("Cannot move forward because of a figure");
                            allowedMovement = false
                            break;
                        }else{
                            console.log("Can move forward because of empty space");
                        }
                    }
                    const conditionByX = movX > imgOffsetX && movX < imgOffsetX + squareWidth // Condition if x == x_new -> means we mobe vertically
                    const conditionVertical = direction === -1 ? movY < imgOffsetY : movY > imgOffsetY + squareHeight // Condition based on direction
                    const conditionStyleTop = direction === -1 ? (imgPositionTop - movePositionY) : (movePositionY - imgPositionTop) // Condition based on direction, move on the screen position

                    console.log(`New pos ${movePositionY}`); 
                    if (conditionByX && conditionVertical && (img.classList.contains("check-image")) 
                        && allowedMovement){ // Check it between left and right side and move y --  
                        img.style.top = (imgOffsetY + direction * squareHeight * conditionStyleTop) + 'px';  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
                        boardPosition[imgPositionTop + direction * conditionStyleTop][imgPositionLeft] = 14; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
                        boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
                        console.log(boardPosition);
                        img.classList.remove("check-image"); // Remove the check image
                        board.removeEventListener("mousedown", handleMouseMove);  
                    }
                })
                
                break;
            default:
                break;
        }
    }
}