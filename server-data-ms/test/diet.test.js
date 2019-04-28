const request = require("supertest");
var test = require("tape");
const express = require("express");

describe("request(url)", function() {
  const app = express();

  test("Diet Data Test", function(t) {
    request(app)
      .get("/diet")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        t.end();
      });
  });
});
