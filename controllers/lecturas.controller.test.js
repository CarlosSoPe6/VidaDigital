const request = require('supertest');
const app = require('../server.js');

const ROOT_PATH = '/api/lecturas';

describe(`Test ${ROOT_PATH}/logs`, () => {
  it('It should 200 in a GET method', (done) => {
    request(app)
      .get(`${ROOT_PATH}/logs`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
