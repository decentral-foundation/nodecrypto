"use strict";

let path = require('path');
let fs = require('fs');

module.exports = (function Lotus(){ 

  const fileName = "myfile_" + (new Date()).toISOString() + ".md" ;
  const mycwd = process.cwd();
  const defaultStaticFolder = "base";
  let dirpath = path.join(mycwd,defaultStaticFolder);
  

  if (!fs.existsSync(dirpath)){
    fs.mkdirSync(dirpath);
  }

  let ws = fs.createWriteStream(dirpath + '/' + fileName);

  function Lotus(){

  }
  return Lotus
})()
