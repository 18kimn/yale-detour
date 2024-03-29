<script>
  import {onDestroy, onMount} from 'svelte'
  import {guided} from '../../store.js'
  import {initializeMap, fetchData} from './helpers.js'
  import {updateIndex, onLocationChange} from './location.js'
  import {onGuidedUpdate} from './guided.js'
  import Horizontal from '../Sidebar/Horizontal.svelte'
  import Vertical from '../Sidebar/Vertical.svelte'

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

  let vertical = window.innerWidth < 900
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

    window.addEventListener('resize', () => {
      vertical = window.innerWidth < 900
      console.log(vertical)
    })
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

<main id="container" style={vertical ? 'flex-flow: column;' : ''}>
  <div class="map" transtion:slide bind:this={mapContainer} />
  {#if vertical}
    <Vertical
      location={locations[index]}
      onLeft={() => onArrowClick(-1)}
      onRight={() => onArrowClick(+1)}
    />
  {:else}
    <Horizontal
      location={locations[index]}
      onLeft={() => onArrowClick(-1)}
      onRight={() => onArrowClick(+1)}
    />
  {/if}
</main>

<style>
  #container {
    flex: 1;
    width: 100%;
    display: flex;
    overflow: auto;
  }

  .map {
    flex: 3;
    max-width: 100vw;
    position: relative;
    transition: all ease-in-out 200ms;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .map :global(.leaflet-div-icon) {
    background: none;
    border: none;
  }

  .map :global(.leaflet-div-icon > svg > path) {
    transition: fill ease-in-out 200ms;
  }
  .map :global(.leaflet-div-icon > svg > path:hover) {
    fill: #b24fff;
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
