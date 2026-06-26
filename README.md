# Ristorante Weinschlössel – Website

Dynamische, mehrseitige Website (Single Page Application) für das
Ristorante Weinschlössel – Winelounge.

---

## 1. Welche Technik wird benutzt?

| Sprache / Technik | Wofür |
|---|---|
| **HTML5** (`index.html`) | das Grundgerüst der Seite |
| **CSS3** (Ordner `css/`) | Aussehen: Farben, Layout, Texturen, Animationen |
| **JavaScript** (Ordner `js/`, als ES-Module, objektorientiert) | die Logik: Seitenwechsel, Menü, Inhalte einsetzen |

**Bewusst KEIN** Framework (React/Vue) und **keine externen Dienste**
(keine Google Fonts, kein Tracking, keine Plugins). Gründe:

- Es lädt sich blitzschnell und läuft auf jedem Webspace.
- Es ist **datenschutzfreundlich** – beim Laden der Seite gehen
  keinerlei Daten an Dritte (wichtig für die DSGVO).
- Es ist leicht zu verstehen und zu erweitern.

> Python wird **aktuell nicht** gebraucht. Es kommt erst ins Spiel, wenn
> später ein Server für das Reservierungssystem dazukommt (siehe Abschnitt 6).

---

## 2. Wie hängt alles zusammen?

```
index.html
   │  lädt die CSS-Dateien (Aussehen)
   │  lädt js/app.js (Logik)
   ▼
app.js   ──>  baut die App zusammen:
   ├── Navbar  (obere Leiste)            js/core/Navbar.js
   ├── Footer  (unterer Bereich)         js/core/Footer.js
   └── Router  (tauscht den Inhalt aus)  js/core/Router.js
            │
            │ zeigt je nach Adresse (#home, #impressum ...) eine Seite:
            ├── HomePage         js/pages/HomePage.js
            ├── ReservierenPage  js/pages/ReservierenPage.js
            ├── ImpressumPage    js/pages/ImpressumPage.js
            └── DatenschutzPage  js/pages/DatenschutzPage.js

Alle Texte/Preise/Zeiten liegen getrennt in:  js/data/content.js
Wiederverwendbare Bausteine in:               js/components/components.js
```

**Der Ablauf in Worten:** Der Browser öffnet `index.html`. Diese lädt
das Aussehen (CSS) und die Logik (`app.js`). `app.js` erstellt die obere
Leiste, den Footer und den *Router*. Klickt ein Gast oben auf einen
Menüpunkt, ändert sich die Adresse (z. B. `#impressum`). Der Router merkt
das und tauscht **nur den mittleren Inhaltsbereich** aus – die Seite wird
also nicht komplett neu geladen. Das ist der weiche, „dynamische" Wechsel.

Die Menüpunkte verhalten sich unterschiedlich:
- **Startseite / Reservieren** = eigene Unterseiten (`type: "route"`).
- **Öffnungszeiten / Events / Prodotto / Partyservice / Kontakt** =
  springen zum passenden Abschnitt **auf der Startseite** (`type: "scroll"`).

---

## 3. Ordnerstruktur

```
index.html               Einstieg
css/
  variables.css          Farben, Schriften, Maße (zentrale Stellschrauben)
  base.css               Reset, Typografie, Animationen
  layout.css             Leiste, Hero, geteilte Zeilen, Footer
  components.css         Logo, Platzhalter, Panels, Buttons
  pages.css              Rechtsseiten (Impressum/Datenschutz/Reservieren)
js/
  app.js                 startet alles
  core/
    Router.js            Seitenwechsel + Scroll-Logik
    Navbar.js            obere Navigationsleiste
    Footer.js            Fußbereich
    Page.js              Basis-Klasse für alle Seiten
    ScrollReveal.js      sanftes Einblenden beim Scrollen
  components/
    components.js        kleine HTML-Bausteine (Logo, Bild, Panel-Zeile)
  pages/
    HomePage.js          Startseite
    ReservierenPage.js   Reservieren (Platzhalter, Andockpunkt Metro)
    ImpressumPage.js     Impressum
    DatenschutzPage.js   Datenschutzerklärung
  data/
    content.js           ALLE Texte/Preise/Zeiten/Bilder
assets/
  img/                   hier später die echten Bilder ablegen
```

---

## 4. Lokal ansehen / testen

Weil moderne JavaScript-Module aus Sicherheitsgründen **nicht** per
Doppelklick (`file://`) laden, braucht man einen kleinen lokalen Server.
Am einfachsten mit Python (auf den meisten Rechnern vorinstalliert):

```bash
# im Projektordner ausführen:
python3 -m http.server 8000
```

Dann im Browser öffnen: **http://localhost:8000**

(Alternativen: „Live Server"-Erweiterung in VS Code, oder `npx serve`.)

---

## 5. Inhalte & Bilder ändern

**Alle Inhalte** stehen in `js/data/content.js`. Beispiele:

- Preis ändern → dort die Zahl bei `price` anpassen.
- Öffnungszeiten ändern → bei `oeffnungszeiten` die `lines` anpassen.
- Neues Event → bei `events` einen Eintrag ergänzen.

**Bild einsetzen** (statt blauem Platzhalter):
1. Bilddatei nach `assets/img/` legen (z. B. `lounge.jpg`).
2. In `content.js` beim passenden Bild `src` setzen:
   ```js
   image: { label: "Innenraum / Lounge", src: "assets/img/lounge.jpg" }
   ```
   Fertig – das Bild erscheint automatisch.

**Logo einsetzen:** in `content.js` unter `site.logo` `src` setzen.

---

## 6. Server & Reservierungssystem (Metro) – für später

Aktuell ist die Seite **statisch** und damit „server-ready": Sie kann
unverändert auf jeden normalen Webspace hochgeladen werden.

Wenn das **Reservierungssystem von Metro** dazukommt, ist der Bauplatz
schon vorbereitet:
- In `js/pages/ReservierenPage.js` gibt es den leeren Container
  `#reservierung-system`. Dort wird das Reservierungs-Widget/-Formular
  später eingehängt – ohne den übrigen Code anzufassen.
- Daten zum Server schickt man später typischerweise per `fetch()`
  aus genau dieser Seiten-Klasse. Die objektorientierte Aufteilung sorgt
  dafür, dass das eine, klar abgegrenzte Stelle bleibt.

---

## 7. Wichtige Datenschutz-Hinweise (bitte vor dem Online-Gang lesen)

1. **Facebook-Symbol im Footer** ist nur ein Link – es lädt kein Plugin
   und sendet erst beim Klick Daten an Facebook. (DSGVO-konform.)
   Die echte Facebook-Adresse noch in `content.js` unter `footer.facebookUrl`
   eintragen.
2. **Impressum:** Der vorgegebene Text nennt „§ 6 MDStV". Diese Norm ist
   veraltet; aktuell gilt **§ 5 DDG** (früher § 5 TMG). Bitte prüfen/aktualisieren.
3. **Datenschutzerklärung:** Der vorgegebene Mustertext beschreibt
   Cookies, Analyse-Tools, Facebook-Plugins, YouTube und Google Maps.
   **Diese Website nutzt davon aktuell NICHTS.** Eine Datenschutzerklärung
   sollte nur das beschreiben, was wirklich eingesetzt wird. Vor dem
   Online-Gang also entweder die nicht genutzten Abschnitte entfernen
   oder – sobald z. B. Google Maps eingebunden wird – passend belassen.
4. **Keine externen Schriften/Skripte** – dadurch entsteht beim reinen
   Seitenaufruf keine Datenübertragung an Dritte.
```
