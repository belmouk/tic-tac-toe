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
    
}) ()