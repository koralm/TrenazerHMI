var sounds = require('../server_js/play_sound');

var EventEmitter = require("events").EventEmitter;
var stoper_event = new EventEmitter();

var stoper_stop = 0;
var stoper_stop_zero = 0;
var minutes = 0;
var seconds = 0;
var cycles = 0;

var minutes_max = 0;
var seconds_max = 12;
var cycles_max = 45;

exports.stoper_cycle = function(){
    cycles = cycles + 1;
}

exports.stoper_stat = function(data){

    stoper_stop_zero=data;

    if (stoper_stop==0 && stoper_stop_zero==0){
        intervalID = setInterval(function () {
//if all > 0
        if (stoper_stop==0 && (minutes_max + seconds_max)>0 && cycles_max>0){


            seconds = seconds + 1;

            if (seconds % 60 == 0) {
                minutes = minutes + 1;
                seconds = 0;
            }

            if (((minutes_max == minutes) && ((seconds_max) == seconds)) || cycles>=cycles_max) {
                stoper_stop=1;
                stoper_event.emit("stoper_stop");
                clearInterval(intervalID);
                sounds.play_end();
                }

        }
//if time == 0, plases >0
        if (stoper_stop==0 && (minutes_max + seconds_max)==0 && cycles_max>0){

            seconds = seconds + 1;

            if    (seconds % 60 == 0) {
                minutes = minutes + 1;
                seconds = 0;
            }

            if (cycles>=cycles_max) {
                stoper_stop=1;
                stoper_event.emit("stoper_stop");
                clearInterval(intervalID);
                sounds.play_end();
            }

            }
//if time >0, cycles ==0
        if (stoper_stop==0 && (minutes_max + seconds_max)>0 && cycles_max==0){

            seconds = seconds + 1;

            if (seconds % 60 == 0) {
                minutes = minutes + 1;
                seconds = 0;
            }

            if (((minutes_max == minutes) && ((seconds_max) == seconds))) {
                stoper_stop=1;
                stoper_event.emit("stoper_stop");
                clearInterval(intervalID);
                console.log(seconds)
                sounds.play_end();
                return;
            }


            }
//if all ==0
        if (stoper_stop==0 && (minutes_max + seconds_max)==0){
            seconds = seconds + 1;

            if (seconds % 60 == 0) {
                minutes = minutes + 1;
                seconds = 0;
            }
        }

        }, 1000)}
    if (stoper_stop_zero==1){
        clearInterval(intervalID);
        minutes = 0;
        seconds = 0;
        stoper_stop = 0;
        cycles=0;
        //sounds.play_end();
    }
}

exports.stoper_time = function () {
    return {seconds: seconds, minutes: minutes};
};

exports.stoper_event = stoper_event;