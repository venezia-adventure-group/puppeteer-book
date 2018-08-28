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

  // Yahoo!のトップページへ遷移し、ロードが完了するまで待つ.
  await page.goto('https://www.yahoo.co.jp/', { waitUntil: 'load' });

  // 検索窓にPuppeteerと入力する.
  await page.type('input[name="p"]', 'Puppeteer');

  // 検索ボタンをクリックする.
  await page.click('#srchbtn');

  // 表示確認のためにブラウザを終了させない = 手動でブラウザを終了させる必要がある。
  // await browser.close();
})();
