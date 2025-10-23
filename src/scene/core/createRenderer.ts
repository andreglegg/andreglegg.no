import { SRGBColorSpace, WebGLRenderer } from 'three'

export function createRenderer(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
  renderer.outputColorSpace = SRGBColorSpace
  renderer.shadowMap.enabled = true
  return renderer
}
