const nodesModel = require("../db/nodes.model");

/**
 * POST /api/nodo
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function addNodo(req, res) {
  let nodo = req.body;

  nodesModel.addNodo(nodo)
    .then((val) => res.sendStatus(201))
    .catch((err) => {
      if (err.code === 'ER_DUP_ENTRY')  return res.sendStatus(400)
      else return res.sendStatus(500)
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
  const nodeData = req.body;
  const nodeId = nodeData.id;

  let query = await nodesModel.putNodo(nodeId, nodeData);
  res.json(query);
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

  let query = await nodesModel.getNodo(userID);
  res.json(query);
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

  let query = await nodesModel.deleteNodo(nodeId);
  res.json(query);
}

/**
 * GET /api/nodo/nodos
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getNodos(req, res) {
  let query = await nodesModel.getNodos();
  res.json(query);
}

module.exports = {
  addNodo,
  putNodo,
  getNodo,
  getNodos,
  deleteNodo,
};
