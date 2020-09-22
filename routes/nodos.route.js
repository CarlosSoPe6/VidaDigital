const express = require('express');
const bodyParser = require('body-parser');
const nodesController = require('../controllers/nodes.controller');

const router = express.Router();
const parser = bodyParser.json();

router.post('/', parser, nodesController.addNodo);
router.get('/:nodeID', nodesController.getNodo);
router.get('/nodos', nodesController.getNodos);
router.put('/node/:nodeID', parser, nodesController.putNodo);
router.delete('/node/:nodeID', nodesController.deleteNodo);

module.exports = router;
