var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

var range_up1 = fs.createReadStream('./sounds/' + 'range_up1' +'.mp3');
var range_down1 = fs.createReadStream('./sounds/' + 'range_down1' +'.mp3');

var range_up2 = fs.createReadStream('./sounds/' + 'range_up2' +'.mp3');
var range_down2 = fs.createReadStream('./sounds/' + 'range_down2' +'.mp3');
var TaDa = fs.createReadStream('./sounds/' + 'TaDa' +'.mp3');

exports.play_end = function(data) {
    if (data==range_up1) {
        range_up1
            .pipe(new lame.Decoder)
            .pipe(new Speaker);
    } else if (data==range_up2) {
        range_up2
            .pipe(new lame.Decoder)
            .pipe(new Speaker);
    } else if (data==range_down1) {
        range_down1
                .pipe(new lame.Decoder)
                .pipe(new Speaker);
    } else if (data==range_down2) {
        range_down2
            .pipe(new lame.Decoder)
            .pipe(new Speaker);
    } else if (data==TaDa) {
    range_down2
        .pipe(new lame.Decoder)
        .pipe(new Speaker);}}

