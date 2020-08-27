const express = require('express');

const port = process.env.PORT || 3000;
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./config/swagger.json');

const app = express();

const valuesRouter = require('./routes/values.route');
const nodesRouter = require('./routes/nodes.route');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/api/values', valuesRouter);
app.use('/api/nodes', nodesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port ${port}`);
});
