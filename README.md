# Szerelvénybolt teszt feladat

Egyszerű, reszponzív terméklista oldal PHP backenddel és natív JavaScript frontenddel.
A termékek `JSON` fájlból érkeznek, a felületen kártyás nézetben jelennek meg, és a készleten lévő termékek XML-be exportálhatók.

## Funkciók

- Reszponzív termékrács
- Készlet állapot szerinti badge és gomb
- A műveletek visszajelzése (toast üzenetben oldottam meg, mivel erre nem tért ki a feladat leírás)
- Készleten lévő termékek exportja XML fájlba (`export.php`)

## Projekt fájlok

- `index.php` - fő oldal és markup
- `styles.css` - megjelenés és animációk
- `script.js` - termékek betöltése, renderelés, eseménykezelés, toast
- `products.php` - termék API (`products.json` kiszolgálása)
- `products.json` - minta termékadatok
- `export.php` - készleten lévő termékek XML exportja

## Futtatás

### Előfeltétel

- Telepített PHP (8.x ajánlott)

Ellenőrzés:

```bash
php -v
```

### Indítás lokálisan

1. Nyiss egy terminált a projekt gyökerében.
2. Indítsd el a beépített PHP szervert:

```bash
php -S localhost:8000
```

1. Nyisd meg böngészőben:

[http://localhost:8000](http://localhost:8000)

## API és export végpontok

- Termékek JSON: [http://localhost:8000/products.php](http://localhost:8000/products.php)
- XML export: [http://localhost:8000/export.php](http://localhost:8000/export.php)

## Megjegyzés

Ha a `products.json` hiányzik vagy hibás formátumú, a backend hibaüzenetet ad vissza.