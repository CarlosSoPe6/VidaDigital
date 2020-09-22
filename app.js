const express = require('express');

const port = process.env.PORT || 3000;
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./config/swagger.json');

const app = express();

const valuesRouter = require('./routes/values.route');
const nodesRouter = require('./routes/nodos.route');
const lecturasRouter = require('./routes/lecturas.route');
const variablesRouter = require('./routes/variables.route');
const usersRouter = require('./routes/usuarios.route');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/api/lecturas', lecturasRouter);
app.use('/api/values', valuesRouter);
app.use('/api/nodo', nodesRouter);
app.use('/api/variables', variablesRouter);
app.use('/api/usuario', usersRouter)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port ${port}`);
});
