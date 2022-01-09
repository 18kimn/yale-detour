import leaflet from 'leaflet'

/** As a build step, our markdown files and the routes between
 * locations are processed into JSON. This fetches them
 * @returns {Promise[]} of objects with properties "data" and "content"
 * */
export function fetchData(map) {
  const content = fetch('/content.json')
    .then((res) => res.json())
    .then((data) =>
      data.sort((a, b) => {
        if (a.data.id < b.data.id) return -1
        if (a.data.id > b.data.id) return 1
        return 0
      }),
    )
  const routes = fetch('/routes.json')
    .then((res) => res.json())
    .then((geo) =>
      leaflet.geoJSON(geo, {opacity: 0, color: 'white'}).addTo(map),
    )
  return [content, routes]
}

/** Loads map onto the canvas
 * @param container a container element to be passed in;
 * in Svelte you can get this with bind:this={elementName}
 * @returns [map instance, map remover]
 */
export function initializeMap(container) {
  const bounds = [
    [41.28735, -72.9674],
    [41.33419, -72.89985],
  ]

  const map = leaflet.map(container, {
    center: [41.311363185264725, -72.92889674697767],
    minZoom: 12,
    zoom: 14.66,
    zoomOffset: -1,
    zoomControl: false,
    maxBounds: bounds,
  })

  const mapboxURL =
    'https://api.mapbox.com/styles/v1/dtcguo/' +
    '{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

  leaflet
    .tileLayer(mapboxURL, {
      id: 'ckwcr4o5y14dz15npkazgp11p',
      accessToken: import.meta.env.VITE_MAPBOX_KEY,
      tileSize: 512,
      zoomOffset: -1,
    })
    .addTo(map)
  // remove the map instance when the component unmounts
  return [map, () => map.remove()]
}

/** Displays a popup with the name of the location
 * when user clicks a location OR when arrow buttons clicked
 * @returns void
 */
export function addPopup(map, location) {
  if (!location?.data) return
  const {title, center} = location.data
  map.closePopup()
  return leaflet
    .popup({
      closeButton: false,
    })
    .setLatLng(center)
    .setContent(title)
    .openOn(map)
}

const markerIcon = leaflet.divIcon({className: 'marker'})
/** Appends a white marker to the map */
export function addMarker(map, location, onClick) {
  if (!location) return
  leaflet
    .marker(location.data.center, {icon: markerIcon})
    .addTo(map)
    .on('click', () => onClick(location))
}

/** Trick with dash-offset and dash-array to animate routes
 * See https://jakearchibald.com/2013/animated-line-drawing-svg/
 * */
export function animateRoute(path, direction = 'in') {
  if (!path) return
  const length = path.getTotalLength()
  path.style.transition = path.style.WebKitTransition = 'none'
  path.style.strokeDasharray = `${length} ${length}`
  path.style.strokeDashoffset = direction === 'in' ? length : 0
  path.style.transition = path.style.WebkitTransition =
    'stroke-opacity 500ms ease-in-out, stroke-dashoffset 500ms ease-in-out'
  path.style.strokeDashoffset = direction === 'in' ? 0 : length

  path.setAttribute('stroke-opacity', direction === 'in' ? 1 : 0)
}
