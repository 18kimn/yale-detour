<script lang="ts">
  import {guided} from '../store.js'
  import Glitch from './Glitch.svelte'
  import Modal from './Modal.svelte'
  import About from './Intro.svelte'
  import Contact from './Contact.svelte'

  let showingModal = false
  let modalComponent = About

  function toggleModal() {
    showingModal = !showingModal
    modalComponent = undefined
  }
</script>

<nav>
  <!-- the if clause is necessary to prevent it from overriding the 
aria-hidden=true property on the main site content -->
  {#if showingModal}
    <Modal {toggleModal} showing={showingModal}>
      <svelte:component this={modalComponent} {toggleModal} />
    </Modal>
  {/if}
  <Glitch>
    <h1><a href="/">The Yale Detour</a></h1>
  </Glitch>
  <div id="section">
    <div id="wrapper">
      <button
        on:click={() => {
          modalComponent = About
          showingModal = true
        }}>About</button
      >
      <button
        on:click={() => {
          modalComponent = Contact
          showingModal = true
        }}>Contact us</button
      >
      {#if $guided}
        <button on:click={() => guided.set(false)}
          >Explore the locations</button
        >
      {:else}
        <button on:click={() => guided.set(true)}
          >Switch to a guided tour</button
        >
      {/if}
    </div>
  </div>
</nav>

<style>
  nav,
  button {
    color: black;
    display: flex;
    justify-content: space-between;
  }

  #section,
  h1 {
    display: flex;
    margin: 0.8rem;
  }
  h1 {
    color: #3547ff;
    font-size: 1.5rem;
    height: fit-content;
  }
  a {
    text-decoration: unset;
    color: unset;
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
