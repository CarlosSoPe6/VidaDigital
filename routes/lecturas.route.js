const express = require('express');

const lecturasController = require('../controllers/lecturas.controller');

const router = express.Router();

router.get('dia/:nodo/:anio/:mes/:dia', lecturasController.getLecturasNodoDia);
router.get('semana/:nodo/:anio/:mes/:dia', lecturasController.getLecturasNodoSemana);
router.get('mes/:nodo/:anio/:mes', lecturasController.getLecturasNodoMes);
router.get('anio/:nodo/:anio', lecturasController.getLecturasNodoAnio);

module.exports = router;
