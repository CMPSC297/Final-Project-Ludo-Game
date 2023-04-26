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
redi = [-1, -1, -1, -1];
greeni = -1;
yellowi = -1;
bluei = -1;
secondRoundTrigger = false;
var temp2;
var temp= '';
var tempId = 0;


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

function removePlayer(cellIds) {
    console.log(cellIds)
    cellIds.forEach(id => {
        // const player = document.createElement("div");
        // player.classList.add(color + "player");
        // // // player.classList.add(color);
        // player.id = color + id;
        //how to remove the div I append before ???
        const cellElement = document.getElementById(id);
        const newCellElement = document.createElement("div");
        newCellElement.classList.add("square");
        newCellElement.id = id;
        cellElement.replaceWith(newCellElement);
        addColor(redCells, "#FCC8D1");
        addColor(greenCells, "#C7E9B0");
        addColor(blueCells, "#C0DBEA");
        addColor(yellowCells, "#FEFF86");
    });
}

function move(currentDice, randomNumber) {
    if (currentDice.className == "redDice") {
        var currentplayer = null; // or undefined
        for (var i = 0; i < document.querySelectorAll(".redplayer").length; i++) {
            temp = i;
            tempId = document.querySelectorAll(".redplayer")[temp].id
            if (redi[i] === -1){
                console.log(redi[i]);
                currentplayer = document.querySelectorAll(".redplayer")[temp];
                redi[i] += 1;
                currentplayer.addEventListener("click", function () {
                    
                    console.log(redi)
                    //console.log(redPath[redi])
                    addPlayer([redPath[redi[temp]]], "red");
                    removePlayer([currentplayer.id.substring(3)]);
                    
            });
            console.log('ready go')
            }
            
            else if (redi[i] >= 0){
                console.log('click')
                currentplayer = document.querySelectorAll(".redplayer")[temp];
                currentplayer.addEventListener("click", function () {
                    redi[temp] += randomNumber;
                    console.log(redi[temp])
                    console.log(redPath[redi[temp]])
                    addPlayer([redPath[redi[temp]]], "red");
                    removePlayer([currentplayer.id.substring(3)]);
                });
                
            }
        }
        
        
    }
    if (currentDice.className == "greenDice") {
        console.log('be heargreen')
        for (var i = 0; i < document.querySelectorAll(".greenplayer").length; i++) {
            if (greeni === -1){
                greeni += 1;
                var currentplayer = document.querySelectorAll(".greenplayer")[i];
                currentplayer.addEventListener("click", function () {
                    console.log(greeni)
                    console.log(greenPath[greeni])
                    addPlayer([greenPath[greeni]], "green");
                    removePlayer([currentplayer.id.substring(5)]);
                    temp2 = i-1;
                    console.log(temp2)
            });
            }
            console.log('be hear')
            if (greeni >=0){
                console.log('yes')
                var currentplayer = document.querySelectorAll(".greenplayer")[temp2];
                currentplayer.addEventListener("click", function () {
                    console.log(greeni)
                    console.log(greeni+randomNumber)
                    console.log(greenPath[greeni+randomNumber])
                    addPlayer([greenPath[greeni+randomNumber]], "green");
                    removePlayer([currentplayer.id.substring(5)]);
                    greeni += randomNumber;
                    
                });
                
            }
            
        }
        
    }
    if (currentDice.className == "blueDice") {
        for (var i = 0; i < document.querySelectorAll(".blueplayer").length; i++) {
            if (bluei === 0){
                var currentplayer = document.querySelectorAll(".blueplayer")[i];
                currentplayer.addEventListener("click", function () {
                addPlayer([bluePath[bluei]], "blue");
                removePlayer([currentplayer.id.substring(4)]);
            });
            }
            else{
                var currentplayer = document.querySelectorAll(".blueplayer")[i];
                currentplayer.addEventListener("click", function () {
                    addPlayer([bluePath[bluei+randomNumber]], "blue");
                    removePlayer([currentplayer.id.substring(4)]);
                });
                bluei += randomNumber;
            }
        }
    }
    if (currentDice.className == "yellowDice") {
        for (var i = 0; i < document.querySelectorAll(".yellowplayer").length; i++) {
            if (yellowi === 0){
                var currentplayer = document.querySelectorAll(".yellowplayer")[i];
                currentplayer.addEventListener("click", function () {
                addPlayer([yellowPath[yellowi]], "yellow");
                removePlayer([currentplayer.id.substring(6)]);
            });
            }
            else{
                var currentplayer = document.querySelectorAll(".yellowplayer")[i];
                currentplayer.addEventListener("click", function () {
                    addPlayer([yellowPath[yellowi+randomNumber]], "yellow");
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
    if (startingDice.value < randomNumber) {
        startingDice.name = e.target.className;
        startingDice.value = randomNumber;
    }
    var randomDiceImage = "dice" + randomNumber + ".png"; //dice1.png - dice6.png
    var randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png
    e.target.setAttribute("src", randomImageSource);
    //After first round, check if the current dice is 6
    if (roundNum >= currentStatus.length && randomNumber === 6) {
        move(e.target, randomNumber);
        secondRoundTrigger = true;
        return 0;
    }
    if (secondRoundTrigger){
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

