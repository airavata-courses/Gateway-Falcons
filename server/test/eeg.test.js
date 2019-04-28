const request = require('supertest');
var expect = require('chai').expect;
const express = require('express');


describe('testEEGURL()', function () {
  it('should return EEG data', function () {
    
    // 1. ARRANGE
    request(express)
      .get('/eeg')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        t.end();
      });
  })
});
