const puppeteer = require('puppeteer');

const checkAllVegetableScript = `
  const vegetables = document.querySelectorAll('[name="vegetable[]"]');
  vegetables.forEach(vegetable => {
    vegetable.checked = true;
    vegetable.parentNode.className = 'cbxbd c_on';
  });
`;

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

  // キューピー3分クッキングの検索オプションのWebページにアクセス
  await page.goto('http://3min.ntv.co.jp/3min/search_option/');

  // 野菜のチェックボックスすべてにチェックを入れる
  await page.addScriptTag({ content: checkAllVegetableScript });

  // ブラウザの終了. (結果を確認しやすくするためにコメントアウトしてあります)
  // await browser.close();
})();
