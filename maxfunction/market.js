let fs = null;
let format = null;
const code = {'USD':'💲Долар','EUR':'💶','RUB':'🇷🇺Рубл','CNY':'🇨🇳'}
function evnt(elm){
	if (elm>0) {
		return '↗️';
	}
		return '↘️';
}
function Top(obj,codes){
	let a = 'сотиб олиш курси';
	let b = 'сотув курси';
	let shep = `${code[codes]}: ${a}: <code>${obj.get}</code>\n `+
	`                  ${b}: <code>${obj.sell}</code>\n`;
	return shep;
}

async function Run(db){
	const result = await db.getBN();
	const content = 
		'Бозор курси(норасмий)\n'+
		`🗓Cана  :  ${result.xtime}\n`+
		`⏱ Янгиланган вақт :${format()} ${format(true)}\n\n`+
		Top(result.USD,'USD')+
		Top(result.RUB,'RUB')+
		`\n\nСўнгги валюта курслари — @${process.env.NAME_BOT}`;

	 fs.writeFile('./text/market.txt', content,(err) => {
				if (err)
					console.log('market.txt fayliga yozishda xato bor',err);
				else {
					console.log('market.txt ga malumotlar yozildi!')
				}
        })
}

module.exports = async function(db,formatx,fsx){
	fs = fsx;
	format = formatx;
	setTimeout(function(){Run(db)},5000);
}