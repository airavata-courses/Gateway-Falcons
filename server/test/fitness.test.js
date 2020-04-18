const request = require("supertest");
var expect = require("chai").expect;
const express = require("express");

describe("testFitnessURL()", function() {
  it("should return fitness data", function() {
    // 1. ARRANGE
    request(express)
      .get("/fitness")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        t.end();
      });
  });
});
