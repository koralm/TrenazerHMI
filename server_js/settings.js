var fs = require('fs');

exports.dupa = function (data){
    console.log(data)
    wstream_c = fs.createWriteStream("dupa.init");
    wstream_c.write(JSON.stringify(data, null, 2));
}


