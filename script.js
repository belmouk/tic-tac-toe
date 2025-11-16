const Board = (function() {
    let boardTable = [
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0], 
    ];

    const getState = () => {return boardTable};
    const clear = () => {boardTable = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]};
    const placeMove = (move) => {
        ({mark, position} = move);

        if (boardTable[position.row][position.column] == 0) {
            boardTable[position.row][position.column] = mark;
            return true;
        } else {
            return false;
        }
    };

    return {getState, clear, placeMove};
}) ();

const createPlayer = (name, mark) => {
    const playMove = (row, column) => {return {mark, position: {row, column}}};

    return {name, mark, playMove}
};



const Game = (function() {
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

    const checkEnd = () => {
        const board = Board.getState();
        if (checkRows(board) || checkColumns(board) || checkDiagonals(board)) {
            return true;
        } else {
            return false;
        }
    };
    const playCurrentTurn = (player) => {
        console.log(`${player.name}, it's your turn. choose a move.`);
        alert(`${player.name}, it's your turn. choose a move.`);
        const row = parseInt(prompt("Choose row"));
        const column = parseInt(prompt("Choose column"));

        const move = player.playMove(row, column);
        return Board.placeMove(move);
    };
    
    const moveToNextTurn = (turn) => {
        if (turn) {
            players = [players[1], players[0]];
        } else {
            console.log(`${players[0].name} Choose another square`);
            alert(`${players[0].name} Choose another square`);
        };
    };

    return {playCurrentTurn, moveToNextTurn, checkEnd}
})();


const player1 = createPlayer("A", 1);
const player2 = createPlayer("B", -1);

let players = [player1, player2];

while (!Game.checkEnd()) {
    const turn = Game.playCurrentTurn(players[0]);
    Game.moveToNextTurn(turn);
    console.table(Board.getState())
};
Board.clear();
console.log(`Nice game. ${players[1].name} wins`);


