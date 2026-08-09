/**
 * Parallax.js
 * -------------------------------------------------------------
 * Sorgt dafür, dass die Bilder beim Scrollen leicht "mitwandern".
 * Das Bild ist etwas größer als sein Rahmen (siehe CSS) und wird
 * je nach Scroll-Position innerhalb des Rahmens verschoben. Dadurch
 * entsteht ein dezenter Tiefen-/Bewegungseffekt – das Bild wirkt
 * lebendig, während die olivgrünen Panels normal weiterscrollen.
 *
 * Technik: Wir hören auf das Scroll-Ereignis, rechnen aber nur in
 * requestAnimationFrame (flüssig & sparsam). Beobachtet werden alle
 * Bilder in Elementen mit dem Attribut  data-parallax.
 * -------------------------------------------------------------
 */
export class Parallax {
  /**
   * @param {HTMLElement} root - Bereich, in dem nach [data-parallax] gesucht wird
   * @param {number} strength  - max. Verschiebung in Prozent der Rahmenhöhe
   */
  constructor(root = document, strength = 10) {
    this.strength = strength;
    this.ticking = false;

    // Nur Rahmen mit einem ECHTEN Bild bekommen den Effekt.
    this.items = [...root.querySelectorAll("[data-parallax]")]
      .map((box) => ({ box, img: box.querySelector(".media__img") }))
      .filter((it) => it.img);

    // Wenn der Nutzer wenig Bewegung wünscht: Effekt ganz auslassen.
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this._onScroll = this._onScroll.bind(this);
    this._update = this._update.bind(this);

    if (this.items.length && !this.reduced) {
      window.addEventListener("scroll", this._onScroll, { passive: true });
      window.addEventListener("resize", this._onScroll, { passive: true });
      this._update(); // einmal initial setzen
    }
  }

  _onScroll() {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(this._update);
  }

  _update() {
    const vh = window.innerHeight;
    this.items.forEach(({ box, img }) => {
      const rect = box.getBoundingClientRect();
      // Nur rechnen, wenn der Rahmen (etwa) im Bild ist.
      if (rect.bottom < -50 || rect.top > vh + 50) return;

      // progress: 0 = Rahmen tritt unten ins Bild, 1 = verlässt oben.
      const progress = (rect.top + rect.height / 2) / (vh + rect.height);
      // von +strength% (Bild nach unten) zu -strength% (nach oben)
      const shift = (0.5 - progress) * 2 * this.strength;
      img.style.transform = `translate3d(0, ${shift.toFixed(2)}%, 0)`;
    });
    this.ticking = false;
  }

  /** Effekt beenden und Verschiebungen zurücksetzen. */
  disconnect() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("resize", this._onScroll);
    this.items.forEach(({ img }) => (img.style.transform = ""));
  }
}
