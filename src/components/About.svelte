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
    <blockquote>
      Yale is committed to improving the world today and for future
      generations through outstanding research and scholarship,
      education, preservation, and practice.
    </blockquote>
    <cite>&mdash; Yale University Mission Statement</cite>
    <br />
    <div class="text-container">
      <p>
        Empire is everywhere at Yale. From benefactor-named buildings
        to exclusive library access to Old Campus’ towering oak trees,
        Yale produces and affirms its own regime of truth. It is a
        truth born from revision; those in power selectively mold a
        collective memory that romanticizes Yale’s reach as one of
        progression, redemption, and (performative) reconciliation.
        Empire desires to be the only logic that people consume.
        Education is the mode through which these desires become
        attainable. Yet, histories of Yale’s present haunt every
        corner of its landscape. The student-led tour captures one of
        these many ghouls, its presentation of space a practice of
        Yale’s empire-building.
      </p>
      <p>
        The Yale Detour seeks to complicate readers’ conception of
        Yale as a beacon of prestige and opportunity. We see the
        COVID-19 pandemic and the university’s subsequent shutdown as
        a moment of possibilty in this regard; this is a chance to
        reorient and reimagine how we interact with the space Yale
        occupies in New Haven. While Yale certainly lives up to its
        promise of granting special status to inheritors of its name
        and legacy, it does so at a price. That price is protection of
        the status quo, a stasis ensuring that power is left
        untouched, in fact, strengthened. Centuries of domination and
        control create(d) Yale and bring life to its educational
        mission of “improving” the world. Divorcing past from present
        safeguards every tower, dining hall, statue, museum,
        stained-glass window, and even restroom from subversion and
        rupture.
      </p>
      <p>
        Still, as totalizing as empire and power appear at Yale, they
        are also made fragile by bringing the university’s colonial
        origins to the fore. When boundaries between the past,
        present, and future are collapsed, power’s protection withers.
        <strong>
          While traditional tours are meant to impart familiarity and
          comfort, this project is not intended to provide answers or
          moral reconciliation.
        </strong>
        Even the physical walk to each site won’t be easy. Possibilities
        lie outside power’s grasp, but they require excavations within
        its stronghold. Each site in the “DeTour” initiates that excavation.
      </p>
    </div>
  </div>
  <div id="buttonContainer">
    <button id="explore" on:click={() => chooseGuided(false)}
      >Explore</button
    >
    <button id="guided" on:click={() => chooseGuided(true)}
      >Guided Tour</button
    >
  </div>
</div>

<style>
  .about {
    text-align: center;
    padding-top: 4rem;
  }

  .about-text {
    padding: 1em;
    border-top: solid 1px lightgray;
    border-bottom: solid 1px lightgray;
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

  p,
  blockquote {
    text-align: left;
    box-sizing: border-box;
  }

  cite {
    text-align: right;
    display: block;
    width: 100%;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    place-items: center;
  }

  #buttonContainer {
    margin: 2rem 0 3rem 0;
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
