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

const colors = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
var gamePattern = []
var userClickedPattern = []
var level = 0
var start = false

// Generate next pattern
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 16)
  var randomColour = colors[randomNumber]
  gamePattern.push(randomColour)
}

// Create the animation of button when pressed
function animatePress(colour) {
  $("#" + colour).addClass("pressed")

  setTimeout(function() {
    $("#" + colour).removeClass("pressed")
  }, 100)
}

// To show the pattern for the player to follow
function showGamePattern() {

  let start = 0
  let pattern = setInterval(thisFunction, 1000)

  function thisFunction() {
    if (start < gamePattern.length) {
      var currentColour = gamePattern[start]
      animatePress(currentColour)
      start++
    }
    else {
      clearInterval(pattern)
    }
  }
}

// To check if userClickedPattern contains inside gamePattern
function subList() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) return false
  }

  return true
}

// To reset the game when its game over
function gameOver() {
  level = 0
  userClickedPattern = []
  gamePattern = []
  start = false

  $('body').addClass("lose")
  $('p').text("Game Over!!")

  setTimeout(function() {
    $('body').removeClass("lose")
    $('p').text("Press any key to restart")
  }, 1000)
}

// Handle any mouse click event on the buttons
$('.btn').on("click", function(event) {
  if (start) {

    // To get the ID of the button
    var userClickedButtonColour = event.target.id

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
      $(".header").text("Level " + level)
    }

    // If there is a difference between userClickedPattern and gamePattern
    else if (!subList()) {

      // Initiate gameOver and reset the game
      gameOver()
    }
  }
})
