import { Group, Mesh, MeshStandardMaterial, PlaneGeometry, Vector3 } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import { COLORS, FOAM_DEPTH, TARGET_ISLAND_ID, WATER_LEVEL, WAVE_AMPLITUDE, WAVE_SPEED, WORLD_SCALE } from '@/scene/constants/environment'
import { AnimatedMaterialRegistry } from '@/scene/materials/AnimatedMaterialRegistry'
import terrainVertex from '@/scene/experience/Terrain/shaders/vertex.glsl'
import terrainFragment from '@/scene/experience/Terrain/shaders/fragment.glsl'
import rocksVertex from '@/scene/experience/Rocks/shaders/vertex.glsl'
import rocksFragment from '@/scene/experience/Rocks/shaders/fragment.glsl'
import { ISLAND_CONFIGS } from '@/scene/experience/islands.config'

interface CreateIslandsOptions {
  terrainScene: Group
  rocksScene: Group
  registry: AnimatedMaterialRegistry
}

export interface IslandsResult {
  groups: Group[]
  targetPosition: Vector3 | null
}

export function createIslands({ terrainScene, rocksScene, registry }: CreateIslandsOptions): IslandsResult {
  const terrainMesh = terrainScene.getObjectByName('plane') as Mesh | null
  const rocksMesh = rocksScene.getObjectByName('rocks') as Mesh | null

  if (!terrainMesh || !rocksMesh) {
    console.warn('Could not locate terrain or rocks mesh in GLTF')
    return { groups: [], targetPosition: null }
  }

  const terrainGeometry = terrainMesh.geometry.clone()
  const rocksGeometry = rocksMesh.geometry.clone()
  const groups: Group[] = []
  let targetPosition: Vector3 | null = null

  ISLAND_CONFIGS.forEach((config) => {
    const islandGroup = new Group()

    const [posX, posY, posZ] = config.position
    islandGroup.position.set(posX * WORLD_SCALE, posY, posZ * WORLD_SCALE)

    if (config.rotation) {
      islandGroup.rotation.set(config.rotation[0], config.rotation[1], config.rotation[2])
    }

    if (config.scale) {
      islandGroup.scale.set(config.scale[0], config.scale[1], config.scale[2])
    }

    const terrainMaterial = new CustomShaderMaterial({
      baseMaterial: MeshStandardMaterial,
      color: COLORS.sand.clone(),
      vertexShader: terrainVertex,
      fragmentShader: terrainFragment,
      uniforms: {
        uTime: { value: 0 },
        uGrassColor: { value: COLORS.grass.clone() },
        uUnderwaterColor: { value: COLORS.underwaterBase.clone() },
        uFoamColor: { value: COLORS.foam.clone() },
        uWaterLevel: { value: WATER_LEVEL },
        uWaveSpeed: { value: WAVE_SPEED },
        uWaveAmplitude: { value: WAVE_AMPLITUDE },
        uFoamDepth: { value: FOAM_DEPTH },
      },
    })

    registry.add(terrainMaterial, ['uTime'])

    const terrain = new Mesh(terrainGeometry.clone(), terrainMaterial as unknown as MeshStandardMaterial)
    terrain.receiveShadow = true
    islandGroup.add(terrain)

    const seabed = new Mesh(
      new PlaneGeometry(256, 256),
      new MeshStandardMaterial({ color: COLORS.underwaterBase.clone() }),
    )
    seabed.rotation.x = -Math.PI / 2
    seabed.position.y = -0.01
    islandGroup.add(seabed)

    if (config.rocks) {
      const rocksMaterial = new CustomShaderMaterial({
        baseMaterial: MeshStandardMaterial,
        color: COLORS.rock.clone(),
        vertexShader: rocksVertex,
        fragmentShader: rocksFragment,
        uniforms: {
          uTime: { value: 0 },
          uMossColor: { value: COLORS.moss.clone() },
          uFoamColor: { value: COLORS.foam.clone() },
          uWaterLevel: { value: WATER_LEVEL },
          uWaveSpeed: { value: WAVE_SPEED },
          uWaveAmplitude: { value: WAVE_AMPLITUDE },
          uFoamDepth: { value: FOAM_DEPTH },
        },
      })

      registry.add(rocksMaterial, ['uTime'])

      const rocks = new Mesh(rocksGeometry.clone(), rocksMaterial as unknown as MeshStandardMaterial)
      rocks.castShadow = true
      rocks.receiveShadow = true
      rocks.position.set(
        config.rocks.position[0],
        config.rocks.position[1],
        config.rocks.position[2],
      )

      if (config.rocks.rotation) {
        rocks.rotation.set(
          config.rocks.rotation[0],
          config.rocks.rotation[1],
          config.rocks.rotation[2],
        )
      }

      if (config.rocks.scale) {
        rocks.scale.set(
          config.rocks.scale[0],
          config.rocks.scale[1],
          config.rocks.scale[2],
        )
      }

      islandGroup.add(rocks)
    }

    if (config.id === TARGET_ISLAND_ID) {
      targetPosition = islandGroup.position.clone()
    }

    groups.push(islandGroup)
  })

  return { groups, targetPosition }
}
