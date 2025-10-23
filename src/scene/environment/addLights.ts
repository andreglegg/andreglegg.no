import { AmbientLight, DirectionalLight, Scene } from 'three'

export function addLights(scene: Scene) {
  const ambient = new AmbientLight(0xffffff, 0.9)
  const directional = new DirectionalLight(0xfff5de, 2.6)

  directional.position.set(26, 38, 18)
  directional.castShadow = true
  directional.shadow.mapSize.set(2048, 2048)
  directional.shadow.camera.near = 1
  directional.shadow.camera.far = 180
  directional.shadow.bias = -0.0008

  scene.add(ambient, directional)
}
