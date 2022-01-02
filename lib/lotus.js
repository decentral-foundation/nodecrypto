"use strict";

let path = require('path');
let fs = require('fs');

module.exports = (function Lotus(){ 

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
