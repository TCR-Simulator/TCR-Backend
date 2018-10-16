/* global it, describe */
const request = require('supertest');

const app = require('../app');

describe('GET /', () => {
  it('should respond with Hello World!', (done) => {
    request(app)
      .get('/')
      .expect(200, 'Hello World!', done);
  });
});
