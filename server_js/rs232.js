var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var sp_ov_USB = new SerialPort("COM6", {
    baudrate: 1000000,
    buffersize: 4096,
    parser: serialport.parsers.readline("03037e7e",'hex')
}, false);

var sample = 0;
var rs_status=4;
    rs_status.toString(16);
var rs_llength = 0;
    rs_llength.toString(16);
var rs_minteria = 00;
    rs_minteria.toString(16);


sp_ov_USB.open(function (error) {
    if ( error ) {
        console.log('failed to open: '+error);
    } else {
        console.log('open');

       //RECEIVE DATA
        sp_ov_USB.on('data', function(data) {
            console.log('data received: ' + data);
            var bufferek = new Buffer(data ,'hex');
            var sample_nr = bufferek.readUInt16LE(17);
            var strength = bufferek.readDoubleLE(0);
            var position = bufferek.readDoubleLE(8);
            var induction_sens = bufferek.readUInt8(16);
            sample = position;

            console.log('probka: ' + sample_nr.toString());
            console.log('sila: ' + strength.toString());
            console.log('polozenie: ' + position.toString());
            console.log('czujnik: ' + induction_sens.toString());
        });

        //SENDDATA
       // exports.rs_stat = function (data) {


            var rsout_head = new Buffer('7E7E' ,'hex');
            var rsout_exit = new Buffer('0303' ,'hex');
            var send_buffer1 = new Buffer(4);
            send_buffer1.fill(0);
            send_buffer1.writeUInt8(rs_status,0);
            send_buffer1.writeUInt8(rs_llength,1);
            send_buffer1.writeUInt16BE(rs_minteria,2);
            var rs_frameout = Buffer.concat([rsout_head,send_buffer1,rsout_exit]);
            setInterval( function() {
                sp_ov_USB.write(rs_frameout);
            }, 1 );
        //};

    }
});

exports.rsout = function () {
    return sample;
};