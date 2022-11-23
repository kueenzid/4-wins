function connect4Winner(color, board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == color) {
                if (checkHorizontal(color, board, i, j) || checkVertical(color, board, i, j) || checkDiagonal(color, board, i, j)) {
                    return true
                }
            }
        }
    }
    return false
}

function checkHorizontal(color, board, i, j) {
    for(k = j + 1; k < j + 4; k++) {
        if(board[i].length < j + 4) {
            return false
        }
        if(board[i][k] != color) {
            return false
        }
    }
    return true;
}

function checkVertical(color, board, i, j) {
    for(k = i + 1; k < i + 4; k++) {
        if(board.length < i + 4) {
            return false
        }
        if(board[k][j] != color) {
            return false
        }
    }
    return true
}

function checkDiagonal(color, board, i, j) {
    return checkDiagonalRight(color, board, i, j) || checkDiagonalLeft(color, board, i, j)
}

function checkDiagonalRight(color, board, i, j) {
    for(k = i + 1, l = j + 1; k < i + 4; k++, l++) {
        if(board.length < i + 4 || board[k].length < j + 4) {
            return false
        }
        if(board[k][l] != color) {
            return false
        }
    }
    return true
}

function checkDiagonalLeft(color, board, i, j) {
    for(k = i + 1, l = j - 1; k < i + 4; k++, l--) {
        if(board.length < i + 4 || 0 > j - 4) {
            return false
        }
        if(board[k][l] != color) {
            return false
        }
    }
    return true
}