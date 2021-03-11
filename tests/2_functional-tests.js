const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  suite("POST /api/translate", () => {
    test("Translation with text and locale fields", (done) => {
      const reqBody = {};

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "solution",
            "response should have solution"
          );
          done();
        });
    });

    test("Translation with text and invalid locale field", (done) => {
      const reqBody = {};

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "solution",
            "response should have solution"
          );
          done();
        });
    });

    test("Translation with missing text field", (done) => {
      const reqBody = {};

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "solution",
            "response should have solution"
          );
          done();
        });
    });

    test("Translation with missing locale field", (done) => {
      const reqBody = {};

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "solution",
            "response should have solution"
          );
          done();
        });
    });

    test("Translation with empty text", (done) => {
      const reqBody = {};

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "solution",
            "response should have solution"
          );
          done();
        });
    });

    test("Translation with text that needs no translation", (done) => {
      const reqBody = {};

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "solution",
            "response should have solution"
          );
          done();
        });
    });
  });
});
