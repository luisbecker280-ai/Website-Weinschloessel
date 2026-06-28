/**
 * content.js
 * -------------------------------------------------------------
 * ZENTRALE INHALTS-DATEI.
 *
 * Hier stehen ALLE Texte, Preise, Zeiten und Bild-Platzhalter der
 * Website. Wenn ihr etwas am Inhalt ändern wollt (Preise, Öffnungs-
 * zeiten, Events ...), müsst ihr NUR diese Datei anfassen – nicht den
 * restlichen Programmcode. Das ist der "objektorientierte" Gedanke:
 * Inhalt (Daten) und Logik (Programm) sind getrennt.
 *
 * Ein Bild wird so eingebunden:
 *   image: { label: "Beschreibung", src: null }
 *   -> solange src = null ist, zeigt die Seite einen blauen Platzhalter.
 *   -> sobald ihr ein Bild habt, einfach src: "assets/img/datei.jpg"
 *      setzen, dann erscheint automatisch das echte Bild.
 * -------------------------------------------------------------
 */

/* Allgemeine Angaben zur Seite */
export const site = {
  name: "Ristorante Weinschlössel",
  // Logo: solange src = null ist, wird das gold-Oval mit "W" per CSS gezeichnet.
  // Sobald ihr eine Logo-Datei habt: src: "assets/img/logo.png"
  logo: { src: null },
};

/* Die obere Navigationsleiste.
 * type: "route"  -> öffnet eine eigene Unterseite
 * type: "scroll" -> scrollt auf der Startseite zum passenden Bereich
 */
export const navigation = [
  { id: "home",          label: "Startseite",        type: "route"  },
  { id: "oeffnungszeiten", label: "Öffnungszeiten",  type: "scroll" },
  { id: "events",        label: "Events",            type: "scroll" },
  { id: "prodotto",      label: "Prodotto di Piero", type: "scroll" },
  { id: "partyservice",  label: "Partyservice",      type: "scroll" },
  { id: "kontakt",       label: "Kontakt",           type: "scroll" },
  // Reservieren ist KEINE eigene Seite mehr, sondern ein Abschnitt
  // unter Kontakt – man scrollt einfach dorthin.
  { id: "reservieren",   label: "Reservieren",       type: "scroll" },
];

