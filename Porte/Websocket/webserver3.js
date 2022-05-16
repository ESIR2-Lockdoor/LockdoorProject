const express = require('express')
const app = express()
const server = require('http').createServer(app)
var io = require('socket.io','net')(server) //require socket.io module and pass the http object (server)
const bodyParser = require("body-parser")
var user
var pass
var historyAccess
var remoteAccess
var localAccess
 

app.use(bodyParser.urlencoded({
    extended:true
}));

const {Users} = require('../Websocket/Classe/Users')
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
    
    for(let i=0; i<usersInNetwork.length; i++){
		console.log("type of data.password_USER : " + typeof data.password_USER+"\n"+
					"type of password params : " + typeof password + "\n"+
					"type of usersInNetwork[i] : " + typeof usersInNetwork[i]+"\n" +
					"type of id : " + typeof id+"\n")
		if(usersInNetwork[i].name == id && usersInNetwork[i].pwd == password){
			console.log("ID trouvé " + usersInNetwork[i].name + " son mdp est " + usersInNetwork[i].pwd)
			console.log("return true")
			return true	// utilisateur identifé (pseudo existant et password correcte)
		}
    }
	console.log("return false")
	return false
}
/****** io.socket is the websocket connection to the client's browser********/

io.sockets.on('connection', function (socket) {// WebSocket Connection
    console.log('A new client logged in.');

    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });
    

}); 


 




