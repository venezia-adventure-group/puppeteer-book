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

  // 秀和システムのトップページへ遷移.
  await page.goto('http://www.shuwasystem.co.jp/');

  // id="newbook" の配下の img タグを取得する.
  const newbookImages = await page.$$('#newbook img');

  // 取得した各imgタグへの処理.
  for (imgTag of newbookImages) {
    // 取得したタグのsrc属性を取得する. (取得した属性は JSHandle というオブジェクトで取得できる.)
    const prop = await imgTag.getProperty('src');
    // JSHandleオブジェクトの内容をjsonValueで取り出す. (この場合は文字列がsrcに指定しているurlを取得できる.)
    const src = await prop.jsonValue();
    // 結果を出力.
    console.log(src);
  }

  // ブラウザの終了.
  await browser.close();
})();
