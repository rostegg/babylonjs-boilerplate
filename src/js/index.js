import Game from './Game.js'

window.addEventListener('DOMContentLoaded', () => {
  let game = new Game('babylonCanvas')

  game.createScene()

  game.doRender()
})
