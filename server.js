/**
 * Módulo main del proyecto VidaDigital
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const swaggerUI = require('swagger-ui-express');
const swaggerNodosDoc = require('./config/swagger.nodos.json');
const swaggerCovidDoc = require('./config/swagger.covid.json');

const app = express();

const authRotuer = require('./routes/auth.router');
const valuesRouter = require('./routes/values.route');
const nodesRouter = require('./routes/nodos.route');
const lecturasRouter = require('./routes/lecturas.route');
const variablesRouter = require('./routes/variables.route');
const usersRouter = require('./routes/usuarios.route');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/api-docs/nodos', swaggerUI.serve, swaggerUI.setup(swaggerNodosDoc));
app.use('/api/api-docs/covid', swaggerUI.serve, swaggerUI.setup(swaggerCovidDoc));
app.use('/api/auth', authRotuer);
app.use('/api/lecturas', lecturasRouter);
app.use('/api/valores', valuesRouter);
app.use('/api/nodo', nodesRouter);
app.use('/api/variables', variablesRouter);
app.use('/api/usuario', usersRouter);

module.exports = app;
