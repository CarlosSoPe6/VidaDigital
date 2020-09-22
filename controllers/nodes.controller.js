const nodesModel = require('../db/nodes.model');

/**
 * POST /api/nodo
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function addNodo(req, res){
    let nodo = req.body
    
    await nodesModel.addNodo(nodo)
    res.sendStatus(200)
}

/**
 * GET /api/nodo/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getNodo(req, res){
    const userID = req.params.id

    let query = await nodesModel.getNodo(userID)
    res.json(query)
}

/**
 * GET /api/nodo/nodos
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function getNodos(req, res){
    let query = await nodesModel.getNodos()
    res.json(query);
}

/**
 * PUT /api/nodo/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function putNodo(req, res){
    const nodeId = req.params.nodeID
    const nodeData = req.body

    let query = await nodesModel.putNodo(nodeId, nodeData)
    res.json(query)
}

/**
 * DELETE /api/nodo/:id
 * @async
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
async function deleteNodo(req, res){
    const nodeId = req.params.nodeID

    let query = await nodesModel.deleteNodo(nodeId)
    res.json(query)
}

module.exports = {
    addNodo,
    getNodo,
    getNodos,
    putNodo,
    deleteNodo
}