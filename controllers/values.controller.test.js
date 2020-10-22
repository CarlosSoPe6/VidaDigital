const request = require('supertest');
const app = require('../server.js');

const ROOT_PATH = '/api/valores';

describe(`Test ${ROOT_PATH}`, () => {
  test('Add node sensor', (done) => {
    request(app)
      .post(`${ROOT_PATH}/nodo/sensor`)
      .send({
        nodeID: 'HM2',
        sensorID: '39',
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  test('Get sensors by nodeID', (done) => {
    request(app)
      .get(`${ROOT_PATH}/sensores/HM2`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Get nodes by sensorID', (done) => {
    request(app)
      .get(`${ROOT_PATH}/nodos/39`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Get node has sensor', (done) => {
    request(app)
      .get(`${ROOT_PATH}/nodo/HM2/sensor/39`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Delete node sensor', (done) => {
    request(app)
      .get(`${ROOT_PATH}/nodo/HM2/sensor/39`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
