import { Clock, Group, Mesh, Scene } from 'three'
import type { PerspectiveCamera, WebGLRenderer } from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'

import { createCamera } from '@/scene/core/createCamera'
import { createControls } from '@/scene/core/createControls'
import { createRenderer } from '@/scene/core/createRenderer'
import { createScene } from '@/scene/core/createScene'
import { addLights } from '@/scene/environment/addLights'
import { BoatController } from '@/scene/environment/BoatController'
import { createBoat } from '@/scene/environment/createBoat'
import { createIslands } from '@/scene/environment/createIslands'
import { createWater } from '@/scene/environment/createWater'
import { createWind } from '@/scene/environment/createWind'
import { ENABLE_WIND } from '@/scene/constants/environment'
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
  private stats: Stats | null = null
  private statsVisible = false

  private boatController: BoatController | null = null
  private windGroup: Group | null = null
  private windEnabled = ENABLE_WIND
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
    window.addEventListener('keydown', this.handleKeyDown)

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

      if (ENABLE_WIND && !this.windGroup) {
        const wind = createWind(this.animatedMaterials)
        wind.visible = this.windEnabled
        this.windGroup = wind
        this.scene.add(wind)
      }

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

    this.stats?.begin()
    this.animatedMaterials.update(elapsed)
    this.boatController?.update(elapsed)

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.stats?.end()

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
    window.removeEventListener('keydown', this.handleKeyDown)
    this.disableStats()

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
    this.windGroup = null
  }

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (!event.altKey) return

    const key = event.key.toLowerCase()
    if (key === 'f') {
      event.preventDefault()
      this.toggleStats()
    } else if (key === 'w') {
      event.preventDefault()
      this.toggleWind()
    }
  }

  private toggleStats() {
    if (this.statsVisible) {
      this.disableStats()
    } else {
      this.enableStats()
    }
  }

  private enableStats() {
    if (this.statsVisible) return

    const stats = new Stats()
    stats.showPanel(0)
    stats.dom.style.position = 'fixed'
    stats.dom.style.left = '0'
    stats.dom.style.top = '0'
    stats.dom.style.zIndex = '10000'
    document.body.appendChild(stats.dom)

    this.stats = stats
    this.statsVisible = true
  }

  private disableStats() {
    if (!this.statsVisible || !this.stats) return

    this.stats.dom.remove()
    this.stats = null
    this.statsVisible = false
  }

  private toggleWind() {
    this.setWindEnabled(!this.windEnabled)
  }

  setWindEnabled(enabled: boolean) {
    this.windEnabled = enabled
    if (this.windGroup) {
      this.windGroup.visible = enabled
    } else if (enabled && ENABLE_WIND) {
      // If wind was not created yet (e.g. toggled before load), create it once assets are ready
      const wind = createWind(this.animatedMaterials)
      wind.visible = true
      this.windGroup = wind
      this.scene.add(wind)
    }
  }
}
