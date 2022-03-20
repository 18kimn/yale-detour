<script>
  import {tweened} from 'svelte/motion'

  export let transform = ''
  export let onClick
  export let width = undefined
  export let height = '2rem'

  const opacity = tweened(0.3, {
    duration: 200,
  })

  // just don't question this lmao
  const viewBox = '0 0 360 420'

  const d =
    'M117.759 90.1516C126.865 79.5545 143.273 79.5646 152.366 90.1729L255.075 210L152.366 329.827C143.273 340.435 126.865 340.446 117.759 329.848V329.848C110.42 321.308 110.415 308.688 117.747 300.141L195.075 210L117.747 119.859C110.415 111.312 110.42 98.6925 117.759 90.1516V90.1516Z'
  let isHovering

  /** calls the onclick callback prop and modifies style accordingly */
  function handleClick() {
    onClick()
    console.log('test')
    if (isHovering) {
      opacity.set(1, {delay: 300})
    } else {
      opacity.set(0.3, {delay: 300})
    }
  }
</script>

<div
  class="container"
  on:mouseenter={() => {
    isHovering = true
    opacity.set(1)
  }}
  on:mouseleave={() => {
    isHovering = false
    opacity.set(0.3)
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000"
    {width}
    {height}
    opacity={$opacity}
    {viewBox}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      {transform}
      {d}
      fill="black"
    />
  </svg>
  <button class="change-location" on:click={handleClick} />
</div>

<style>
  .container {
    display: flex;
    place-items: center;
    place-content: center;
    flex: 1;
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
