const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

const Translator = require("../components/translator.js");
let translator;

suite("Functional Tests", () => {
  suiteSetup((done) => {
    translator = new Translator();
    done();
  });

  suite("POST /api/translate", () => {
    test("Translation with text and locale fields", (done) => {
      const reqBody = {
        text: "hi color",
        locale: "american-to-british",
      };
      const translation = translator.translate(reqBody.text, reqBody.locale);

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.deepEqual(
            res.body,
            { text: reqBody.text, translation },
            "response should have text and translation"
          );
          done();
        });
    });

    test("Translation with text and invalid locale field", (done) => {
      const reqBody = {
        text: "hi",
        locale: "british",
      };

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.deepEqual(
            res.body,
            {
              error: "Invalid value for locale field",
            },
            "response should return correct error message"
          );
          done();
        });
    });

    test("Translation with missing text field", (done) => {
      const reqBody = {
        locale: "american-to-british",
      };

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.deepEqual(
            res.body,
            { error: "Required field(s) missing" },
            "response should return correct error message"
          );
          done();
        });
    });

    test("Translation with missing locale field", (done) => {
      const reqBody = {
        text: "hi",
      };

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.deepEqual(
            res.body,
            {
              error: "Required field(s) missing",
            },
            "response should return correct error message"
          );
          done();
        });
    });

    test("Translation with empty text", (done) => {
      const reqBody = {
        text: "",
        locale: "american-to-british",
      };

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.deepEqual(
            res.body,
            { error: "No text to translate" },
            "response should return correct error message"
          );
          done();
        });
    });

    test("Translation with text that needs no translation", (done) => {
      const reqBody = {
        text: "Hi",
        locale: "american-to-british",
      };

      chai
        .request(server)
        .post("/api/translate")
        .send(reqBody)
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.deepEqual(
            res.body,
            { text: reqBody.text, translation: "Everything looks good to me!" },
            "response should have text and translation"
          );
          done();
        });
    });
  });
});
