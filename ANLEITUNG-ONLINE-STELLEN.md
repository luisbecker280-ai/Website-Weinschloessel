# Website online stellen – Schritt-für-Schritt-Anleitung

Diese Anleitung beschreibt, wie die Website vom Entwicklungsstand auf einen
echten Server kommt – **inklusive Umzug der Domain und der E-Mail-Postfächer
von IONOS (1&1) zum neuen Anbieter.**

> **Die wichtigste Regel vorweg:**
> **Zuerst alles Neue aufbauen und testen – erst ganz zum Schluss den alten
> Vertrag kündigen.** Wer zuerst kündigt, riskiert, dass Domain und
> E-Mail-Adressen für Tage nicht erreichbar sind oder im schlimmsten Fall
> verloren gehen.

---

## Teil 0: Wie das Ganze überhaupt funktioniert

Drei Dinge gehören zusammen, sind aber technisch getrennt:

| Was | Bedeutung | Vergleich |
|---|---|---|
| **Domain** (`ristorante-weinschloessel.de`) | Die Adresse, die Gäste eintippen | Die Hausnummer / der Name im Telefonbuch |
| **Webhosting** (Server) | Der Computer, auf dem die Dateien liegen und der sie ausliefert | Das Haus selbst |
| **DNS** | Die Zuordnung „Adresse → Haus" | Das Telefonbuch |

Wenn jemand `www.ristorante-weinschloessel.de` eingibt, fragt sein Browser das
DNS: *„Wo steht dieses Haus?"* – bekommt die Adresse des Servers zurück und
holt sich von dort die Dateien (`index.html`, Bilder, …).

**Beim Anbieterwechsel ziehen wir also das Haus um und tragen die neue Lage ins
Telefonbuch ein.** Die Adresse (Domain) bleibt dieselbe – die Gäste merken
nichts.

Wichtig: **E-Mail läuft über dieselbe Domain, aber getrennt vom Web.** Deshalb
muss man sich um Postfächer **extra** kümmern – sie ziehen nicht automatisch mit.

---

## Teil 1: Hosting kaufen – worauf achten

Die Website ist eine **statische Seite** (nur HTML/CSS/JavaScript, keine
Datenbank). Das ist die genügsamste und schnellste Art von Website. Es reicht
also ein einfaches Webhosting-Paket – **kein teurer Server nötig.**

### Was das Paket können muss

