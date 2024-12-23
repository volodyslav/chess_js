function chooseFigure(img){
    // Choosing a figure with color over its background
    img.addEventListener('mousedown', (event) => {
        deleteCircles() // Deletes circles if after choosing enemy figure or empty space (for safe reason)
        const images = document.querySelectorAll('.check-image');
        images.forEach((i) => i.classList.remove("check-image")); // Remove the check image class if exists (change the figure to be choosen later)
        const x = event.clientX; // Mouse coordinates
        const y = event.clientY;
        const rect = img.getBoundingClientRect(); // Get the bounds of the image
        const canCheck = canMoveCheck(img); // Check if the figure can be checked
        if (canCheck && (x >= rect.left && x <= rect.right &&
            y >= rect.top && y <= rect.bottom) && canChooseNewPiece){ // Check if mouse inside the image
            img.classList.add("check-image"); // Change color in choosen figure
            moveFigure(img);
        }   
    });
}

function canMoveCheck(img){
    // Check if the figure can move or be checked
    const imgLeft = parseInt(img.style.left);
    const imgTop = parseInt(img.style.top);
    const imgPositionLeft = imgLeft / squareWidth; // Get the position of the figure in array structure (0, 0) or (1, 4)
    const imgPositionTop = imgTop / squareHeight;
    // Check if the figure can move or be checked
    if (currentColorArray.includes(boardPosition[imgPositionTop][imgPositionLeft])){
        return true;
    }else {
        return false;
    }
}

function moveFigure(img){
    // Check if the figure can move
    const canMove = canMoveCheck(img);
    if ((img.classList.contains("check-image")) && canMove && canChooseNewPiece){
        deleteCircles()
        // Check if this figure is checked
        const imgOffsetX = img.offsetLeft; // Get the position Offset of the figure 
        const imgOffsetY = img.offsetTop; // Get the position Offset of the figure
        const imgPositionLeft = imgOffsetX / squareWidth; // Get the position of the figure in array structure (0, 0) or (1, 4)
        const imgPositionTop = imgOffsetY / squareHeight;

        switch (boardPosition[imgPositionTop][imgPositionLeft]){
            case 1:
                movePawn(imgPositionTop, imgPositionLeft, img, 1);
                break;
            case 2:
                moveKnight(imgPositionTop, imgPositionLeft, img, 2);
                break;
            case 3:
                moveBishop(imgPositionTop, imgPositionLeft, img, 3);
                break;
            case 4:
                moveRook(imgPositionTop, imgPositionLeft, img, 4);
                break;
            case 5:
                moveQueen(imgPositionTop, imgPositionLeft, img, 5);
                break;
            case 6:
                moveKing(imgPositionTop, imgPositionLeft, img, 6);
                break;
            case 11:
                movePawn(imgPositionTop, imgPositionLeft, img, 11) ;
                break;
            case 12:
                moveKnight(imgPositionTop, imgPositionLeft, img, 12);
                break;
            case 13:
                moveBishop(imgPositionTop, imgPositionLeft, img, 13)
                break;
            case 14:
                moveRook(imgPositionTop, imgPositionLeft, img, 14);
                break;
            case 15:
                moveQueen(imgPositionTop, imgPositionLeft, img, 15);
                break;
            case 16:
                moveKing(imgPositionTop, imgPositionLeft, img, 16);
                break;
            default:
                break;
        } 
    }
}