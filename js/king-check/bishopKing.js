function checkOnBishopCheck(top, left, imgPositionTop, imgPositionLeft, color, imgKing, kingColorCheck, checked){
    let imgTop = imgPositionTop + 1 * top; // get left position (change it all iterations)
    let imgLeft = imgPositionLeft + 1 * left; // get right position (change it all iterations)
    let positionCanMoveToProtect = []; // Position can move to protect the king
    
    while(imgTop >= 0 && imgTop < 8 && imgTop >= 0 && imgLeft < 8){
        positionCanMoveToProtect.push([imgTop, imgLeft]) // positions can other move to protect the king
        if (boardPosition[imgTop][imgLeft] !== 0 && boardPosition[imgTop][imgLeft] !== color && boardPosition[imgTop][imgLeft] !== kingColorCheck){
            break;
        }
        else if(boardPosition[imgTop][imgLeft] === color){
            if(checked){
                kingChecked(imgKing, checkKingText, kingIsChecked, kingColorCheck);
            }else if(!checked){
                positionsKingCantMove.push([imgPositionTop, imgPositionLeft]) // The king cant move here and is not checked
            }
            for (value of positionCanMoveToProtect){
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