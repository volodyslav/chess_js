
function changeCurrentMoveColor(){
    currentColorArray = currentColorArray === whiteFigures ? blackFigures : whiteFigures; // Set the current color array
    // Keep and change current move color
    const currentTurn = currentColorArray === whiteFigures ? "White" : "Black";
    textTurn.textContent = `${currentTurn} moves now` // Set the current move color
    console.log(`Color now  array ${currentColorArray}`);
}

function removeMoveClasses(img){
    // Remove all classes for movement
    img.classList.remove("chess-piece-animation"); // remove the animation 
}

function deleteCircles(){
    // Delete all circles on the board
    circleDiv = document.querySelectorAll(".circle, .circle-enemy");
    circleDiv.forEach(circle => circle.remove());
}

function drawCirclesOnBoard(top, left, circleType){
    // Draw the circles on the board (0 - circle; 1 -enemy-circle)
    const circle = document.createElement("div");
    if (circleType === 0){
        circle.classList.add("circle");
    }else{
        circle.classList.add("circle-enemy");
    }
    circle.style.left = left * squareWidth  + 'px';
    circle.style.top = top * squareHeight  + 'px'; // center the circle
    circle.style.height = squareHeight + "px";
    circle.style.width = squareWidth + "px";
    board.appendChild(circle);
}

function drawCirclesRookX(imgPositionTop, i, color){
    // Draw the circles on the board horizontally
    drawCirclesOnBoard(imgPositionTop, i, color); 
}

function drawCirclesRookY(imgPositionLeft, i, color){
    // Draw the circles on the board vertically
    drawCirclesOnBoard(i, imgPositionLeft, color); 
}


function drawCirclesKnight(top, left, imgPositionLeft, imgPositionTop){
    // Draw the circles on the board for knight
    const conditionBoardSize = (imgPositionTop + top >= 0 && imgPositionTop + top < 8) && (imgPositionLeft + left >= 0 && imgPositionLeft + left < 8); // 0 < x < 8
    if (conditionBoardSize && boardPosition[imgPositionTop + top][imgPositionLeft + left] === 0){
        console.log(imgPositionLeft + left)
        drawCirclesOnBoard((imgPositionTop + 1 * top), (imgPositionLeft + 1 * left), 0); 
    }else if(conditionBoardSize && !currentColorArray.includes( boardPosition[imgPositionTop + top][imgPositionLeft + left]) && boardPosition[imgPositionTop + top][imgPositionLeft + left] > 0){
        console.log(imgPositionLeft + left)
        drawCirclesOnBoard((imgPositionTop + 1 * top), (imgPositionLeft + 1 * left), 1); 
    }
}

function drawCirclesBishop(top, left, imgPositionTop, imgPositionLeft){
    let imgTop = imgPositionTop + 1 * top; // get left position (change it all iterations)
    let imgLeft = imgPositionLeft + 1 * left; // get right position (change it all iterations)
    while(imgTop >= 0 && imgTop < 8 && imgTop >= 0 && imgLeft < 8){
        console.log(`Top = ${top}, left = ${left}; ${boardPosition[imgTop][imgLeft] === 0}`)
        console.log(imgTop, imgLeft)
        if (boardPosition[imgTop][imgLeft] === 0){
            drawCirclesOnBoard(imgTop, imgLeft, 0); 
        }else if (!currentColorArray.includes(boardPosition[imgTop][imgLeft]) && boardPosition[imgTop][imgLeft] > 0){
            drawCirclesOnBoard(imgTop, imgLeft, 1); 
            break;
        }
        else{
            break;
        }
        imgLeft = imgLeft + 1 * left;
        imgTop = imgTop + 1 * top;
    }
}

function drawCirclesKing(top, left, imgPositionTop, imgPositionLeft){
    const imgTop = imgPositionTop + 1 * top; // position to draw on the board
    const imgLeft = imgPositionLeft + 1 * left;
    
    if (0 <= imgTop && imgTop < 8 && 0 <= imgLeft && imgLeft < 8){
        if (boardPosition[imgTop][imgLeft] === 0){
            console.log(imgLeft, imgTop)
            drawCirclesOnBoard(imgTop, imgLeft, 0); 
        }
        else if (!currentColorArray.includes(boardPosition[imgTop][imgLeft]) && boardPosition[imgTop][imgLeft] > 0){
            drawCirclesOnBoard(imgTop, imgLeft, 1); 
        }
    }
}

function drawCirclesKingRook(imgLeft, imgPositionTop){
    // Draw circles from king to rook
    drawCirclesOnBoard(imgPositionTop, imgLeft, 0); 
}

function deleteImage(movePositionY, movePositionX){
    // deletes images which were previously killed by the enemy
    const image = document.querySelector(
        `#board img[style*="top: ${movePositionY * squareHeight}px;"][style*="left: ${movePositionX * squareWidth}px;"]` // Finds coordinates of the image on div
    );
    console.log(image)
    if (image) {
        image.remove(); // remove image when it's on meat postion
    }
}

