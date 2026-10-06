<?php
/**
 * Kazo Glass & Door™ - Consultation Inquiry Mailer (PHP SMTP)
 * Compatible with Hostinger Single Web Hosting (Shared Apache / LiteSpeed)
 */

// Enable CORS and define JSON response header
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Please use POST.'
    ]);
    exit;
}

/**
 * Helper to fetch configuration from environment, .env file, or fallback
 */
function getEnvConfig($key, $default = '') {
    $val = getenv($key);
    if ($val !== false && trim($val) !== '') {
        return trim($val);
    }
    if (!empty($_ENV[$key])) {
        return trim($_ENV[$key]);
    }
    if (!empty($_SERVER[$key])) {
        return trim($_SERVER[$key]);
    }

    $envFiles = [
        __DIR__ . '/.env',
        __DIR__ . '/../.env',
        dirname(__DIR__, 2) . '/.env'
    ];

    foreach ($envFiles as $envFile) {
        if (file_exists($envFile) && is_readable($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || strpos($line, '#') === 0) continue;
                if (strpos($line, '=') !== false) {
                    list($k, $v) = explode('=', $line, 2);
                    $k = trim($k);
                    $v = trim($v, " \t\n\r\0\x0B\"'");
                    if ($k === $key && $v !== '') {
                        return $v;
                    }
                }
            }
        }
    }

    return $default;
}

// SMTP Configuration
// For Gmail SMTP, port 587 with STARTTLS or port 465 with SSL
$smtpHost  = getEnvConfig('SMTP_HOST', 'smtp.gmail.com');
$smtpPort  = (int) getEnvConfig('SMTP_PORT', '587');
$emailUser = getEnvConfig('EMAIL_USER', 'kazoglassndoor@gmail.com');
$emailPass = preg_replace('/[\s\'"]+/', '', getEnvConfig('EMAIL_PASS', 'vwzbkpbnrldnpnqh'));
$emailTo   = getEnvConfig('EMAIL_TO', 'kazoglassndoor@gmail.com');

// Validate credentials
if (empty($emailPass)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Email server credentials are not configured. Please set EMAIL_PASS in your .env or send-email.php.'
    ]);
    exit;
}

// Parse input payload
$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);
if (!is_array($payload)) {
    $payload = $_POST;
}

$fullName   = trim($payload['fullName'] ?? '');
$phone      = trim($payload['phone'] ?? '');
$email      = trim($payload['email'] ?? '');
$location   = trim($payload['location'] ?? '');
$typology   = trim($payload['typology'] ?? 'Not specified');
$investment = trim($payload['investment'] ?? 'Not specified');
$message    = trim($payload['message'] ?? '');
$images     = $payload['images'] ?? [];

// Validate required fields
if (empty($fullName)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Full Name is required.']);
    exit;
}

if (empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Phone Number is required.']);
    exit;
}

// Load PHPMailer
$phpMailerDir = __DIR__ . '/PHPMailer';
if (!file_exists($phpMailerDir . '/PHPMailer.php')) {
    $phpMailerDir = dirname(__DIR__) . '/PHPMailer';
}

if (!file_exists($phpMailerDir . '/PHPMailer.php')) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'PHPMailer library not found on server. Please ensure the PHPMailer directory is present.'
    ]);
    exit;
}

