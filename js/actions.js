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
        deleteCircles()
        
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
            case 1:
                movePawn(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 1);
                break;
            case 2:
                moveKnight(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 2);
                break;
            case 3:
                moveBishop(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 3);
                break;
            case 4:
                moveRook(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 4);
                break;
            case 5:
                moveRook(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 5);
                break;
            case 11:
                movePawn(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 11) ;
                break;
            case 12:
                moveKnight(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 12);
                break;
            case 13:
                moveBishop(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 13)
                break;
            case 14:
                moveRook(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 14);
                break;
            case 15:
                moveRook(imgPositionTop, imgPositionLeft, imgOffsetX, imgOffsetY, img, 15);
                break;
            default:
                break;
        }
        
    }
    
}