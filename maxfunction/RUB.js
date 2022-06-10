let fs = null;
let format = null;
let translit = null;

function Top(arr,elm){
	let string = '';
	for (var i = 0;i<elm*2;i+=2) {
		string += `🏦${translit(arr[i])} : <code>${arr[i+1]}</code>\n`;
	}
	return string;
}

async function Run(db){
	const result = await db.getRUB();
	const sell = JSON.parse(result.sell);
	const get = JSON.parse(result.get);
	const content = 
		'Тижорат банкларида  доллар курси\n'+
		`🗓Cана  :  ${result.time}\n`+
		`⏱ Янгиланган вақт :${format()} ${format(true)}\n\n`+
		`Энг яхши сотиб олиш курси:\n`+
		 Top(get,5)+
		`\n\nЭнг яхши сотув курси:\n`+
		Top(sell,5)+
		`\n\nСўнгги валюта курслари — @${process.env.NAME_BOT}`;

	 fs.writeFile('./text/rubl.txt', content,(err) => {
				if (err)
					console.log('rubl.txt fayliga yozishda xato bor',err);
				else {
					console.log('rubl.txt ga malumotlar yozildi!')
				}
        })
}
module.exports = async function(db,formatx,fsx,translitx){
	fs = fsx;
	format = formatx;
	translit =translitx;
	setTimeout(function(){Run(db)},5000);
}