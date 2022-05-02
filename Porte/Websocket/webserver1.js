var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var url = require('url');
var path = require('path');
var io = require('socket.io','net')(http) //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var gache = new Gpio(4, 'out');
var gachevalue = 0;  // Turn on the LED by default
var rfid = new Gpio(17,'in','both');
var delay =1000;
/****** CONSTANTS******************************************************/

const WebPort = 8080;


/* if you want to run WebPort on a port lower than 1024 without running
 * node as root, you need to run following from a terminal on the pi
 * sudo apt update
 * sudo apt install libcap2-bin
 * sudo setcap cap_net_bind_service=+ep /usr/local/bin/node
 */
 
/*************** Web Browser Communication ****************************/



// Start http webserver
http.listen(WebPort, function() {  // This gets call when the web server is first started.
	gache.writeSync(gachevalue); //turn LED on or off
	console.log('etat de la gache = '+gachevalue);
	} 
); 



// function handler is called whenever a client makes an http request to the server
// such as requesting a web page.
function handler (req, res) { 
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log('filename='+filename);
    var extname = path.extname(filename);
    
	if (filename=='./') {
      console.log('retrieving default index.html file');
      filename= './home.html';
    }
    
    // Initial content type
    var contentType = 'text/html';
    
    // Check ext and set content type
    switch(extname) {
	case '.js':
	    contentType = 'text/javascript';
	    break;
	case '.css':
	    contentType = 'text/css';
	    break;
	case '.json':
	    contentType = 'application/json';
	    break;
	case '.png':
	    contentType = 'image/png';
	    break;
	case '.jpg':
	    contentType = 'image/jpg';
	    break;
	case '.ico':
	    contentType = 'image/png';
	    break;
    }
    

    
    fs.readFile(__dirname + '/public/HTML' + filename, function(err, content) {
	if(err) {
	    console.log('File not found. Filename='+filename);
	    fs.readFile(__dirname + '/public/HTML/404.html', function(err, content) {
			res.writeHead(200, {'Content-Type': 'text/html'}); 
			return res.end(content,'utf8'); //display 404 on error
	    });
	}
	else {
	    // Success
	    res.writeHead(200, {'Content-Type': contentType}); 
	    return res.end(content,'utf8');
	}
      
    });
}


// Execute this when web server is terminated
process.on('SIGINT', function () { //on ctrl+c
  gache.writeSync(0); // Turn LED off
  gache.unexport(); // Unexport LED GPIO to free resource
  process.exit(); //exit completely
}); 


/****** io.socket is the websocket connection to the client's browser********/

io.sockets.on('connection', function (socket) {// WebSocket Connection
    console.log('A new client has connectioned. Send LED status');
  gachevalue = 0;
 rfid.watch(function(err, value){
        if(err){
            console.error('There was an error', err);
	    return;
	}
	//if (gachevalue) gachevalue = 0;
	//else gachevalue = 1;
	gachevalue = value;
        socket.emit('gache', gachevalue);
 	gache.writeSync(gachevalue);
        console.log('Changement etat de la gache avec rfid');
        //io.emit('gache', gachevalue);
    });
    // this gets called whenever client presses GPIO26 toggle light button
    socket.on('gacheT', function(data) { 
	if (gachevalue) gachevalue = 0;
	else gachevalue = 1;
	console.log('new gache value='+gachevalue);
	    gache.writeSync(gachevalue); //turn LED on or off
	    console.log('Changement etat de la gache avec website');
	    io.emit('gache', gachevalue); //send button status to ALL clients
    });
    
    // this gets called whenever client presses GPIO26 momentary light button
    socket.on('gache', function(data) { 
	gachevalue = data;
	if (gachevalue != gache.readSync()) { //only change LED if status has changed
	    gache.writeSync(gachevalue); //turn LED on or off
	    console.log('Changement etat de la gache en simultané');
	    io.emit('gache', gachevalue); //send button status to ALL clients 
	};	
    });
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });
    

}); 


 




