<?php
// IMS enquiry endpoint. Validates input and stores each enquiry as one JSON
// line in data/enquiries/YYYY-MM.jsonl (not web-accessible). Optionally emails
// api/config.php → notify_email. Success is reported only after storage works.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function out(int $code, array $body): void { http_response_code($code); echo json_encode($body, JSON_UNESCAPED_UNICODE); exit; }

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') out(405, ['ok' => false, 'errors' => ['_' => 'Method not allowed.']]);

$cfg = is_file(__DIR__ . '/config.php') ? (require __DIR__ . '/config.php') : [];
$allowedTopics = ['consultation','barms-quote','barms-demo','hotel-pos','ai','software','integrations','digital','care','support'];

// Honeypot: bots fill this in. Pretend success without storing.
if (!empty($_POST['company_website'])) out(200, ['ok' => true, 'reference' => 'IMS-' . date('ymd') . '-00000']);

$clean = static function ($v, int $max = 2000): string {
    $v = is_string($v) ? trim($v) : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $v) ?? '';
    return mb_substr($v, 0, $max);
};

$errors = [];
$topic = $clean($_POST['topic'] ?? '', 40);
if (!in_array($topic, $allowedTopics, true)) $errors['topic'] = 'Please choose what you would like to do.';
$name = $clean($_POST['name'] ?? '', 120);   if ($name === '')  $errors['name'] = 'Please enter your name.';
$org  = $clean($_POST['org'] ?? '', 160);
$email = $clean($_POST['email'] ?? '', 200);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';
$message = $clean($_POST['message'] ?? '', 5000); if ($message === '') $errors['message'] = 'Please tell us a little about what you need.';
if (($_POST['consent'] ?? '') !== 'yes') $errors['consent'] = 'Please confirm consent so we can contact you.';
if ($errors) out(422, ['ok' => false, 'errors' => $errors]);

// Simple per-IP rate limit.
$dir = dirname(__DIR__) . '/data/enquiries';
if (!is_dir($dir) && !@mkdir($dir, 0775, true)) out(500, ['ok' => false, 'errors' => ['_' => 'Storage is not available.']]);
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = $dir . '/.rate-' . md5($ip) . '.json';
$limit = (int)($cfg['rate_limit_per_hour'] ?? 12);
$hits = is_file($rlFile) ? (json_decode((string)file_get_contents($rlFile), true) ?: []) : [];
$hits = array_values(array_filter($hits, static fn($t) => $t > time() - 3600));
if (count($hits) >= $limit) out(429, ['ok' => false, 'errors' => ['_' => 'Too many enquiries from this connection. Please try again later.']]);
$hits[] = time();
@file_put_contents($rlFile, json_encode($hits));

// Collect topic-specific fields (anything else posted, safely trimmed).
$known = ['topic','topic_label','name','org','email','phone','message','consent','company_website','page'];
$extra = [];
foreach ($_POST as $k => $v) {
    if (in_array($k, $known, true) || !preg_match('/^[a-z0-9_]{1,40}$/', (string)$k)) continue;
    $extra[$k] = is_array($v) ? array_map(static fn($x) => $clean($x, 300), $v) : $clean($v, 1000);
}

$ref = 'IMS-' . date('ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));
$record = [
    'reference' => $ref, 'received' => date('c'), 'topic' => $topic, 'topic_label' => $clean($_POST['topic_label'] ?? '', 200),
    'name' => $name, 'organisation' => $org, 'email' => $email, 'phone' => $clean($_POST['phone'] ?? '', 60),
    'message' => $message, 'details' => $extra, 'page' => $clean($_POST['page'] ?? '', 200),
];
$line = json_encode($record, JSON_UNESCAPED_UNICODE) . "\n";
$file = $dir . '/' . date('Y-m') . '.jsonl';
if (@file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) out(500, ['ok' => false, 'errors' => ['_' => 'We could not store your enquiry.']]);

// Optional email notification (does not affect the success response).
if (!empty($cfg['notify_email'])) {
    $subject = '[IMS enquiry ' . $ref . '] ' . $record['topic_label'];
    $body = '';
    foreach ($record as $k => $v) $body .= $k . ': ' . (is_array($v) ? json_encode($v, JSON_UNESCAPED_UNICODE) : $v) . "\n";
    $headers = 'Content-Type: text/plain; charset=utf-8' . (!empty($cfg['from_email']) ? "\r\nFrom: " . $cfg['from_email'] : '') . "\r\nReply-To: " . $email;
    @mail($cfg['notify_email'], $subject, $body, $headers);
}

out(200, ['ok' => true, 'reference' => $ref]);
