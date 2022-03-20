<script>
  import {tick} from 'svelte'
  import {fade} from 'svelte/transition'
  import Arrow from '../Arrow.svelte'
  import Glitch from '../Glitch.svelte'

  export let onLeft
  export let onRight
  export let location = {data: {}, content: ''}

  let taps = 0
  let content
  let expanded = false

  /** scroll back to top when content changes */
  function scrollUp() {
    if (!content) return
    setTimeout(() => {
      content.scrollTop = 0
    }, 200)
    /* wait for tick, so that content changes
      then expand sidebar */
    tick().then(() => {
      taps += 1
      expanded = true
    })
  }
  $: scrollUp(location)
</script>

<!-- The `style=` section is to prevent a layout shift 
            when the intro moves out -->
<div class="transition">
  <div
    id="header"
    in:fade={{duration: 150, delay: 200}}
    out:fade={{duration: 150, delay: 0}}
  >
    {#if location?.content}
      {#key taps}
        <Arrow
          width="5rem"
          transform={expanded
            ? 'rotate(90 180 210) scale(1 2) translate(0 -90)'
            : 'rotate(-90 180 210) scale(1 2) translate(0 -90)'}
          onClick={() => {
            expanded = !expanded
            taps += 1
          }}
        />
      {/key}
      {#if taps === 0}
        <p id="hint">tap to expand</p>
      {:else if taps === 1}
        <p id="hint">tap to collapse</p>
      {/if}

      {#key location}
        <h2>{location.data.title}</h2>
      {/key}
    {:else}
      <div id="intro">
        <Glitch>
          <h2>Select a location on the map to get started.</h2>
        </Glitch>
      </div>
    {/if}
  </div>
</div>
{#if location?.content}
  <div
    bind:this={content}
    id="content"
    style={expanded ? 'flex: 20; overflow: auto;' : ''}
  >
    <div class="transition">
      {#key location}
        <div
          in:fade={{duration: 150, delay: 200}}
          out:fade={{duration: 150, delay: 0}}
        >
          <p id="author">by {location.data.author}</p>
          {@html location.content}
        </div>
      {/key}
    </div>
  </div>
{/if}
<div id="bottom-buttons">
  <Arrow
    transform="rotate(-180 180 210)"
    onClick={() => {
      scrollUp()
      onLeft()
    }}
  />
  <Arrow
    onClick={() => {
      scrollUp()
      onRight()
    }}
  />
</div>

<style>
  .transition {
    display: grid;
    box-sizing: border-box;
  }

  .transition div,
  #intro {
    grid-column: 1/2;
    grid-row: 1/2;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  #bottom-buttons {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin: 0.5rem 0;
  }

  #header {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  h2 {
    margin-block: 0;
    margin: 1rem 0;
  }

  #hint {
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
    margin: 0;
    font-style: italic;
  }

  #intro {
    flex-basis: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  #author {
    font-style: italic;
    margin: 1rem 0;
  }

  #content {
    overflow: hidden;
    flex: 0;
    transition: flex ease-in-out 400ms;
  }

  #content::-webkit-scrollbar {
    display: none;
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
