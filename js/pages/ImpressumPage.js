/**
 * ImpressumPage.js
 * -------------------------------------------------------------
 * Rechtsseite "Impressum". Weißer Hintergrund, das Logo erscheint
 * oben noch einmal. Inhalt kommt aus content.js (impressum).
 * -------------------------------------------------------------
 */
import { Page } from "../core/Page.js";
import { content, site } from "../data/content.js";
import { brandMark } from "../components/components.js";
import { ScrollReveal } from "../core/ScrollReveal.js";

export class ImpressumPage extends Page {
  constructor(app) {
    super(app);
    this.title = "Impressum";
  }

  render() {
    const i = content.impressum;
    return `
      <article class="legal">
        <header class="legal__head" data-reveal>${brandMark("sm", site.logo.src)}</header>

        <h1 class="legal__title" data-reveal>${i.title}</h1>
        <p class="legal__subtitle" data-reveal>${i.subtitle}</p>

        <div class="legal__block" data-reveal>
          ${i.lines.map((l) => `<p>${l}</p>`).join("")}
        </div>
        <div class="legal__block" data-reveal>
          ${i.contact.map((l) => `<p>${l}</p>`).join("")}
        </div>
      </article>`;
  }

  onMount(container) {
    this.reveal = new ScrollReveal(container);
  }

  onUnmount() {
    this.reveal && this.reveal.disconnect();
  }
}
