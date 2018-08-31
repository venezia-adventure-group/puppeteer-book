const puppeteer = require('puppeteer');
const delay = require('delay');

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
  await page.setViewport({ width: 1200, height: 800 });

  // トップページを開く.
  const baseurl= 'https://eiga.com/';
  await page.goto(baseurl);
  await page.click('#rot_menu_3');



  await page.type('#h_search_t', '是枝裕和');
  await page.click('#h_search_btn');
  

  let counter=31353;

  do {
    delay(15*1000);
    let newpage = baseurl + 'person/'+ counter;
    console.log(newpage);
    await page.goto(newpage);
    counter++;
    } while (true);


  // ブラウザの終了.
  //await browser.close();
})();
