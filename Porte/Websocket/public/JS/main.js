


/************PROCESS DATA TO/FROM Client****************************/

	
var socket = io(); //load socket.io-client and connect to the host that serves the page
var stateDoor = document.getElementById('stateDoor')

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

socket.on('nomClient', function(nom){
  nom = nom[0].toUpperCase() + nom.slice(1)
  document.getElementById('nomClient').innerHTML = nom
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

function ReportTouchStart(e) {
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
    socket.emit("gache", 1); 
    document.getElementById('gache').checked = 1;
  } 
}

function ReportTouchEnd(e) {
  if (e.target.id === "gacheM") {
    socket.emit("gache", 0); 
    document.getElementById('gache').checked = 0;
  }
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



