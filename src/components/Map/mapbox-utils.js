import mapboxgl from 'mapbox-gl'

const addPopup = (map, {title, center}) => {
  const oldPopup = document.getElementsByClassName('mapboxgl-popup')
  oldPopup.length && oldPopup[0].remove()
  return new mapboxgl.Popup({
    anchor: 'top',
  })
    .setLngLat(center)
    .setHTML(title)
    .addTo(map.current)
}

export {addPopup}
