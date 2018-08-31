const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const request = require('request');
const { promisify } = require('util');

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
    console.log(filename + " is fail.");
    throw new Error(`${res.statusCode} ダウンロードエラー`);
  }
};

const saveImgInChildpage = async (browser, url) => {
  const childPage = await browser.newPage();
  await childPage.goto(url);
  console.log('evaluate');
  const src = await childPage.evaluate(() => document.querySelector('#irc_cc > div:nth-child(2) > div.irc_t.i30052 > div.irc_mic > div.irc_mimg.irc_hic > a > img').src);
  console.log(`Download ${src}`);
  if (src) {
    await downloadFile(src);
  }
  await childPage.close();
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
    // width: 1200,
    // height: 800,
    width: 3000,
    height: 2000,
  });

  await page.goto('http://www.google.co.jp/imghp');
  // 検索窓のテキストボックスに「鶴田謙二」を入力
  await page.type('input[name=q]', '鶴田謙二');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    // page.click('input[value="検索"]'),
    page.click('#mKlEF'),
  ]);

  // リンク一覧
  const aTagHrefs = await page.evaluate(() => Array.from(document.querySelectorAll('.rg_l')).map(a => a.href));
  for (const href of aTagHrefs) {
    console.log(`for-of ${href}`);
    await saveImgInChildpage(browser, href)
      .catch((e) => console.log(e));
  }

  return;


  for (const aTag of aTags) {
    const href = await aTag.getProperty('href');
    const url = await href.jsonValue();

    // ●●JavaScriptのreplaceは最初の1個だけ。全置換したい。
    // ●● このケースならdecodeURIComponentで十分。もしこのさき必要になったら /g でグローバルキャプチャ. (MDN参照)
    // ●● https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Using_global_and_ignore_with_replace()
    const imageurl = decodeURIComponent(url.split('url=').pop());
    console.log(imageurl);

    // URLで形式で取得できたパスのファイル名部分を取り出す.
      var filename = imageurl.split('/').pop();
      console.log(`filename=${filename}`);
      if (!filename.includes(".jpg"))
          filename = filename + ".jpg";

      const localfilefullpath = path.join(__dirname, filename);
      console.log(`localfilename=${localfilefullpath}`);

      //●●gotoせずにファイルをdownloadしたい。
      //●●1個失敗したら次に行きたい。
      fs.writeFile(localfilefullpath, await viewSource.buffer(), (error) => {
        if (error) {
          console.log(`error=${error}`);
          //return;
        }
        console.log('The file was saved!');
      });
  }

  // ブラウザを終了.
  // await browser.close();

})();
