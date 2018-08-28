const puppeteer = require('puppeteer');
const converter = require('convert-filename-ja');
const path = require('path');
const delay = require('delay');

/**
 * メインロジック.
 */
(async () => {
  // Puppeteerの起動.
  const browser = await puppeteer.launch({
    headless: true, // true: Headlessモードで起動する.
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

  await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.

  // 先頭の記事のurlを取得し、そのurlへ遷移.
  console.log('----------------------------------------goto');
  const firstPage = await page.evaluate(() => document.querySelector('#main article:nth-child(1) h1.entry-title a').href);
  // const firstPage = 'http://ryoichi0102.hatenablog.com/entry/2013/06/28/131913';
  await page.goto(firstPage);

  await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.

  // 各記事に対してのそれぞれの処理.
  do {
    console.log('----------------------------------------do');

    // 投稿日を取得.
    const entryDate = await page.evaluate(() => document.querySelector('.entry-date').textContent.trim());
    // 投稿タイトルを取得.
    const titleText = await page.evaluate(() => document.querySelector('h1.entry-title').textContent.trim());
    // ファイル名として保存できるよう変換.
    const filename = converter.convert(`${entryDate}-${titleText}`);
    console.log(filename);

    // 保存先のパス/ファイル名を保持し、pdfに保存.
    const filepath = path.join(__dirname, filename);
    // await page.screenshot({ path: `${filepath}.png` });
    await page.pdf({ path: `${filepath}.pdf`, format: 'A4' });

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
