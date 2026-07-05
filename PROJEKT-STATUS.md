# PROJEKT-STATUS

## Ueberblick

Dieses Projekt enthaelt eine statische HTML-Survey zur Bewertung von sieben Saarland-Archäologie-Kartenvarianten. Die Seite wird ohne eigenes Backend betrieben und exportiert Ergebnisse lokal als CSV oder JSON.

## Entscheidungen

- 2026-07-05: Die parallele PC/Handy-Nutzung wird serverlos umgesetzt. Eine vierstellige Session-ID und die zufällig erzeugte Reihenfolge werden in der URL geteilt, damit Smartphone-Fragen und PC-Monitor-Modus dieselbe Seitenfolge verwenden.
- 2026-07-05: Da ohne Backend keine echte Live-Synchronisierung zwischen PC und Smartphone garantiert werden kann, wird die Korrektheit über sichtbare Session-/Seitennummern, Monitor-Modus und einen expliziten Kontrollcheck pro Bewertungsseite abgesichert.

## Aktueller Stand

- `index.html` enthält Session-Code, dynamischen QR-Code, Session-Teilen-Hinweis und Monitor-Modus.
- Exportdaten enthalten Session-Informationen und den Kontrollcheck PC/Handy.

## Naechste Schritte

- Im Browser auf GitHub Pages testen, ob alle sieben Varianten im Monitor-Modus im iframe angezeigt werden.
- Falls eine Variante iframe-Anzeige blockiert, bleibt der Button "in neuem Tab öffnen" als Fallback erhalten.
