/**
 * Erstellt das vollständige Google-Forms-Umfrageformular für die
 * Saarland-Archäologie-Kartenvarianten-Bewertung.
 *
 * Ausführung: 1. script.google.com öffnen → Neues Projekt
 *             2. Dieses Skript einfügen → createSurveyForm auswählen → Ausführen
 *             3. Berechtigungen einmalig erteilen
 *             4. Formular-URL erscheint im Log (Ansicht → Logs)
 *             5. Formular unter forms.google.com aufrufen und teilen
 */
function createSurveyForm() {
  const form = FormApp.create('Bewertung: Saarland-Archäologie-Kartenvarianten');

  // --- Einstellungen ---
  form.setDescription(
    'Studentisches Projekt zu Vibe-Coding und saarländischer Lokalgeschichte • SoSe 2026 • Universität des Saarlandes'
  );
  form.setAllowResponseEdits(false);
  form.setAcceptingResponses(true);
  form.setShowLinkToRespondAgain(false);

  var confirmationMessage =
    'Vielen Dank für die Teilnahme! Deine Bewertung wurde gespeichert.';
  form.setConfirmationMessage(confirmationMessage);

  // --- Konfiguration ---
  var sites = ['01', '02', '03', '04', '05', '06', '07'];
  var siteUrls = {};
  sites.forEach(function(num) {
    siteUrls[num] =
      'https://fuerstsebastian.github.io/saarlandkarte-variante-' + num + '/';
  });

  var dimensions = [
    { id: 'clarity', label: 'Klarheit und Orientierung', hint: 'Ich finde schnell, was ich brauche.' },
    { id: 'trust', label: 'Vertrauen und Verlässlichkeit', hint: 'Die Seite wirkt sorgfältig, plausibel und seriös.' },
    { id: 'friendliness', label: 'Freundlichkeit und Einladung zum Stöbern', hint: 'Die Seite macht Lust, Archäologie im Saarland zu entdecken.' },
    { id: 'impulse', label: 'Ausflugsimpuls', hint: 'Die Seite motiviert mich, eine Fundstelle oder Attraktion vor Ort zu besuchen.' },
    { id: 'map', label: 'Kartenbedienung', hint: 'Marker, Popups, Navigation und Karteninteraktion sind gut nutzbar.' },
    { id: 'filter', label: 'Filter und Informationszugang', hint: 'Suche, Filter, Kategorien oder Listen helfen beim Entdecken.' },
    { id: 'responsive', label: 'Responsiver Eindruck', hint: 'Im schmalen Browserfenster bleibt die Seite brauchbar.' }
  ];

  var features = [
    'Kartenmarker / Icons',
    'Popups / Detailansicht',
    'Filter / Suche',
    'Fundstellenliste',
    'Routen- / Ausflugsidee',
    'Bilder / Medien',
    'Epochen- / Kategorie-Erklärung',
    'Design / Farbwelt',
    'Spielerische oder entdeckende Elemente',
    'Mobile / kompakte Darstellung',
    'Sonstiges'
  ];

  var names = [
    'Archäo Saar',
    'Archäo Karte Saar',
    'Archäo Map Saarland',
    'Saarland im Lauf der Zeit',
    'Archäologische Ausflugsziele des Saarlands',
    'Kulturatlas Saarland',
    'Archäo-Atlas Saarland',
    'Archäo-Touren-Saarland',
    'Archäo-Explorer Saarland'
  ];

  // ========== STARTSEITE ==========
  var introSection = form.addSectionHeaderItem();
  introSection.setTitle('Willkommen zur Bewertung der Saarland-Archäologie-Kartenvarianten!');
  introSection.setHelpText(
    'Bitte bewerte nacheinander alle sieben Kartenvarianten.\n\n' +
    '• Öffne jede Seite in einem neuen Browser-Tab und erkunde sie.\n' +
    '• Betrachte jede Seite sowohl in voller Breite als auch in einem schmalen Fenster (Handy-Ansicht).\n' +
    '• Wichtig: Es handelt sich um studentische Prototypen mit Dummy-Daten. Die Fundstellendaten sind Platzhalter.\n' +
    '• Bewertet werden die Features, die Funktionalität und das Layout, nicht die Personen.\n\n' +
    'Links zu den sieben Varianten (in neuem Tab öffnen):\n' +
    sites.map(function(num) { return 'Seite ' + num + ': ' + siteUrls[num]; }).join('\n') +
    '\n\nDauer: ca. 10–15 Minuten. Vielen Dank für die Teilnahme!'
  );

  // ========== SEITEN 01–07 ==========
  sites.forEach(function(siteNum) {
    var pageBreak = form.addPageBreakItem();
    pageBreak.setTitle('Seite ' + siteNum);
    pageBreak.setHelpText(
      'Öffne die Seite in einem neuen Tab und erkunde sie:\n' +
      siteUrls[siteNum] + '\n\n' +
      'Betrachte sie auch in einem schmalen Browserfenster (Handy-Ansicht).'
    );

    // Bewertungsdimensionen (lineare Skala 1–5, Pflicht)
    dimensions.forEach(function(dim) {
      var item = form.addScaleItem();
      item.setTitle(dim.label);
      item.setHelpText(dim.hint);
      item.setBounds(1, 5);
      item.setLabels('1 (sehr schlecht)', '5 (sehr gut)');
      item.setRequired(true);
    });

    // Merkmale (Checkboxen)
    var featuresItem = form.addCheckboxItem();
    featuresItem.setTitle('Welche Merkmale sind dir bei Seite ' + siteNum + ' positiv aufgefallen?');
    featuresItem.setChoiceValues(features);
    featuresItem.setRequired(false);

    // Kommentar
    var commentItem = form.addParagraphTextItem();
    commentItem.setTitle('Sonstige Anmerkungen / Kommentare zu Seite ' + siteNum);
    commentItem.setHelpText('Was hat dir gefallen? Was hat nicht funktioniert?');
    commentItem.setRequired(false);
  });

  // ========== ABSCHLUSSFRAGEN ==========
  var finalBreak = form.addPageBreakItem();
  finalBreak.setTitle('Abschlussfragen – Gesamteindruck');
  finalBreak.setHelpText(
    'Falls du noch einmal nachschauen möchtest:\n' +
    sites.map(function(num) { return 'Seite ' + num + ': ' + siteUrls[num]; }).join('\n')
  );

  var finalFeatures = form.addParagraphTextItem();
  finalFeatures.setTitle('Welche zwei bis drei Features sollten sicher in die finale Version übernommen werden?');
  finalFeatures.setHelpText('z. B. Filter, Popups, bestimmte Design-Elemente...');
  finalFeatures.setRequired(false);

  var finalAvoid = form.addParagraphTextItem();
  finalAvoid.setTitle('Welche Elemente sollten eher vermieden werden?');
  finalAvoid.setHelpText('Was hat gestört oder nicht funktioniert?');
  finalAvoid.setRequired(false);

  var finalInviting = form.addMultipleChoiceItem();
  finalInviting.setTitle('Welche Seite wirkte insgesamt am einladendsten?');
  finalInviting.setChoiceValues(sites.map(function(num) { return 'Seite ' + num; }));
  finalInviting.setRequired(false);

  var finalClearest = form.addMultipleChoiceItem();
  finalClearest.setTitle('Welche Seite wirkte insgesamt am klarsten?');
  finalClearest.setChoiceValues(sites.map(function(num) { return 'Seite ' + num; }));
  finalClearest.setRequired(false);

  var finalNotes = form.addParagraphTextItem();
  finalNotes.setTitle('Sonstige Anmerkungen (optional)');
  finalNotes.setHelpText('Alles, was Sie sonst noch sagen möchten...');
  finalNotes.setRequired(false);

  // ========== NAMENSVORSCHLAG ==========
  var nameBreak = form.addPageBreakItem();
  nameBreak.setTitle('Namensvorschlag für die finale Karte');

  var nameFavorite = form.addMultipleChoiceItem();
  nameFavorite.setTitle('Welchen Namen findest du am besten? (Favorit)');
  nameFavorite.setChoiceValues(names);
  nameFavorite.setRequired(false);

  var nameAlternative = form.addMultipleChoiceItem();
  nameAlternative.setTitle('Welcher Name ist deine zweite Wahl? (Alternative)');
  nameAlternative.setChoiceValues(names);
  nameAlternative.setRequired(false);

  var nameCustom = form.addParagraphTextItem();
  nameCustom.setTitle('Eigener Namensvorschlag (optional)');
  nameCustom.setHelpText('Hast du eine eigene Idee für den Namen der finalen Karte?');
  nameCustom.setRequired(false);

  // ========== ERGEBNIS AUSGEBEN ==========
  Logger.log('=========================================');
  Logger.log('Formular erfolgreich erstellt!');
  Logger.log('Bearbeitungs-URL: ' + form.getEditUrl());
  Logger.log('Öffentliche URL: ' + form.getPublishedUrl());
  Logger.log('Antworten-URL:    ' + form.shortenFormUrl(form.getPublishedUrl()));
  Logger.log('=========================================');
  Logger.log('');
  Logger.log('Nächste Schritte:');
  Logger.log('1. Kopiere die öffentliche URL und teile sie mit den Teilnehmern.');
  Logger.log('2. Unter forms.google.com → Antworten kannst du die Ergebnisse einsehen.');
  Logger.log('3. Über das Google-Sheets-Symbol kannst du die Antworten in eine Tabelle exportieren.');
}

/**
 * Alternative: Erstellt das Formular und verknüpft es automatisch mit
 * einem Google Sheet für die Antworten.
 */
function createSurveyFormWithSheet() {
  createSurveyForm();

  // Hinweis: Die Sheet-Verknüpfung muss manuell in der Formular-Oberfläche
  // unter "Antworten" → "Ziel für Antworten auswählen" erfolgen,
  // da FormApp keine programmatische Sheet-Verknüpfung unterstützt.
}
