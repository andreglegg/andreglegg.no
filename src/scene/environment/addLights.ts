import { AmbientLight, DirectionalLight, Scene } from 'three'

export function addLights(scene: Scene) {
  const ambient = new AmbientLight(0xfff4d7, 0.75)
  const directional = new DirectionalLight(0xffdfa9, 2.4)

  directional.position.set(13, 5, 5)
  directional.castShadow = true
  directional.shadow.mapSize.set(1024, 1024)
  directional.shadow.camera.near = 1
  directional.shadow.camera.far = 180
  directional.shadow.bias = -0.0008

  scene.add(ambient, directional)
}
