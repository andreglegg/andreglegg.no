import { Mesh, MeshStandardMaterial, PlaneGeometry, Vector3 } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import { COLORS, WATER_LEVEL, WAVE_AMPLITUDE, WAVE_SPEED, WORLD_SCALE } from '@/scene/constants/environment'
import { AnimatedMaterialRegistry } from '@/scene/materials/AnimatedMaterialRegistry'
import waterVertex from '@/scene/experience/Water/shaders/vertex.glsl'
import waterFragment from '@/scene/experience/Water/shaders/fragment.glsl'
import { ISLAND_CONFIGS } from '@/scene/experience/islands.config'

const MAX_ISLAND_UNIFORMS = 8 // Mirrors MAX_ISLANDS in water fragment shader

export function createWater(registry: AnimatedMaterialRegistry) {
  const waterSize = 256 * Math.max(1, WORLD_SCALE * 1.8)
  const geometry = new PlaneGeometry(waterSize, waterSize)
  const islandCount = Math.min(ISLAND_CONFIGS.length, MAX_ISLAND_UNIFORMS)
  const islandCenters = Array.from({ length: MAX_ISLAND_UNIFORMS }, (_, index) => {
    const config = ISLAND_CONFIGS[index]
    if (!config) {
      return new Vector3()
    }

    const [x, y, z] = config.position
    return new Vector3(x * WORLD_SCALE, y, z * WORLD_SCALE)
  })

  const material = new CustomShaderMaterial({
    baseMaterial: MeshStandardMaterial,
    color: COLORS.waterNear.clone(),
    vertexShader: waterVertex,
    fragmentShader: waterFragment,
    uniforms: {
      uTime: { value: 0 },
      uColorFar: { value: COLORS.waterFar.clone() },
      uFoamColor: { value: COLORS.foam.clone() },
      uWaveSpeed: { value: WAVE_SPEED },
      uWaveAmplitude: { value: WAVE_AMPLITUDE },
      uTextureSize: { value: 25 },
      uIslandCount: { value: islandCount },
      uIslandCenters: { value: islandCenters },
      uIslandRadius: { value: 38 },
    },
    transparent: true,
  })

  registry.add(material, ['uTime'])

  const mesh = new Mesh(geometry, material as unknown as MeshStandardMaterial)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.y = WATER_LEVEL
  mesh.receiveShadow = true

  return mesh
}
