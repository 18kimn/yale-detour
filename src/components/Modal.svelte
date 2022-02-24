<script lang="ts">
  import {fade} from 'svelte/transition'
  import {mainHidden} from '../store.js'

  // mainHidden toggles aria-hidden='true' on the main content
  // so screen readers focus on the modal when it's showing

  export let showing = false
  export let toggleModal = undefined

  const toggle = () => {
    showing = false
    mainHidden.set(false)
    if (toggleModal) toggleModal()
  }
  $: mainHidden.set(showing)
</script>

{#if showing}
  <div transition:fade id="container">
    <button
      id="background"
      aria-label="Close Modal"
      on:click={toggle}
    />
    <div id="modal">
      <div id="spacer" on:click={toggle} />
      <div id="content">
        <slot closeModal={toggleModal} />
      </div>
    </div>
  </div>
{/if}

<style>
  #container {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    z-index: 4;
    /* mapbox has a z-index of 2 on their attribution
      so for the modal to work it has to have a higher one
     */
  }

  #background {
    position: absolute;
    background-color: black;
    opacity: 90%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 3;
  }

  #modal {
    position: relative;
    z-index: 4;
    height: fit-content;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 2rem;
  }

  #spacer {
    cursor: pointer;
    height: 3rem;
  }

  #content {
    flex-grow: 1;
    overflow: auto;
    border: solid 1px black;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 1rem;
    box-sizing: border-box;
  }

  #content::-webkit-scrollbar {
    display: none;
  }
</style>
