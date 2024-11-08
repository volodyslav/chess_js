function moveKing(imgPositionTop, imgPositionLeft, img, colorImgNumber){
    const moveKingToRook = 2
    const drawCirclesAmountRight = colorImgNumber === 16 ? 1 : 2;
    const drawCirclesAmountLeft = colorImgNumber === 16 ? 2 : 1;

    const colorRookMove = colorImgNumber === 16 ? 14 : 4; // To add this avalue to checking condtion when changes
    const rookColorImagePath = colorImgNumber === 16 ? whiteRook : blackRook; // Color of rook image

    const imageRightRook = document.querySelector(
        `#board img[style*="top: ${imgPositionTop * squareHeight}px;"][style*="left: ${(imgPositionLeft + moveKingToRook + drawCirclesAmountRight) * squareWidth}px;"]` // Finds coordinates of rook image on board
    );
    const imageLeftRook = document.querySelector(
        `#board img[style*="top: ${imgPositionTop * squareHeight}px;"][style*="left: ${(imgPositionLeft - (moveKingToRook + drawCirclesAmountLeft)) * squareWidth}px;"]` // Finds coordinates of rook image on board
    );
    // For king rook combination
    if (img.classList.contains("first-move")){
        if (imageRightRook && imageRightRook.getAttribute("src") === rookColorImagePath && imageRightRook.classList.contains("first-move")){ // Check if scr of the rook equals to the path of a rook image
            for (let i = 1; i <= moveKingToRook; i++) {
                const imgLeft = imgPositionLeft + i;
                if (0 <= imgLeft && imgLeft < 8){
                    if (boardPosition[imgPositionTop][imgLeft] === 0){
                        console.log(imgLeft, imgPositionTop)
                        drawCirclesKingRook(imgLeft, imgPositionTop); // utils.js
                    }else if (boardPosition[imgPositionTop][imgLeft] > 0){
                        break;
                    }else if (boardPosition[imgPositionTop][6] !== 0){
                        break;
                    }
                }
            } 
        }

        if (imageLeftRook && imageLeftRook.getAttribute("src") === rookColorImagePath && imageLeftRook.classList.contains("first-move")){
            for (let i = 1; i <= moveKingToRook; i++) { // Left from king 
                const imgLeft = imgPositionLeft - i;
                if (0 <= imgLeft && imgLeft < 8){
                    if (boardPosition[imgPositionTop][imgLeft] === 0){
                        console.log(imgLeft, imgPositionTop)
                        drawCirclesKingRook(imgLeft, imgPositionTop); // utils.js
                    }else if (boardPosition[imgPositionTop][imgLeft] > 0){
                        break;
                    }else if (boardPosition[imgPositionTop][1] !== 0){
                        break;
                    }
                }
            }
        } 
    }
    
    // Horizontal and vertical circles
    for (let i = -1; i <= 1; i += 2){
        drawCirclesKing(0, i, imgPositionTop, imgPositionLeft); // utils.js
        drawCirclesKing(i, 0, imgPositionTop, imgPositionLeft);
    }
    // Diagonal circles
    for (let i = -1; i <= 1; i += 2){
        for (let j = -1; j <= 1; j += 2){
            drawCirclesKing(i, j, imgPositionTop, imgPositionLeft);
        }
    }

    board.addEventListener("mousedown", function handleMouseMove (event) {
        const {movePositionY, movePositionX} = getPositions(event, board); // utils.js
       
        const canMoveForwardDiv = document.querySelector(`#board .circle[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`)  // Check if pos equals the circles on the field
        const canBeatDiv = document.querySelector(`#board .circle-enemy[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`) 
        console.log("can move", canMoveForwardDiv)

        if (canMoveForwardDiv && boardPosition[movePositionY][movePositionX] === 0 && (img.classList.contains("check-image"))) {
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            if (movePositionX < imgPositionLeft - 1){ // Check if rook changes with king
                imageLeftRook.classList.add("chess-piece-animation"); // Move top animation piece
                imageLeftRook.style.top = `${movePositionY * squareHeight}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
                imageLeftRook.style.left = `${(movePositionX + 1) * squareWidth}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
                boardPosition[movePositionY][movePositionX + 1] = colorRookMove; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
                boardPosition[movePositionY][movePositionX - drawCirclesAmountLeft] = 0; // Replace the position
                imageLeftRook.classList.remove("first-move");
            }
            else if ( movePositionX > imgPositionLeft + 1){
                imageRightRook.classList.add("chess-piece-animation"); // Move top animation piece
                imageRightRook.style.top = `${movePositionY * squareHeight}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
                imageRightRook.style.left = `${(movePositionX - 1)* squareWidth}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
                boardPosition[movePositionY][movePositionX - 1] = colorRookMove; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
                boardPosition[movePositionY][movePositionX + drawCirclesAmountRight] = 0; // Replace the position
                imageRightRook.classList.remove("first-move");

            }
            board.removeEventListener("mousedown", handleMouseMove);  
        }

        else if (canBeatDiv && boardPosition[movePositionY][movePositionX] !== 0 && !currentColorArray.includes(boardPosition[movePositionY][movePositionX]) && (img.classList.contains("check-image"))) {
            deleteImage(movePositionY, movePositionX); // utils.js
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            board.removeEventListener("mousedown", handleMouseMove);  
        }
    });
}