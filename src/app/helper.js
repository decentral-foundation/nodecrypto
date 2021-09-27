"use strict";

module.exports = (function (){
  var child_process;
  
  function csvJSON(csv){
    const lines=csv.split("\n");
    let result = [];
    let headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){
      let obj = {};
      let currentline=lines[i].split(",");
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj); 
    }
     
    return JSON.stringify(result); //JSON
  }

  function run(scriptPath, callback) {
    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function(err) {
      if (invoked) return;
      invoked = true;
      callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function(code) {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error('exit code ' + code);
      callback(err);
    });
  }

  const exec = (scriptPath,callback) => {
    var invoked = false;
    var process = childProcess.fork(scriptPath);
    process.on('error', function(err) {
      if (invoked) return;
      invoked = true;
      callback(err);
    });
    process.on('exit', function(code) {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error('exit code ' + code);
      callback(err);
    });
  }

  function Helper(id) {
    this.id = id;
  }

  Helper.prototype.setChildProcess = function(childProcess) {
    child_process = childProcess;
  }

  Helper.prototype.getChildProcess = function() {
    return child_process;
  }
  return Helper;

})();

