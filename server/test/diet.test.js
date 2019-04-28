const request = require("supertest");
var expect = require("chai").expect;
const express = require("express");

describe("testDietURL()", function() {
  it("should return diet data", function() {
    // 1. ARRANGE
    request(express)
      .get("/diet")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        t.end();
      });
  });
});
