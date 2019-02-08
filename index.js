const express = require('express');
const util = require('util')
			, bodyParser = require("body-parser");

/////////////////////////////////////
//보안
//const helmet = require("helmet"),
//		hpp = require("hpp");
/////////////////////////////////////

//환경설정변수
require('dotenv').config();

util.log(process.env.BASE_URL);

const app = express(), 
        testJson = require('./test/test.json')
        moviesJson = require("./movies.json")
        ;

const rest = require("./rest");

const Pool = require("./pool");
const pool = new Pool();


//const movies = require('./movies');
//app.use('/movies', movies);

app.use(express.static('public'));
app.set('views', __dirname+"/views");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//보안관련 실제 운영에서만 사용가능하게 함 helmet는 보안이 너무 강해 iframe을 못 쓸수도 있음
//if( process.env.NODE_ENV === 'production'){
//	app.use(morgan('combined'));
//	app.use(helmet);
//	app.use(hpp);
//}else{
//	app.use(morgan('dev'));
//}

//필수코드  
app.use( (req, res, next) =>{
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	
	if( req.method == 'OPTIONS'){
		res.status(200).end();
	}else{
		next();
	}
});

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


rest(app, pool);

const server = app.listen(process.env.SERVER_PORT, function(){
    util.log("Express's started on port ", process.env.SERVER_PORT);
});

const io = require('socket.io').listen(server, {
	log: false,
	origins: "*:*",
	pingInterval: 3000,	//default 25초
	pingTimeout: 5000	//defualt 60초 - 서버와 클리아인트가 연결이 끊어지면 서버가 클라이언트와 연결을 자동으로 시도함
});

io.sockets.on('connection', (socket, opt) =>{
	var senddata = false;
	var sendend = false;
	var loopyn = false;

	//htsLoopData('room2');
	//socket.emit('message', moviesJson);

	socket.emit('message', {msg: 'Welcome '+ socket.id});

	util.log("connection>>", socket.id, socket.handshake.query);
	
	socket.on('join', function(roomId, userid, fn){
		socket.userid = userid;
		socket.join(roomId, function(){
			util.log("join >>", roomId, Object.keys(socket.rooms));
		});
		
		
		
		//방에 join이 되었을 경우 callback 실행하게 해야 함
		if( fn ) fn();
		
	});
	
	socket.on('leave', function(roomId, fn){
		socket.leave(roomId, function(){
			if( fn )
				fn();			
		});

	});

	socket.on('rooms', function(fn){
		util.log( ' rooms list ');
		if(fn)
			fn(Object.keys(socket.rooms));
	});
	
	//data: {room: 'roomid', msg: 'msg내용..'}
	socket.on('message', (data, fn)=>{
		util.log("message>>", data.msg, Object.keys(socket.rooms));
		
		util.log( 'data : room : ', data);
		/*
		 * socket.broadcat.emit(..)	모든 클라이언트
		 * socket.broadcast.to('roomid').emit(...)  나를 제외한 메세지  , 그룹위주
		 * io.sockets.in('roomid').emit(..), io.to('roomid').emit(...)	// 내 그룹에서 나를 포함한 모든 메세지
		 * 
		 */
		socket.broadcast.to(data.room).emit('message', {room: data.room, msg: data.msg});
		//io.to(data.room).emit('message', {room: data.room, msg: data.msg});
		
		//내가 보낸 메세지
		if( fn ){ 
			fn(data.msg);
		}
	});
	
	//귓속말
	socket.on("message-for-one", (socketid, msg, fn) =>{
		//socket.broadcast.to(socketid).emit('message', {msg:msg});
		//위 구문 말고
		//socketid 한개에만 메세지를 보낸다. 
		socket.to(socketid).emit('message', {msg:msg});
	});
	
	socket.on("disconnecting", function(data){
		util.log("disconnecting > ", socket.id);
	});
	
	socket.on("senddata", function(senddata){
		util.log("senddata : " , senddata);
		senddata = (senddata) ? true : false;
	});
	
	socket.on("sendend", function(sendend){
		util.log("sendend : " , sendend);
		sendend = (sendend) ? true : false;
	});
	
	socket.on('loopend', (loopend, roomId) =>{
		util.log("loopend : " , loopend);
		loopyn = (loopend) ? true : false;
		htsLoopData(roomId);
	});
	socket.on('loopstart', (loopstart, roomId) =>{
		util.log("loopstart : " , loopstart);
		loopyn = (loopstart) ? true : false;
		
		htsLoopData(roomId);
		
	});	
	function htsLoopData(roomId){
		util.log("htsLoopData roomId : ", roomId)
		var price = 0;
		while( loopyn && price < 50000){
			price += 10;
			util.log( "price : " , price );
			if( roomId == "room2" ){
				util.log("room2 성공");
				io.to(roomId).emit("message", {room: roomId, msg: price});
			}
		}
	}	
});