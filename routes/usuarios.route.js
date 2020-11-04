/**
 * Módulo de ruteo del controlador de usuarios.
 * @author Hector Chavez Morales <hector.chavez.97@hotmail.com>
 */
const express = require('express');

const router = express.Router();

const userController = require('../controllers/usuario.controller');
const { auth } = require('../middleware/auth');
const { verify } = require('../middleware/verify');

router.post('/', auth, verify, userController.addUsuario);
router.get('/:userID', auth, userController.getUsuario);
router.delete('/:userID', auth, userController.deleteUsuario);
router.patch('/password/:userID', auth, userController.patchPassword);
router.patch('/type/:userID', auth, verify, userController.patchType);
router.get('/todos/usuarios', auth, userController.getUsuarios);

module.exports = router;
