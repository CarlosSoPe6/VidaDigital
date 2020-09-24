const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/usuario.controller');

const router = express.Router();
const parser = bodyParser.json();

router.get('/:userID', userController.getUsuarioById);
router.patch('/:userID', parser, userController.patchUsuario);
router.delete('/:userID', userController.deleteUsuario);
router.get('/usuarios', userController.getUsuarios);
router.get('/nombre/:username', userController.getUsuarioByName);

module.exports = router;
