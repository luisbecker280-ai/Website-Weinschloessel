/**
 * components.js
 * -------------------------------------------------------------
 * Kleine, wiederverwendbare "Bausteine", die HTML zurückgeben.
 * Sie kennen keinen Zustand – sie bekommen Daten rein und geben
 * fertiges HTML zurück. Dadurch bleiben die Seiten schlank und
 * doppelter Code wird vermieden.
 * -------------------------------------------------------------
 */

/**
 * Erzeugt entweder ein echtes Bild (wenn image.src gesetzt ist)
 * oder einen blauen Platzhalter (solange noch kein Bild vorliegt).
 */
export function mediaBlock(image, extraClass = "") {
  const label = (image && image.label) || "Bild folgt";
  if (image && image.src) {
    return `<div class="media ${extraClass}">
              <img src="${image.src}" alt="${label}" loading="lazy">
            </div>`;
  }
  return `<div class="media placeholder ${extraClass}" role="img" aria-label="${label}">
            <span class="placeholder__icon" aria-hidden="true">&#128247;</span>
            <span class="placeholder__label">${label}</span>
          </div>`;
}

/**
 * Eine "geteilte Zeile": links/rechts ein Bild, daneben ein
 * olivgrünes Info-Panel. imageSide steuert, auf welcher Seite
 * das Bild steht ("left" oder "right").
 */
export function splitRow({ id, image, imageSide = "left", panelHTML }) {
  const flip = imageSide === "right" ? "split--flip" : "";
  return `
    <section class="split ${flip}"${id ? ` id="${id}"` : ""} data-reveal>
      ${mediaBlock(image, "split__media")}
      <div class="split__panel panel">
        ${panelHTML}
      </div>
    </section>`;
}

/**
 * Die Wort-/Bildmarke (gold-Oval mit "W" + Schriftzug).
 * Wird im Hero der Startseite und oben auf den Rechtsseiten genutzt.
 * size: "lg" (Startseite) oder "sm" (Unterseiten).
 */
export function brandMark(size = "sm", logoSrc = null) {
  const emblem = logoSrc
    ? `<img class="brand__img" src="${logoSrc}" alt="Logo Ristorante Weinschlössel">`
    : `<span class="brand__emblem" aria-hidden="true"><span class="brand__w">W</span></span>`;
  return `
    <div class="brand brand--${size}">
      ${emblem}
      <p class="brand__top">Ristorante</p>
      <p class="brand__main">Weinschlössel</p>
      <span class="brand__rule"></span>
      <p class="brand__sub">Winelounge</p>
    </div>`;
}
