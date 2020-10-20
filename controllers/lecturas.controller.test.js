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

describe(`Test ${ROOT_PATH}?cmd=XXX`, () => {
  it('It should create a record', (done) => {
    const cmd = 'ID;HM1;AC;TD;TN;0;TEMP;24;HUM;20;BAT;100;';
    request(app)
      .get(`${ROOT_PATH}?cmd=${cmd}`)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });
  it('It should return BAD REQUEST. cmd not structured. No ending with ;', (done) => {
    const cmd = 'ID;HM1;AC;TD;TN;0;TEMP;24;HUM;20;BAT;100';
    request(app)
      .get(`${ROOT_PATH}?cmd=${cmd}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  it('It should return BAD REQUEST. cmd not structured, not complete ;', (done) => {
    const cmd = 'ID;HM1;AC;TD;TN;0;TEMP;24;HUM;20;BAT;';
    request(app)
      .get(`${ROOT_PATH}?cmd=${cmd}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  it('It should return No insert cmd;', (done) => {
    const cmd = 'ID;HM1;AC;TA;TN;0;TEMP;24;HUM;20;BAT;;';
    request(app)
      .get(`${ROOT_PATH}?cmd=${cmd}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  it('DB Validation error', (done) => {
    const cmd = 'ID;HM55;AC;TA;TN;0;TEMP;24;HUM;20;BAT;100;';
    request(app)
      .get(`${ROOT_PATH}?cmd=${cmd}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});

describe(`Test ${ROOT_PATH}/t?count?=X`, () => {
  it('It should return 10 records', (done) => {
    const count = 10;
    request(app)
      .get(`${ROOT_PATH}/t?count=${count}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(10);
        done();
      });
  });
  it('It should return 100 records', (done) => {
    request(app)
      .get(`${ROOT_PATH}/t`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(100);
        done();
      });
  });
  it('It should return bad requests', (done) => {
    const count = 'diez';
    request(app)
      .get(`${ROOT_PATH}/t?count=${count}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});

describe(`Test ${ROOT_PATH}/id/:id`, () => {
  it('It should 200 in a GET method', (done) => {
    const id = 331009;
    request(app)
      .get(`${ROOT_PATH}/id/${id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('It should 404 in a GET method', (done) => {
    const id = 454894;
    request(app)
      .get(`${ROOT_PATH}/id/${id}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe(`Test ${ROOT_PATH}/n/:id`, () => {
  it('It should 200 in a GET method', (done) => {
    const id = 'HM1';
    request(app)
      .get(`${ROOT_PATH}/n/${id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('It should 404 in a GET method', (done) => {
    const id = 'HM458';
    request(app)
      .get(`${ROOT_PATH}/n/${id}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe(`Test ${ROOT_PATH}/dia/{nodo}/{anio}/{mes}/{dia}`, () => {
  it('It should 200 in a GET method', (done) => {
    const id = 'HM1';
    const anio = 2020;
    const mes = 2;
    const dia = 18;
    request(app)
      .get(`${ROOT_PATH}/dia/${id}/${anio}/${mes}/${dia}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('It should 404 in a GET method', (done) => {
    const id = 'HM1';
    const anio = 2020;
    const mes = 2;
    const dia = 33;
    request(app)
      .get(`${ROOT_PATH}/dia/${id}/${anio}/${mes}/${dia}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe(`Test ${ROOT_PATH}/semana/{nodo}/{anio}/{mes}/{dia}`, () => {
  it('It should 200 in a GET method', (done) => {
    const id = 'HM1';
    const anio = 2020;
    const mes = 2;
    const dia = 18;
    request(app)
      .get(`${ROOT_PATH}/semana/${id}/${anio}/${mes}/${dia}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('It should 404 in a GET method', (done) => {
    const id = 'HM1';
    const anio = 2020;
    const mes = 2;
    const dia = 33;
    request(app)
      .get(`${ROOT_PATH}/semana/${id}/${anio}/${mes}/${dia}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe(`Test ${ROOT_PATH}/mes/{nodo}/{anio}/{mes}`, () => {
  it('It should 200 in a GET method', (done) => {
    const id = 'HM1';
    const anio = 2020;
    const mes = 2;
    request(app)
      .get(`${ROOT_PATH}/mes/${id}/${anio}/${mes}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('It should 404 in a GET method', (done) => {
    const id = 'HM1';
    const anio = 2020;
    const mes = 6;
    request(app)
      .get(`${ROOT_PATH}/mes/${id}/${anio}/${mes}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe(`Test ${ROOT_PATH}/anio/{nodo}/{anio}`, () => {
  it('It should 200 in a GET method', (done) => {
    const id = 'HM1';
    const anio = 2020;
    request(app)
      .get(`${ROOT_PATH}/anio/${id}/${anio}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('It should 404 in a GET method', (done) => {
    const id = 'HM1';
    const anio = 1998;
    request(app)
      .get(`${ROOT_PATH}/anio/${id}/${anio}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
