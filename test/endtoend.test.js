"use strict";

function doSomething(nom) {
  console.log(nom + "()" + nom + "[")
}

(function loop() {
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    let om = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(function() {
            doSomething(om);
            loop();  
    }, rand);
}());


