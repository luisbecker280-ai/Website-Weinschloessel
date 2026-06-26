/**
 * ReservierenPage.js
 * -------------------------------------------------------------
 * Platzhalter-Seite für die Reservierung.
 *
 * Aktuell: Hinweis + direkte Kontaktmöglichkeit (Telefon/E-Mail).
 *
 * SPÄTER: Genau hier wird das Reservierungssystem (Metro) eingebunden.
 * Der leere Container  #reservierung-system  ist dafür der vorgesehene
 * "Andockpunkt" – dort kann später das Widget/das Formular hineingeladen
 * werden, ohne den restlichen Code zu verändern.
 * -------------------------------------------------------------
 */
import { Page } from "../core/Page.js";
import { content, site } from "../data/content.js";
import { brandMark } from "../components/components.js";
import { ScrollReveal } from "../core/ScrollReveal.js";

export class ReservierenPage extends Page {
  constructor(app) {
    super(app);
    this.title = "Reservieren";
  }

  render() {
    const k = content.kontakt;
    const tel = k.phone.replace(/\s+/g, "");

    return `
      <article class="legal reservation">
        <header class="legal__head" data-reveal>${brandMark("sm", site.logo.src)}</header>
        <h1 class="legal__title" data-reveal>Reservieren</h1>

        <p class="legal__lead" data-reveal>
          Wir freuen uns auf Ihren Besuch. Reservieren Sie ganz einfach telefonisch
          oder per E-Mail – unser Online-Reservierungssystem folgt in Kürze.
        </p>

        <div class="reservation__actions" data-reveal>
          <a class="btn" href="tel:${tel}">Anrufen: ${k.phone}</a>
          <a class="btn btn--ghost" href="mailto:${k.email}">E-Mail schreiben</a>
        </div>

        <!-- Andockpunkt für das spätere Reservierungssystem (Metro). -->
        <div id="reservierung-system" class="reservation__embed" hidden></div>
      </article>`;
  }

  onMount(container) {
    this.reveal = new ScrollReveal(container);
  }

  onUnmount() {
    this.reveal && this.reveal.disconnect();
  }
}
