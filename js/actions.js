function chooseFigure(img){
    // Choosing a figure with color over its background
    img.addEventListener('mousedown', (event) => {
        const images = document.querySelectorAll('.check-image');
        images.forEach((i) => i.classList.remove("check-image")); // Remove the check image class if exists (change the figure to be choosen later)
        const x = event.clientX; // Mouse coordinates
        const y = event.clientY;
        const rect = img.getBoundingClientRect(); // Get the bounds of the image
        if (x >= rect.left && x <= rect.right &&
            y >= rect.top && y <= rect.bottom){ // Check if mouse inside the image
            img.classList.add("check-image"); // Change color in choosen figure
            moveFigure(img);
        }   
    });
}

function moveFigure(img){
    // Check if the figure 
    if (img.classList.contains("check-image")){
        // Check if this figure is checked
        const imgLeft = parseInt(img.style.left);
        const imgTop = parseInt(img.style.top);
        console.log(`Image left: ${imgLeft} top: ${imgTop}`)
        const imgPositionLeft = imgLeft / squareWidth; // Get the position of the figure in array structure (0, 0) or (1, 4)
        const imgPositionTop = imgTop / squareHeight;
        console.log(`Image position: ${imgPositionLeft} ${imgPositionTop} `);
        

        if (boardPosition[imgPositionTop][imgPositionLeft] in currentColorArray){
            console.log(`Figure ${boardPosition[imgPositionTop][imgPositionLeft]}`)
        }

        
    }

}