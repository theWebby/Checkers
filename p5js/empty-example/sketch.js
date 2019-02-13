const FIRST_TILE = "black";
const TILE_SIDE_LENGTH = 80;
const GRID_SIDE_LENGTH = 8;
const GRID_DRAW_SPEED = 1;
const GRID_CHAR = '1';
const TOTAL_LENGTH = TILE_SIDE_LENGTH * GRID_SIDE_LENGTH;

var player1, player2, map;

async function setup() {
    createCanvas(TOTAL_LENGTH + 1, TOTAL_LENGTH + 1);
    await drawGrid();
    await setupGame();
}

function draw() {
    
}

async function setupGame(){
    player1 = new Player(color(255, 0,0), false);
    player2 = new Player(color(255, 255, 255), true);
    map = new Map();
}

class Map {
    constructor(){
        this.map = [];
        this.setupMap();
        this.printMapConsole();
    }

    setupMap() {
        var c = GRID_CHAR;
        for (var i = 0; i < GRID_SIDE_LENGTH; i++){
            this.map.push([c, c, c, c, c, c, c, c]);
        }
    }

    printMapConsole(){
        var stringBuilder = "";
        for (var y = 0; y < GRID_SIDE_LENGTH; y++){
            for (var x = 0; x < GRID_SIDE_LENGTH; x++){
                stringBuilder = stringBuilder + this.map[y][x]
            }
            console.log(stringBuilder)
            stringBuilder = "";
        }
    }
}

class Player {
    constructor(color, isnNpc){
        this.isnNpc = isnNpc;
        this.color = color;
        this.pieces = [];
        this.setupPieces();
    }

    setupPieces() {
        for(var row = 0; row < 3; row++){
            for (var i = 0; i < (GRID_SIDE_LENGTH / 2); i++){
                if (this.isnNpc){
                    this.pieces.push(new Piece(i*2 + ((row + (FIRST_TILE == "black" ? 0 : 1)) % 2), row, this.color))
                }
                else{
                    this.pieces.push(new Piece(i*2 + ((row + (FIRST_TILE == "black" ? 1 : 0)) % 2), GRID_SIDE_LENGTH - row - 1, this.color))
                }
            }
        }
    }
}

class Piece  {

    constructor(x, y, color) {
        this.color1 = color;
        this.x = x;
        this.y = y;
        this.draw();
    }

    pieceColor() {
        return this.colorString == "red" ? color(255, 0, 0) : color(255, 255, 255);
    }

    draw() {
        drawPiece(this.x, this.y, this.color1);
    }
}







async function drawGrid() {
    var black = 0;
    var white = 1;
    
    if(FIRST_TILE == "black"){
        black = 1;
        white = 0;
    }
    
    fill(0)
    rect(0, 0, TOTAL_LENGTH + 1, TOTAL_LENGTH + 1)
    for (let y = 0; y < GRID_SIDE_LENGTH; y++) {
        for (let x = 0; x < GRID_SIDE_LENGTH; x++) {
            await _setTimeout(() => {
                drawTile(x, y, ((x + (y % 2 == 0 ? white : black)) % 2) * 255);
            }, GRID_DRAW_SPEED) //(y * GRID_SIDE_LENGTH) + x) * 
        }
    }
}

function drawTile(x, y, color) {
    fill(color);
    rect(x * TILE_SIDE_LENGTH, y * TILE_SIDE_LENGTH, TILE_SIDE_LENGTH, TILE_SIDE_LENGTH);
}

function drawPiece(x, y, color) {
    fill(color);
    // circle(, , TILE_SIDE_LENGTH - 20);
    ellipse(x * TILE_SIDE_LENGTH + (TILE_SIDE_LENGTH / 2), y * TILE_SIDE_LENGTH + (TILE_SIDE_LENGTH / 2), TILE_SIDE_LENGTH - 20, TILE_SIDE_LENGTH - 20);
    // rect(, y * TILE_SIDE_LENGTH, TILE_SIDE_LENGTH, TILE_SIDE_LENGTH);
}







async function _setTimeout(fn, ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            fn()
            resolve()
        }, ms);
    });
}