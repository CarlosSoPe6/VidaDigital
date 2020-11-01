const request = require('supertest');
const app = require('../server.js');

const ROOT_PATH = '/api/usuario';
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

  test('Add user incorrect (schama not equal)', (done) => {
    request(app)
      .post(`${ROOT_PATH}`)
      .set('Authorization', token)
      .send({
        usuario: 'unitTestUser',
        password: '12345',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test('Add user correct', (done) => {
    request(app)
      .post(`${ROOT_PATH}`)
      .set('Authorization', token)
      .send({
        username: 'unitTestUser',
        password: '12345',
        type: 'user',
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  test('Get user', (done) => {
    request(app)
      .get(`${ROOT_PATH}/unitTestUser`)
      .set('Authorization', token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Patch node type', (done) => {
    request(app)
      .patch(`${ROOT_PATH}/type/unitTestUser`)
      .set('Authorization', token)
      .send({
        type: 'admin',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Patch user password', (done) => {
    request(app)
      .patch(`${ROOT_PATH}/password/unitTestUser`)
      .set('Authorization', token)
      .send({
        password: 'newUnitTestPasswordUltraSecure',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Delete user', (done) => {
    request(app)
      .delete(`${ROOT_PATH}/unitTestUser`)
      .set('Authorization', token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Get usuarios', (done) => {
    request(app)
      .get(`${ROOT_PATH}/todos/usuarios`)
      .set('Authorization', token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
