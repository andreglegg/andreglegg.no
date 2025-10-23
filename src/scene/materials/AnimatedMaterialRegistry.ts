import type { MeshStandardMaterial } from 'three'
import type { Uniform } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

type UniformName = string

interface AnimatedEntry {
  material: CustomShaderMaterial<typeof MeshStandardMaterial>
  uniforms: UniformName[]
}

export class AnimatedMaterialRegistry {
  private readonly entries: AnimatedEntry[] = []

  add(material: CustomShaderMaterial<typeof MeshStandardMaterial>, uniforms: UniformName[] = ['uTime']) {
    this.entries.push({ material, uniforms })
  }

  update(elapsedSeconds: number) {
    for (const { material, uniforms } of this.entries) {
      const shaderUniforms = material.uniforms ?? {}
      for (const uniformName of uniforms) {
        const uniform = shaderUniforms[uniformName] as Uniform | undefined
        if (uniform) {
          uniform.value = elapsedSeconds
        }
      }
    }
  }

  clear() {
    this.entries.length = 0
  }
}
