const mysql = require('mysql');

module.exports = {
    connection: function () {
        return mysql.createConnection({
            host     : 'localhost',
            port     : 3306,
            user     : 'root',
            password : 'senha',
            database : 'db'
        });
    },    
    executeSQLQueryParams: function (sql, params, callback) {
        const conn = this.connection();
        conn.query(sql,params, function(error, results, fields){        
            callback(error, results, fields);
            conn.end();
        });       
    },    
    executeSQLQuery: function (sql, callback) {
        const conn = this.connection();    
        conn.query(sql, function(error, results, fields){
            callback(error, results, fields)
        });    
    }
}