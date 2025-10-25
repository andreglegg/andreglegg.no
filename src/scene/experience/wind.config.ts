import type { Vector3Tuple } from 'three'

export interface WindPathConfig {
  points: Vector3Tuple[]
  radius?: number
  closed?: boolean
  speed?: number
  spawnRate?: number
  direction?: number
  trailLength?: number
  trailLengthMin?: number
  trailLengthMax?: number
  baseStrength?: number
  highlightStrength?: number
  offset?: number
  instances?: number
  jitter?: {
    position?: number
    height?: number
    curve?: number
    rotation?: number
  }
}

export const WIND_PATH_CONFIGS: WindPathConfig[] = [
  {
    points: [
      [-150, 14, -96],
      [-118, 15, -64],
      [-78, 13, -30],
      [-32, 14, -8],
      [24, 15, -12],
      [76, 13, -34],
      [118, 14, -70],
      [158, 13, -104],
    ],
    closed: false,
    radius: 0.52,
    speed: 0.052,
    spawnRate: 0.95,
    direction: 1,
    trailLengthMin: 0.04,
    trailLengthMax: 0.09,
    baseStrength: 0.065,
    highlightStrength: 0.85,
    instances: 2,
    jitter: {
      position: 22,
      height: 2.4,
      curve: 12,
      rotation: 10,
    },
  },
  {
    points: [
      [-36, 12, 24],
      [-22, 18, 42],
      [-12, 22, 66],
      [-6, 20, 90],
      [-20, 16, 92],
      [-14, 18, 68],
      [6, 21, 46],
      [28, 18, 40],
      [46, 13, 32],
      [60, 11, 26],
    ],
    closed: false,
    radius: 0.36,
    speed: 0.06,
    spawnRate: 1.1,
    direction: 1,
    trailLengthMin: 0.03,
    trailLengthMax: 0.08,
    baseStrength: 0.06,
    highlightStrength: 0.98,
    instances: 3,
    jitter: {
      position: 10,
      height: 2,
      curve: 6,
      rotation: 24,
    },
  },
  {
    points: [
      [42, 11, 12],
      [62, 16, 26],
      [68, 22, 48],
      [60, 20, 68],
      [44, 17, 78],
      [32, 15, 66],
      [40, 17, 44],
      [66, 19, 28],
      [92, 16, 22],
      [118, 13, 18],
    ],
    closed: false,
    radius: 0.34,
    speed: 0.055,
    spawnRate: 0.95,
    direction: -1,
    trailLengthMin: 0.025,
    trailLengthMax: 0.07,
    baseStrength: 0.062,
    highlightStrength: 0.92,
    instances: 2,
    jitter: {
      position: 8,
      height: 2.2,
      curve: 4,
      rotation: 18,
    },
  },
  {
    points: [
      [-112, 14, 30],
      [-92, 16, 58],
      [-64, 15, 82],
      [-28, 15, 96],
      [12, 14, 106],
      [48, 13, 118],
      [82, 12, 132],
      [116, 13, 144],
    ],
    closed: false,
    radius: 0.48,
    speed: 0.045,
    spawnRate: 0.7,
    direction: 1,
    trailLengthMin: 0.05,
    trailLengthMax: 0.12,
    baseStrength: 0.07,
    highlightStrength: 0.85,
    instances: 2,
    jitter: {
      position: 18,
      height: 1.6,
      curve: 10,
      rotation: 8,
    },
  },
  {
    points: [
      [-140, 12, -32],
      [-110, 14, -12],
      [-72, 13, 6],
      [-26, 12, 14],
      [18, 14, 10],
      [54, 13, -6],
      [94, 12, -22],
      [136, 14, -28],
    ],
    closed: false,
    radius: 0.4,
    speed: 0.05,
    spawnRate: 0.85,
    direction: 1,
    trailLengthMin: 0.04,
    trailLengthMax: 0.09,
    baseStrength: 0.065,
    highlightStrength: 0.82,
    instances: 2,
    jitter: {
      position: 16,
      height: 1.8,
      curve: 9,
      rotation: 6,
    },
  },
  {
    points: [
      [-66, 10, -12],
      [-52, 15, 4],
      [-38, 20, 22],
      [-28, 18, 40],
      [-34, 16, 58],
      [-46, 14, 50],
      [-30, 18, 32],
      [-12, 20, 18],
      [6, 18, 14],
      [24, 12, 8],
    ],
    closed: false,
    radius: 0.32,
    speed: 0.058,
    spawnRate: 1.0,
    direction: 1,
    trailLengthMin: 0.03,
    trailLengthMax: 0.08,
    baseStrength: 0.065,
    highlightStrength: 1.02,
    instances: 3,
    jitter: {
      position: 12,
      height: 2.1,
      curve: 7,
      rotation: 20,
    },
  },
]
