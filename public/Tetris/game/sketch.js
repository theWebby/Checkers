const STEP_INTERVAL = 800;
const MAP_HEIGHT = 10;
const MAP_WIDTH = 5;
const TILE_WIDTH = 30;
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
            console.log("Score: ", score) 
            this.gamePaused = true;
        }
        nextGameStep();
    }, STEP_INTERVAL)
}

function gameStep() {   
    this.gameGrid.moveActiveShape();
    this.gameGrid.draw();
    this.gameGrid.checkRows();
}










function clone(o){
    return JSON.parse(JSON.stringify(o));
}
