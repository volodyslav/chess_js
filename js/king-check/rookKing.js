function rookKingCheck(topKingPos, leftKingPos, imgKing, kingColorCheck, checked){
    const rookColor = kingColorCheck === 16 ? 4 : 14; // Rook color based on the king checked
    const queenColor = kingColorCheck === 16 ? 5 : 15; // Queen color based on the king checked
    for (let i = -1; i <= 1; i+=2){
        checkOnRookXCheck(topKingPos, leftKingPos, i, imgKing, rookColor, kingColorCheck, checked);
        checkOnRookYCheck(topKingPos, leftKingPos, i, imgKing, rookColor, kingColorCheck, checked);
        // Check On X and Y Queen
        checkOnRookXCheck(topKingPos, leftKingPos, i, imgKing, queenColor, kingColorCheck, checked);
        checkOnRookYCheck(topKingPos, leftKingPos, i, imgKing, queenColor, kingColorCheck, checked);
    }
}

function checkOnRookXCheck(top, left, i, imgKing, color, kingColorCheck, checked){
    const sameColorKing = kingColorCheck === 6 ? blackFigures : whiteFigures; // array of the same color image the king 
    if (i === -1){
        let positionCanMoveToProtect = []; // Position can move to protect the king
        for (let j = left + i; j >= 0; j--){
            if(boardPosition[top][j] !== 0 && sameColorKing.includes(boardPosition[top][j]) && boardPosition[top][j] !== kingColorCheck){
                break;
            }
            else if(boardPosition[top][j] !== 0 && boardPosition[top][j] !== color && !sameColorKing.includes(boardPosition[top][j])){ // King cant move to beat
                break;
            }
            else if(boardPosition[top][j] === color){
                if(checked){ // Only if the king is checked
                    positionCanMoveToProtect.push([top, j]) // positions can other move to protect the king
                    kingChecked(imgKing, checkKingText, kingColorCheck); // it was checked cant change postions with rooks
                }else if(!checked){
                    positionsKingCantMove.push([top, left]) // The king cant move here and is not checked
                }
                for (value of positionCanMoveToProtect){
                    positionsKingChecked.push(value);
                }
                break;
            }
            positionCanMoveToProtect.push([top, j]) // positions can other move to protect the king
        }
    }
    else if (i === 1){
        let positionCanMoveToProtect = []; // Position can move to protect the king
        for (let j = left + i; j < 8; j++){
            if(boardPosition[top][j] !== 0 && sameColorKing.includes(boardPosition[top][j]) && boardPosition[top][j] !== kingColorCheck){
                break;
            }else if(boardPosition[top][j] !== 0 && boardPosition[top][j] !== color &&  !sameColorKing.includes(boardPosition[top][j])){ // King cant move to beat
                break;
            }
            else if(boardPosition[top][j] === color){
                if (checked){
                    positionCanMoveToProtect.push([top, j]) // positions can other move to protect the king
                    kingChecked(imgKing, checkKingText, kingColorCheck);
                }else if(!checked){
                    positionsKingCantMove.push([top, left]) // The king cant move here and is not checked
                }
                for (value of positionCanMoveToProtect){
                    positionsKingChecked.push(value);
                }
                break;
            }
            positionCanMoveToProtect.push([top, j]) // positions can other move to protect the king
        }
    }
}

function checkOnRookYCheck(top, left, i, imgKing, color, kingColorCheck, checked){
    const sameColorKing = kingColorCheck === 6 ? blackFigures : whiteFigures; // array of the same color image the king 
    
    if (i === -1){
        let positionCanMoveToProtect = []; // Position can move to protect the king
        for (let j = top + i; j >= 0; j--){
            if(boardPosition[j][left] !== 0 && sameColorKing.includes(boardPosition[j][left]) && boardPosition[j][left] !== kingColorCheck){
                break;
            }else if(boardPosition[j][left] !== color && boardPosition[j][left] !== 0 && !sameColorKing.includes(boardPosition[j][left])){ // King cant move to beat
                break;
            }
            else if(boardPosition[j][left] === color){
                if (checked){
                    positionCanMoveToProtect.push([j, left]) // positions can other move to protect the king
                    kingChecked(imgKing, checkKingText, kingColorCheck);
                }else if(!checked) {
                    positionsKingCantMove.push([top, left]) // The king cant move here and is not checked
                }
                for (value of positionCanMoveToProtect){
                    positionsKingChecked.push(value);
                }
                break;
            }
            positionCanMoveToProtect.push([j, left]) // positions can other move to protect the king
        }
    }
    else if (i === 1){
        let positionCanMoveToProtect = []; // Position can move to protect the king
        for (let j = top + i; j < 8; j++){
            if(boardPosition[j][left] !== 0 && sameColorKing.includes(boardPosition[j][left]) && boardPosition[j][left] !== kingColorCheck){
                break;
            }else if(boardPosition[j][left] !== color &&  boardPosition[j][left] !== 0 && !sameColorKing.includes(boardPosition[j][left])){ // King cant move to beat
                break;
            }
            else if(boardPosition[j][left] === color){
                if (checked){
                    kingChecked(imgKing, checkKingText, kingColorCheck);
                    positionCanMoveToProtect.push([j, left]) // positions can other move to protect the king
                }else if(!checked){
                    positionsKingCantMove.push([top, left]) // The king cant move here and is not checked
                }
                for (value of positionCanMoveToProtect){
                    positionsKingChecked.push(value);
                }
                break;
            }
            positionCanMoveToProtect.push([j, left]) // positions can other move to protect the king
        }
    }
}