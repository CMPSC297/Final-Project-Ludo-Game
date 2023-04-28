const gameBoard = document.querySelector(".gameboard");
const welcomePage = document.querySelector(".welcome");
const startCells = Array(225).join(".").split(".");
let currentDice = [0, 0, 0, 0];
let currentStatus = []
let roundNum = 0;
let temp_max = 0;
let startingDice = { name: "start", value: 0 };
const redPath = [91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 134, 133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 106, 107, 108, 109, 110, 111];
const greenPath = [23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 134, 133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 22, 37, 52, 67, 82, 97];
const yellowPath = [133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 118, 117, 116, 115, 114, 113];
const bluePath = [216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 134, 133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 202, 187, 172, 157, 142, 127];
let redi = [{ id: "red32", index: -1 }, { id: "red33", index: -1 }, { id: "red47", index: -1 }, { id: "red48", index: -1 }];
let greeni = [{ id: "green41", index: -1 }, { id: "green42", index: -1 }, { id: "green56", index: -1 }, { id: "green57", index: -1 }];
let yellowi = [{ id: "yellow176", index: -1 }, { id: "yellow177", index: -1 }, { id: "yellow191", index: -1 }, { id: "yellow192", index: -1 }];
let bluei = [{ id: "blue167", index: -1 }, { id: "blue168", index: -1 }, { id: "blue182", index: -1 }, { id: "blue183", index: -1 }];
secondRoundTrigger = false;
var temp2;
var temp = '';
var tempId = 0;
var diceNum = 0;
var redcount6 = 0;
var greencount6 = 0;


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
        player.classList.add(color + "player");
        // player.classList.add(color);
        player.id = color + id;
        const cellElement = document.getElementById(id);
        cellElement.append(player);
    });
}

function removePlayer(cellId, playerId) {
    // console.log(cellId);
    // console.log(playerId);
    const cellElement = document.getElementById(cellId);
    const newCellElement = document.createElement("div");
    newCellElement.classList.add("square");
    newCellElement.id = cellId;
    //get all players on current cell
    var players = document.getElementById(cellId).querySelectorAll("*");
    const removePlayer = document.getElementById(playerId);
    players.forEach(player => {
        if (player !== removePlayer) {
            newCellElement.append(player);
        }
    });
    console.log(cellElement);
    cellElement.replaceWith(newCellElement);
    addColor(redCells, "#FCC8D1");
    addColor(greenCells, "#C7E9B0");
    addColor(blueCells, "#C0DBEA");
    addColor(yellowCells, "#FEFF86");
    //remove player
    cellElement.remove(removePlayer);
}

function movePlayer(cellId, playerId, className, prevcellId) {
    //current cell
    const cellElement = document.getElementById(cellId);
    //new player arrives on the cell
    const newPlayer = document.createElement("div");
    newPlayer.id = playerId;
    newPlayer.className = className;
    //create new cell
    const newCellElement = document.createElement("div");
    newCellElement.classList.add("square");
    newCellElement.id = cellId;
    //get all players on current cell
    var players = document.getElementById(cellId).querySelectorAll("*");
    var oppsiteCount = [0, 0, 0, 0];
    players.forEach(player => {
        if (player.className === "redplayer") {
            oppsiteCount[0] += 1;
        }
        if (player.className === "greenplayer") {
            oppsiteCount[1] += 1;
        }
        if (player.className === "yellowplayer") {
            oppsiteCount[2] += 1;
        }
        if (player.className === "blueplayer") {
            oppsiteCount[3] += 1;
        }
    });
    oppsiteCount.forEach(oldPlayer => {
        //cell element has a block
        if (oldPlayer >= 2) {
            const prevCellElement = document.createElement("div");
            prevCellElement.classList.add("square");
            prevCellElement.id = prevcellId;
            prevCellElement.append(newPlayer)
        }
        else { //if cell is safe
            if (cellId in [122, 36, 102, 188]) {
                cellElement.append(newPlayer);
            }
            else {
                newCellElement.append(newPlayer);
                players.forEach(player => {
                    var homeCell = document.getElementById(player.id.substring())
                })

            }
        }
    });

}

