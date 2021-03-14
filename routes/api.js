"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;

    if (text == null || locale == null)
      return res.json({ error: "Required field(s) missing" });
    if (text === "") return res.json({ error: "No text to translate" });
    if (!translator.validateLocale(locale))
      return res.json({ error: "Invalid value for locale field" });

    const translation = translator.translate(text, locale);

    if (text === translation)
      return res.json({ text, translation: "Everything looks good to me!" });

    res.json({
      text,
      translation,
    });
  });
};
