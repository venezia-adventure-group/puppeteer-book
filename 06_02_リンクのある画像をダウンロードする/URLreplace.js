const url = 'https://mainichi.jp/graphs/20180612/hpj/00m/040/001000g/1';
const imageurlheader = 'https://cdn.mainichi.jp/vol1/';
const imageurlmainwithg1 = url.split('graphs').pop().replace('/', '');
console.log(imageurlmainwithg1);
const imageurldate = imageurlmainwithg1.substring(0, 4) + '/' + imageurlmainwithg1.substring(4, 6) + '/' + imageurlmainwithg1.substring(6, 8);
console.log(imageurldate);
const imageurlmain = imageurlmainwithg1.substring(0, imageurlmainwithg1.length-2);
//const imageurl = imageurlheader + imageurldate + imageurlmain + 'q/9.jpg';
//console.log(imageurl);