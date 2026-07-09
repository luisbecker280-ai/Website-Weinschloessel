/**
 * HomePage.js
 * -------------------------------------------------------------
 * Die Startseite (Hauptseite). Sie zeigt nacheinander:
 *   Hero (Logo) -> Öffnungszeiten -> Events -> Prodotto di Piero
 *   -> Partyservice -> Kontakt -> Abschlussbild.
 *
 * Jeder Bereich wird in einer eigenen kleinen Methode (_hero, _events ...)
 * gebaut. So bleibt der Code übersichtlich und jeder Teil ist getrennt.
 * -------------------------------------------------------------
 */
import { Page } from "../core/Page.js";
import { content, site } from "../data/content.js";
import { mediaBlock, splitRow, brandMark } from "../components/components.js";
import { ScrollReveal } from "../core/ScrollReveal.js";
import { Parallax } from "../core/Parallax.js";
import { ReservationWidget } from "../core/ReservationWidget.js";

export class HomePage extends Page {
  constructor(app) {
    super(app);
    this.title = ""; // Startseite -> nur der Restaurant-Name im Tab
  }

  render() {
    const c = content;
    return `
      ${this._hero(c.hero)}
      ${this._karten(c.karten)}
      ${this._oeffnungszeiten(c.oeffnungszeiten)}
      ${this._events(c.events)}
      ${this._prodotto(c.prodotto)}
      ${this._partyservice(c.partyservice)}
      ${this._kontakt(c.kontakt)}
      ${this._reservieren(c.reservieren)}
      ${this._closing(c.closingImage)}
    `;
  }

  /* ---------- Hero ---------- */
  _hero(h) {
    return `
      <section class="hero">
        <div class="hero__brand" data-reveal>
          ${brandMark("lg", site.logo.src)}
        </div>
        ${mediaBlock(h.image, "hero__media")}
      </section>`;
  }

  /* ---------- Karten-Streifen (schmal, olivgrün) ---------- */
  _karten(k) {
    const buttons = k.items
      .map(
        (it) => `<a class="btn" href="#${it.route}" data-route="${it.route}">${it.label}</a>`
      )
      .join("");
    return `
      <section class="cards-strip" id="karten" data-reveal>
        <div class="cards-strip__inner">
          <h2 class="cards-strip__title">${k.title}</h2>
          <div class="cards-strip__actions">${buttons}</div>
        </div>
      </section>`;
  }

  /* ---------- Öffnungszeiten ---------- */
  _oeffnungszeiten(o) {
    const blocks = o.blocks
      .map(
        (b) => `
        <div class="panel__block">
          <h3 class="panel__sub">${b.heading}</h3>
          ${b.lines.map((l) => `<p class="panel__line">${l}</p>`).join("")}
        </div>`
      )
      .join("");

    const panelHTML = `
      <h2 class="panel__title">${o.title}</h2>
      ${blocks}
      <p class="panel__note">${o.note}</p>`;

    return splitRow({ id: "oeffnungszeiten", image: o.image, imageSide: o.imageSide, panelHTML });
  }

  /* ---------- Events ---------- */
  _events(e) {
    const groups = e.groups
      .map(
        (g) => `
        <div class="panel__block">
          <h3 class="panel__sub">${g.heading}</h3>
          ${g.entries
            .map(
              (en) => `
            <p class="event-row">
              <span class="event-row__day">${en.day}</span>
              <span class="event-row__date">${en.date}</span>
              <span class="event-row__time">${en.time}</span>
            </p>`
            )
            .join("")}
        </div>`
      )
      .join("");

    const panelHTML = `<h2 class="panel__title">${e.title}</h2>${groups}`;
    return splitRow({ id: "events", image: e.image, imageSide: e.imageSide, panelHTML });
  }

  /* ---------- Prodotto di Piero ---------- */
  _prodotto(p) {
    const cats = p.categories
      .map(
        (cat) => `
        <div class="panel__block">
          <h3 class="panel__sub">${cat.heading}</h3>
          ${cat.items
            .map(
              (it) => `
            <p class="price-row">
              <span class="price-row__name">${it.name}</span>
              <span class="price-row__price">${it.price}${
                it.deposit ? ` <span class="price-row__deposit">(${it.deposit})</span>` : ""
              }</span>
            </p>`
            )
            .join("")}
        </div>`
      )
      .join("");

    const panelHTML = `<h2 class="panel__title">${p.title}</h2>${cats}`;
    return splitRow({ id: "prodotto", image: p.image, imageSide: p.imageSide, panelHTML });
  }

