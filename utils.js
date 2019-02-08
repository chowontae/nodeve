const ogs = require('open-graph-scraper');
const HashMap = require('hashmap');
const Crypto = require('crypto-js');
const SHA256 = require('crypto-js/sha256');

const EKey = "nodevue";

module.exports = {
		
	makeMap(key, value){
		const map = new HashMap();
		//try{
			console.log("key :: "+ key+", value : "+ value);
			map.set(key, value);
			console.log("TTT>>", map.get(key));
			return map;
		//}catch(err){
		//	console.error("Error on makeMap::", err);
		//}
	}, 
	encryptSha2(data, key){
		if( !data ) return null;
		
		key = key || EKey;
		
		try{
			return Crypto.SHA256(data+key).toString();
		}catch(err){
			console.error("Error on encryptSha2::", err);
		}
	}, 
	encrypt(data, key){ 
		return Crypto.AES.encrypt(data, key || EKey).toString();
	}, 
	decrypt(data, key){
		return Crypto.AES.decrypt(data, key|| EKey).toString(Crypto.enc.Utf8);
	}	
	,
	ogsinfo( url, fn ){
		return ogs({url: url}, (err, ret) => {
			fn(err, ret);
		});
	}	
};