function drawCirclesLine(imgPositionTop, imgPositionLeft){
    // Check vertical circles up
    for (let i = imgPositionTop + 1; i < 8; i++) {
        if (boardPosition[i][imgPositionLeft] === 0){
            drawCirclesRookY(imgPositionLeft, i, 0)
        }else if(!currentColorArray.includes(boardPosition[i][imgPositionLeft]) && boardPosition[i][imgPositionLeft] > 0){
            drawCirclesRookY(imgPositionLeft, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
    // Check vertical circles down
    for (let i = imgPositionTop - 1; i >= 0; i--) {
        if (boardPosition[i][imgPositionLeft] === 0){
            drawCirclesRookY(imgPositionLeft, i, 0) // 0 - draw movement circlel; 1 - enemy
        }else if(!currentColorArray.includes(boardPosition[i][imgPositionLeft]) && boardPosition[i][imgPositionLeft] > 0){
            drawCirclesRookY(imgPositionLeft, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
    // Check horizontal circles left
    for (let i = imgPositionLeft - 1; i >= 0; i--) {
        if (boardPosition[imgPositionTop][i] === 0){
            drawCirclesRookX(imgPositionTop, i, 0)
        }else if(!currentColorArray.includes(boardPosition[imgPositionTop][i]) && boardPosition[imgPositionTop][i] > 0){
            drawCirclesRookX(imgPositionTop, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
    // Check horizontal circles right
    for (let i = imgPositionLeft + 1; i < 8; i++) {
        if (boardPosition[imgPositionTop][i] === 0){
            drawCirclesRookX(imgPositionTop, i, 0)
        }else if(!currentColorArray.includes(boardPosition[imgPositionTop][i]) && boardPosition[imgPositionTop][i] > 0){
            drawCirclesRookX(imgPositionTop, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
}

function drawCirclesDiagonal(imgPositionTop, imgPositionLeft){
    // Check diagonal circles up-left and down for bishop and queen
    for (let i = -1; i <= 1; i+=2){
        for (let j = -1; j <= 1; j +=2){
            drawCirclesBishop(j, i, imgPositionTop, imgPositionLeft)
        }
    }
}

function movePosition(img, movePositionX, movePositionY, imgPositionTop, imgPositionLeft, colorImgNumber){
    // Move the rook, king, queen, bishow , pawn and kills its enemy
    const positionToChangePiece = colorImgNumber === 11 ? 0 : 7; // Position where a pawn changes its image
    
    img.classList.add("chess-piece-animation"); // Move top animation piece
    img.style.top = `${movePositionY * squareHeight}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
    img.style.left = `${movePositionX * squareWidth}px`;  // Example offset 350 -  top = 7 - new_top = 5 = 2 * 50px = 250px 
    boardPosition[movePositionY][movePositionX] = colorImgNumber; // Move forward (example 5 - (5 - 2) = 3 -> exact position on the board)
    boardPosition[imgPositionTop][imgPositionLeft] = 0; // Replace the position
    if ((colorImgNumber === 11 || colorImgNumber === 1) && positionToChangePiece === movePositionY){ // If pawn reached the end of the board
        changeImagePawn(img, movePositionX, movePositionY, colorImgNumber);
    }
    console.log(boardPosition);
    img.classList.remove("first-move"); // Remove the first move (i made a fisrt move)
    img.classList.remove("check-image"); // Remove the check image
    deleteCircles()
    changeCurrentMoveColor();
    setTimeout(() => {
        removeMoveClasses(img); 
    }, 300) 
}

function changeImagePawn(img, movePositionX, movePositionY, color){
    // Change pawn image when it made its last move
    
    const imgPawnQueen = color === 11 ? whiteQueen : blackQueen;
    const imgPawnKnight = color === 11 ? whiteKnight : blackKnight;
    const imgPawnRook = color === 11 ? whiteRook : blackRook;
    const imgPawnBishop = color === 11 ? whiteBishop : blackBishop;

    const queenColorNumber = imgPawnQueen === whiteQueen ? 15 : 5;
    const rookColorNumber = imgPawnRook === whiteRook? 14 : 4;
    const bishopColorNumber = imgPawnBishop === whiteBishop? 13 : 3;
    const knightColorNumber = imgPawnKnight === whiteKnight? 12 : 2;

    const pieces = [{ name: "Queen", src: imgPawnQueen, colorNumber: queenColorNumber}, { name: "Rook", src: imgPawnRook, colorNumber: rookColorNumber }, 
        { name: "Bishop", src: imgPawnBishop, colorNumber: bishopColorNumber }, { name: "Knight", src: imgPawnKnight, colorNumber: knightColorNumber }];

    canChooseNewPiece = false; //others Can't move 
    choosePawnDiv.style.display = "flex";
    // Clear previous options if they exist
    choosePawnDiv.innerHTML = ""; 

    pieces.forEach(piece => {
        const button = document.createElement("button");
        const imgPawn = document.createElement("img");
        imgPawn.src = piece.src;
        imgPawn.alt = piece.name;
        button.classList.add("img-piece-pawn");

        button.append(imgPawn);
        button.addEventListener("click", () => {
            img.src = piece.src;
            boardPosition[movePositionY][movePositionX] = piece.colorNumber; // Change on the board position 1 -> queen 5
            choosePawnDiv.style.display = "none";
            canChooseNewPiece = true; // Make I can choose next piece, change color of the current player
        });

        choosePawnDiv.append(button);
    });
}

function getPositions(event, board){
    const movX = event.clientX - board.getBoundingClientRect().left; // Get offset of the board from the mouse position
    const movY = event.clientY - board.getBoundingClientRect().top;

    const movePositionY = Math.floor(movY / squareHeight); // Get position on the board from the mouse position
    const movePositionX = Math.floor(movX / squareWidth); // Get position on the board from the mouse position
    return {movePositionY, movePositionX};
}