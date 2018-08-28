const fs = require('fs');
const iconv = require('iconv-lite');
const path = require('path');

const content = 'データファイルという想定のテキストファイルです。';

fs.writeFile(path.join(__dirname, 'data.txt'), content, (error) => {
  console.log(error);
  if (error) {
    console.log('ファイル書き込みエラーです.');
  } else {
    console.log('ファイルに書き込みました.');
  }
});

// ----------------------------------------

fs.readFile(path.join(__dirname, 'data.txt'), (error, data) => {
  if (error) {
    console.log('ファイル読み込みエラーです.');
    console.log(error);
    return;
  }
  console.log('読み込んだファイルの内容を表示します↓');
  console.log(data.toString());
});

// ----------------------------------------

fs.writeFile(path.join(__dirname, 'shift-jis.txt'), iconv.encode(content, 'Shift_JIS'), (error) => {
  console.log(error);
  if (error) {
    console.log('ファイル書き込みエラーです.');
  } else {
    console.log('ファイルに書き込みました.');
  }
});

// ----------------------------------------

fs.readFile(path.join(__dirname, 'shift-jis.txt'), (error, data) => {
  if (error) {
    console.log('ファイル読み込みエラーです.');
    console.log(error);
    return;
  }
  console.log('読み込んだファイルの内容を表示します↓');
  const buffer = Buffer.from(data);
  console.log(iconv.decode(buffer, 'Shift_JIS'));
});
