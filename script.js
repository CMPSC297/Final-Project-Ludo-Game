var dicesound = document.getElementById("diceSound");
var stepsound = document.getElementById("stepSound");
var redPlayerName;
var greenPlayerName;
var bluePlayerName;
var yellowPlayerName;
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
const yellowPath = [133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 118, 117, 116, 115, 114, 113];
const bluePath = [201, 186, 171, 156, 141, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 81, 66, 51, 36, 21, 6, 7, 8, 23, 38, 53, 68, 83, 99, 100, 101, 102, 103, 104, 119, 134, 133, 132, 131, 130, 129, 143, 158, 173, 188, 203, 218, 217, 202, 187, 172, 157, 142, 127];
var redi = [{ id: "r32", index: -1 }, { id: "r33", index: -1 }, { id: "r47", index: -1 }, { id: "r48", index: -1 }];
var greeni = [{ id: "g41", index: -1 }, { id: "g42", index: -1 }, { id: "g56", index: -1 }, { id: "g57", index: -1 }];
var yellowi = [{ id: "y176", index: -1 }, { id: "y77", index: -1 }, { id: "y191", index: -1 }, { id: "y192", index: -1 }];
var bluei = [{ id: "b167", index: -1 }, { id: "b168", index: -1 }, { id: "b182", index: -1 }, { id: "b183", index: -1 }];
var diceNum = 0;
var redcount6 = 0;
var greencount6 = 0;
var yellowcount6 = 0;
var bluecount6 = 0;
var blockPath = [];
var winning = [];


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
        player.id = color.substring(0, 1) + id;
        const cellElement = document.getElementById(id);
        cellElement.append(player);
    });
}

function removePlayer(cellId, playerId) {
    //get all players on current cell
    var players = document.getElementById(cellId).querySelectorAll("*");
    const removePlayer = document.getElementById(playerId);
    //create newCell after remove player
    const cellElement = document.getElementById(cellId);
    const newCellElement = document.createElement("div");
    newCellElement.classList.add("square");
    newCellElement.id = cellId;
    var remainNum = 0;
    players.forEach(player => {
        if (player != removePlayer) {
            newCellElement.append(player); //keep other players on cell
            remainNum += 1;
        }
    });
    //check if current cell doesn't form a block
    if (remainNum < 2) {
        var index = blockPath.indexOf(cellId);
        if (index > -1) {
            blockPath.splice(index, 1);
        }
    }
    cellElement.replaceWith(newCellElement);
    addColor(redCells, "#FCC8D1");
    addColor(greenCells, "#C7E9B0");
    addColor(blueCells, "#C0DBEA");
    addColor(yellowCells, "#FEFF86");
    //remove player
    cellElement.remove(removePlayer);
}

function movePlayer(cellId, playerId, className, prevcellId, path, status) {
    stepsound.play();
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
    //count all players of different colors on current cell
    var players = document.getElementById(cellId).querySelectorAll("*");
    var oppsiteCount = [0, 0, 0, 0];
    players.forEach(player => {
        if (player.className !== newPlayer.className) {
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

        }
    });

    var block = false;
    oppsiteCount.forEach(oldPlayer => {
        //cell element has a block
        if (oldPlayer >= 2) {
            block = true;
        }
    });
    //check if there is block along the path
    for (let i = path.indexOf(cellId) - diceNum; i < path.indexOf(cellId); i++) {// i is assigned newplayer's starting position index
        if (blockPath.includes(path[i])) {
            //check if the block player has the same color as newPlayer
            var playerOnblock = document.getElementById(path[i]).querySelectorAll("*")[0];
            if (playerOnblock.className !== newPlayer.className) {
                block = true;
                prevcellId = path[i - 1];
                break
            }
        }
    }
    // console.log(blockPath);
    // console.log(prevcellId);

    if (block) {
        const prevCellElement = document.getElementById(prevcellId);
        prevCellElement.append(newPlayer);
        //update newPlayer position
        for (let i = 0; i < status.length; i++) {
            if (status[i].id === newPlayer.id) {
                status[i].index = path.indexOf(prevcellId);
            }
        }

    }
    else {
        //if cell is safe
        if (["122", "36", "102", "188"].includes(cellId)) {
            cellElement.append(newPlayer);
        }
        else {
            if (players.length === 0) {
                cellElement.append(newPlayer);
            } // same color players to form a block
            else if (players[0].className === newPlayer.className) {
                cellElement.append(newPlayer);
                // console.log("add green player");
                if (blockPath.indexOf(cellId) === -1) blockPath.push(cellId);
                // console.log(blockPath);
            }
            else {
                newCellElement.append(newPlayer);
                players.forEach(player => {
                    var homeCell = document.getElementById(player.id.substring(1));
                    homeCell.append(player);
                    var homePosition = player.id.substring(0, 1);
                    if (homePosition === 'r') {
                        for (var j = 0; j < redi.length; j++) {
                            if (redi[j].id === player.id) {
                                redi[j].index = -1;
                            }
                        }
                    }
                    if (homePosition === 'g') {
                        for (var j = 0; j < greeni.length; j++) {
                            if (greeni[j].id === player.id) {
                                greeni[j].index = -1;
                            }
                        }
                    }
                    if (homePosition === 'y') {
                        for (var j = 0; j < yellowi.length; j++) {
                            if (yellowi[j].id === player.id) {
                                yellowi[j].index = -1;
                            }
                        }
                    }
                    if (homePosition === 'b') {
                        for (var j = 0; j < bluei.length; j++) {
                            if (bluei[j].id === player.id) {
                                bluei[j].index = -1;
                            }
                        }
                    }
                })
                cellElement.replaceWith(newCellElement);
                addColor(redCells, "#FCC8D1");
                addColor(greenCells, "#C7E9B0");
                addColor(blueCells, "#C0DBEA");
                addColor(yellowCells, "#FEFF86");
            }
        }
    }

}

