import { Box3, Color, Group, Mesh, MeshStandardMaterial, Vector3 } from 'three'

import { BOAT_PALETTE } from '@/scene/constants/environment'
import { BoatController } from '@/scene/environment/BoatController'

export function createBoat(boatScene: Group) {
  const boatGroup = boatScene.clone(true)

  boatGroup.traverse((child) => {
    if (!(child instanceof Mesh)) return

    child.castShadow = true
    child.receiveShadow = true

    const name = child.name.toLowerCase()
    const buildMaterial = (
      color: string,
      options: { roughness?: number; metalness?: number; emissive?: number } = {},
    ) => {
      const base = new Color(color)
      return new MeshStandardMaterial({
        color: base,
        roughness: options.roughness ?? 0.5,
        metalness: options.metalness ?? 0.15,
        emissive: base.clone().multiplyScalar(options.emissive ?? 0),
      })
    }

    if (name.includes('sail')) {
      child.material = buildMaterial(BOAT_PALETTE.sail, {
        roughness: 0.25,
        metalness: 0.05,
        emissive: 0.08,
      })
    } else if (name.includes('window')) {
      child.material = buildMaterial(BOAT_PALETTE.window, {
        roughness: 0.1,
        metalness: 0.05,
        emissive: 0.2,
      })
    } else if (name.includes('hull') || name.includes('floor') || name.includes('default')) {
      child.material = buildMaterial(BOAT_PALETTE.hull, {
        roughness: 0.45,
        metalness: 0.25,
        emissive: 0.04,
      })
    } else if (name.includes('cyan') || name.includes('trim')) {
      child.material = buildMaterial(BOAT_PALETTE.trim, {
        roughness: 0.35,
        metalness: 0.1,
        emissive: 0.08,
      })
    } else if (name.includes('sail_stick') || name.includes('mast')) {
      child.material = buildMaterial(BOAT_PALETTE.mast, {
        roughness: 0.6,
        metalness: 0.15,
      })
    } else if (name.includes('antenna') || name.includes('light_grey')) {
      child.material = buildMaterial(BOAT_PALETTE.metal, {
        roughness: 0.3,
        metalness: 0.6,
        emissive: 0.02,
      })
    } else if (name.includes('red') || name.includes('material')) {
      child.material = buildMaterial(BOAT_PALETTE.fender, {
        roughness: 0.4,
        metalness: 0.2,
        emissive: 0.05,
      })
    } else {
      child.material = buildMaterial(BOAT_PALETTE.deck, {
        roughness: 0.55,
        metalness: 0.18,
        emissive: 0.03,
      })
    }
  })

  boatGroup.updateMatrixWorld(true)

  const bounds = new Box3().setFromObject(boatGroup)
  const center = bounds.getCenter(new Vector3())
  boatGroup.position.sub(center)

  const size = bounds.getSize(new Vector3()).length()
  const scale = 8 / size
  boatGroup.scale.setScalar(scale)

  return new BoatController(boatGroup)
}
