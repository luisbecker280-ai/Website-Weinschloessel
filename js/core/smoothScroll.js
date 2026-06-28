/**
 * smoothScroll.js
 * -------------------------------------------------------------
 * Eigene, weiche Scroll-Bewegung.
 *
 * Warum nicht einfach scrollIntoView()? Weil wir die Bewegung selbst
 * steuern wollen:
 *   - sie startet langsam, wird schneller, endet wieder langsam
 *     (ease-in-out) – das wirkt edel statt hektisch,
 *   - sie kann einen Abschnitt MITTIG im Bild platzieren (block:"center"),
 *   - sie hält oben Platz für die fixe Navigationsleiste frei.
 *
 * Über offsetTop wird die Zielhöhe berechnet (unabhängig von den
 * Einblende-Animationen), deshalb landet man immer am richtigen Abschnitt.
 * -------------------------------------------------------------
 */

/** weiche Beschleunigungskurve: langsam -> schnell -> langsam */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** absolute Y-Position eines Elements im Dokument ermitteln. */
function pageTop(el) {
  let y = 0;
  while (el) {
    y += el.offsetTop;
    el = el.offsetParent;
  }
  return y;
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Sanft zu einer bestimmten Y-Position scrollen.
 * @param {number} endY     Zielhöhe (Pixel von oben)
 * @param {number} duration Dauer in ms (größer = langsamer)
 */
export function smoothScrollToY(endY, duration = 950) {
  endY = Math.max(0, Math.round(endY));

  if (reducedMotion()) {
    window.scrollTo(0, endY);
    return;
  }

  const startY = window.pageYOffset;
  const distance = endY - startY;
  if (Math.abs(distance) < 2) return;

  let startTime = null;
  function step(now) {
    if (startTime === null) startTime = now;
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/**
 * Sanft zu einem Element scrollen.
 * @param {HTMLElement} target
 * @param {{offset?:number, duration?:number, block?:"start"|"center"}} opts
 *        offset   = freizuhaltender Abstand oben (Höhe der Leiste)
 *        block    = "start" (oben unter der Leiste) oder "center" (mittig)
 */
export function smoothScrollTo(target, { offset = 0, duration = 1000, block = "start" } = {}) {
  if (!target) return;
  const top = pageTop(target);

  let endY;
  if (block === "center") {
    const visible = window.innerHeight - offset; // sichtbarer Bereich unter der Leiste
    const h = target.offsetHeight;
    // Passt der Abschnitt in den sichtbaren Bereich -> mittig setzen,
    // sonst (z. B. sehr hoch auf dem Handy) oben unter der Leiste.
    endY = h < visible ? top - offset - (visible - h) / 2 : top - offset - 24;
  } else {
    endY = top - offset;
  }

  smoothScrollToY(endY, duration);
}
