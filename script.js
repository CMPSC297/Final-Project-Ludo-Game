const gameBoard = document.querySelector("#gameboard");

const startCells = Array(225).join(".").split(".");

function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        gameBoard.append(cellElement);
    })
}

function addColor(cellIds, color) {
    cellIds.forEach(id => {
        const cellElement = document.getElementById(id);
        cellElement.style.backgroundColor = color;
    });
}

function addSafeSquare(cellIds) {
    cellIds.forEach(id => {
        const cellElement = document.getElementById(id);
        cellElement.classList.add("safe");
    });
}

function addPlayer(cellIds, color) {
    cellIds.forEach(id => {
        const player = document.createElement("div");
        player.classList.add("player");
        player.classList.add(color);
        player.id = color + id;
        const cellElement = document.getElementById(id);
        cellElement.append(player);
    });
}
//start game
function rollDice() {
    const dice = document.getElementById("dice");
    dice.addEventListener("click", () => {
        console.log("click");
        var randomNumber = Math.floor(Math.random() * 6) + 1; //1-6

        var randomDiceImage = "dice" + randomNumber + ".png"; //dice1.png - dice6.png

        var randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png

        dice.setAttribute("src", randomImageSource);
    });
}

createBoard();
const redCells = [0, 1, 2, 3, 4, 5, 15, 30, 45, 60, 75, 76, 77, 78, 79, 80, 65, 50, 35, 20, 32, 47, 33, 48, 91, 106, 107, 108, 109, 110, 111];
const greenCells = [9, 10, 11, 12, 13, 14, 22, 23, 24, 29, 37, 39, 41, 42, 44, 52, 54, 56, 57, 59, 67, 69, 74, 82, 84, 85, 86, 87, 88, 89, 97];
const blueCells = [135, 136, 137, 138, 139, 140, 142, 150, 155, 157, 165, 167, 168, 170, 172, 180, 182, 183, 185, 187, 195, 200, 201, 202, 210, 211, 212, 213, 214, 215, 127];
const yellowCells = [113, 114, 115, 116, 117, 118, 133, 144, 145, 146, 147, 148, 149, 159, 164, 174, 176, 177, 179, 189, 191, 192, 194, 204, 209, 219, 220, 221, 222, 223, 224];
addColor(redCells, "#FCC8D1");
addColor(greenCells, "#C7E9B0");
addColor(blueCells, "#C0DBEA");
addColor(yellowCells, "#FEFF86");
addSafeSquare([122, 36, 102, 188]);
addPlayer([32, 33, 47, 48], "red");
addPlayer([41, 42, 56, 57], "green");
addPlayer([167, 168, 182, 183], "blue");
addPlayer([176, 177, 191, 192], "yellow");

rollDice();