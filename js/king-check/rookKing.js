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
        let countSameColor = 0; // Count of the same color image (opposite to the king)
        for (let j = left + i; j >= 0; j--){
            positionCanMoveToProtect.push([top, j]) // positions can other move to protect the king
            if(boardPosition[top][j] !== 0 && sameColorKing.includes(boardPosition[top][j]) && boardPosition[top][j] !== kingColorCheck){
                break;
            }
            else if(boardPosition[top][j] !== 0 && boardPosition[top][j] !== color && !sameColorKing.includes(boardPosition[top][j])){ // King cant move to beat
                countSameColor++; // count the same color image
            }
            else if(boardPosition[top][j] === color){
                if(checked && countSameColor === 0){ // Only if the king is checked
                    kingChecked(imgKing, checkKingText, kingIsChecked, kingColorCheck); // it was checked cant change postions with rooks
                }else if(!checked && countSameColor < 1){
                    positionsKingCantMove.push([top, left]) // The king cant move here and is not checked
                    console.log(`-1 X t = ${top} l = ${left}`)
                }
                for (value of positionCanMoveToProtect){
                    //console.log(`Value ${value}`)
                    positionsKingChecked.push(value);
                }
                break;
            }
        }
    }
    else if (i === 1){
        let positionCanMoveToProtect = []; // Position can move to protect the king
        let countSameColor = 0; // Count of the same color image (opposite to the king)
        for (let j = left + i; j < 8; j++){
            positionCanMoveToProtect.push([top, j]) // positions can other move to protect the king
            if(boardPosition[top][j] !== 0 && sameColorKing.includes(boardPosition[top][j]) && boardPosition[top][j] !== kingColorCheck){
                break;
            }else if(boardPosition[top][j] !== 0 && boardPosition[top][j] !== color &&  !sameColorKing.includes(boardPosition[top][j])){ // King cant move to beat
                countSameColor++; // count the same color image
            }
            else if(boardPosition[top][j] === color){
                if (checked && countSameColor === 0){
                    kingChecked(imgKing, checkKingText, kingIsChecked, kingColorCheck);
                }else if(!checked && countSameColor < 1){
                    positionsKingCantMove.push([top, left]) // The king cant move here and is not checked
                    console.log(`1 t = ${top} l = ${left}`)
                }
                for (value of positionCanMoveToProtect){
                    //console.log(`Value ${value}`)
                    positionsKingChecked.push(value);
                }
                break;
            }
        }
    }
}

function checkOnRookYCheck(top, left, i, imgKing, color, kingColorCheck, checked){
    const sameColorKing = kingColorCheck === 6 ? blackFigures : whiteFigures; // array of the same color image the king 
    
    if (i === -1){
        let positionCanMoveToProtect = []; // Position can move to protect the king
        let countSameColor = 0; // Count of the same color image (opposite to the king)
        for (let j = top + i; j >= 0; j--){
            positionCanMoveToProtect.push([j, left]) // positions can other move to protect the king
            if(boardPosition[j][left] !== 0 && sameColorKing.includes(boardPosition[j][left]) && boardPosition[j][left] !== kingColorCheck){
                break;
            }else if(boardPosition[j][left] !== color && boardPosition[j][left] !== 0 && !sameColorKing.includes(boardPosition[j][left])){ // King cant move to beat
                countSameColor++; // count the same color image
            }
            else if(boardPosition[j][left] === color){
                if (checked && countSameColor === 0){
                    kingChecked(imgKing, checkKingText, kingIsChecked, kingColorCheck);
                }else if(!checked && countSameColor < 1) {
                    positionsKingCantMove.push([top, left]) // The king cant move here and is not checked
                    console.log(`-1 Y t = ${top} l = ${left}`)
                }
                for (value of positionCanMoveToProtect){
                    //console.log(`Value ${value}`)
                    positionsKingChecked.push(value);
                }
                break;
            }
        }
    }
    else if (i === 1){
        let positionCanMoveToProtect = []; // Position can move to protect the king
        let countSameColor = 0; // Count of the same color image (opposite to the king)
        for (let j = top + i; j < 8; j++){
            positionCanMoveToProtect.push([j, left]) // positions can other move to protect the king
            if(boardPosition[j][left] !== 0 && sameColorKing.includes(boardPosition[j][left]) && boardPosition[j][left] !== kingColorCheck){
                break;
            }else if(boardPosition[j][left] !== color &&  boardPosition[j][left] !== 0 && !sameColorKing.includes(boardPosition[j][left])){ // King cant move to beat
                countSameColor++; // count the same color image
            }
            else if(boardPosition[j][left] === color){
                if (checked && countSameColor === 0){
                    kingChecked(imgKing, checkKingText, kingIsChecked, kingColorCheck);
                }else if(!checked && countSameColor < 1){
                    positionsKingCantMove.push([top, left]) // The king cant move here and is not checked
                    console.log(`1 Y t = ${top} l = ${left}`)
                }
                for (value of positionCanMoveToProtect){
                    //console.log(`Value ${value}`)
                    positionsKingChecked.push(value);
                }
                break;
            }
        }
    }
}