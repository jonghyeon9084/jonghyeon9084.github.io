// Run against a local preview; PDF hyperlinks point to the published site.
const { chromium } = require('playwright');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:8767/', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img[src]').forEach(img => { img.loading = 'eager'; });
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img[src]')].map(img => img.decode()));
      document.querySelectorAll('a[href]').forEach(link => {
        link.href = new URL(link.getAttribute('href'), 'https://jonghyeon9084.github.io/').href;
      });
    });
    await page.pdf({
      path: path.join(__dirname, '../assets/Lee-Jonghyeon-Portfolio.pdf'),
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: '<div style="width:100%;text-align:center;font-size:8px;color:#5c6877"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    });
    console.log('Saved assets/Lee-Jonghyeon-Portfolio.pdf');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
