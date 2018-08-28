const puppeteer = require('puppeteer');
const delay = require('delay');

/**
 * メインロジック.
 */
(async () => {
  // Puppeteerの起動.
  const browser = await puppeteer.launch({
    headless: false, // Headlessモードで起動するかどうか.
    slowMo: 50, // 指定のミリ秒スローモーションで実行する.
  });

  // 新しい空のページを開く.
  const page = await browser.newPage();

  // view portの設定.
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.goto('https://translate.google.co.jp/?hl=ja');

  // 検索窓のテキストエリアに「Puppeteer」を入力
  await page.type('textarea[name=text]', 'Puppeteer');
  await delay(1000);

  const 日本語 = await page.evaluate(() => document.querySelector('span[id=result_box]').textContent);

  console.log(日本語);

  // ブラウザを終了.
  await browser.close();
})();
