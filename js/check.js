let positionsKingChecked = []; // Positions to protect the king 
let positionsKingCantMove = []; // Posiitions that king cant move 
let positionsSameColorKing = []; // Positions that same color images cant move because the king can be checked
let kingIsChecked = false; // Check if king is ckecked

// Positions horizontal and vertical cant move
let topSame = 0; // change checkUtils.js
let leftSame = 0; // change checkUtils.js
let potentiallyChecked = false; // checkUtils.js
let potentiallyCheckedByBishop = false; // checkUtils.js
// Position to move diagonal when the king is potentially can be checked (stand)
// Positions which the bishop can move by stdning-protecting the king 
let directionBishopLeft = 0;
let directionBishopTop = 0;

// Draw condition 
let cantBeDraw = 0; // Increase if can be utils.js and pawn.js

function kingMovementCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, checked){ // checled - ccheck if the king can be checked
    // prevents king's movements if it is ckecked or can be check 
    knightKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, checked); // By knight
    rookKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, checked); // By rook and queen
    bishopKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, checked); // By bishop and queen
    pawnKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, checked)
}

function checkColorCheck(){
    positionsKingCantMove = [];
    positionsKingChecked = []; // Positions to protect the king and king cant move (clear)
    positionsSameColorKing = []; 
    kingIsChecked = false; // Check if king is ckecked

    topSame = 0; // change checkUtils.js
    leftSame = 0; // change checkUtils.js
    directionBishopLeft = 0;
    directionBishopTop = 0;
    potentiallyChecked = false;
    potentiallyCheckedByBishop = false;
    cantBeDraw = 0;

    const kingColorCheck = currentColorArray === whiteFigures ? 16 : 6; // 0 - black king color; 1 - white king color
    let imgKing; // King image
    
    if (kingColorCheck === 6){
        imgKing = document.querySelector(".black-king");
    }else{
        imgKing = document.querySelector(".white-king");
    }
    
    const leftKingPos = parseInt(imgKing.style.left) / squareWidth;
    const topKingPos = parseInt(imgKing.style.top) / squareHeight; // top-left positions  on the board
    
    // Check if figure cant move because it's protecting the king
    protectKingByStandingRook(topKingPos, leftKingPos, kingColorCheck, true, 0);
    protectKingByStandingBishop(topKingPos, leftKingPos, kingColorCheck, true, 0);

    // Check if king can be checked
    kingMovementCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, true);
    // Check king's y posible positions
    for (let i = -1; i <= 1; i+=2){
        const top = topKingPos + i;
        if (top >= 0 && top < 8){
            kingMovementCheck(top, leftKingPos, imgKing, kingColorCheck, false);
        }
    }
    // Check king's x posible positions
    for (let i = -1; i <= 1; i+=2){
        const left = leftKingPos + i;
        if (left >= 0 && left < 8){
            kingMovementCheck(topKingPos, left, imgKing, kingColorCheck, false)
        }
    }
    // Check king's diagonal posible positions
    for (let i = -1; i <= 1; i+=2){
        for (let j = -1; j <= 1; j+=2){
            const left = leftKingPos + i;
            const top = topKingPos + j;
            if (left >= 0 && left < 8 && top >= 0 && top < 8){
                kingMovementCheck(top, left, imgKing, kingColorCheck, false)
            }
        }
    }

    if (kingIsChecked){
         checkImageCantMove() // checkmate.js 
         checkCheckmate();
    }
    else if (!kingIsChecked && cantBeDraw > 0){
        canChooseNewPiece = false; // Checkmate cant choose a figure
         checkKingText.textContent = `Draw!`
    }
    console.log("Checkmate ", kingIsCheckmate);
    console.log("King checked pos: ", positionsKingChecked);
    console.log("King cant move: ", positionsKingCantMove);
    console.log("Images with the same color cant move: ", positionsSameColorKing);
    console.log("Board: ", boardPosition);
    console.log("Draw: ", cantBeDraw);
}


function checkCheckmate(){
    // Check if checkmate
    if (kingIsCheckmate === 0){
        canChooseNewPiece = false; // Checkmate cant choose a figure
        checkKingText.textContent = `Checkmate! ${(currentColorArray === whiteFigures? "Black" : "White")} wins`
    }
    
}