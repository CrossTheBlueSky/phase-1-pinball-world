let currentGame
const scoreForm = document.getElementById("high-score-form")
scoreForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    updateScore(currentGame, e.target[0].value)
})

function initialize(){

    fetch("http://localhost:3000/games")
        .then((res)=> res.json())
        .then((data)=>{
            renderGamesList(data)
            renderGame(data[0])
        })
}

function renderGamesList(data){

    const gameList = document.querySelector(".game-list")
    data.forEach((game)=>{
        const newGame = document.createElement("h5")
        newGame.innerText = `${game.name} (${game.manufacturer_name})`
        newGame.addEventListener("click", ()=>{
            currentGame = game
            renderGame(game)
        })
        gameList.append(newGame)

    })
}

function renderGame(game){

    const image = document.getElementById("detail-image")
    const title = document.getElementById("detail-title")
    const highScore = document.getElementById("detail-high-score")

    title.innerText = `${game.name}`
    image.src = `${game.image}`
    highScore.innerText = `${game.high_score}`


}

function updateScore(game, score){

    const newScore = {high_score : parseInt(score)}

    fetch(`http://localhost:3000/games/${game.id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newScore)})
    .then(res => res.json())
    .then((data )=> {
        renderGame(data)
        console.log(data)
    })
}


initialize()