require_once $phpMailerDir . '/Exception.php';
require_once $phpMailerDir . '/PHPMailer.php';
require_once $phpMailerDir . '/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // Server configuration
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $emailUser;
    $mail->Password   = $emailPass;
    $mail->CharSet    = 'UTF-8';

    // Port & Encryption settings
    if ($smtpPort === 465) {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $smtpPort ?: 587;
    }

    // Shared hosting SSL certificate compatibility
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ];

    // Recipients
    $mail->setFrom($emailUser, 'Kazo Glass & Door');
    $mail->addAddress($emailTo);
    if (!empty($email)) {
        $mail->addReplyTo($email, $fullName);
    } else {
        $mail->addReplyTo($emailUser, 'Kazo Glass & Door');
    }

    // Attachments (up to 5 base64 images)
    $attachedCount = 0;
    if (is_array($images) && count($images) > 0) {
        foreach (array_slice($images, 0, 5) as $idx => $img) {
            if (!empty($img['data'])) {
                $rawBase64 = $img['data'];
                if (strpos($rawBase64, 'base64,') !== false) {
                    $parts = explode('base64,', $rawBase64);
                    $rawBase64 = $parts[1];
                }
                $decoded = base64_decode($rawBase64);
                if ($decoded !== false) {
                    $filename = !empty($img['name']) ? $img['name'] : ('attachment_' . ($idx + 1) . '.jpg');
                    $fileType = !empty($img['type']) ? $img['type'] : 'image/jpeg';
                    $mail->addStringAttachment($decoded, $filename, 'base64', $fileType);
                    $attachedCount++;
                }
            }
        }
    }

    // Format safe variables for HTML
    $safeFullName   = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $safePhone      = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $safeEmail      = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safeLocation   = htmlspecialchars($location, ENT_QUOTES, 'UTF-8');
    $safeTypology   = htmlspecialchars($typology, ENT_QUOTES, 'UTF-8');
    $safeInvestment = htmlspecialchars($investment, ENT_QUOTES, 'UTF-8');
    $safeMessage    = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
    $phoneDigits    = preg_replace('/[^0-9]/', '', $phone);
    $waText         = rawurlencode("Hi {$fullName}, thank you for contacting Kazo Glass & Door regarding your {$typology} project.");

    $emailDisplay = !empty($email)
        ? "<a href='mailto:{$safeEmail}' style='color: #b8860b;'>{$safeEmail}</a>"
        : "<span style='color: #888;'>Not provided</span>";

    $locationDisplay = !empty($location)
        ? $safeLocation
        : "<span style='color: #888;'>Not provided</span>";

    $attachmentsBadge = ($attachedCount > 0)
        ? "<span class='badge'>{$attachedCount} Image(s) Attached</span> (See attachments below)"
        : "<span style='color: #888;'>No images attached</span>";

    $messageDisplay = !empty($message)
        ? $safeMessage
        : "No additional project brief was entered.";

    // Premium HTML Email Template
    $htmlContent = <<<HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7; color: #222; margin: 0; padding: 20px; }
      .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5; }
      .header { background: #0c0c0c; padding: 28px 24px; text-align: center; border-bottom: 3px solid #e8b95d; }
      .brand { color: #ffffff; font-size: 20px; letter-spacing: 2px; font-weight: 700; margin: 0; text-transform: uppercase; }
      .sub-brand { color: #e8b95d; font-size: 11px; letter-spacing: 1.5px; margin-top: 4px; text-transform: uppercase; }
      .content { padding: 28px 24px; }
      .title { font-size: 18px; font-weight: 700; color: #111; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      th { text-align: left; padding: 10px 12px; background: #fbfbfb; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 35%; border-bottom: 1px solid #eee; }
      td { padding: 10px 12px; font-size: 13px; color: #111; border-bottom: 1px solid #eee; }
      .highlight { color: #b8860b; font-weight: 600; }
      .message-box { background: #f9f9f9; border-left: 3px solid #e8b95d; padding: 14px 16px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #333; margin-top: 8px; }
      .badge { display: inline-block; background: #e8b95d; color: #000; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 4px; }
      .footer { background: #f3f3f3; padding: 16px 24px; font-size: 11px; color: #777; text-align: center; border-top: 1px solid #eee; }
      .cta-btn { display: inline-block; background: #25D366; color: #fff !important; text-decoration: none; padding: 10px 18px; font-size: 12px; font-weight: bold; border-radius: 4px; margin-top: 10px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="brand">Kazo Glass & Door™</h1>
        <div class="sub-brand">New Architectural Project Inquiry</div>
      </div>
      <div class="content">
        <div class="title">Lead Details</div>
        <table>
          <tr>
            <th>Client Full Name</th>
            <td><strong>{$safeFullName}</strong></td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>
              <a href="tel:{$safePhone}" style="color: #111; text-decoration: none; font-weight: 600;">
                {$safePhone}
              </a>
            </td>
          </tr>
          <tr>
            <th>Email Address</th>
            <td>{$emailDisplay}</td>
          </tr>
          <tr>
            <th>Project Location</th>
            <td>{$locationDisplay}</td>
          </tr>
          <tr>
            <th>Product / Category</th>
            <td class="highlight">{$safeTypology}</td>
          </tr>
          <tr>
            <th>Estimated Budget</th>
            <td>{$safeInvestment}</td>
          </tr>
          <tr>
            <th>Attached Images</th>
            <td>{$attachmentsBadge}</td>
          </tr>
        </table>

        <div style="margin-top: 16px;">
          <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #666; letter-spacing: 1px;">
            Project Brief / Notes:
          </div>
          <div class="message-box">
            {$messageDisplay}
          </div>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <a class="cta-btn" href="https://wa.me/{$phoneDigits}?text={$waText}">
            Chat with Client on WhatsApp
          </a>
        </div>
      </div>
      <div class="footer">
        This lead was submitted through the consultation form on Kazo Glass & Door.
      </div>
    </div>
  </body>
</html>
HTML;

    // Plain text alternative
    $textContent = <<<TEXT
NEW PROJECT INQUIRY - KAZO GLASS & DOOR
=======================================
Full Name: {$fullName}
Phone Number: {$phone}
Email Address: {$email}
Location: {$location}
Looking For: {$typology}
Budget Range: {$investment}
Attachments: {$attachedCount} image(s) attached

Project Brief:
{$message}
TEXT;

    // Send email
    $mail->isHTML(true);
    $mail->Subject = "New Project Inquiry: {$fullName} ({$phone}) - {$typology}";
    $mail->Body    = $htmlContent;
    $mail->AltBody = $textContent;

    $mail->send();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Inquiry successfully sent with attachments.',
        'attachmentsCount' => $attachedCount
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $mail->ErrorInfo ?: $e->getMessage()
    ]);
}
