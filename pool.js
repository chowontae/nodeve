const mysql = require("mysql");
const util = require("util");
const Promise = require("bluebird");

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_INFO = {
	host	: process.env.DB_HOST,
	user	: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	multipleStatements: true,
	connectionLimit: 85,
	waitForConnections: false
};


module.exports = class{
	constructor(dbinfo){
		dbinfo = dbinfo || DB_INFO;
		this.pool = mysql.createPool(dbinfo);
	}
	
	connect(){
		return this.pool.getConnectionAsync().disposer(conn => {
			return conn.release();
		});
	}
	
	end(){
		this.pool.end( function(err){
			util.log("End of Pool!!");
			if( err ){
				util.log("ERR pool ending!!");
			}
		});
	}
};