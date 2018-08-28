const puppeteer = require('puppeteer');
const fs = require('fs');
const iconv = require('iconv-lite');
//const delay = require('delay');
//require('dotenv').config(); // .envの値を環境変数にセット.

// ●●var禁。constかlet。 03_02_基本的な文法と記法 51行目付近参照
//varでないと動かない。あるいはconstでは動かない。変更禁止。
var idpw = '';
var idpws = null;
var USER_ID = '';
var PASSWORD = '';

// ●● 07_01_ログインとパスワード管理 参照
//外部ファイルからID,Passswordを読み込み。環境変数の方法が不明なので削除不可。
fs.readFile('../../libraryIDPW.txt', (error, idpw) => {
  if (error) {
      console.log('ファイル読み込みエラーです.');
      console.log(error);
      return;
  }
  console.log('読み込んだファイルの内容を表示します↓');
  console.log(idpw.toString());
  idpws = idpw.toString().split('/');
  console.log(idpws);
  USER_ID = idpws[0];
  PASSWORD = idpws[1];

 if (idpws==null) {
   console.log('null');
   return;
 }
console.log(USER_ID);
console.log(PASSWORD);
return;
});

/*
// 環境変数から値を取得する.
// ここでは、MINATO_CITY_LIBRARY_USER_ID, MINATO_CITY_LIBRARY_PASSWORD の2値をそれぞれ取得している.
const USER_ID = process.env.MINATO_CITY_LIBRARY_USER_ID;
const PASSWORD = process.env.MINATO_CITY_LIBRARY_PASSWORD;
*/
//console.log(USER_ID);
//console.log(PASSWORD);

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

  // トップページに遷移する.
  await page.goto('http://www.lib.city.minato.tokyo.jp/j/index.cgi');

  // ログインボタンをクリック.
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('.submit input'),
    // page.click('input[name="refstart"]'), // どっちでもいける
  ]);

  //  ログイン認証ページ
  await page.type('#usrcardnumber', USER_ID.toString());
  await page.type('#password', PASSWORD.toString());
  await page.click('input[value="ログイン"]');

  // id="newbook" の要素の表示を待つ.
  await page.waitFor('#easyS');
  //  ボタンをクリック
  await page.click('#easyS');

  // id="SearchKWInput" の要素の表示を待つ.要素を待つ
  await page.waitFor('#SearchKWInput');
  await page.type('#SearchKWInput', '美崎薫');

  //  ボタン表示を待つ。
  await page.waitFor('#schButton');
  //  ボタンをクリック
  await page.click('#schButton');

  // await page.waitFor('#godetail');
  await delay(1000); // スクレイピングする際にはアクセス間隔を1秒あける.

  // 一番上に表示している書籍のリンクをクリック.
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('doc01.div.a'),
  ]);

  // ブラウザを終了.
  // await browser.close();
})();
