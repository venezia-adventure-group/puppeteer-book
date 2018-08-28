const puppeteer = require('puppeteer');

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

  // 全日本空輸のWebページにアクセス
  await page.goto('https://www.ana.co.jp/');

  // 航空券の「片道」ラジオボタンを選択
  await page.evaluate(() => {
    document.querySelector('#m_ticket02').checked = true;
  });

  // ブラウザを終了させない.
  //await browser.close();
})();
