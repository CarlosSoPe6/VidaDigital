const mysql = require('mysql');

const mysqlConfig = {
    connectionLimit : 64,
    host:  process.env.MYSQL_HOST,
    user:  process.env.MYSQL_USER,
    password:  process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const pool = mysql.createPool(mysqlConfig);

const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                return reject(err);
            }
            resolve(connection);
        })
    });
};

module.exports = { getConnection };
