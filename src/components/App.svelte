<script lang="ts">
  import SiteNav from './SiteNav.svelte'
  import Map from './Map.svelte'
  import Modal from './Modal.svelte'
  import Intro from './Intro.svelte'
</script>

<Modal let:closeModal showing>
  <Intro {closeModal} />
</Modal>
<SiteNav />
<Map />
