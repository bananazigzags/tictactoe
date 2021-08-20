const gameBoard = (() => {
    let grid = ["", "", "", 
                "", "", "", 
                "", "", ""];
    let player = 1;
    
    const board = document.querySelector("#board");

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
                if (player == 1) {
                    element.textContent = "X";
                    grid[element.id] = "X";
                } else {
                    element.textContent = "O";
                    grid[element.id] = "O";
                }
            }

        setTimeout(function () {
            if (checkWin(grid)) {
                alert(`${checkWin(grid)} won!`);
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
    const players = [];
    

})();

gameBoard.render();

const playerFactory = (name, num) => {
    let playerScore = 0;
    return { name, playerScore };
}

/* combos for winning 

123, 456, 789 - rows - 012, 345, 678
147, 258, 369 - cols - 036, 147, 258
159, 357 - diagonals - 048, 246                    

*/

const checkWin = (board) => {
    const arrCheck = board.map(element => {
        if (element == "X") {
            return 1;
        } else if (element == "O") {
            return -1;
        } else return 0;
    });

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