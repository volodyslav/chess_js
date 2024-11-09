function checkColorCheck(){

    const kingColorCheck = currentColorArray === whiteFigures ? 1 : 0; // 0 - black king color; 1 - white king color
    let imgKing; // King image
    
    if (kingColorCheck === 0){
        imgKing = document.querySelector(".black-king");
    }else{
        imgKing = document.querySelector(".white-king");
    }
    
    const leftKingPos = parseInt(imgKing.style.left) / squareWidth;
    const topKingPos = parseInt(imgKing.style.top) / squareHeight; // top-left positions  on the board
    // Check if king can be checked
    knightKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck); // By knight
    rookKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck); 
    
    console.log(kingColorCheck)
    console.log(`King left: ${leftKingPos}, top: ${topKingPos}`);
}


function rookKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck){
    const rookColor = kingColorCheck === 1 ? 4 : 14; // Rook color based on the king checked
    const queenColor = kingColorCheck === 1 ? 5 : 15; // Queen color based on the king checked
    for (let i = -1; i <= 1; i+=2){
        checkOnRookXCheck(topKingPos, leftKingPos, i, imgKing, rookColor);
        checkOnRookYCheck(topKingPos, leftKingPos, i, imgKing, rookColor);
        // Check On X and Y Queen
        checkOnRookXCheck(topKingPos, leftKingPos, i, imgKing, queenColor);
        checkOnRookYCheck(topKingPos, leftKingPos, i, imgKing, queenColor);
    }
}

function checkOnRookXCheck(top, left, i, imgKing, color){
    if (i === -1){
        for (let j = left + i; j >= 0; j--){
            if(boardPosition[top][j] !== 0 && boardPosition[top][j] !== color){
                break;
            }
            else if(boardPosition[top][j] === color){
                imgKing.classList.add("red");
                break;
            }
        }
    }
    else if (i === 1){
        for (let j = left + i; j < 8; j++){
            if(boardPosition[top][j] !== 0 && boardPosition[top][j] !== color){
                break;
            }
            else if(boardPosition[top][j] === color){
                imgKing.classList.add("red");
                break;
            }
        }
    }
}

function checkOnRookYCheck(top, left, i, imgKing, color){
    if (i === -1){
        for (let j = top + i; j >= 0; j--){
            if(boardPosition[j][left] !== 0 && boardPosition[j][left] !== color){
                break;
            }
            else if(boardPosition[j][left] === color){
                imgKing.classList.add("red");
                break;
            }
        }
    }
    else if (i === 1){
        for (let j = top + i; j < 8; j++){
            if(boardPosition[j][left] !== 0 && boardPosition[j][left] !== color){
                break;
            }
            else if(boardPosition[j][left] === color){
                imgKing.classList.add("red");
                break;
            }
        }
    }
}



function knightKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck){
    // Check if king can be checked by knight
    for (let i = -2; i <= 2; i += 4){
        for (let j = -1; j <= 1; j += 2){
            checkOnKnightCheck(topKingPos + i, leftKingPos + j, imgKing, kingColorCheck)
        }
    }
    for (let i = -2; i <= 2; i += 4){
        for (let j = -1; j <= 1; j += 2){
            checkOnKnightCheck(topKingPos + j, leftKingPos + i, imgKing, kingColorCheck)
        }
    }
}

function checkOnKnightCheck(top, left, imgKing, kingColorCheck){
    const knightColor = kingColorCheck === 1 ? 2 : 12; // Knight color based on the king checked
    if (top >= 0 && top < 8 && left >= 0 && left < 8){
        if (boardPosition[top][left] === knightColor){
            imgKing.classList.add("red");
        }
    }
}