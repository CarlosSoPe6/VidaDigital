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
  test('It should response the POST method', (done) => {
    request(app)
      .post(`${ROOT_PATH}`)
      .then((response) => {
        expect(response.statusCode).toBe(500);
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
  test('It should response the 404 GET method', (done) => {
    request(app)
      .get(`${ROOT_PATH}/notfound`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
