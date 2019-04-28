const request = require("supertest");
var expect = require("chai").expect;
const express = require("express");

describe("testBloodPressureURL()", function() {
  it("should return Blood Pressure data", function() {
    // 1. ARRANGE
    request(express)
      .get("/blood_pressure")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        t.end();
      });
  });
});
