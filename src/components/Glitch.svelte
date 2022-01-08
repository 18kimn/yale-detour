<script>
  export let startWithGlitch = false
  let isHovering

  function delay(time) {
    return new Promise((resolve) => setTimeout(() => resolve(), time))
  }

  // credit goes to https://codepen.io/kevinpowell/pen/YzqerQm
  // for most of this
  async function activateGlitch() {
    isHovering = true
    await delay(150)
    isHovering = false
    await delay(400)
    isHovering = true
    await delay(400)
    isHovering = false
  }

  if (startWithGlitch) activateGlitch()
</script>

<div
  id="container"
  class:glitch-500={isHovering}
  on:mouseenter={activateGlitch}
  on:mouseleave={() => (isHovering = false)}
>
  <slot />
  <span
    class:glitch-375={isHovering}
    id="first-overlay"
    aria-hidden="true"
  >
    <slot />
  </span>
  <span
    class:glitch-650={isHovering}
    id="second-overlay"
    aria-hidden="true"
  >
    <slot />
  </span>
</div>

<style>
  #container {
    position: relative;
  }

  #first-overlay :global(:first-child) {
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }

  #second-overlay :global(:first-child) {
    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
  }

  .glitch-375 {
    animation: glitch 375ms infinite;
    transform: translate(-0.3em, 0em);
  }
  .glitch-500 {
    animation: glitch 500ms infinite;
  }
  .glitch-650 {
    animation: glitch 650ms infinite;
    transform: translate(0.3em, 0em);
  }

  @keyframes glitch {
    0% {
      text-shadow: 0.15em 0 0 rgba(255, 0, 0, 0.75),
        -0.125em -0.1em 0 rgba(0, 255, 0, 0.75);
    }
    25% {
      text-shadow: 0.35em 0 0 rgba(255, 0, 0, 0.75),
        0.225em -0.25em 0 rgba(0, 255, 0, 0.75);
    }
    50% {
      text-shadow: 0.7em 0 0 rgba(255, 0, 0, 0.75),
        0.2em -0.3em 0 rgba(0, 255, 0, 0.75);
    }
    75% {
      text-shadow: 0.3em 0 0 rgba(255, 0, 0, 0.75),
        -0.225em -0.25em 0 rgba(0, 255, 0, 0.75);
    }
    100% {
      text-shadow: 0.4em 0 0 rgba(255, 0, 0, 0.75),
        -0.225em -0.2em 0 rgba(0, 255, 0, 0.75);
    }
  }
</style>