| Anforderung | Warum |
|---|---|
| **Serverstandort Deutschland/EU** | Datenschutz – keine Datenübermittlung in Drittländer |
| **AV-Vertrag** (Auftragsverarbeitung) | **Gesetzlich verpflichtend** (Art. 28 DSGVO), siehe Teil 6 |
| **Kostenloses SSL-Zertifikat** (Let's Encrypt) | Für `https://` – Pflicht, sonst warnt der Browser |
| **E-Mail-Postfächer** (mind. 3–5) | Für `info@ristorante-weinschloessel.de` |
| **Mindestens 1 GB Speicher** | Die Website braucht ca. **10 MB** – jedes Paket reicht |
| **Traffic-Flat** | Damit viele Besucher keine Zusatzkosten verursachen |
| **FTP/SFTP-Zugang** | Zum Hochladen der Dateien |
| **PHP + MySQL** (nicht zwingend) | Nur falls später mal etwas Dynamisches dazukommt |

### Zur Frage „hält der Server viele Besucher gleichzeitig aus?"

**Ja, mit großem Abstand.** Bei einer statischen Seite liefert der Server nur
fertige Dateien aus – das ist extrem leicht. Ein normales Webhosting-Paket
bedient problemlos mehrere **tausend Besucher pro Tag**. Gleichzeitig sind es
selbst zu Stoßzeiten vielleicht ein paar Dutzend. Das ist für den Server
Kleinigkeit.

Ein teureres Paket macht die Seite **nicht** belastbarer – es gibt nur mehr
Speicher, mehr Domains und mehr Datenbanken.

**Wenn du auf Nummer sicher gehen willst** (z. B. wegen eines Zeitungsartikels):
Schalte kostenlos **Cloudflare** davor. Das verteilt die Seite weltweit und
nimmt dem Server fast die gesamte Last ab – gratis, bei jedem Anbieter.

### Anbieter (Preise ca., Stand 2026)

| Anbieter | Einsteigerpaket | Bemerkung |
|---|---|---|
| **All-Inkl PRIVAT** | ~4,95 €/Monat | 50 GB, 3 Domains inkl., 500 Postfächer, keine Mindestlaufzeit |
| **Netcup** | ~6 €/Monat | Sehr gutes Preis-Leistungs-Verhältnis |
| **Strato / IONOS** | ~5–6 €/Monat | Achtung Lockpreise (1 € im 1. Jahr, danach teurer) |

> **Achtung Lockpreise:** „1 €/Monat im ersten Jahr" ist echt, aber danach wird
> es deutlich teurer. Kündigungsfristen im Kalender notieren.

---

## Teil 2: Die sichere Reihenfolge (unbedingt einhalten!)

```
1. Neues Hosting kaufen              (ohne die Domain zu übertragen!)
2. Website hochladen + testen        (über Test-Adresse des Anbieters)
3. E-Mail-Postfächer neu anlegen     (gleiche Adressen wie bisher)
4. Alte E-Mails kopieren             (über IMAP, siehe Teil 4)
5. Auth-Code bei IONOS holen
6. Domain-Umzug beim neuen Anbieter beauftragen
7. Warten (1–7 Tage), dann alles prüfen
8. ERST JETZT: IONOS-Vertrag kündigen
```

**Schritt 8 niemals vorziehen.** Zwischen Kündigung und Umzug darf keine Lücke
entstehen – sonst ist die Domain kurzzeitig frei und im schlimmsten Fall
schnappt sie sich jemand anderes.

---

## Teil 3: Website hochladen

### 3.1 Dateien besorgen

Alle Dateien liegen auf GitHub. Zwei Wege:

**A) Ohne Git (am einfachsten, geht auf jedem Gerät):**
1. GitHub-Repo öffnen → Branch `claude/github-access-33n79q` wählen
2. Grüner Knopf **„Code" → „Download ZIP"**
3. ZIP entpacken

**B) Mit Git (am Heim-PC):**
```bash
git clone https://github.com/luisbecker280-ai/Website-Weinschloessel.git
cd Website-Weinschloessel
git checkout claude/github-access-33n79q
```

### 3.2 Hochladen per FTP

Der Anbieter schickt nach dem Kauf die **FTP-Zugangsdaten** (Server, Benutzer,
Passwort). Programm: **FileZilla** (kostenlos, filezilla-project.org).

1. In FileZilla verbinden (Protokoll: **SFTP** falls angeboten, sonst FTP)
2. Rechts in den Web-Ordner wechseln. Er heißt je nach Anbieter:
   - All-Inkl: `/`
   - IONOS/Strato: `/`
   - Netcup: `httpdocs/` oder `html/`
   > Erkennungsmerkmal: Dort liegt meist schon eine Platzhalter-`index.html`.
   > Die darf gelöscht/überschrieben werden.
3. **Den kompletten Inhalt** des Projektordners hochladen:

```
index.html          ← muss direkt im Web-Ordner liegen, NICHT in einem Unterordner
404.html
robots.txt
sitemap.xml
.htaccess           ← versteckte Datei! (siehe Hinweis unten)
assets/   (img, pdf, fonts)
css/
js/
```

> **Nicht hochladen** (unnötig): `README.md`, `ANLEITUNG-ONLINE-STELLEN.md`,
> `.gitignore`, der Ordner `.git`.

> **Wichtig – versteckte Dateien:** Die Datei `.htaccess` beginnt mit einem
> Punkt und ist deshalb oft unsichtbar.
> In FileZilla einschalten: **Server → Versteckte Dateien anzeigen erzwingen**.
> Ohne diese Datei fehlen https-Zwang, Fehlerseite und Komprimierung.

### 3.3 Testen (vor dem Domain-Umzug!)

Jeder Anbieter stellt eine **Test-Adresse** bereit, z. B.
`w01abc23.kasserver.com` oder `deinname.ionos-kunde.de`. Darüber prüfen:

- [ ] Startseite lädt, alle Fotos erscheinen
- [ ] Menüpunkte oben funktionieren (Öffnungszeiten, Events, …)
- [ ] Speisekarte und Weinkarte öffnen sich
- [ ] Impressum + Datenschutzerklärung erreichbar
- [ ] Cookie-Hinweis erscheint; nach „Akzeptieren" ist das Reservierungstool da
- [ ] Test-Reservierung durchführen → kommt sie im DISH-System an?
- [ ] Auf dem **Handy** testen (wichtigster Fall bei Restaurants!)