function redAction(e) {
    console.log('in the action');
    console.log(e);
    for (var j = 0; j < redi.length; j++) {
        // console.log('in the loop')
        if (redi[j].id === e.target.id) {
            //move out of home to start position
            if (redi[j].index === -1) {
                if (diceNum === 6) {
                    redcount6 += 1;
                    console.log('in the if')
                    redi[j].index += 1; //update player's current position
                    nextposition = redPath[redi[j].index];
                    removePlayer(e.target.id.substring(3), e.target.id);
                    movePlayer(nextposition, e.target.id, "redplayer", redPath[redi[j].index - 1]);
                    //disable to click the same player multiple times  
                    document.querySelectorAll(".redplayer").forEach(player => {
                        player.removeEventListener("click", redAction);
                    });
                } else {
                    redcount6 = 0;
                }
            }//not in home
            else {
                if (diceNum === 6) {
                    redcount6 += 1;
                } else {
                    //give chance to next player
                    const currDice = document.querySelector(".redDice")
                    currDice.classList.add("hidden");
                    const nextDice = document.querySelector("." + currentStatus[1].name);
                    nextDice.classList.remove("hidden");
                    redcount6 = 0;

                }
                removePlayer(redPath[redi[j].index], e.target.id);
                redi[j].index += diceNum;
                nextposition = redPath[redi[j].index];
                movePlayer(nextposition, e.target.id, "redplayer", redPath[redi[j].index - 1]);
                document.querySelectorAll(".redplayer").forEach(player => {
                    console.log(player);
                    player.removeEventListener("click", redAction);
                });
            }
            if (redcount6 >= 3) {
                //give chance to next player
                const currDice = document.querySelector(".redDice")
                currDice.classList.add("hidden");
                const nextDice = document.querySelector("." + currentStatus[1].name);
                nextDice.classList.remove("hidden");
                redcount6 = 0;
            }
        }
    }
}

function greenAction(e) {
    for (var j = 0; j < redi.length; j++) {
        // console.log('in the loop')
        if (greeni[j].id === e.target.id) {
            //move out of home to start position
            if (greeni[j].index === -1) {
                if (diceNum === 6) {
                    greencount6 += 1;
                    console.log('in the if')
                    greeni[j].index += 1;
                    nextposition = greenPath[greeni[j].index];
                    removePlayer(e.target.id.substring(5), e.target.id);
                    movePlayer(nextposition, e.target.id, "greenplayer", greenPath[greeni[j].index - 1]);
                    //disable to click the same player multiple times  
                    document.querySelectorAll(".greenplayer").forEach(player => {
                        console.log(player);
                        player.removeEventListener("click", greenAction);
                    });
                } else {
                    greencount6 = 0;
                }
            }//not in home
            else {
                if (diceNum === 6) {
                    greencount6 += 1;
                } else {
                    //give chance to next player
                    const currDice = document.querySelector(".greenDice")
                    currDice.classList.add("hidden");
                    //to do: resolve index
                    const nextDice = document.querySelector("." + currentStatus[0].name);
                    nextDice.classList.remove("hidden");
                    greencount6 = 0;
                }
                removePlayer(greenPath[greeni[j].index], e.target.id);
                greeni[j].index += diceNum;
                nextposition = greenPath[greeni[j].index];
                movePlayer(nextposition, e.target.id, "greenplayer", greenPath[greeni[j].index - 1]);
                document.querySelectorAll(".greenplayer").forEach(player => {
                    console.log(player);
                    player.removeEventListener("click", greenAction);
                });
            }
            if (greencount6 >= 3) {
                //give chance to next player
                const currDice = document.querySelector(".greenDice")
                currDice.classList.add("hidden");
                //to do: resolve index
                const nextDice = document.querySelector("." + currentStatus[0].name);
                nextDice.classList.remove("hidden");
                greencount6 = 0;

            }
        }
    }
}

