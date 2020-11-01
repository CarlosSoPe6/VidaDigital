const express = require('express');

const router = express.Router();

const valuesController = require('../controllers/values.controller');
const { auth } = require('../middleware/auth');
const { verify } = require('../middleware/verify');

router.get('/sensores/:nodeID', valuesController.getSensores);
router.get('/nodos/:sensorID', valuesController.getNodes);
router.get('/nodo/:nodeID/sensor/:sensorID', valuesController.getNodeHasSensor);
router.delete('/nodo/:nodeID/sensor/:sensorID', auth, verify, valuesController.deleteNodeSensor);
router.post('/nodo/sensor', auth, verify, valuesController.addNodeSensor);

module.exports = router;
