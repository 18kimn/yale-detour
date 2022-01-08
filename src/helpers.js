import mapboxgl from 'mapbox-gl'

/** As a build step, our markdown files are processed into JSON
 * This fetches them
 * @returns {Array} of objects with properties "data" and "content"
 * */
export async function fetchLocations() {
  const resolved = await fetch('/content.json').then((res) =>
    res.json(),
  )
  return resolved.sort((a, b) => {
    if (a.data.id < b.data.id) return -1
    if (a.data.id > b.data.id) return 1
    return 0
  })
}
/** Called when user clicks a location
 * @returns void
 */
export function addPopup(map, location) {
  if (!location) return
  const {title, center} = location.data
  const oldPopup = document.getElementsByClassName('mapboxgl-popup')
  oldPopup.length && oldPopup[0].remove()
  return new mapboxgl.Popup({
    anchor: 'top',
    closeButton: false,
  })
    .setLngLat(center)
    .setHTML(title)
    .addTo(map)
}

/** Loads map onto the canvas
 * @param container a container element to be passed in;
 * in Svelte you can get this with bind:this={elementName}
 */
export async function initializeMap(container) {
  const bounds = [
    [-72.9674, 41.28735],
    [-72.89985, 41.33419],
  ]
  const map = new mapboxgl.Map({
    container: container,
    style:
      'mapbox://styles/dtcguo/ckwcr4o5y14dz15npkazgp11p?optimize=true',
    center: [-72.92889674697767, 41.311363185264725],
    zoom: 14.66,
    minZoom: 12,
    maxBounds: bounds,
  })

  const routes = await fetch('/routes.json').then((res) => res.json())
  map.on('load', () => {
    map.resize()
    map
      .addSource('routes', {type: 'geojson', data: routes})
      .addLayer({
        id: 'routesLayer',
        source: 'routes',
        type: 'line',
        paint: {
          'line-color': '#FFFFFF',
          'line-opacity': 1,
          'line-width': 3,
        },
        filter: ['==', 'id', -1],
      })
  })
  // remove the map instance when the component unmounts
  return [map, () => map.remove()]
}
