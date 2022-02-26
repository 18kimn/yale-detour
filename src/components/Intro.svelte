<script>
  import {guided} from '../store.js'
  import Glitch from './Glitch.svelte'
  export let toggleModal
  function chooseGuided(newGuided) {
    guided.set(newGuided)
    toggleModal()
  }
</script>

<div class="about">
  <div class="about-text">
    <Glitch startWithGlitch={true}>
      <h1>The Yale Detour</h1>
    </Glitch>
    <p>
      This is the Yale Detour, a map of Yale's colonial history and
      those that struggled against it. In telling this story, we hope
      to push back on the cheery and misleading narratives spread by
      Yale's tour guides, plaques, memorials, and namesakes.
    </p>
    <p>
      Click <em>Explore</em> to freely move through our locations, or
      click
      <em>Guided Tour</em> to begin our tour through a subset of these
      sites.
    </p>
    <div id="buttonContainer">
      <button id="explore" on:click={() => chooseGuided(false)}
        >Explore</button
      >
      <button id="guided" on:click={() => chooseGuided(true)}
        >Guided Tour</button
      >
    </div>
  </div>
</div>

<style>
  .about {
    text-align: center;
  }

  .about-text {
    padding: 1em;
    display: flex;
    flex-flow: column;
    place-items: center;
  }

  h1 {
    font-size: 2rem;
    color: #3547ff;
  }

  .about-text > * {
    max-width: 57ch;
  }

  ol {
    margin: 0;
  }

  p,
  li {
    text-align: left;
    box-sizing: border-box;
    margin: 0.5rem 0;
  }

  #buttonContainer {
    margin: 1rem;
  }

  button {
    border-radius: 4.33px;
    padding: 0.5rem;
    font-size: 1rem;
    margin: 0.5rem;
    cursor: pointer;
    transition: 0.4s;
  }

  #explore:hover {
    background-color: black;
    color: white;
  }

  #guided {
    color: #00356b;
    border: solid 1px #00356b;
  }
  #guided:hover {
    background-color: #00356b;
    color: white;
  }
</style>
