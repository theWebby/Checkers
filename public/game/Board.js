class Board {
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

    static drawTile(x, y, color) {
        fill(color);
        rect(x * TILE_SIDE_LENGTH, y * TILE_SIDE_LENGTH, TILE_SIDE_LENGTH, TILE_SIDE_LENGTH);
    }

    getMouseOverPiece(){
        var selectedPiece;
        var mouseEvent = MouseHandler.getMouseGridXY();
        
        if (!mouseEvent.isValid){
            return;
        }

        selectedPiece = this.map[mouseEvent.gridY][mouseEvent.gridX];
        if (selectedPiece == GRID_CHAR){
            return false;
        }

        return selectedPiece;
    }

    selectedPiece(fn) {
        var selectedPiece = this.getMouseOverPiece()
        if(selectedPiece) {
            fn(selectedPiece)
        }
    }

    mousePressHandler(){
        this.selectedPiece((selectedPiece) => {
            this.movePiece(selectedPiece, 1, -1)
        })
    }

    detectHover() {
        this.selectedPiece((selectedPiece) => {
            console.log(selectedPiece.x, selectedPiece.y);
        })
    }

    movePiece(selectedPiece, dx, dy){
        // console.log(selectedPiece);
        this.map[selectedPiece.y][selectedPiece.x] = GRID_CHAR;
        this.map[selectedPiece.y + dy][selectedPiece.x + dx] = selectedPiece;

        console.log("Move piece");
        Board.drawTile(selectedPiece.x, selectedPiece.y, tileColor(selectedPiece.x, selectedPiece.y))
        
        selectedPiece.move(selectedPiece.x + dx, selectedPiece.y +dy);
        this.needsUpdate = true;
    }

    static drawGrid(slow) {
        fill(0)
        rect(0, 0, TOTAL_LENGTH + 1, TOTAL_LENGTH + 1)
        for (let y = 0; y < GRID_SIDE_LENGTH; y++) {
            for (let x = 0; x < GRID_SIDE_LENGTH; x++) {
                _setTimeout(() => {
                    Board.drawTile(x, y, tileColor(x, y));
                }, slow ? GRID_DRAW_SPEED : 0) //(y * GRID_SIDE_LENGTH) + x) * 
            }
        }
    }
}