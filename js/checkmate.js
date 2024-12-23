// Check checkmate
//Iter over white and black figures , then check left and top in checkedKing
function checkImageCantMove(){
    const colorCheck = currentColorArray === whiteFigures ? "white" : "black"; // check current figure color
    checkPawnCanMove(colorCheck); // pawn
    checkKnightCanMove(colorCheck); // knight
    checkRookCanMove(colorCheck); // rook
    checkBishopCanMove(colorCheck); // bishop 
    checkQueenCanMove(colorCheck); // queen
    checkKingCanMove(colorCheck)
}

function checkKingCanMove(colorCheck){
    const kingImg = document.querySelector(`.${colorCheck}-king`);
    const topKing = parseInt(kingImg.style.top) / squareHeight;
    const leftKing = parseInt(kingImg.style.left) / squareWidth;
    for (let i = -1; i <= 1; i+=2){
        for (let j = -1; j <= 1; j +=2){
            checkerKing(i, j, topKing, leftKing);
        }
    }
    
    for (let j = -1; j <= 1; j +=2){
        checkerKing(0, j, topKing, leftKing);
    }
    for (let i = -1; i <= 1; i +=2){
        checkerKing(i, 0, topKing, leftKing);
    }
}

function checkerKing(i, j, topKing, leftKing){
    const imgTop = topKing + 1 * i;
    const imgLeft = leftKing + 1 * j; // get right position (change it all iterations)
    if (0 <= imgTop && imgTop < 8 && 0 <= imgLeft && imgLeft < 8){
        if (boardPosition[imgTop][imgLeft] === 0 && !checkEqualPositions(positionsKingChecked, imgTop, imgLeft)){
            kingIsCheckmate++;
        }
        else if (!currentColorArray.includes(boardPosition[imgTop][imgLeft]) && boardPosition[imgTop][imgLeft] > 0 && !checkEqualPositions(positionsKingChecked, imgTop, imgLeft)){
            kingIsCheckmate++; 
        }
    }
}

function checkQueenCanMove(colorCheck){
    // Check if queen can move when the king is checked (checking the ckeckmate)
    const queenImg = document.querySelector(`.${colorCheck}-queen`);
    const topQueen = parseInt(queenImg.style.top) / squareHeight;
    const leftQueen = parseInt(queenImg.style.left) / squareWidth;
    for (let i = -1; i <= 1; i+=2){
        for (let j = -1; j <= 1; j +=2){
            bishopChecker(j, i, topQueen, leftQueen);
        }
    }
    rookChecker(topQueen, leftQueen);
}

function checkBishopCanMove(colorCheck){
    // Check if bishop can move when the king is checked (checking the ckeckmate)
    const bishopImgs = document.querySelectorAll(`.${colorCheck}-bishop`);
    bishopImgs.forEach(bishop => {
        const top = parseInt(bishop.style.top) / squareHeight;
        const left = parseInt(bishop.style.left) / squareWidth;
        for (let i = -1; i <= 1; i+=2){
            for (let j = -1; j <= 1; j +=2){
                bishopChecker(j, i, top, left);
            }
        }
    })
}

function bishopChecker(t, l, top, left){
    let imgTop = top + 1 * t; // get left position (change it all iterations)
    let imgLeft = left + 1 * l; // get right position (change it all iterations)
    while(imgTop >= 0 && imgTop < 8 && imgLeft >= 0 && imgLeft < 8){
        if ((boardPosition[imgTop][imgLeft] === 0 || !currentColorArray.includes(boardPosition[imgTop][imgLeft])) && checkEqualPositions(positionsKingChecked, imgTop, imgLeft)){
            kingIsCheckmate++; // if the king or others cant move
        }else if(boardPosition[imgTop][imgLeft] !== 0 && currentColorArray.includes(boardPosition[imgTop][imgLeft])){
            break;
        }
        imgLeft = imgLeft + 1 * l;
        imgTop = imgTop + 1 * t;
    }
}

function checkRookCanMove(colorCheck){
    // Check if rook can move when the king is checked (checking the ckeckmate)
    const rookImgs = document.querySelectorAll(`.${colorCheck}-rook`);
    rookImgs.forEach(rook => {
        const top = parseInt(rook.style.top) / squareHeight;
        const left = parseInt(rook.style.left) / squareWidth;
        // Check vertical circles up
        rookChecker(top, left);
    })
}

