"use strict";

const encrypt = require("../app/encrypt");
const decrypt = require("../app/decrypt");
const [mode, file, password ] = process.argv.slice(2);


let combined = __dirname + '/' + file;



if (mode === "encrypt") {
  encrypt({ file, password });
}
else if (mode === "decrypt") {
  decrypt({ 
    dc_file: combined + '.enc', 
    password,
    options: {DEBUG_FLAG: true}
  });
}
