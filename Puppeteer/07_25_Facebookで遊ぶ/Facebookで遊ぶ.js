const puppeteer = require('puppeteer');
const fs = require('fs');
const iconv = require('iconv-lite');
const delay = require('delay');

//varでないと動かない。あるいはconstでは動かない。変更禁止。
var idpw = '';
var idpws = null;
var USER_ID = '';
var PASSWORD = '';

// ●● 07_01_ログインとパスワード管理 参照
//外部ファイルからID,Passswordを読み込み。環境変数の方法ほ動作しないので変更削除不可。
fs.readFile('../../FacebookIDPW.txt', (error, idpw) => {
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

    if (idpws == null) {
        console.log('null');
        return;
    }
    console.log(USER_ID);
    console.log(PASSWORD);
    return;
});

/*動作しない
// dotenvをrequireすると同時にconfig()を呼び出し、実行時の環境変数に.envの設定内容をセットする.
require('dotenv').config();

// 環境変数から値を取得する.
// ここでは、MY_USER_ID, MY_PASSWORD の2値をそれぞれ取得している.
const FACEBOOK_ID = process.env.FACEBOOK_ID;
const PASSWORD = process.env.FACEBOOK_PASSWORD;
  console.log(FACEBOOK_ID);
*/

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

    await page.goto('http://www.facebook.com/misakikaoru');

    // ユーザーIDを入力する.
    await page.type('#email', USER_ID);
    console.log(USER_ID);
    // パスワードを入力する.
    await page.type('#pass', PASSWORD);
    console.log(PASSWORD);
    // ログインボタンをクリックする.
    await page.click('#loginbutton');

    //await page.waitForNavigation({ waitUntil: 'load' });


    // 1ミリ秒ごとに1ピクセルづつじりじりと下にスクロール.
    do {
        delay(1);
        await page.evaluate(() => window.scrollBy(0, 1));
    } while (true);



    //await page.click('#js_e');
    //await page.type('#js_e', '本を書いています。');


    // ブラウザを終了.
    //await browser.close();
})();
