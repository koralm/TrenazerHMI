var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
/*
* INITIALIZE VARIABLES AND COM
 */
//Port settings
var COM_port = "COM5"
var COM_baudrate = 1000000;
var COM_buffer_size = 4096;
var COM_parse_strig = "03037e7e";

//Open Serial port
var sp_ov_USB = new SerialPort(COM_port, {
    baudrate: COM_baudrate,
    buffersize: COM_buffer_size,
    parser: serialport.parsers.readline(COM_parse_strig,'hex')
}, false);

/*
 * INITIALIZE VARIABLES FOR COMMUNICATION BETWEEN MODULES
 */
//Recieved from COM
var decoded_data = 14;

//SEND over COM
var time_interval = 1000;        //Send data interval
var frame_header = '7E7E';      //Frame header
var rs_status = '0';              //For calibration status 0,4,1
var rs_line_length = '0';         //Line length
var rs_interia = '0';             //Interia moment x*0.001 eg: 1000*0.001=1
var calib_force = '0';            //Calibration Force
var frame_terminator = '0303';  //Frame terminator

sp_ov_USB.open(function (error) {
    if ( error ) {
        console.log('failed to open COM: '+error);
    } else {
        console.log('COM open');

       //RECEIVE DATA
        sp_ov_USB.on('data', function(data) {

            //decode data
            decoded_data = decode_recev_data(data);

            //CONSOLE display received data
            //disp_recev_data(decoded_data);
        });

        //SEND DATA
            setInterval( function() {
                // SendFrame
                var send_frame = [frame_header,rs_status,rs_line_length,rs_interia,calib_force,frame_terminator]; //Full Frame

                //Push_data
                sp_ov_USB.write(code_send_data(send_frame));

                //CONSOLE display send data
                //console.log(code_send_data(send_frame));
            }, time_interval );
        //};

    }
});

function decode_recev_data(data){
    var bufferek = new Buffer(data ,'hex');
    var sample_nr = bufferek.readUInt16LE(17);
    var strength = bufferek.readDoubleLE(0);
    var position = bufferek.readDoubleLE(8);
    var induction_sens = bufferek.readUInt8(16);
    return([data,sample_nr,strength,position,induction_sens]);
}

function disp_recev_data(data){
    console.log('data received: ' + data[0]);
    console.log('probka: ' + data[1].toString());
    console.log('sila: ' + data[2].toString());
    console.log('polozenie: ' + data[3].toString());
    console.log('czujnik: ' + data[4].toString());
}

function code_send_data(send_frame){
    var header = new Buffer(send_frame[0] ,'hex');
    var send_buffer = new Buffer(6);
        send_buffer.writeUInt8(send_frame[1].toString(16),0,'hex');
        send_buffer.writeUInt8(send_frame[2].toString(16),1,'hex');
        send_buffer.writeUInt16LE(send_frame[3].toString(16),2,'hex');
        send_buffer.writeUInt16LE(send_frame[4].toString(16),4,'hex');
    var terminator = new Buffer(send_frame[5] ,'hex');
    var rs_frameout = Buffer.concat([header,send_buffer,terminator]);
    return(rs_frameout);
}


exports.rs_statusSET = function (data) {
    rs_status = data;
};

exports.rs_line_lengthSET = function (data) {
    rs_line_length = data;
};

exports.rs_interiaSET = function (data) {
    rs_interia = data;
};

exports.rs_receivedREAD = function () {
    return decoded_data;
};

