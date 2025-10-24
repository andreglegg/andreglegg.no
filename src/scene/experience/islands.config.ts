import type { Vector3Tuple } from 'three'

export interface IslandConfig {
  id: string
  position: Vector3Tuple
  rotation?: Vector3Tuple
  scale?: Vector3Tuple
  rocks?: {
    position: Vector3Tuple
    rotation?: Vector3Tuple
    scale?: Vector3Tuple
  }
}

export const ISLAND_CONFIGS: IslandConfig[] = [
  {
    id: 'island-overview',
    position: [0, 0, 0],
    rotation: [0, Math.PI * 0.12, 0],
    scale: [1.2, 1.2, 1.2],
    rocks: {
      position: [10, 0.5, -6],
      scale: [1.15, 1.15, 1.15],
    },
  },
  {
    id: 'island-experience',
    position: [-72, 0, -33],
    rotation: [0, Math.PI * -0.32, 0],
    scale: [1.05, 1.05, 1.05],
    rocks: {
      position: [6, 0.5, -5],
      rotation: [0, Math.PI * 0.55, 0],
      scale: [1, 1, 1],
    },
  },
  {
    id: 'island-skills',
    position: [76, 0, -24],
    rotation: [0, Math.PI * 0.48, 0],
    scale: [1.1, 1.1, 1.1],
    rocks: {
      position: [7, 0.5, 4],
      rotation: [0, Math.PI * 0.28, 0],
      scale: [0.95, 0.95, 0.95],
    },
  },
  {
    id: 'island-projects',
    position: [-43, 0, 68],
    rotation: [0, Math.PI * -0.18, 0],
    scale: [1.1, 1.1, 1.1],
    rocks: {
      position: [8, 0.5, -3],
      rotation: [0, Math.PI * 0.12, 0],
      scale: [0.95, 0.95, 0.95],
    },
  },
  {
    id: 'island-contact',
    position: [62, 0, 63],
    rotation: [0, Math.PI * 0.22, 0],
    scale: [1.05, 1.05, 1.05],
    rocks: {
      position: [5, 0.5, -3],
      rotation: [0, Math.PI * -0.35, 0],
      scale: [0.85, 0.85, 0.85],
    },
  },
]
