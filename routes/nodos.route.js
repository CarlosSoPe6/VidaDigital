/**
 * Módulo de ruteo del controlador de nodos.
 * @author Hector Chavez Morales <hector.chavez.97@hotmail.com>
 */
const express = require('express');

const router = express.Router();

const nodesController = require('../controllers/nodes.controller');
const { auth } = require('../middleware/auth');
const { verify } = require('../middleware/verify');

router.post('/', auth, verify, nodesController.addNodo);
router.put('/', auth, verify, nodesController.putNodo);
router.get('/:nodoID', nodesController.getNodo);
router.delete('/:nodoID', auth, verify, nodesController.deleteNodo);
router.get('/nodos/todos', nodesController.getNodos);

module.exports = router;
