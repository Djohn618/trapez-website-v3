# Restaurant Trapez — Website v2

## Projekt
Single-Page Website für Restaurant Trapez, Reinach BL, Schweiz.
Hosting: cyon.ch

## Stack
- HTML / CSS / Vanilla JS — kein Framework, kein Bootstrap, kein jQuery
- PHP für Reservierungsformular — cyon SMTP, KEIN Formspree

## Farben & Fonts
- Dunkelgrün: #1B3A2D · Gold: #C9A84C · Creme: #F5F0E8
- Fonts: Playfair Display (Überschriften) · Inter (Text)

## Seitenstruktur (Single Page)
- index.html — alles: Hero, Speisekarte, Reservierung, Galerie, Kontakt
- danke.html — Redirect nach Reservierung
- datenschutz.html — Datenschutz + Impressum
- 404.html — Fehlerseite

## Wichtige Dateien
- data/menu.json — Speisekarte (CEO editiert selbst)
- data/reviews.json — Bewertungen (CEO editiert selbst alle 1-2 Monate)
- data/translations.json — alle Texte DE/EN/IT/FR
- assets/pdf/Trapez-Speisekarte.pdf — CEO ersetzt per FTP
- php/config.php — SMTP Zugangsdaten (NIEMALS committen!)

## Regeln
- Kein Formspree — nur cyon PHP
- PDF öffnet im neuen Tab — kein Download-Button
- 2 Hero Buttons: "Tisch Reservieren" + "Tagesmenü"
- Speisekarte: Typografie-Stil, keine Bilder pro Gericht
- Ken Burns Slideshow statt Video
- Übersetzungen kulturell angepasst — nicht wörtlich
- Commits auf Englisch: feat: / fix: / style: / content: / chore:
- php/config.php wird NIEMALS committet

## Kontaktdaten
- Adresse: Sonnenweg 18, 4153 Reinach BL
- Telefon: 061 711 44 10
- E-Mail: kontakt@trapez.ch
- Öffnungszeiten:
  Mo–Fr: 10:00–14:00 | 17:00–23:00
  Samstag: 17:00–23:00
  Sonntag: 17:00–22:30