/* Inhalte der einzelnen Bereiche */
export const content = {

  /* ---------- HERO / Kopfbereich der Startseite ---------- */
  hero: {
    logoTop: "Ristorante",
    logoMain: "Weinschlössel",
    logoSub: "Winelounge",
    image: { label: "Hero – Weinflasche (s/w)", src: "assets/img/hero.jpg" },
  },

  /* ---------- ÖFFNUNGSZEITEN ---------- */
  oeffnungszeiten: {
    title: "Öffnungszeiten",
    image: { label: "Innenraum / Lounge", src: "assets/img/innenraum.jpg" },
    imageSide: "left",
    blocks: [
      {
        heading: "Ristorante",
        lines: ["Donnerstag – Montag:", "11:30 Uhr – 14:30 Uhr", "17:00 Uhr – 22:00 Uhr"],
      },
      {
        heading: "Küche",
        lines: ["Donnerstag – Montag:", "11:30 Uhr – 14:00 Uhr", "17:00 Uhr – 21:00 Uhr"],
      },
    ],
    note: "Diese Zeiten gelten auch an Sonn- und Feiertagen:",
  },

  /* ---------- EVENTS ---------- */
  events: {
    title: "Events",
    image: { label: "Oktopus vom Grill", src: "assets/img/events.jpg" },
    imageSide: "right",
    groups: [
      {
        // Hinweis: Im Screenshot steht "Molaabend" – bitte prüfen, ob "Mottoabend" gemeint ist.
        heading: "Molaabend",
        entries: [
          { day: "Samstag", date: "07.03.2026", time: "18 Uhr" },
          { day: "Samstag", date: "17.10.2026", time: "18 Uhr" },
        ],
      },
      {
        heading: "Silvester",
        entries: [
          { day: "Donnerstag", date: "31.12.2026", time: "18 Uhr" },
        ],
      },
    ],
  },

  /* ---------- PRODOTTO DI PIERO ---------- */
  prodotto: {
    title: "Prodotto di Piero",
    image: { label: "Olivenöl-Flaschen", src: "assets/img/prodotto.jpg" },
    imageSide: "left",
    categories: [
      {
        heading: "Olivenöle",
        items: [
          { name: "Knoblauch-Chili Öl",    price: "9,00 €", deposit: "+1,90 € Pfand" },
          { name: "Rosmarin-Basilikum Öl", price: "9,00 €", deposit: "+1,90 € Pfand" },
        ],
      },
      {
        heading: "Pasten",
        items: [
          { name: "Olivenpaste klein", price: "5,00 €", deposit: "+1,90 € Pfand" },
          { name: "Olivenpaste groß",  price: "7,00 €", deposit: "+1,90 € Pfand" },
        ],
      },
      {
        heading: "Salze",
        items: [
          // Hinweis: Im Screenshot "Rosmarinssalz" – bitte Schreibweise prüfen.
          { name: "Zitronengrassalz", price: "5,50 €" },
          { name: "Rosmarinssalz",    price: "5,50 €" },
          { name: "Chilisalz",        price: "5,50 €" },
        ],
      },
    ],
  },

  /* ---------- PARTYSERVICE ---------- */
  partyservice: {
    title: "Partyservice",
    image: { label: "Weinregal", src: "assets/img/weinregal.jpg" },
    imageSide: "right",
    paragraphs: [
      "Ob Geburtstag, Hochzeit, Taufe oder Firmenfeier – wir beraten und unterstützen Sie individuell und professionell.",
      "Wir schenken Ihren Wünschen Gehör und Ihnen somit einen unvergesslichen Tag.",
    ],
  },

  /* ---------- KONTAKT ---------- */
  kontakt: {
    title: "Kontakt",
    image: { label: "Tischschild „Reserviert“", src: "assets/img/kontakt.jpg" },
    imageSide: "left",
    name: "Ristorante Weinschlössel",
    person: "Nicola Vaccarelli",
    street: "Kurtalstrasse 10",
    city: "76887 Bad Bergzabern",
    phone: "+49 6343 1331",
    email: "info@ristorante-weinschloessel.de",
    web: "www.ristorante-weinschloessel.de",
    // QR-Code Anfahrt: Datei unter assets/img/qr-anfahrt.png ablegen.
    anfahrt: { label: "QR-Code Routenplanung", src: "assets/img/qr-anfahrt.png" },
    notice: "Liebe Gäste, bitte beachten Sie, dass Hunde in unserem Gastraum nicht erlaubt sind.",
  },

  /* ---------- RESERVIEREN (Abschnitt unter Kontakt) ---------- */
  reservieren: {
    title: "Reservieren",
    image: { label: "Gedeckter Tisch / Terrasse", src: "assets/img/reservieren.jpg" },
    imageSide: "right",
    lead: "Wir freuen uns auf Ihren Besuch. Reservieren Sie ganz einfach telefonisch oder per E-Mail – unser Online-Reservierungssystem folgt in Kürze.",
  },

  /* ---------- Abschlussbild über dem Footer ---------- */
  closingImage: { label: "Terrasse / gedeckter Tisch", src: "assets/img/terrasse.jpg" },

  /* ---------- FOOTER ---------- */
  footer: {
    // TODO: echte Facebook-Adresse eintragen, z. B. "https://www.facebook.com/..."
    facebookUrl: "#",
  },

  /* ---------- IMPRESSUM ---------- */
  impressum: {
    title: "Impressum",
    subtitle: "Inhaltlich Verantwortliche gemäß § 6 MDStV",
    lines: ["Nicola Vaccarelli", "Kurtalstrasse 10", "76887 Bad Bergzabern"],
    contact: ["Tel: +49 6343 1331", "Email: info@ristorante-weinschloessel.de"],
  },

  /* ---------- DATENSCHUTZERKLÄRUNG ---------- */
  datenschutz: {
    title: "Datenschutzerklärung",
    sections: [
      {
        h: "1. Datenschutz auf einen Blick",
        blocks: [
          {
            sub: "Allgemeine Hinweise",
            p: [
              "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.",
            ],
          },
          {
            sub: "Datenerfassung auf dieser Website",
            p: [],
          },
          {
            sub: "Wer ist verantwortlich für die Datenerfassung auf dieser Website?",
            p: [
              "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.",
            ],
          },
          {
            sub: "Wie erfassen wir Ihre Daten?",
            p: [
              "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.",
              "Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.",
            ],
          },
          {
            sub: "Wofür nutzen wir Ihre Daten?",
            p: [
              "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.",
            ],
          },
          {
            sub: "Welche Rechte haben Sie bezüglich Ihrer Daten?",
            p: [
              "Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.",
              "Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Details hierzu entnehmen Sie der Datenschutzerklärung unter „Recht auf Einschränkung der Verarbeitung“.",
            ],
          },
          {
            sub: "Analyse-Tools und Tools von Drittanbietern",
            p: [
              "Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden.",
              "Sie können dieser Analyse widersprechen oder sie durch die Nichtbenutzung bestimmter Tools verhindern. Detaillierte Informationen zu diesen Tools und über Ihre Widerspruchsmöglichkeiten finden Sie in der folgenden Datenschutzerklärung.",
            ],
          },
        ],
      },
      {
        h: "2. Hosting",
        blocks: [
          {
            sub: "Externes Hosting",
            p: [
              "Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, handeln.",
              "Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).",
              "Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.",
            ],
          },
          {
            sub: "Abschluss eines Vertrages über Auftragsverarbeitung",
            p: [
              "Um die datenschutzkonforme Verarbeitung zu gewährleisten, haben wir einen Vertrag über Auftragsverarbeitung mit unserem Hoster geschlossen.",
            ],
          },
        ],
      },
      {
        h: "3. Allgemeine Hinweise und Pflichtinformationen",
        blocks: [
          {
            sub: "Datenschutz",
            p: [
              "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
              "Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.",
              "Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
            ],
          },
          {
            sub: "Hinweis zur verantwortlichen Stelle",
            p: [
              "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:",
              "Nicola Vaccarelli",
              "Kurtalstrasse 10",
              "76887 Bad Bergzabern",
              "Telefon: +49 6343 1331",
              "E-Mail: info@ristorante-weinschloessel.de",
              "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.",
            ],
          },
          {
            sub: "Widerruf Ihrer Einwilligung zur Datenverarbeitung",
            p: [
              "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.",
            ],
          },
          {
            sub: "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)",
            p: [
              "WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).",
              "WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).",
            ],
          },
          {
            sub: "Beschwerderecht bei der zuständigen Aufsichtsbehörde",
            p: [
              "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.",
            ],
          },
          {
            sub: "Recht auf Datenübertragbarkeit",
            p: [
              "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.",
            ],
          },
          {
            sub: "SSL- bzw. TLS-Verschlüsselung",
            p: [
              "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.",
              "Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.",
            ],
          },
          {
            sub: "Auskunft, Löschung und Berichtigung",
            p: [
              "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.",
            ],
          },
          {
            sub: "Recht auf Einschränkung der Verarbeitung",
            p: [
              "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:",
              "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
              "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
              "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
              "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
              "Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.",
            ],
          },
        ],
      },
      {
        h: "4. Datenerfassung auf dieser Website",
        blocks: [
          {
            sub: "Cookies",
            p: [
              "Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.",
              "Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.",
              "Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.",
              "Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. Warenkorbfunktion) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine entsprechende Einwilligung abgefragt wurde (z. B. eine Einwilligung zur Speicherung von Cookies), erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.",
            ],
          },
          {
            sub: "Server-Log-Dateien",
            p: [
              "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:",
              "Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.",
              "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.",
              "Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.",
            ],
          },
          {
            sub: "Anfrage per E-Mail, Telefon oder Telefax",
            p: [
              "Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
              "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) und/oder auf unseren berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO), da wir ein berechtigtes Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen haben.",
              "Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.",
            ],
          },
        ],
      },
      {
        h: "5. Soziale Medien",
        blocks: [
          {
            sub: "Social-Media-Plugins mit Shariff",
            p: [
              "Auf dieser Website werden Plugins von sozialen Medien verwendet (z. B. Facebook, Twitter, Google+, Instagram, Pinterest, XING, LinkedIn, Tumblr).",
              "Die Plugins können Sie in der Regel anhand der jeweiligen Social-Media-Logos erkennen. Um den Datenschutz auf dieser Website zu gewährleisten, verwenden wir diese Plugins nur zusammen mit der sogenannten „Shariff“-Lösung. Diese Anwendung verhindert, dass die auf dieser Website integrierten Plugins Daten schon beim ersten Betreten der Seite an den jeweiligen Anbieter übertragen.",
              "Erst wenn Sie das jeweilige Plugin durch Anklicken der zugehörigen Schaltfläche aktivieren, wird eine direkte Verbindung zum Server des Anbieters hergestellt (Einwilligung). Sobald Sie das Plugin aktivieren, erhält der jeweilige Anbieter die Information, dass Sie mit Ihrer IP-Adresse dieser Website besucht haben. Wenn Sie gleichzeitig in Ihrem jeweiligen Social-Media-Account (z. B. Facebook) eingeloggt sind, kann der jeweilige Anbieter den Besuch dieser Website Ihrem Benutzerkonto zuordnen.",
              "Das Aktivieren des Plugins stellt eine Einwilligung im Sinne des Art. 6 Abs. 1 lit. a DSGVO dar. Diese Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.",
            ],
          },
          {
            sub: "Facebook Plugins (Like & Share-Button)",
            p: [
              "Auf dieser Website sind Plugins des sozialen Netzwerks Facebook, Anbieter Facebook Inc., 1 Hacker Way, Menlo Park, California 94025, USA, integriert. Die Facebook Plugins erkennen Sie an dem Facebook-Logo oder dem „Like-Button“ („Gefällt mir“) auf dieser Website. Eine Übersicht über die Facebook Plugins finden Sie hier: https://developers.facebook.com/docs/plugins/?locale=de_DE.",
              "Wenn Sie diese Website besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser und dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse diese Website besucht haben. Wenn Sie den Facebook „Like-Button“ anklicken während Sie in Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte dieser Website auf Ihrem Facebook-Profil verlinken. Dadurch kann Facebook den Besuch dieser Website Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Facebook unter: https://de-de.facebook.com/privacy/explanation.",
              "Wenn Sie nicht wünschen, dass Facebook den Besuch dieser Website Ihrem Facebook-Nutzerkonto zuordnen kann, loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.",
              "Die Verwendung der Facebook Plugins erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer möglichst umfangreichen Sichtbarkeit in den Sozialen Medien.",
            ],
          },
        ],
      },
      {
        h: "6. Plugins und Tools",
        blocks: [
          {
            sub: "YouTube mit erweitertem Datenschutz",
            p: [
              "Diese Website bindet Videos der YouTube ein. Betreiber der Seiten ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.",
              "Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt laut YouTube, dass YouTube keine Informationen über die Besucher auf dieser Website speichert, bevor diese sich das Video ansehen. Die Weitergabe von Daten an YouTube-Partner wird durch den erweiterten Datenschutzmodus hingegen nicht zwingend ausgeschlossen. So stellt YouTube – unabhängig davon, ob Sie sich ein Video ansehen – eine Verbindung zum Google DoubleClick-Netzwerk her.",
              "Sobald Sie ein YouTube-Video auf dieser Website starten, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie besucht haben. Wenn Sie in Ihrem YouTube-Account eingeloggt sind, ermöglichen Sie YouTube, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem YouTube-Account ausloggen.",
              "Des Weiteren kann YouTube nach Starten eines Videos verschiedene Cookies auf Ihrem Endgerät speichern. Mit Hilfe dieser Cookies kann YouTube Informationen über Besucher dieser Website erhalten. Diese Informationen werden u. a. verwendet, um Videostatistiken zu erfassen, die Anwenderfreundlichkeit zu verbessern und Betrugsversuchen vorzubeugen. Die Cookies verbleiben auf Ihrem Endgerät, bis Sie sie löschen. Gegebenenfalls können nach dem Start eines YouTube-Videos weitere Datenverarbeitungsvorgänge ausgelöst werden, auf die wir keinen Einfluss haben.",
              "Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde (z. B. eine Einwilligung zur Speicherung von Cookies), erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.",
              "Weitere Informationen über Datenschutz bei YouTube finden Sie in deren Datenschutzerklärung unter: https://policies.google.com/privacy?hl=de.",
            ],
          },
          {
            sub: "Google Maps (mit Einwilligung)",
            p: [
              "Diese Website nutzt über eine API den Kartendienst Google Maps. Anbieterin ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.",
              "Um den Datenschutz auf dieser Website zu gewährleisten, ist Google Maps deaktiviert, wenn Sie diese Website das erste Mal betreten. Eine direkte Verbindung zu den Servern von Google wird erst hergestellt, wenn Sie Google Maps selbstständig aktivieren (Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO). Auf diese Weise wird verhindert, dass Ihre Daten schon beim ersten Betreten der Seite an Google übertragen werden.",
              "Nach der Aktivierung wird Google Maps Ihre IP-Adresse speichern. Diese wird anschließend in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat nach der Aktivierung von Google Maps keinen Einfluss auf diese Datenübertragung.",
              "Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://www.google.de/intl/de/policies/privacy/.",
            ],
          },
          {
            sub: "Quelle",
            p: ["https://www.e-recht24.de"],
          },
        ],
      },
    ],
  },
};
