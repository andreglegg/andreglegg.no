import { useEffect, useRef } from 'react'
import { ResumeWorld } from '@/scene/ResumeWorld'

export function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const world = new ResumeWorld(canvas)
    return () => {
      world.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="scene-canvas" />
}

export default SceneCanvas
