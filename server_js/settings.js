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
    settings_actual = settings_loaded;
    console.log(settings_actual);
    settings_ee.emit("settigs_load");
}

exports.load_act = function (){
    return (settings_actual);
}

exports.load_init = function (){
    settings_ee.emit("settigs_load");
    return (settings_actual);
}

exports.settings_ee = settings_ee;