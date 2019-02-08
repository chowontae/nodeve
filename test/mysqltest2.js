const util = require("util");
const Promise = require("bluebird");
const Pool = require("../pool"), 
		Mydb = require("../mydb");

const pool = new Pool();

let mydb = new Mydb(pool);

const sql1 = "update User set lastlogin=now() where uid = 'uid'";
const sql2 = "update User set lastlogin=now() where uid = 'uid2'";
util.log("sql1 : " + sql1);

mydb.executeTx( conn =>{
	conn.query(sql1, (err, ret) =>{
		util.log(ret);
		pool.end();
	});
});

return;
mydb.executeTx( conn =>{
	Promise.all([
		conn.queryAsync(sql1),
		conn.queryAsync(sql2)
	]).then( r => {
	for(let i=0; i < r.length; i++)
		util.log(`sql${i+1} = `, r[i].affectedRows );
	
		conn.commit();
		pool.end();
	}).catch(e => {
		util.log("catch : ", e);
		conn.rollback();
		pool.end();
	});	
});

//
//mydb( conn =>{
//	Promise.all([
//		conn.queryAsync(sql1),
//		conn.queryAsync(sql2)
//	]).then( r => {
//		for(let i=0; i < r.length; i++)
//			util.log(`sql${i+1} = `, r[i].affectedRows );
//		
//		conn.commit();
//		pool.end();
//	}).catch(e => {
//		util.log("catch : ", e);
//		conn.rollback();
//		pool.end();
//	});	
//});
//
//return;
//execute( conn =>{
//	Promise.all([
//		conn.queryAsync(sql1),
//		conn.queryAsync(sql2)
//	]).then( r => {
//		for(let i=0; i < r.length; i++)
//			util.log(`sql${i+1} = `, r[i].affectedRows );
//		
//		conn.commit();
//		pool.end();
//	}).catch(e => {
//		util.log("catch : ", e);
//		conn.rollback();
//		pool.end();
//	});
//});
//
//function execute(fn){
//	Promise.using( pool.connect(), conn =>{
//		conn.beginTransaction( txerr =>{
//			fn(conn);
//		});
//	});
//}

//Promise.using( pool.connect(), conn =>{
//	conn.beginTransaction( txerr =>{
//		
//		Promise.all([
//			conn.queryAsync(sql1),
//			conn.queryAsync(sql2)
//		]).then( r => {
//			for(let i=0; i < r.length; i++)
//				util.log(`sql${i+1} = `, r[i].affectedRows );
//			
//			conn.commit();
//			pool.end();
//		}).catch(e => {
//			util.log("catch : ", e);
//			conn.rollback();
//			pool.end();
//		});
//		//}).then(pool.end()); 이와 같이 사용하면 db 쿼리가 반영되지 않음
//	});
//});

return;
Promise.using( pool.connect(), conn =>{
	Promise.all([
		conn.queryAsync(sql1),
		conn.queryAsync(sql2)
	]).then( r => {
		util.log("End of Then!");
		util.log("sql1= ", r[0].affectedRows);
		util.log("sql2= ", r[1].affectedRows);
		pool.end();
	}).catch( err =>{
		util.log("Error : ", err );
		pool.end();
	});//.then(pool.end());
});


//Promise.using( pool.connect(), conn =>{
//	conn.queryAsync(sql1, (err,ret) => {
//		util.log("sql1=", ret.affectedRows);
//		
////		conn.queryAsync(sql2, (err2, ret2) => {
////			util.log("sql2=", ret2.affectedRows);
////		});
//	});
//	
//	pool.end();
//});


//Promise.using( pool.connect(), conn =>{
//	conn.queryAsync(sql1).then((ret)=>{
//		util.log("sql1=", ret.affectedRows);
//	});
//	
//	pool.end();
//});


//Promise.using( pool.connect(), conn =>{
//conn.queryAsync(sql1).then(( ret =>{
//	util.log("sql1=", ret.affectedRows);
//});
//
//pool.end();
//});

//Promise.using( pool.connect(), conn =>{
//	conn.queryAsync(sql1)
//		.then(console.log) 
//		.catch( err =>{
//			util.log("err : ", err);
//		});
//	
//	pool.end();
//});