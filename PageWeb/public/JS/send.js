var tabtab=[{id: "coco", pwd:"123"}, {id: "mathis", pwd:"456"}, {id: "theo", pwd:"789"}]
var exist = false
const admin = document.getElementById('admin')

admin.addEventListener('click', verifAdmin('coco')) // Récupérer le nom de l'admin dans la BDD ('coco' par défaut)

function inscription(){
    // Récupération de l'id et du mdp
    const id = document.getElementById('id').value
    const password = document.getElementById('pwd').value

    if(id=='' || password==''){
        alert("L'un des champs est vide")
    }else{
        for(let i=0; i<tabtab.length; i++){
            // if (tabtab[i].id == id){
            //     document.getElementById('id').remove
            //     document.getElementById('pwd').remove
            //     exist = true
            //     alert('Identifiant déjà existant, veuillez vous connecter.')
            // }
        }
        if(!exist){
            tabtab.push({id: id, pwd: password})
        }
        for(let i=0; i<tabtab.length; i++){
            alert(tabtab[i].id + ' ' +tabtab[i].pwd)
            exist=false
        }
    }
}

function verifConnect(){
    const id = document.getElementById('id').value
    const password = document.getElementById('pwd').value
    
    if(tabtab.length == 0){
        return document.getElementById('textError').innerHTML = "Error, DB is empty"
    }
    
    for(let i=0; i<tabtab.length; i++){
        if(id == tabtab[i].id && password == tabtab[i].pwd){//l'id existe déjà
            document.getElementById('textError').innerHTML = "Bonjour " + tabtab[i].id
            document.getElementById('btn').href = "Home"
        }else{
            document.getElementById('id').remove
            document.getElementById('pwd').remove
            document.getElementById('textError').innerHTML = "Id ou Mdp incorrect"
        }
    }
}

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