function redAction(e) {
    for (var j = 0; j < redi.length; j++) {
        // console.log('in the loop')
        if (redi[j].id === e.target.id) {
            //move out of home to start position
            if (redi[j].index === -1) {
                if (diceNum === 6) {
                    redcount6 += 1;
                    redi[j].index += 1; //update player's current position
                    nextposition = redPath[redi[j].index];
                    removePlayer(e.target.id.substring(1), e.target.id);
                    movePlayer(nextposition, e.target.id, "redplayer", e.target.id.substring(1), redPath, redi);
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
                    const nextDice = document.querySelector("." + nextStatus(currDice.className));
                    currDice.classList.add("hidden");
                    nextDice.classList.remove("hidden");
                    redcount6 = 0;

                }//send other players home
                removePlayer(redPath[redi[j].index], e.target.id);
                redi[j].index += diceNum;
                nextposition = redPath[redi[j].index];
                if (typeof nextposition === 'undefined') {
                    console.log('yes error!')
                    var remainStep = redi[j].index - 56;
                    console.log(remainStep)
                    redi[j].index = 56 - remainStep;
                    nextposition = redPath[redi[j].index];
                }
                movePlayer(nextposition, e.target.id, "redplayer", redPath[redi[j].index - 1], redPath, redi);
                //reach the end of path
                if (nextposition === redPath[56]) {
                    //movePlayer(nextposition, e.target.id, "redplayer", redPath[redi[j].index - 1], redPath, redi);
                    alert("This pawn of yours has reached the finish line.");
                    removePlayer(redPath[56], e.target.id);
                    redi.splice(j, 1)
                }
                document.querySelectorAll(".redplayer").forEach(player => {
                    player.removeEventListener("click", redAction);
                });
            }
            if (redcount6 >= 3) {
                //give chance to next player
                const currDice = document.querySelector(".redDice")
                const nextDice = document.querySelector("." + nextStatus(currDice.className));
                currDice.classList.add("hidden");
                nextDice.classList.remove("hidden");
                redcount6 = 0;
            }
        }
    }
    const Dice = document.querySelector(".redDice");
    Dice.addEventListener("click", rollDice);
    //check winning conditions
    if (document.querySelectorAll(".redplayer").length === 3) {
        // alert("Yes, you win!")
        winning.push(redPlayerName);
        for (let i = 0; i < currentStatus.length; i++) {
            if (currentStatus[i].name === "redDice") {
                currentStatus.splice(i, 1);
            }
        }
        document.querySelector(".winning").innerHTML += `<ul>${redPlayerName.value}</ul>`;

    }
}

