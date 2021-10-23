const gameData = {
    "end": false,
    "currentPlayer": "-",
    "fieldID": ["f_1", "f_2", "f_3", "f_4", "f_5", "f_6", "f_7", "f_8", "f_9"],
    "field": ["minus", "minus", "minus", "minus", "minus", "minus", "minus", "minus", "minus"],
    "winner": "-"
}
const img = {
    "minus": "asstes/img/minus.jpg",
    "x": "asstes/img/x.jpg",
    "o": "asstes/img/o.png"
}

const winPatterns = [
    [   "w", "w", "w",
        "-", "-", "-",
        "-", "-", "-"],

    [   "-", "-", "-",
        "w", "w", "w",
        "-", "-", "-"],

    [   "-", "-", "-",
        "-", "-", "-",
        "w", "w", "w"],

    [   "w", "-", "-",
        "-", "w", "-",
        "-", "-", "w"],

    [   "-", "-", "w",
        "-", "w", "-",
        "w", "-", "-"],

    [   "w", "-", "-",
        "w", "-", "-",
        "w", "-", "-"],

    [   "-", "w", "-",
        "-", "w", "-",
        "-", "w", "-"],

    [   "-", "-", "w",
        "-", "-", "w",
        "-", "-", "w"]

]
//FUNCTIONS

function init() {
    let choose = Math.floor(Math.random())

    if(choose >= 0.5){
        gameData.currentPlayer = "o"
    } else {
        gameData.currentPlayer = "x"
    }

    gameData.end = false

    render()
}

function render() {
    let currentPlayer = document.querySelector("#currentPlayer")
    currentPlayer.innerHTML = gameData.currentPlayer.toUpperCase()

    let i = 0
    gameData.fieldID.forEach(e => {
        let elem = document.querySelector("#"+e)
        elem.innerHTML = "<img class='fieldPic' src='"+ img[gameData.field[i]] +"' />"

        i += 1
    })
}

function start() {
    startScreen = document.querySelector("#startScreen")
    playScreen = document.querySelector("#playScreen")

    startScreen.classList.add("d-none")
    playScreen.classList.remove("d-none")

    init()
}

function end() {
    let endScreen = document.querySelector("#endScreen")
    let winnerSpan = document.querySelector("#winner")
    let currH = document.querySelector("#currH")

    endScreen.classList.remove("d-none")
    currH.classList.add("d-none")
    winnerSpan.innerHTML = gameData.currentPlayer.toUpperCase()

    gameData.end = true;
}

function check(){
    let tmpField = []
    gameData.field.forEach(e => {
        if(e === gameData.currentPlayer){
            tmpField.push("w")
        } else {
            tmpField.push("-")
        }
    })
    console.log(tmpField)

    winPatterns.forEach(e => {
        if(e === tmpField){
            end()
            return true
        }
    })

    return false
}

function setMark(field, element) {
    if(element.dataset.locked === "true" || gameData.end === true){
        alert("Gesperrt!")
        return
    }

    gameData.field[field] = gameData.currentPlayer
    element.dataset.locked = "true"

    render()
    check()

    if(gameData.currentPlayer === "x"){
        gameData.currentPlayer = "o"
    }
    if(gameData.currentPlayer === "o") {
        gameData.currentPlayer = "x"
    }
}
