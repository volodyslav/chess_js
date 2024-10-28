
function deleteCircles(){
    // Delete all circles on the board
    circleDiv = document.querySelectorAll("div");
    circleDiv.forEach((c) => c.classList.remove("circle"));
}

function drawCirclesRookX(imgOffsetY, i){
    // Draw the circles on the board horizontally
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.left = (squareWidth * i + squareWidth / 2) + 'px';
    circle.style.top = imgOffsetY + squareHeight / 2 + 'px'; // center the circle
    board.appendChild(circle);
}

function drawCirclesRookY(imgOffsetX, i){
    // Draw the circles on the board vertically
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.left = imgOffsetX + squareWidth / 2 + 'px';
    circle.style.top = (squareHeight * i + squareHeight / 2) + 'px'; // center the circle
    board.appendChild(circle);
}


// Movements setting
let currentColorArray = whiteFigures;
function changeCurrentMoveColor(){
    currentColorArray = currentColorArray === whiteFigures ? blackFigures : whiteFigures; // Set the current color array
    console.log(`Color now  array ${currentColorArray}`);
}