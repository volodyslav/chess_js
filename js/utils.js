function range(start, end, step = 1) {
    const length = Math.ceil((end - start) / step);
    return Array.from({ length }, (_, i) => start + i * step);
}

function deleteCircles(){
    // Delete all circles on the board
    circleDiv = document.querySelectorAll("div");
    circleDiv.forEach((c) => c.classList.remove("circle"));
}