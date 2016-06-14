//var fs = require('fs');
var fs = require('fs-extra')
var mkdirp = require('mkdirp');

var EventEmitter = require("events").EventEmitter;
var settings_ee = new EventEmitter();

var settings_default = JSON.parse(fs.readFileSync("./settings/default.init", 'utf8'));
var settings_loaded = ""
var settings_actual = settings_default;

exports.save = function (data){
    settings_loaded = data;
    mkdirp("D:/ustawienia", function(err) {
        console.log("create folder good");
    });
    wstream_c = fs.createWriteStream("D:/ustawienia/" + data.settings_name.toString() + ".init");
    wstream_c.write(JSON.stringify(data, null, 2));
    settings_actual = settings_loaded;
    settings_ee.emit("settigs_load");
}

exports.update = function (data){
    settings_loaded = data;
    if (typeof(settings_loaded.damping_dynamic) != "undefined"){
        settings_actual.damping_dynamic = data.damping_dynamic
    }
    if (typeof(settings_loaded.damping_static) != "undefined"){
        settings_actual.damping_static = data.damping_static
    }
    if (typeof(settings_loaded.line_l) != "undefined"){
        settings_actual.line_l = data.line_l
    }
    if (typeof(settings_loaded.roller_d) != "undefined"){
        settings_actual.roller_d = data.roller_d
    }
    if (typeof(settings_loaded.interia_m) != "undefined"){
        settings_actual.interia_m = data.interia_m
    }
    if (typeof(settings_loaded.file_name) != "undefined"){
        settings_actual.file_name = data.file_name
    }
    if (typeof(settings_loaded.folder_name) != "undefined"){
        settings_actual.folder_name = data.folder_name
    }
    if (typeof(settings_loaded.disp1_min) != "undefined"){
        settings_actual.disp1_min = data.disp1_min
    }
    if (typeof(settings_loaded.disp1_max) != "undefined"){
        settings_actual.disp1_max = data.disp1_max
    }
    if (typeof(settings_loaded.disp2_min) != "undefined"){
        settings_actual.disp2_min = data.disp2_min
    }
    if (typeof(settings_loaded.disp2_max) != "undefined"){
        settings_actual.disp2_max = data.disp2_max
    }
    if (typeof(settings_loaded.minutes_max) != "undefined"){
        settings_actual.minutes_max = data.minutes_max
    }
    if (typeof(settings_loaded.seconds_max) != "undefined"){
        settings_actual.seconds_max = data.seconds_max
    }
    if (typeof(settings_loaded.cycle_max) != "undefined"){
        settings_actual.cycle_max = data.cycle_max
    }
    if (typeof(settings_loaded.settings_name) != "undefined"){
        settings_actual.settings_name = data.settings_name
    }
    settings_ee.emit("settigs_load");
    //console.log(settings_actual);
}

exports.load_act = function (){
    //console.log(settings_actual)
    return (settings_actual);
}

exports.load_init = function (){
    settings_ee.emit("settigs_load");
    //console.log(settings_actual);
    return (settings_actual);
}

exports.settings_ee = settings_ee;