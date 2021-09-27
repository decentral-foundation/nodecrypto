// create 'fs' module variable
let fs = require("fs");


// open the streams
let readerStream = fs.createReadStream('inputfile.txt');
let writerStream = fs.createWriteStream('outputfile.txt');

// pipe the read and write operations
// read input file and write data to output file
readerStream.pipe(writerStream);


