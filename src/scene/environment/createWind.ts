import {
  AdditiveBlending,
  CatmullRomCurve3,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  TubeGeometry,
  Vector3,
} from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import { COLORS, WORLD_SCALE } from '@/scene/constants/environment'
import { AnimatedMaterialRegistry } from '@/scene/materials/AnimatedMaterialRegistry'
import { WIND_PATH_CONFIGS } from '@/scene/experience/wind.config'
import windVertex from '@/scene/experience/Wind/shaders/vertex.glsl'
import windFragment from '@/scene/experience/Wind/shaders/fragment.glsl'

function createDeterministicRandom(seed: number) {
  let state = seed
  return () => {
    state += 1
    const x = Math.sin(state) * 43758.5453123
    return x - Math.floor(x)
  }
}

function centeredRandom(rand: () => number) {
  return rand() * 2 - 1
}

export function createWind(registry: AnimatedMaterialRegistry) {
  const windGroup = new Group()

  WIND_PATH_CONFIGS.forEach((config, index) => {
    if (config.points.length < 2) return

    const instances = Math.max(1, config.instances ?? 1)
    const isClosed = config.closed ?? false

    for (let instance = 0; instance < instances; instance++) {
      const seedBase = index * 97.913 + instance * 37.719 + (config.offset ?? 0) * 11.3
      const rand = createDeterministicRandom(seedBase)

      const positionJitter = (config.jitter?.position ?? 0) * WORLD_SCALE
      const heightJitter = config.jitter?.height ?? 0
      const curveJitter = (config.jitter?.curve ?? 0) * WORLD_SCALE
      const rotationMax = ((config.jitter?.rotation ?? 0) * Math.PI) / 180
      const rotation = rotationMax ? centeredRandom(rand) * rotationMax : 0
      const cosRot = Math.cos(rotation)
      const sinRot = Math.sin(rotation)
      const offsetX = positionJitter ? centeredRandom(rand) * positionJitter : 0
      const offsetZ = positionJitter ? centeredRandom(rand) * positionJitter : 0

      const points = config.points.map(([x, y, z]) => {
        const jitterX = curveJitter ? centeredRandom(rand) * curveJitter : 0
        const jitterZ = curveJitter ? centeredRandom(rand) * curveJitter : 0

        const scaledX = x * WORLD_SCALE + jitterX
        const scaledZ = z * WORLD_SCALE + jitterZ

        const rotatedX = scaledX * cosRot - scaledZ * sinRot
        const rotatedZ = scaledX * sinRot + scaledZ * cosRot

        const finalX = rotatedX + offsetX
        const finalZ = rotatedZ + offsetZ
        const finalY = y + (heightJitter ? centeredRandom(rand) * heightJitter : 0)

        return new Vector3(finalX, finalY, finalZ)
      })

      const curve = new CatmullRomCurve3(points, isClosed, 'centripetal')
      const tubularSegments = Math.max(140, Math.floor(curve.getLength()))
      const radius = (config.radius ?? 0.5) * WORLD_SCALE * 0.55
      const geometry = new TubeGeometry(curve, tubularSegments, radius, 20, isClosed)

      geometry.scale(1.35, 1, 1.35)

      const spawnRate = Math.max(0.2, config.spawnRate ?? 1)
      const rawDirection = config.direction ?? 1
      const direction = rawDirection >= 0 ? 1 : -1
      const trailMin = Math.max(0.05, config.trailLengthMin ?? config.trailLength ?? 0.18)
      const baseTrailMax = config.trailLengthMax ?? config.trailLength ?? trailMin * 1.25
      const trailMax = Math.max(trailMin + 0.02, baseTrailMax)
      const seed = seedBase + centeredRandom(rand) * 13.57

      const material = new CustomShaderMaterial({
        baseMaterial: MeshStandardMaterial,
        color: COLORS.wind.clone(),
        vertexShader: windVertex,
        fragmentShader: windFragment,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: config.speed ?? 0.1 },
          uOffset: { value: config.offset ?? 0 },
          uSpawnRate: { value: spawnRate },
          uDirection: { value: direction },
          uMinTrail: { value: trailMin },
          uMaxTrail: { value: trailMax },
          uBaseStrength: { value: config.baseStrength ?? 0.18 },
          uHighlightStrength: { value: config.highlightStrength ?? 0.85 },
          uWrap: { value: isClosed ? 1 : 0 },
          uSeed: { value: seed },
        },
      })

      material.transparent = true
      material.depthWrite = false
      material.depthTest = true
      material.blending = AdditiveBlending
      material.side = DoubleSide

      registry.add(material, ['uTime'])

      const mesh = new Mesh(geometry, material as unknown as MeshStandardMaterial)
      mesh.renderOrder = 10 + index * 8 + instance

      windGroup.add(mesh)
    }
  })

  return windGroup
}
