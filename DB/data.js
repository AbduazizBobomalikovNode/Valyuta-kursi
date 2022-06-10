const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATE_URL;
const client = new MongoClient(uri);
const format = require('../maxfunction/format');

if(client)
  console.log('DataBesega ulanish hosil qilindi!')

let col = null;
let col2 = null;
let col3 = null;
let col4 = null;
let col5 = null;
let db = null;
let flag = false;
class Data{
	constructor(){
		(async  function() {
        await client.connect()
		db = client.db('currency');

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
			console.log('Bozor norasmiy kursi jadvaliga ulanish hosil qilindi!');
        })();
	}
	async findDate(){
				const flag = col.findOne({time:format()},{_id:0})
				  .then(result => {
					    if(result) {
					      console.log(`Hujjat muvaffaqiyatli topildi:: ${result}.`);
					      return false;
					    } else {
					      console.log("Hech qanday hujjat taqdim etilgan soʻrovga mos kelmaydi");
					      return true;
					    }
				  })
				  .catch(err =>{
				  		console.error(`Hujjat topilmadi: ${err}`)
						return true;
					})
				return flag;
	}
	async getRUB(){
		  return col.findOne({time:format()},{_id:0})
				  .then(result => {
				  	return result;
				  }).catch(err =>{
				  	console.log('USD haqida malumot kelmadi')
				  	return null;
				  })
	}
	async getUSD(){
		  return col2.findOne({time:format()},{_id:0})
				  .then(result => {
				  	return result;
				  }).catch(err =>{
				  	console.log('USD haqida malumot kelmadi')
				  	return null;
				  })
	}

	async getMB(){
		  return col3.findOne({time:format()},{_id:0})
				  .then(result => {
				  	return result;
				  }).catch(err =>{
				  	console.log('Markaziy bank kursi haqida malumot kelmadi')
				  	return null;
				  })
	}
	async getBR(){
		  return col4.findOne({time:format()},{_id:0})
				  .then(result => {
				  	return result;
				  }).catch(err =>{
				  	console.log('Birja  kursi haqida malumot kelmadi')
				  	return null;
				  })
	}
	async getBN(){
		  return col5.findOne({time:format()},{_id:0})
				  .then(result => {
				  	return result;
				  }).catch(err =>{
				  	console.log('Bozor norasmiy kursi haqida malumot kelmadi')
				  	return null;
				  })
	}
	async clearAll(){
		col.drop(function(err, delOK) {
	    if (err) throw err;
	    if (delOK) console.log("Collection deleted RUB");
	  });
	  col2.drop(function(err, delOK) {
	    if (err) throw err;
	    if (delOK) console.log("Collection deleted USD");
	  });
		col3.drop(function(err, delOK) {
	    if (err) throw err;
	    if (delOK) console.log("Collection deleted MaB");
	  });
	  col4.drop(function(err, delOK) {
	    if (err) throw err;
	    if (delOK) console.log("Collection deleted BR");
	  });
	  col5.drop(function(err, delOK) {
	    if (err) throw err;
	    if (delOK) console.log("Collection deleted BN");
	  });
	}
	close(){
		client.close();
	}
}
module.exports = new Data();

