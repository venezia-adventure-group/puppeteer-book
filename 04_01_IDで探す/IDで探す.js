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

  // 秀和システムのページへ遷移.
  await page.goto('http://www.shuwasystem.co.jp/');

  // id="newbook" の要素の表示を待つ.
  await page.waitForSelector('#newbook');

  // 要素の取得.
  const newBook = await page.evaluate((selector) => {
    // evaluateメソッドに渡す第1引数のfunctionは、第2引数として渡したパラメータをselectorに引き継いでブラウザ内で実行する。
    return document.querySelector(selector).innerHTML;
  }, '#newbook');

  console.log(newBook);

  // ブラウザの終了.
  await browser.close();
})();
