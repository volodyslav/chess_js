
function deleteCircles(){
    // Delete all circles on the board
    circleDiv = document.querySelectorAll("div");
    circleDiv.forEach((c) => c.classList.remove("circle"));
}

function drawCirclesRookX(imgOffsetX, imgOffsetY, imgPositionLeft, i, directionMove){
    // Draw the circles on the board horizontally
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.left = (imgOffsetX + directionMove * (squareWidth * (imgPositionLeft - i)) + squareWidth / 2) + 'px';
    circle.style.top = imgOffsetY + squareHeight / 2 + 'px'; // center the circle
    board.appendChild(circle);
}

function drawCirclesRookY(imgOffsetX, imgOffsetY, imgPositionTop, i, directionMove){
    // Draw the circles on the board vertically
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.left = imgOffsetX + squareWidth / 2 + 'px';
    circle.style.top = (imgOffsetY + directionMove * (squareHeight * (imgPositionTop - i)) + squareHeight / 2) + 'px'; // center the circle
    board.appendChild(circle);
}


// Movements setting
let currentColorArray = whiteFigures;
function changeCurrentMoveColor(){
    currentColorArray = currentColorArray === whiteFigures ? blackFigures : whiteFigures; // Set the current color array
    console.log(`Color now  array ${currentColorArray}`);
}