<script>
  import Arrow from './Arrow.svelte'
  import Glitch from './Glitch.svelte'
  import {fade} from 'svelte/transition'

  export let onLeft
  export let onRight
  export let location = {data: {}, content: ''}

  let contentDisplay
  let contentContainer

  function scrollUp() {
    if (!contentContainer) return
    setTimeout(() => {
      contentContainer.scrollTop = 0
    }, 200)
  }

  $: scrollUp(location)
</script>

<div id="container">
  <Arrow
    onClick={() => {
      scrollUp()
      onLeft()
    }}
    d="M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z"
  />
  <div bind:this={contentContainer} id="content-container">
    {#if location?.content}
      {#key location}
        <!-- The `style=` section is to prevent a layout shift 
            when the intro moves out -->
        <div
          id="content"
          style="display: {contentDisplay ? 'unset' : 'none'}"
          in:fade={{duration: 150, delay: 200}}
          out:fade={{duration: 150, delay: 0}}
        >
          <h2>{location.data.title}</h2>
          <div>{@html location.content}</div>
        </div>
      {/key}
    {:else}
      <div
        id="intro"
        out:fade={{duration: 200, delay: 0}}
        on:outroend={() => (contentDisplay = true)}
      >
        <img
          id="intro-image"
          src="images/marker.png"
          width="40"
          height="40"
          alt="Map marker"
        />
        <Glitch>
          <h2>Select a location on the map to get started.</h2>
        </Glitch>
      </div>
    {/if}
  </div>
  <Arrow
    onClick={() => {
      scrollUp()
      onRight()
    }}
    d="M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z"
  />
</div>

<style>
  #container {
    flex: 1;
    display: flex;
    flex-direction: row;
    place-items: center;
    overflow-y: auto;
    background: var(--backgroundImage);
  }

  #content-container {
    height: 100%;
    flex: 1;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: grid;
  }
  #content-container::-webkit-scrollbar {
    display: none;
  }

  #content,
  #intro {
    grid-column: 1/2;
    grid-row: 1/2;
    width: 100%;
    height: 100%;
  }

  #intro {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  /** These styles target the markdown content; 
  * Also check src/defaults.css for global styles
 */
  #content :global(blockquote) {
    margin: 1rem;
  }

  #content :global(img) {
    width: 100%;
  }

  img#intro-image {
    width: 40px;
  }

  #content :global(.image-credit) {
    font-style: italic;
    font-size: 0.8rem;
  }

  #content :global(.separator) {
    background: #00356b;
    height: 0.1rem;
    margin-bottom: 1rem;
  }
</style>
