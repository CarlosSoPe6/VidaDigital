const request = require('supertest');
const app = require('../server.js');

const ROOT_PATH = '/api/nodo';
const AUTH_PATH = '/api/auth';
let token = '';

describe(`Test ${ROOT_PATH}`, () => {
  beforeAll(async () => {
    await request(app)
      .post(`${AUTH_PATH}/login`)
      .send({
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
      }).then((response) => {
        token = `bearer ${response.body.encoded}`;
      });
  });

  test('Add node incorrect (schema not equal)', (done) => {
    request(app)
      .post(`${ROOT_PATH}`)
      .set('Authorization', token)
      .send({
        nombre: 'utest',
        direccion: 'utdireccion',
        latitud: 0,
        descripcion: 'utdescripcion',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test('Add node correct', (done) => {
    request(app)
      .post(`${ROOT_PATH}`)
      .set('Authorization', token)
      .send({
        id: 'ut',
        nombre: 'UnitTest',
        direccion: 'utdireccion',
        longitud: 0,
        latitud: 0,
        descripcion: 'utdescripcion',
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  test('Put node incorrect (schema not equal)', (done) => {
    request(app)
      .put(`${ROOT_PATH}`)
      .set('Authorization', token)
      .send({
        id: 'ut',
        direccion: 'tdireccion',
        longitud: 0,
        descpcion: 'tdescripcion',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test('Put node correct', (done) => {
    request(app)
      .put(`${ROOT_PATH}`)
      .set('Authorization', token)
      .send({
        id: 'ut',
        nombre: 'UnitTest',
        direccion: 'New utdireccion',
        longitud: -1,
        latitud: 1,
        descripcion: 'New utdescripcion',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Get node', (done) => {
    request(app)
      .get(`${ROOT_PATH}/ut`)
      .set('Authorization', token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Delete node', (done) => {
    request(app)
      .delete(`${ROOT_PATH}/ut`)
      .set('Authorization', token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Get nodes', (done) => {
    request(app)
      .get(`${ROOT_PATH}/nodos/todos`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
