import {addMarker, addPopup, animateRoute} from './helpers.js'

/** Logic to make sure the index rolls around
 * instead of becoming negative or too high
 */
export function updateIndex(index, locations) {
  if (index === -1) {
    return locations.length - 1
  } else if (index > locations.length - 1) {
    return 0
  }
  return index
}

/** in guided mode, the route on screen should update too */
function updateRoute(map, location, routes, onMarkerClick) {
  document.querySelectorAll('.marker').forEach((el) => el.remove())
  addMarker(map, location, onMarkerClick)

  routes.eachLayer((layer) => {
    const path = layer._path
    if (layer.feature.properties.id === location.data.id) {
      animateRoute(path, 'in')
    } else {
      animateRoute(path, 'out')
    }
  })
}
/** When the location changes,
 *  we should calculate the appropriate index,
 *  grab the new location data,
 *  move the map to the location,
 *  (if guided) update the active marker and location
 * */
export function onLocationChange(
  map,
  isGuided,
  index,
  locations,
  routes,
  onMarkerClick,
) {
  if (!map || typeof index === 'undefined') return
  const newLocation = locations.find(({data}) => data.id === index)
  addPopup(map, newLocation)
  map.flyTo(newLocation.data.center, 16.3)
  isGuided && updateRoute(map, newLocation, routes, onMarkerClick)
}
