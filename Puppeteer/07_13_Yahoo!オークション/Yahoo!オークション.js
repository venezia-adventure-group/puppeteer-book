const puppeteer = require('puppeteer');

/**
 * メインロジック.
 */
(async () => {
  // Puppeteerの起動.
  const browser = await puppeteer.launch({
    headless: false, // Headlessモードで起動するかどうか.
    slowMo: 5, // 指定のミリ秒スローモーションで実行する.
  });

  // 新しい空のページを開く.
  const page = await browser.newPage();

  // view portの設定.
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.goto('http://auctions.yahoo.co.jp/');
  // await page.goto('http://auctions.yahoo.co.jp/search?p=%E5%B7%9D%E5%8E%9F%E7%94%B1%E7%BE%8E%E5%AD%90+-%E5%89%8D%E7%95%A5%E3%83%BB%E3%83%9F%E3%83%AB%E3%82%AF%E3%83%8F%E3%82%A6%E3%82%B9+-%E3%81%99%E3%81%8F%E3%82%89%E3%82%93%E3%81%B6%E3%82%8B%E3%82%B2%E3%83%BC%E3%83%A0+-%E6%B0%97%E3%81%BE%E3%81%90%E3%82%8C%E5%9B%9B%E9%8A%83%E5%A3%AB+-%E3%83%89%E3%83%AA%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0+-%E3%82%BD%E3%83%AB%E3%82%B8%E3%83%A3%E3%83%BC%E3%83%9C%E3%83%BC%E3%82%A4+-%E3%83%93%E3%83%87%E3%82%AA+-%E6%98%8E%E7%8F%A0+-%E5%A4%9C%E9%A6%99+-%E3%81%A1%E3%82%83%E3%81%8A+-%E3%81%B1%E3%81%B5+-%E3%82%B7%E3%83%BB%E3%83%A5%E3%83%BB%E3%83%B3%E3%83%BB%E3%82%AB%E3%83%BB%E3%83%B3+-%E3%82%B7%E3%83%A5%E3%83%B3%E3%82%AB%E3%83%B3+-KNOCK+-%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E9%9B%86+-%E3%83%9E%E3%83%B3%E3%82%AC%E6%A7%8B%E6%88%90%E8%A1%93+-25%E6%99%82%E3%81%AE%E3%82%B7%E3%83%B3%E3%83%87%E3%83%AC%E3%83%A9+-%E8%8A%B1%E7%9B%97%E4%BA%BA%E3%81%9F%E3%81%A1%E3%81%AE%E5%A4%9C+-%E8%8A%B1%E3%81%AE%E7%B4%85%E5%A4%A9%E7%8B%97+-%E3%83%9A%E3%83%BC%E3%83%91%E3%83%BC%E3%83%A0%E3%83%BC%E3%83%B3+-%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%B3%E3%82%BF%E3%83%AB+-%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AB%E9%80%A2%E3%81%84%E3%81%9F%E3%81%84+-%E9%81%B8%E9%9B%86+-%E6%84%9B%E8%94%B5%E7%89%88+-%E5%85%89%E3%81%AE%E4%BD%BF%E8%80%85&auccat=&aq=-1&oq=&ei=UTF-8&slider=0&n=50&tab_ex=commerce');
  // 検索窓のテキストボックスに入力
  await page.type('#yschsp', '川原由美子 -前略・ミルクハウス -すくらんぶるゲーム -気まぐれ四銃士 -ドリーミング -ソルジャーボーイ -ビデオ -明珠 -夜香 -ちゃお -ぱふ -シ・ュ・ン・カ・ン -シュンカン -KNOCK -イラスト集 -マンガ構成術 -25時のシンデレラ -花盗人たちの夜 -花の紅天狗 -ペーパームーン -センチメンタル -あなたに逢いたい -選集 -愛蔵版 -光の使者');

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('#acHdSchBtn'),
  ]);

  await page.select('select[name=n]', '100');

  // ブラウザを終了.
  // await browser.close();
})();
