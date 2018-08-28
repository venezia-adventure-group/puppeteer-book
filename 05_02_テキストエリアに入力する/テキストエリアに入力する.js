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

  // googleのWebページにアクセス
  await page.goto('https://connpass.com/');
  // 検索窓のテキストエリアに「Puppeteer」を入力
  await page.type('textarea[name=feedback]', 'テキストエリアへの入力サンプルです。');


  // ブラウザを終了させない.
  //await browser.close();
})();
