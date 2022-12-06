const X_CLASS = 'x' //Using class to not duplicate 'x' through the code
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartGame = document.getElementById('winning-message')
const winningMessage = document.querySelector('[data-winning-message-text]')


let circleTurn //circleTurn is true by default (boolean var)

startGame()

function startGame (){
    circleTurn = false //set first player, in this case 'x' (circletTurn = false)
    cellElements.forEach(cell => {

        cell.addEventListener('click', handleClick, {once: true}) //once: true mean to add event listener only once on cell (if clicked twice nothing happen)

    })
    setBoardHoverClass()
}


function handleClick(e) {
    const cell = e.target 
                          //IF TRUE      RETURN     OTHERWISE
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS //if circleTurn is true then return CIRCLE_CLASS otherwise return X_CLASS
    placeMark(cell, currentClass)
    
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurn()
        setBoardHoverClass()

    }

}

function placeMark(cell, currentClass) {

    cell.classList.add(currentClass) //add 'x' or 'circle' class to html tags

}

function checkWin(currentClass) {

    return WINNING_COMBINATIONS.some(combination => { //return true if any combination is true
        return combination.every (index => { //loop for every combination(element) on WINNING_COMBINATION and get index
            return cellElements[index].classList.contains(currentClass) //check if cell element contains currentClass
        })
    })


}

function endGame(draw) {

    if (draw) {

        winningMessage.innerHTML = "It's a draw!"

    } else {

        winningMessage.innerHTML = `${circleTurn ? "Circle " : "X"} is the winner`

    }
    
    restartGame.classList.add('show')

}

function isDraw () {
            //DECONSTRUCT cellElements and transforms in array
            //for cell looks for class, either circle or x

    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })

}

function switchTurn () {

    circleTurn = !circleTurn //changes between true and false each turn ('click')

}

function setBoardHoverClass (){

    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if (circleTurn) { //if circleTurn is true add CIRCLE class on html tags
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }

}
