const Board = (function() {
    let boardTable = [
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0], 
    ];

    const getState = () => {return boardTable};
    const clear = () => {boardTable = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]};
    const placeMove = (move) => {
        const {mark, position} = move;

        if (boardTable[position.row][position.column] == 0) {
            boardTable[position.row][position.column] = mark;
            return true;
        } else {
            return false;
        }
    };

    return {getState, clear, placeMove};
}) ();

const createPlayer = (name, mark, visualMark) => {
    const playMove = (row, column) => {return {mark, position: {row, column}}};

    return {name, mark, playMove, visualMark}
};

const Game = (function() {
    const checkRows = (board) => {
        let rowScores = [];
        board.forEach(row => {
            const score = row.reduce((sum, cell) => {return sum + cell});
            rowScores.push(score);
        });

        if (rowScores.filter(score => score === 3).length === 1) {
            return player1;
        } else if (rowScores.filter(score => score === -3).length === 1) {
            return player2;
        } else {
            return false;
        };
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
            return player1;
        } else if (columnScores.filter(score => score === -3).length === 1) {
            return player2;
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
            return player1;
        } else if (diagonalScores.filter(score => score === -3).length === 1) {
            return player2;
        } else {
            return false;
        };
    };

    const checkDraw = (board) => {
        for (let i = 0; i < 3; i++) {
            for  (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {return false}
            }
        }
        return true
    };

    const checkWin = (board) => {
        return (checkRows(board) || checkColumns(board) || checkDiagonals(board)) 
        //     return true;
        // } else {
        //     return false;
        // }
    };

    const checkEnd = () => {
        const board = Board.getState();
        if ( checkWin(board) || checkDraw(board)) {
            return true;
        } else {
            return false;
        }
    };

    const playCurrentTurn = (player, row, column) => {
        const move = player.playMove(row, column);
        return Board.placeMove(move);
    };
    
    const moveToNextTurn = (turn) => {
        if (turn) {
            players = [players[1], players[0]];
        } else {
            console.log(`${players[0].name} Choose another square`);
        };
    };

    const getWinner = (board) => {
        winner = checkWin(board);
        draw = checkDraw(board)
        if (winner) {
            return `${winner.name} has won the game!`;
        } else if (draw) {
            return "It's a draw. Play again!";
        };
    }

    return {playCurrentTurn, moveToNextTurn, checkEnd, getWinner};
})();

//DOM manipulation

const boardEl = document.querySelector("main #board");
const updateEl = document.querySelector("main #game-update");
const restartButton = document.querySelector("main #restart-button")

const xMark = `<svg width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
  <!-- Puffy cartoon X -->
  <rect x="20" y="58" width="100" height="24" rx="12" ry="12"
        fill="#333" transform="rotate(45 70 70)" />
  <rect x="20" y="58" width="100" height="24" rx="12" ry="12"
        fill="#333" transform="rotate(-45 70 70)" />
</svg>`;

const oMark = `<svg width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
  <circle cx="70" cy="70" r="48" fill="none" stroke="#333" stroke-width="24" />
</svg>
`;


const player1 = createPlayer("A", 1, xMark);
const player2 = createPlayer("B", -1, oMark);

let players = [player1, player2];

const displayTurn = (e) => {
    squareEl = e.target.closest("div");
    const row = parseInt(squareEl.dataset.row);
    const column = parseInt(squareEl.dataset.column);
    if (!Game.checkEnd()) {
        const turn = Game.playCurrentTurn(players[0], row, column);
        if (turn) {squareEl.innerHTML = players[0].visualMark;}
        Game.moveToNextTurn(turn);
    }

    if (Game.checkEnd()) {updateEl.textContent = Game.getWinner(Board.getState())};
}

const restartGame = () => {
    Board.clear();
    squaresEl = Array.from(boardEl.children)
    squaresEl.forEach(child => {child.innerHTML = ""});
    updateEl.innerHTML = "";
}

boardEl.addEventListener("click", displayTurn);
restartButton.addEventListener("click", restartGame);
