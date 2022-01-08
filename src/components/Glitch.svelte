<script>
  let isHovering

  // credit goes to https://codepen.io/kevinpowell/pen/YzqerQm
  // for most of this
  function activateGlitch() {
    isHovering = true
    setTimeout(() => (isHovering = false), 1000)
  }
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

  #container :global(:first-child) {
    animation: glitch 500ms 2;
  }

  #first-overlay :global(:first-child) {
    animation: glitch 650ms 2;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-0.025em, -0.0125em);
    /* color: green; */
    opacity: 0.8;
  }

  #second-overlay :global(:first-child) {
    animation: glitch 375ms 2;
    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
    transform: translate(0.0125em, 0.025em);
    /* color: red; */
    opacity: 0.8;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
  }

  .glitch-375 {
    animation: glitch 375ms infinite;
  }
  .glitch-500 {
    animation: glitch 500ms infinite;
  }
  .glitch-650 {
    animation: glitch 650ms infinite;
  }

  @keyframes glitch {
    0% {
      text-shadow: 0.15em 0 0 rgba(255, 0, 0, 0.75),
        -0.125em -0.1em 0 rgba(0, 255, 0, 0.75),
        0.025em 0.15em 0 rgba(0, 0, 255, 0.75);
    }
    25% {
      text-shadow: 0.25em 0 0 rgba(255, 0, 0, 0.75),
        0.125em -0.15em 0 rgba(0, 255, 0, 0.75),
        0.01em 0.15em 0 rgba(0, 0, 255, 0.75);
    }
    50% {
      text-shadow: 0.5em 0 0 rgba(255, 0, 0, 0.75),
        0.1em -0.2em 0 rgba(0, 255, 0, 0.75),
        0.1em 0.2em 0 rgba(0, 0, 255, 0.75);
    }
    75% {
      text-shadow: 0.1em 0 0 rgba(255, 0, 0, 0.75),
        -0.125em -0.15em 0 rgba(0, 255, 0, 0.75),
        0.02em 0.15em 0 rgba(0, 0, 255, 0.75);
    }
    100% {
      text-shadow: 0.2em 0 0 rgba(255, 0, 0, 0.75),
        -0.025em -0.1em 0 rgba(0, 255, 0, 0.75),
        0.04em 0.15em 0 rgba(0, 0, 255, 0.75);
    }
  }
</style>
