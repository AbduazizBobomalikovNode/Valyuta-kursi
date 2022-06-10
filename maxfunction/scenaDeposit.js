const {
	Scenes,Markup
}  = require('telegraf');
function formatDate(n,flag) {
    var d = new Date(),
        month = '' + (d.getMonth() + n),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = '' + d.getHours(),
        minutes = '' +  d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hour.length < 2) 
        hour = '0' + hour;
    if (minutes.length < 2) 
        minutes = '0' + minutes;
    if (flag)
        return [hour, minutes].join(':');

    return [year, month, day].join('-');
}
const startKeyboard = Markup.keyboard([
					[Markup.button.text('🇷🇺Рубль курси'),Markup.button.text('🛃Бозор курси (Норасмий)')],
					[Markup.button.text('🏛Марказий Банк'),Markup.button.text('📉Валюта биржаси'),Markup.button.text('🏦Банклар курси')],
					[Markup.button.text('📟омонат ва киридит калкулятрлари')]
					]).resize()

const scenesDeposit = new Scenes.BaseScene('scenesDeposit');
let shap = '';
function get(leter){
	let shap = `<b>       Депозит калкулятри!     </b>\n\n`+
	`миқдори:  <code> ${leter?leter[0]:'0'} so\'m </code>\n`+
	`фоизи:    <code>   ${leter[1]?leter[1]:'8'} %</code>\n`+
	`мутдати:  <code>  ${leter[2]?leter[2]:'5'} ой</code>`;
	console.log(shap)
	return shap;
}
function getOmont(arr){
	let plus = (arr[0]*arr[1])/12*arr[2]/100;
	let len = 5 + 12 + plus.toFixed(2).toString().length + arr[0].toString().length;
	let shap =
	`                               Депозит  жадвали\n`+
	`|-#-|----Сана----|---Фоиз тўловлари---|---Қолдиқ----|\n`
	for (var i = 1;  i<=arr[2]; i++) {
		shap += `| <code>${i}</code> |<code> ${formatDate(i)} </code>|<code>   ${plus.toFixed(2)}   </code>|<code>  ${arr[0]}  </code>|\n`
	}
	console.log(shap)
	return shap;
}
const kalkey = [[Markup.button.callback('➕фоиз','+f'),Markup.button.callback('➖фоиз','-f')],
				[Markup.button.callback('➕мутдат','+m'),Markup.button.callback('➖мутдат','-m')],
				[Markup.button.callback('🔆ҳисоблаш','=')]]

//Markup.inlineKeyboard(
scenesDeposit.enter(async(ctx) =>{
	ctx.session.data_deposit = Array(0,8,5);
	ctx.reply('Депосит суммасини киритинг :',Markup.keyboard(['↩️бекор қилиш']).resize())
})
scenesDeposit.hears('↩️бекор қилиш',ctx=>{
	ctx.reply('Бош саҳифа',{parse_mode:"HTML",...startKeyboard})
	ctx.scene.leave();
})
scenesDeposit.on('text',ctx=>{
	//
	if(isNaN(ctx.message.text)){
		ctx.reply('юборган қийматиз сон емас!');
	}else{
		ctx.session.data_deposit[0] = ctx.message.text;
		ctx.reply(get(ctx.session.data_deposit),{
			parse_mode:'HTML',
			...Markup.inlineKeyboard(kalkey)
		})
	}
})
scenesDeposit.action(['+f','-f','+m','-m','='],ctx=>{
	if(ctx.match[0] == '+f')
		ctx.session.data_deposit[1]++;
	if(ctx.match[0] == '-f')
		ctx.session.data_deposit[1]--;
	if(ctx.match[0] == '+m')
		ctx.session.data_deposit[2]++;
	if(ctx.match[0] == '-m')
		ctx.session.data_deposit[2]--;;
	if (ctx.match[0] == '=') {
		ctx.telegram.deleteMessage(ctx.chat.id,ctx.update.callback_query.message.message_id);
		ctx.reply(get(ctx.session.data_deposit)+'\n'+getOmont(ctx.session.data_deposit),{
			parse_mode:'HTML',...startKeyboard})
		ctx.scene.leave();
	}else{
	ctx.telegram.editMessageText(ctx.chat.id,ctx.update.callback_query.message.message_id, undefined, get(ctx.session.data_deposit),
      	{
			parse_mode:'HTML',
			...Markup.inlineKeyboard(kalkey)
		})	
	}
})
//
module.exports = scenesDeposit;


