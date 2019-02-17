// import Map from "Map";
const FIRST_TILE = "black";
const TILE_SIDE_LENGTH = 80;
const GRID_SIDE_LENGTH = 8;
const GRID_DRAW_SPEED = 0;
const GRID_CHAR = '_';
const TOTAL_LENGTH = TILE_SIDE_LENGTH * GRID_SIDE_LENGTH;
const log = console.log;
var player1, player2, map, gameSetup = false;

async function setup() {
    createCanvas(TOTAL_LENGTH + 1, TOTAL_LENGTH + 1);
    Board.drawGrid(true);
    await setupGame();
    gameSetup = true;
}

async function draw() {
    if (!gameSetup){
        return;
    }

    map.detectHover();
}


async function setupGame(){
    return _setTimeout(() => {
        map = new Board();
        player1 = new Player(color(255, 0,0), false, true);
        player2 = new Player(color(255, 255, 255), true, false);
    }, 0)

}



function tileColor(x, y){
    var black = 0;
    var white = 1;
    
    if(FIRST_TILE == "black"){
        black = 1;
        white = 0;
    }
    
    return ((x + (y % 2 == 0 ? white : black)) % 2) * 255
}

function mousePressed(){ map.mousePressHandler() };