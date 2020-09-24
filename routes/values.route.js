const express = require('express');
const bodyParser = require('body-parser');
const valuesController = require('../controllers/values.controller');

const router = express.Router();
const parser = bodyParser.json();

router.get('/sensores/:nodeID', valuesController.getSensores);
router.get('/nodos/:sensorID', valuesController.getNodes);
router.get('/nodo/:nodeID/sensor/:sensorID', valuesController.getNodeHasSensor);
router.delete(
  '/nodo/:nodeID/sensor/:sensorID',
  valuesController.deleteNodeSensor,
);
router.put(
  '/nodo/:nodeID/sensor/:sensorID',
  parser,
  valuesController.putNodeSensor,
);

module.exports = router;
