const puppeteer = require('puppeteer');
const path = require('path');
const delay = require('delay');

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

  // ページへ遷移.
  await page.goto('https://free.filesend.to/fileup_free2');

  // ファイルアップロードボタンの要素を取得し、その要素のidを保持する.
  const inputTypeFile = await page.$('input[type="file"]');

  // ファイルアップロードを実行.
  await inputTypeFile.uploadFile(
//    path.relative(process.cwd(), path.join(__dirname, '宅ふぁいる便に送る.md')));
    path.relative(process.cwd(), path.join(__dirname, '初稿戻し.zip')));

  console.log('----------------------------------------利用規約チェック');
  // 注意
  // 宅ファイル便の利用規約 https://www.filesend.to/information/infouse.html
  // 利用規約 (著作権侵害や違法なファイル等ではありません) を自動でクリックしています。
  // コードを実装する際にはご自身で理解のうえ利用してください。
  await page.click('#safefilechk');

  console.log('----------------------------------------アップロード内容を確認する');
  await page.click('#uploadbtn a');

  console.log('----------------------------------------ダイアログ表示待ち');
  // 非表示要素はwatForSelectorでは見つかってすぐ抜けるのに、非表示要素のclickはできない。
  // page.waitForSelector('img[alt="ファイルを送る"]');
  // 2秒待つ.
  await delay(2000);

  console.log('----------------------------------------ファイルをアップロードする');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('img[alt="ファイルを送る"]'),
  ]);

  console.log('----------------------------------------ダウンロードURLを取得');
  const url = await page.evaluate(() => document.querySelector('#input_dl_url').value);

  console.log(url);

  // ブラウザの終了.
//  await browser.close();
})();
