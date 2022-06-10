const format = require('../maxfunction/format');
const fs = require('fs');
const translit = require('latin-to-cyrillic')

async function Run(db){
	await require('./center_bank')(db,format,fs);
	await require('./market')(db,format,fs);
	await require('./RUB')(db,format,fs,translit);
	await require('./stockExchange')(db,format,fs);
	await require('./USD')(db,format,fs,translit);
}

module.exports = Run;