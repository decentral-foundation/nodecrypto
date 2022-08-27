
var ListBuilder = function (parent, listLength) {
  this.parentEl = document.getElementById(parent);
  this.listLength = listLength;
}

ListBuilder.prototype = {
  buildList: function () {
    var list = document.createElement('ol');
    this.parentEl.appendChild(list);
    for (var i = 0; i < this.listLength; i++) {
      var item = document.createElement('li');
      list.appendChild(item);
    }
  }
}


let SimpleProfiler = function(component) {
  this.component = component; 
};

SimpleProfiler.prototype = {
  buildList: function () {
    let startTime = new Date();
    this.component.buildList();
    let elapsedTime = (new Date()).getTime() - startTime.getTime();
    console.log('buildList: ', + elapsedTime + 'ms');
  }
}



let MethodProfiler = function (component) {
  this.component  = component;
  this.timers = {};

  for (let key in this.component) {
    if (typeof this.component[key] !== 'function') {
      continue;// Makes sure that property is a function
    }

    let that = this; // Adds the method
    (function (methodName) {
      that[methodName] = function () {
        that.startTimer(methodName);
        var returnValue = that.component[methodName].apply(that.component,arguments);
        that.displayTime(methodName,that.getElapsedTime(methodName));
        return returnValue;
      }
    })(key);
  }
};

MethodProfiler.prototype = {
  startTimer: function(methodName) {
    this.timers[methodName] = (new Date()).getTime();
  },
  getElapsedTime: function (methodName) {
    return (new Date()).getTime() - this.timers[methodName];
  },
  displayTime: function (methodName, time) {
    console.log(methodName + ': ' + time + ' ms');
  }
};



var list = new ListBuilder('list-container',50);
list = new SimpleProfiler(list); // wrap object in decorator 
list.buildList(); //Creates the list and displays build list 298