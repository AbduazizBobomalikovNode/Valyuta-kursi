const puppeteer =  require('puppeteer');
const fs = require('fs');
let db = null;
let detDB = null;

const fetch = require('node-fetch').default
const format = require('../maxfunction/format');
const {plotx} =  require('../plot/plot')


async function XRun(){
	const mz = [];
	let f = 0;
	const result = await fetch('https://cbu.uz/uz/arkhiv-kursov-valyut/json/')  
	.then((response) => {
	    return response.json();
	  })
	  .then((data) => {
	  	for(i in data)
	  		if (data[i]['Ccy'] == 'USD' || data[i]['Ccy'] == 'EUR' || data[i]['Ccy'] == 'RUB' || data[i]['Ccy'] == 'CNY') {
	  			mz.push(data[i]);
	    	}
	  });
	  return mz;
} 

function clearArr(arr,code){
	for (var i = arr.length - 1; i >= 0; i--) {
		if(arr[i] == "" || arr[i] == " "){
			arr.splice(i,1);
		}
	}
	if (code==10) {arr.splice(0,1);}
	return arr;
}

async function Run(url){
	const browser = await puppeteer.launch({
                  headless: true,
                  args: ['--no-sandbox','--disable-setuid-sandbox']
                });
	const page = await browser.newPage();
	await page.goto(url);

	const [el] = await page.$x('//*[@id="best_RUB"]/div/div/div/div[2]');
	const txt = await el.getProperty('textContent');
	const text = await txt.jsonValue();

	const [el2] = await page.$x('//*[@id="best_RUB"]/div/div/div/div[1]/div');
	const txt2 = await el2.getProperty('textContent');
	const text2 = await txt2.jsonValue();

	const [el3] = await page.$x('//*[@id="best_USD"]/div/div/div/div[2]');
	const txt3 = await el3.getProperty('textContent');
	const text3 = await txt3.jsonValue();

	const [el4] = await page.$x('//*[@id="best_USD"]/div/div/div/div[1]/div');
	const txt4 = await el4.getProperty('textContent');
	const text4 = await txt4.jsonValue();

	db.addRUB(JSON.stringify(clearArr(text.split('\n'),10)),JSON.stringify(clearArr(text2.split('\n'),10)));
	db.addUSD(JSON.stringify(clearArr(text3.split('\n'),10)),JSON.stringify(clearArr(text4.split('\n'),10)));
	db.addMB(JSON.stringify(await XRun()));

	browser.close();
}
async function RunBr(url){
	let brData = [];
	const browser = await puppeteer.launch({
                  headless: true,
                  args: ['--no-sandbox','--disable-setuid-sandbox']
                });
	const page = await browser.newPage();
	await page.goto(url);

	const [el] = await page.$x('//*[@id="mine"]/div[2]/div/table/tbody/tr[1]/td[2]/div/div/div[2]/span/p[1]');
	const txt = await el.getProperty('textContent');
	const text = await txt.jsonValue();

	const [el2] = await page.$x('//*[@id="mine"]/div[2]/div/table/tbody/tr[1]/td[2]/div/div/div[2]/span/p[2]');
	const txt2 = await el2.getProperty('textContent');
	const text2 = await txt2.jsonValue();

	const [el3] = await page.$x('//*[@id="mine"]/div[2]/div/table/tbody/tr[2]/td[2]/div/div/div[2]/span/p[1]');
	const txt3 = await el3.getProperty('textContent');
	const text3 = await txt3.jsonValue();

	const [el4] = await page.$x('//*[@id="mine"]/div[2]/div/table/tbody/tr[2]/td[2]/div/div/div[2]/span/p[2]');
	const txt4 = await el4.getProperty('textContent');
	const text4 = await txt4.jsonValue();
	brData[0] = [clearArr(text.split(' '))[0],clearArr(text2.split(' '))[1]];
	brData[1] = [clearArr(text3.split(' '))[0],clearArr(text4.split(' '))[1]];
	db.addBR(brData);
	browser.close();
}
async function RunBozor(url){
	let brData = [];
	const browser = await puppeteer.launch({
                  headless: true,
                  args: ['--no-sandbox','--disable-setuid-sandbox']
                });
	const page = await browser.newPage();
	await page.goto(url);

	const [el] = await page.$x('//*[@id="slsh"]/div/div/p[1]/strong[1]/span');
	const txt = await el.getProperty('textContent');
	const text = await txt.jsonValue();

	const [el2] = await page.$x('//*[@id="slsh"]/div/div/p[1]/strong[2]/span');
	const txt2 = await el2.getProperty('textContent');
	const text2 = await txt2.jsonValue();
	
	const [el3] = await page.$x('//*[@id="slideshow-allwrap"]/p/span');
	const txt3 = await el3.getProperty('textContent');
	const text3 = await txt3.jsonValue();
	let str = text2.split(' ')[5];
	await db.addBN({get:text.split(' ')[3],sell:text.split(' ')[5]},
			{get:text2.split(' ')[3],sell:str.slice(9)},
			text3.split(' ')[2] +' '+ text3.split(' ')[3] +' ' + text3.split(' ')[4]);
	browser.close();
}
async function Satart(){
	if(await db.findDate()){
		await RunBr('https://www.uzrvb.uz/ru/category/arhiv-kursov');
		await Run('https://bank.uz/uz/currency');
		await RunBozor('https://dollaruz.net/');
		console.log(`malumotlar yangilandi! sana :${format()}`);
	}else{
		console.log(`hali malumotlar yangi!  sana :${format()}`);
		await db.close();
	}
	await plotx()
	require('../maxfunction/render')(detDB);
}
function update(database,lestDB){
	db = database;
	detDB = lestDB;
	setTimeout(function(){Satart()},5000);
	return setTimeout(function(){return 0},5000);
}

module.exports = update;