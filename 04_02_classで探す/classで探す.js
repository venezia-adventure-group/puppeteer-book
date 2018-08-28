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

  // Googleカスタム検索窓 の表示を待つ.
  await page.waitForSelector('#gs_tti50 .gsc-input');

  // Googleカスタム検索窓 に Puppeteer とキーボード入力を行う.
  await page.type('#gs_tti50 .gsc-input', 'Puppeteer');

  // ブラウザの終了. (結果を確認しやすくするためにコメントアウトしてあります)
  // await browser.close();
})();
