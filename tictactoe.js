const board = document.querySelector("#board");

const gameBoard = (() => {
    const gameBoard = ["X", "O", "O", "O", "X", "O", "", "", "X"];

    const render = () => {
        gameBoard.forEach(element => {
            const square = document.createElement('div');
            square.className = "square";
            square.textContent = element;
            board.appendChild(square);
        });
    };

    return { gameBoard, render};
})();

gameBoard.render();

const playerFactory = (name) => {
    const sayName = () => alert(name);
    const playerScore = 0;
    const returnScore = () => playerScore;
    return { name, playerScore, sayName, returnScore };
}
