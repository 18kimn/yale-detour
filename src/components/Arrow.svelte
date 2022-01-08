<script>
  import {tweened} from 'svelte/motion'

  const opacity = tweened(0.1, {
    duration: 200,
  })

  export let d
  export let onClick

  let isHovering
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
    width="35"
    height="35"
    opacity={$opacity}
    viewBox="0 0 8 8"
  >
    <path {d} />
  </svg>
  <button id="change-location" on:click={() => handleClick()} />
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

  #change-location {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    cursor: pointer;
  }
</style>
