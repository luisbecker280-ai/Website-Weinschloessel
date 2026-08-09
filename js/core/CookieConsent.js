/**
 * CookieConsent.js
 * -------------------------------------------------------------
 * Einwilligungs-Hinweis ("Cookie-Banner").
 *
 * Diese Website setzt von sich aus KEINE Tracking-Cookies. Gespeichert
 * wird nur Ihre Entscheidung hier. Die Zustimmung ("Akzeptieren") ist
 * zugleich die Einwilligung dafür, dass externe Inhalte – aktuell das
 * Online-Reservierungstool (DISH/METRO) – geladen werden dürfen.
 *
 * Zentrale Verteilung: Bei jeder Entscheidung wird ein Ereignis
 * ausgelöst (CONSENT_EVENT). So kann z. B. das Reservierungstool sofort
 * reagieren und sich laden, ohne dass der Gast noch einmal extra klicken
 * muss. Status abfragen:  if (CookieConsent.accepted()) { ... }
 *
 * Hinweis: Den genauen Text vor dem Live-Gang fachkundig prüfen lassen.
 * -------------------------------------------------------------
 */
const STORAGE_KEY = "ws-consent"; // Werte: "accepted" | "declined"
export const CONSENT_EVENT = "ws-consent-changed";

export class CookieConsent {
  constructor(app) {
    this.app = app;
    this.el = null;
    // Wird ausgelöst, wenn IRGENDWO (Banner oder Reservieren-Knopf) eine
    // Entscheidung fällt -> dann den Banner ausblenden.
    this._onConsentChange = () => this._hide();
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

  /** Zustimmung von außen erteilen (z. B. über den Reservieren-Knopf).
   *  Speichert "accepted" und meldet es allen Teilen der Seite. */
  static grant() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignorieren */
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: "accepted" }));
  }

  /** Beim Seitenstart: Banner nur zeigen, wenn noch keine Entscheidung vorliegt. */
  render() {
    if (CookieConsent.state()) return; // schon entschieden -> nichts tun
    this._build();
  }

  /** Hinweis erneut öffnen (z. B. über "Cookie-Einstellungen" im Footer). */
  openSettings() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignorieren */
    }
    if (!this.el || !document.body.contains(this.el)) this._build();
  }

  /** Den Banner tatsächlich aufbauen und einblenden. */
  _build() {
    if (this.el && document.body.contains(this.el)) return; // schon sichtbar

    this.el = document.createElement("div");
    this.el.className = "consent";
    this.el.setAttribute("role", "dialog");
    this.el.setAttribute("aria-label", "Hinweis zum Datenschutz");
    this.el.innerHTML = `
      <div class="consent__inner">
        <p class="consent__text">
          Wir verwenden technisch notwendige Speicherung, damit diese Seite
          funktioniert. Mit „Akzeptieren“ willigen Sie außerdem ein, dass
          externe Inhalte – wie das Online-Reservierungstool (DISH/METRO) –
          geladen werden dürfen. Details in der
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
    window.addEventListener(CONSENT_EVENT, this._onConsentChange);
    // kleine Verzögerung -> sanftes Einblenden
    requestAnimationFrame(() => this.el && this.el.classList.add("is-visible"));
  }

  _decide(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* localStorage gesperrt -> Entscheidung gilt nur für diesen Besuch */
    }
    // allen Teilen der Seite melden (das Reservierungstool lädt dann ggf. sofort)
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  }

  /** Banner sanft ausblenden und entfernen. */
  _hide() {
    window.removeEventListener(CONSENT_EVENT, this._onConsentChange);
    const el = this.el;
    this.el = null;
    if (!el) return;
    el.classList.remove("is-visible");
    el.addEventListener("transitionend", () => el.remove(), { once: true });
  }
}
