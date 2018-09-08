const puppeteer = require('puppeteer');
const stringify = require('csv-stringify');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');

/**
 * メインロジック.
 */
(async () => {
  // 引数のチェック.
  if (process.argv.length < 3) {
    console.log('引数に住所を指定してください.');
    return;
  }

  // 取得対象の住所をセット.
  const targetAddress = process.argv[2]; // '大阪府大阪市北区曽根崎新地2丁目6番30号';

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

  // 該当ページへ遷移する.
  await page.goto('https://weather.yahoo.co.jp/weather/');

  await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.

  // テキストボックスに住所を入力.
  await page.type('#searchText', targetAddress);

  // 検索ボタンをクリック.
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('#yjw_button_search'),
  ]);

  await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.

  // 一番上に表示している住所のリンクをクリック.
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('table.yjw_table3 tr td a'),
  ]);

  await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.

  // 明日の12時の天気を取得.
  const weather = await page.evaluate(() => document.querySelector('#yjw_pinpoint_tomorrow table.yjw_table2 tr:nth-child(2) td:nth-child(6) small').textContent);

  // 結果を表示する.
  console.log(`${targetAddress}の明日12時の天気は${weather}です.`);

  // ----------------------------------------
  // ここからはCSVに出力する処理. CSV出力が不要であれば削除してよい.
  const weathers = [];
  weathers.push(['住所', '天気']);
  weathers.push([targetAddress, weather]);

  // weathersを文字列化する.
  stringify(weathers, (err, weatherString) => {
    // ファイルシステムに対してファイル名を指定し、ファイルストリームを生成する.
    const writableStream = fs.createWriteStream(path.join(__dirname, 'weather.csv'));
    // weatherStringをShift_JISで書き出す.
    writableStream.write(iconv.encode(weatherString, 'Shift_JIS'));
  });
  // ここまで.
  // ----------------------------------------

  // ブラウザの終了.
  await browser.close();
})();
