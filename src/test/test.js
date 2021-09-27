"use strict";

const encrypt = require("./app/encrypt");
const decrypt = require("./app/decrypt");
const [mode, file, password ] = process.argv.slice(2);


if (mode === "encrypt") {
  encrypt({ file, password });
}
else if (mode === "decrypt") {
  decrypt({ file, password });
}
