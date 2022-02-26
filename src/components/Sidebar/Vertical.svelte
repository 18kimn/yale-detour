<script>
  import {fade} from 'svelte/transition'
  import Arrow from '../Arrow.svelte'
  import Glitch from '../Glitch.svelte'

  export let onLeft
  export let onRight
  export let location = {data: {}, content: ''}

  let taps = 0
  let content
  let expanded = false
  let svg

  const shade = () => {
    svg.style = 'background: rgba(0, 0, 0, 0.1);'
  }

  const unshade = () => {
    svg.style = 'background: rgba(0, 0, 0, 0);'
  }
  /** scroll back to top when content changes */
  function scrollUp() {
    if (!content) return
    setTimeout(() => {
      content.scrollTop = 0
    }, 200)
  }
  $: scrollUp(location)
</script>

<!-- The `style=` section is to prevent a layout shift 
            when the intro moves out -->
<div class="transition">
  {#key location}
    <div
      id="header"
      in:fade={{duration: 150, delay: 200}}
      out:fade={{duration: 150, delay: 0}}
    >
      {#if location?.content}
        <svg
          viewBox="0 0 330 330"
          bind:this={svg}
          on:mouseover={shade}
          on:focus={shade}
          on:mouseout={unshade}
          on:blur={unshade}
          on:click={() => {
            expanded = !expanded
            taps += 1
            unshade()
          }}
        >
          {#key taps}
            <path
              fill="gray"
              transform={expanded
                ? 'rotate(90 165 330) scale(1 2) translate(-100 0)'
                : 'rotate(-90 165 330) scale(1 2) translate(100 0)'}
              id="XMLID_226_"
              d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21
	l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001
  c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z"
              in:fade={{duration: 500, delay: 500}}
              out:fade={{duration: 500, delay: 0}}
            />
          {/key}
        </svg>
        {#if taps === 0}
          <p id="hint">tap to expand</p>
        {:else if taps === 1}
          <p id="hint">tap to collapse</p>
        {/if}
        <h2>{location.data.title}</h2>
      {:else}
        <div id="intro">
          <Glitch>
            <h2>Select a location on the map to get started.</h2>
          </Glitch>
        </div>
      {/if}
    </div>
  {/key}
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
    style="height: fit-content; flex: 1;"
    width={25}
    height={25}
    onClick={() => {
      scrollUp()
      onLeft()
    }}
    d="M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z"
  />
  <Arrow
    style="height: fit-content; flex: 1;"
    width={25}
    height={25}
    onClick={() => {
      scrollUp()
      onRight()
    }}
    d="M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z"
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

  svg {
    width: 100%;
    height: 2rem;
    transition: background ease-in-out 200ms;
    border: none;
  }

  svg:focus {
    outline: unset;
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
