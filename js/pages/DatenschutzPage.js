/**
 * DatenschutzPage.js
 * -------------------------------------------------------------
 * Rechtsseite "Datenschutzerklärung". Weißer Hintergrund, Logo oben.
 * Der lange Text wird strukturiert aus content.js (datenschutz)
 * aufgebaut: pro Abschnitt eine Überschrift, darunter Unterabschnitte
 * und Absätze.
 * -------------------------------------------------------------
 */
import { Page } from "../core/Page.js";
import { content, site } from "../data/content.js";
import { brandMark } from "../components/components.js";
import { ScrollReveal } from "../core/ScrollReveal.js";

export class DatenschutzPage extends Page {
  constructor(app) {
    super(app);
    this.title = "Datenschutzerklärung";
  }

  render() {
    const d = content.datenschutz;

    const sections = d.sections
      .map((sec) => {
        const blocks = (sec.blocks || [])
          .map((b) => {
            const sub = b.sub ? `<h3 class="legal__h3">${b.sub}</h3>` : "";
            const paras = (b.p || []).map((p) => `<p>${p}</p>`).join("");
            return sub + paras;
          })
          .join("");

        return `
          <section class="legal__section" data-reveal>
            <h2 class="legal__h2">${sec.h}</h2>
            ${blocks}
          </section>`;
      })
      .join("");

    return `
      <article class="legal">
        <header class="legal__head" data-reveal>${brandMark("sm", site.logo.src)}</header>
        <h1 class="legal__title" data-reveal>${d.title}</h1>
        ${sections}
      </article>`;
  }

  onMount(container) {
    this.reveal = new ScrollReveal(container);
  }

  onUnmount() {
    this.reveal && this.reveal.disconnect();
  }
}
