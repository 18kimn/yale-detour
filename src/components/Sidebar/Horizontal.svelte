<script>
  import {fade} from 'svelte/transition'
  import Arrow from '../Arrow.svelte'
  import Glitch from '../Glitch.svelte'

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
  <div class="arrow">
    <Arrow
      height="3rem"
      transform="rotate(-180 180 210)"
      onClick={() => {
        scrollUp()
        onLeft()
      }}
    />
  </div>
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
          <p id="author">by {location.data.author}</p>
          <div>{@html location.content}</div>
        </div>
      {/key}
    {:else}
      <div
        id="intro"
        out:fade={{duration: 200, delay: 0}}
        on:outroend={() => (contentDisplay = true)}
      >
        <div id="intro-image" />
        <Glitch>
          <h2>Select a location on the map to get started.</h2>
        </Glitch>
      </div>
    {/if}
  </div>
  <div class="arrow">
    <Arrow
      height="3rem"
      onClick={() => {
        scrollUp()
        onRight()
      }}
    />
  </div>
</div>

<style>
  #container {
    flex: 2;
    min-width: 30ch;
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

  .arrow {
    height: 100%;
    display: flex;
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

  #intro-image {
    -webkit-mask: url(/images/marker.svg) no-repeat 50% 50%;
    mask: url(/images/marker.svg) no-repeat 50% 50%;
    -webkit-mask-size: 100%;
    mask-size: 100%;
    background-color: black;
    width: 4rem;
    height: 8rem;
  }

  #content {
    padding-bottom: 1rem;
  }

  #author {
    font-style: italic;
    margin: 1rem 0;
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
