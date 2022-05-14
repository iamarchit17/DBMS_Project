var mysql = require('mysql2');

console.log("Creating mysql connection...");
var con = mysql.createConnection({
				  host: "localhost",
				  user: "archit",
				  password: "Comemierda@123",
				  database: "University_Database"
		   });


var query = function(q, params, callback) {
	
	console.log("connection obtained for query = " + q);
	con.query(q, params, function(err, results) {
		callback(err, results);
		//con.end();
	});
}

module.exports = { query }; 


