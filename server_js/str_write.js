var fs = require('fs');
var rs232 = require('../server_js/rs232');
var wstream = fs.createWriteStream('myOutput.txt');

    wstream.write(rs232.rs_receivedREAD() + '\r\n');



