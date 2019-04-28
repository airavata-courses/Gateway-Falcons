const request = require('supertest');
var expect = require('chai').expect;
const express = require('express');


describe('testFitbitURL()', function () {
  it('should return fitbit data', function () {
    
    // 1. ARRANGE
    request(express)
      .get('/fitbit')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        t.end();
      });
  })
});
