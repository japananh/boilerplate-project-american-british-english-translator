const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  constructor() {
    this.locales = ["american-to-british", "british-to-american"];
  }

  validateLocale(locale) {
    if (this.locales.includes(locale)) return true;
    return false;
  }

  translate(text, locale) {
    let newString = text;

    newString = this.translateTitle(newString, locale);
    newString = this.translateSpelling(newString, locale);
    newString = this.translateTime(newString, locale);

    newString = this.capitalize(newString);

    return newString;
  }

  translateSpelling(text, locale) {
    let newString = text;

    if (locale === this.locales[0]) {
      Object.keys(americanToBritishSpelling).forEach((key) => {
        const regex = new RegExp(`\\b${key}\\b`, "gi");
        newString = newString.replace(
          regex,
          `<span class="highlight">${americanToBritishSpelling[key]}</span>`
        );
      });

      Object.keys(americanOnly).forEach((key) => {
        const regex = new RegExp(`\\b${key}\\b`, "gi");
        newString = newString.replace(
          regex,
          `<span class="highlight">${americanOnly[key]}</span>`
        );
      });
    } else if (locale === this.locales[1]) {
      Object.keys(americanToBritishSpelling).forEach((key) => {
        const regex = new RegExp(
          `\\b${americanToBritishSpelling[key]}\\b`,
          "gi"
        );
        newString = newString.replace(
          regex,
          `<span class="highlight">${key}</span>`
        );
      });

      Object.keys(britishOnly).forEach((key) => {
        const regex = new RegExp(`(^${key}\\b|(?<=\\s)${key}\\b)`, "gi");
        newString = newString.replace(
          regex,
          `<span class="highlight">${britishOnly[key]}</span>`
        );
      });
    }

    return newString;
  }

  translateTitle(text, locale) {
    let newString = text;

    if (locale === this.locales[0]) {
      Object.keys(americanToBritishTitles).forEach((key) => {
        const regex = new RegExp(`\\b${key.replace(".", "\\b\\.")}`, "gi");
        newString = newString.replace(
          regex,
          `<span class="highlight">${this.capitalize(
            americanToBritishTitles[key]
          )}</span>`
        );
      });
    } else if (locale === this.locales[1]) {
      Object.keys(americanToBritishTitles).forEach((key) => {
        const regex = new RegExp(
          `\\b${americanToBritishTitles[key]}\\b(?!\\.)`,
          "gi"
        );
        newString = newString.replace(
          regex,
          `<span class="highlight">${this.capitalize(key)}</span>`
        );
      });
    }

    return newString;
  }

  translateTime(text, locale) {
    let newString = text;

    if (locale === this.locales[0]) {
      const regex = /\b\d{1,2}:\d{1,2}\b/;

      (newString.match(regex) || []).forEach((matched) => {
        const newTimeString = matched.replace(":", ".");
        newString = newString.replace(
          matched,
          `<span class="highlight">${newTimeString}</span>`
        );
      });
    } else if (locale === this.locales[1]) {
      const regex = /\b\d{1,2}\.\d{1,2}\b/;

      (newString.match(regex) || []).forEach((matched) => {
        const newTimeString = matched.replace(".", ":");
        newString = newString.replace(
          matched,
          `<span class="highlight">${newTimeString}</span>`
        );
      });
    }

    return newString;
  }

  capitalize(str) {
    try {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (_err) {
      return str;
    }
  }
}

module.exports = Translator;
