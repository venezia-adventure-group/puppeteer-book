const puppeteer = require('puppeteer');
const stringify = require('csv-stringify');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');

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

  // 取得対象の銘柄コードをセット.
  const stockCode = 6670;

  // 該当ページへ遷移する.
  await page.goto(`https://www.nikkei.com/nkd/company/?scode=${stockCode}`);

  // 銘柄名の取得.
  const stockName = await page.evaluate(() => document.querySelector('h1.m-headlineLarge_text').textContent);

  // 株価の取得.
  const stockPrice = await page.evaluate(() => document.querySelector('.m-stockPriceElm_value.now').textContent);

  // 結果の出力.
  console.log(`銘柄コード ${stockCode} (${stockName}) の株価は ${stockPrice} です.`);

  // ----------------------------------------
  // ここからはCSVに出力するためだけの処理. CSV出力が不要であれば削除してよい.  const weathers = [];
  const stocks = [];
  stocks.push(['銘柄コード', '銘柄名', '株価']);
  stocks.push([stockCode, stockName, stockPrice]);

  // stocksを文字列化する.
  stringify(stocks, (error, stocksString) => {
    // ファイルシステムに対してファイル名を指定し、ファイルストリームを生成する.
    const writableStream = fs.createWriteStream(path.join(__dirname, 'stock.csv'));
    // stocksStringをShift_JISで書き出す.
    writableStream.write(iconv.encode(stocksString, 'Shift_JIS'));
  });
  // ここまで.
  // ----------------------------------------

  // ブラウザの終了.
  await browser.close();
})();
