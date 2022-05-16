var tabtab=[{id: "coco", pwd:"123"}, {id: "mathis", pwd:"456"}, {id: "theo", pwd:"789"}]
var exist = false
const admin = document.getElementById('admin')
let delete_user = document.getElementById('delete_user')
let all = document.getElementById('all_rights')
let state = document.getElementById('state')
let remote = document.getElementById('remotly')
let local = document.getElementById('locally')
var checkStates = [null, null, null, null, null];

//admin.addEventListener('click', verifAdmin('coco')) // Récupérer le nom de l'admin dans la BDD ('coco' par défaut)

// function inscription(){
// 	// Récupération de l'id et du mdp
// 	const id = document.getElementById('id').value
// 	const password = document.getElementById('pwd').value
// 	var exist = false

// 	if(id=='' || password==''){
// 	    alert("L'un des champs est vide")
// 	}else{
// 	    for(let i=0; i<usersInNetwork.length; i++){
// 		if (usersInNetwork[i].id == id){
// 		    document.getElementById('id').remove
// 		    document.getElementById('pwd').remove
// 		    exist = true
// 		    alert('Identifiant déjà existant, connectez vous ou utilisez un autre identifiant.')
// 		}
// 	    }
// 	    if(!exist){
// 		db.run('INSERT INTO USERS(pseudo_USER, password_USER, access_history_USER, local_access_USER, remote_access_USER) VALUES(?,?,0,0,0)',[id, password])
// 		usersInNetwork.push({id: id, pwd: password})
// 	    }
// 	//     for(let i=0; i<usersInNetwork.length; i++){
// 	// 	alert(usersInNetwork[i] + ' ' +usersInNetwork[i].pwd)
// 	// 	exist=false
// 	//     }
// 	}
// }


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

// (function (global) {
//     document.getElementById('btn').addEventListener("click", function () {
//         global.localStorage.setItem("mySharedData", document.getElementById("test").value);
//     }, false);
// }(window));

// (function (global) {
//     document.getElementById("test").value = global.localStorage.getItem("mySharedData");
// }(window));




// function bdd(){
//     var sql = require('sqlite3')
//     let db = new sql.Database('../../bdd.db', error => { //récupération de la base de donnée
//         if (error)
//             throw error
//     })

//     recupBDD(db).then((data) => data)

// }

// function recupBDD(db){
//     return new Promise((resolve) => {
//         async function test(){
//             resolve("promise is working")
//         }
//     })
// }