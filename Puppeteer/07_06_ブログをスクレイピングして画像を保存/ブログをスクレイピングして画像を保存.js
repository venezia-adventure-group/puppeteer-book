const puppeteer = require('puppeteer');
const path = require('path');
const request = require('request');
const { promisify } = require('util');
const fs = require('fs');
const delay = require('delay');

/**
 * ファイルのダウンロードを行う.
 * @param {string} url - ダウンロードするファイルのURL
 */
const downloadFile = async (url) => {
  // ダウンロードファイル名の確定.
  const filename = url.split('/').pop();
  // ファイルの取得.
  const res = await promisify(request)({ method: 'GET', uri: url, encoding: null });
  // 成功(200)したかどうか？
  if (res.statusCode === 200) {
    // 成功していればjsと同じフォルダーにファイル出力
    await promisify(fs.writeFile)(path.join(__dirname, filename), res.body, 'binary');
  } else {
    // 失敗した場合はエラー処理.
    throw new Error(`${res.statusCode} ダウンロードエラー`);
  }
};

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

  // ページの遷移.
  console.log('----------------------------------------goto');
  await page.goto('http://ryoichi0102.hatenablog.com/');

  // await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.

  // 先頭の記事のurlを取得し、そのurlへ遷移.
  console.log('----------------------------------------goto');
  const firstPage = await page.evaluate(() => document.querySelector('#main article:nth-child(1) h1.entry-title a').href);
  // const firstPage = 'http://ryoichi0102.hatenablog.com/entry/2013/06/28/131913';
  await page.goto(firstPage);

  // await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.

  // 各記事に対してのそれぞれの処理.
  do {
    console.log('----------------------------------------do');

    const imageUrls = await page.evaluate(() => Array.from(document.querySelectorAll('img.hatena-fotolife')).map(img => img.src));
    for (url of imageUrls) {
      console.log(`Downloading... ${url}`);
      await downloadFile(url);
    }

    console.log('----------------------------------------eval next');
    // 最後の記事までたどると次へボタンは表示されないので、その場合はループを抜ける.
    const next = await page.evaluate(() => document.querySelector('a[rel="next"]'));
    if (next === null) {
      break;
    }

    // 次のページを読み込む.
    console.log('----------------------------------------next');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.click('a[rel="next"]'),
    ]);

    await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.
  } while (true);

  // ブラウザの終了.
  console.log('----------------------------------------close');
  await browser.close();
})();
