const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
const sectionBotonReiniciar = document.getElementById("reiniciar")
const botonReintentar = document.getElementById("reintentar")
const audioBase = document.getElementById("miAudio")
const audioGameOver = document.getElementById("gameover")
const audioAcierto = document.getElementById("acierto")
const juego = document.getElementById("juego")


const preguntaUno = document.getElementById("pregunta-uno")
const preguntaDos = document.getElementById("pregunta-dos")
const preguntaTres = document.getElementById("pregunta-tres")
const preguntaCuatro = document.getElementById("pregunta-cuatro")
const preguntaCinco = document.getElementById("pregunta-cinco")
const preguntaSeis = document.getElementById("pregunta-seis")

const inputs = document.getElementsByName("pregunta1")
const inputs2 = document.getElementsByName("pregunta2")
const inputs3 = document.getElementsByName("pregunta3")
const inputs4 = document.getElementsByName("pregunta4")
const inputs5 = document.getElementsByName("pregunta5")
const inputs6 = document.getElementsByName("pregunta6")

//juego.style.display = "none"
sectionBotonReiniciar.style.display = "none"

preguntaUno.style.display = "none"
preguntaDos.style.display = "none"
preguntaTres.style.display = "none"
preguntaCuatro.style.display = "none"
preguntaCinco.style.display = "none"
preguntaSeis.style.display = "none"

let pause = false 
document.getElementById("pause").addEventListener("click", () => {
    pause = !pause
  })
  document.addEventListener("keydown", (event) => {
    if (event.key === "p") {
      pause = !pause;
    }
  })

let mostrarPregunta = false 
let mostrarPregunta2 = false 
let mostrarPregunta3 = false 
let mostrarPregunta4 = false
let mostrarPregunta5 = false
let mostrarPregunta6 = false

let gameOver = false
let foodX, foodY
let snakeX = 5, snakeY = 10
let snakeBody = []
let velocidadX = 0, velocidadY = 0
let setIntervalId
let score = 0
let highScore = localStorage.getItem("high-score" || 0)
highScoreElement.innerHTML = `High Score: ${highScore}` 

const nocheDia = document.getElementById("noche-dia")
const colorSpan = document.getElementById("titulo-nuevo")
nocheDia.addEventListener("change", fondoDiaNoche)
function fondoDiaNoche() {
if (nocheDia.checked) {
    document.body.classList.add("cambio-fondo-dia-noche")
    colorSpan.style.backgroundColor = "#0777a7"
} else {
    document.body.classList.remove("cambio-fondo-dia-noche")
    colorSpan.style.backgroundColor = "#06002e"
}
}

let max = 29
let min = 1

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}

function handleGameOver(){
    clearInterval(setIntervalId)
    sectionBotonReiniciar.style.display = "flex"
    audioGameOver.play()
}

function reiniciarJuego() {
   location.reload()
}

botonReintentar.addEventListener("click", reiniciarJuego)

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocidadY != 1) {
        velocidadX = 0
        velocidadY = -1
    } else if(e.key === "ArrowDown" && velocidadY != -1) {
        velocidadX = 0
        velocidadY = 1
    } else if(e.key === "ArrowLeft" && velocidadX != 1) {
        velocidadX = -1
        velocidadY = 0
    } else if(e.key === "ArrowRight" && velocidadX != -1) {
        velocidadX = 1
        velocidadY = 0
    }

    if(e.key === "w" && velocidadY != 1) {
        velocidadX = 0
        velocidadY = -1
    } else if(e.key === "s" && velocidadY != -1) {
        velocidadX = 0
        velocidadY = 1
    } else if(e.key === "a" && velocidadX != 1) {
        velocidadX = -1
        velocidadY = 0
    } else if(e.key === "d" && velocidadX != -1) {
        velocidadX = 1
        velocidadY = 0
    }

}

