const {
	Scenes,Markup
}  = require('telegraf');

const scenesCredit = new Scenes.BaseScene('scenesCredit');

const startKeyboard = Markup.keyboard([
					[Markup.button.text('🇷🇺Рубль курси'),Markup.button.text('🛃Бозор курси (Норасмий)')],
					[Markup.button.text('🏛Марказий Банк'),Markup.button.text('📉Валюта биржаси'),Markup.button.text('🏦Банклар курси')],
					[Markup.button.text('📟омонат ва киридит калкулятрлари')]
					]).resize()
let demo = null;
let shap = '';
function amort(balance, interestRate, terms)
{
  var monthlyRate = interestRate/12;
  //Calculate the payment
    var payment = balance * (monthlyRate/(1-Math.pow(1+monthlyRate, -terms)));
  	let shap =
	`                               Кридит  жадвали\n`+
	`|-ой-|--асосий--|---қизиқиш---|---Қолдиқ---|\n`
  for (var count = 0; count < terms; ++count)
  { 
    var interest = 0;
    var monthlyPrincipal = 0;
    let oy =  count + 1;
    let balans = balance.toFixed(2);
    
    interest = balance * monthlyRate;
    let qiziqish = interest.toFixed(2);
    
    monthlyPrincipal = payment - interest;
    let asosiy = monthlyPrincipal.toFixed(2);

    shap += `|  <code>${oy}</code>  |<code>${asosiy}</code>|<code>${qiziqish}</code>|<code>${balans}</code>|\n`
    balance = balance - monthlyPrincipal;   
  }
  
  return shap;
}
function get(leter){
	let shap = `<b>       Кридит калкулятри!     </b>\n\n`+
	`миқдори:  <code> ${leter?leter[0]:'0'} so\'m </code>\n`+
	`фоизи:    <code>   ${leter[1]?leter[1]:'8'} %</code>\n`+
	`мутдати:  <code>  ${leter[2]?leter[2]:'5'} ой</code>`;
	console.log(shap)
	return shap;
}
const kalkey = [[Markup.button.callback('➕фоиз','+f'),Markup.button.callback('➖фоиз','-f')],
				[Markup.button.callback('➕мутдат','+m'),Markup.button.callback('➖мутдат','-m')],
				[Markup.button.callback('🔆ҳисоблаш','=')]]

scenesCredit.enter(async(ctx) =>{
	ctx.session.data_deposit = Array(0,8,5);
	ctx.reply('Кридит суммасини киритинг :',Markup.keyboard(['↩️бекор қилиш']).resize())
})

scenesCredit.hears('↩️бекор қилиш',ctx=>{
	ctx.reply('Бош саҳифа',{parse_mode:"HTML",...startKeyboard})
	ctx.scene.leave();
})

scenesCredit.on('text',ctx=>{
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
scenesCredit.action(['+f','-f','+m','-m','='],ctx=>{
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
	demo = ctx.session.data_deposit;
		ctx.reply(get(demo)+'\n'+amort(parseInt(demo[0]),parseInt(demo[1]),parseInt(demo[2])),{
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

module.exports = scenesCredit;







