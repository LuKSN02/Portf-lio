/*
  Tira os prints dos 3 projetos e salva em ../images/ com os nomes que o site espera.

  Como usar (precisa do Node.js instalado), dentro da pasta do portfólio:
    npm init -y
    npm i playwright
    npx playwright install chromium
    node tools/capture-prints.js

  Depois é só publicar de novo. O site passa a mostrar os prints no lugar do placeholder.
*/
const { chromium } = require('playwright');
const path = require('path');

const projects = [
  ['ficha',     'https://luksn02.github.io/F.I.C.H.A./index.html'],
  ['gkio',      'https://luksn02.github.io/G.K.IO/'],
  ['nexus',     'https://luksn02.github.io/Nexus-Arena/'],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const [name, url] of projects) {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2500); // deixa animações de entrada terminarem
      const file = path.join(__dirname, '..', 'images', name + '.jpg');
      await page.screenshot({ path: file, type: 'jpeg', quality: 82 });
      console.log('ok   ', name);
    } catch (e) {
      console.log('falhou', name, '-', e.message);
    }
  }
  await browser.close();
})();
