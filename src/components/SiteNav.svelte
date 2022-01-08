<script lang="ts">
  import {guided} from '../store.js'
  import Glitch from './Glitch.svelte'
  import Modal from './Modal.svelte'
  import About from './Intro.svelte'

  let showingModal = false

  function toggleModal() {
    showingModal = !showingModal
  }
</script>

<div id="nav-bar">
  <Modal let:closeModal {toggleModal} showing={showingModal}>
    <About {closeModal} />
  </Modal>
  <Glitch>
    <h2>The Yale Detour</h2>
  </Glitch>
  <div id="section">
    <div id="wrapper">
      <button
        on:click={() => {
          showingModal = true
        }}>About</button
      >
      <button>Contact us</button>
      {#if $guided}
        <button on:click={() => guided.set(false)}
          >Explore the locations</button
        >
      {:else}
        <button on:click={() => guided.set(true)}
          >Take a Guided Tour</button
        >
      {/if}
    </div>
  </div>
</div>

<style>
  #nav-bar,
  button {
    color: black;
    display: flex;
    justify-content: space-between;
  }

  #section,
  #nav-bar :global(h1) {
    display: flex;
    margin: 0.8rem;
  }
  #nav-bar :global(h1) {
    font-size: 1.5rem;
    height: fit-content;
  }

  #section {
    place-items: center;
  }
  #wrapper {
    display: flex;
  }
  button {
    border: none;
    transition: all ease-in-out 0.4s;
    cursor: pointer;
    position: relative;
    height: fit-content;
  }

  button::after {
    position: absolute;
    bottom: 0;
    width: 0;
    left: 40%;
    height: 1px;
    background-color: gray;
    content: '';
    transition: all ease-in-out 0.1s;
  }
  button:hover {
    opacity: 0.4;
  }
  button:hover::after {
    left: 10%;
    width: 80%;
  }
</style>
