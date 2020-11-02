const request = require('supertest');
const app = require('../server.js');

const ROOT_PATH = '/api/variables';

describe(`Test ${ROOT_PATH}`, () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get(`${ROOT_PATH}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test('It should response BadRequest POST method', (done) => {
    request(app)
      .post(`${ROOT_PATH}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  test('It should response Created POST method', (done) => {
    request(app)
      .post(`${ROOT_PATH}`)
      .send({
        description: 'Variable de prueba',
        code: 'TST',
        unit: 'Metros cuadrados',
        abr: 'm2',
        min: 0,
        max: 10.0,
        referenceVal: 0,
        ambiental: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });
});

describe(`Test ${ROOT_PATH}/:code`, () => {
  test('It should response the 200 GET method', (done) => {
    request(app)
      .get(`${ROOT_PATH}/bat`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test('It should response the 200 PUT method', async (done) => {
    const put = await request(app)
      .put(`${ROOT_PATH}/TST`)
      .send({
        id: 1,
        description: 'Valor cambiado',
        code: 'TST',
        unit: 'Metros cuadrados',
        abr: 'm2',
        min: 0,
        max: 10.0,
        referenceVal: 0,
        ambiental: false,
      });
    expect(put.statusCode).toBe(200);
    const get = await request(app)
      .get(`${ROOT_PATH}/TST`);
    expect(get.statusCode).toBe(200);
    expect(get.body.description).toBe('Valor cambiado');
    done();
  });
  test('It should response the 404 GET method', (done) => {
    request(app)
      .get(`${ROOT_PATH}/notfound`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
  test('It should response the 200 DELETE method', (done) => {
    request(app)
      .delete(`${ROOT_PATH}/TST`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
