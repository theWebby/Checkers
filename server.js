try{
    var express = require('express');
    var app = express();

    app.use(express.static('public'))
    var server = app.listen(80, listenCallback);
   
    function listenCallback() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://' + host + ':' + port);
    }
    console.log("runn")  
    
    process.on('uncaughtException', function (e) {
        console.error(e);
        logErr(e);
        console.log("Node NOT Exiting...");
    });
    
}
catch(e){
    console.log(e);
    legErr(e);
}

function logErr(e){
    var fs = require('fs');
    var util = require('util');
    var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});

    console.log = function(d) { //
        log_file.write(util.format(d) + '\n');
    };
}