function move(currentDice, randomNumber) {
    if (currentDice.className == "redDice") {
        const redPlayers = document.querySelectorAll(".redplayer");
        for (var i = 0; i < redPlayers.length; i++) {
            var currentplayer = redPlayers[i];
            currentplayer.addEventListener("click", redAction);

        }
    }
    if (currentDice.className == "greenDice") {
        const greenPlayers = document.querySelectorAll(".greenplayer");
        for (var i = 0; i < greenPlayers.length; i++) {
            var currentplayer = greenPlayers[i];
            currentplayer.addEventListener("click", greenAction);

        }
    }
    if (currentDice.className == "blueDice") {
        for (var i = 0; i < document.querySelectorAll(".blueplayer").length; i++) {
            if (bluei === 0) {
                var currentplayer = document.querySelectorAll(".blueplayer")[i];
                currentplayer.addEventListener("click", function () {
                    addPlayer([bluePath[bluei]], "blue");
                    removePlayer([currentplayer.id.substring(4)]);
                });
            }
            else {
                var currentplayer = document.querySelectorAll(".blueplayer")[i];
                currentplayer.addEventListener("click", function () {
                    addPlayer([bluePath[bluei + randomNumber]], "blue");
                    removePlayer([currentplayer.id.substring(4)]);
                });
                bluei += randomNumber;
            }
        }
    }
    if (currentDice.className == "yellowDice") {
        for (var i = 0; i < document.querySelectorAll(".yellowplayer").length; i++) {
            if (yellowi === 0) {
                var currentplayer = document.querySelectorAll(".yellowplayer")[i];
                currentplayer.addEventListener("click", function () {
                    addPlayer([yellowPath[yellowi]], "yellow");
                    removePlayer([currentplayer.id.substring(6)]);
                });
            }
            else {
                var currentplayer = document.querySelectorAll(".yellowplayer")[i];
                currentplayer.addEventListener("click", function () {
                    addPlayer([yellowPath[yellowi + randomNumber]], "yellow");
                    removePlayer([currentplayer.id.substring(6)]);
                });
                bluei += randomNumber;
            }
        }
    }

}

function rollDice(e) {
    //var randomNumber = Math.floor(Math.random() * 6) + 1; //1-6
    var randomNumber = 6;
    diceNum = randomNumber;
    if (startingDice.value < randomNumber) {
        startingDice.name = e.target.className;
        startingDice.value = randomNumber;
    }
    var randomDiceImage = "dice" + randomNumber + ".png"; //dice1.png - dice6.png
    var randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png
    e.target.setAttribute("src", randomImageSource);
    //After first round, check if the current dice is 6
    if (roundNum >= currentStatus.length && randomNumber === 6) {
        secondRoundTrigger = true;
        move(e.target, randomNumber);
        return 0;
    }

    if (roundNum >= currentStatus.length && randomNumber !== 6 && secondRoundTrigger) {
        move(e.target, randomNumber);
        return 0;
    }
    // if (secondRoundTrigger){
    //     move(e.target, randomNumber);
    //     return 0;
    // }
    //check current index to find next player
    const isEqual = (element) => element.name === e.target.className;
    currentIndex = currentStatus.findIndex(isEqual);

    switch (e.target.className) {
        case "redDice":
            currentDice[0] = randomNumber;
            setTimeout(function () {
                e.target.classList.add("hidden");
            }, 1000);
            break;
        case "greenDice":
            //console.log(e.target.className)
            currentDice[1] = randomNumber;
            setTimeout(function () {
                e.target.classList.add("hidden");
            }, 1000);
            break;
        case "yellowDice":
            currentDice[2] = randomNumber;
            setTimeout(function () {
                e.target.classList.add("hidden");
            }, 1000);
            break;
        case "blueDice":
            currentDice[3] = randomNumber;
            setTimeout(function () {
                e.target.classList.add("hidden");
            }, 1000);
            break;
    }
    if (currentIndex < currentStatus.length - 1) {
        currentIndex += 1;
    }
    else {
        currentIndex = 0;
        //console.log("enter");
    }
    roundNum += 1;
    //check if it's first round
    if (roundNum === currentStatus.length) {
        // alert("The first round is over!")
        setTimeout(function () {
            alert("The first round is over!");
        }, 2000);
        setTimeout(function () {
            for (let i = currentDice.length - 1; i >= 0; i--) {
                if (currentDice[i] === 0) {
                    //console.log(currentDice[i])
                    currentDice.splice(i, 1);
                    //console.log(currentDice);
                }
            }
            for (let i = 0; i < currentDice.length; i++) {
                currentStatus[i].value = currentDice[i]
            }
            const firstDice = document.querySelector("." + startingDice.name);
            firstDice.classList.remove("hidden");

        }, 3000);
        return 0;
    }

    nextDice = document.querySelector("." + currentStatus[currentIndex].name);
    setTimeout(function () {
        nextDice.classList.remove("hidden");
    }, 1000);

}

