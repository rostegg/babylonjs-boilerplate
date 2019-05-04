import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

export default class Game {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.engine = new BABYLON.Engine(this.canvas, true)
    this.scene = {}
    this.camera = {}
    this.light = {}
  }

  createScene () {
    this.scene = new BABYLON.Scene(this.engine)

    this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.scene)
    this.camera.setTarget(BABYLON.Vector3.Zero())
    this.camera.attachControl(this.canvas, false)
    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene)

    let sphere = BABYLON.MeshBuilder.CreateSphere('sphere',
      {segments: 16, diameter: 2}, this.scene)
    sphere.position.y = 1
    // Create a built-in "ground" shape.
    BABYLON.MeshBuilder.CreateGround('ground',
      {width: 6, height: 6, subdivisions: 2}, this.scene)
  }

  doRender () {
    this.engine.runRenderLoop(() => {
      this.scene.render()
    })

    // The canvas/window resize event handler.
    window.addEventListener('resize', () => {
      this.engine.resize()
    })
  }
}
