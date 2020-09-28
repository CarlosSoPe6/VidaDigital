/**
 * Módulo para encapsular la instancia de validator
 * y asegurar un singleton
 * @author Carlos Soto Pérez
 */
const { Validator } = require('jsonschema');

const validator = new Validator();

module.exports = validator;
