import {addMarker} from './helpers.js'

/** For guided mode, we want a focused map -> remove things */
function toGuided(allLocations) {
  const locations = allLocations.filter(
    (location) => location.data.guided,
  )
  document.querySelectorAll('.marker').forEach((el) => el.remove())
  return locations
}

/** For explore mode, user can play around -> show things, but not the guided
 * route */
function toExplore(map, locations, routes, onClick) {
  locations.forEach((location) => addMarker(map, location, onClick))
  routes.eachLayer((layer) => {
    const path = layer._path
    path.setAttribute('stroke-opacity', 0)
    path.style.strokeDashoffset = 0
  })
  map.flyTo([41.31136, -72.928897], 14.7)
  return locations
}

/** Respond to user switching from guided <-> explore */
export function onGuidedUpdate(
  map,
  allLocations,
  routes,
  isGuided,
  onClick,
) {
  if (!(map && routes)) return allLocations
  map.closePopup()
  return isGuided
    ? toGuided(allLocations)
    : toExplore(map, allLocations, routes, onClick)
}
