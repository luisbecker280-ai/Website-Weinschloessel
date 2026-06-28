/**
 * CookieConsent.js
 * -------------------------------------------------------------
 * Einwilligungs-Hinweis ("Cookie-Banner").
 *
 * EHRLICHKEIT IST PFLICHT (DSGVO): Diese Website setzt von sich aus
 * KEINE Tracking-Cookies und lädt KEINE externen Inhalte. Es wird nur
 * eine kleine technische Einstellung gespeichert (Ihre Entscheidung
 * hier) – das ist erlaubt und braucht keine Zustimmung.
 *
 * Der Banner ist daher vor allem eine VORBEREITUNG: Sobald später z. B.
 * Google Maps oder ein Reservierungssystem eingebunden wird, dürfen
 * solche externen Dienste erst nach einem Klick auf "Akzeptieren"
 * geladen werden. Andere Code-Teile können den Status so abfragen:
 *
 *     import { CookieConsent } from "./core/CookieConsent.js";
 *     if (CookieConsent.accepted()) { ...Karte laden... }
 *
 * Hinweis: Den genauen Text sollte vor dem Live-Gang ein Fachkundiger
 * (Datenschutz) prüfen.
 * -------------------------------------------------------------
 */
const STORAGE_KEY = "ws-consent"; // Werte: "accepted" | "declined"

export class CookieConsent {
  constructor(app) {
    this.app = app;
    this.el = null;
  }

  /** Liefert die gespeicherte Entscheidung (oder null). */
  static state() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  /** true, wenn externe Dienste geladen werden dürfen. */
  static accepted() {
    return CookieConsent.state() === "accepted";
  }

  /** Banner anzeigen – aber nur, wenn noch keine Entscheidung vorliegt. */
  render() {
    if (CookieConsent.state()) return; // schon entschieden -> nichts tun

    this.el = document.createElement("div");
    this.el.className = "consent";
    this.el.setAttribute("role", "dialog");
    this.el.setAttribute("aria-label", "Hinweis zum Datenschutz");
    this.el.innerHTML = `
      <div class="consent__inner">
        <p class="consent__text">
          Wir verwenden nur technisch notwendige Speicherung, damit diese
          Seite funktioniert. Externe Inhalte (z. B. Karten) werden erst
          nach Ihrer Zustimmung geladen. Mehr dazu in der
          <a href="#datenschutz" data-route="datenschutz">Datenschutzerklärung</a>.
        </p>
        <div class="consent__actions">
          <button type="button" class="btn btn--ghost" data-consent="declined">Nur notwendige</button>
          <button type="button" class="btn" data-consent="accepted">Akzeptieren</button>
        </div>
      </div>`;

    this.el.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-consent]");
      if (!btn) return;
      this._decide(btn.dataset.consent);
    });

    document.body.appendChild(this.el);
    // kleine Verzögerung -> sanftes Einblenden
    requestAnimationFrame(() => this.el.classList.add("is-visible"));
  }

  _decide(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* localStorage gesperrt -> Entscheidung gilt nur für diesen Besuch */
    }
    if (this.el) {
      this.el.classList.remove("is-visible");
      this.el.addEventListener("transitionend", () => this.el && this.el.remove(), { once: true });
    }
  }
}
