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
  await page.goto('http://www.google.co.jp/');

  // 検索窓のテキストボックスに「Puppeteer API」を入力
  await page.type('input[name=q]', 'Puppeteer API');

  // フォーカスを検索ボタンに移動
  await page.focus('input[name=btnK]');

  // 検索ボタンをクリック
  await page.click('input[name=btnK]');

  // ブラウザを終了する (動作を見るためにコメントアウトし終了しないようにしています)
  //await browser.close();
})();
