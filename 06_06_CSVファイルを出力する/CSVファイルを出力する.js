const stringify = require('csv-stringify');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');

const data = [
  ['祖父', 'ピエトロ・ベヌーチ', '故人'],
  ['父', '伊万里マルコ', '故人'],
  ['母', '伊万里マリ子', 'プログラマー'],
  ['長女', '伊万里マリエル', '探偵'],
  ['次女', '伊万里真鈴(まりん)', 'プロ野球選手'],
  ['3女', '伊万里真理', '中学生'],
]; // CSVに保存する情報

// CSVに出力する処理.
stringify(data, (error, csvString) => {
  // ファイルシステムに対してファイル名を指定し、ファイルストリームを生成する.
  const writableStream = fs.createWriteStream(path.join(__dirname, 'Forget-me-not.csv'));
  // csvStringをUTF-8で書き出す.
  writableStream.write(iconv.encode(csvString, 'UTF-8'));
});
