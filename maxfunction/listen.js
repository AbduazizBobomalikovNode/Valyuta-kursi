module.exports = function(bot,fs,Markup){
		const startKeyboard = Markup.keyboard([
					[Markup.button.text('🇷🇺Рубль курси'),Markup.button.text('🛃Бозор курси (Норасмий)')],
					[Markup.button.text('🏛Марказий Банк'),Markup.button.text('📉Валюта биржаси'),Markup.button.text('🏦Банклар курси')],
					[Markup.button.text('📟омонат ва киридит калкулятрлари')]
					]).resize()
	bot.start(ctx=>{
		ctx.replyWithPhoto(
			{source: fs.createReadStream('./images/com.jpg')},
			{
				caption:`Ассалому алайкум,<code> ${ctx.from.username} </code>\n` +
							fs.readFileSync('./text/start.txt', 'utf8').toString(),
				parse_mode: 'HTML',
				...startKeyboard
			}
		);
	})
	bot.hears('📟омонат ва киридит калкулятрлари',ctx=>{
		ctx.reply(fs.readFileSync('./text/kalkulyatr.txt', 'utf8').toString(),
				{
				parse_mode: 'HTML',
				...Markup.inlineKeyboard([
					Markup.button.webApp('🗺web Депосит cалcулатор','https://stupendous-donut-d62bdf.netlify.app/index.html'),
					Markup.button.webApp('🗺web Cредит cалcулатор','https://warm-jalebi-136c5b.netlify.app/index.html')])
			}
		);
		ctx.reply('🤖 омонат ва киридит калкулятрлари',Markup.keyboard(['↘️Депосит cалcулатор','↖️Cредит cалcулатор']).resize())
	})
	bot.hears('🇷🇺Рубль курси',ctx=>{
		ctx.replyWithPhoto(
			{source: fs.createReadStream('./images/rubl.jpg')},
			{
				caption:fs.readFileSync('./text/rubl.txt', 'utf8').toString(),
				parse_mode: 'HTML',
				...startKeyboard
			}
		);
	})
	bot.hears('🛃Бозор курси (Норасмий)',ctx=>{
		ctx.replyWithPhoto(
			{source: fs.createReadStream('./images/market.jpg')},
			{
				caption:fs.readFileSync('./text/market.txt', 'utf8').toString(),
				parse_mode: 'HTML',
				...startKeyboard
			}
		);
	})
	bot.hears('🏛Марказий Банк',ctx=>{
		ctx.replyWithPhoto(
			{source: fs.createReadStream('./images/center_bank.jpg')},
			{
				caption:fs.readFileSync('./text/center_bank.txt', 'utf8').toString(),
				parse_mode: 'HTML',
				...startKeyboard
			}
		);
	})
	bot.hears('🏦Банклар курси',ctx=>{
		ctx.replyWithPhoto(
			{source: fs.createReadStream('./images/dollar.jpg')},
			{
				caption:fs.readFileSync('./text/dollar.txt', 'utf8').toString(),
				parse_mode: 'HTML',
				...startKeyboard
			}
		);
	})
	bot.hears('📉Валюта биржаси',ctx=>{
		ctx.replyWithPhoto(
			{source: fs.createReadStream('./images/stock_exchange.jpg')},
			{
				caption:fs.readFileSync('./text/stock_exchange.txt', 'utf8').toString(),
				parse_mode: 'HTML',
				...startKeyboard
			}
		);
	})
	bot.hears('↘️Депосит cалcулатор',ctx=>{
    	ctx.scene.enter('scenesDeposit');
	})
	bot.hears('↖️Cредит cалcулатор',ctx=>{
	    ctx.scene.enter('scenesCredit');
	})
}