function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpPutAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback();
    }
    xmlHttp.open("PUT", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

httpGetAsync('/Tetris/getHighScores', (response) => {
    scores = JSON.parse(response)
    console.log(scores)

    var scoreHtml = "";

    scoreHtml+="<ol>";
    for(s in scores){
        scoreHtml += ("<li>" + scores[s].name + " scored " + scores[s].score + "</li>")
    }
    scoreHtml+="</ol>";

    document.getElementById("high-scores").innerHTML = scoreHtml;
});

class ScoreBoard {
    static setHighScore(name,score){
        httpPutAsync('/Tetris/setHighScore/' + name + '/' + score, () => {
            location.reload(); 
        });
    }
}