### 3.4 SSL/HTTPS einschalten

Im Kundenmenü des Anbieters: **SSL-Zertifikat (Let's Encrypt) aktivieren** –
bei allen genannten Anbietern kostenlos und mit einem Klick.

Danach muss `https://…` funktionieren und der Browser ein **Schloss-Symbol**
zeigen. Die `.htaccess` leitet dann automatisch alles auf `https` um.

> Das SSL-Zertifikat kann erst ausgestellt werden, **wenn die Domain auf den
> neuen Server zeigt** – also nach dem Umzug (Teil 5). Falls es vorher nicht
> geht: nach dem Umzug nachholen.

---

## Teil 4: E-Mail-Postfächer umziehen (der heikelste Teil)

> **Warum heikel:** Beim Domain-Umzug ziehen **nur die Adresse** um – **nicht
> die gespeicherten E-Mails**. Wer den IONOS-Vertrag kündigt, ohne die Mails
> vorher zu sichern, **verliert den kompletten Posteingang.**

### 4.1 Erst sichern!

Bevor irgendetwas passiert: **Backup der alten Mails.**

- In Outlook/Thunderbird das IONOS-Konto einrichten (falls nicht schon da)
- Alle Ordner einmal komplett synchronisieren lassen
- Zusätzlich exportieren (Thunderbird: Add-on „ImportExportTools NG")

### 4.2 Neue Postfächer anlegen

Beim neuen Anbieter im Kundenmenü unter „E-Mail" die **exakt gleichen
Adressen** anlegen, die es bisher gibt – mindestens:

```
info@ristorante-weinschloessel.de
```

> Falls es weitere gibt (z. B. `bestellung@…`, persönliche Adressen), vorher bei
> IONOS nachsehen und **alle** notieren. Jede vergessene Adresse ist nach der
> Kündigung tot.

### 4.3 Alte Mails kopieren

Zwei Möglichkeiten:

**A) Umzugshelfer des Anbieters (am einfachsten)**
Viele Anbieter (u. a. All-Inkl, IONOS) bieten einen **IMAP-Import**: Man gibt
die Zugangsdaten des alten Postfachs ein, der Server kopiert alles selbst.

**B) Von Hand mit Thunderbird (funktioniert immer)**
1. Thunderbird installieren (kostenlos)
2. **Beide** Konten einrichten – das alte (IONOS) und das neue
3. Beide vollständig synchronisieren lassen
4. Im alten Konto alle Mails markieren (`Strg + A`)
5. Rechtsklick → **Kopieren nach** → neues Konto → Posteingang
6. Für jeden Ordner wiederholen (Gesendet, Archiv, …)
7. Warten, bis alles fertig kopiert ist – bei vielen Mails dauert das

### 4.4 Danach

- In allen Geräten (Handy, PC, Kasse) die **neuen Serverdaten** eintragen
  (IMAP-/SMTP-Server des neuen Anbieters – steht im Kundenmenü)
- Testmail an sich selbst schicken **und** von außen (z. B. private Adresse)

---

## Teil 5: Domain von IONOS zum neuen Anbieter umziehen

Bei `.de`-Domains heißt das **KK-Verfahren** (Konnektivitätskoordination), die
zentrale Stelle ist die **DENIC**. Man braucht dafür einen **Auth-Code**
(Autorisierungscode) – das „Passwort" der Domain.

### 5.1 Auth-Code bei IONOS holen

1. Bei IONOS anmelden
2. **Domains** öffnen
3. Seite **„Verlängerung & Transfer"** aufrufen
4. Die Domain auswählen
5. **„Autorisierungscode anzeigen"** klicken
6. Code kopieren und sicher notieren

> Es kann **einige Minuten dauern**, bis der Code erscheint – IONOS fragt ihn
> erst bei der Registrierungsstelle an. Nicht wundern, kurz warten.

> **Prüfen:** Steht die Domain bei IONOS auf **„Transfer-Sperre"**
> (Transfer Lock)? Falls ja, vorher deaktivieren, sonst schlägt der Umzug fehl.

