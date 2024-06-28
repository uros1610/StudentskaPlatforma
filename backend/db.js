var mysql = require('mysql2')

 const dbConf = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'root',
    database:'StudentskaPlatforma',
})




module.exports = dbConf