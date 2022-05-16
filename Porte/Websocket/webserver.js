const express = require('express')
const app = express()
const server = require('http').createServer(app)
var io = require('socket.io','net')(server) //require socket.io module and pass the http object (server)
const bodyParser = require("body-parser")
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var gache = new Gpio(4, 'out');
var gachevalue = 0;  // Turn on the LED by default
var rfid = new Gpio(17,'in','both');
var delay =1000;

var user
var pass
var historyAccess
var remoteAccess
var localAccess
 

app.use(bodyParser.urlencoded({
    extended:true
}));

const {Users} = require('./Classe/Users')
var usersInNetwork = []

const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('../../mybdd.db', error => {
	if (error){throw error}
})

getBDD(db).then((data) => {
	console.log("data : " + data) // affiche un tableau de noms

})
/****** CONSTANTS******************************************************/

const PORT = 8080;

app.post('/inscription/submit', (req, res) => {
    //res.set('Content-Type', 'application/json')
    console.log("id : "  + req.body.id + " pwd : "+ req.body.pwd)
    if(inscription(req.body.id, req.body.pwd)){
		getBDD(db).then((data) => {
			console.log("data : " + data) // affiche un tableau de noms
		
		})
		res.set('Content-Type', 'text/html')
		res.redirect('http://localhost:8080/home')
	}else{
		res.redirect('http://localhost:8080/inscription')
	}
    //res.send(req.body)
})

app.post('/connexion/submit', (req, res) => {
    //res.set('Content-Type', 'application/json')
    // console.log("id : "  + req.body.id + " pwd : "+ req.body.pwd)
    if(verifConnect(req.body.id, req.body.pwd)){
		res.set('Content-Type', 'text/html')
		res.redirect('http://localhost:8080/home')
	}else{
		res.redirect('http://localhost:8080/connexion')
	}
    //res.send(req.body)
})

// HTML
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/public/HTML/main.html`)
})

app.get('/home', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/public/HTML/home.html`)
})

app.get('/myProfil', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/public/HTML/myProfil.html`)
})

app.get('/settings', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/public/HTML/adminsettings.html`)
})

app.get('/about', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/public/HTML/about.html`)
})

app.get('/logout', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.redirect('http://localhost:8080')
})

app.get('/connexion', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/public/HTML/connexion.html`)
})

app.get('/inscription', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/public/HTML/inscription.html`)
})

// JS
app.get('/JSsend', (req, res) => {
    res.set('Content-Type', 'text/javascript')
    res.sendFile(`${__dirname}/public/JS/send.js`)
})

app.get('/main', (req, res) => {
    res.set('Content-Type', 'text/javascript')
    res.sendFile(`${__dirname}/public/JS/main.js`)
})

// CSS
app.get('/navbar', (req, res) => {
    res.set('Content-Type', 'text/css')
    res.sendFile(`${__dirname}/public/CSS/navbar.css`)
})

app.get('/style-settings', (req, res) => {
    res.set('Content-Type', 'text/css')
    res.sendFile(`${__dirname}/public/CSS/style-settings.css`)
})

app.get('/multiselect', (req, res) => {
    res.set('Content-Type', 'text/css')
    res.sendFile(`${__dirname}/public/CSS/style-multiselect.css`)
})

/* if you want to run WebPort on a port lower than 1024 without running
 * node as root, you need to run following from a terminal on the pi
 * sudo apt update
 * sudo apt install libcap2-bin
 * sudo setcap cap_net_bind_service=+ep /usr/local/bin/node
 */
 
/*************** Web Browser Communication ****************************/

// Start http webserver
server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})

// Execute this when web server is terminated
process.on('SIGINT', function () { //on ctrl+c
	gache.writeSync(0); // Turn LED off
	gache.unexport(); // Unexport LED GPIO to free resource
	process.exit(); //exit completely
  }); 

// Gestion BDD

function getBDD(db){
	return new Promise((resolve) => {
		async function getUsers(db, attribut){
			return new Promise((resolve) => {
				db.all(`SELECT ${attribut} FROM USERS WHERE id_USER<100`, (err, data) => { // si pas de where la liste s'affiche dans l'ordre alphabétique et c'est pas ce qu'on veut
					if(err){throw err}
					// console.log(data)
					var res = []
					data.forEach(att => {
						switch(attribut){
							case "pseudo_USER" :
								res.push(att.pseudo_USER)
							break
							case "password_USER" :
								res.push(att.password_USER)
							break
							case "access_history_USER" :
								res.push(att.access_history_USER)
							break
							case "local_access_USER" :
								res.push(att.local_access_USER)
							break
							case "remote_access_USER" :
								res.push(att.remote_access_USER)
							break
							default :
								console.log(`Rien dans l'attribut ${attribut}`)
							break
						}
					})
					console.log(res)
					resolve(res)
				})
			})
		}

		async function putBDDintoTables(){
			return new Promise((resolve) => {
				let i = 0;
				while (i< user.length){
					usersInNetwork.push(new Users(user[i], pass[i], historyAccess[i], localAccess[i], remoteAccess[i]));
					console.log("userInNetwork : " + usersInNetwork[i].name)
					console.log("userInNetwork : " + usersInNetwork[i].pwd)
					console.log("userInNetwork : " + usersInNetwork[i].historyAccess)
					console.log("userInNetwork : " + usersInNetwork[i].remoteAccess)
					console.log("userInNetwork : " + usersInNetwork[i].localAccess)
					i = i + 1;
				}
				//console.log("UserInNetWORKS global : ", usersInNetwork);
				//console.log(usersInNetwork.length, usersInNetwork[0].name);
				
				resolve(usersInNetwork);
			})
		}

		async function final(db){
			user = await getUsers(db, "pseudo_USER")
			pass =  await getUsers(db, "password_USER")
			historyAccess = await getUsers(db, "access_history_USER")
			remoteAccess = await getUsers(db, "remote_access_USER")
			localAccess = await getUsers(db, "local_access_USER")
			
			return await putBDDintoTables()
			// let pwd = await getUsers(db, "password_USER")
		}
		resolve(final(db))
	})
}



function inscription(id, password){
	var exist = false

	if(id=='' || password==''){
		console.log("L'un des champs est vide")
	} else {
		for(let i=0; i<usersInNetwork.length; i++){
			if (usersInNetwork[i].name == id){
				exist = true
				console.log('Identifiant déjà existant, connectez vous ou utilisez un autre identifiant.')
				return false
			}
		}
		
		if(!exist){
			db.run('INSERT INTO USERS(pseudo_USER, password_USER, access_history_USER, local_access_USER, remote_access_USER) VALUES(?,?,0,0,0)',[id, password])
			usersInNetwork.push({id: id, pwd: password})
			return true
		}
	}
}

function verifConnect(id, password){
    if(usersInNetwork.length == 0){
        console.log('Error, DB is empty')
    }
	if(id=='' || password==''){
		console.log("L'un des champs est vide")
	} else {
		console.log("FOR...")
		for(let i = 0; i<usersInNetwork.length; i++){
			console.log("ITERATIONS !!!")
			console.log("id : ", id)
			console.log("pwd : ", password)
			console.log("id  user: " + usersInNetwork[i].name + " mdpp user : " + usersInNetwork[i].ppwd)
			if(usersInNetwork[i].name == id && usersInNetwork[i].pwd == password){
				console.log("ID trouvé " + usersInNetwork[i].name + " son mdp est " + usersInNetwork[i].pwd)
				console.log("return true")
				return true;
			}
		}
		console.log("Identifiant ou mot de passe saisi incorrect")
		return false;
	}
}

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


 






 




