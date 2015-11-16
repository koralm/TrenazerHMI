var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');


exports.play_end = function() {
    fs.createReadStream('./sounds/stoper_end.mp3')
        .pipe(new lame.Decoder)
        .on('format', console.log)
        .pipe(new Speaker);
}