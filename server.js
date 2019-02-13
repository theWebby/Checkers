var express = require('express');
// var serveStatic = require('serve-static')
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
// app.use(serveStatic('public', {'index': 'index.html'}));

try{
    app.use(express.static('public'))
    var server = app.listen(3000);
}
catch(e){
    console.log(e);
}

// // This call back just tells us that the server has started
// function listenCallback() {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log('Example app listening at http://' + host + ':' + port);
// }

console.log("runn")
