const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'sql_injection_demo',
    password: 'dat123456789',
    port: 3306
});

module.exports = pool.promise();
