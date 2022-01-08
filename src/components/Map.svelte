<script>
  import mapboxgl from 'mapbox-gl'
  import {onDestroy, onMount} from 'svelte'
  import {guided} from '../store.js'
  import {
    addPopup,
    initializeMap,
    fetchLocations,
  } from '../helpers.js'
  import Sidebar from './Sidebar.svelte'

  let allLocations = []
  let isGuided = false
  let locations = []
  let currentIndex
  let mapContainer
  let map
  let destroyMap

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY

  onMount(async () => {
    allLocations = await fetchLocations()
    ;[map, destroyMap] = await initializeMap(mapContainer)
  })

  function addMarker(location) {
    if (!location) return
    const marker = document.createElement('div')
    marker.className = 'marker'
    marker.addEventListener('click', () => {
      currentIndex = location.data.id
    })
    const popup = addPopup(map, location)
    new mapboxgl.Marker(marker)
      .setLngLat(location.data.center)
      .setPopup(popup)
      .addTo(map)
  }

  function zoomToSelected(index) {
    if (!map || typeof index === 'undefined') return
    if (index === -1) {
      index = locations.length - 1
    }
    if (index > locations.length - 1) {
      index = 0
    }
    currentIndex = index
    const newLocation = locations.find((location) => {
      return location.data.id === index
    })
    map.easeTo({...newLocation.data, zoom: 16.3, speed: 1})
    if (isGuided) {
      const markers = [...document.getElementsByClassName('marker')]
      markers.forEach((el) => el.remove())
      addMarker(newLocation)
      map.setFilter('routesLayer', ['==', 'id', newLocation.data.id])
    }
    addPopup(map, newLocation)
  }

  function reloadLocations(isGuided) {
    locations = isGuided
      ? allLocations.filter((location) => location.data.guided)
      : allLocations
    const markers = [...document.getElementsByClassName('marker')]
    markers.forEach((el) => el.remove())
    if (isGuided) return
    locations.forEach(addMarker)
  }

  guided.subscribe((newGuided) => {
    isGuided = newGuided
    if (allLocations.length >= 0 && map) reloadLocations()
    if (isGuided) {
      currentIndex = 0
    } else {
      currentIndex = undefined
      map?.easeTo({
        center: [-72.928897, 41.31136],
        zoom: 14.7,
        speed: 1,
      })
    }
  })

  $: map && reloadLocations(isGuided)
  $: zoomToSelected(currentIndex)
  onDestroy(destroyMap)
</script>

<main id="container">
  <div class="map" bind:this={mapContainer} />
  <Sidebar
    location={locations[currentIndex]}
    onLeft={() => {
      currentIndex = (currentIndex || 0) - 1
    }}
    onRight={() => {
      currentIndex = (currentIndex || 0) + 1
    }}
  />
</main>

<style>
  #container {
    flex: 1;
    width: 100%;
    display: flex;
    overflow: auto;
  }

  .map {
    width: 60%;
  }

  .map :global(.mapboxgl-popup) {
    font-family: Montserrat;
    animation: fadeIn 400ms 1;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .map :global(.marker) {
    -webkit-mask: url(images/marker.svg) no-repeat 50% 25%;
    mask: url(images/marker.svg) no-repeat 50% 25%;
    background-color: white;
    padding: 1.5rem;
    width: 20px;
    height: 34px;
    cursor: pointer;
    transition: background-color ease-in-out 200ms;
  }

  .map :global(.marker:hover) {
    background-color: #b24fff;
  }

  .map :global(.mapboxgl-ctrl-attrib a) {
    font-family: Montserrat;
    color: white;
  }
  .map :global(.mapboxgl-ctrl.mapboxgl-ctrl-attrib) {
    background: unset;
  }
</style>
