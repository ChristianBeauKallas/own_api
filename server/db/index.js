const mysql = require("mysql2")
const config = require("../config")

const connection = mysql.createPool(config.mysql);

connection.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
        connection.release();
    }
});

module.exports = connection;