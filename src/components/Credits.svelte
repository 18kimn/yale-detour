<script>
  export let toggleModal

  /** receives number as day, prints appropriate suffix */
  function nth(d) {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const date = import.meta.compileTime('../date-published.js').date
  const month = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date)
  const year = date.getFullYear()
  const day = date.getDate()
  const dateFormatted = `${month} ${day}${nth(day)}, ${year}`
</script>

<div id="container">
  <div id="button-container">
    <button aria-label="Close Modal" on:click={toggleModal} />
  </div>
  <div id="contact-content">
    <h1>Credits and contact information</h1>
    <p class="last-updated">
      <em>Last updated on {dateFormatted} by Nathan Kim.</em>
    </p>
    <br />

    <p>
      The Yale Detour has several people to acknowledge and thank for
      their generous work on this project.
    </p>

    <section>
      <h2>Cultural Connections and project foundation</h2>
      <ul>
        <li>Janis Jin, Class of 2020</li>
        <li>Esul Burton, Class of 2020</li>
        <li>Collin Bentley, Class of 2019</li>
      </ul>
      <p>
        Esul and Janis began the first known iteration of the Yale
        Detour in 2019 as leaders of the Cultural Connections (CC)
        preorientation program. At that time, the Yale Detour was an
        in-person walking tour of Yale's campus known as the Yale
        Critical History Tour, as part of an introduction to Yale for
        incoming first-year students by CC counselors.
      </p>
      <p>
        Seeking to also present the tour outside of the CC
        preorientation program, Janis and Esul began working with
        Collin on a web-based version of the tour. Our codebase is
        heavily indebted to Collin's foundational work.
      </p>
    </section>

    <section>
      <h2>
        EDST255: <em>Education and Empire</em>
      </h2>

      <ul>
        <li>Amy Kim, Class of 2022</li>
        <li>Jose Garcia, Class of 2022</li>
        <li>Dr. Tayla Zemach-Bersin</li>
        <li>
          and all of the students in the Fall 2020 iteration of
          <em>Education and Empire</em>
        </li>
      </ul>
      <p>
        Many of the sites in the Yale Detour come from the Fall 2020
        class of Dr. Zemach-Bersin's <em>Education and Empire</em>. As
        part of their final project, many students collaborated on a
        <a
          href="https://www.flipsnack.com/yaledetours/yale-detours.html"
          target="_blank"
          rel="noreferrer">zine called The Yale Detour.</a
        >
        Like the CC walking tour, students in EDST255 also aimed to provide
        an alternative history of Yale by excavating histories of oppression
        and struggle at Yale.
      </p>
    </section>

    <section>
      <h2>Creating a digital tour</h2>
      <ul>
        <li>Nathan Kim, Class of 2022</li>
        <li>Dora Guo, Class of 2023</li>
        <li>Resty Fufunan, Class of 2024</li>
      </ul>
      <p>
        These projects joined forces in the fall of 2021 when Janis,
        who had now graduated, handed off the project to Nathan to
        finish the creation of tour as a website. Nathan approached
        Resty to collaborate on the codebase. He also proposed
        combining the CC tour and the <em>Education and Empire</em>
        zine to Amy and Jose, who in turn invited Dora to help with the
        conversion and especially with the website design.
      </p>
    </section>

    <section>
      <h2>Future collaborations?</h2>
      <p>
        The Yale Detour exists because of the collective work of
        multiple groups of Yale students. The future of the Yale
        Detour similarly lies in the potential of collective work. We
        believe in these collaborations, and we'd love to have
        discussion, additional development, research, or even
        criticism from you, the reader. If you're interested in
        helping maintain, improve, or extend this site, or otherwise
        would like to discuss the Yale Detour, please reach out to
        Nathan Kim at nathan.kim@yale.edu!
      </p>
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
    box-sizing: border-box;
    padding: 1rem;
    padding-top: 0;
    max-width: 70ch;
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
    margin: 2rem 0;
  }

  ul,
  p {
    margin: 0.5rem;
  }

  p {
    text-indent: 3ch;
  }

  .last-updated {
    text-indent: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
  }
</style>
