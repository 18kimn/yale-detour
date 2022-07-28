<script>
  import {onMount} from 'svelte'
  import {slide} from 'svelte/transition'
  import {guided} from '../store.js'
  import Glitch from './Glitch.svelte'
  import Modal from './Modal.svelte'
  import About from './About.svelte'
  import Credits from './Credits.svelte'

  let showingModal = false
  let modalComponent = About

  function toggleModal() {
    showingModal = !showingModal
    modalComponent = undefined
  }

  let menu
  let showHamburger = false
  let showMenu = false
  onMount(() => {
    document.addEventListener('click', (event) => {
      if (!event.path.includes(menu)) {
        showMenu = false
      }
    })
    const ro = new ResizeObserver((entries) => {
      const {width} = entries[0].contentRect
      showHamburger = width < 400
    })
    ro.observe(document.querySelector('body'))
  })
</script>

<nav>
  <!-- the if clause is necessary to prevent it from overriding the 
aria-hidden=true property on the main site content -->
  {#if showingModal}
    <Modal {toggleModal} showing={showingModal}>
      <svelte:component this={modalComponent} {toggleModal} />
    </Modal>
  {/if}
  <div class="header">
    <Glitch style="white-space: nowrap;">
      <h1><a href="/">The Yale Detour</a></h1>
    </Glitch>
    <!-- the lengths I have to go to for responsive design... rip-->
    {#if showHamburger}
      <svg
        bind:this={menu}
        aria-hidden="true"
        viewBox="0 0 24 24"
        on:click={() => {
          showMenu = !showMenu
        }}
      >
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    {/if}
  </div>
  {#if showHamburger && showMenu}
    <div class="menu-buttons" transition:slide>
      <button
        on:click={() => {
          modalComponent = About
          showingModal = true
        }}>About</button
      >
      <button
        on:click={() => {
          modalComponent = Credits
          showingModal = true
        }}>Credits</button
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
  {/if}
  {#if !showHamburger}
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
            modalComponent = Credits
            showingModal = true
          }}>Credits</button
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
  {/if}
</nav>

<style>
  nav,
  button {
    color: black;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 700px) {
    nav {
      flex-flow: column;
      place-items: center;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    justify-content: flex-end;
  }

  #wrapper {
    display: flex;
  }

  svg {
    height: 2rem;
    cursor: pointer;
    transition: all ease-in-out 200ms;
  }

  .menu-buttons button {
    width: 100%;
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    transition: all ease-in-out 200ms;
  }

  .menu-buttons button:hover,
  svg:hover {
    background: lightgray;
  }

  button {
    border: none;
    transition: all ease-in-out 0.4s;
    cursor: pointer;
    position: relative;
    height: fit-content;
    white-space: nowrap;
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
