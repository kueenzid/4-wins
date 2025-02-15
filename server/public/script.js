let state = {
    board: [
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '' ]
    ],
    color: "b",
    hasWinner: false,
    history: []
}

const datakey = "connect4"
const url = "http://localhost:3000/"

function init() {
    document.getElementById("newGame").addEventListener("click", newGame);
    document.getElementById("load").addEventListener("click", loadGame);
    document.getElementById("save").addEventListener("click", saveGame);
    document.getElementById("localLoad").addEventListener("click", loadLocal);
    document.getElementById("localSave").addEventListener("click", saveLocal);
    document.getElementById("undo").addEventListener("click", undo)

    displayColor()
    showWinner()
    showBoard()
}

function showBoard() {
    let board = document.getElementsByClassName("board")[0]
    board.innerHTML = ""
    for(let i = 0; i < 7 * 6; i++) {
        let node = document.createElement("div")
        board.appendChild(node)
        node.classList.add("field")
        node.id = i
        let child = document.createElement("div")
        let value = state.board[Math.floor(i / 7)][i % 7]
        if(value == "r") {
            child.setAttribute("class", "red piece")
        } else if(value == "b") {
            child.setAttribute("class", "blue piece")
        }
        node.appendChild(child)

        if(!state.hasWinner) {
            addListeners()
        }
    }
}

function addListeners() {
    let allFields = document.getElementsByClassName("field")
    for(let i = 0; i < allFields.length; i++) {
    allFields[i].addEventListener("click", clicked)
    }
}

function clicked() {
    let id = this.id
    let column = id % 7
    addIntoColumn(column)
}

function addIntoColumn(column) {
    for(let i = state.board.length - 1; i >= 0; i--) {
        if(state.board[i][column] == "") {
            state.board[i][column] = state.color
            state.history.push(column)
            i = -1
            if(connect4Winner(state.color, state.board)) {
                state.hasWinner = true
                showWinner()
            }
            switchColor()
        }
    }
    showBoard()
}

function switchColor() {
    if(state.color == "r") {
    state.color = "b"
    } else {
    state.color = "r"
    }
    displayColor()
}

function displayColor() {
    document.getElementById("currentColor").innerHTML = state.color == "r" ? "Rot" : "Blau"
}

function newGame() {
    state = {
    board: [
        [ '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '' ],
        [ '', '', '', '', '', '', '' ]
    ],
    color: "r",
    hasWinner: false,
    history: []
    }
    init()
}

function saveGame() {
    let data = JSON.stringify(state)
    fetch(url + "api/data/" + datakey + "?api-key=c4game", {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: data
    })
}

function loadGame() {
    fetch(url + "api/data/" + datakey + "?api-key=c4game")
    .then(response => response.json())
    .then(data => { state = data; showBoard() })
}

function loadLocal() {
    state = JSON.parse(localStorage.getItem("4-Gewinnt"))
    showBoard()
}

function saveLocal() {
    localStorage.setItem("4-Gewinnt", JSON.stringify(state))
}

function undo() {
    if(state.history.length == 0) {
        return
    }
    let column = state.history.pop()
    for(let i = 0; i < state.board.length; i++) {
        if(state.board[i][column] != "") {
            state.board[i][column] = ""
            state.hasWinner = connect4Winner(state.color, state.board)
            showWinner()
            switchColor()
            showBoard()
            break
        }
    }
}

function showWinner() {
    if(state.hasWinner) {
        document.getElementById("winner").innerHTML = state.color == "r" ? "Rot" : "Blau"
    } else {
        document.getElementById("winner").innerHTML = ""
    }
}