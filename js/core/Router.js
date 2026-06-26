/**
 * Router.js
 * -------------------------------------------------------------
 * Das Herz der "Single Page Application" (SPA).
 *
 * Die ganze Website besteht aus EINER index.html. Der Router tauscht
 * je nach gewählter Adresse (#home, #impressum ...) den Inhalt im
 * <main>-Bereich aus – ganz ohne Neuladen der Seite. Das sorgt für
 * den weichen, dynamischen Seitenwechsel.
 *
 * Zusätzlich kümmert er sich um:
 *   - Klicks auf [data-route="..."]  -> Unterseite öffnen
 *   - Klicks auf [data-scroll="..."] -> zum Bereich der Startseite scrollen
 *   - Browser-Vor/Zurück-Knopf (über das hashchange-Ereignis)
 * -------------------------------------------------------------
 */
import { site } from "../data/content.js";

export class Router {
  /**
   * @param {HTMLElement} outlet - Element, in das die Seiten gerendert werden (#app)
   * @param {App} app
   */
  constructor(outlet, app) {
    this.outlet = outlet;
    this.app = app;
    this.routes = new Map(); // id -> Page-Instanz
    this.current = null;
    this.defaultRoute = "home";
  }

  /** Eine Seite unter einer ID registrieren. Gibt sich selbst zurück
   *  (damit man register(...).register(...) verketten kann). */
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

  /** Zu einer Seite navigieren (ändert die Adresse, was resolve() auslöst). */
  navigate(id) {
    if (location.hash.slice(1) === id) {
      this.resolve(); // gleiche Seite -> trotzdem neu auflösen (z. B. nach Scroll)
    } else {
      location.hash = id;
    }
  }

  /** Aktuelle Adresse auswerten und passende Seite anzeigen. */
  resolve() {
    const id = location.hash.slice(1) || this.defaultRoute;
    const page = this.routes.get(id) || this.routes.get(this.defaultRoute);
    this._mount(page);
    this.app.navbar.setActive(page.id);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  /** Seite ins DOM einsetzen und Lebenszyklus-Methoden aufrufen. */
  _mount(page) {
    if (this.current && typeof this.current.onUnmount === "function") {
      this.current.onUnmount();
    }

    this.outlet.innerHTML = page.render();

    // Einblend-Animation für den Seitenwechsel neu starten
    this.outlet.classList.remove("is-entering");
    void this.outlet.offsetWidth; // erzwingt ein "reflow", damit die Animation greift
    this.outlet.classList.add("is-entering");

    this.current = page;
    document.title = page.title ? `${page.title} – ${site.name}` : site.name;

    if (typeof page.onMount === "function") page.onMount(this.outlet);
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

  /** Zu einem Bereich der Startseite scrollen (ggf. erst dorthin wechseln). */
  _scrollToSection(sectionId) {
    const go = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (this.current && this.current.id === "home") {
      go();
    } else {
      this.navigate("home");
      // kurz warten, bis die Startseite gerendert ist, dann scrollen
      setTimeout(go, 80);
    }
  }
}
