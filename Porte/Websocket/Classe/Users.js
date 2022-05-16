class Users{
        constructor(name, historyAccess, localAccess, remoteAccess ){
                this.name = name
                this.historyAccess = historyAccess
                this.localAccess = localAccess
                this.remoteAccess = remoteAccess
        }

        getName(){
                return this.name
        }

}

module.exports = {Users}