
function changeCurrentMoveColor(){
    currentColorArray = currentColorArray === whiteFigures ? blackFigures : whiteFigures; // Set the current color array
    console.log(`Color now  array ${currentColorArray}`);
}

function removeMoveClasses(img){
    // Remove all classes for movement
    img.classList.remove("chess-piece-animation-top"); // remove top animation 
    img.classList.remove("chess-piece-animation-left"); // remove the animation left on order to let to move to the top 
    img.classList.remove("chess-piece-animation"); // remove the animation 
}

function deleteCircles(){
    // Delete all circles on the board
    circleDiv = document.querySelectorAll("div");
    circleDiv.forEach((c) => c.classList.remove("circle")); // Remove all movement circles
    circleDiv.forEach((c) => c.classList.remove("circle-enemy")); // Remove all enemy circles
}

function drawCirclesRookX(imgOffsetY, i, color){
    // Draw the circles on the board horizontally
    const circle = document.createElement("div");
    if (color === 0){
        circle.classList.add("circle");
    }else{
        circle.classList.add("circle-enemy");
    }
    circle.style.left = (squareWidth * i + squareWidth / 2) + 'px';
    circle.style.top = imgOffsetY + squareHeight / 2 + 'px'; // center the circle
    board.appendChild(circle);
}

function drawCirclesRookY(imgOffsetX, i, color){
    // Draw the circles on the board vertically
    const circle = document.createElement("div");
    if (color === 0){
        circle.classList.add("circle");
    }else{
        circle.classList.add("circle-enemy");
    }
    circle.style.left = imgOffsetX + squareWidth / 2 + 'px';
    circle.style.top = (squareHeight * i + squareHeight / 2) + 'px'; // center the circle
    board.appendChild(circle);
}


function drawCirclesKnight(top, left, imgPositionLeft, imgPositionTop, imgOffsetX, imgOffsetY){
    // Draw the circles on the board for knight
    let topCondition = 0; // Condition to draw the circles on the board
    let leftCondition = 0;
    // Check possible positions of the circles
    switch (top) {
        case -2:
            topCondition = (imgOffsetY - squareHeight * 2 + squareHeight / 2)
            break;
        case 2:
            topCondition = (imgOffsetY + squareHeight * 2 + squareHeight / 2)
            break;
        case 1:
            topCondition = (imgOffsetY + squareHeight + squareHeight / 2)
            break;
        case -1:
            topCondition = (imgOffsetY - squareHeight + squareHeight / 2)
            break;
        default:
            break;
    }

    switch (left) {
        case 1:
            leftCondition = (imgOffsetX + squareWidth  + squareWidth / 2);
            break;
        case -1:
            leftCondition = (imgOffsetX - squareWidth / 2);
            break;
        case -2:
            leftCondition = (imgOffsetX - squareWidth * 2 + squareWidth / 2);
            break;
        case 2:
            leftCondition = (imgOffsetX + squareWidth * 2 + squareWidth / 2);
            break;
        default:
            break;
    }

    const conditionBoardSize = (imgPositionTop + top >= 0 && imgPositionTop + top < 8) && (imgPositionLeft + left >= 0 && imgPositionLeft + left < 8); // 0 < x < 8
    
    if (conditionBoardSize && boardPosition[imgPositionTop + top][imgPositionLeft + left] === 0){
        console.log(imgPositionLeft + left)
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.left = leftCondition + 'px';
        circle.style.top = topCondition + 'px'; // center the circle
        board.appendChild(circle);
    }else if(conditionBoardSize && !currentColorArray.includes( boardPosition[imgPositionTop + top][imgPositionLeft + left]) && boardPosition[imgPositionTop + top][imgPositionLeft + left] > 0){
        console.log(imgPositionLeft + left)
        const circle = document.createElement("div");
        circle.classList.add("circle-enemy");
        circle.style.left = leftCondition + 'px';
        circle.style.top = topCondition + 'px'; // center the circle
        board.appendChild(circle);
    }
}

