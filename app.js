/**
 * Módulo main del proyecto VidaDigital
 */
const app = require('./server.js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port ${port} with ${process.env.NODE_ENV} envrioment`);
  // eslint-disable-next-line no-console
  console.log(`This process is your pid ${process.pid}`);
  // eslint-disable-next-line no-console
  console.log(`This process is your pid ${process.pid}`);
});
