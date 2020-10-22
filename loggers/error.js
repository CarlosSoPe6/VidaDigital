/**
 * Módulo auxiliar para guardar registros de lecturas.
 * Este archivo solo exporta una instancia de simple logger
 * @author Carlos Soto Pérez <carlos348@outlook.com>
 */
const SimpleLogger = require('simple-node-logger');

const opts = {
  logFilePath: 'errors.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

const log = SimpleLogger.createSimpleLogger(opts);
log.setLevel('error');

module.exports = (message) => log.log('error', message);
