<?php
declare(strict_types=1);

$filePath = __DIR__ . '/products.json';

if (!file_exists($filePath)) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'A products.json nem található.';
    exit;
}

$json = file_get_contents($filePath);
$products = json_decode($json, true);

if (!is_array($products)) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Hibás JSON formátum.';
    exit;
}

$inStockProducts = array_filter(
    $products,
    static fn(array $product): bool => isset($product['keszlet']) && (int) $product['keszlet'] > 0
);

$xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><termekek/>');

foreach ($inStockProducts as $product) {
    $termek = $xml->addChild('termek');
    $termek->addChild('nev', htmlspecialchars((string) ($product['nev'] ?? ''), ENT_XML1 | ENT_COMPAT, 'UTF-8'));
    $termek->addChild('ar', (string) ((int) ($product['ar'] ?? 0)));
    $termek->addChild('keszlet', (string) ((int) ($product['keszlet'] ?? 0)));
}

header('Content-Type: application/xml; charset=utf-8');
header('Content-Disposition: attachment; filename="keszleten-levo-termekek.xml"');
echo $xml->asXML();
