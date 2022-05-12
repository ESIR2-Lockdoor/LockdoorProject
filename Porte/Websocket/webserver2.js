var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var url = require('url');
var path = require('path');
var io = require('socket.io','net')(http) //require socket.io module and pass the http object (server)
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
	console.log(`Server running on port ${WebPort}`);
	} 
); 



// function handler is called whenever a client makes an http request to the server
// such as requesting a web page.
function handler (req, res) { 
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log('filename='+filename);
    
	if (filename=='./') {
      console.log('finding default home.html file');
      filename= 'main';
    }
    
	var continuousDirName;
	switch(filename){
		// HTML
		case './home':
			continuousDirName = '/public/HTML/';
			filename="home.html";
		break
		case './myProfil':
			continuousDirName = '/public/HTML/';
			filename="myProfil.html";
		break
		case './settings':
			console.log("adminsettings")
			continuousDirName = '/public/HTML/';
			filename="adminsettings.html";
		break
		case './about':
			continuousDirName = '/public/HTML/';
			filename="about.html";
		break
		case './logout':
			continuousDirName = '/public/HTML/';
			filename="main.html";
		break
		case './connexion':
			continuousDirName = '/public/HTML/';
			filename="connexion.html";
		break
		case './inscription':
			continuousDirName = '/public/HTML/';
			filename="inscription.html";
		break

		// JS
		case './JSsend':
			continuousDirName = '/public/JS/';
			filename="send.js";
		break
		case './main':
			continuousDirName = '/public/JS/';
			filename="main.js";
		break

		// CSS
		case './navbar':
			continuousDirName = '/public/CSS/';
			filename="navbar.css";
		break
		case './style-settings':
			continuousDirName = '/public/CSS/';
			filename="style-settings.css";
		break
		case './multiselect':
			continuousDirName = '/public/CSS/';
			filename="style-multiselect.css";
		break

		default:
			continuousDirName = '/public/HTML/';
			filename="main.html";
	}

	var extname = path.extname(filename);
	console.log("extname="+extname)
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
    
    fs.readFile(__dirname + continuousDirName + filename, function(err, content) {
		console.log("Filename="+filename)
		if(err) {
			console.log('File not found. Filename='+continuousDirName+filename);
			fs.readFile(__dirname + "/public/HTML/404.html", function(err, content) {
				res.writeHead(200, {'Content-Type': 'text/html'}); 
				return res.end(content,'utf8'); //display 404 on error
			})
		}else{
			res.writeHead(200, {'Content-Type': contentType}); 
			console.log("//////// FIN DE LA REQUETE ////////")
			return res.end(content,'utf8');
		}
		
	});
	
}

/****** io.socket is the websocket connection to the client's browser********/

io.sockets.on('connection', function (socket) {// WebSocket Connection
    console.log('A new client logged in.');

    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });
    

}); 


 




