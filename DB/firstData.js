const { MongoClient, ServerApiVersion } = require('mongodb');
const format = require('../maxfunction/format');
const uri = process.env.DATE_URL;
const client = new MongoClient(uri);

if(client)
  console.log('DataBesega ulanish hosil qilindi!')


let col = null;
let col2 = null;
let col3 = null;
let col4 = null;
let col5 = null;
let db = null;
let flag = false;
class runDb{
	constructor(){
		(async  function() {
        await client.connect()
		db = client.db('currency');
		//const Bots = mongoose.model('Bots',BotSchema)
		col = await db.collection("RUB")
		if(col)
			console.log('RUB jadvaliga ulanish hosil qilindi!');
		col2 = await db.collection("USD")
		if(col2)
			console.log('USD jadvaliga ulanish hosil qilindi!');
		col3 = await db.collection("MaB")
		if(col3)
			console.log('Markaziy bank jadvaliga ulanish hosil qilindi!');
		col4 = await db.collection("BR")
		if(col4)
			console.log('Valyuta Birjasi jadvaliga ulanish hosil qilindi!');
		col5 = await db.collection("BN")
		if(col5)
			console.log('Bozor norasmiy jadvaliga ulanish hosil qilindi!');
        })();
	}
	async findDate(){
		    	if(col==null){return -1};
				const flag = col.findOne({time:format()},{_id:0})
				  .then(result => {
					    if(result) {
					      console.log(`Hujjat muvaffaqiyatli topildi:: ${result}.`);
					      return false;
					    } else {
					      console.log("Hech qanday hujjat taqdim etilgan soʻrovga mos kelmaydi");
					      return true;
					    }
					    return result;
				  })
				  .catch(err =>{
				  		console.error(`Hujjat topilmadi: ${err}`)
						return true;
					})
				return flag;
	}
	async  addRUB(olish,sotish) {
		 	const user = { get : olish,sell: sotish,time: format()}  
				const po = await col.insertOne(user);
			return 0;
		}
	async  addUSD(olish,sotish) {
		 	const user = { get : olish,sell: sotish,time: format()}   
				const po = await col2.insertOne(user);
			return 0;
		}
	async  addMB(data) {
		 	const user = { currency : data, time: format()}   
				const po = await col3.insertOne(user);
			return 0;
		}
	async  addBR(data) {
		 	const user = { 
		 		USD : {
			 		parse : data[0][0],
			 		situation : data[0][1]
		 		},
		 		EUR : {
			 		parse : data[1][0],
			 		situation : data[1][1]
		 		}, 
		 		time: format()}   
				const po = await col4.insertOne(user);
			return 0;
		}
	async  addBN(dataU,dataR,timeX) {
		 	const user = { USD : dataU, RUB :dataR ,xtime:timeX,time: format()}   
				const po = await col5.insertOne(user);
			return 0;
		}
	close(){
		client.close();
	}
}
module.exports = new runDb();

