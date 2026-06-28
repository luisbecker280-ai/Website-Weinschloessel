/**
 * PdfPage.js
 * -------------------------------------------------------------
 * Eine Seite, die ein PDF DIREKT IN DER WEBSITE anzeigt (eingebettet),
 * nicht in einem separaten Browser-Tab. Wird für Speise- und Weinkarte
 * genutzt. Aufbau wie die Rechtsseiten: weißer Hintergrund, Logo oben.
 *
 * Eine Klasse, zwei Verwendungen (objektorientiert, ohne Doppelcode):
 *   new PdfPage(app, { title: "Speisekarte", pdf: "assets/pdf/speisekarte.pdf" })
 *   new PdfPage(app, { title: "Weinkarte",   pdf: "assets/pdf/weinkarte.pdf" })
 *
 * Das <object> bettet das PDF mit dem PDF-Betrachter des Browsers ein.
 * Falls ein (älterer/mobiler) Browser das nicht kann, gibt es einen
 * Ersatz-Link.
 * -------------------------------------------------------------
 */
import { Page } from "../core/Page.js";
import { site } from "../data/content.js";
import { brandMark } from "../components/components.js";
import { ScrollReveal } from "../core/ScrollReveal.js";

export class PdfPage extends Page {
  constructor(app, { title, pdf }) {
    super(app);
    this.title = title;
    this.pdf = pdf;
  }

  render() {
    return `
      <article class="legal cardpage">
        <header class="legal__head" data-reveal>${brandMark("sm", site.logo.src)}</header>
        <h1 class="legal__title" data-reveal>${this.title}</h1>

        <div class="pdfbox" data-reveal>
          <object class="pdfbox__frame" data="${this.pdf}#view=FitH" type="application/pdf">
            <p class="pdfbox__fallback">
              Ihr Browser kann das PDF hier nicht direkt anzeigen.
              <a href="${this.pdf}" target="_blank" rel="noopener">${this.title} öffnen</a>
            </p>
          </object>
        </div>

        <p class="pdfbox__download">
          <a class="btn btn--ghost" href="${this.pdf}" download>${this.title} herunterladen</a>
        </p>
      </article>`;
  }

  onMount(container) {
    this.reveal = new ScrollReveal(container);
  }

  onUnmount() {
    this.reveal && this.reveal.disconnect();
  }
}
