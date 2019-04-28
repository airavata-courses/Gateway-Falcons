const request = require('supertest');
var expect = require('chai').expect;
const express = require('express');


describe('testFitbitHRURL()', function () {
  it('should return fitbit_HR  json data', function () {
    
    // 1. ARRANGE
    request(express)
      .get('/fitbit_hr')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        t.end();
      });
  })
});
