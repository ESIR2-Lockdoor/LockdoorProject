var tabtab=[{id: "coco", pwd:"123"}, {id: "mathis", pwd:"456"}, {id: "theo", pwd:"789"}]
var exist = false
const admin = document.getElementById('admin')
let delete_user = document.getElementById('delete_user')
let all = document.getElementById('all_rights')
let state = document.getElementById('state')
let remote = document.getElementById('remotly')
let local = document.getElementById('locally')
var checkStates = [null, null, null, null, null];

//const express = require('express')
//const app = express()
//const server = require('http').createServer(app)
//var io = require('socket.io','net')(client) //require socket.io module and pass the http object (server)



var socket = io(); //load socket.io-client and connect to the host that serves the page
socket.on('connection', function (socket) {// WebSocket Connection
    console.log('FROM CLIENT : a new client is connecting');
    socket.emit('Hello Server I am a new client')

    socket.on('I RECEIVED YOU NEW CLIENT', function(){
        console.log("on a recu un feedback du server");
    })
    socket.on('base de donnees a jour'), function(){
        console.log('le serveur nous envoie la base de données !!')
    }
    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });
    

}); 

function verifAdmin(id){
    if(id == tabtab[0].id){
        document.getElementById('admin').href = "adminsettings"
    }
}

var expanded = false
function showCheckBoxes(){
      var checkboxes = document.getElementById('checkboxes')
      if(!expanded){
          checkboxes.style.display = "block"
          expanded = true
      }else{
          checkboxes.style.display = "none"
          expanded = false
      }
}

function submit(){
    var delete_user
    var all_rights
    var state_door
    var modify_remotly
    var modify_locally
}

function add_hours(){
    // Create element
    var para = document.getElementById('select_period')
    var newPara = document.createElement('p')
    var newInput = document.createElement('input')
    var newLabel = document.createElement('label')
    var newSelectHour1 = document.createElement('select')
    var newSelectMinute1 = document.createElement('select')
    var newSelectHour2 = document.createElement('select')
    var newSelectMinute2 = document.createElement('select')
    var textLabel = document.createTextNode('De')
    var textPara_h = document.createTextNode('h')
    var textPara_a = document.createTextNode('à')

    // Add params
    newInput.id = "hours_range_1"
    newInput.type = "radio"

    // Include child in parents
    newPara.appendChild(newInput)
    newPara.appendChild(newLabel)
    newLabel.appendChild(textLabel)
    for(let i=0; i<24; i++){
        newSelectHour1.appendChild(create_option_hours(i))
    }
    newPara.appendChild(newSelectHour1)
    newPara.appendChild(textPara_h)
    for(let i=0; i<12; i++){
        newSelectMinute1.appendChild(create_option_minutes(i))
    }
    newPara.appendChild(newSelectMinute1)
    newPara.appendChild(textPara_a)
    for(let i=0; i<24; i++){
        newSelectHour2.appendChild(create_option_hours(i))
    }
    newPara.appendChild(newSelectHour2)
    newPara.appendChild(textPara_h)
    for(let i=0; i<12; i++){
        newSelectMinute2.appendChild(create_option_minutes(i))
    }
    newPara.appendChild(newSelectMinute2)
    
    document.body.insertBefore(newPara, para)
}

function create_option_minutes(i) { 
    var newOptionMinute = document.createElement('option')
    newOptionMinute.value = i*5
    if(newOptionMinute.value < 10){
        newOptionMinute.value = '0' + newOptionMinute.value
    }
    var texte = document.createTextNode(newOptionMinute.value)
    newOptionMinute.appendChild(texte)
    return newOptionMinute
}

function create_option_hours(i) { 
    var newOptionHour = document.createElement('option')
    newOptionHour.value = i
    if(newOptionHour.value < 10){
        newOptionHour.value = '0' + newOptionHour.value
    }
    var texte = document.createTextNode(newOptionHour.value)
    newOptionHour.appendChild(texte)
    return newOptionHour
}



function checkAll(){
    if(all.checked){
        state.checked = true
        local.checked = true
        remote.checked = true
    }else{   
        state.checked = false
        local.checked = false
        remote.checked = false
    }
    returnCheckStates();
}

function returnCheckStates(){
    checkStates[0] = delete_user.checked
    checkStates[1] = all.checked
    checkStates[2] = state.checked
    checkStates[3] = remote.checked
    checkStates[4] = local.checked
    console.log("etat des checkbox : ", checkStates)
    return checkStates;
}

function uncheckAll(myCheckbox){
    let all = document.getElementById('all_rights')
    
    if(!myCheckbox.checked){
        all.checked = false
    }
    returnCheckStates();
}
