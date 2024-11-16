// Movements setting
let currentColorArray = whiteFigures;

// Initial figures' position on the board
// Black figures: 1 - pawn, 2 - knight, 3 - bishop, 4 - rook, 5 - queen, 6 - king; White figures: 11 - pawn, 12 - knight, 13 - bishop, 14 - rook, 15 - queen, 16 - king
let boardPosition = [
    [4, 2, 3, 5, 6, 3, 2, 4],
    Array.from({length: squareAmount}, () => 1),
    Array.from({length: squareAmount}, () => 0),
    Array.from({length: squareAmount}, () => 0),
    Array.from({length: squareAmount}, () => 0),
    Array.from({length: squareAmount}, () => 0),
    Array.from({length: squareAmount}, () => 11),
    [14, 12, 13, 16, 15, 13, 12, 14],
]