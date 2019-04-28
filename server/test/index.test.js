const request = require("supertest");
var expect = require("chai").expect;
const express = require("express");

describe("testMainPage()", function() {
  it("should return server address", function() {
    // 1. ARRANGE
    request(express)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        t.end();
      });
  });
});