function removeWelcome() {
    var redPlayer = document.querySelector('.redPlayer');
    var greenPlayer = document.querySelector('.greenPlayer');
    var yellowPlayer = document.querySelector('.yellowPlayer');
    var bluePlayer = document.querySelector('.bluePlayer');
    var count = [0, 0, 0, 0];
    var is_hidden = false;
    if (redPlayer.value !== "") {
        count[0] += 1;
    }
    if (greenPlayer.value !== "") {
        count[1] += 1;
    }
    if (yellowPlayer.value !== "") {
        count[2] += 1;
    }

    if (bluePlayer.value !== "") {
        count[3] += 1;
    }

    if (count[0] + count[1] + count[3] + count[2] < 2) {
        alert('Please enter at least 2 Players');
        return 0;
    }
    else {
        if (count[0]) {
            addPlayer([32, 33, 47, 48], "red");
            var name = document.createElement("p");
            var dice = document.createElement("img");
            dice.src = "images/dice6.png";
            dice.className = "redDice";
            name.textContent = redPlayer.value;
            name.classList.add("redName");
            gameBoard.appendChild(name);
            gameBoard.appendChild(dice);
            is_hidden = true;
            dice.addEventListener("click", rollDice);
            // turn.push("redDice");
            currentStatus.push({ name: "redDice", value: 0 })
        }
        if (count[1]) {
            addPlayer([41, 42, 56, 57], "green");
            var name = document.createElement("p");
            name.classList.add("greenName");
            var dice = document.createElement("img");
            dice.src = "images/dice6.png";
            dice.className = "greenDice";
            name.textContent = greenPlayer.value;
            gameBoard.appendChild(name);
            gameBoard.appendChild(dice);
            if (is_hidden) {
                dice.classList.add("hidden");
            }
            is_hidden = true;
            dice.addEventListener("click", rollDice);
            // turn.push("greenDice");
            currentStatus.push({ name: "greenDice", value: 0 })
        }
        if (count[2]) {
            addPlayer([176, 177, 191, 192], "yellow");
            var name = document.createElement("p");
            name.classList.add("yellowName");
            var dice = document.createElement("img");
            dice.src = "images/dice6.png";
            dice.className = "yellowDice";
            name.textContent = yellowPlayer.value;
            gameBoard.appendChild(name);
            gameBoard.appendChild(dice);
            if (is_hidden) {
                dice.classList.add("hidden");
            }
            is_hidden = true;
            dice.addEventListener("click", rollDice);
            // turn.push("yellowDice");
            currentStatus.push({ name: "yellowDice", value: 0 })
        }
        if (count[3]) {
            addPlayer([167, 168, 182, 183], "blue");
            var name = document.createElement("p");
            name.classList.add("blueName");
            var dice = document.createElement("img");
            dice.src = "images/dice6.png";
            dice.className = "blueDice";
            name.textContent = bluePlayer.value;
            gameBoard.appendChild(name);
            gameBoard.appendChild(dice);
            if (is_hidden) {
                dice.classList.add("hidden");
            }
            is_hidden = true;
            dice.addEventListener("click", rollDice);
            // turn.push("blueDice");
            currentStatus.push({ name: "blueDice", value: 0 })
        }

        welcomePage.remove();
    }
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


// start game

