<script>
  import {onDestroy, onMount} from 'svelte'
  import {guided} from '../../store.js'
  import {initializeMap, fetchData} from './helpers.js'
  import {updateIndex, onLocationChange} from './location.js'
  import {onGuidedUpdate} from './guided.js'
  import Sidebar from '../Sidebar.svelte'

  /*
    Despite many attempts at refactoring this code is still
    fairly messy. Would appreciate any help!
  */
  let mapContainer
  let map
  let isGuided = false
  let allLocations = []
  let locations = []
  let index
  let routes = {}
  let destroyMap

  onMount(async () => {
    ;[map, destroyMap] = initializeMap(mapContainer)
    ;[allLocations, routes] = await Promise.all(fetchData(map))
    locations = onGuidedUpdate(
      map,
      allLocations,
      routes,
      isGuided,
      onMarkerClick,
    )
  })

  guided.subscribe((newGuided) => {
    isGuided = newGuided
    index = isGuided ? 0 : undefined
    locations = onGuidedUpdate(
      map,
      allLocations,
      routes,
      isGuided,
      onMarkerClick,
    )
  })
  /*
  todo: on marker click update index
    on arrow click update index
    on update index change location
  */

  function onMarkerClick(location) {
    index = location.data.id
  }

  function onArrowClick(diff) {
    index = updateIndex((index || 0) + diff, locations)
  }
  $: onLocationChange(
    map,
    isGuided,
    index,
    locations,
    routes,
    onMarkerClick,
  )
  onDestroy(destroyMap)
</script>

<main id="container">
  <div class="map" bind:this={mapContainer} />
  <Sidebar
    location={locations[index]}
    onLeft={() => onArrowClick(-1)}
    onRight={() => onArrowClick(+1)}
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

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .map :global(.marker) {
    -webkit-mask: url(/images/marker.svg) no-repeat 50% 25%;
    mask: url(/images/marker.svg) no-repeat 50% 25%;
    background-color: white;
    padding: 1.5rem;
    margin-top: -1rem !important;
    margin-left: -2rem !important;
    width: 20px !important;
    height: 34px !important;
    cursor: pointer;
    transition: background-color ease-in-out 200ms;
  }

  .map :global(.marker:hover) {
    background-color: #b24fff;
  }

  .map :global(.leaflet-pane) {
    z-index: unset;
  }
  .map:global(.leaflet-container) {
    background: #0f3157;
  }

  .map :global(.leaflet-popup) {
    z-index: 1000; /* leaflet is weird about this */
    font-family: Montserrat;
    animation: fadeIn 400ms 1;
  }
  .map :global(.leaflet-fade-anim) {
    transition: unset;
  }

  .map :global(.leaflet-control-attribution) {
    background: unset;
  }
  .map :global(.leaflet-control-attribution a) {
    font-family: Montserrat;
    color: white;
  }
</style>
