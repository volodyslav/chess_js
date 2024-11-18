let positionsKingChecked = []; // Positions to protect the king 
let positionsKingCantMove = []; // Posiitions that king cant move 
let positionsSameColorKing = []; // Positions that same color images cant move because the king can be checked
let kingIsChecked = false; // Check if king is ckecked

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
    protectKingByStanding(topKingPos, leftKingPos, kingColorCheck, true);

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
    // else if (!kingIsChecked && positionsKingCantMove.length > 3){
    //     canChooseNewPiece = false; // Checkmate cant choose a figure
    //     checkKingText.textContent = `Draw!`
    // }
    console.log("Checkmate ", kingIsCheckmate);
    console.log("King checked pos: ", positionsKingChecked);
    console.log("King cant move: ", positionsKingCantMove);
    console.log("Images with the same color cant move: ", positionsSameColorKing);
}


function checkCheckmate(){
    // Check if checkmate
    if (kingIsCheckmate === 0){
        canChooseNewPiece = false; // Checkmate cant choose a figure
        //alert("Checkmate! " + (currentColorArray === whiteFigures? "Black wins" : "White wins"));
        checkKingText.textContent = `Checkmate! ${(currentColorArray === whiteFigures? "Black" : "White")} wins`
    }
    
}