  /* ---------- Partyservice ---------- */
  _partyservice(s) {
    const paras = s.paragraphs.map((t) => `<p class="panel__text">${t}</p>`).join("");
    const panelHTML = `<h2 class="panel__title">${s.title}</h2>${paras}`;
    return splitRow({ id: "partyservice", image: s.image, imageSide: s.imageSide, panelHTML });
  }

  /* ---------- Kontakt ---------- */
  _kontakt(k) {
    const tel = k.phone.replace(/\s+/g, "");
    const panelHTML = `
      <h2 class="panel__title">${k.title}</h2>
      <address class="contact">
        <p class="panel__line panel__line--strong">${k.name}</p>
        <p class="panel__line">${k.person}</p>
        <p class="panel__line">${k.street}</p>
        <p class="panel__line">${k.city}</p>
        <p class="panel__line"><a href="tel:${tel}">${k.phone}</a></p>
        <p class="panel__line"><a href="mailto:${k.email}">${k.email}</a></p>
        <p class="panel__line"><a href="https://${k.web}" target="_blank" rel="noopener">${k.web}</a></p>
      </address>
      <h3 class="panel__sub">Anfahrt</h3>
      ${mediaBlock(k.anfahrt, "qr", { parallax: false })}
      <p class="panel__note">${k.notice}</p>`;

    return splitRow({ id: "kontakt", image: k.image, imageSide: k.imageSide, panelHTML });
  }

  /* ---------- Reservieren (Abschnitt, kein eigener Seitenwechsel) ----------
   * Hier wird SPÄTER das Reservierungssystem (Metro) eingebunden:
   * der leere Container #reservierung-system ist der vorgesehene
   * "Andockpunkt" – dort kann das Widget/Formular hineingeladen werden,
   * ohne den übrigen Code anzufassen. */
  _reservieren(r) {
    const k = content.kontakt;
    const tel = k.phone.replace(/\s+/g, "");
    const panelHTML = `
      <h2 class="panel__title">${r.title}</h2>
      <p class="panel__text">${r.lead}</p>
      <div class="panel__actions">
        <a class="btn btn--on-olive btn--ghost" href="tel:${tel}">Anrufen: ${k.phone}</a>
      </div>`;
    const split = splitRow({ id: "reservieren", image: r.image, imageSide: r.imageSide, panelHTML });

    // Das Online-Reservierungstool (DISH/METRO) folgt DIREKT darunter und
    // gehört zum Reservieren-Bereich – ohne separate Überschrift.
    // Der Container #reservierung-system wird von ReservationWidget gefüllt.
    const tool = `
      <section class="reservation" data-reveal>
        <div class="reservation__inner">
          <div id="reservierung-system" class="reservation__mount"></div>
        </div>
      </section>`;
    return split + tool;
  }

  /* ---------- Abschlussbild ---------- */
  _closing(img) {
    return `<section class="closing" data-reveal>${mediaBlock(img, "closing__media")}</section>`;
  }

  /* ---------- Nach dem Einfügen: Animationen + Parallax + Scrollspy ---------- */
  onMount(container) {
    // 1) Einblend-Animationen beim Scrollen
    this.reveal = new ScrollReveal(container);

    // 2) Parallax: Bilder wandern beim Scrollen mit (Stärke in %)
    this.parallax = new Parallax(container, 16);

    // 3) Scrollspy: der gerade sichtbare Bereich markiert den passenden
    //    Menüpunkt oben in der Navigationsleiste. Der Hero zählt zur
    //    "Startseite". Wir merken uns, zu welchem Element welcher
    //    Menüpunkt gehört.
    const map = [
      [container.querySelector(".hero"), "home"],
      [container.querySelector("#oeffnungszeiten"), "oeffnungszeiten"],
      [container.querySelector("#events"), "events"],
      [container.querySelector("#prodotto"), "prodotto"],
      [container.querySelector("#partyservice"), "partyservice"],
      [container.querySelector("#kontakt"), "kontakt"],
      [container.querySelector("#reservieren"), "reservieren"],
    ].filter(([el]) => el);

    const navFor = new Map(map);
    this.spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.app.navbar.setActive(navFor.get(entry.target));
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    map.forEach(([el]) => this.spy.observe(el));

    // 4) Online-Reservierungstool (DISH/METRO) einbinden
    const resvMount = container.querySelector("#reservierung-system");
    if (resvMount) {
      this.reservation = new ReservationWidget(resvMount);
      this.reservation.render();
    }
  }

  onUnmount() {
    this.reveal && this.reveal.disconnect();
    this.parallax && this.parallax.disconnect();
    this.spy && this.spy.disconnect();
  }
}
