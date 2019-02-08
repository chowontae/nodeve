const Mydb = require("./mydb");

/*
function fn(){
	app.get('/', (req, res)=>{
	    //res.send("hello NodeJS!!");
	    res.json(testJson);
		//res.render('index', {name:"홍길동"});
	});

	app.get('/test/:email', (req, res) =>{
		testJson.email = req.params.email;	// cf. req.body, req.query 
		testJson.aa = req.query.aa;
		res.json(testJson);
	});

	app.get('/dbtest/:user', (req, res) =>{
		let user = req.params.user;
		let mydb = new Mydb(pool);

		mydb.execute( conn =>{
			conn.query("select * from User where uid=?", [user], (err, ret) =>{
				res.json(ret);
			});
		});
		//res.json(testJson);
	});

	app.get('/apis/replies/:bno', (req, res) =>{
		let bno = req.params.bno;
		let mydb = new Mydb(pool);

		mydb.execute( conn =>{
			conn.query("select * from Reply where bno=? limit 10", [bno], (err, ret) =>{
				res.json(ret);
			});
		});
		//res.json(testJson);
	});

	app.put('/apis/replies/:bno/:rno', (req, res) =>{
		let bno = req.params.bno;
		let rno = req.params.rno;
		
		let mydb = new Mydb(pool);

		mydb.execute( conn =>{
			conn.query("select * from Reply where bno=? limit 10", [bno], (err, ret) =>{
				res.json(ret);
			});
		});
		//res.json(testJson);
	});
}

module.exports = fn;
*/

module.exports = function(app, pool){
	
	/*app.get('/', (req, res)=>{
	    //res.send("hello NodeJS!!");
	    res.json(testJson);
		//res.render('index', {name:"홍길동"});
	});
	*/
	app.get('/test/:email', (req, res) =>{
		testJson.email = req.params.email;	// cf. req.body, req.query 
		testJson.aa = req.query.aa;
		res.json(testJson);
	});

	app.get('/dbtest/:user', (req, res) =>{
		let user = req.params.user;
		let mydb = new Mydb(pool);

		mydb.execute( conn =>{
			conn.query("select * from User where uid=?", [user], (err, ret) =>{
				res.json(ret);
			});
		});
		//res.json(testJson);
	});

	app.get('/apis/replies/:bno', (req, res) =>{
		let bno = req.params.bno;
		let mydb = new Mydb(pool);
		
		mydb.execute( conn =>{
			conn.query("select * from Reply where bno=? limit 10", [bno], (err, ret) =>{
				res.json(ret);
				//pool.end();
			});
			
		});
		//res.json(testJson);
	});

	app.get('/apis/replies/:bno/:rno', (req, res) =>{
		let bno = req.params.bno;
		let rno = req.params.rno;
		
		let mydb = new Mydb(pool);

		mydb.execute( conn =>{
			let que = "select * from Reply where rno=? and bno=?";
			conn.query(que, [rno, bno], (err, ret) =>{
				console.log( que, [rno,bno]);
				res.json(ret[0]);
				//pool.end();
			});
			
		});
		//res.json(testJson);
	});
	
	app.put('/apis/replies/:bno/:rno', (req, res) =>{
		let bno = req.params.bno;
		let rno = req.params.rno;
		let replytext = req.body.replytext;
		
		let mydb = new Mydb(pool);

		mydb.executeTx( conn =>{
			conn.query("update Reply set replytext = ? where rno=? ", [replytext, rno], (err, ret) =>{
				if( err ){
					conn.rollback();
					throw err;
				};
				conn.commit();
				
				res.json(ret.affectedRows);
				
				//pool.end();
			});
		});
	});	
}
