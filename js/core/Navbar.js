/**
 * Navbar.js
 * -------------------------------------------------------------
 * Die obere Navigationsleiste ("Overlay"). Sie ist auf jeder Seite
 * sichtbar und bleibt beim Scrollen oben kleben.
 *
 * Aufgaben:
 *   - Menüpunkte aus der Datei content.js erzeugen
 *   - aktiven Menüpunkt hervorheben (gold)
 *   - Burger-Menü für Smartphones auf-/zuklappen
 *   - beim Scrollen einen kräftigeren Hintergrund einblenden
 * -------------------------------------------------------------
 */
import { navigation } from "../data/content.js";

export class Navbar {
  constructor(headerEl, app) {
    this.el = headerEl;
    this.app = app;
    this.links = navigation;
  }

  /** Navigationsleiste aufbauen und Ereignisse verknüpfen. */
  render() {
    const items = this.links
      .map((l) => {
        // "route"-Links öffnen eine Unterseite, "scroll"-Links springen
        // zu einem Bereich der Startseite.
        const attr =
          l.type === "route"
            ? `href="#${l.id}" data-route="${l.id}"`
            : `href="#home" data-scroll="${l.id}"`;
        return `<li class="nav__item">
                  <a class="nav__link" data-nav="${l.id}" ${attr}>${l.label}</a>
                </li>`;
      })
      .join("");

    this.el.innerHTML = `
      <nav class="nav" aria-label="Hauptnavigation">
        <button class="nav__toggle" type="button" aria-label="Menü öffnen" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav__list">${items}</ul>
      </nav>`;

    this._bindEvents();
  }

  _bindEvents() {
    const toggle = this.el.querySelector(".nav__toggle");
    const list = this.el.querySelector(".nav__list");

    // Burger-Menü auf/zu
    toggle.addEventListener("click", () => {
      const open = this.el.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });

    // Nach einem Klick auf einen Menüpunkt das mobile Menü wieder schließen
    list.addEventListener("click", (e) => {
      if (e.target.closest(".nav__link")) this._closeMobile(toggle);
    });

    // Beim Scrollen den Hintergrund der Leiste verstärken
    window.addEventListener(
      "scroll",
      () => this.el.classList.toggle("is-scrolled", window.scrollY > 30),
      { passive: true }
    );
  }

  _closeMobile(toggle) {
    this.el.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Menü öffnen");
  }

  /** Hebt den passenden Menüpunkt hervor (per Route-ID oder Bereich-ID). */
  setActive(id) {
    this.el.querySelectorAll(".nav__link").forEach((a) => {
      a.classList.toggle("is-active", a.dataset.nav === id);
    });
  }
}
