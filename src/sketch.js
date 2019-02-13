// import Map from "Map";
const FIRST_TILE = "black";
const TILE_SIDE_LENGTH = 80;
const GRID_SIDE_LENGTH = 8;
const GRID_DRAW_SPEED = 0;
const GRID_CHAR = '_';
const TOTAL_LENGTH = TILE_SIDE_LENGTH * GRID_SIDE_LENGTH;

var player1, player2, map;

async function setup() {
    createCanvas(TOTAL_LENGTH + 1, TOTAL_LENGTH + 1);
    await drawGrid(true);
    await setupGame();
}

function draw() {
    // updateBoard();
}


async function setupGame(){
    map = new Board();
    player1 = new Player(color(255, 0,0), false);
    player2 = new Player(color(255, 255, 255), true);
}

async function drawGrid(slow) {
    fill(0)
    rect(0, 0, TOTAL_LENGTH + 1, TOTAL_LENGTH + 1)
    for (let y = 0; y < GRID_SIDE_LENGTH; y++) {
        for (let x = 0; x < GRID_SIDE_LENGTH; x++) {
            await _setTimeout(() => {
                Board.drawTile(x, y, tileColor(x, y));
            }, slow ? GRID_DRAW_SPEED : 0) //(y * GRID_SIDE_LENGTH) + x) * 
        }
    }
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