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
 * Erzeugt einen Bild-Bereich.
 *
 * Es wird IMMER zuerst der blaue Platzhalter angelegt. Wenn ein Bild
 * (image.src) hinterlegt ist, wird zusätzlich ein <img> darübergelegt:
 *   - lädt das Bild  -> es verdeckt den Platzhalter (echtes Foto).
 *   - fehlt das Bild -> onerror entfernt das <img>, der blaue
 *     Platzhalter bleibt sichtbar (KEIN kaputtes Bild-Symbol).
 *
 * So könnt ihr Fotos einfach in den Ordner assets/img/ legen – sobald
 * die Datei da ist, erscheint sie automatisch.
 *
 * @param {{label?:string, src?:string|null}} image
 * @param {string} extraClass  zusätzliche CSS-Klasse für die Größe
 * @param {{parallax?:boolean}} opts  parallax = leichtes Mitwandern beim Scrollen
 */
export function mediaBlock(image, extraClass = "", opts = {}) {
  const { parallax = true } = opts;
  const label = (image && image.label) || "Bild folgt";
  const hasImg = !!(image && image.src);

  const placeholder = `
    <div class="placeholder" role="img" aria-label="${label}">
      <span class="placeholder__icon" aria-hidden="true">&#128247;</span>
      <span class="placeholder__label">${label}</span>
    </div>`;

  // onerror: schlägt das Laden fehl, entfernt sich das Bild selbst –
  // der blaue Platzhalter darunter wird dann wieder sichtbar.
  const img = hasImg
    ? `<img class="media__img" src="${image.src}" alt="${label}" loading="lazy"
            onerror="this.remove()">`
    : "";

  const parallaxAttr = parallax ? " data-parallax" : "";
  return `<div class="media ${extraClass}"${parallaxAttr}>
            ${placeholder}
            ${img}
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
 *
 * Sobald ein echtes Logo vorliegt (site.logo.src), wird dieses statt
 * des gezeichneten Ovals angezeigt.
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
