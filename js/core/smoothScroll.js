/**
 * smoothScroll.js
 * -------------------------------------------------------------
 * Eigene, weiche Scroll-Bewegung zu einem Abschnitt.
 *
 * Warum nicht einfach scrollIntoView()? Weil wir die Bewegung selbst
 * steuern wollen:
 *   - sie startet langsam, wird schneller, endet wieder langsam
 *     (ease-in-out) – das wirkt edel statt hektisch,
 *   - sie hält oben einen Abstand für die fixe Navigationsleiste frei,
 *     damit die Überschrift NICHT unter der Leiste verschwindet.
 *
 * Über  offsetTop  wird die Zielhöhe berechnet (unabhängig von den
 * Einblende-Animationen), deshalb landet man immer am richtigen
 * Abschnitt – kein "Verspringen" mehr.
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

/**
 * Sanft zu einem Element scrollen.
 * @param {HTMLElement} target
 * @param {{offset?:number, duration?:number}} opts
 *        offset   = Abstand von oben (z. B. Höhe der Leiste + Luft)
 *        duration = Dauer in Millisekunden (größer = langsamer)
 */
export function smoothScrollTo(target, { offset = 0, duration = 1000 } = {}) {
  if (!target) return;

  // Bei "wenig Bewegung"-Einstellung: sofort springen, nicht animieren.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, Math.max(0, pageTop(target) - offset));
    return;
  }

  const startY = window.pageYOffset;
  const endY = Math.max(0, pageTop(target) - offset);
  const distance = endY - startY;
  if (Math.abs(distance) < 2) return;

  let startTime = null;
  function step(now) {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
