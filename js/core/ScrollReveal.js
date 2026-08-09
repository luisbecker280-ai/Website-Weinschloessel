/**
 * ScrollReveal.js
 * -------------------------------------------------------------
 * Lässt Elemente sanft einblenden, sobald sie beim Scrollen in den
 * sichtbaren Bereich kommen. Genutzt wird der IntersectionObserver
 * des Browsers – das ist performant und ohne externe Bibliothek.
 *
 * Jedes Element mit dem Attribut  data-reveal  wird beobachtet und
 * bekommt beim Erscheinen die Klasse  is-visible  (siehe CSS).
 * -------------------------------------------------------------
 */
export class ScrollReveal {
  constructor(root = document) {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            this.observer.unobserve(entry.target); // nur einmal animieren
          }
        });
      },
      { threshold: 0.12 }
    );

    root.querySelectorAll("[data-reveal]").forEach((el) => this.observer.observe(el));
  }

  /** Beobachtung beenden (beim Verlassen der Seite). */
  disconnect() {
    this.observer.disconnect();
  }
}
