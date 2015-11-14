intervalID = setInterval(function () {
    seconds = seconds + 1;

    if (seconds % 60 == 0) {
        minutes = minutes + 1;
        seconds = 0;
    }
    if (minutes < 10 && seconds < 10) {
        document.getElementById("time_count_s").innerHTML = "0" + minutes + ":0" + seconds;
    }
    else if (minutes < 10 && seconds >= 10) {
        document.getElementById("time_count_s").innerHTML = "0" + minutes + ":" + seconds;
    }
    else if (minutes >= 10 && seconds < 10) {
        document.getElementById("time_count_s").innerHTML = minutes + ":0" + seconds;
    }
    else {
        document.getElementById("time_count_s").innerHTML = minutes + ":" + seconds;
    }

    if (document.getElementById("time_count_input_m").value == minutes && document.getElementById("time_count_input_s").value == seconds) {
        stop = 1;
    }

    if (stop == 1) {
        clearInterval(intervalID);
        document.getElementById("stopwatch_start").disabled = false;
    }

}, 1000);

document.getElementById("stopwatch_stop").onclick = function () {
    stop = 1;
    socket.emit('REC', 0);
    document.getElementById("rec_glyph_color").style.color = "black";
    document.getElementById("rec_text_color").style.color = "black";
};
};