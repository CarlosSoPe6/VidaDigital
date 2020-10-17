/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de node-values (valores).
 * Este archivo contiene todos los endpoints del controlador de node-values (valores).
 * @author Héctor Chávez Morales <hector.chavez.97@hotmail.com>
 */
const valuesController = require('../db/values.model');
const { executionContext } = require("../db/executionContext");

/**
 * GET /api/values/sensores/:nodeID
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
function getSensores(req, res) {
  const nodeId = req.params.nodeID;

  executionContext((context) => {
    const { connection } = context

    valuesController.getSensores(connection, nodeId)
    .then((val) => res.send(val))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } 
      else {
        res.status(500).send(err);
      }
    });
  })

}

/**
 * GET /api/values/nodes/:sensorID
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
function getNodes(req, res) {
  const sensorId = req.params.sensorID;

  executionContext((context) => {
    const { connection } = context

    valuesController.getNodes(connection, sensorId)
    .then((val) => res.send(val))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } 
      else {
        res.status(500).send(err);
      }
    });
  })

}

/**
 * GET /api/node/:nodeID/sensor/:sensorID
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
function getNodeHasSensor(req, res) {
  const nodeId = req.params.nodeID;
  const sensorId = req.params.sensorID;

  executionContext((context) => {
    const { connection } = context

    valuesController.getNodeHasSensor(connection, nodeId, sensorId)
    .then((val) => {
      const ans = val[0].Exist;
      res.json(ans);
    })
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } 
      else {
        res.status(500).send(err);
      }
    });
  })

}

/**
 * DELETE /api/node/:nodeID/sensor/:sensorID
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
function deleteNodeSensor(req, res) {
  const nodeId = req.params.nodeID;
  const sensorId = req.params.sensorID;

  executionContext((context) => {
    const { connection } = context

    valuesController.deleteNodeSensor(connection, nodeId, sensorId)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } 
      else {
        res.status(500).send(err);
      }
    });
  })

}

/**
 * PUT /api/node/:nodeID/sensor/:sensorID
 * @exports
 * @param {import('express').Request} req Request parameter.
 * @param {import('express').Response} res Response parameter.
 */
function addNodeSensor(req, res) {
  const nodeId = req.body.nodeID;
  const sensorId = req.body.sensorID;

  executionContext((context) => {
    const { connection } = context

    valuesController.addNodeSensor(connection, nodeId, sensorId)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
        res.status(400).send(err.sqlMessage);
      } 
      else {
        res.status(500).send(err);
      }
    });    
  })

}

module.exports = {
  getSensores,
  getNodes,
  getNodeHasSensor,
  deleteNodeSensor,
  addNodeSensor,
};
