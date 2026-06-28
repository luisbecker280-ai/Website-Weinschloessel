/**
 * Router.js
 * -------------------------------------------------------------
 * Das Herz der "Single Page Application" (SPA).
 *
 * Die ganze Website besteht aus EINER index.html. Der Router zeigt je
 * nach Adresse (#home, #impressum ...) die passende Seite im <main>.
 *
 * WICHTIG (gegen Flackern/Neuladen): Jede Seite wird nur EINMAL gebaut
 * und behält danach ihren Platz im Speicher. Beim Wechseln wird nur
 * um- statt neugeschaltet (ein-/ausgeblendet). Dadurch werden Bilder
 * NICHT erneut geladen und es gibt keinen weißen "Lade-Streifen" mehr.
 *
 * Außerdem kümmert er sich um:
 *   - Klicks auf [data-route="..."]  -> Unterseite öffnen
 *   - Klicks auf [data-scroll="..."] -> weich zum Bereich der Startseite
 *   - Browser-Vor/Zurück-Knopf (über das hashchange-Ereignis)
 * -------------------------------------------------------------
 */
import { site } from "../data/content.js";
import { smoothScrollTo } from "./smoothScroll.js";

export class Router {
  /**
   * @param {HTMLElement} outlet - Element, in das die Seiten kommen (#app)
   * @param {App} app
   */
  constructor(outlet, app) {
    this.outlet = outlet;
    this.app = app;
    this.routes = new Map(); // id -> Page-Instanz
    this.views = new Map(); // id -> bereits gebautes <section>-Element
    this.current = null;
    this.defaultRoute = "home";
  }

  /** Eine Seite unter einer ID registrieren (verkettbar). */
  register(id, page) {
    page.id = id;
    this.routes.set(id, page);
    return this;
  }

  /** Router starten: Listener setzen und erste Seite anzeigen. */
  start() {
    window.addEventListener("hashchange", () => this.resolve());
    document.addEventListener("click", (e) => this._onClick(e));
    this.resolve();
  }

  /** Zu einer Seite navigieren (ändert die Adresse -> löst resolve() aus). */
  navigate(id) {
    if (location.hash.slice(1) === id) {
      this.resolve(); // gleiche Seite -> nur erneut anzeigen (ist günstig)
    } else {
      location.hash = id;
    }
  }

  /** Aktuelle Adresse auswerten und passende Seite anzeigen. */
  resolve() {
    const id = location.hash.slice(1) || this.defaultRoute;
    const validId = this.routes.has(id) ? id : this.defaultRoute;
    this._show(validId);
    this.app.navbar.setActive(validId);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  /** Die gewünschte Seite sichtbar machen (und beim ersten Mal bauen). */
  _show(id) {
    const view = this._ensureView(id);

    // alle anderen Seiten ausblenden, die gewünschte einblenden
    this.views.forEach((el, key) => {
      el.hidden = key !== id;
    });

    // sanfte Einblend-Animation neu auslösen
    view.classList.remove("is-entering");
    void view.offsetWidth; // erzwingt ein "reflow", damit die Animation greift
    view.classList.add("is-entering");

    const page = this.routes.get(id);
    this.current = page;
    document.title = page.title ? `${page.title} – ${site.name}` : site.name;
  }

  /** Seite beim ersten Aufruf einmalig bauen und behalten. */
  _ensureView(id) {
    if (this.views.has(id)) return this.views.get(id);

    const page = this.routes.get(id);
    const wrapper = document.createElement("div");
    wrapper.className = "page-view";
    wrapper.dataset.view = id;
    wrapper.innerHTML = page.render();
    this.outlet.appendChild(wrapper);
    this.views.set(id, wrapper);

    // Lebenszyklus: genau EINMAL nach dem Einsetzen.
    if (typeof page.onMount === "function") page.onMount(wrapper);
    return wrapper;
  }

  /** Globale Klick-Behandlung für Navigations- und Scroll-Links. */
  _onClick(e) {
    const routeEl = e.target.closest("[data-route]");
    if (routeEl) {
      e.preventDefault();
      this.navigate(routeEl.dataset.route);
      return;
    }

    const scrollEl = e.target.closest("[data-scroll]");
    if (scrollEl) {
      e.preventDefault();
      this._scrollToSection(scrollEl.dataset.scroll);
    }
  }

  /** Abstand von oben: Höhe der fixen Leiste + etwas Luft. */
  _scrollOffset() {
    const css = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
    const headerH = parseInt(css, 10) || 64;
    return headerH + 24;
  }

  /** Weich zu einem Bereich der Startseite scrollen (ggf. erst dorthin). */
  _scrollToSection(sectionId) {
    const go = () => {
      const el = document.getElementById(sectionId);
      smoothScrollTo(el, { offset: this._scrollOffset(), duration: 1000 });
      // Menüpunkt sofort markieren (nicht erst, wenn das Scrollen ankommt)
      this.app.navbar.setActive(sectionId);
    };

    if (this.current && this.current.id === "home") {
      go();
    } else {
      this.navigate("home");
      // eine Bild-Aktualisierung abwarten, bis "home" sichtbar ist
      requestAnimationFrame(() => requestAnimationFrame(go));
    }
  }
}
