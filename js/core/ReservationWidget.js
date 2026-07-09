/**
 * ReservationWidget.js
 * -------------------------------------------------------------
 * Bindet das Online-Reservierungstool von DISH / METRO ein.
 *
 * DATENSCHUTZ: Das Tool lädt ein Skript von reservation.dish.co und
 * überträgt dabei Daten (z. B. IP-Adresse) an einen Dritt-Anbieter.
 * Deshalb laden wir es NICHT automatisch beim Seitenaufruf, sondern:
 *   - sofort, WENN der Gast im Cookie-Banner zugestimmt hat, ODER
 *   - erst nach Klick auf "Reservierungstool laden" (= Einwilligung).
 * Das entspricht dem gleichen Muster wie "Google Maps mit Einwilligung"
 * in der Datenschutzerklärung.
 *
 * Der Einbettungscode (IDs) stammt aus der METRO-Mail und steht in
 * content.js unter `reservierung`.
 * -------------------------------------------------------------
 */
import { content } from "../data/content.js";
import { CookieConsent } from "./CookieConsent.js";

export class ReservationWidget {
  constructor(mountEl) {
    this.mount = mountEl;
    this.cfg = content.reservierung;
    this.loaded = false;
  }

  /** Entscheidet: direkt laden (bei Zustimmung) oder Hinweis zeigen. */
  render() {
    if (!this.mount || !this.cfg) return;
    if (CookieConsent.accepted()) {
      this._load();
    } else {
      this._gate();
    }
  }

  /** Datenschutz-Hinweis mit "Laden"-Knopf, solange keine Zustimmung. */
  _gate() {
    this.mount.innerHTML = `
      <div class="resv-gate">
        <p class="resv-gate__text">
          Für die Online-Reservierung wird das Tool von <strong>DISH / METRO</strong>
          geladen. Dabei werden Daten (z.&nbsp;B. Ihre IP-Adresse) an
          <em>reservation.dish.co</em> übertragen. Mehr dazu in der
          <a href="#datenschutz" data-route="datenschutz">Datenschutzerklärung</a>.
        </p>
        <button type="button" class="btn" data-load-reservation>Reservierungstool laden</button>
      </div>`;
    const btn = this.mount.querySelector("[data-load-reservation]");
    btn.addEventListener("click", () => this._load());
  }

  /** Das eigentliche DISH-Widget einbinden (nur einmal). */
  _load() {
    if (this.loaded) return;
    this.loaded = true;

    const { eid, tagId, src } = this.cfg;

    // Ziel-Container, in den DISH das Widget rendert.
    this.mount.innerHTML = `<div id="${tagId}"></div>`;

    // Konfiguration, die widget.js erwartet (Farben leer = DISH-Standard;
    // lassen sich später an das olivgrün/gold anpassen).
    window._hors = [
      ["eid", eid],
      ["tagid", tagId],
      ["width", "100%"],
      ["height", ""],
      ["foregroundColor", ""],
      ["backgroundColor", ""],
      ["linkColor", ""],
      ["errorColor", ""],
      ["primaryButtonForegroundColor", ""],
      ["primaryButtonBackgroundColor", ""],
      ["secondaryButtonForegroundColor", ""],
      ["secondaryButtonBackgroundColor", ""],
    ];

    const first = document.getElementsByTagName("script")[0];
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    first.parentNode.insertBefore(s, first);
  }
}
