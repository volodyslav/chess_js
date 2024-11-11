let positionsKingChecked = []; // Positions to protect the king and king cant move
let kingIsChecked = false; // Check if king is ckecked


function checkColorCheck(){
    
    positionsKingChecked = []; // Positions to protect the king and king cant move (clear)
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
    rookKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck); // By rook and queen
    bishopKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck); // By bishop and queen
    pawnKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck)

    console.log("King checked pos: ", positionsKingChecked)
    console.log(kingColorCheck)
    console.log(`King left: ${leftKingPos}, top: ${topKingPos}`);
}


function pawnKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck){
    // Ckecks if the king is checked by pawn
    const pawnColor = kingColorCheck === 1 ? 1 : 11;
    if (kingColorCheck === 0){
        for (let i = -1; i <= 1; i += 2){
            const top = topKingPos + 1;
            const left = leftKingPos + i;
            if (top >= 0 && top < 8 && left >= 0 && left < 8){
                if(boardPosition[top][left] === pawnColor){
                    imgKing.classList.add("red");
                    checkKingText.textContent = `${(kingColorCheck === 0 ? "Black" : "White" )} king is checked`;
                    positionsKingChecked.push([top, left]) // positions can other move to protect the king
                    kingIsChecked = true; // Set the king is checked
                    break;
                }
            }
        }
    }
    else if (kingColorCheck === 1){
        for (let i = -1; i <= 1; i += 2){
            const top = topKingPos - 1;
            const left = leftKingPos + i;
            if (top >= 0 && top < 8 && left >= 0 && left < 8){
                if(boardPosition[top][left] === pawnColor){
                    imgKing.classList.add("red");
                    checkKingText.textContent = `${(kingColorCheck === 0 ? "Black" : "White" )} king is checked`;
                    positionsKingChecked.push([top, left]) // positions can other move to protect the king
                    kingIsChecked = true; // Set the king is checked
                    break;
                }
            }
        }
    }
}

function checkOnBishopCheck(top, left, imgPositionTop, imgPositionLeft, color, imgKing, kingColorCheck){
    let imgTop = imgPositionTop + 1 * top; // get left position (change it all iterations)
    let imgLeft = imgPositionLeft + 1 * left; // get right position (change it all iterations)
    while(imgTop >= 0 && imgTop < 8 && imgTop >= 0 && imgLeft < 8){
        if (boardPosition[imgTop][imgLeft] !== 0 && boardPosition[imgTop][imgLeft] !== color){
            break;
        }
        else if(boardPosition[imgTop][imgLeft] === color){
            imgKing.classList.add("red");
            checkKingText.textContent = `${(kingColorCheck === 0 ? "Black" : "White" )} king is checked`;
            positionsKingChecked.push([imgTop, imgLeft]) // positions can other move to protect the king
            kingIsChecked = true; // Set the king is checked
            break;
        }
        imgLeft = imgLeft + 1 * left;
        imgTop = imgTop + 1 * top;
    }
}

function bishopKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck){
    const bishopColor = kingColorCheck === 1 ? 3 : 13; // Bishop color based on the king checked
    const queenColor = kingColorCheck === 1 ? 5 : 15; // Queen color based on the king checked
    // Check diagonal circles up-left and down for bishop and queen
    for (let i = -1; i <= 1; i+=2){
        for (let j = -1; j <= 1; j +=2){
            checkOnBishopCheck(j, i, topKingPos, leftKingPos, bishopColor, imgKing, kingColorCheck); // Bishop
            checkOnBishopCheck(j, i, topKingPos, leftKingPos, queenColor, imgKing, kingColorCheck); // Queen
        }
    }
}


function rookKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck){
    const rookColor = kingColorCheck === 1 ? 4 : 14; // Rook color based on the king checked
    const queenColor = kingColorCheck === 1 ? 5 : 15; // Queen color based on the king checked
    for (let i = -1; i <= 1; i+=2){
        checkOnRookXCheck(topKingPos, leftKingPos, i, imgKing, rookColor, kingColorCheck);
        checkOnRookYCheck(topKingPos, leftKingPos, i, imgKing, rookColor, kingColorCheck);
        // Check On X and Y Queen
        checkOnRookXCheck(topKingPos, leftKingPos, i, imgKing, queenColor, kingColorCheck);
        checkOnRookYCheck(topKingPos, leftKingPos, i, imgKing, queenColor, kingColorCheck);
    }
}

function checkOnRookXCheck(top, left, i, imgKing, color, kingColorCheck){
    if (i === -1){
        for (let j = left + i; j >= 0; j--){
            if(boardPosition[top][j] !== 0 && boardPosition[top][j] !== color){
                break;
            }
            else if(boardPosition[top][j] === color){
                imgKing.classList.add("red");
                checkKingText.textContent = `${(kingColorCheck === 0 ? "Black" : "White" )} king is checked`;
                positionsKingChecked.push([top, j]) // positions can other move to protect the king
                kingIsChecked = true; // Set the king is checked
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
                checkKingText.textContent = `${(kingColorCheck === 0 ? "Black" : "White" )} king is checked`;
                positionsKingChecked.push([top, j]) // positions can other move to protect the king
                kingIsChecked = true; // Set the king is checked
                break;
            }
        }
    }
}

function checkOnRookYCheck(top, left, i, imgKing, color, kingColorCheck){
    if (i === -1){
        for (let j = top + i; j >= 0; j--){
            if(boardPosition[j][left] !== 0 && boardPosition[j][left] !== color){
                break;
            }
            else if(boardPosition[j][left] === color){
                imgKing.classList.add("red");
                checkKingText.textContent = `${(kingColorCheck === 0 ? "Black" : "White" )} king is checked`;
                positionsKingChecked.push([j, left]) // positions can other move to protect the king
                kingIsChecked = true; // Set the king is checked
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
                checkKingText.textContent = `${(kingColorCheck === 0 ? "Black" : "White" )} king is checked`;
                positionsKingChecked.push([j, left]) // positions can other move to protect the king
                kingIsChecked = true; // Set the king is checked
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
            checkKingText.textContent = `${(kingColorCheck === 0 ? "Black" : "White" )} king is checked`;
            positionsKingChecked.push([top, left]) // positions can other move to protect the king
            kingIsChecked = true; // Set the king is checked
        }
    }
}