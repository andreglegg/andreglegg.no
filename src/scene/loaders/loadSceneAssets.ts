import type { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export interface SceneAssets {
  terrain: Group
  rocks: Group
  boat: Group
}

const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/v1/decoders/'

export async function loadSceneAssets(): Promise<SceneAssets> {
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()

  dracoLoader.setDecoderPath(DRACO_DECODER_PATH)
  loader.setDRACOLoader(dracoLoader)

  try {
    const [terrainGLTF, rocksGLTF, boatGLTF] = await Promise.all([
      loader.loadAsync('/models/terrain.glb'),
      loader.loadAsync('/models/rocks.glb'),
      loader.loadAsync('/models/boat.gltf'),
    ])

    return {
      terrain: terrainGLTF.scene,
      rocks: rocksGLTF.scene,
      boat: boatGLTF.scene,
    }
  } finally {
    dracoLoader.dispose()
  }
}
