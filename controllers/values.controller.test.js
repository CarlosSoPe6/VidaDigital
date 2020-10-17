const request = require('supertest');
const app = require('../server.js');

const ROOT_PATH = '/api/valores';
const NODOS_PATH = '/api/nodo';
// const VARIABLES_PATH = '/api/variables';

beforeAll(() => {
  request(app).post(NODOS_PATH).send({
    id: 'tNode',
    nombre: 'Test node2',
    direccion: 'marte',
    longitud: 0,
    latitud: 0,
    descripcion: 'test',
  });

  /* request(app).post(VARIABLES_PATH).send({
    id: '-1',
    descripcion: 'Test',
    code: 'TT',
    abr: '2T',
    unit: 'test',
    min: '-1',
    max: '+1',
    referenceVal: '',
    ambiental: '',
  }) */
});

afterAll(() => {
  request(app).delete(`${NODOS_PATH}/tNode`);
  // request(app).delete(`${VARIABLES_PATH}/tNode`)
});

describe(`Test ${ROOT_PATH}`, () => {
  test('Add node sensor', (done) => {
    request(app)
      .post(`${ROOT_PATH}/nodo/sensor`)
      .send({
        nodeID: 'tNode',
        sensorID: '-1',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Get sensors by nodeID', (done) => {
    request(app)
      .get(`${ROOT_PATH}/sensores/tNode`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Get nodes by sensorID', (done) => {
    request(app)
      .get(`${ROOT_PATH}/nodos/-1`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Get node has sensor', (done) => {
    request(app)
      .get(`${ROOT_PATH}/nodo/tNode/sensor/-1`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Delete node sensor', (done) => {
    request(app)
      .get(`${ROOT_PATH}/nodo/tNode/sensor/-1`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
