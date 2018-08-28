const puppeteer = require('puppeteer');
// dotenvをrequireすると同時にconfig()を呼び出し、実行時の環境変数に.envの設定内容をセットする.
require('dotenv').config();

// 環境変数より値を取得する.
// ここでは、MY_USER_ID, MY_PASSWORD の2値をそれぞれ取得している.
const USER_ID = process.env.MY_USER_ID;
const PASSWORD = process.env.MY_PASSWORD;

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

  // viewportの設定.
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  // Twitterのログインページへ遷移.
  await page.goto('https://twitter.com/login');

  // ユーザーIDを入力する.
  await page.type('input.js-username-field', 'userid');
  // パスワードを入力する.
  //  await page.type('input.js-password-field', 'test');
  await page.type('//*[@id="page-container"]/div/div[1]/form/fieldset/div[2]/input', 'test');
  await page.$x.type('//*[@id="page-container"]/div/div[1]/form/fieldset/div[2]/input', 'test');

  // ログインボタンをクリックする.
  await page.click('button[type="submit"]');

  // ブラウザの終了. (結果を確認しやすくするためにコメントアウトしてあります)
  // await browser.close();
})();
