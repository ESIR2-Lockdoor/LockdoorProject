const DataStore =require('nedb')

// DB
const db = new DataStore({filename: 'users'})
db.loadDatabase()

function insertDB(object){  // JSON Object
    db.insert(object)
}
module.exports = db