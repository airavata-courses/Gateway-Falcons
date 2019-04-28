const request = require('supertest');
var expect = require('chai').expect;
const express = require('express');


describe('testLocationURL()', function () {
  it('should return location JSON data', function () {
    
    // 1. ARRANGE
    request(express)
      .get('/location')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        t.end();
      });
  })
});
