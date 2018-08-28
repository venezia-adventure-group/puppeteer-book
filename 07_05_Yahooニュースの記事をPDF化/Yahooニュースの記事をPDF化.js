const puppeteer = require('puppeteer');
const path = require('path');
const converter = require('convert-filename-ja');
const delay = require('delay');

/**
 * 各ニュース記事のurlをpdf化する.
 * @param {Browser} browser
 * @param {string} url - 各ニュース記事のurl
 */
const createPdfWithChildPage = async (browser, url) => {
  // 新しいタブをひらく.
  const childPage = await browser.newPage();
  // 各ニュース記事のurlへ遷移.
  await childPage.goto(url);
  // [続きを読む] リンクをクリックして、詳細なページを表示する.
  await Promise.all([
    childPage.waitForNavigation({ waitUntil: 'load' }),
    childPage.click('a.newsLink'),
  ]);
  // ファイル名を記事のタイトルとする.
  const titleText = await childPage.evaluate(() => document.querySelector('h1').textContent.trim());
  const filepath = path.join(__dirname, converter.convert(titleText));
  // 保存.
  await childPage.pdf({ path: `${filepath}.pdf`, format: 'A4' });
  // await childPage.screenshot({ path: `${filepath}.png` });
  // 閉じる.
  await childPage.close();
};

/**
 * メインロジック.
 */
(async () => {
  // Puppeteerの起動.
  const browser = await puppeteer.launch({
    headless: true, // Headlessモードで起動するかどうか.
    slowMo: 50, // 指定のミリ秒スローモーションで実行する.
  });

  // 新しい空のページを開く.
  const page = await browser.newPage();

  // view portの設定.
  await page.setViewport({ width: 1200, height: 800 });

  // Yahoo! Japanのトップページを開く.
  await page.goto('https://www.yahoo.co.jp/');

  // 表示している各ニュースのリンク先一覧を取得.
  const results = await page.evaluate(() => Array.from(document.querySelectorAll('#topicsfb .topicsindex ul.emphasis a')).map(a => a.href));

  // それぞれのニュースのページを開く.
  for (const result of results) {
    await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.
    console.log(`取得処理開始 ${result}`);
    await createPdfWithChildPage(browser, result)
      .then(() => {
        console.log('成功');
      }).catch((error) => {
        console.log(`次のurlの取得処理は失敗しました ${url}`);
        console.log(error);
      });
  }

  // この実装だと同時多発的なアクセスとなり、相手先のサーバーに負荷がかかりすぎるため推奨しない.
  // await Promise.all(results.map(m => createPdfWithChildPage(browser, m)));

  // ブラウザの終了.
  await browser.close();
})();
