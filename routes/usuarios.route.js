const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/usuario.controller');

const router = express.Router();
const parser = bodyParser.json();

router.post('/', parser, userController.addUsuario);
router.get('/:userID', userController.getUsuario);
router.delete('/:userID', userController.deleteUsuario);
router.patch('/password/:userID', parser, userController.patchPassword);
router.patch('/type/:userID', parser, userController.patchType);
router.get('/todos/usuarios', userController.getUsuarios);

module.exports = router;
