function kingChecked(imgKing, checkKingText, kingColorCheck){
    // Show a red circle around the king
    imgKing.classList.add("check-king");
    checkKingText.textContent = `${(kingColorCheck === 6 ? "Black" : "White" )} king is checked`;
    kingIsChecked = true; // Set the king is checked
    imgKing.classList.remove("first-move"); // If
}

function protectKingByStanding(top, left, kingColorCheck, king=false){
    rookKingSameColor(top, left, kingColorCheck, king);
}


function rookKingSameColor(topPos, leftPos, kingColorCheck, king){
    const rookColor = kingColorCheck === 16 ? 4 : 14; // Rook color based on the king checked
    const queenColor = kingColorCheck === 16 ? 5 : 15; // Queen color based on the king checked
    for (let i = -1; i <= 1; i+=2){
        checkOnRookXSameColor(topPos, leftPos, i, rookColor, kingColorCheck, king);
        checkOnRookYSameColor(topPos, leftPos, i, rookColor, kingColorCheck, king);
        // Check On X and Y Queen
        checkOnRookXSameColor(topPos, leftPos, i, queenColor, kingColorCheck, king);
        checkOnRookYSameColor(topPos, leftPos, i, queenColor, kingColorCheck, king);
    }
}

function checkOnRookXSameColor(top, left, i, color, kingColorCheck, king){
    const sameColorKing = kingColorCheck === 6 ? blackFigures : whiteFigures; // array of the same color image the king 
    console.log(top, left)
    if (i === -1){
        for (let j = left + i; j >= 0; j--){
            if (j >= 0 && j < 8 && top >= 0 && top < 8){
                if(boardPosition[top][j] === 0){
                    continue;
                }else if(boardPosition[top][j] !== color && sameColorKing.includes(boardPosition[top][j]) && king === true){
                    protectKingByStanding(top, j, kingColorCheck, false)
                    break;
                }
                else if(boardPosition[top][j] === color){
                    positionsSameColorKing.push([top, left]); // add the same color cant move
                    break;
                }else if(boardPosition[top][j] !== color && boardPosition[top][j] > 0){
                    break;
                }
                else{
                    break;
                }
            }
        }
    }
    else if (i === 1){
        for (let j = left + i; j < 8; j++){
            if (j >= 0 && j < 8 && top >= 0 && top < 8){
                if(boardPosition[top][j] === 0){
                    continue;
                }else if(boardPosition[top][j] !== color && sameColorKing.includes(boardPosition[top][j]) && king === true){
                    protectKingByStanding(top, j, kingColorCheck, false)
                    break;
                }
                else if(boardPosition[top][j] === color){
                    positionsSameColorKing.push([top, left]); // add the same color cant move
                    break;
                }else if(boardPosition[top][j] !== color && boardPosition[top][j] > 0){
                    break;
                }
                else{
                    break;
                }
            }
        }
    }
}

function checkOnRookYSameColor(top, left, i, color, kingColorCheck, king){
    const sameColorKing = kingColorCheck === 6 ? blackFigures : whiteFigures; // array of the same color image the king 
    if (i === -1){
        for (let j = top + i; j >= 0; j--){
            if (j >= 0 && j < 8 && left >= 0 && left < 8){
                if(boardPosition[j][left] === 0){
                    continue;
                }else if(boardPosition[j][left] !== color && sameColorKing.includes(boardPosition[j][left]) && king === true){
                    protectKingByStanding(j, left, kingColorCheck, false)
                    break;
                }
                else if(boardPosition[j][left] === color){
                    positionsSameColorKing.push([top, left]); // add the same color cant move
                    break;
                }else if(boardPosition[j][left] !== color && boardPosition[j][left] > 0){
                    break;
                }
                else{
                    break;
                }
            }
        }
    }
    else if (i === 1){
        for (let j = top + i; j < 8; j++){
            if (j >= 0 && j < 8 && left >= 0 && left < 8){
                if(boardPosition[j][left] === 0){
                    continue;
                }else if(boardPosition[j][left] !== color && sameColorKing.includes(boardPosition[j][left]) && king === true){
                    protectKingByStanding(j, left, kingColorCheck, false)
                    break;
                }
                else if(boardPosition[j][left] === color){
                    positionsSameColorKing.push([top, left]); // add the same color cant move
                    break;
                }else if(boardPosition[j][left] !== color && boardPosition[j][left] > 0){
                    break;
                }
                else{
                    break;
                }
            }
        }
    }
}

function bishopKingSameColor(topPos, leftPos, kingColorCheck){
    const bishopColor = kingColorCheck === 16 ? 3 : 13; // Bishop color based on the king checked
    const queenColor = kingColorCheck === 16 ? 5 : 15; // Queen color based on the king checked
    // Check diagonal circles up-left and down for bishop and queen
    for (let i = -1; i <= 1; i+=2){
        for (let j = -1; j <= 1; j +=2){
            checkOnBishopCheck(j, i, topPos, leftPos, bishopColor, kingColorCheck); // Bishop
            checkOnBishopCheck(j, i, topPos, leftPos, queenColor, kingColorCheck); // Queen
        }
    }
}

function checkOnBishopCheck(top, left, imgPositionTop, imgPositionLeft, color, kingColorCheck){
    let imgTop = imgPositionTop + 1 * top; // get left position (change it all iterations)
    let imgLeft = imgPositionLeft + 1 * left; // get right position (change it all iterations)
    const sameColorKing = kingColorCheck === 6 ? blackFigures : whiteFigures; // array of the same color image the king 
    while(imgTop >= 0 && imgTop < 8 && imgTop >= 0 && imgLeft < 8){
        if (boardPosition[imgTop][imgLeft] !== 0 && sameColorKing.includes(boardPosition[imgTop][imgLeft]) && boardPosition[imgTop][imgLeft] !== color && boardPosition[imgTop][imgLeft] !== kingColorCheck){
            break;
        }
        else if (boardPosition[imgTop][imgLeft] !== 0 && !sameColorKing.includes(boardPosition[imgTop][imgLeft]) && boardPosition[imgTop][imgLeft] !== color && boardPosition[imgTop][imgLeft] !== kingColorCheck){ // Same color with the rook or queen
            break;
        }
        else if(boardPosition[imgTop][imgLeft] === color){
            positionsSameColorKing.push([imgPositionTop, imgPositionLeft]); // add the same color cant move
            break;
        }
        imgLeft = imgLeft + 1 * left;
        imgTop = imgTop + 1 * top;
    }
}

