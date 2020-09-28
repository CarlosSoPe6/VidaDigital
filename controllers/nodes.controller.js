const nodesModel = require("../db/nodes.model");
const getSensores = require('../db/values.model')

/**
 * POST /api/nodo
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function addNodo(req, res) {
  const nodo = req.body;

  nodesModel.addNodo(nodo)
    .then((val) => res.sendStatus(201)) 
    .catch((err) => {
      if (err.code === 'ER_DUP_ENTRY'){
        res.status(400).send(err.sqlMessage)
      }  
      else{
        res.status(500).send(err)
      } 
  });
}

/**
 * PUT /api/nodo
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function putNodo(req, res) {
  const node = req.body;

  nodesModel.putNodo(node)
  .then((val) => res.send(val))
  .catch((err) => res.send(err))
}

/**
 * GET /api/nodo/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getNodo(req, res) {
  const userID = req.params.nodoID;

  nodesModel.getNodo(userID)
  .then((val) => res.send(val[0]))
  .catch((err) => res.status(400).send(err))
}

/**
 * DELETE /api/nodo/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function deleteNodo(req, res) {
  const nodeId = req.params.nodoID;

  await getSensores.deleteAllNodeSensors(nodeId).catch(err => console.log(err))
  
  nodesModel.deleteNodo(nodeId)
  .then((val) => res.sendStatus(200))
  .catch((err) => res.sendStatus(500))
}

/**
 * GET /api/nodo/nodos
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getNodos(req, res) {
  nodesModel.getNodos()
  .then((val) => res.send(val))
  .catch((err) => res.status(500).send(err.sqlMessage))
}

module.exports = {
  addNodo,
  putNodo,
  getNodo,
  getNodos,
  deleteNodo,
};
