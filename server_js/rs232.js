var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

//EVENT EMIT

var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

/*
* INITIALIZE VARIABLES AND COM
 */
//Port settings
var COM_port = "COM3";
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
var decoded_data = 0;

//SEND over COM
var time_interval = 1000;           //Send data interval
var frame_header = '7E7E';          //Frame header
var rs_status = '0';                //For calibration status 0,4,1
var rs_line_length = '0';           //Line length
var rs_roller_dist = '30';          //Rollers distance 5mm - 40mm
var rs_record_stat= '7';            //Recod data start-stop
var rs_interia = '0';               //Interia moment x*0.001 eg: 1000*0.001=1
var calib_force = '0';              //Calibration Force
var frame_terminator = '0303';      //Frame terminator

//Receive form COM
var stop_aw = 0;
var tryb_pracy = 0;
var induc_sens= 0;
var phase = 0;
var strength_r = 0;

//Formats
//Ilosciowy
var force_sum = 0;
var mean_force_acc = 0;
var mean_force_brake = 0;
var mean_force_cycle = 0;
var time_acc_phase =0;
var time_brake_phase =0;
var time_cycle =0;
var max_speed_cycle =0;
var concetrate_pointer =0;

var help_count=0;
var phase0_count=0;
var pos_hist = 0;
var speed = 0;

var phase_hist = 3;
var max_pos_cyc = 0;
val_strength_table = new Array(1200),


sp_ov_USB.open(function (error) {
    if ( error ) {
        console.log('failed to open COM: '+error);
    } else {
        console.log('COM open');
    }
});

//RECEIVE DATA
sp_ov_USB.on('data', function (data) {
    sp_ov_USB.flush();
    //decode data
    decoded_data = decode_recev_data(data);

    //CONSOLE display received data
    disp_recev_data(decoded_data);
    strength_r=decoded_data[2];


    //DECODE ERROR
    decode_stop(decoded_data[4]);
    decode_work(decoded_data[4]);
    decode_induction(decoded_data[4]);
    decode_phase(decoded_data[4]);

    //PARAMS TO SAVE
    force_sum = force_sum + decoded_data[3];
    //speed = (pos_hist - decoded_data[2]);
    //console.log(speed);
    //COUNTERS
    phase0_count = phase0_count + 1;



    //FLAG
    if (phase != phase_hist){
        if (help_count == 0){
            //console.log("wciaga");
            mean_force_brake = force_sum/phase0_count;
            exports.mean_force_brake = force_sum/phase0_count;
            time_acc_phase = phase0_count;
            exports.time_acc_phase = phase0_count;
            //console.log(mean_force_brake);
        }

        if (help_count == 1){
            //console.log("ciagne");
            mean_force_acc = force_sum/phase0_count;
            exports.mean_force_acc = force_sum/phase0_count;
            time_brake_phase =phase0_count;
            exports.time_brake_phase = phase0_count;
            //console.log(mean_force_acc);
        }

        phase0_count = 0;
        force_sum = 0;
        help_count ++;

        //max position in cycle
        if (max_pos_cyc<decoded_data[4]){
            max_pos_cyc = decoded_data[4]
        }

        val_strength_table[decoded_data[2]] = decoded_data[3];

        if (help_count == 2){
            help_count = 0;
            //console.log("cykl");
            exports.mean_force_cycle = (mean_force_brake + mean_force_acc)/2;
            exports.time_cycle = time_acc_phase + time_brake_phase;
            exports.max_pos_cyc = max_pos_cyc;

           //concentrate function
            force_mean = math.mean(val_strength_table);
            force_mean_count = 0;

            for (i=0; i < val_strength_table.length; i++){
                if (val_strength_table[i] < force_mean){
                    force_mean_count++;
                }
            }

            exports.concetrate_pointer = (1.0-(val_strength_table.length/force_mean_count));

            ee.emit("cykl");

            //console.log(time_cycle);
            mean_force_brake=0;
            mean_force_acc=0;
            time_acc_phase = 0;
            time_brake_phase = 0;
            max_pos_cyc = 0;
            force_mean_count=0;
            force_mean = 0;
        }
    }


    //SAVE TO FILE
    exports.decoded_datax = decoded_data;
    exports.phase = phase;
    ee.emit("someEvent");
    phase_hist = phase;
    pos_hist = decoded_data[2];
});

