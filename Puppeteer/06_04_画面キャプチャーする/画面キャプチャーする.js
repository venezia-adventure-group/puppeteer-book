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
  await page.goto('http://www.shuwasystem.co.jp/');

  // await page.waitForNavigation({waitUntil:'networkidle2', timeout:5000})
  //            .catch(e => console.log('timeout exceed. proceed to next operation'))
  await page.screenshot({ path: 'fullpage.png', fullPage: true });

  // ブラウザを終了.
  // await browser.close();
})();
