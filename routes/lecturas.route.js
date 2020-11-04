/**
 * Módulo de ruteo del controlador de lecturas.
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const express = require('express');

const lecturasController = require('../controllers/lecturas.controller');
const valuesController = require('../controllers/values.controller');

const router = express.Router();

router.get('/', lecturasController.postLectura);
router.get('/logs', lecturasController.getLogs);
router.get('/t', lecturasController.getLecturas);
router.get('/id/:id', lecturasController.getLecturaId);
router.put('/id/:id', lecturasController.putLecturaId);
router.delete('/id/:id', lecturasController.deleteLecturaId);
router.get('/n/:id', lecturasController.getLecturasNodo);
router.get('/dia/:nodo/:anio/:mes/:dia', lecturasController.getLecturasNodoDia);
router.get('/semana/:nodo/:anio/:mes/:dia', lecturasController.getLecturasNodoSemana);
router.get('/mes/:nodo/:anio/:mes', lecturasController.getLecturasNodoMes);
router.get('/anio/:nodo/:anio', lecturasController.getLecturasNodoAnio);

/**
 * Este endpoit rompe los patrones de diseño, se realizó a petición del equipo de frontend
 */
router.get('/sensores/:nodeID', valuesController.getSensores);

module.exports = router;
