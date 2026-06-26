/**
 * Page.js
 * -------------------------------------------------------------
 * Basis-Klasse für ALLE Seiten (Startseite, Impressum ...).
 * Jede konkrete Seite erbt von dieser Klasse und überschreibt
 * mindestens render(). So haben alle Seiten denselben Aufbau –
 * das ist der objektorientierte Kern der Website.
 * -------------------------------------------------------------
 */
export class Page {
  /** @param {App} app - die zentrale Anwendung (Zugriff auf Navbar, Router ...) */
  constructor(app) {
    this.app = app;
    this.id = "page";   // eindeutige ID (für das Routing)
    this.title = "";    // erscheint im Browser-Tab
  }

  /** Liefert das HTML der Seite als Text. Muss überschrieben werden. */
  render() {
    return "";
  }

  /** Wird aufgerufen, NACHDEM die Seite ins DOM eingefügt wurde
   *  (z. B. um Animationen oder Klick-Listener zu starten). */
  onMount(/* container */) {}

  /** Wird aufgerufen, BEVOR die Seite wieder entfernt wird
   *  (z. B. um Listener/Observer sauber zu beenden). */
  onUnmount() {}
}
