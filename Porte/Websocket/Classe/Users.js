class Users{
        constructor(name, pwd, historyAccess, localAccess, remoteAccess ){
                this.name = name
                this.pwd = pwd
                this.historyAccess = historyAccess
                this.localAccess = localAccess
                this.remoteAccess = remoteAccess
        }

        getName(){
                return this.name
        }

}

module.exports = {Users}