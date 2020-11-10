const mysql = require('mysql');

const mysqlConfig = {
  connectionLimit: 8,
  connectTimeout: 10 * 1000,
  acquireTimeout: 10 * 1000,
  timeout: 10 * 1000,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const pool = mysql.createPool(mysqlConfig);

/**
 * @returns {mysql.PoolConnection}
 */
const getConnection = () => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return reject(err);
    }
    return resolve(connection);
  });
});

module.exports = { getConnection };
