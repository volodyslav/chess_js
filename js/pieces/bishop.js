function moveBishop(imgPositionTop, imgPositionLeft, img, colorImgNumber){
    drawCirclesDiagonal(imgPositionTop, imgPositionLeft); // utils.js

    board.addEventListener("mousedown", function handleMouseMove (event) {
        const {movePositionY, movePositionX} = getPositions(event, board); // utils.js

        const canMoveForwardDiv = document.querySelector(`#board .circle[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`)  // Check if pos equals the circles on the field
        const canBeatDiv = document.querySelector(`#board .circle-enemy[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]`) 
        console.log("can move", canMoveForwardDiv)

        if (canMoveForwardDiv && boardPosition[movePositionY][movePositionX] === 0 && (img.classList.contains("check-image"))){
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            board.removeEventListener("mousedown", handleMouseMove);    
        }
        else if (canBeatDiv && boardPosition[movePositionY][movePositionX] !== 0 && (img.classList.contains("check-image")) && !currentColorArray.includes(boardPosition[movePositionY][movePositionX])){
            deleteImage(movePositionY, movePositionX); // utils.js
            movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber); // utils.js
            board.removeEventListener("mousedown", handleMouseMove);    
        }
    })
}