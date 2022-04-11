const express = require('express')      //npm install express
const app = express() //Start Express    //npm install nedb
const WebSocket = require('ws')         //npm install ws
const server = require('http').createServer(app)
const PORT = 8080
const db = require('./db')

// WebSocket
const wss = new WebSocket.Server({ server:server })

wss.on('connection', (ws) => {
    console.log("A new client Connected")
    ws.send('Welcome new client')

    ws.on('message', (message) => {
        console.log('received : %s', message)
        ws.send('Got ur message its : ' + message)
    })
})

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/HTML/main.html`)
})

app.get('/connexion', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/HTML/connexion.html`)
})

app.get('/inscription', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/HTML/inscription.html`)
})

app.get('/Home', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/HTML/Home.html`)
})

app.get('/adminsettings', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(`${__dirname}/HTML/adminsettings.html`)
})

app.get('/JSsend', (req, res) => {
    res.set('Content-Type', 'text/javascript')
    res.sendFile(`${__dirname}/JS/send.js`)
})


server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})
