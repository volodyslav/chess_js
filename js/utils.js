
function changeCurrentMoveColor(){
    currentColorArray = currentColorArray === whiteFigures ? blackFigures : whiteFigures; // Set the current color array
    console.log(`Color now  array ${currentColorArray}`);
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


