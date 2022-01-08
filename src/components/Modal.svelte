<script lang="ts">
  import {fade} from 'svelte/transition'

  export let showing = false
  export let toggleModal = undefined
  function closeModal() {
    showing = false
  }
</script>

{#if showing}
  <div transition:fade id="container">
    <div id="background" on:click={toggleModal || closeModal} />
    <div id="modal">
      <div id="spacer" />
      <div id="content">
        <slot {closeModal} />
      </div>
    </div>
  </div>
{/if}

<style>
  #container {
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
    opacity: 95%;
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
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #spacer {
    height: 3rem;
  }
  #content {
    flex-grow: 1;
    overflow: auto;
    border: solid 1px black;
    border-radius: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }

  #content::-webkit-scrollbar {
    display: none;
  }
</style>
