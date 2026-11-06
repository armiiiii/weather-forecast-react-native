import * as Location from 'expo-location'
import { withTimeout } from './utils'

export type Coords = {
  latitude: number,
  longitude: number,
}

const toCoords = ({ coords }: Location.LocationObject): Coords => ({
    latitude: coords.latitude, 
    longitude: coords.longitude
})

export async function getCoords(): Promise<Coords | null> {
  const { granted } = await Location.requestForegroundPermissionsAsync()

  if (!granted) return null

  try {
    const last = await Location.getLastKnownPositionAsync({ maxAge: 10 * 60 * 1000 })
    if (last) {
      return toCoords(last)
    }
    
    const current = await withTimeout(
      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low }), 
      10_000
    )
    return toCoords(current)
  } catch {
    return null
  }
}