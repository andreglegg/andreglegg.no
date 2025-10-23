import { Group, Vector3 } from 'three'

import { BOAT_HEIGHT_OFFSET, BOAT_ORBIT_RADIUS } from '@/scene/constants/environment'

const ORBIT_SPEED = 0.12
const BOB_SPEED = 0.9
const BOB_AMPLITUDE = 0.3
const ROLL_SPEED = 1.2
const ROLL_AMPLITUDE = 0.06

export interface BoatControllerOptions {
  orbitRadius?: number
  heightOffset?: number
}

export class BoatController {
  private readonly boat: Group
  private readonly target = new Vector3()
  private orbitRadius: number
  private heightOffset: number

  constructor(boat: Group, options: BoatControllerOptions = {}) {
    this.boat = boat
    this.orbitRadius = options.orbitRadius ?? BOAT_ORBIT_RADIUS
    this.heightOffset = options.heightOffset ?? BOAT_HEIGHT_OFFSET
  }

  get object() {
    return this.boat
  }

  setOrbitRadius(radius: number) {
    this.orbitRadius = radius
  }

  setHeightOffset(offset: number) {
    this.heightOffset = offset
  }

  setTarget(position: Vector3) {
    this.target.copy(position)
  }

  update(elapsedSeconds: number) {
    const angle = elapsedSeconds * ORBIT_SPEED

    this.boat.position.set(
      this.target.x + Math.cos(angle) * this.orbitRadius,
      this.heightOffset + Math.sin(elapsedSeconds * BOB_SPEED) * BOB_AMPLITUDE,
      this.target.z + Math.sin(angle) * this.orbitRadius,
    )

    const heading = Math.atan2(
      this.boat.position.x - this.target.x,
      this.boat.position.z - this.target.z,
    )

    this.boat.rotation.y = heading
    this.boat.rotation.z = Math.sin(elapsedSeconds * ROLL_SPEED) * ROLL_AMPLITUDE
  }
}
