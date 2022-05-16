var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var url = require('url');
var path = require('path');
var io = require('socket.io','net')(http) //require socket.io module and pass the http object (server)
var delay =1000;
const {Users} = require('../Websocket/Classe/Users')
var usersInNetwork = []
var users = new Object()

const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('../../mybdd.db', error => {
	if (error){throw error}
})

getBDD(db).then((data) => console.log(data))
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

	let buffer = ''
	req.on('data', chunk => {
		buffer += chunk;
	});
		req.on('end', () => {
		console.log(buffer)
	});
	   
	
}

function getBDD(db){
	return new Promise((resolve) => {
		async function getUsers(db, attribut){
			return new Promise((resolve) => {
				db.all(`SELECT DISTINCT ${attribut} FROM USERS 
					NATURAL JOIN HISTORY
					NATURAL JOIN DOORS`, (err, data) => {
					if(err){throw err}
					data.forEach(test => {
						switch(attribut){
							case "pseudo_USER" :
								usersInNetwork.push(test.pseudo_USER)
								console.log("pseudos récupérés")
							break
							default :
								console.log(`Rien dans l'attribut ${attribut}`)
							break
						}
					})
					resolve(usersInNetwork)
				})
			})
		}
		async function createUser(){

		}

		async function final(db, users){
			return new Users(await getUsers(db, users))
		}
		resolve(final(db, "pseudo_USER"))
	})
}

function inscription(){
	// Récupération de l'id et du mdp
	const id = document.getElementById('id').value
	const password = document.getElementById('pwd').value
	var exist = false

	if(id=='' || password==''){
		alert("L'un des champs est vide")
	}else{
		for(let i=0; i<usersInNetwork.length; i++){
			if (usersInNetwork[i].id == id){
				document.getElementById('id').remove
				document.getElementById('pwd').remove
				exist = true
				alert('Identifiant déjà existant, connectez vous ou utilisez un autre identifiant.')
			}
		}
		if(!exist){
			db.run('INSERT INTO USERS(pseudo_USER, password_USER, access_history_USER, local_access_USER, remote_access_USER) VALUES(?,?,0,0,0)',[id, password])
			usersInNetwork.push({id: id, pwd: password})
		}
	//     for(let i=0; i<usersInNetwork.length; i++){
	// 	alert(usersInNetwork[i] + ' ' +usersInNetwork[i].pwd)
	// 	exist=false
	//     }
	}
}
/****** io.socket is the websocket connection to the client's browser********/

io.sockets.on('connection', function (socket) {// WebSocket Connection
    console.log('A new client logged in.');

    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });
    

}); 


 




