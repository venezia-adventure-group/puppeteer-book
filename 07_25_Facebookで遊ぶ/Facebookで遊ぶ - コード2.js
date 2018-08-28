const puppeteer = require('puppeteer');
const delay = require('delay');
require('dotenv').config();

const FB_MAIL = process.env.FACEBOOK_EMAIL;
const FB_PASS = process.env.FACEBOOK_PASS;

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

  await page.goto('https://www.facebook.com/');

  // ユーザーIDを入力する.
  await page.type('#email', FB_MAIL);
  // パスワードを入力する.
  await page.type('#pass', FB_PASS);
  // ログインボタンをクリックする.
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('#loginbutton'),
  ]);

  // 1ミリ秒ごとに1ピクセルづつじりじりと下にスクロール.
  do {
    delay(1);
    await page.evaluate(() => window.scrollBy(0, 1));
  } while (true);

  // ブラウザを終了.
  // await browser.close();
})();
