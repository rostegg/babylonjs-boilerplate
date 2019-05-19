import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import img from './../assets/textures/amiga.jpg'
import vertShader from './../shaders/shader.vert'
import fragShader from './../shaders/shader.frag'

export default class Game {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.engine = new BABYLON.Engine(this.canvas, true)
    this.time = 0
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

    BABYLON.MeshBuilder.CreateGround('ground',
      {width: 6, height: 6, subdivisions: 2}, this.scene)

    BABYLON.Effect.ShadersStore['customVertexShader'] = vertShader
    BABYLON.Effect.ShadersStore['customFragmentShader'] = fragShader

    const shaderMaterial = new BABYLON.ShaderMaterial('shader', this.scene, {
      vertex: 'custom',
      fragment: 'custom'
    },
    {
      attributes: ['position', 'normal', 'uv'],
      uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection']
    })

    const mainTexture = new BABYLON.Texture(img, this.scene)
    shaderMaterial.setTexture('textureSampler', mainTexture)
    shaderMaterial.setFloat('time', 0)
    shaderMaterial.setVector3('cameraPosition', BABYLON.Vector3.Zero())
    sphere.material = shaderMaterial
  }

  doRender () {
    this.engine.runRenderLoop(() => {
      const shaderMaterial = this.scene.getMaterialByName('shader')
      shaderMaterial.setFloat('time', this.time)
      this.time += 0.02

      shaderMaterial.setVector3('cameraPosition', this.scene.activeCamera.position)
      this.scene.render()
    })

    window.addEventListener('resize', () => {
      this.engine.resize()
    })
  }
}
