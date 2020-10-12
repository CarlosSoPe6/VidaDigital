const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/usuario.controller');

const router = express.Router();
const parser = bodyParser.json();

router.get('/:userID', userController.getUsuario);
router.patch('/:userID', parser, userController.patchUsuario);
router.delete('/:userID', userController.deleteUsuario);
router.get('/todos/usuarios', userController.getUsuarios);

module.exports = router;
