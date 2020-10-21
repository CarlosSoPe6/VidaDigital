/**
 * Módulo de ruteo del controlador de autentificación.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', authController.login);
router.delete('/logout', authController.logout);

module.exports = router;
