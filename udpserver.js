var udp = require('dgram');

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

// Array of clients 
clientArray = [];

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
//Server receives message
server.on('message',function(msg,info){
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d',msg.length, info.address, info.port);
  if(!clientArray.includes(info.port)){
    clientArray.push(info.port);
  }

   

    //sending msg


    for(const elements of clientArray){
      server.send(msg,elements,'localhost',function(error){
        if(error){
            client.close();
        }else{
            console.log('Reply sent\n');
        }
    
        })};

});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(2222);


