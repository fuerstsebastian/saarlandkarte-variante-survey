# PROJEKT-STATUS

## Ueberblick

Dieses Projekt enthaelt eine statische HTML-Survey zur Bewertung von sieben Saarland-Archäologie-Kartenvarianten. Die Seite wird ohne eigenes Backend betrieben und exportiert Ergebnisse lokal als CSV oder JSON. Als Alternative steht ein Google-Forms-Erstellungsskript bereit, das eine anonyme Online-Umfrage mit automatisierter Antwortensammlung erzeugt.

## Entscheidungen

- 2026-07-05: Die parallele PC/Handy-Nutzung wird serverlos umgesetzt. Eine vierstellige Session-ID und die zufällig erzeugte Reihenfolge werden in der URL geteilt, damit Smartphone-Fragen und PC-Monitor-Modus dieselbe Seitenfolge verwenden.
- 2026-07-05: Da ohne Backend keine echte Live-Synchronisierung zwischen PC und Smartphone garantiert werden kann, wird die Korrektheit über sichtbare Session-/Seitennummern, Monitor-Modus und einen expliziten Kontrollcheck pro Bewertungsseite abgesichert.
- 2026-07-06: Der GitHub-Gist-Upload (uploadToGist) wurde entfernt, weil der dafür benötigte Personal Access Token versehentlich im Quellcode committed und von GitHub automatisch widerrufen wurde. Die Funktion wurde durch direkten JSON- und CSV-Download ersetzt.
- 2026-07-06: Als anonyme Online-Alternative zum HTML-Survey wurde ein Google-Forms-Erstellungsskript (`google_forms_survey.gs`) erstellt. Es erzeugt per Apps Script ein vollständiges Google-Formular mit allen Bewertungsdimensionen, Checkboxen und Abschlussfragen. Antworten sind anonym (keine E-Mail-Erfassung).

## Aktueller Stand

- `index.html`: Token und `uploadToGist()`-Funktion entfernt. Ergebnisse können als JSON und CSV heruntergeladen werden.
- `google_forms_survey.gs`: Fertiges Apps-Script zum Erstellen eines Google-Forms-Surveys.
- Git-History wurde per `git filter-branch` vom Token gesäubert und per Force-Push auf GitHub aktualisiert.
- GitHub Pages Deployment sollte nach dem Force-Push wieder funktionieren.

## Naechste Schritte

- GitHub Pages Deployment prüfen: `https://fuerstsebastian.github.io/saarlandkarte-variante-survey/` aufrufen und testen.
- Google-Forms-Skript ausführen: `script.google.com` → neues Projekt → Skript einfügen → `createSurveyForm` ausführen.
- Formular testen und Link/QR-Code mit Studierenden teilen.
- Antworten in Google Sheets auswerten.
