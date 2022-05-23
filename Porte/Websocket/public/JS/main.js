

/************PROCESS DATA TO/FROM Client****************************/

	
var socket = io(); //load socket.io-client and connect to the host that serves the page

// Etat de la porte page Home
var stateDoor = document.getElementById('stateDoor')
var globalH = document.getElementById('globalHistory')

// navbar
var myProfil = document.getElementById('myProfil')
var home = document.getElementById('home')
var settings = document.getElementById('settings')

// Page Settings
var pseudo = document.getElementById('pseudo')
var delete_user = document.getElementById('delete_user')
var all_rights = document.getElementById('all_rights')
var state = document.getElementById('state')
var remote = document.getElementById('remotly')
var locally = document.getElementById('locally')
var checkStates = [null, null, null, null, null];
var submitSettings = document.getElementById('btnSub')

var nameOfClient
// var name = document.getElementById('nomClient').split(' ')[1]
window.addEventListener("load", function(){ //when page loads
  if( isMobile.any() ) {
//    alert('Mobile');  
    document.addEventListener("touchstart", ReportTouchStart, false);
    document.addEventListener("touchend", ReportTouchEnd, false);
    document.addEventListener("touchmove", TouchMove, false);
  }else{
//    alert('Desktop');  
    document.addEventListener("mouseup", ReportMouseUp, false);
    document.addEventListener("mousedown", ReportMouseDown, false);
  }
  
});
// socket.on('nomClient', function(nom){
//   nom = nom[0].toUpperCase() + nom.slice(1) 
//   document.getElementById('nomClient').innerHTML = "Bonjour " + nom
// })

if(home.className == "is-active"){
    socket.emit('IWantStateDoor')
}

if(myProfil.className == "is-active"){
    socket.emit('IWantMyName')
}

if(settings.className == "is-active"){
  socket.emit('IWantAdmin')
}

socket.on('nomClient', function(nom){
    nom = nom[0].toUpperCase() + nom.slice(1) 
    nameOfClient = nom
    document.getElementById('nomClient').innerHTML = "Bonjour " + nom 
    socket.emit('getHistory')
})

socket.on('history', function(data){
    var elementHistory = document.getElementById('history')
    let elem = '\n'
    for(let i=0; i<data.length; i++){
        elem = nameOfClient + ' ' + data[i].actionH + ' à '+ data[i].timeH + '\n' + '<br>' + elem  
    }
    elementHistory.innerHTML = elem
    
})

socket.on('stateDoor', function(data) {
    data = JSON.parse(data)
    var gache = document.getElementById('gache')
    if(data.state==1){
        gache.checked = 1
        stateDoor.innerHTML = "Porte déverrouillée"
    }else{
        gache.checked = 0
        stateDoor.innerHTML = "Porte verrouillée"
    }
    let elem = '\n'
    console.log(data.data.length)
    for(let i=0; i<data.data.length; i++){
      console.log(elem)
      elem = data.data[i].pseudo + ' ' + data.data[i].actionH + ' à '+ data.data[i].timeH + '\n' + '<br>' + elem
    }
    globalH.innerHTML = elem
})

socket.on('NoAccessStateDoor', function(){
  // document.getElementById('gache').style.display = "none"
  document.getElementById('gacheM').style.display = "none"
  stateDoor.innerHTML = "Demandez au propriétaire de la porte si vous voulez connaitre l'état de la porte"
})

socket.on('admin', function(data){
  data = JSON.parse(data)

  if(data.data[0].pseudo_USER != data.user){ // nameOfClient est disponible que si le client a ouvert la page myProfil
    pseudo.disabled = true
    delete_user.disabled = true
    all_rights.disabled = true
    state.disabled = true
    remotly.disabled = true
    locally.disabled = true
    submitSettings.style.display = "none";
  }

  socket.emit('IWantAccess')
})

socket.on('access', function(data){
  state.checked = data[0].history
  remotly.checked = data[0].remote
  locally.checked = data[0].local
})

socket.on('pseudoNotFound', function(data){
  let message = document.getElementById('message')
  message.innerHTML = "ID lockdoor introuvable : " + data
})

socket.on('pseudoFound', function(data){
  let message = document.getElementById('message')
  message.innerHTML = "Mis à jour des paramètres de l'utilisateur " + data + " réussie."
})

socket.on('deleteUser', function(data){
  let message = document.getElementById('message')
  message.innerHTML = data + " a été supprimé de la base de données."
})

//Update gpio feedback when server changes LED state
socket.on('gache', function (data) {  
//  console.log('GPIO26 function called');
//  console.log(data);
  var myJSON = JSON.stringify(data);
//  console.log(myJSON);
  document.getElementById('gache').checked = data;
//  console.log('GPIO26: '+data.toString());
});

// function ReportTouchStart(e) {
//   var y = e.target.previousElementSibling;
//   if (y !== null) var x = y.id;
//   if (x !== null) { 
//   // Now we know that x is defined, we are good to go.
//     if (x === "gache") {
//  //     console.log("GPIO26 toggle");
//       socket.emit("gacheT");  // send GPIO button toggle to node.js server
//     } 
//   }

//   if (e.target.id === "gacheM") {
//     socket.emit("gache", 1); 
//     document.getElementById('gache').checked = 1;
//   } 
// }

// function ReportTouchEnd(e) {
//   if (e.target.id === "gacheM") {
//     socket.emit("gache", 0); 
//     document.getElementById('gache').checked = 0;
//   }
// }

function setSettings(){
  socket.emit('setSettings', JSON.stringify({pseudo: pseudo.value, delete: delete_user.checked, history: state.checked, remote: remote.checked, local: locally.checked}))
}
function ReportMouseDown(e) {
  
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) { 
  // Now we know that x is defined, we are good to go.
    if (x === "gache") {
 //     console.log("GPIO26 toggle");
      socket.emit("gacheT");  // send GPIO button toggle to node.js server
    } 
}

  if (e.target.id === "gacheM") {
 //   console.log("GPIO26 pressed");
    socket.emit("gache", 1); 
    document.getElementById('gache').checked = 1;
    stateDoor.innerHTML = "Porte déverrouillée"

  } 
}


function ReportMouseUp(e) {
  if (e.target.id === "gacheM") {
    socket.emit("gache", 0); 
    document.getElementById('gache').checked = 0;
    stateDoor.innerHTML = "Porte verrouillée"
  }
}

function TouchMove(e) {

}

function checkAll(){
  if(all_rights.checked){
      state.checked = true
      locally.checked = true
      remote.checked = true
  }else{   
      state.checked = false
      locally.checked = false
      remote.checked = false
  }
  returnCheckStates();
}

function returnCheckStates(){
  checkStates[0] = delete_user.checked
  checkStates[1] = all_rights.checked
  checkStates[2] = state.checked
  checkStates[3] = remote.checked
  checkStates[4] = locally.checked
  console.log("etat des checkbox : ", checkStates)
  return checkStates;
}

function uncheckAll(myCheckbox){
  // let all = document.getElementById('all_rights')
  
  if(!myCheckbox.checked){
      all_rights.checked = false
  }
  returnCheckStates();
}

/** function to sense if device is a mobile device ***/
// Reference: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};



