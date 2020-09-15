const express = require('express');

const variablesController = require('../controllers/variables.controller');

const router = express.Router();

router.get('/', variablesController.getVariables);

module.exports = router;
