import { Fog, Scene } from 'three'
import { COLORS, FOG_FAR, FOG_NEAR } from '@/scene/constants/environment'

export function createScene() {
  const scene = new Scene()
  const background = COLORS.background.clone()

  scene.background = background
  scene.fog = new Fog(background.getHex(), FOG_NEAR, FOG_FAR)

  return scene
}
