<script>
  import {tweened} from 'svelte/motion'

  const opacity = tweened(0.1, {
    duration: 200,
  })

  export let d
  export let onClick

  export let style = ''
  export let width = 35
  export let height = 35

  let isHovering
  /** calls the onclick callback prop and modifies style accordingly */
  function handleClick() {
    onClick()
    opacity.set(1, {duration: 100})
    if (isHovering) {
      opacity.set(0.5, {delay: 300})
    } else {
      opacity.set(0.1, {delay: 300})
    }
  }
</script>

<div
  class="container"
  {style}
  on:mouseenter={() => {
    isHovering = true
    opacity.set(0.5)
  }}
  on:mouseleave={() => {
    isHovering = false
    opacity.set(0.1)
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000"
    {width}
    {height}
    opacity={$opacity}
    viewBox="0 0 8 8"
  >
    <path {d} />
  </svg>
  <button class="change-location" on:click={() => handleClick()} />
</div>

<style>
  .container {
    display: flex;
    place-items: center;
    place-content: center;
    height: 100%;
    padding: 0 1rem;
    background-color: rgba(0, 0, 0, 0);
    position: relative;
  }

  .change-location {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    cursor: pointer;
  }
</style>
