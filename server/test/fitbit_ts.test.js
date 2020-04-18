const request = require('supertest');
var expect = require('chai').expect;
const express = require('express');


describe('testFitbitTSURL()', function () {
  it('should return fitbit_ts json data', function () {
    
    // 1. ARRANGE
    request(express)
      .get('/fitbit_ts')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        t.end();
      });
  })
});