const initGame = () => {
    if(!pause){
    if(gameOver) return handleGameOver()
    let htmlMarkUp = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push([foodX, foodY])
        score++
        audioBase.play()
        highScore = score >= highScore ? score : highScore
        localStorage.setItem("high-score", highScore)
        scoreElement.innerHTML = `Score ${score}`
        highScoreElement.innerHTML = `High Score: ${highScore}`
    }

    for(let i = snakeBody.length -1; i > 0; i--) {
        if (snakeBody.length > 5 && mostrarPregunta === false) {
            pause = true
            juego.style.display = "none"
            preguntaUno.style.display = "flex"
            mostrarPregunta = true
            document.getElementById("noche-dia").checked = false
            document.body.classList.remove("cambio-fondo-dia-noche")
            colorSpan.style.backgroundColor = "#06002e"
            document.body.classList.add('cambio-fondo')
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener("click", verificarRespuesta);
            }
        }
        else if (snakeBody.length > 10 && mostrarPregunta2 === false) {
            pause = true
            juego.style.display = "none"
            preguntaDos.style.display = "flex"
            mostrarPregunta2 = true
            document.getElementById("noche-dia").checked = false
            document.body.classList.remove("cambio-fondo-dia-noche")
            colorSpan.style.backgroundColor = "#06002e"
            document.body.classList.add('cambio-fondo')
            for (let i = 0; i < inputs2.length; i++) {
                inputs2[i].addEventListener("click", verificarRespuesta2);
            }
        }
        else if (snakeBody.length > 15 && mostrarPregunta3 === false) {
            pause = true
            juego.style.display = "none"
            preguntaTres.style.display = "flex"
            mostrarPregunta3 = true
            document.getElementById("noche-dia").checked = false
            document.body.classList.remove("cambio-fondo-dia-noche")
            colorSpan.style.backgroundColor = "#06002e"
            document.body.classList.add('cambio-fondo')
            for (let i = 0; i < inputs3.length; i++) {
                inputs3[i].addEventListener("click", verificarRespuesta3);
            }
        }
        else if (snakeBody.length > 20 && mostrarPregunta4 === false) {
            pause = true
            juego.style.display = "none"
            preguntaCuatro.style.display = "flex"
            mostrarPregunta4 = true
            document.getElementById("noche-dia").checked = false
            document.body.classList.remove("cambio-fondo-dia-noche")
            colorSpan.style.backgroundColor = "#06002e"
            document.body.classList.add('cambio-fondo')
            for (let i = 0; i < inputs4.length; i++) {
                inputs4[i].addEventListener("click", verificarRespuesta4);
            }
        }
        else if (snakeBody.length > 25 && mostrarPregunta5 === false) {
            pause = true
            juego.style.display = "none"
            preguntaCinco.style.display = "flex"
            mostrarPregunta5 = true
            document.getElementById("noche-dia").checked = false
            document.body.classList.remove("cambio-fondo-dia-noche")
            colorSpan.style.backgroundColor = "#06002e"
            document.body.classList.add('cambio-fondo')
            for (let i = 0; i < inputs5.length; i++) {
                inputs5[i].addEventListener("click", verificarRespuesta5);
            }
        }
        else if (snakeBody.length > 30 && mostrarPregunta6 === false) {
            pause = true
            juego.style.display = "none"
            preguntaSeis.style.display = "flex"
            mostrarPregunta6 = true
            document.getElementById("noche-dia").checked = false
            document.body.classList.remove("cambio-fondo-dia-noche")
            colorSpan.style.backgroundColor = "#06002e"
            document.body.classList.add('cambio-fondo')
            for (let i = 0; i < inputs6.length; i++) {
                inputs6[i].addEventListener("click", verificarRespuesta6);
            }
        }

        snakeBody[i] = snakeBody[i - 1]
    }
    
    
    snakeBody[0] = [snakeX, snakeY]

    snakeX += velocidadX
    snakeY += velocidadY

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkUp += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true
        }
    }

    playBoard.innerHTML = htmlMarkUp
}

}

function verificarRespuesta() {
    let respuestaCorrecta = document.getElementById("respuesta-correcta1")
    if (respuestaCorrecta.checked) {
        audioAcierto.play()
        juego.style.display = "flex"
        preguntaUno.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        setTimeout(function(){ pause = false}, 3000)
        mostrarImgs()
    } else {
        juego.style.display = "flex"
        preguntaUno.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        handleGameOver()
    }
}

function verificarRespuesta2() {
    let respuestaCorrecta2 = document.getElementById("respuesta-correcta2")
    if (respuestaCorrecta2.checked) {
        audioAcierto.play()
        juego.style.display = "flex"
        preguntaDos.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        setTimeout(function(){ pause = false}, 3000)
        mostrarImgs()
    } else {
        juego.style.display = "flex"
        preguntaDos.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        handleGameOver()
    }
}

function verificarRespuesta3() {
    let respuestaCorrecta3 = document.getElementById("respuesta-correcta3")
    if (respuestaCorrecta3.checked) {
        audioAcierto.play()
        juego.style.display = "flex"
        preguntaTres.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        setTimeout(function(){ pause = false}, 3000)
        mostrarImgs()
    } else {
        juego.style.display = "flex"
        preguntaTres.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        handleGameOver()
    }
}

function verificarRespuesta4() {
    let respuestaCorrecta4 = document.getElementById("respuesta-correcta4")
    if (respuestaCorrecta4.checked) {
        audioAcierto.play()
        juego.style.display = "flex"
        preguntaCuatro.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        setTimeout(function(){ pause = false}, 3000)
        mostrarImgs()
    } else {
        juego.style.display = "flex"
        preguntaCuatro.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        handleGameOver()
    }
}

function verificarRespuesta5() {
    let respuestaCorrecta5 = document.getElementById("respuesta-correcta5")
    if (respuestaCorrecta5.checked) {
        audioAcierto.play()
        juego.style.display = "flex"
        preguntaCinco.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        setTimeout(function(){ pause = false}, 3000)
        mostrarImgs()
    } else {
        juego.style.display = "flex"
        preguntaCinco.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        handleGameOver()
    }
}

function verificarRespuesta6() {
    let respuestaCorrecta6 = document.getElementById("respuesta-correcta6")
    if (respuestaCorrecta6.checked) {
        audioAcierto.play()
        juego.style.display = "flex"
        preguntaSeis.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        setTimeout(function(){ pause = false}, 3000)
        mostrarImgs()
    } else {
        juego.style.display = "flex"
        preguntaSeis.style.display = "none"
        document.body.classList.remove('cambio-fondo')
        handleGameOver()
    }
}

const numeroTres = document.getElementById("numero-tres")
const numeroDos = document.getElementById("numero-dos")
const numeroUno = document.getElementById("numero-uno")
let mostrarTres = false
let mostrarDos = false

function mostrarImgs() {
    numeroTres.classList.add("show")
    setTimeout(() => {
        numeroTres.classList.remove("show");
      }, 1000)
      mostrarTres =true
      if(mostrarTres = true){
        mostrarDos = true
        setTimeout(() => {
            numeroDos.classList.add("show")}, 1000)
        setTimeout(() => {
                numeroDos.classList.remove("show")}, 2000)    
            
        if(mostrarDos = true) {
            setTimeout(() => {
                numeroUno.classList.add("show")}, 2000)
            setTimeout(() => {
                    numeroUno.classList.remove("show")}, 3000)    
            }
      }

   
      


  
}


changeFoodPosition()
//initGame()
setIntervalId = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection)

