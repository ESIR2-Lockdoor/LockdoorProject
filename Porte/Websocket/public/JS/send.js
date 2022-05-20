var tabtab=[{id: "coco", pwd:"123"}, {id: "mathis", pwd:"456"}, {id: "theo", pwd:"789"}]
var exist = false
const admin = document.getElementById('admin')
let delete_user = document.getElementById('delete_user')
let all = document.getElementById('all_rights')
let state = document.getElementById('state')
let remote = document.getElementById('remotly')
let local = document.getElementById('locally')
var checkStates = [null, null, null, null, null];

window.onload = function(){
    
}
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

