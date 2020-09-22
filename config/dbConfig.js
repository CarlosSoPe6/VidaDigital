const mysql = require('mysql');

const mysqlConfig = {
  connectionLimit: 64,
  connectTimeout: 60 * 1000,
  acquireTimeout: 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: "papvidadigital.mysql.database.azure.com",
  user: "mastercontrol@papvidadigital",
  password: "M@sterc0ntrO!AA3F69",
  database: "papvida1_nodosO2020",
};

const pool = mysql.createPool(mysqlConfig);

/**
 * @returns {Promise<import('mysql').PoolConnection>}
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
