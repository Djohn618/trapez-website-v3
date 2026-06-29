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
// E-MAIL 2: Bestätigung an den Gast
// ─────────────────────────────────────────────────────
$guest_subject = "Reservierungsanfrage erhalten — " . RESTAURANT_NAME;

$guest_body = "Guten Tag $vorname,\n\n"
    . "Wir haben Ihre Reservierungsanfrage erhalten und melden uns in Kürze bei Ihnen.\n\n"
    . "IHRE ANGABEN\n"
    . str_repeat('=', 40) . "\n"
    . "Datum:     $date_fmt\n"
    . "Uhrzeit:   $time Uhr\n"
    . "Personen:  $guests\n"
    . ($message ? "Wünsche:   $message\n" : '')
    . "\n"
    . "Bei Fragen erreichen Sie uns unter:\n"
    . "Telefon:  061 711 44 10\n"
    . "E-Mail:   " . RESTAURANT_EMAIL . "\n\n"
    . "Herzliche Grüsse,\n"
    . RESTAURANT_NAME . "\n"
    . "Sonnenweg 18 · 4153 Reinach BL\n";

$guest_headers  = "From: " . RESTAURANT_NAME . " <" . FROM_EMAIL . ">\r\n";
$guest_headers .= "Reply-To: " . RESTAURANT_EMAIL . "\r\n";
$guest_headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$guest_headers .= "X-Mailer: PHP\r\n";

mail($email, $guest_subject, $guest_body, $guest_headers);

header('Location: ../thank-you.html');
exit;
