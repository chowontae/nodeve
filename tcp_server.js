/**
 * TCP 서버
 */
var net = require('net');
 
// TCP 소켓 서버 생성
var server = net.createServer();
 
server.on('listening', function onListening() {
    console.log('onListening');
});
 
server.on('connection', function onConnection(client) {
    console.log('onConnect');
 
    // 클라이언트가 접속했을 때 이벤트를 걸어준다.
    client.on('data', function onClientData(buff) {
        console.log('onClientData');
        console.log('클라이언트가 보낸 데이터 :', buff.toString());
 
        client.write('클라이언트 메시지 잘 받았고, 이 메시지를 보낸다');
    });
});
 
server.on('close', function onClose() {
    console.log('onClose');
});
 
 
server.on('error', function onError(error) {
    console.log('onError');
    console.log(error);
});
 
// 수신 대기
server.listen(6000);