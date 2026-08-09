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
(kein Tracking, keine Plugins). Die edle Schrift (Cormorant Garamond +
Montserrat) wird **selbst gehostet** (`assets/fonts/`) – sie kommt vom
eigenen Server, nicht von Google. Gründe:

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
   ├── Navbar         (obere Leiste)          js/core/Navbar.js
   ├── Footer         (unterer Bereich)       js/core/Footer.js
   ├── CookieConsent  (Datenschutz-Hinweis)   js/core/CookieConsent.js
   └── Router         (zeigt die Seiten)      js/core/Router.js
            │
            │ zeigt je nach Adresse (#home, #impressum ...) eine Seite:
            ├── HomePage         js/pages/HomePage.js   (enthält auch „Reservieren")
            ├── ImpressumPage    js/pages/ImpressumPage.js
            └── DatenschutzPage  js/pages/DatenschutzPage.js

Helfer:  smoothScroll.js (weiches Scrollen), Parallax.js (mitwandernde
         Bilder), ScrollReveal.js (sanftes Einblenden)  – alle in js/core/

Alle Texte/Preise/Zeiten liegen getrennt in:  js/data/content.js
Wiederverwendbare Bausteine in:               js/components/components.js
```

**Kein Flackern:** Jede Seite wird nur **einmal** gebaut und bleibt im
Speicher. Beim Wechseln wird nur um- statt neugeschaltet – Bilder werden
also nicht erneut geladen, es gibt keinen weißen „Lade-Streifen".

**Der Ablauf in Worten:** Der Browser öffnet `index.html`. Diese lädt
das Aussehen (CSS) und die Logik (`app.js`). `app.js` erstellt die obere
Leiste, den Footer und den *Router*. Klickt ein Gast oben auf einen
Menüpunkt, ändert sich die Adresse (z. B. `#impressum`). Der Router merkt
das und tauscht **nur den mittleren Inhaltsbereich** aus – die Seite wird
also nicht komplett neu geladen. Das ist der weiche, „dynamische" Wechsel.

Die Menüpunkte verhalten sich unterschiedlich:
- **Startseite** = eigene Unterseite (`type: "route"`).
- **Öffnungszeiten / Events / Prodotto / Partyservice / Kontakt /
  Reservieren** = scrollen weich zum passenden Abschnitt **auf der
  Startseite** (`type: "scroll"`). „Reservieren" ist also keine eigene
  Seite mehr, sondern ein Abschnitt unter „Kontakt".

---

## 3. Ordnerstruktur

```
index.html               Einstieg
css/
  fonts.css              selbst gehostete Schriften (@font-face)
  variables.css          Farben, Schriften, Maße (zentrale Stellschrauben)
  base.css               Reset, Typografie, Animationen
  layout.css             Leiste, Hero, geteilte Zeilen, Footer
  components.css         Logo, Platzhalter, Panels, Buttons, Cookie-Banner
  pages.css              Rechtsseiten (Impressum/Datenschutz)
js/
  app.js                 startet alles
  core/
    Router.js            Seitenwechsel (mit Speicher) + Scroll-Logik
    Navbar.js            obere Navigationsleiste
    Footer.js            Fußbereich
    CookieConsent.js     Datenschutz-/Cookie-Hinweis
    Page.js              Basis-Klasse für alle Seiten
    ScrollReveal.js      sanftes Einblenden beim Scrollen
    Parallax.js          Bilder wandern beim Scrollen mit
    smoothScroll.js      weiches Scrollen (langsam-schnell-langsam)
  components/
    components.js        kleine HTML-Bausteine (Logo, Bild, Panel-Zeile)
  pages/
    HomePage.js          Startseite (inkl. Reservieren-Abschnitt)
    ImpressumPage.js     Impressum
    DatenschutzPage.js   Datenschutzerklärung
  data/
    content.js           ALLE Texte/Preise/Zeiten/Bilder
assets/
  fonts/                 Schriftdateien (.woff2)
  img/                   hier die echten Bilder ablegen (siehe Abschnitt 5)
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

**Bilder einsetzen** (statt blauem Platzhalter):
Die Dateinamen sind bereits im Code hinterlegt. Du musst die Fotos nur
**genau so benennen** und in den Ordner `assets/img/` legen – dann
erscheinen sie automatisch (solange eine Datei fehlt, bleibt der blaue
Platzhalter, es gibt **kein** kaputtes Bild-Symbol).

| Abschnitt        | Dateiname (in `assets/img/`) |
|------------------|------------------------------|
| Hero (oben, s/w) | `hero.jpg`                   |
| Öffnungszeiten   | `innenraum.jpg`              |
| Events           | `events.jpg`                 |
| Prodotto di Piero| `prodotto.jpg`               |
| Partyservice     | `weinregal.jpg`              |
| Kontakt          | `kontakt.jpg`                |
| Reservieren      | `reservieren.jpg`            |
| Abschlussbild    | `terrasse.jpg`               |
| QR-Code Anfahrt  | `qr-anfahrt.png`             |
| Logo             | `logo.png` (zusätzlich in `content.js` unter `site.logo.src` eintragen) |

Querformat-Fotos passen am besten (außer Logo & QR-Code). Andere
Dateinamen sind möglich – dann den `src`-Eintrag in `content.js` anpassen.

---

## 6. Server & Reservierungssystem (Metro) – für später

Aktuell ist die Seite **statisch** und damit „server-ready": Sie kann
unverändert auf jeden normalen Webspace hochgeladen werden.

Wenn das **Reservierungssystem von Metro** dazukommt, ist der Bauplatz
schon vorbereitet:
- Im Reservieren-Abschnitt der Startseite (`js/pages/HomePage.js`, Methode
  `_reservieren`) gibt es den leeren Container `#reservierung-system`.
  Dort wird das Reservierungs-Widget/-Formular später eingehängt – ohne
  den übrigen Code anzufassen.
- Daten zum Server schickt man später typischerweise per `fetch()`.
  Die objektorientierte Aufteilung sorgt dafür, dass das eine, klar
  abgegrenzte Stelle bleibt.
- Lädt das Metro-System externe Inhalte, sollte vorher die Einwilligung
  geprüft werden: `CookieConsent.accepted()` (siehe `js/core/CookieConsent.js`).

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
4. **Schriften selbst gehostet, keine externen Skripte** – dadurch
   entsteht beim reinen Seitenaufruf keine Datenübertragung an Dritte.
5. **Cookie-/Einwilligungs-Hinweis:** Der Banner ist ehrlich formuliert –
   die Seite setzt aktuell nur eine technisch notwendige Speicherung
   (die Entscheidung selbst). Da noch keine Tracking-Cookies/externen
   Dienste laufen, ist der Banner vor allem **Vorbereitung** (z. B. für
   späteres Google Maps). Den genauen Wortlaut bitte vor dem Live-Gang
   fachkundig prüfen lassen.
```
