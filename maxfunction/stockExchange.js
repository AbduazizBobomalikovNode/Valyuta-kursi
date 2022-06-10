let fs = null;
let format = null;
const code = {'USD':'💲','EUR':'💶','RUB':'🇷🇺','CNY':'🇨🇳'}
function evnt(elm){
	if (elm>0) {
		return '↗️ ';
	}
		return '↘️ ';
}
function Top(arr){
	let string = '';
	for (var i = 0;i<arr.length;i++) {
		string += `${code[arr[i].Ccy]}${arr[i].CcyNm_UZC} : <code>${arr[i].Rate}</code>\n`+
		`                      🔄ҳолати :${arr[i].Diff}${evnt(arr[i].Diff)}\n\n\n`;
	}
	return string;
}

async function Run(db){
	const result = await db.getBR();
	const content = 
		'Валюта  биржаси курси\n'+
		`🗓Cана  :  ${result.time}\n`+
		`⏱ Янгиланган вақт :${format()} ${format(true)}\n\n`+
		`💲АҚШ доллари : <code>${result.USD.parse}</code> \n`+
		`                      🔄ҳолати :${evnt(result.USD.situation)}${result.USD.situation}\n\n`+
		`💶EВРО :  <code>${result.EUR.parse}</code>\n`+
		`                      🔄ҳолати :${evnt(result.EUR.situation)}${result.EUR.situation}\n\n`+
		`Сўнгги валюта курслари — @${process.env.NAME_BOT}`;

	 fs.writeFile('./text/stock_exchange.txt', content,(err) => {
				if (err)
					console.log('stock_exchange.txt fayliga yozishda xato bor',err);
				else {
					console.log('stock_exchange.txt ga malumotlar yozildi!')
				}
        })
}
module.exports = async function(db,formatx,fsx){
	fs = fsx;
	format = formatx;
	setTimeout(function(){Run(db)},5000);
}