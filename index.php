<!DOCTYPE html>
<html lang="hu">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Szerelvénybolt teszt feladat</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main class="page">
      <header class="header">
        <h1>Fűtés és klíma ajánlatok</h1>
        <p class="subtitle">
          Reszponzív termékkártyák dinamikus backend adatokkal.
        </p>
      </header>

      <section class="tools">
        <button id="exportXmlBtn" class="export-btn" type="button">
          Készleten lévő termékek exportálása XML-be
        </button>
      </section>

      <section id="productGrid" class="grid" aria-live="polite"></section>
      <p id="message" class="message"></p>
    </main>

    <script src="script.js"></script>
  </body>
</html>
