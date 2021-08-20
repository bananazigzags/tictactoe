const gameBoard = (() => {
    let grid = ["", "", "", 
                "", "", "", 
                "", "", ""];
    let player = 1;
    
    const board = document.querySelector("#board");
    const button = document.querySelector("button");
    button.onclick = function() {
        clearBoard();
        clearGrid();
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

        board.onclick = function (event) {
            let element = event.target;
            if (element.className == "square") {
                if (element.textContent == "") {
                    if (player == 1) {
                        element.textContent = "X";
                        grid[element.id] = "X";
                    } else {
                        element.textContent = "O";
                        grid[element.id] = "O";
                    }
                }
                
            }

        setTimeout(function () {
            if (checkWin(grid)) {
                alert(`${checkWin(grid)} won!`);
                if (checkWin(grid) == 'X') {
                    game.players[0].playerScore += 1;
                    player = 1;
                } else {
                    game.players[1].playerScore += 1;
                    player = 2;
                }
                clearGrid();
                render();
            }

            if (checkTie(grid)) {
                alert("It's a tie!");
                clearGrid();
                render();
            }
        }, (100));
        
            
        if (player == 1) {
            player = 2;
        } else player = 1;
        }
    };
    return { grid, render }
})();

const game = (() => {
    gameBoard.render();

    const players = [];

    return { players };
})();

const nameInput = (() => {
    const playerInput = document.getElementById("name-input");

    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");

    const addPlayer = (player) => {
        game.players.push(player);
    }

    const buttonSubmit = document.getElementById("submit");
    buttonSubmit.addEventListener('click', () => {
        if (player1.value !== "" && player2.value !== "") {
            addPlayer(playerFactory(player1.value));
            addPlayer(playerFactory(player2.value));
        }
       
        playerInput.classList.add("hide");
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