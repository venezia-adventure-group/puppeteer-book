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

  // 気象庁天気予報のWebページにアクセス
  await page.goto('http://www.jma.go.jp/jp/yoho/');

  // 地方のセレクトボックスから「関東地方」を選択
  await page.select('select[name=elarealist]', '206');

  // ブラウザを終了させない.
  //await browser.close();
})();