function rookChecker(top, left){
    for (let i = top + 1; i < 8; i++) {
        if ((boardPosition[i][left] === 0 || !currentColorArray.includes(boardPosition[i][left])) && checkEqualPositions(positionsKingChecked, i, left)){
            kingIsCheckmate++; // if the king or others cant move
        }else if(boardPosition[i][left] !== 0 && currentColorArray.includes(boardPosition[i][left])){ // If the same color
            break;
        }else{
            break;
        }
    }
    // Check vertical circles down
    for (let i = top - 1; i >= 0; i--) {
        if((boardPosition[i][left] === 0 || !currentColorArray.includes(boardPosition[i][left])) && checkEqualPositions(positionsKingChecked, i, left)){
            kingIsCheckmate++; // if the king or others cant move
        }else if(boardPosition[i][left] !== 0 && currentColorArray.includes(boardPosition[i][left])){ // If the same color
            break;
        }else{
            break;
        }
    }
    // Check horizontal circles left
    for (let i = left - 1; i >= 0; i--) {
        if ((boardPosition[top][i] === 0 || !currentColorArray.includes(boardPosition[top][i])) && checkEqualPositions(positionsKingChecked, top, i)){
            kingIsCheckmate++; // if the king or others cant move
        }else if(boardPosition[top][i] !== 0 && currentColorArray.includes(boardPosition[top][i])){ // If the same color
            break;
        }else{
            break;
        }
    }
    // Check horizontal circles right
    for (let i = left + 1; i < 8; i++) {
        if ((boardPosition[top][i] === 0 || !currentColorArray.includes(boardPosition[top][i])) && checkEqualPositions(positionsKingChecked, top, i)){
            kingIsCheckmate++; // if the king or others cant move
        }else if(boardPosition[top][i] !== 0 && currentColorArray.includes(boardPosition[top][i])){ // If the same color
            break;
        }else{
            break;
        }
    }
}


function checkKnightCanMove(colorCheck){
    // Check if knight can move when the king is checked (checking the ckeckmate)
    const knightImgs = document.querySelectorAll(`.${colorCheck}-knight`);
    knightImgs.forEach(knight => {
        const top = parseInt(knight.style.top) / squareHeight;
        const left = parseInt(knight.style.left) / squareWidth;
        for (let i = -1; i < 2; i+=2){
            for (let j = -2; j < 3; j+=4){
                knightChecker(i, j, left, top);
                knightChecker(j, i, left, top);
            }
        }
    })
}

function knightChecker(t, l, left, top){
    const conditionBoardSize = (top + t >= 0 && top + t < 8) && (left + l >= 0 && left + l < 8) // 0 < x < 8
    if (conditionBoardSize && (!currentColorArray.includes(boardPosition[top + t][left + l]) || boardPosition[top + t][left + l] === 0) && checkEqualPositions(positionsKingChecked, top + t, left + l)){
        kingIsCheckmate++; // if the king or others cant move
    }
}

function checkPawnCanMove(colorCheck){
    // Check if pawn can move when the king is checked (checking the ckeckmate)
    const directionY = colorCheck === "white" ? -1 : 1; // If white pawn then up -1
    const pawnImgs = document.querySelectorAll(`.${colorCheck}-pawn`);
    pawnImgs.forEach(pawn => {
        const circlesAmount = pawn.classList.contains("first-move") ? 3 : 2; // How many move a pwn can do in first move
        const top = parseInt(pawn.style.top) / squareHeight;
        const left = parseInt(pawn.style.left) / squareWidth;
        for (let i = 1; i < circlesAmount; i++) {
            if (boardPosition[top + i * directionY][left] === 0){
                if (kingIsChecked === true && checkEqualPositions(positionsKingChecked, top + i * directionY, left)){
                    kingIsCheckmate++; // if the king or others cant move
                }
            }
        }
        // Check if there is an enemy piece on the right and left sides
        for (let i = -1; i < 2; i+=2) {
            if(boardPosition[top + 1 * directionY][left + 1 * i] > 0 && !currentColorArray.includes(boardPosition[top + 1 * directionY][left + 1 * i])){
                if(kingIsChecked === true && checkEqualPositions(positionsKingChecked, top + 1 * directionY, left + 1 * i) ){
                    kingIsCheckmate++; // if the king or others cant move
                }
            } 
        }
    })    
}

