const express = require('express');
const bodyParser = require('body-parser');
const valuesController = require('../controllers/values.controller');

const router = express.Router();
const parser = bodyParser.json();

router.get('/sensores/:nodeID', valuesController.getSensores);
router.get('/nodes/:sensorID', valuesController.getNodes);
router.get('/node/:nodeID/sensor/:sensorID', valuesController.getNodeHasSensor);
router.delete('/node/:nodeID/sensor/:sensorID', valuesController.deleteNodeSensor);
router.put('/node/:nodeID/sensor/:sensorID', valuesController.putNodeSensor);

module.exports = router;
