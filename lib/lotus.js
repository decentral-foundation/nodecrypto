"use strict";

let path = require('path');
let fs = require('fs');
// no swastika since this will actually be used to help those that are disabled
module.exports = (function Lotus(){ 

  // so we cant go this way have to start at the end
  // variable p in this case is what the folder is 

  // ISO string will have form "2021-10-18T03:09:05.963Z"
  const fileName = "myfile_" + (new Date()).toISOString() + ".md" ;
  const mycwd = process.cwd();
  const defaultStaticFolder = "base";
  console.log("mycwd: ",mycwd);
  let dirpath = path.join(mycwd,defaultStaticFolder);
  console.log("dirpath: ",dirpath);
  

  if (!fs.existsSync(dirpath)){
    fs.mkdirSync(dirpath);
  }

  let ws = fs.createWriteStream(dirpath + '/' + fileName);

  function Lotus(){

  }
  return Lotus
})()

// Action item refactor into a node module