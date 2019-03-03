const request = require('supertest');
var test = require('tape');
const express = require('express');
var assert = require('assert');

describe('request(url)', function () {

  const app = express();

  test('Mock test!', function (t) {
    t.end();
  });

  test('should have a main index route', function (t) {

    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, { title: 'Main Express Server' })
      .end(function (err, res) {
        t.end();
      });
  })

});
