const express = require('express')
const app = express()
const server = require('http').createServer(app)
var io = require('socket.io','net')(server) //require socket.io module and pass the http object (server)
const bodyParser = require("body-parser")
 

app.use(bodyParser.urlencoded({
    extended:true
}));

const {Users} = require('../Websocket/Classe/Users')
var usersInNetwork = []
var users = new Object()

const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('../../mybdd.db', error => {
	if (error){throw error}
})

getBDD(db).then((data) => console.log(data))
/****** CONSTANTS******************************************************/

const PORT = 8080;

app.post('/inscription/submit', (req, res) => {
    //res.set('Content-Type', 'application/json')
    console.log("id : "  + req.body.id + " pwd : "+ req.body.pwd)
    if(inscription(req.body.id, req.body.pwd)){
		res.set('Content-Type', 'text/html')
		res.redirect('http://localhost:8080/home')
	}else{
		res.sendFile(`${__dirname}/public/HTML/inscription.html`)
	}
    //res.send(req.body)
})

app.post('/connexion/submit', (req, res) => {
    //res.set('Content-Type', 'application/json')
    console.log("id : "  + req.body.id + " pwd : "+ req.body.pwd)
    if(verifConnect(req.body.id, req.body.pwd)){
		res.set('Content-Type', 'text/html')
		res.redirect('http://localhost:8080/home')
	}else{
		res.sendFile(`${__dirname}/public/HTML/connexion.html`)
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


// Gestion BDD

function getBDD(db){
	return new Promise((resolve) => {
		async function getUsers(db, attribut){
			return new Promise((resolve) => {
				db.all(`SELECT DISTINCT ${attribut} FROM USERS WHERE id_USER<100`, (err, data) => { // si pas de where la liste s'affiche dans l'ordre alphabétique et c'est pas ce qu'on veut
					if(err){throw err}
					// console.log(data)
					var res = []
					data.forEach(att => {
						switch(attribut){
							case "pseudo_USER" :
								res.push(att.pseudo_USER)
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

		async function createUser(){
			return new Users()
		}

		async function final(db){
			let id = await getUsers(db, "pseudo_USER")
			// let pwd = await getUsers(db, "password_USER")
			return 
		}
		resolve(final(db))
	})
}

function inscription(id, password){
	var exist = false

	if(id=='' || password==''){
		console.log("L'un des champs est vide")
	}else{
		for(let i=0; i<usersInNetwork.length; i++){
			if (usersInNetwork[i] == id){
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
    
    for(let i=0; i<tabtab.length; i++){
		db.all(`SELECT DISTINCT password_USER FROM USERS WHERE pseudo_USER=?`,[id], (err, data) => {
			// if(data.pseudo_USER){

			// }
		})
        if(id == usersInNetwork[i].id && password == usersInNetwork[i].pwd){//l'id existe déjà
            console.log("Bonjour " + usersInNetwork[i].id)
			return true
        }else{
            console.log("Id ou Mdp incorrect")
			return false
        }
    }
}
/****** io.socket is the websocket connection to the client's browser********/

io.sockets.on('connection', function (socket) {// WebSocket Connection
    console.log('A new client logged in.');

    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });
    

}); 


 




