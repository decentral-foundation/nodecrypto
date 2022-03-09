"use strict";

module.exports = (function (){
  let child_process;
  let zsh_command;
  

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


  // must do by nov 1: deprecate as in remove this if not use
  const exec = (scriptPath,callback) => {
    var invoked = false;
    var process = this.childProcess.fork(scriptPath);
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

  

  function Helper(id,childProcess) {
    this.id = id;
    this.childProcess = childProcess;
  }

  function run_shell_command(command,cb) {   
    exec(command, function(err,stdout,stderr){
      if(err) {
        cb(stderr,undefined);
      } else {
        console.log("stdout: ",stdout);
        cb(null,stdout);
     }
   });
  }

  Helper.prototype.setZshCommand = function(zshCommand) {
    zsh_command = zshCommand;
  }


  Helper.prototype.execChildProcess = function(callback) {
    run_shell_command(this.childProcess,callback);

  }

  return Helper;

})();

