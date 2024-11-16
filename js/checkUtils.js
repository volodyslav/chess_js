function kingChecked(imgKing, checkKingText, kingColorCheck){
    // Show a red circle around the king
    imgKing.style.opacity = 0.6;
    imgKing.style.backgroundColor = "red";
    checkKingText.textContent = `${(kingColorCheck === 6 ? "Black" : "White" )} king is checked`;
    kingIsChecked = true; // Set the king is checked
    imgKing.classList.remove("first-move"); // If
}