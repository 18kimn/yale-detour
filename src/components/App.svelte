<script lang="ts">
  import SiteNav from './SiteNav.svelte'
  import Map from './Map.svelte'
  import Modal from './Modal.svelte'
  import Intro from './Intro.svelte'
  import {mainHidden} from '../store.js'
</script>

<Modal let:closeModal showing>
  <Intro {closeModal} />
</Modal>
<div id="content" style="height: 100%;" aria-hidden={$mainHidden}>
  <SiteNav />
  <Map />
</div>

<style>
  #content {
    display: flex;
    flex-flow: column;
  }
</style>
