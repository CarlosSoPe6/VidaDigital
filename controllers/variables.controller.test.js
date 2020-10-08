const request = require('supertest');
const app = require('../server.js');

const ROOT_PATH = '/api/variables';

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get(`${ROOT_PATH}/logs`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
