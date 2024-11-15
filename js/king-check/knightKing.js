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
            kingChecked(imgKing, checkKingText, kingIsChecked, kingColorCheck);
            positionsKingChecked.push([top, left]) // positions can other move to protect the king
        }else if(!checked){
            positionsKingCantMove.push([topKingPos, leftKingPos]) // The king cant move here and is not checked
        }
    }
}