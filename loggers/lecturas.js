/**
 * Módulo auxiliar para guardar registros de lecturas.
 * Este archivo solo exporta una instancia de simple logger
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const SimpleLogger = require('simple-node-logger');

const log = SimpleLogger.createSimpleLogger('lecturas.log');
log.setLevel('info');

module.exports = log;
