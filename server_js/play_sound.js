var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

// Create the Speaker instance
var speaker = new Speaker({
    channels: 2,          // 2 channels
    bitDepth: 16,         // 16-bit samples
    sampleRate: 44100     // 44,100 Hz sample rate
});

//var range_up1 = fs.createReadStream('./sounds/' + 'range_up1' +'.mp3').pipe(new lame.Decoder);
//var range_down1 = fs.createReadStream('./sounds/' + 'range_down1' +'.mp3').pipe(new lame.Decoder);

//var range_up2 = fs.createReadStream('./sounds/' + 'range_up2' +'.mp3').pipe(new lame.Decoder);
//var range_down2 = fs.createReadStream('./sounds/' + 'range_down2' +'.mp3').pipe(new lame.Decoder);
var TaDa = fs.createReadStream('./sounds/' + 'TaDa' + '.mp3').pipe(new lame.Decoder);

exports.play_end = function(data) {
    if (data=="range_up1") {
        //range_up1 = fs.createReadStream('./sounds/' + 'range_up1' +'.mp3').pipe(new lame.Decoder);
        //range_up1.pipe(new Speaker);
    }
    if (data=="range_up2") {
        //range_up2 = fs.createReadStream('./sounds/' + 'range_up2' +'.mp3').pipe(new lame.Decoder);
        //range_up2.pipe(new Speaker);
    }
    if (data=="range_down1") {
        //range_down1 = fs.createReadStream('./sounds/' + 'range_down1' +'.mp3').pipe(new lame.Decoder);
        //range_down1.pipe(new Speaker);
    }
    if (data=="range_down2") {
        //range_down2 = fs.createReadStream('./sounds/' + 'range_down2' +'.mp3').pipe(new lame.Decoder);
        //range_down2.pipe(new Speaker);
    }
    if (data=="TaDa") {
        TaDa = fs.createReadStream('./sounds/' + 'TaDa' + '.mp3').pipe(new lame.Decoder);
        TaDa.pipe(new Speaker);
        }
}