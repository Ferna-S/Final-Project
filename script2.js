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

const getRandomPanel = () => {
  const panels = [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen
  ]
  return panels[parseInt(Math.random() * panels.length)]
}

const sequence = [getRandomPanel()]
let sequenceToGuess = [...sequence]

const flash = panel => {
  return new Promise((resolve, reject) => {
    panel.className += ' active'
    setTimeout(() => {
      panel.className = panel.className.replace(
        ' active',
        ''
      )
      setTimeout(() => {
        resolve()
      }, 200)
    }, 500)
  })
}

let canClick = false

const panelClicked = panelClicked => {
  if (!canClick) return
  const expectedPanel = sequenceToGuess.shift()
  if (expectedPanel === panelClicked) {
    if (sequenceToGuess.length === 0) {
      // the start of a new round
      sequence.push(getRandomPanel())
      sequenceToGuess = [...sequence]
      startFlashing()
    }
  } else {
    // end of game
    alert('Game Over!')
  }
}

const startFlashing = async () => {
  canClick = false
  for (const panel of sequence) {
    await flash(panel)
  }
  canClick = true
}

startFlashing()
