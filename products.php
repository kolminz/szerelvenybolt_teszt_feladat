<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$filePath = __DIR__ . '/products.json';

if (!file_exists($filePath)) {
    http_response_code(500);
    echo json_encode(['error' => 'A products.json nem található.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$json = file_get_contents($filePath);
$products = json_decode($json, true);

if (!is_array($products)) {
    http_response_code(500);
    echo json_encode(['error' => 'Hibás JSON formátum.'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode($products, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
