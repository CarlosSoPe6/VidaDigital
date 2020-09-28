/**
 * Módulo de ruteo del controlador de variables.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const express = require('express');

const variablesController = require('../controllers/variables.controller');

const router = express.Router();

router.get('/', variablesController.getVariables);
router.post('/', variablesController.postVarialbe);
router.get('/:code', variablesController.getVarialbe);
router.put('/:code', variablesController.putVarialbe);
router.delete('/:code', variablesController.deleteVarialbe);

module.exports = router;
