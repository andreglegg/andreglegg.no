import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import { COLORS, WATER_LEVEL, WAVE_AMPLITUDE, WAVE_SPEED } from '@/scene/constants/environment'
import { AnimatedMaterialRegistry } from '@/scene/materials/AnimatedMaterialRegistry'
import waterVertex from '@/scene/experience/Water/shaders/vertex.glsl'
import waterFragment from '@/scene/experience/Water/shaders/fragment.glsl'

export function createWater(registry: AnimatedMaterialRegistry) {
  const geometry = new PlaneGeometry(256, 256, 256, 256)
  const material = new CustomShaderMaterial({
    baseMaterial: MeshStandardMaterial,
    color: COLORS.waterNear.clone(),
    vertexShader: waterVertex,
    fragmentShader: waterFragment,
    uniforms: {
      uTime: { value: 0 },
      uColorFar: { value: COLORS.waterFar.clone() },
      uTextureSize: { value: 45 },
      uWaveSpeed: { value: WAVE_SPEED },
      uWaveAmplitude: { value: WAVE_AMPLITUDE },
    },
  })

  registry.add(material, ['uTime'])

  const mesh = new Mesh(geometry, material as unknown as MeshStandardMaterial)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.y = WATER_LEVEL
  mesh.receiveShadow = true

  return mesh
}
