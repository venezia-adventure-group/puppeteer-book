const puppeteer = require('puppeteer');
const path = require('path');
const converter = require('convert-filename-ja');

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

  // 朝日新聞のトップページを開く.
  // await page.goto('https://www.asahi.com/');
  await page.goto('https://www.asahi.com/articles/ASL735WWLL73PIHB01Z.html?iref=comtop_latestnews_02');


  // ファイル名を記事のタイトルとする.
  const titleText = await page.evaluate(() => document.querySelector('h1').textContent.trim());
  const filepath = path.join(__dirname, converter.convert(titleText));
  // 保存.
  await page.pdf({ path: `${filepath}.pdf`, format: 'A4' });

  // ブラウザの終了.
  await browser.close();
})();
