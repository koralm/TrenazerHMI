var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var sp_ov_USB = new SerialPort("COM4", {
    baudrate: 1000000,
    buffersize: 4096,
    parser: serialport.parsers.readline("03037e7e",'hex')
}, false);

var sample = 0;

sp_ov_USB.open(function (error) {
    if ( error ) {
        console.log('failed to open: '+error);
    } else {
        console.log('open');
        sp_ov_USB.on('data', function(data) {
            //console.log('data received: ' + data);
            var bufferek = new Buffer(data ,'hex');
            //var sample_nr = bufferek.readUInt16LE(17);
            //var strength = bufferek.readDoubleLE(0);
            var position = bufferek.readDoubleLE(8);
            //var induction_sens = bufferek.readUInt8(16);
            sample = position;

            //console.log('probka: ' + sample_nr.toString());
            //console.log('sila: ' + strength.toString());
            //console.log('polozenie: ' + position.toString());
            //console.log('czujnik: ' + induction_sens.toString());
        });

    }
});

exports.rsout = function () {
    return sample;
};
