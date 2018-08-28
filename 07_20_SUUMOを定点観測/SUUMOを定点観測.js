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
  await page.setViewport({ width: 1200, height: 800 });

  // suumoを開く.
  await page.goto('https://suumo.jp/ms/chuko/tokyo/city/');
  // await page.waitForNavigation({ waitUntil: 'load' }),

  // 港区
  await page.click('#sa01_sc103');

  // 4,000万円以下
  await page.select('select[name=kt]', '4000');

  // 駅から3分
  await page.click('#et3');

  // 角部屋
  await page.click('#jc047');

  // 南向き
  await page.click('#mh151');

  // ブラウザの終了.
  // await browser.close();
})();
