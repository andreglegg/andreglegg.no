import { PerspectiveCamera } from 'three'

export function createCamera(canvas: HTMLCanvasElement) {
  const aspect = canvas.clientWidth / canvas.clientHeight
  const camera = new PerspectiveCamera(45, aspect, 0.1, 500)
  camera.position.set(45, 28, 85)
  return camera
}
