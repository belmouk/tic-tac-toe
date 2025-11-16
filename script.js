const gameBoard = (function() {
    const board = [
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0], 
    ];

    const getBoardState = () => {return board};
    const clearBoard = () => {board = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]};
    const placeMove = (move) => {
        ({mark, position} = move);

        if (board[position.row][position.column] == 0) {
            board[position.row][position.column] = mark;
        };
    };

    return {getBoardState, clearBoard, placeMove};
}) ();

const createPlayer = (name, mark) => {
    const playMove = (row, column) => {return {mark, position: {row, column}}};

    return {name, mark, playMove}
};

const checkGameEnd = () => {
    const board = gameBoard.getBoardState();
    if (checkRows(board) || checkColumns(board) || checkDiagonals(board)) {
        return true;
    } else {
        return false;
    }
};

const checkRows = (board) => {
    let rowScores = [];
    board.forEach(row => {
        const score = row.reduce((sum, cell) => {return sum + cell});
        rowScores.push(score);
    });
    if (rowScores.filter(score => score === 3).length === 1) {
        return true;
    } else {
        return false;
    }
};

const checkColumns = (board) => {
    let columnScores = [];
    for (let j = 0; j < 3; j++) {
        let score = 0;
        for (let i = 0; i < 3; i++) {
            score += board[i][j];
        }
        columnScores.push(score);
    };
    if (columnScores.filter(score => score === 3).length === 1) {
        return true;
    } else {
        return false;
    };
};

const checkDiagonals = (board) => {
    let diagonal1score = 0;
    let diagonal2score = 0;
    for (let i = 0; i < 3; i++) {
        diagonal1score += board[i][i];
        diagonal2score += board[i].at(-i-1);
    };
    const diagonalScores = [diagonal1score, diagonal2score];
    if (diagonalScores.filter(score => score === 3).length === 1) {
        return true;
    } else {
        return false;
    };
};





player1 = createPlayer("A", 1);
player2 = createPlayer("B", -1);