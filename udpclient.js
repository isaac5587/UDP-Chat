var udp = require('dgram');

// Allows input on the client side to send to the server 
const readline = require("readline");
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

// Message that displays information about the data 
client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});


// We use a promise here since JS is not Asynchronus
const question1 = () => {
  return new Promise((resolve, reject) => {

  // Ask my question
    rl.question("->", function(txtChat) {

      client.send(txtChat,2222,'localhost',function(error){
        if(error){
          client.close();
        }else{
          console.log('Data sent');
        }
      });

    resolve();
   });
 });
};



// Solution here to handle asynchronous operations
const main = async () => {
  while(1==1)

    {await question1();}
}

main(); 




