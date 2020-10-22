const express = require('express');
const router = express.Router();

const userController = require('../controllers/usuario.controller');
const { auth } = require('../middleware/auth');

router.post('/', auth('admin'), userController.addUsuario);
router.get('/:userID', userController.getUsuario);
router.delete('/:userID', userController.deleteUsuario);
router.patch('/password/:userID', auth('admin'), userController.patchPassword);
router.patch('/type/:userID', auth('admin'), userController.patchType);
router.get('/todos/usuarios', userController.getUsuarios);

module.exports = router;
