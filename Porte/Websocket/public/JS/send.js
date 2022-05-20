var tabtab=[{id: "coco", pwd:"123"}, {id: "mathis", pwd:"456"}, {id: "theo", pwd:"789"}]
var exist = false
const admin = document.getElementById('admin')
let delete_user = document.getElementById('delete_user')
let all = document.getElementById('all_rights')
let state = document.getElementById('state')
let remote = document.getElementById('remotly')
let local = document.getElementById('locally')
var checkStates = [null, null, null, null, null];

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

