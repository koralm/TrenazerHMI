var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');


exports.play_end = function(data) {
    fs.createReadStream('./sounds/' + data +'.mp3')
        .pipe(new lame.Decoder)
        //.on('format', console.log)
        .pipe(new Speaker);
}