/*
function rs_start_F(data){
    if (data == 65) {
        //RECEIVE DATA
        sp_ov_USB.on('data', function (data) {
            sp_ov_USB.flush();
            //decode data
            decoded_data = decode_recev_data(data);

            //CONSOLE display received data
            disp_recev_data(decoded_data);

            //DECODE ERROR
            //decode_stop(decoded_data[4]);
            //decode_work(decoded_data[4]);
            //decode_induction(decoded_data[4])
        });
    }
    else if (data == 123){
        sp_ov_USB.close(function (error) {
            if ( error ) {
                console.log('failed to close COM: '+error);
            } else {
                console.log('COM closed');
            }
        });
    }
};
*/
function decode_recev_data(data){
    var bufferek = new Buffer(data ,'hex');
        if (bufferek.length == 19) {
            var position = bufferek.readDoubleLE(0);
            var strength = bufferek.readDoubleLE(8);
            var induction_sens = bufferek.readUInt8(16);
            var sample_nr = bufferek.readUInt16LE(17);
        };
    return([data,sample_nr,strength,position,induction_sens]);
}

function disp_recev_data(data){
    //console.log('data received: ' + data[0]);
    //console.log('probka: ' + data[1]);//.toString());
    //console.log('sila: ' + data[2]);//.toString());
    //console.log('polozenie: ' + data[3]);//.toString());
    //console.log('czujnik: ' + data[4]);//.toString());
}

function code_send_data(send_frame){
    var header = new Buffer(send_frame[0] ,'hex');
    var send_buffer = new Buffer(8);
        send_buffer.writeUInt8(send_frame[1].toString(16),0,'hex');
        send_buffer.writeUInt8(send_frame[2].toString(16),1,'hex');
        send_buffer.writeUInt8(send_frame[3].toString(16),2,'hex');
        send_buffer.writeUInt8(send_frame[4].toString(16),3,'hex');
        send_buffer.writeUInt16LE(send_frame[5].toString(16),4,'hex');
        send_buffer.writeUInt16LE(send_frame[6].toString(16),6,'hex');
    var terminator = new Buffer(send_frame[7] ,'hex');
    var rs_frameout = Buffer.concat([header,send_buffer,terminator]);
    return(rs_frameout);
}

function push_rs232(){
    var send_frame = [frame_header,rs_status,rs_line_length,rs_roller_dist,rs_record_stat,rs_interia,calib_force,frame_terminator];
    sp_ov_USB.write(code_send_data(send_frame));
    console.log(code_send_data(send_frame));
};

function decode_stop(data){
    if ((data & 64) == 64) {
        //console.log("STOP ok")
        stop_aw=1;
    } else {
        //console.log("STOP wcisnięty")
        stop_aw=0;
    }
}

function decode_work(data){
    if ((data & 128) == 128) {
        //console.log("Tryb pracy")
        tryb_pracy = 1;
    } else {
        //console.log("Tryb kalibracji")
        tryb_pracy = 0;
    }
}

function decode_phase(data){
    if ((data & 2) == 2) {
        //console.log("faza_1");
        phase= 1;
    } else {
        //console.log("faza_0");
        phase = 0;
    }
}

function decode_induction(data){
    if ((data & 1) == 1) {
        //console.log("Czujnik krzywo")
        induc_sens = 1;
    } else {
        //console.log("Czujnik OK")
        induc_sens = 0;
    }
}

//EXPORTS
exports.rs_statusSET = function (data) {
    rs_status = data;
    push_rs232();
};

exports.rs_line_lengthSET = function (data) {
    rs_line_length = data;
    push_rs232();
};

exports.rs_roller_distSET = function (data) {
    rs_roller_dist = data;
    console.log(data);
    push_rs232();
};

exports.rs_interiaSET = function (data) {
    rs_interia = data;
    push_rs232();
};

//exports.rs_startSET = function (data) {
//    rs_start_F(data);
//    console.log(data);
//};

exports.rs_receivedREAD = function () {
    return decoded_data;
};

exports.rs_inductionREAD = function () {
    return decoded_data[4];
};

exports.rs_stopRED = function () {
    return stop_aw;
};

exports.rs_ind_sens = function () {
    return induc_sens;
};

exports.rs_phase_sens = function () {
    return phase;
};

exports.rs_positon_READ = function (){
    return decoded_data[3];
};

exports.rs_strength_READ = function (){
    return strength_r;
};



exports.xyz = ee;
