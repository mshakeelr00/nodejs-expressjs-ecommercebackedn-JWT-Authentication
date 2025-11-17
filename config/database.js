//const database = require("mysql2");   //common js approach

import database from 'mysql2';


const db = database.createConnection({
    host:process.env.HOST,            //env file variables
    user:process.env.USER,
    password: process.env.PASS,
    database:process.env.DBNAME,
});

db.connect(error => {
    if (error) {
        console.log("Connection error");
    } else {
        console.log("Connection success");
    }
});


//module.exports = db;   //common js approach

export default db; //module approach