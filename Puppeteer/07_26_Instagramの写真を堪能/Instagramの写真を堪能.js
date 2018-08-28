const puppeteer = require('puppeteer');
const delay = require('delay');
require('dotenv').config();

const USERNAME = process.env.INSTAGRAM_USERNAME;
const PASSWORD = process.env.INSTAGRAM_PASSWORD;

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
  await page.goto('https://www.instagram.com/accounts/login');

  await page.type('input[name="username"]', USERNAME);
  await page.type('input[type="password"]', PASSWORD);

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('form button'),
  ]);

  // 1ミリ秒ごとに1ピクセルづつじりじりと下にスクロール.
  do {
    delay(1);
    await page.evaluate(() => window.scrollBy(0, 5));
  } while (true);

  // ブラウザの終了.
  // await browser.close();
})();
