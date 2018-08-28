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


  const from = '田町(東京都)[たまち]';
  const to = '海老名';
  const url = 'http://www.ekikara.jp/';

  // 1分ごとに繰り返す
  do {
    await page.goto(url);

    // Fromに入力する.
    await page.type('input[name="intext"]', from);
    // Toに入力する.
    await page.type('input[name="outtext"]', to);
    // 検索を押す。
    await page.click('input[name="search"]');

    // 表示を待つ
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      // page.waitFor('#incode');
      page.select('select[name=incode]', '13103041'),
      // 検索を押す。
      page.click('input[name="search"]'),
      // page.click('.submit input'),
    ]);

    // 1分待つ. (ミリ秒指定のため 1000ミリ秒 × 60 で 1分)
    await delay(1000 * 60);
  } while (true);
  // 繰り返しここまで。

  // ブラウザを終了.
  // await browser.close();
})();
