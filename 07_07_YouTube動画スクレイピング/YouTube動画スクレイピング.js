//■Youtube Download自動化 node.exe .\07_07_YouTube動画スクレイピング\youtubedownloader.js
'use strict';

const fs = require('fs');
const iconv = require('iconv-lite');
const path = require('path');

/**
 * Get url from YouTube search result.
 *
 * @param {object} page Puppeteer page object.
 * @param {string} query Search query.
 * @see https://qiita.com/go_sagawa/items/85f97deab7ccfdce53ea
 */
async function searchYoutubeUrl(page, query) {
  await page.goto(`https://www.youtube.com/results?search_query=${query}`);
  await page.waitForSelector('#video-title');
  return page.evaluate((selector) => {
    return document.querySelector(selector).href;
  }, '#video-title');
}

async function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

const puppeteer = require('puppeteer');
let keyword = 'Lemon';
(async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });    
    const page = await browser.newPage();    
    const targeturl = await searchYoutubeUrl(page, keyword);
    console.log(targeturl);


    let filepath = path.join(__dirname, 'data.txt');
    //fs.unlinkSync(filepath, function(error){});
  
    fs.writeFile(filepath, targeturl, (error) => {
      console.log(error);
      if (error) {
        console.log('ファイル書き込みエラーです.');
      } else {
        console.log('ファイルに書き込みました.');
      }
    });
    


    /*
    await page.goto('https://thxyoutube.com/watch/');
    await page.type('#videourlinput', targeturl);
    await page.click('#videourlsubmit');
  
    await page.waitForSelector('.downloadbox');
    await page.click('.downloadbox');
  
    await page.screenshot({path: 'example.png'});
    */
    //await page.screenshot({path: 'watch.png', fullPage: true});
    //await page.screenshot({path: 'C:/Users/misaki_kaoru/Desktop/example2.png'});
    await browser.close();
  }
)();