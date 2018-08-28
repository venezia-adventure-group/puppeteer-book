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

  console.log('----------------------------------------goto');
  await page.goto('https://www.yahoo.co.jp/');

  await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.

  console.log('----------------------------------------wait and click');
  await Promise.all([ // 次の処理たちを同時に呼び出す.
    page.waitForNavigation({ waitUntil: 'load' }), // ページ遷移を待つ.
    page.click('#topicsfb .topicsindex ul.emphasis li:nth-child(1) a'), // リンクをクリック.
  ]);

  console.log('----------------------------------------evaluate');
  const h2Title = await page.evaluate(() => document.querySelector('h2.newsTitle').textContent);
  console.log(h2Title);

  console.log('----------------------------------------close');
  // ブラウザの終了.
  await browser.close();
})();
