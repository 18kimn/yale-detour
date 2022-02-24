<script lang="ts">
  import Nav from './SiteNav.svelte'
  import Map from './Map/Map.svelte'
  import Modal from './Modal.svelte'
  import Intro from './Intro.svelte'
  import {mainHidden} from '../store.js'

  let showing = true
  function toggleModal() {
    showing = !showing
  }
</script>

<Modal {toggleModal} {showing}>
  <Intro {toggleModal} />
</Modal>
<div id="content" style="height: 100%;" aria-hidden={$mainHidden}>
  <Nav />
  <Map />
</div>

<style>
  #content {
    display: flex;
    flex-flow: column;
  }
</style>
