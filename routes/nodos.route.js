const express = require('express');
const router = express.Router();

const nodesController = require('../controllers/nodes.controller');
const { auth } = require('../middleware/auth');

router.post('/', auth('admin'), nodesController.addNodo);
router.put('/', auth('admin'), nodesController.putNodo);
router.get('/:nodoID', nodesController.getNodo);
router.delete('/:nodoID', auth('admin'), nodesController.deleteNodo);
router.get('/nodos/todos', nodesController.getNodos);

module.exports = router;
