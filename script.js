// id for buttons
const one = document.querySelector('.red')
const two = document.querySelector('.green')
const three = document.querySelector('.blue')
const four = document.querySelector('.yellow')
const five = document.querySelector('.orange')
const six = document.querySelector('.purple')
const seven = document.querySelector('.cyan')
const eight = document.querySelector('.indigo')
const nine = document.querySelector('.coral')
const ten = document.querySelector('.maroon')
const eleven = document.querySelector('.seagreen')
const twelve = document.querySelector('.grey')
const thirteen = document.querySelector('.salmon')
const fourteen = document.querySelector('.olive')
const fifteen = document.querySelector('.navy')
const sixteen = document.querySelector('.saddlebrown')

const colors = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen]

let gamePattern = []
let userClickedPattern = []
let level = 0
let start = false

// Generate next pattern
function nextSequence () {
  const randomNumber = Math.floor(Math.random() * 16)
  const randomColour = colors[randomNumber]
  gamePattern.push(randomColour)
}

// Create the animation of button when pressed
function animatePress (colors) {
  document.getElementsByClassName('#' + colors).addClass('.pressed')

  setTimeout(function () {
    document.getElementsByClassName('#' + colors).removeClass('.pressed')
  }, 100)
}

// To show the pattern for the player to follow
function showGamePattern () {
  let start = 0
  const pattern = setInterval(thisFunction, 1000)

  function thisFunction () {
    if (start < gamePattern.length) {
      const currentColour = gamePattern[start]
      animatePress(currentColour)
      start++
    } else {
      clearInterval(pattern)
    }
  }
}

// To check if userClickedPattern contains inside gamePattern
function subList () {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) return false
  }

  return true
}

// To reset the game when its game over
function gameOver () {
  level = 0
  userClickedPattern = []
  gamePattern = []
  start = false

  document.getElementsByClassName('body').addClass('lose')
  document.getElementsByClassName('p').text('Game Over!!')

  setTimeout(function () {
    document.getElementsByClassName('body').removeClass('lose')
    document.getElementsByClassName('p').text('Press any key to restart')
  }, 1000)
}

// Handle any mouse click event on the buttons
document.getElementById.onclick = function () {
  if (start) {
    // To get the ID of the button
    const userClickedButtonColour = event.target.id

    // Animation and sound when a button is pressed
    animatePress(userClickedButtonColour)

    userClickedPattern.push(userClickedButtonColour)

    // To check if the userClickedPattern is equal to gamePattern
    if (subList() && userClickedPattern.length === gamePattern.length) {
      // If its true, run the code below to go to the next level
      level++
      userClickedPattern = []
      nextSequence()
      showGamePattern()
      document.getElementsByClassName('.header').text('Level' + level)
    } else if (!subList()) {
      // If there is a difference between userClickedPattern and gamePattern
      // Initiate gameOver and reset the game
      gameOver()
    }
  }
}
