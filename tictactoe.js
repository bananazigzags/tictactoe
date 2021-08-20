const gameBoard = (() => {
    let grid = ["", "", "", 
                "", "", "", 
                "", "", ""];
    let player = 1;
    
    const board = document.querySelector("#board");
    const restart = document.querySelector("#restart");
    const restartGame = document.querySelector("#restart-game");
    const winnerDisplay = document.getElementById("winner-display");
    const winner = document.getElementById("winner");
    const nextRound = document.getElementById("next-round");
    nextRound.onclick = function () {
        winnerDisplay.classList.add("hide");
        gameBoard.board.addEventListener("click", gameBoard.boardListen);
    }
    
    restart.onclick = function() {
        clearBoard();
        clearGrid();
        render();
    }

    restartGame.onclick = function () {
        clearBoard();
        clearGrid();
        scoreDisplay(1, "Score: 0");
        scoreDisplay(2, "Score: 0");
        game.players[0].playerScore = 0;
        game.players[1].playerScore = 0;
        render();
    }

    const clearBoard = () => {
        board.textContent = "";
    }

    const clearGrid = () => {
        grid.forEach(function(element, index) {
            grid[index] = "";
        });
    }

    const render = () => {
        clearBoard();
        let index = 0;
        grid.forEach(element => {
            const square = document.createElement('div');
            square.className = "square";
            square.textContent = element;
            square.id = index;
            index++;
            board.appendChild(square);
        });        
    };

    const boardListen = (event) => {
        
        let element = event.target;

        if (element.className == "square") {
            if (element.textContent == "") {
                if (player == 1) {
                    element.textContent = "X";
                    grid[element.id] = "X";
                    player = 2;
                } else {
                    element.textContent = "O";
                    grid[element.id] = "O";
                    player = 1;
                }
            }

        }

        setTimeout(function () {
            if (checkWin(grid)) {
                gameBoard.board.removeEventListener("click", gameBoard.boardListen)
                
                if (checkWin(grid) == 'X') {
                    winner.textContent = `${game.players[0].name} won!`;
                    game.players[0].playerScore += 1;
                    scoreDisplay(1, `Score: ${game.players[0].playerScore}`);
                    player = 1;
                } else {
                    winner.textContent = `${game.players[1].name} won!`;
                    game.players[1].playerScore += 1;
                    scoreDisplay(2, `Score: ${game.players[1].playerScore}`);
                    player = 2;
                }
                winnerDisplay.classList.remove("hide");
                clearGrid();
                render();
            }

            if (checkTie(grid)) {
                gameBoard.board.removeEventListener("click", gameBoard.boardListen);
                winner.textContent = "It's a tie!";
                winnerDisplay.classList.remove("hide");

                clearGrid();
                render();
            }
        }, (100));
    }

    return { grid, render, board, boardListen }
})();

const game = (() => {
    gameBoard.render();

    const players = [];

    return { players };
})();

const scoreDisplay = (num, content) => {
    const score = document.getElementById(`score${num}`);
    score.textContent = content;
} 

const nameInput = (() => {
    const playerInput = document.getElementById("name-input");

    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");

    const addPlayer = (player) => {
        game.players.push(player);
    }

    const buttonSubmit = document.getElementById("submit");
    buttonSubmit.addEventListener('click', () => {
        if ((player1.value !== "") && (player2.value !== "")) {
            addPlayer(playerFactory(player1.value));
            addPlayer(playerFactory(player2.value));
            const player1display = document.getElementById("player1-display");
            const player2display = document.getElementById("player2-display");
            player1display.textContent = `Player 1: ${player1.value}`;
            player2display.textContent = `Player 2: ${player2.value}`;
            scoreDisplay(1, "Score: 0");
            scoreDisplay(2, "Score: 0");

            playerInput.classList.add("hide");
            gameBoard.board.addEventListener("click", gameBoard.boardListen);
        }
    });

})();

const playerFactory = (name) => {
    let playerScore = 0;
    return { name, playerScore };
}


const checkWin = (board) => {
    const arrCheck = board.map(element => {
        if (element == "X") {
            return 1;
        } else if (element == "O") {
            return -1;
        } else return 0;
    });

    /* combos for winning

123, 456, 789 - rows - 012, 345, 678
147, 258, 369 - cols - 036, 147, 258
159, 357 - diagonals - 048, 246

*/

    if ((arrCheck[0] + arrCheck[1] + arrCheck[2] == 3) ||
        (arrCheck[3] + arrCheck[4] + arrCheck[5] == 3) ||
        (arrCheck[6] + arrCheck[7] + arrCheck[8] == 3) ||
        (arrCheck[0] + arrCheck[3] + arrCheck[6] == 3) ||
        (arrCheck[1] + arrCheck[4] + arrCheck[7] == 3) ||
        (arrCheck[2] + arrCheck[5] + arrCheck[8] == 3) ||
        (arrCheck[0] + arrCheck[4] + arrCheck[8] == 3) ||
        (arrCheck[2] + arrCheck[4] + arrCheck[6] == 3)) {
        return "X";
    }
    else if ((arrCheck[0] + arrCheck[1] + arrCheck[2] == -3) ||
        (arrCheck[3] + arrCheck[4] + arrCheck[5] == -3) ||
        (arrCheck[6] + arrCheck[7] + arrCheck[8] == -3) ||
        (arrCheck[0] + arrCheck[3] + arrCheck[6] == -3) ||
        (arrCheck[1] + arrCheck[4] + arrCheck[7] == -3) ||
        (arrCheck[2] + arrCheck[5] + arrCheck[8] == -3) ||
        (arrCheck[0] + arrCheck[4] + arrCheck[8] == -3) ||
        (arrCheck[2] + arrCheck[4] + arrCheck[6] == -3)) {
        return "O";
    }
    else return false;
}

const checkTie = (board) => {
    if (!board.some(element => element == "")) {
        if (!checkWin(board)) {
            return true;
        }
    }
    return false;
}