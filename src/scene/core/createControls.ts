import type { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.maxPolarAngle = Math.PI / 2.15
  controls.target.set(0, 6, 0)
  controls.update()
  return controls
}
