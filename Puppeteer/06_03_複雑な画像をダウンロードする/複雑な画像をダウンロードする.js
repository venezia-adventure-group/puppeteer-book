const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * メインロジック.
 */
(async () => {
  // Puppeteerの起動.
  const browser = await puppeteer.launch({
    headless: false, // Headlessモードで起動するかどうか.
    slowMo: 50, // 指定のミリ秒スローモーションで実行する
  });

  // 新しい空のページを開く.
  const page = await browser.newPage();

  // view portの設定.
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  // 該当ページへ遷移する.
  await page.goto('https://toyokeizai.net/articles/-/196238?page=2');

  const imageid = '#article-body-inner > div > div > img'

  // imgタグの取得. (取得した要素は ElementHandle というオブジェクトで取得できる.)
  const image = await page.$(imageid);
  // 結果の出力.
  console.log(image);

  // 取得したタグのsrc属性を取得する. (取得した属性は JSHandle というオブジェクトで取得できる.)
  const src = await image.getProperty('src');
  // console.log(src);

  // JSHandleオブジェクトの内容をjsonValueで取り出す. (この場合は文字列がsrcに指定しているurlを取得できる.)
  const targetUrl = await src.jsonValue();
  console.log(`targetUrl=${targetUrl}`);

  // URLで形式で取得できたパスのファイル名部分を取り出す.
  const filename = targetUrl.split('/').pop();

  const localfilefullpath = path.join(__dirname, filename);
  console.log(`filename=${filename}`);
  console.log(`localfilename=${localfilefullpath}`);

  const viewSource = await page.goto(targetUrl);
  fs.writeFile(localfilefullpath, await viewSource.buffer(), (error) => {
    if (error) {
      console.log(`error=${error}`);
      return;
    }
    console.log('The file was saved!');
  });

  // ブラウザの終了.
  await browser.close();
})();
