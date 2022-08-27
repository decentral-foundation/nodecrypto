"use strict";

let fs = require("fs");


/**
 * @param {string} prompt - such as slash d
 * @param {string} command - such as init commit push
 * @param {string} file - such as myNewLandingPage and based on spec myNewLandingPage.md
 */ 
const [prompt, command, file, password ] = process.argv.slice(2);

console.log("prompt, command, file, password: ",prompt, command, file, password);



const range = (start,end,content) => {
  if (typeof end == 'undefined'){
    end = start;
    start = 0;
  }
  let result = [];
  for (let i = start; i < end; i++){ 
    result.push(content + i.toString())
  }
  return result;
};



function testSend(filename,index) {
  let d = (new Date).toISOString();
  var filestream = filename  + '_' +  d  + '.md';
  var location = __dirname + '/store/' + filestream;
  var indexData = index + " on " + d;
  return new Promise(function (resolve,reject) {
    fs.writeFile(location,indexData,'utf-8',function(err) {
      if (err) reject(err);
      else resolve(indexData);
    })
  })
}

let proms = range(0,3,"financial_projections").map((fn,i) => testSend(fn,1+i));
console.log("proms: ",proms);

