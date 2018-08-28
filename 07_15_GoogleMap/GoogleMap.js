const puppeteer = require('puppeteer');

//windowObj.maximize();

/**
 * メインロジック.
 */
(async () => {
      // Puppeteerの起動.
      const browser = await puppeteer.launch({
            headless: false, // Headlessモードで起動するかどうか.
            slowMo: 50, // 指定のミリ秒スローモーションで実行する.
            args:['--start-maximized'],
      });
      


      // 新しい空のページを開く.
      const page = await browser.newPage();

      // view portの設定.
      await page.setViewport({
            width: 3840,
            height: 1920,
      });

      await page.goto('https://map.google.co.jp/');

      await page.screenshot({ path: 'fullpage.png', fullPage: true });


      // ブラウザを終了.
      //await browser.close();
})();
