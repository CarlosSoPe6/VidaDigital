const { getConnection } = require('../config/dbConfig');

async function addNodo(node){
  const db = await getConnection()

  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Nodos WHERE id = ?', nodeId ,(err, results) => {
      if (err) return reject(err);
      
      return resolve(results);
    });
}); 
}

async function getNodo(nodeId){
  const db = await getConnection()

  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Nodos WHERE id = ?', nodeId ,(err, results) => {
        if (err) return reject(err);
        
        return resolve(results);
      });
  }); 
}

async function getNodos(){
  const db = await getConnection()

  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Nodos', (err, results) => {
        if (err) return reject(err);
        
        return resolve(results);
      });
  });
}

async function putNodo(nodeId, nodeData){
  const db = await getConnection()

  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Nodos', (err, results) => {
        if (err) return reject(err);
        
        return resolve(results);
      });
  });
}

async function deleteNodo(nodeId){
  const db = await getConnection()

  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Nodos', (err, results) => {
        if (err) return reject(err);
        
        return resolve(results);
      });
  });
}

module.exports = {
    getNodos,
    addNodo,
    getNodo,
    putNodo,
    deleteNodo
}