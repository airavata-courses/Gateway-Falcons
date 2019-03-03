const request = require('supertest');
var test = require('tape');
const express = require('express');

describe('request(url)', function () {

  const app = express();

  test('should have image data', function (t) {

    request(app)
      .get('/images')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        t.end();
      });
  })

});
