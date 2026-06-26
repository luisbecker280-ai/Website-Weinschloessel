/**
 * Footer.js
 * -------------------------------------------------------------
 * Der dunkle Fußbereich, der auf jeder Seite erscheint:
 * Facebook-Symbol + Links zu Impressum und Datenschutzerklärung.
 *
 * WICHTIG (Datenschutz): Das Facebook-Symbol ist nur ein normaler
 * Link. Es lädt KEIN Facebook-Plugin und überträgt beim Laden der
 * Seite keine Daten an Facebook – das passiert erst, wenn der Gast
 * bewusst darauf klickt.
 * -------------------------------------------------------------
 */
import { content } from "../data/content.js";

export class Footer {
  constructor(footerEl, app) {
    this.el = footerEl;
    this.app = app;
  }

  render() {
    const fb = content.footer.facebookUrl || "#";

    this.el.innerHTML = `
      <div class="site-footer__inner">
        <a class="site-footer__social" href="${fb}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H17V4.6c-.3 0-1.3-.1-2.45-.1-2.42 0-4.05 1.48-4.05 4.18v2.32H7.7V14h2.8v8h3z"/>
          </svg>
        </a>
        <nav class="site-footer__links" aria-label="Rechtliches">
          <a href="#impressum" data-route="impressum">Impressum</a>
          <a href="#datenschutz" data-route="datenschutz">Datenschutzerklärung</a>
        </nav>
      </div>`;
  }
}
