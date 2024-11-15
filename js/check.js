let positionsKingChecked = []; // Positions to protect the king 
let positionsKingCantMove = []; // Posiitions that king cant move 
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

    console.log("King checked pos: ", positionsKingChecked)
    console.log("King cant move: ", positionsKingCantMove)
    console.log(kingColorCheck)
    console.log(`King left: ${leftKingPos}, top: ${topKingPos}`);
}


function pawnKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, checked){
    // Ckecks if the king is checked by pawn
    const pawnColor = kingColorCheck === 16 ? 1 : 11;
    if (kingColorCheck === 6){
        for (let i = -1; i <= 1; i += 2){
            const top = topKingPos + 1;
            const left = leftKingPos + i;
            if (top >= 0 && top < 8 && left >= 0 && left < 8){
                if(boardPosition[top][left] === pawnColor){
                    if (checked){
                        imgKing.style.opacity = 0.6;
                        imgKing.style.backgroundColor = "red";
                        checkKingText.textContent = `${(kingColorCheck === 6 ? "Black" : "White" )} king is checked`;
                        kingIsChecked = true; // Set the king is checked
                        positionsKingChecked.push([top, left]) // positions can other move to protect the king
                        imgKing.classList.remove("first-move"); // If it was checked cant change postions with rooks
                    }
                    else if (!checked){
                        positionsKingCantMove.push([topKingPos, leftKingPos]) // The king cant move here and not checked
                    }
                }
            }
        }
    }
    else if (kingColorCheck === 16){
        for (let i = -1; i <= 1; i += 2){
            const top = topKingPos - 1;
            const left = leftKingPos + i;
            if (top >= 0 && top < 8 && left >= 0 && left < 8){
                if(boardPosition[top][left] === pawnColor){
                    if (checked){
                        imgKing.style.opacity = 0.6;
                        imgKing.style.backgroundColor = "red";
                        checkKingText.textContent = `${(kingColorCheck === 6 ? "Black" : "White" )} king is checked`;
                        kingIsChecked = true; // Set the king is checked
                        positionsKingChecked.push([top, left]) // positions can other move to protect the king
                        imgKing.classList.remove("first-move"); // If it was checked cant change postions with rooks
                        
                    }
                    else if (!checked){
                        positionsKingCantMove.push([topKingPos, leftKingPos]) // The king cant move here and not checked
                    }
                }
            }
        }
    }
}

function checkOnBishopCheck(top, left, imgPositionTop, imgPositionLeft, color, imgKing, kingColorCheck, checked){
    let imgTop = imgPositionTop + 1 * top; // get left position (change it all iterations)
    let imgLeft = imgPositionLeft + 1 * left; // get right position (change it all iterations)
    let positionCanMoveToProtect = []; // Position can move to protect the king
    
    while(imgTop >= 0 && imgTop < 8 && imgTop >= 0 && imgLeft < 8){
        positionCanMoveToProtect.push([imgTop, imgLeft]) // positions can other move to protect the king
        if (boardPosition[imgTop][imgLeft] !== 0 && boardPosition[imgTop][imgLeft] !== color && boardPosition[imgTop][imgLeft] !== kingColorCheck){
            //console.log(`Empty king square left ${imgLeft} and top ${imgTop}` )
            break;
        }
        else if(boardPosition[imgTop][imgLeft] === color){
            if(checked){
                imgKing.style.opacity = 0.6;
                imgKing.style.backgroundColor = "red";
                checkKingText.textContent = `${(kingColorCheck === 6 ? "Black" : "White" )} king is checked`;
                kingIsChecked = true; // Set the king is checked
                imgKing.classList.remove("first-move"); // If it was checked cant change postions with rooks
            }else if(!checked){
                //positionsKingCantMove.push([imgPositionTop, imgPositionLeft]) // The king cant move here and is not checked
            }
            for (value of positionCanMoveToProtect){
                console.log(`Value ${value}`)
                positionsKingChecked.push(value);
                
            }
            break;
        }
        imgLeft = imgLeft + 1 * left;
        imgTop = imgTop + 1 * top;
    }
}

function bishopKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, checked){
    const bishopColor = kingColorCheck === 16 ? 3 : 13; // Bishop color based on the king checked
    const queenColor = kingColorCheck === 16 ? 5 : 15; // Queen color based on the king checked
    // Check diagonal circles up-left and down for bishop and queen
    for (let i = -1; i <= 1; i+=2){
        for (let j = -1; j <= 1; j +=2){
            checkOnBishopCheck(j, i, topKingPos, leftKingPos, bishopColor, imgKing, kingColorCheck, checked); // Bishop
            checkOnBishopCheck(j, i, topKingPos, leftKingPos, queenColor, imgKing, kingColorCheck, checked); // Queen
        }
    }
}




function knightKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, checked){
    // Check if king can be checked by knight
    for (let i = -2; i <= 2; i += 4){
        for (let j = -1; j <= 1; j += 2){
            const top = topKingPos + j;
            const left = leftKingPos + i;
            if (top >= 0 && top < 8 && left >= 0 && left < 8){
                checkOnKnightCheck(top, left, imgKing, kingColorCheck, checked, topKingPos, leftKingPos)
            }
        }
    }
    for (let i = -2; i <= 2; i += 4){
        for (let j = -1; j <= 1; j += 2){
            const top = topKingPos + i;
            const left = leftKingPos + j;
            if (top >= 0 && top < 8 && left >= 0 && left < 8){
                checkOnKnightCheck(top, left, imgKing, kingColorCheck, checked, topKingPos, leftKingPos)
            }
        }
    }
}

function checkOnKnightCheck(top, left, imgKing, kingColorCheck, checked, topKingPos, leftKingPos){
    const knightColor = kingColorCheck === 16 ? 2 : 12; // Knight color based on the king checked
    if (boardPosition[top][left] === knightColor){
        if(checked){
            imgKing.style.opacity = 0.6;
            imgKing.style.backgroundColor = "red";
            checkKingText.textContent = `${(kingColorCheck === 6 ? "Black" : "White" )} king is checked`;
            kingIsChecked = true; // Set the king is checked
            positionsKingChecked.push([top, left]) // positions can other move to protect the king
            imgKing.classList.remove("first-move"); // If it was checked cant change postions with rooks
        }else if(!checked){
            positionsKingChecked.push([topKingPos, leftKingPos]) // The king cant move here and is not checked
        }
    }
}