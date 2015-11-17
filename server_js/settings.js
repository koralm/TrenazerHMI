var fs = require('fs');

var settings_default = "";

exports.save = function (data){
    wstream_c = fs.createWriteStream("./settings/" + data.settings_name.toString() + ".init");
    wstream_c.write(JSON.stringify(data, null, 2));
}

exports.load_def = function (){
    settings_default = JSON.parse(fs.readFileSync("./settings/default.init", 'utf8'));
    return (settings_default);
}

