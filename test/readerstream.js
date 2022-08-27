let fs = require("fs");
var emitter = require('events').EventEmitter;

function LoopProcessor(num) {
    var EE = new emitter();
    setTimeout(function () {
        for (var i = 1; i <= num; i++) {
            EE.emit('BeforeProcess', i,i - 0.1);
            console.log('Processing number:' + i);
            EE.emit('AfterProcess', i,i + 0.1);
        }
    }, 2000)
    return EE;
}
var lp = LoopProcessor(3);

lp.on('BeforeProcess', function (index,data) {
	let cube = data * data * data;
	let val = index + cube;
	console.log("index, data: ",index,data);
    console.log('About to start the process for ' + val);
    console.log("");
});

lp.on('AfterProcess', function (index,data) {
	let cube = data * data * data;
	let val = index - cube;
	console.log("index, data: ",index,data);
    console.log('Completed processing ' + val);
    console.log("");
});