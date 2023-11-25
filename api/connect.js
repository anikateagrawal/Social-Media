const mysql=require("mysql");

module.exports.db=mysql.createConnection({
    host:"localhost",
    user:"root",
    port:"3308",
    password:"",
    database:"social"
})