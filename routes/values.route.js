const express = require('express');
const router = express.Router();

const valuesController = require('../controllers/values.controller');
const { auth } = require('../middleware/auth');

router.get('/sensores/:nodeID', valuesController.getSensores);
router.get('/nodos/:sensorID', valuesController.getNodes);
router.get('/nodo/:nodeID/sensor/:sensorID', valuesController.getNodeHasSensor);
router.delete('/nodo/:nodeID/sensor/:sensorID', auth('admin'), valuesController.deleteNodeSensor);
router.post('/nodo/sensor', auth('admin'), valuesController.addNodeSensor);

module.exports = router;
