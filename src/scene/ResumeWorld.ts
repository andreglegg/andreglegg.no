import { Clock, Mesh, Scene } from 'three'
import type { PerspectiveCamera, WebGLRenderer } from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { createCamera } from '@/scene/core/createCamera'
import { createControls } from '@/scene/core/createControls'
import { createRenderer } from '@/scene/core/createRenderer'
import { createScene } from '@/scene/core/createScene'
import { addLights } from '@/scene/environment/addLights'
import { BoatController } from '@/scene/environment/BoatController'
import { createBoat } from '@/scene/environment/createBoat'
import { createIslands } from '@/scene/environment/createIslands'
import { createWater } from '@/scene/environment/createWater'
import { loadSceneAssets } from '@/scene/loaders/loadSceneAssets'
import { AnimatedMaterialRegistry } from '@/scene/materials/AnimatedMaterialRegistry'

export class ResumeWorld {
  private readonly canvas: HTMLCanvasElement
  private readonly renderer: WebGLRenderer
  private readonly scene: Scene
  private readonly camera: PerspectiveCamera
  private readonly controls: OrbitControls
  private readonly clock = new Clock()
  private readonly animatedMaterials = new AnimatedMaterialRegistry()
  private readonly resizeObserver: ResizeObserver | null
  private fallbackResizeListenerAttached = false

  private boatController: BoatController | null = null
  private animationHandle: number | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.renderer = createRenderer(canvas)
    this.scene = createScene()
    this.camera = createCamera(canvas)
    this.controls = createControls(this.camera, canvas)
    this.resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => this.handleResize())

    addLights(this.scene)
    this.observeCanvas()
    this.handleResize()

    void this.load()
  }

  private observeCanvas() {
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.canvas)
    } else if (!this.fallbackResizeListenerAttached) {
      window.addEventListener('resize', this.handleResize)
      this.fallbackResizeListenerAttached = true
    }
  }

  private async load() {
    try {
      const assets = await loadSceneAssets()

      const water = createWater(this.animatedMaterials)
      this.scene.add(water)

      const { groups: islands, targetPosition } = createIslands({
        terrainScene: assets.terrain,
        rocksScene: assets.rocks,
        registry: this.animatedMaterials,
      })
      islands.forEach((group) => this.scene.add(group))

      this.boatController = createBoat(assets.boat)
      this.scene.add(this.boatController.object)

      if (targetPosition) {
        this.boatController.setTarget(targetPosition)
      }

      this.start()
    } catch (error) {
      console.error('Failed to load world', error)
    }
  }

  private start() {
    if (this.animationHandle !== null) return

    this.clock.start()
    this.animationHandle = requestAnimationFrame(this.animate)
  }

  private animate = () => {
    const elapsed = this.clock.getElapsedTime()

    this.animatedMaterials.update(elapsed)
    this.boatController?.update(elapsed)

    this.controls.update()
    this.renderer.render(this.scene, this.camera)

    this.animationHandle = requestAnimationFrame(this.animate)
  }

  private handleResize = () => {
    const { clientWidth, clientHeight } = this.canvas
    if (!clientWidth || !clientHeight) return

    this.renderer.setSize(clientWidth, clientHeight, false)
    this.camera.aspect = clientWidth / clientHeight
    this.camera.updateProjectionMatrix()
  }

  dispose() {
    if (this.animationHandle !== null) {
      cancelAnimationFrame(this.animationHandle)
      this.animationHandle = null
    }

    this.clock.stop()

    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    } else if (this.fallbackResizeListenerAttached) {
      window.removeEventListener('resize', this.handleResize)
      this.fallbackResizeListenerAttached = false
    }

    this.controls.dispose()
    this.renderer.dispose()

    this.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose()

        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose())
        } else if (child.material) {
          child.material.dispose()
        }
      }
    })

    this.animatedMaterials.clear()
  }
}
