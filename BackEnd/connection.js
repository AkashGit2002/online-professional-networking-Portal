const mysql =require('mysql');


const conn = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password: "",
	database: 'recruiter'
});

conn.connect(function (err) {
	
	console.log("Connected!");
});

module.exports = conn;