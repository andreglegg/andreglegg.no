import { Fog, Scene } from 'three'
import { COLORS } from '@/scene/constants/environment'

export function createScene() {
  const scene = new Scene()
  const background = COLORS.background.clone()

  scene.background = background
  scene.fog = new Fog(background.getHex(), 120, 150)

  return scene
}
