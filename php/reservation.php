<?php
require_once __DIR__ . '/config.php';

// Honeypot: bots fill this hidden field, humans don't
if (!empty($_POST['website'])) {
    header('Location: ../thank-you.html');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../index.html');
    exit;
}

$vorname  = trim($_POST['vorname']  ?? '');
$nachname = trim($_POST['nachname'] ?? '');
$email    = trim($_POST['email']    ?? '');
$phone    = trim($_POST['phone']    ?? '');
$date     = trim($_POST['date']     ?? '');
$time     = trim($_POST['time']     ?? '');
$guests   = trim($_POST['guests']   ?? '');
$message  = trim($_POST['message']  ?? '');
$lang     = trim($_POST['language'] ?? 'de');

if (!in_array($lang, ['de', 'en', 'it', 'fr'], true)) {
    $lang = 'de';
}

$name = "$vorname $nachname";

// Server-side validation
if (!$vorname || !$nachname || !$email || !$date || !$time || !$guests) {
    header('Location: ../index.html#reservieren');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ../index.html#reservieren');
    exit;
}

// Sanitise for email headers (prevent injection)
$vorname  = strip_tags($vorname);
$nachname = strip_tags($nachname);
$name     = strip_tags($name);
$phone    = strip_tags($phone);
$guests   = strip_tags($guests);
$date_fmt = date('d.m.Y', strtotime($date));
$message  = strip_tags($message);

// ─────────────────────────────────────────────────────
// E-MAIL 1: Benachrichtigung ans Restaurant
// ─────────────────────────────────────────────────────
$restaurant_subject = "Neue Reservierung — $name · $guests Pers. · $date_fmt $time";

$restaurant_body = "NEUE TISCHRESERVIERUNG\n"
    . str_repeat('=', 40) . "\n\n"
    . "Name:      $name\n"
    . "E-Mail:    $email\n"
    . "Telefon:   " . ($phone ?: '—') . "\n"
    . "Datum:     $date_fmt\n"
    . "Uhrzeit:   $time Uhr\n"
    . "Personen:  $guests\n\n"
    . "Besondere Wünsche:\n"
    . ($message ?: '—') . "\n\n"
    . str_repeat('—', 40) . "\n"
    . "Gesendet über die Website von " . RESTAURANT_NAME;

$restaurant_headers  = "From: " . FROM_EMAIL . "\r\n";
$restaurant_headers .= "Reply-To: $email\r\n";
$restaurant_headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$restaurant_headers .= "X-Mailer: PHP\r\n";

mail(RESTAURANT_EMAIL, $restaurant_subject, $restaurant_body, $restaurant_headers);

// ─────────────────────────────────────────────────────
// E-MAIL 2: Bestätigung an den Gast (in Sprache des Gastes)
// ─────────────────────────────────────────────────────
$guest_i18n = [
    'de' => [
        'subject' => "Reservierungsanfrage erhalten — " . RESTAURANT_NAME,
        'greeting' => "Guten Tag $vorname,",
        'intro'    => "Wir haben Ihre Reservierungsanfrage erhalten und melden uns in Kürze bei Ihnen.",
        'contact'  => "Bei Fragen erreichen Sie uns unter:",
        'closing'  => "Herzliche Grüsse,",
    ],
    'en' => [
        'subject' => "Reservation request received — " . RESTAURANT_NAME,
        'greeting' => "Dear $vorname,",
        'intro'    => "We have received your reservation request and will get back to you shortly.",
        'contact'  => "If you have any questions, you can reach us at:",
        'closing'  => "Kind regards,",
    ],
    'it' => [
        'subject' => "Richiesta di prenotazione ricevuta — " . RESTAURANT_NAME,
        'greeting' => "Gentile $vorname,",
        'intro'    => "Abbiamo ricevuto la sua richiesta di prenotazione e la contatteremo al più presto.",
        'contact'  => "Per qualsiasi domanda, può contattarci a:",
        'closing'  => "Cordiali saluti,",
    ],
    'fr' => [
        'subject' => "Demande de réservation reçue — " . RESTAURANT_NAME,
        'greeting' => "Cher/Chère $vorname,",
        'intro'    => "Nous avons bien reçu votre demande de réservation et vous contacterons dans les plus brefs délais.",
        'contact'  => "Pour toute question, vous pouvez nous contacter au:",
        'closing'  => "Cordialement,",
    ],
];
$gt = $guest_i18n[$lang];

$labels = [
    'de' => [
        'angaben'   => 'IHRE ANGABEN',
        'datum'     => 'Datum',
        'uhrzeit'   => 'Uhrzeit',
        'uhr'       => 'Uhr',
        'personen'  => 'Personen',
        'wuensche'  => 'Wünsche',
        'fragen'    => 'Bei Fragen erreichen Sie uns unter:',
        'telefon'   => 'Telefon',
        'email'     => 'E-Mail',
    ],
    'en' => [
        'angaben'   => 'YOUR DETAILS',
        'datum'     => 'Date',
        'uhrzeit'   => 'Time',
        'uhr'       => '',
        'personen'  => 'Guests',
        'wuensche'  => 'Notes',
        'fragen'    => 'For any questions, please contact us:',
        'telefon'   => 'Phone',
        'email'     => 'E-Mail',
    ],
    'it' => [
        'angaben'   => 'I SUOI DATI',
        'datum'     => 'Data',
        'uhrzeit'   => 'Orario',
        'uhr'       => '',
        'personen'  => 'Persone',
        'wuensche'  => 'Richieste',
        'fragen'    => 'Per qualsiasi domanda, può contattarci a:',
        'telefon'   => 'Telefono',
        'email'     => 'E-Mail',
    ],
    'fr' => [
        'angaben'   => 'VOS COORDONNÉES',
        'datum'     => 'Date',
        'uhrzeit'   => 'Heure',
        'uhr'       => '',
        'personen'  => 'Personnes',
        'wuensche'  => 'Remarques',
        'fragen'    => 'Pour toute question, vous pouvez nous contacter au:',
        'telefon'   => 'Téléphone',
        'email'     => 'E-Mail',
    ],
];

$l = $labels[$lang] ?? $labels['de'];

$guest_subject = $gt['subject'];

$guest_body = $gt['greeting'] . "\n\n"
    . $gt['intro'] . "\n\n"
    . $l['angaben'] . "\n"
    . str_repeat('=', 40) . "\n"
    . $l['datum'] . ":     $date_fmt\n"
    . $l['uhrzeit'] . ":   $time " . $l['uhr'] . "\n"
    . $l['personen'] . ":  $guests\n"
    . ($message ? $l['wuensche'] . ":   $message\n" : '')
    . "\n"
    . $l['fragen'] . "\n"
    . $l['telefon'] . ":  061 712 44 10\n"
    . $l['email'] . ":    " . RESTAURANT_EMAIL . "\n\n"
    . $gt['closing'] . "\n"
    . RESTAURANT_NAME . "\n"
    . "Sonnenweg 18 · 4153 Reinach BL\n";

$guest_headers  = "From: " . RESTAURANT_NAME . " <" . FROM_EMAIL . ">\r\n";
$guest_headers .= "Reply-To: " . RESTAURANT_EMAIL . "\r\n";
$guest_headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$guest_headers .= "X-Mailer: PHP\r\n";

mail($email, $guest_subject, $guest_body, $guest_headers);

header('Location: ../thank-you.html');
exit;
