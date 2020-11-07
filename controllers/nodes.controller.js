/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de nodos.
 * Este archivo contiene todos los endpoints del controlador de nodos.
 * @author Héctor Chávez Morales <hector.chavez.97@hotmail.com>
 */

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "express" }] */
const express = require('express');
const nodesModel = require('../db/nodes.model');
const getSensores = require('../db/values.model');
const { validarEsquema } = require('../validators/nodes');
const { executionContext } = require('../db/executionContext');

/**
 * POST /api/nodo
 * @async
 * @exports addNodo
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function addNodo(req, res) {
  const nodo = req.body;

  const errors = await validarEsquema(nodo);
  if (errors.length > 0) {
    res.status(400).send(errors[0].stack);
  } else {
    executionContext((context) => {
      const { connection } = context;

      nodesModel.addNodo(connection, nodo)
        .then(() => res.sendStatus(201))
        .catch((err) => {
          if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
            res.status(400).send(err.sqlMessage);
          } else {
            res.status(500).send(err);
          }
        });
    });
  }
}

/**
 * PUT /api/nodo
 * @async
 * @exports putNodo
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function putNodo(req, res) {
  const nodo = req.body;

  const errors = await validarEsquema(nodo);
  if (errors.length > 0) {
    res.status(400).send(errors[0].stack);
  } else {
    executionContext((context) => {
      const { connection } = context;

      nodesModel.putNodo(connection, nodo)
        .then((val) => {
          if (val.changedRows === 0) { res.sendStatus(400); } else { res.sendStatus(200); }
        })
        .catch((err) => {
          if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
            res.status(400).send(err.sqlMessage);
          } else {
            res.status(500).send(err);
          }
        });
    });
  }
}

/**
 * GET /api/nodo/:id
 * @async
 * @exports getNodo
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getNodo(req, res) {
  const userId = req.params.nodoID;

  executionContext((context) => {
    const { connection } = context;

    nodesModel.getNodo(connection, userId)
      .then((val) => res.send(val[0]))
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  });
}

/**
 * DELETE /api/nodo/:id
 * @async
 * @exports deleteNodo
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function deleteNodo(req, res) {
  const nodeId = req.params.nodoID;

  executionContext(async (context) => {
    const { connection } = context;

    await getSensores.deleteAllNodeSensors(connection, nodeId)
      .catch((err) => res.status(500).send(err));

    nodesModel.deleteNodo(connection, nodeId)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  });
}

/**
 * GET /api/nodo/nodos
 * @async
 * @exports getNodos
 * @param {express.Request} req Request parameter.
 * @param {express.Response} res Response parameter.
 */
async function getNodos(req, res) {
  executionContext((context) => {
    const { connection } = context;

    nodesModel.getNodos(connection)
      .then((val) => res.send(val))
      .catch((err) => {
        if (Object.prototype.hasOwnProperty.call(err, 'sqlMessage')) {
          res.status(400).send(err.sqlMessage);
        } else {
          res.status(500).send(err);
        }
      });
  });
}

module.exports = {
  addNodo,
  putNodo,
  getNodo,
  getNodos,
  deleteNodo,
};
