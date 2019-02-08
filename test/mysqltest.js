const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'admin',
	password : '',
	database : 'test'
});


connection.connect();

connection.beginTransaction(err2 =>{

	connection.query("update User set lastlogin =now() where uid=?",['uid2'], function(error, results, fields){
		if( error ){ 
			//throw error;
			connection.rollback();
		}else{
			connection.commit();
		}
		
		util.log('The Update is: ', results.affectedRows);
		
		connection.query("select * from User where uid=?",['uid2'], function(error, results, fields){
			if( error ) throw error;
			util.log('The First User is: ', results[0]);
			

			connection.end();
		});	
	});

	
});




