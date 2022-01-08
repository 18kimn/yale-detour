<script>
  export let closeModal
</script>

<div id="container">
  <div id="button-container">
    <button aria-label="Close Modal" on:click={closeModal} />
  </div>
  <div id="contact-content">
    <h1>Contact</h1>

    Please reach out to any of us to offer feedback on the site,
    suggest new locations, discuss development of this project, or
    anything else!
    <section>
      <h2>Main</h2>
      <p>Nathan Kim, nathan.kim@yale.edu</p>
    </section>
    <section>
      <h2>Design</h2>
      <p>Dora Guo, dora.guo@yale.edu</p>
    </section>
    <section>
      <h2>Development</h2>
      <ul>
        <li>Nathan Kim, nathan.kim@yale.edu</li>
        <li>Resty Fufunan, resty.fufunan@yale.edu</li>
      </ul>
    </section>
    <section>
      <h2>Writing</h2>
      <ul>
        <li>Jose Garcia, jose.garcia@yale.edu</li>
        <li>Amy Kim, amy.kim@yale.edu</li>
      </ul>
    </section>
  </div>
</div>

<style>
  #button-container {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
  }

  button {
    cursor: pointer;
    background-color: black;
    margin: 1rem;
    width: 1.5rem;
    height: 1rem;
    -webkit-mask: url(/images/close.svg) no-repeat;
    mask: url(/images/close.svg) no-repeat;
  }

  #contact-content {
    padding: 0 3rem 3rem 3rem;
  }

  h1 {
    margin-top: 0;
    font-size: 2rem;
  }

  h2 {
    font-size: 1rem;
    margin: 0;
  }

  section {
    margin: 1rem 0;
  }

  ul,
  p,
  li {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }
</style>
