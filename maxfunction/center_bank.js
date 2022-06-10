let fs = null;
let format = null;
let db = null;

const code = {'USD':'💲','EUR':'💶','RUB':'🇷🇺','CNY':'🇨🇳'}
function evnt(elm){
	if (elm>0) {
		return '↗️ +';
	}
		return '↘️ ';
}
function Top(arr){
	let string = '';
	for (var i = 0;i<arr.length;i++) {
		string += `${code[arr[i].Ccy]}${arr[i].CcyNm_UZC} : <code>${arr[i].Rate}</code>\n`+
		`          🔄ҳолати :${evnt(arr[i].Diff)}${arr[i].Diff} \n`
	}
	return string;
}

async function Run(){
	console.log(db);
	const result = await db.getMB();
	const kurs = JSON.parse(result.currency);
	const content = 
		'Марказий банк расмий курси\n'+
		`🗓Cана  :  ${result.time}\n`+
		`⏱ Янгиланган вақт :${format()} ${format(true)}\n\n`+
		 Top(kurs)+
		`\n\nСўнгги валюта курслари — @${process.env.NAME_BOT}`;

	 fs.writeFile('./text/center_bank.txt', content,(err) => {
				if (err)
					console.log('center_bank.txt fayliga yozishda xato bor',err);
				else {
					console.log('center_bank.txt ga malumotlar yozildi!')
				}
        })
}
module.exports = async function(dbx,formatx,fsx){
	fs = fsx;
	format = formatx;
	db = dbx;
	setTimeout(function(){Run()},5000);
}