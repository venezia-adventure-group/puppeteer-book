const puppeteer = require('puppeteer');
const stringify = require('csv-stringify');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');
const delay = require('delay');

const getInfoFromChildPage = async (browser, url) => {
  const childPage = await browser.newPage();
  await childPage.goto(url);
  const h1Title = await childPage.evaluate(() => document.querySelector('h1.syoseki').textContent);
  const result = await childPage.evaluate(() => Array.from(document.querySelectorAll('.norm td')).map(td => td.textContent));
  await childPage.close();
  result.unshift(h1Title);
  return result;
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

  // 一覧ページである 新刊案内 ページを開く.
  await page.goto('http://www.shuwasystem.co.jp/newbook.html');

  // 新刊案内の各ページへのリンク先を取得.
  const results = await page.evaluate(() => Array.from(document.querySelectorAll('#sinkan dt a')).map(a => a.href));

  // それぞれの新刊の詳細情報ページの情報を取得する.

  const csvData = []; // CSVに保存するための情報を保持する.
  for (const result of results) {
    await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.
    // console.log(result);
    const texts = await getInfoFromChildPage(browser, result);
    csvData.push(texts);
  }

  // この実装だと同時多発的なアクセスとなり、相手先のサーバーに負荷がかかりすぎるため推奨しない.
  // const csvData = await Promise.all(results.map(m => getInfoFromChildPage(browser, m)));

  // ここからはCSVに出力するためだけの処理.
  // csvDataを文字列化する.
  stringify(csvData, (error, csvString) => {
    // ファイルシステムに対してファイル名を指定し、ファイルストリームを生成する.
    const writableStream = fs.createWriteStream(path.join(__dirname, '秀和システム新刊案内.csv'));
    // csvStringをShift_JISで書き出す.
    writableStream.write(iconv.encode(csvString, 'Shift_JIS'));
  });

  // ブラウザの終了.
  await browser.close();
})();
