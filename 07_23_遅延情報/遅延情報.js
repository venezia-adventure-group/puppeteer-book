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


  const url = 'https://transit.yahoo.co.jp/traininfo/area/4/';

  // 1分ごとに繰り返す
  do {
    await page.goto(url);
    // location.reload();

    // 1分待つ. (ミリ秒指定のため 1000ミリ秒 × 60 で 1分)
    await delay(1000 * 60);
  } while (true);
  // 繰り返しここまで。

  // ブラウザを終了.
  // await browser.close();
})();
