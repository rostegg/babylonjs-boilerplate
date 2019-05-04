import Game from './components/Game'

window.addEventListener('DOMContentLoaded', () => {
  let game = new Game('babylonCanvas')

  game.createScene()

  game.doRender()
})