### 5.2 Umzug beim neuen Anbieter beauftragen

Beim neuen Anbieter: **„Domain umziehen"** / „Domain-Transfer" wählen,
`ristorante-weinschloessel.de` eingeben und den Auth-Code einfügen.

Prüfen, dass die **Inhaberdaten identisch** sind (Name, Anschrift wie bei
IONOS hinterlegt) – Abweichungen führen zu Rückfragen oder Ablehnung.

### 5.3 Warten

Der Umzug dauert bei `.de` meist **1–3 Tage** (selten bis zu 7). In dieser Zeit:

- **Nichts bei IONOS kündigen**
- Website und E-Mail laufen normal weiter
- Der Anbieter meldet sich, wenn der Transfer abgeschlossen ist

### 5.4 Nach dem Umzug prüfen

- [ ] `https://www.ristorante-weinschloessel.de` zeigt die **neue** Website
- [ ] Schloss-Symbol im Browser (SSL aktiv)
- [ ] `ristorante-weinschloessel.de` (ohne www) leitet auf `www.` um
- [ ] E-Mail **empfangen** funktioniert (Testmail von außen)
- [ ] E-Mail **senden** funktioniert
- [ ] Alte Mails sind im neuen Postfach vorhanden
- [ ] Reservierungstool funktioniert (Test-Reservierung!)

### 5.5 Erst jetzt: IONOS kündigen

Wenn **alle** Punkte oben grün sind: IONOS-Vertrag kündigen.

> **Tipp:** Ruhig noch **2–4 Wochen** warten, bevor du kündigst. Die paar Euro
> sind gut investiert – falls doch etwas fehlt, ist der alte Stand noch da.
> Prüfe die Kündigungsfrist, damit sich der Vertrag nicht automatisch verlängert.

---

## Teil 6: Datenschutz (DSGVO) – was zu tun ist

### 6.1 Was auf der Website bereits erledigt ist ✅

