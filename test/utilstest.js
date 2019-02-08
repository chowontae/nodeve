const util = require('util');
const utils = require('../utils');


let map = utils.makeMap();
util.log("map>>>>>>", map.get('name'));


return ;

let str = "NodeJS";

let enc = utils.encrypt(str);

util.log("encrypt : " + enc);

let dec = utils.decrypt(enc);

util.log("decrypt : " + dec);

util.log("shaEnc :" + utils.encryptSha2(str));
return ;

let url = "https://naver.com";

utils.ogsinfo(url, (err, ret) =>{
	util.log(err, ret);
});