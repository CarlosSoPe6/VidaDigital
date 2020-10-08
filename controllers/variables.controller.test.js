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
});