| Punkt | Status |
|---|---|
| Schriftarten lokal eingebunden (kein Google-Fonts-Aufruf) | ✅ erledigt |
| Kein Google Analytics / kein Tracking | ✅ nicht vorhanden |
| Reservierungstool lädt **erst nach Einwilligung** | ✅ erledigt |
| Einwilligung jederzeit widerrufbar („Cookie-Einstellungen") | ✅ erledigt |
| Datenschutzerklärung inkl. Absatz zu DISH/METRO | ✅ erledigt |
| Impressum nach § 5 DDG | ✅ erledigt |
| Sicherheits-Kopfzeilen (`.htaccess`) | ✅ erledigt |

### 6.2 Was beim Hosting noch zu tun ist ⚠️

**1. AV-Vertrag mit dem Hoster abschließen (Pflicht!)**
Nach **Art. 28 DSGVO** brauchst du einen *Vertrag zur Auftragsverarbeitung*
mit dem Hosting-Anbieter, weil dort Besucherdaten (IP-Adressen in Logfiles)
verarbeitet werden. Bei allen deutschen Anbietern findest du ihn im Kundenmenü
unter **„Datenschutz" / „AV-Vertrag" / „AVV"** – meist ein Klick zum Zustimmen.
**Danach das PDF abspeichern.**

**2. AV-Vertrag mit DISH/METRO prüfen**
Über das Reservierungstool werden Gästedaten (Name, Telefon, Zeit) verarbeitet.
Auch dafür ist ein AV-Vertrag nötig. Bei DISH liegt er meist den
Vertragsunterlagen bei oder ist im DISH-Konto abrufbar. **Nachfragen und
abspeichern.**

**3. Serverstandort dokumentieren**
Beim Anbieter nachsehen, wo die Server stehen (sollte Deutschland/EU sein).

**4. Logfile-Aufbewahrung prüfen**
Server speichern Zugriffe inkl. IP-Adresse. Üblich und zulässig ist eine
kurze Speicherdauer (**max. 7 Tage**, danach Löschung/Anonymisierung).
Im Kundenmenü einstellen, falls möglich.

**5. Datenschutzerklärung final prüfen lassen**
Die Texte sind sorgfältig erstellt, aber **ich bin kein Anwalt.** Vor dem
endgültigen Live-Gang einmal von einem Fachkundigen (Datenschutzbeauftragter,
Anwalt, oder z. B. eRecht24-Prüfung) absegnen lassen. Bei einem
Gastronomie-Betrieb ist das Risiko einer Abmahnung sonst real.

### 6.3 Die monatliche Datenschutz-Prüfung

Du wolltest das monatlich prüfen – sehr gut. Schreib mir einfach:
**„Gibt es Neuigkeiten zum Datenschutz für unsere Website?"**

Dann prüfe ich für dich:

1. **Rechtslage** – neue Urteile/Gesetzesänderungen (DSGVO, DDG/TTDSG),
   z. B. zu Cookie-Bannern oder Einwilligungen
2. **DISH/METRO** – geänderte Datenschutzbedingungen oder neue Unterauftragnehmer
3. **Hoster** – aktualisierter AV-Vertrag
4. **Technische Prüfung** – lädt wirklich nichts Externes ohne Einwilligung?
   (Das prüfe ich direkt im Code nach.)
5. **Texte** – sind Impressum/Datenschutzerklärung noch aktuell
   (Anschrift, Verantwortlicher, neue Funktionen der Website)?

> Zusätzlich sinnvoll: Ein fester Termin im Kalender, z. B. jeder **1. des
> Monats**, damit es nicht vergessen wird.

---

## Teil 7: Nach dem Go-Live

### 7.1 Bei Google eintragen

1. **Google Search Console** (kostenlos, search.google.com/search-console):
   Domain bestätigen, dann `sitemap.xml` einreichen → die Seite wird schneller
   gefunden.
2. **Google Unternehmensprofil** (Business Profile): Falls noch nicht vorhanden,
   anlegen bzw. die **Website-Adresse aktualisieren**. Für ein Restaurant ist
   das der **wichtigste** Kanal – die meisten Gäste suchen über Google Maps.
3. Die Website liefert Google bereits fertige Daten zu Adresse, Telefon,
   Öffnungszeiten und Speisekarte (das habe ich eingebaut).

### 7.2 Alte Verweise aktualisieren

- Facebook-Seite → neue Website-Adresse
- Google-Profil, Tripadvisor, Speisekarten-Portale
- Visitenkarten/Flyer bei der nächsten Bestellung

### 7.3 Laufende Pflege

| Was | Wie oft |
|---|---|
| Speise-/Weinkarte aktualisieren (PDF austauschen) | bei Änderung |
| Events-Termine pflegen | monatlich |
| Öffnungszeiten (Feiertage, Urlaub) | bei Bedarf |
| Datenschutz-Prüfung | monatlich |
| Backup der Website | vor jeder Änderung (liegt ohnehin auf GitHub ✅) |

> **Änderungen an Texten/Terminen** stehen fast alle zentral in
> `js/data/content.js`. Sag mir einfach, was geändert werden soll – oder
> tausche das PDF im Ordner `assets/pdf/` aus.

---

## Kurzfassung zum Abhaken

```
[ ]  1. Webhosting kaufen (Serverstandort DE/EU, SSL, E-Mail, AV-Vertrag)
[ ]  2. AV-Vertrag im Kundenmenü abschließen + PDF speichern
[ ]  3. Website per FTP hochladen (inkl. versteckter .htaccess)
[ ]  4. Über Test-Adresse alles durchklicken (auch am Handy)
[ ]  5. Alle bisherigen E-Mail-Adressen bei IONOS notieren
[ ]  6. Backup der alten E-Mails anlegen
[ ]  7. Postfächer beim neuen Anbieter anlegen
[ ]  8. Alte E-Mails kopieren (IMAP / Thunderbird)
[ ]  9. Auth-Code bei IONOS holen (Domains → Verlängerung & Transfer)
[ ] 10. Domain-Umzug beim neuen Anbieter beauftragen
[ ] 11. 1–7 Tage warten
[ ] 12. SSL-Zertifikat aktivieren
[ ] 13. Website + E-Mail + Reservierung testen
[ ] 14. Google Search Console + Unternehmensprofil aktualisieren
[ ] 15. 2–4 Wochen Sicherheitsabstand – DANN IONOS kündigen
```

---

*Bei jedem einzelnen Schritt kannst du mich fragen – am besten mit einem
Screenshot, wenn irgendwo etwas anders aussieht als hier beschrieben.*
