/**
 * ReservationWidget.js
 * -------------------------------------------------------------
 * Bindet das Online-Reservierungstool von DISH / METRO ein.
 *
 * DATENSCHUTZ / BEDIENUNG:
 *  - Hat der Gast den Cookie-/Datenschutz-Hinweis akzeptiert, wird das
 *    Tool SOFORT geladen – ohne zusätzlichen Klick.
 *  - Ist noch keine Zustimmung erteilt, zeigt der Bereich einen kurzen
 *    Hinweis mit dem Knopf „Zustimmen & reservieren": ein Klick erteilt
 *    die Einwilligung (wie im Banner) und lädt das Tool direkt.
 *  - Klickt der Gast anderswo (Banner) auf „Akzeptieren", lädt sich das
 *    Tool automatisch mit (über das zentrale Zustimmungs-Ereignis).
 *
 * Farben/IDs kommen aus content.js unter `reservierung`.
 * -------------------------------------------------------------
 */
import { content } from "../data/content.js";
import { CookieConsent, CONSENT_EVENT } from "./CookieConsent.js";

export class ReservationWidget {
  constructor(mountEl) {
    this.mount = mountEl;
    this.cfg = content.reservierung;
    this.loaded = false;

    // Sobald irgendwo zugestimmt wird, das Tool laden.
    this._onConsent = (e) => {
      if (e.detail === "accepted") this._load();
    };
    window.addEventListener(CONSENT_EVENT, this._onConsent);
  }

  /** Direkt laden (bei Zustimmung) oder kurzen Hinweis zeigen. */
  render() {
    if (!this.mount || !this.cfg) return;
    if (CookieConsent.accepted()) {
      this._load();
    } else {
      this._prompt();
    }
  }

  /** Kurzer Hinweis: Zustimmung erfolgt NUR über den Cookie-Hinweis.
   *  Hier gibt es keinen eigenen Zustimmungs-Knopf – nur einen Verweis,
   *  der die Cookie-Einstellungen öffnet. Nach "Akzeptieren" lädt sich das
   *  Tool automatisch (über CONSENT_EVENT). */
  _prompt() {
    this.mount.innerHTML = `
      <div class="resv-gate">
        <p class="resv-gate__text">
          Für die Online-Reservierung akzeptieren Sie bitte die
          Cookie-/Datenschutz-Einstellungen. Danach wird das Reservierungstool
          automatisch freigeschaltet. Mehr in der
          <a href="#datenschutz" data-route="datenschutz">Datenschutzerklärung</a>.
        </p>
        <button type="button" class="btn" data-cookie-settings>Cookie-Einstellungen öffnen</button>
      </div>`;
    // Der Knopf trägt data-cookie-settings und wird in app.js behandelt
    // (öffnet den Cookie-Hinweis) – kein eigener Zustimmungs-Klick hier.
  }

  /** Das eigentliche DISH-Widget einbinden (nur einmal). */
  _load() {
    if (this.loaded) return;
    this.loaded = true;

    const { eid, tagId, src } = this.cfg;
    const c = this.cfg.colors || {};

    // Ziel-Container, in den DISH das Widget rendert.
    this.mount.innerHTML = `<div id="${tagId}"></div>`;

    // Konfiguration, die widget.js erwartet – inkl. der Design-Farben.
    window._hors = [
      ["eid", eid],
      ["tagid", tagId],
      ["width", "100%"],
      ["height", ""],
      ["foregroundColor", c.foregroundColor || ""],
      ["backgroundColor", c.backgroundColor || ""],
      ["linkColor", c.linkColor || ""],
      ["errorColor", c.errorColor || ""],
      ["primaryButtonForegroundColor", c.primaryButtonForegroundColor || ""],
      ["primaryButtonBackgroundColor", c.primaryButtonBackgroundColor || ""],
      ["secondaryButtonForegroundColor", c.secondaryButtonForegroundColor || ""],
      ["secondaryButtonBackgroundColor", c.secondaryButtonBackgroundColor || ""],
    ];

    const first = document.getElementsByTagName("script")[0];
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    first.parentNode.insertBefore(s, first);
  }
}