function drawCirclesBishop(top, left, imgPositionTop, imgPositionLeft){
    let imgTop = imgPositionTop + 1 * top; // get left position (change it all iterations)
    let imgLeft = imgPositionLeft + 1 * left; // get right position (change it all iterations)
    while(imgTop >= 0 && imgTop < 8 && imgTop >= 0 && imgLeft < 8){
        console.log(`Top = ${top}, left = ${left}; ${boardPosition[imgTop][imgLeft] === 0}`)
        console.log(imgTop, imgLeft)
        if (boardPosition[imgTop][imgLeft] === 0){
            const circle = document.createElement("div");
            circle.classList.add("circle");
            circle.style.left = (imgLeft * squareWidth + squareWidth / 2) + 'px';
            circle.style.top = (imgTop * squareHeight + squareHeight / 2) + 'px'; // center the circle
            board.appendChild(circle);
        }else if (!currentColorArray.includes(boardPosition[imgTop][imgLeft]) && boardPosition[imgTop][imgLeft] > 0){
            const circle = document.createElement("div");
            circle.classList.add("circle-enemy");
            circle.style.left = (imgLeft * squareWidth + squareWidth / 2) + 'px';
            circle.style.top = (imgTop * squareHeight + squareHeight / 2) + 'px'; // center the circle
            board.appendChild(circle);
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
            const circle = document.createElement("div");
            circle.classList.add("circle");
            circle.style.left = (imgLeft * squareWidth + squareWidth / 2) + 'px';
            circle.style.top = (imgTop * squareHeight + squareHeight / 2) + 'px'; // center the circle
            board.appendChild(circle);
        }else if (!currentColorArray.includes(boardPosition[imgTop][imgLeft]) && boardPosition[imgTop][imgLeft] > 0){
            const circle = document.createElement("div");
            circle.classList.add("circle-enemy");
            circle.style.left = (imgLeft * squareWidth + squareWidth / 2) + 'px';
            circle.style.top = (imgTop * squareHeight + squareHeight / 2) + 'px'; // center the circle
            board.appendChild(circle);
        }
    }
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


function drawCirclesLine(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY){
    // Check vertical circles up
    for (let i = imgPositionTop + 1; i < 8; i++) {
        if (boardPosition[i][imgPositionLeft] === 0){
            drawCirclesRookY(imgOffsetX, i, 0)
        }else if(!currentColorArray.includes(boardPosition[i][imgPositionLeft]) && boardPosition[i][imgPositionLeft] > 0){
            drawCirclesRookY(imgOffsetX, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
    // Check vertical circles down
    for (let i = imgPositionTop - 1; i >= 0; i--) {
        if (boardPosition[i][imgPositionLeft] === 0){
            drawCirclesRookY(imgOffsetX, i, 0) // 0 - draw movement circlel; 1 - enemy
        }else if(!currentColorArray.includes(boardPosition[i][imgPositionLeft]) && boardPosition[i][imgPositionLeft] > 0){
            drawCirclesRookY(imgOffsetX, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
    // Check horizontal circles left
    for (let i = imgPositionLeft - 1; i >= 0; i--) {
        if (boardPosition[imgPositionTop][i] === 0){
            drawCirclesRookX(imgOffsetY, i, 0)
        }else if(!currentColorArray.includes(boardPosition[imgPositionTop][i]) && boardPosition[imgPositionTop][i] > 0){
            drawCirclesRookX(imgOffsetY, i, 1) // 0 - draw movement circlel; 1 - enemy
            break;
        }
        else{
            break;
        }
    }
    // Check horizontal circles right
    for (let i = imgPositionLeft + 1; i < 8; i++) {
        if (boardPosition[imgPositionTop][i] === 0){
            drawCirclesRookX(imgOffsetY, i, 0)
        }else if(!currentColorArray.includes(boardPosition[imgPositionTop][i]) && boardPosition[imgPositionTop][i] > 0){
            drawCirclesRookX(imgOffsetY, i, 1) // 0 - draw movement circlel; 1 - enemy
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
    choosePawnDiv.style.display = "block";
    // Clear previous options if they exist
    choosePawnDiv.innerHTML = ""; 

    pieces.forEach(piece => {
        const button = document.createElement("button");
        const imgPawn = document.createElement("img");
        imgPawn.src = piece.src;
        imgPawn.alt = piece.name;

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