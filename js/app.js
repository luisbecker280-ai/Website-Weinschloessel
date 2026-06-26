/**
 * app.js  –  EINSTIEGSPUNKT der gesamten Website
 * -------------------------------------------------------------
 * Diese Datei wird von der index.html geladen (als ES-Modul).
 * Sie baut die Anwendung zusammen:
 *
 *   App
 *    ├── Navbar   (obere Leiste)
 *    ├── Footer   (unterer Bereich)
 *    └── Router   (tauscht den Seiteninhalt aus)
 *         ├── HomePage         (#home)
 *         ├── ReservierenPage  (#reservieren)
 *         ├── ImpressumPage    (#impressum)
 *         └── DatenschutzPage  (#datenschutz)
 *
 * Jede dieser Klassen liegt in einer eigenen Datei – so bleibt alles
 * sauber getrennt und leicht erweiterbar.
 * -------------------------------------------------------------
 */
import { Router } from "./core/Router.js";
import { Navbar } from "./core/Navbar.js";
import { Footer } from "./core/Footer.js";

import { HomePage } from "./pages/HomePage.js";
import { ReservierenPage } from "./pages/ReservierenPage.js";
import { ImpressumPage } from "./pages/ImpressumPage.js";
import { DatenschutzPage } from "./pages/DatenschutzPage.js";

class App {
  constructor() {
    this.navbar = new Navbar(document.getElementById("site-header"), this);
    this.footer = new Footer(document.getElementById("site-footer"), this);
    this.router = new Router(document.getElementById("app"), this);
  }

  start() {
    // 1) Dauerhaft sichtbare Bereiche aufbauen
    this.navbar.render();
    this.footer.render();

    // 2) Seiten beim Router anmelden ...
    this.router
      .register("home", new HomePage(this))
      .register("reservieren", new ReservierenPage(this))
      .register("impressum", new ImpressumPage(this))
      .register("datenschutz", new DatenschutzPage(this));

    // 3) ... und loslegen
    this.router.start();
  }
}

// Erst starten, wenn das Grundgerüst der Seite geladen ist.
document.addEventListener("DOMContentLoaded", () => new App().start());
