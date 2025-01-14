const { 
  Telegraf,
  session,
  Scenes,
  Markup 
} = require('telegraf');
const fetch = require('node-fetch').default
const path = require('path')
const fs = require('fs')
const express = require('express');
const http = require('http');
const app = express();
const  Promise = require('promise');

const format = require('./maxfunction/format')
let date = fs.readFileSync('./text/updateData.txt', 'utf8').toString();


const db = require('./DB/firstData');
const detDB = require('./DB/data');

let scenesDeposit = require('./maxfunction/scenaDeposit');
let scenesCredit = require('./maxfunction/scenaCredit');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(Telegraf.log());
bot.use(session());
const stage = new  Scenes.Stage([scenesDeposit,scenesCredit]);
bot.use(stage.middleware())

require('./maxfunction/listen')(bot,fs,Markup);


bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


app.get('/update',async (req,res)=>{
		console.log('app.get(/update\')  worket!!!.....')
		require('./updateData/update')(db,detDB);
});
app.get('/start',async (req,res)=>{
	RunUpdate()
});


app.get('/clear',async (req,res)=>{
	 await detDB.clearAll();
});

const server = http.createServer(app);  

var server_port =process.env.PORT || 8080;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

server.listen(server_port);
console.log(`${server.address().port} porni eshtiyapmiz!`);


