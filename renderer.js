const electron = require('electron')

let clock = document.getElementById('clock')
let dot = document.getElementById('dot')
let hourHand = document.getElementById('hour-hand')
let minuteHand = document.getElementById('minute-hand')
let hourLabels = document.getElementById('hour-labels')
let dialLines = document.getElementById('dial-lines')
let answer = document.getElementById('answer')
let toggleRounds = document.getElementsByClassName('round')
let lines = document.getElementsByClassName('line')
let hours, minutes, hasRequestedTime = false, showNumbers = true, round = false

electron.ipcRenderer.on('toggleNumbers', (event) => {
  showNumbers = !showNumbers
  toggleElement(hourLabels, showNumbers)
  resetClock()
})

electron.ipcRenderer.on('roundTo', (event, num) => {
  round = num
  resetClock()
})

function clickClock (event) {
  event.preventDefault()
  if (hasRequestedTime) {
    hasRequestedTime = false
    return showAnswer()
  }
  drawClock()
}

function resetClock () {
  hasRequestedTime = false
  drawClock()
}

function showAnswer () {
  answer.innerHTML = hours + ':' + minutes
  answer.style.opacity = '1'
}

function hideAnswer () {
  answer.innerHTML = '?'
  answer.style.opacity = '.3'
}

function init () {
  for (let i = 0; i < 60; i++) {
    dialLines.innerHTML += "<div class='line'></div>"
    lines[i].style.transform = "rotate(" + 6 * i + "deg)"
  }

  for (let i = 1; i < 13; i++) {
    hourLabels.innerHTML += "<div class='label'>" + i + "</div>"
  }

  clock.addEventListener('click', clickClock)
}

function getRounded (num) {
  if (!round) return num
  if (round === 5) return Math.floor(num/5) * 5
  if (round === 15) return Math.floor(num/15) * 15
  return num
}

function drawClock () {
  hideAnswer ()
  hours = Math.floor(Math.random() * 12)
  minutes = getRounded(Math.floor(Math.random() * 60))
  let hoursDeg = hours * 30 + minutes * (360/720)
  let minutesDeg = minutes * 6 + 0 * (360/3600)
  hourHand.style.transform = "rotate("+hoursDeg+"deg)"
  minuteHand.style.transform = "rotate("+minutesDeg+"deg)"
  if (hours === 0) hours = 12
  if (minutes < 10) minutes = '0' + minutes
  hasRequestedTime = true
}

function toggleElement (el, show) {
  let display = el.style.display === 'block'  ? 'none' : 'block';
  if (typeof show !== 'undefined') display = show ? 'block' : 'none'
  el.style.display = display;
  return false;
}

init()
