const puppeteer = require('puppeteer');
const path = require('path');

const waitForAllComplete = async (page, count) => {
  let successCount = 0;
  do {
    successCount = await page.evaluate(() => document.querySelectorAll('#filelist .success').length);
  } while (successCount !== count);
};

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
  await page.goto('http://pdfjoiner.com/ja/');

  // ファイルアップロードボタンの要素を取得し、その要素のidを保持する.
  const id = await page.evaluate(() => document.querySelector('input[type="file"]').id);
  const inputTypeFile = await page.$(`#${id}`);

  // ファイルアップロードを実行.
  await inputTypeFile.uploadFile(path.relative(process.cwd(), path.join(__dirname, 'A.pdf')));
  await inputTypeFile.uploadFile(path.relative(process.cwd(), path.join(__dirname, 'B.pdf')));

  // アップロードが完了するまで待つ. (このサイト特有の処理.)
  await waitForAllComplete(page, 2);

  // ダウンロードボタンをクリックする.
  await page.click('#download-all');

  // ブラウザの終了.
  // await browser.close();
})();
