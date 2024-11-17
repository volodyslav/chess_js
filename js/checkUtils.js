function kingChecked(imgKing, checkKingText, kingColorCheck){
    // Show a red circle around the king
    imgKing.classList.add("check-king");
    checkKingText.textContent = `${(kingColorCheck === 6 ? "Black" : "White" )} king is checked`;
    kingIsChecked = true; // Set the king is checked
    imgKing.classList.remove("first-move"); // If
}