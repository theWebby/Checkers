const FIRST_TILE = "black";
const TILE_SIDE_LENGTH = 80;
const GRID_SIDE_LENGTH = 8;
const GRID_DRAW_SPEED = 1;
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

function updateBoard(){
    //Wait for map to be setup
    if(typeof map == "function"){
        return;
    }

    // console.log(map.initilized);
    if (!map.initilized){
        return;
    }

    console.log(map.needsUpdate);
    if(map.needsUpdate){
        map.draw();
    }
}

class MouseHandler {
    static mousePressHandler(){
        var gridX = Math.floor(mouseX / TILE_SIDE_LENGTH);
        var gridY = Math.floor(mouseY / TILE_SIDE_LENGTH);
        
        return {
            isValid: this.validClick(gridX, gridY),
            gridX: gridX,
            gridY: gridY
        }
        
    }

    static validClick(gridX, gridY){
        if (gridX >= GRID_SIDE_LENGTH || gridX < 0){
            return false;
        }

        if (gridY >= GRID_SIDE_LENGTH || gridY < 0){
            return false;
        }
        return true;
    }


}

function mousePressed(){ map.mousePressHandler() };

// {
//     console.log(mouseX);
//     console.log(mouseY);


    
//     // // Check if mouse is inside the circle
//     // let d = dist(mouseX, mouseY, 360, 200);
//     // if (d < 100) {
//     //   // Pick new random color values
//     //   r = random(255);
//     //   g = random(255);
//     //   b = random(255);
//     // }
//   }

async function setupGame(){
    map = new Map();
    player1 = new Player(color(255, 0,0), false);
    player2 = new Player(color(255, 255, 255), true);
    
}

class Map {
    constructor(){
        this.initilized = false;
        this.map = [];
        this.isPlayer1sTurn = true;
        this.needsUpdate = false;
        this.setupMap();
    }

    setupMap() {
        var c = GRID_CHAR;
        for (var i = 0; i < GRID_SIDE_LENGTH; i++){
            this.map.push([c, c, c, c, c, c, c, c]);
        }
        this.initilized = true;
    }

    printMapConsole(){
        var stringBuilder = "";
        for (var y = 0; y < GRID_SIDE_LENGTH; y++){
            for (var x = 0; x < GRID_SIDE_LENGTH; x++){
                stringBuilder = stringBuilder + this.map[y][x]
            }
            console.log(stringBuilder + "\t\t\t" + Math.random())
            stringBuilder = "";
        }
    }

    draw(){
        this.needsUpdate = false;
        drawGrid(false);
    }

    mousePressHandler(){
        var selectedPiece;
        var mouseEvent = MouseHandler.mousePressHandler();
        
        if (!mouseEvent.isValid){
            return;
        }

        selectedPiece = this.map[mouseEvent.gridY][mouseEvent.gridX];
        if (selectedPiece == GRID_CHAR){
            return;
        }

        this.movePiece(selectedPiece, 1, -1)
    }

    movePiece(selectedPiece, dx, dy){
        // console.log(selectedPiece);
        this.map[selectedPiece.y][selectedPiece.x] = GRID_CHAR;
        this.map[selectedPiece.y + dy][selectedPiece.x + dx] = selectedPiece;

        console.log("Move piece");
        drawTile(selectedPiece.x, selectedPiece.y, tileColor(selectedPiece.x, selectedPiece.y))
        
        selectedPiece.move(selectedPiece.x + dx, selectedPiece.y +dy);
        this.needsUpdate = true;
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
        //Generate pieces array and assign starting positions
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

        this.putPiecesOnMap();
    }

    putPiecesOnMap(){
        for (var i = 0; i < this.pieces.length; i++){
            var currentPiece = this.pieces[i];
            map.map[currentPiece.y][currentPiece.x] = currentPiece;
        }
    }
}

class Piece  {

    constructor(x, y, color) {
        this.color1 = color;
        this.move(x, y);
    }
    
    pieceColor() {
        return this.colorString == "red" ? color(255, 0, 0) : color(255, 255, 255);
    }
    
    draw() {
        drawPiece(this.x, this.y, this.color1);
    }
    
    move(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }
}







async function drawGrid(slow) {

    fill(0)
    rect(0, 0, TOTAL_LENGTH + 1, TOTAL_LENGTH + 1)
    for (let y = 0; y < GRID_SIDE_LENGTH; y++) {
        for (let x = 0; x < GRID_SIDE_LENGTH; x++) {
            await _setTimeout(() => {
                drawTile(x, y, tileColor(x, y));
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

function drawTile(x, y, color) {
    fill(color);
    console.log(x, y, color);
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