function greenAction(e) {
    for (var j = 0; j < greeni.length; j++) {
        if (greeni[j].id === e.target.id) {
            //move out of home to start position
            if (greeni[j].index === -1) {
                if (diceNum === 6) {
                    greencount6 += 1;
                    greeni[j].index += 1;
                    nextposition = greenPath[greeni[j].index];
                    removePlayer(e.target.id.substring(1), e.target.id);
                    movePlayer(nextposition, e.target.id, "greenplayer", e.target.id.substring(1), greenPath, greeni);
                    //disable to click the same player multiple times  
                    document.querySelectorAll(".greenplayer").forEach(player => {
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
                    //to do: resolve index
                    const nextDice = document.querySelector("." + nextStatus(currDice.className));
                    currDice.classList.add("hidden");
                    nextDice.classList.remove("hidden");
                    greencount6 = 0;
                }
                removePlayer(greenPath[greeni[j].index], e.target.id);
                greeni[j].index += diceNum;
                nextposition = greenPath[greeni[j].index];
                if (typeof nextposition === 'undefined') {
                    console.log('yes error!')
                    var remainStep = greeni[j].index - 56;
                    console.log(remainStep)
                    greeni[j].index = 56 - remainStep;
                    nextposition = greenPath[greeni[j].index];
                }
                else if (nextposition === greenPath[56]) {
                    alert("This pawn of yours has reached the finish line.");
                    removePlayer(e.target.id.substring(1), e.target.id);
                }
                movePlayer(nextposition, e.target.id, "greenplayer", greenPath[greeni[j].index - 1], greenPath, greeni);
                document.querySelectorAll(".greenplayer").forEach(player => {
                    player.removeEventListener("click", greenAction);
                });
            }
            if (greencount6 >= 3) {
                //give chance to next player
                const currDice = document.querySelector(".greenDice")
                //to do: resolve index
                const nextDice = document.querySelector("." + nextStatus(currDice.className));
                currDice.classList.add("hidden");
                nextDice.classList.remove("hidden");
                greencount6 = 0;

            }
        }
    }
    const Dice = document.querySelector(".greenDice");
    Dice.addEventListener("click", rollDice);
    if (document.querySelectorAll(".greenplayer").length === 0) {
        alert("Yes, you win!")

    }
}

function yellowAction(e) {
    for (var j = 0; j < yellowi.length; j++) {
        if (yellowi[j].id === e.target.id) {
            //move out of home to start position
            if (yellowi[j].index === -1) {
                if (diceNum === 6) {
                    yellowcount6 += 1;
                    yellowi[j].index += 1;
                    nextposition = yellowPath[yellowi[j].index];
                    removePlayer(e.target.id.substring(1), e.target.id);
                    movePlayer(nextposition, e.target.id, "yellowplayer", e.target.id.substring(1), yellowPath, yellowi);
                    //disable to click the same player multiple times  
                    document.querySelectorAll(".yellowplayer").forEach(player => {
                        player.removeEventListener("click", yellowAction);
                    });
                } else {
                    yellowcount6 = 0;
                }
            }//not in home
            else {
                if (diceNum === 6) {
                    yellowcount6 += 1;
                } else {
                    //give chance to next player
                    const currDice = document.querySelector(".yellowDice")
                    //to do: resolve index
                    const nextDice = document.querySelector("." + nextStatus(currDice.className));
                    currDice.classList.add("hidden");
                    nextDice.classList.remove("hidden");
                    yellowcount6 = 0;
                }
                removePlayer(yellowPath[yellowi[j].index], e.target.id);
                yellowi[j].index += diceNum;
                nextposition = yellowPath[yellowi[j].index];
                if (typeof nextposition === 'undefined') {
                    console.log('yes error!')
                    var remainStep = yellowi[j].index - 56;
                    console.log(remainStep)
                    yellowi[j].index = 56 - remainStep;
                    console.log(yellowi[j])
                    nextposition = yellowPath[yellowi[j].index];
                    console.log(nextposition)
                }
                else if (nextposition === yellowPath[56]) {
                    alert("This pawn of yours has reached the finish line.");
                    removePlayer(e.target.id.substring(1), e.target.id);
                }
                movePlayer(nextposition, e.target.id, "yellowplayer", yellowPath[yellowi[j].index - 1], yellowPath, yellowi);
                document.querySelectorAll(".yellowplayer").forEach(player => {
                    player.removeEventListener("click", yellowAction);
                });
            }
            if (yellowcount6 >= 3) {
                //give chance to next player
                const currDice = document.querySelector(".yellowDice")
                //to do: resolve index
                const nextDice = document.querySelector("." + nextStatus(currDice.className));
                currDice.classList.add("hidden");
                nextDice.classList.remove("hidden");
                yellowcount6 = 0;

            }
        }
    }
    const Dice = document.querySelector(".yellowDice");
    Dice.addEventListener("click", rollDice);
    if (document.querySelectorAll(".yellowplayer").length === 0) {
        alert("Yes, you win!")

    }
}

function blueAction(e) {
    for (var j = 0; j < bluei.length; j++) {
        if (bluei[j].id === e.target.id) {
            //move out of home to start position
            if (bluei[j].index === -1) {
                if (diceNum === 6) {
                    bluecount6 += 1;
                    bluei[j].index += 1;
                    nextposition = bluePath[bluei[j].index];
                    removePlayer(e.target.id.substring(1), e.target.id);
                    movePlayer(nextposition, e.target.id, "blueplayer", e.target.id.substring(1), bluePath, bluei);
                    //disable to click the same player multiple times  
                    document.querySelectorAll(".blueplayer").forEach(player => {
                        player.removeEventListener("click", blueAction);
                    });
                } else {
                    bluecount6 = 0;
                }
            }//not in home
            else {
                if (diceNum === 6) {
                    bluecount6 += 1;
                } else {
                    //give chance to next player
                    const currDice = document.querySelector(".blueDice")

                    //to do: resolve index
                    const nextDice = document.querySelector("." + nextStatus(currDice.className));
                    currDice.classList.add("hidden");
                    nextDice.classList.remove("hidden");
                    bluecount6 = 0;
                }
                removePlayer(bluePath[bluei[j].index], e.target.id);
                bluei[j].index += diceNum;
                nextposition = bluePath[bluei[j].index];
                // console.log(nextposition)
                if (typeof nextposition === 'undefined') {
                    console.log('yes error!')
                    var remainStep = bluei[j].index - 56;
                    console.log(remainStep)
                    bluei[j].index = 56 - remainStep;
                    nextposition = bluePath[bluei[j].index];
                }
                else if (nextposition === bluePath[56]) {
                    alert("This pawn of yours has reached the finish line.");
                    removePlayer(e.target.id.substring(1), e.target.id);
                }
                movePlayer(nextposition, e.target.id, "blueplayer", bluePath[bluei[j].index - 1], bluePath, bluei);
                document.querySelectorAll(".blueplayer").forEach(player => {
                    player.removeEventListener("click", blueAction);
                });
            }
            if (bluecount6 >= 3) {
                //give chance to next player
                const currDice = document.querySelector(".blueDice")
                //to do: resolve index
                const nextDice = document.querySelector("." + nextStatus(currDice.className));
                currDice.classList.add("hidden");
                nextDice.classList.remove("hidden");
                bluecount6 = 0;

            }
        }
    }
    const Dice = document.querySelector(".blueDice");
    Dice.addEventListener("click", rollDice);
    if (document.querySelectorAll(".blueplayer").length === 0) {
        alert("Yes, you win!")

    }
}
function move(currentDice, randomNumber) {
    if (currentDice.className === "redDice") {
        //check if all players are at home
        var playerAtHome = 0;
        redi.forEach(i => {
            if (i.index === -1) {
                playerAtHome += 1;
            }
        })
        if (playerAtHome === redi.length && randomNumber !== 6) {
            let nextDiceName = nextStatus(currentDice.className);
            //give chance to next player
            setTimeout(function () {
                currentDice.classList.add("hidden");
            }, 1000);
            var nextDice = document.querySelector("." + nextDiceName);
            setTimeout(function () {
                nextDice.classList.remove("hidden");
            }, 1000);
            return 0;
        }

        const Dice = document.querySelector(".redDice");
        Dice.removeEventListener("click", rollDice);
        const redPlayers = document.querySelectorAll(".redplayer");
        for (var i = 0; i < redPlayers.length; i++) {
            var currentplayer = redPlayers[i];
            currentplayer.addEventListener("click", redAction);

        }
    }
    if (currentDice.className === "greenDice") {
        //check if all players are at home
        var playerAtHome = 0;
        greeni.forEach(i => {
            if (i.index == -1) {
                playerAtHome += 1;
            }
        })
        if (playerAtHome === greeni.length && randomNumber !== 6) {
            let nextDiceName = nextStatus(currentDice.className);
            //give chance to next player
            setTimeout(function () {
                currentDice.classList.add("hidden");
            }, 1000);
            var nextDice = document.querySelector("." + nextDiceName);
            setTimeout(function () {
                nextDice.classList.remove("hidden");
            }, 1000);
            return 0;
        }
        const Dice = document.querySelector(".greenDice");
        Dice.removeEventListener("click", rollDice);
        const greenPlayers = document.querySelectorAll(".greenplayer");
        for (var i = 0; i < greenPlayers.length; i++) {
            var currentplayer = greenPlayers[i];
            currentplayer.addEventListener("click", greenAction);

        }
    }
    if (currentDice.className === "yellowDice") {
        //check if all players are at home
        var playerAtHome = 0;
        yellowi.forEach(i => {
            if (i.index == -1) {
                playerAtHome += 1;
            }
        })
        if (playerAtHome === yellowi.length && randomNumber !== 6) {
            let nextDiceName = nextStatus(currentDice.className);
            //give chance to next player
            setTimeout(function () {
                currentDice.classList.add("hidden");
            }, 1000);
            var nextDice = document.querySelector("." + nextDiceName);
            setTimeout(function () {
                nextDice.classList.remove("hidden");
            }, 1000);
            return 0;
        }
        const Dice = document.querySelector(".yellowDice");
        Dice.removeEventListener("click", rollDice);
        const yellowPlayers = document.querySelectorAll(".yellowplayer");
        for (var i = 0; i < yellowPlayers.length; i++) {
            var currentplayer = yellowPlayers[i];
            currentplayer.addEventListener("click", yellowAction);

        }
    }
    if (currentDice.className === "blueDice") {
        //check if all players are at home
        var playerAtHome = 0;
        bluei.forEach(i => {
            if (i.index == -1) {
                playerAtHome += 1;
            }
        })
        if (playerAtHome === bluei.length && randomNumber !== 6) {
            let nextDiceName = nextStatus(currentDice.className);
            //give chance to next player
            setTimeout(function () {
                currentDice.classList.add("hidden");
            }, 1000);
            var nextDice = document.querySelector("." + nextDiceName);
            setTimeout(function () {
                nextDice.classList.remove("hidden");
            }, 1000);
            return 0;
        }
        const Dice = document.querySelector(".blueDice");
        Dice.removeEventListener("click", rollDice);
        const bluePlayers = document.querySelectorAll(".blueplayer");
        for (var i = 0; i < bluePlayers.length; i++) {
            var currentplayer = bluePlayers[i];
            currentplayer.addEventListener("click", blueAction);

        }
    }

}
function nextStatus(name) {
    for (let i = 0; i < currentStatus.length; i++) {
        if (currentStatus[i].name === name) {
            try {
                return currentStatus[i + 1].name;
            } catch (error) {
                return currentStatus[0].name;
            }
        }
    }

}
var path = [6, 1, 6, 6, 6, 1, 6, 6, 6, 1, 6, 6, 6, 1, 6, 6, 4, 1, 6, 6, 6, 1, 6, 6, 6, 1, 6, 6, 6, 1, 6, 6, 4, 1, 6, 6, 6, 1, 6, 6, 6, 1, 6, 6, 6, 1, 6, 6, 4, 1, 6, 6, 6, 1, 6, 6, 6, 1, 6, 6, 6, 1, 6, 6, 4];
var pos = 0;
function rollDice(e) {
    //var randomNumber = Math.floor(Math.random() * 6) + 1; //1-6
    var randomNumber = path[pos];
    pos += 1;
    dicesound.play();
    diceNum = randomNumber;
    if (startingDice.value < randomNumber) {
        startingDice.name = e.target.className;
        startingDice.value = randomNumber;
    }
    var randomDiceImage = "dice" + randomNumber + ".png"; //dice1.png - dice6.png
    var randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png
    e.target.setAttribute("src", randomImageSource);
    //After first round, check if the current dice is 6
    if (roundNum >= currentStatus.length) {
        move(e.target, randomNumber);
        return 0;
    }

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
    redPlayerName = document.querySelector('.redPlayer');
    greenPlayerName = document.querySelector('.greenPlayer');
    yellowPlayerName = document.querySelector('.yellowPlayer');
    bluePlayerName = document.querySelector('.bluePlayer');
    var count = [0, 0, 0, 0];
    var is_hidden = false;
    if (redPlayerName.value !== "") {
        count[0] += 1;
    }
    if (greenPlayerName.value !== "") {
        count[1] += 1;
    }
    if (yellowPlayerName.value !== "") {
        count[2] += 1;
    }

    if (bluePlayerName.value !== "") {
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
            name.textContent = redPlayerName.value;
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
            var dice = document.createElement("img");
            dice.src = "images/dice6.png";
            dice.className = "greenDice";
            name.textContent = greenPlayerName.value;
            name.classList.add("greenName");
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
            name.textContent = yellowPlayerName.value;
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
            name.textContent = bluePlayerName.value;
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

var a = document.getElementById(96);
var b = document.getElementById(98);
var c = document.getElementById(126);
var d = document.getElementById(128);
a.classList.add("topLeft");
b.classList.add("topRight");
c.classList.add("bottomLeft");
d.classList.add("bottomRight");