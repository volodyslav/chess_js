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
        const imgLeft = parseInt(img.style.left);
        const imgTop = parseInt(img.style.top);
        console.log(`Image left: ${imgLeft} top: ${imgTop}`)
        const imgPositionLeft = imgLeft / squareWidth; // Get the position of the figure in array structure (0, 0) or (1, 4)
        const imgPositionTop = imgTop / squareHeight;
        console.log(`Image position: ${imgPositionLeft} ${imgPositionTop} `);
        console.log(`Figure ${boardPosition[imgPositionTop][imgPositionLeft]}`)

        const rect = img.getBoundingClientRect();
        
        
        switch (boardPosition[imgPositionTop][imgPositionLeft]){
            case 11:
                // Move pawn
                if (((boardPosition[imgPositionTop - 1][imgPositionLeft]) === 0) ){
                    // Move forward
                    board.addEventListener("mousedown", (event) => {
                        const x = event.clientX; // Mouse coordinates
                        const y = event.clientY;
                        console.log(`x: ${x} y: ${y}`);  
                        console.log(`left: ${rect.left} top: ${rect.top}`)
                        if (x >= rect.left && x <= rect.right &&
                            y >= rect.top - squareHeight && y <= rect.bottom - squareHeight){  
                                img.style.top = (imgTop - squareHeight) + 'px';
                                boardPosition[imgPositionTop - 1][imgPositionLeft] = 11;
                                boardPosition[imgPositionTop][imgPositionLeft] = 0;
                                
                                console.log(`Board after ${boardPosition}`);
                        }
                    })
                    
                }
                break;
            default:
                break;
        }
    }
}