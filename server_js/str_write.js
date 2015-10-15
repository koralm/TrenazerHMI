var fs = require('fs');
var rs232 = require('../server_js/rs232');
var wstream = fs.createWriteStream('myOutput.txt');

setInterval( function() {
    strength = rs232.rs_strength_READ();
    //console.log(strength);
    wstream.write( strength + '\r\n');
}, 1 );





