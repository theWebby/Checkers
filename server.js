var fs = require('fs');
var util = require('util');

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
    
    app.get('/Tetris/getHighScores', function(req, res) {
        var scores = getHighScores();
        res.send(scores)
        })
    
    app.put('/Tetris/setHighScore/:name/:score', function(req, res) {
        var name = req.params.name;
        var score = req.params.score;
        var scores = getHighScores();

        var i;
        for (i = 0; i < scores.length; i++){
            if (parseInt(scores[i].score) < score){
                break;
            }
        }

        scores.splice(i, 0, {name: name, score: score})
        
        if (scores.length > 50){
            scores.pop();
        }

        writeHighScore(scores, () => {
            res.send();
        })

        
    })

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

function getHighScores(){
    var scoresRaw = readHighScores(), scores = [];
    for (score in scoresRaw){
        if(scoresRaw[score].length < 1){
            continue;
        }
        var info = scoresRaw[score].split(', ');
        scores.push({
            name: info[0],
            score: info[1]
        })
    }
    return scores;
}

function readHighScores(){
    return fs.readFileSync('public/Tetris/highScores.txt').toString().split("\r\n");
}

function writeHighScore(scores, callback){
    var scoreString = ""
    for(score in scores){
        scoreString += scores[score].name + ', ' + scores[score].score + (score < scores.length - 1 ? "\r\n" : '');
    }
    try{
        fs.writeFileSync('public/Tetris/highScores.txt', scoreString);
        callback();
    } catch (e){
        throw e
    }
}

function logErr(e){
    var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});

    console.log = function(d) { //
        log_file.write(util.format(d) + '\n');
    };
}