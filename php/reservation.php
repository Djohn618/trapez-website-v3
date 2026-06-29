<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$phone   = trim($_POST['phone']   ?? '');
$date    = trim($_POST['date']    ?? '');
$time    = trim($_POST['time']    ?? '');
$guests  = (int) ($_POST['guests'] ?? 0);
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$date || !$time || $guests < 1) {
    http_response_code(400);
    exit(json_encode(['error' => 'Missing required fields']));
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Invalid email address']));
}

$subject = "Neue Reservierung: $name, $guests Pers. am $date um $time";
$body    = "Name: $name\nE-Mail: $email\nTelefon: $phone\nDatum: $date\nUhrzeit: $time\nPersonen: $guests\n\nNachricht:\n$message";

$headers  = "From: " . SMTP_FROM . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP\r\n";

$sent = mail(SMTP_TO, $subject, $body, $headers);

if ($sent) {
    header('Location: ../thank-you.html');
    exit;
} else {
    http_response_code(500);
    exit(json_encode(['error' => 'Mail delivery failed']));
}
