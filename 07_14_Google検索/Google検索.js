//■Google検索 node.exe .\07_14_Google検索\Google検索.js
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

  await page.goto('http://www.google.co.jp/');
  // 検索窓のテキストボックスに「Puppeteer」を入力
  await page.type('input[name=q]', 'Puppeteer');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('input[value="Google 検索"]'),
  ]);

  // リンク一覧
  const aTags = await page.$$('.bkWMgd .g h3 a');

  for (aTag of aTags) {
    const href = await aTag.getProperty('href');
    const url = await href.jsonValue();
    // リンク先のurlにQiitaを含む場合。
    //if (url.indexOf('qiita') !== -1) {
    //if (-1 < url.indexOf('qiita')) {
    //if (0 <= url.indexOf('qiita')) {
    if (url.includes('qiita')) {
      // そのページを表示
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load' }),
        await aTag.click(),
      ]);
      break;
    }
  }

  // ブラウザを終了.
  // await browser.close();
})();
