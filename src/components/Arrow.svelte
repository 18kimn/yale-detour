<script>
  import {tweened} from 'svelte/motion'

  const opacity = tweened(0.15, {
    duration: 200,
  })

  export let d
  export let onClick

  function handleClick() {
    onClick()
    opacity.set(1, {duration: 100})
    opacity.set(0.15, {delay: 300})
  }
</script>

<div
  class="container"
  on:click={() => handleClick()}
  on:mouseenter={() => opacity.set(0.5)}
  on:mouseleave={() => opacity.set(0.15)}
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
</div>

<style>
  .container {
    display: flex;
    place-items: center;
    place-content: center;
    padding: 3rem 1rem;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
  }
</style>
