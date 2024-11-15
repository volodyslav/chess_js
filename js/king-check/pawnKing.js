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
                        kingChecked(imgKing, checkKingText, kingIsChecked, kingColorCheck);
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
                        kingChecked(imgKing, checkKingText, kingIsChecked, kingColorCheck);
                    }
                    else if (!checked){
                        positionsKingCantMove.push([topKingPos, leftKingPos]) // The king cant move here and not checked
                    }
                }
            }
        }
    }
}