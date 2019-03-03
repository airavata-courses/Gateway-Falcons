const request = require('supertest');
var test = require('tape');
const express = require('express');
var assert = require('assert');

describe('request(url)', function () {

  const app = express();

  test('should have fitness data', function (t) {

    request(app)
      .get('/fitness')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        t.end();
      });
  })

});
