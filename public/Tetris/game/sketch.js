const STEP_INTERVAL = 370;
const MAP_HEIGHT = 20;
const MAP_WIDTH = 10;
const TILE_WIDTH = 40;
const C_BLANK = ' ';
const C_BLOCK = 'X';
var gameStepCount = 0;
var gameGrid;
var gamePaused = false, gameOver = false;
var score = 0;

function mouseClicked(){
    if (gameOver){
        restart()
        return;
    }
    this.gamePaused = !this.gamePaused;
}

function restart(){

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        gameGrid.moveActiveShapeDir(-1);
    } else if (keyCode === RIGHT_ARROW) {
        gameGrid.moveActiveShapeDir(1)
    } else if (keyCode === DOWN_ARROW) {
        gameGrid.moveActiveShape();
        gameGrid.draw();
    } else if (keyCode === UP_ARROW) {
        gameGrid.activeShape.rotate();
        gameGrid.draw();
    }
}

async function setup() {
    this.gameGrid = new Grid();
    createCanvas(MAP_WIDTH * TILE_WIDTH, MAP_HEIGHT * TILE_WIDTH);     
    nextGameStep()
}

function nextGameStep(){
    setTimeout(() => {
        if (this.gamePaused){
            nextGameStep();
            return;
        }

        this.gameStepCount++;
        this.gameStep();
        if (this.gameOver){
            console.log("Game Over")
            var gameOverString = "GAME OVER\n\nScore: " + score;
            var name = prompt('GAME OVER! \n\n You scored ' + score + '\n\n Please enter your name to appear on the leaderboard.');
            if(name == null){
                location.reload();
            }
            else{
                ScoreBoard.setHighScore(name == '' ? 'Anon' :name, score)
                this.gamePaused = true;
            }
        }
        nextGameStep();
    }, STEP_INTERVAL)
}

function gameStep() {   
    this.gameGrid.moveActiveShape();
    this.gameGrid.draw();
    updateCurrentScore();
    this.gameGrid.checkRows();
}

function updateCurrentScore(){
    document.getElementById("current-score").innerHTML = "Current Score: " + score
}










function clone(o){
    return JSON.parse(JSON.stringify(o));
}
