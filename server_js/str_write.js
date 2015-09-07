var fs = require('fs');
var wstream = fs.createWriteStream('myOutput.txt');
wstream.write(data + '\r\n');


