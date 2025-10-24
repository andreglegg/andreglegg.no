import { Color } from 'three'

export const WATER_LEVEL = 0.9
export const WAVE_SPEED = 1.2
export const WAVE_AMPLITUDE = 0.1
export const FOAM_DEPTH = 0.05

export const COLORS = {
  waterNear: new Color('#2ec5d7'),
  waterFar: new Color('#0e79b2'),
  sand: new Color('#f4d9a0'),
  underwaterBase: new Color('#145a73'),
  grass: new Color('#8bd346'),
  rock: new Color('#c7b8a1'),
  moss: new Color('#79a038'),
  background: new Color('#d6f1ff'),
} as const

export const BOAT_HEIGHT_OFFSET = 0.05
export const BOAT_ORBIT_RADIUS = 18

export const BOAT_PALETTE = {
  sail: '#fef1d8',
  hull: '#1d2f40',
  trim: '#f4d061',
  deck: '#c48a57',
  window: '#66d3ff',
  mast: '#8b5a2b',
  metal: '#a7b6c9',
  fender: '#d94f4f',
} as const

export const TARGET_ISLAND_ID = 'island-projects'
