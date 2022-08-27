"use strict";

module.exports = (function () {
  function Parser(argsList){
    this.argsList = argsList.map(function (a) {
      return a;
    })
  }

  /**
   * @description If cli has hyphen for port return the element ahead of it
   * @return Default port is 3300
   */
  Parser.prototype.getPort = function(first_argument) {
  	if (this.argsList.indexOf("-p") !== -1) {
      return this.argsList[this.argsList.indexOf("-p") + 1]
  	} 
  	return 3300;
  };

  return Parser;
})()