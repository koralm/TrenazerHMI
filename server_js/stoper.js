
var stoper_stop = 0;
var minutes = 0;
var seconds = 0;
var phases = 0;

var minutes_max = 12;
var seconds_max = 56;
var phases_max = 0;

exports.stoper_stat = function(data){

    stoper_stop=data;

    if (stoper_stop==0){
        intervalID = setInterval(function () {
//if all > 0
        if (stoper_stop==0 && (minutes_max + seconds_max)>0 && phases_max>0){
            seconds = seconds + 1;

            if (seconds % 60 == 0) {
                minutes = minutes + 1;
                seconds = 0;
            }

            if (((minutes_max == minutes) && (seconds_max <= seconds)) || phases>=phases_max) {
                stoper_stop=1;
                clearInterval(intervalID);
                }
        }
//if time == 0, plases >0
        if (stoper_stop==0 && (minutes_max + seconds_max)==0 && phases_max>0){
            seconds = seconds + 1;

            if    (seconds % 60 == 0) {
            minutes = minutes + 1;
            seconds = 0;
            }

            if (phases>=phases_max) {
                stoper_stop=1;
                clearInterval(intervalID);
            }
            }
//if time >0, phases ==0
        if (stoper_stop==0 && (minutes_max + seconds_max)>0 && phases_max==0){
            seconds = seconds + 1;

            if (seconds % 60 == 0) {
            minutes = minutes + 1;
            seconds = 0;
            }
            if (((minutes_max == minutes) && (seconds_max <= seconds))) {
                stoper_stop=1;
                clearInterval(intervalID);
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
    if (stoper_stop==1){
        clearInterval(intervalID);
        minutes = 0;
        seconds = 0;
    }
}

exports.stoper_time = function () {
    return {seconds: seconds, minutes: minutes};
};