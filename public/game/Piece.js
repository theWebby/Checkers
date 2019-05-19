const lookDirs = {
    FRONT: {
        RIGHT:  'FR',
        LEFT:   'FL'
    },
    BACK: {
        RIGHT: 'BR',
        LEFT: 'BL'
    } 
}

class Piece  {
    constructor(x, y, color, isPlayer1) {
        // this.GHOST_COLOR = new color(0,255,0, 0.5);
        this.isNpc = !isPlayer1;
        this.isPlayer1 = isPlayer1;
        this.color1 = color;
        this.possiblePlaysDrawn = false;
        this.neighbors = {
            fLXY: {},
            fRXY: {},
            bLXY: {},
            bRXY: {} 
        }
        this.move(x, y);
        this.isKing = false;
    }

    moveClean(x, y, map){
        this.resetOverlap(map)
        this.dontClearSquareYoureMovingToo(x, y);
        this.removePossiblePlays(map);
        this.move(x, y);
    }

    dontClearSquareYoureMovingToo(x, y){
        //dont clear square you are moving too
        if (this.neighbors.fLXY && (this.neighbors.fLXY.x == x && this.neighbors.fLXY.y == y)){
            this.neighbors.fLXY = null;
        }
        if (this.neighbors.fRXY && (this.neighbors.fRXY.x == x && this.neighbors.fRXY.y == y)){
            this.neighbors.fRXY = null;
        }
    }
    
    move(x, y) {
        this.x = x;
        this.y = y;
        // setTimeout(() => {this.draw()}, 50);

        this.dontClearSquareYoureMovingToo();
        this.draw();
    }

    draw(size) {
        if(!size) { size = 1 }

        this.drawPiece(this.x, this.y, this.color1, size);
    }
    
    drawPiece(x, y, color, size) {
        if(!size) { size = 1 }
        
        fill(color);
        ellipse(x * TILE_SIDE_LENGTH + (TILE_SIDE_LENGTH / 2), y * TILE_SIDE_LENGTH + (TILE_SIDE_LENGTH / 2), (TILE_SIDE_LENGTH - 20) * size, (TILE_SIDE_LENGTH - 20) * size);
    }

    drawSelected(map){
        this.draw(1.5);
        this.drawPossiblePlays(map)
    }

    removeSelected(map){
        //because selected ones overlap, must redraw all around current square
        this.resetOverlap(map)
        this.removePossiblePlays(map);
    }

    resetOverlap(map){
        this.resetTile(this.x, this.y, map);
        this.resetTile(this.x, this.y + 1, map);
        this.resetTile(this.x, this.y - 1, map);
        this.resetTile(this.x + 1, this.y, map);
        this.resetTile(this.x - 1, this.y, map);
    }

    resetTile(x, y, map){
        if (!MouseHandler.validXY(x, y)){
            return;
        }
        
        var tileContent = map[y][x]
        
        if (tileContent == GRID_CHAR){
            Board.drawTile(x, y, tileColor(x, y))
            return
        }
        
        // console.log(tileContent)
        Board.drawTile(x, y, tileColor(x, y))
        tileContent.draw();
    }

    removePossiblePlays(map){
        if(!this.possiblePlaysDrawn){
            return;
        }

        if (this.neighbors.fRXY) { this.removePossiblePlay(this.neighbors.fRXY, map) };
        if (this.neighbors.fLXY) { this.removePossiblePlay(this.neighbors.fLXY, map) };

        this.possiblePlaysDrawn = false;
    }

    removePossiblePlay(xy, map){ 
        var x = xy.x, y = xy.y;

        map[y][x] = GRID_CHAR;
        this.drawPiece(x, y, tileColor(x, y))
    }

    getLookCoordinates(direction, distance){
        //can these be in the constructor?
        var yDir = this.isPlayer1 ? -1 : 1;
        var xDir = this.isPlayer1 ? 1 : -1;

        switch(direction){
            case lookDirs.FRONT.RIGHT:
            return { y: this.y + (yDir * distance),     x: this.x + (xDir * distance) }
            case lookDirs.FRONT.LEFT:
            return { y: this.y + (yDir * distance),     x: this.x - (xDir * distance) }
            case lookDirs.BACK.RIGHT:
            return { y: this.y - (yDir * distance),     x: this.x + (xDir * distance) }
            case lookDirs.BACK.LEFT:
            return { y: this.y - (yDir * distance),     x: this.x - (xDir * distance) }            
        }
    }

    drawPossiblePlays(map){        
        if (this.possiblePlaysDrawn){
            return;
        }

        this.drawPossiblePlaysFront(map);        
        if (this.isKing){
            this.drawPossiblePlaysBack(map)
        }
    }
    
    drawPossiblePlaysFront(map){
        this.neighbors.fLXY = this.getLookCoordinates(lookDirs.FRONT.LEFT, 1)
        this.neighbors.fRXY = this.getLookCoordinates(lookDirs.FRONT.RIGHT, 1)
        
        if (this.neighbors.fLXY){
            this.drawPossiblePlay(this.neighbors.fLXY, map);
        }
        if (this.neighbors.fRXY){
            this.drawPossiblePlay(this.neighbors.fRXY, map);
        }
        // if (MouseHandler.validXY(this.neighbors.fRXY.x, this.neighbors.fRXY.y)){
        //     var fRContent = map[this.neighbors.fRXY.y][this.neighbors.fRXY.x];
        // }
        
        // if (MouseHandler.validXY(this.neighbors.fLXY.x, this.neighbors.fLXY.y)){
        //     var fLContent = map[this.neighbors.fLXY.y][this.neighbors.fLXY.x];
        // }
        
        // if (fLContent == GRID_CHAR){
        //     this.drawPossiblePlay(this.neighbors.fLXY.x, this.neighbors.fLXY.y, map);
        // } else{ this.neighbors.fLXY = null; }
        
        // if(fRContent == GRID_CHAR){
        //     this.drawPossiblePlay(this.neighbors.fRXY.x, this.neighbors.fRXY.y, map);     
        // } else { this.neighbors.fRXY = null; }
    }
    
    drawPossiblePlaysBack(map){
        this.neighbors.bLXY = this.getLookCoordinates(lookDirs.BACK.LEFT, 1)
        this.neighbors.bRXY = this.getLookCoordinates(lookDirs.BACK.RIGHT, 1)
        
        if (this.neighbors.bLXY){
            this.drawPossiblePlay(this.neighbors.bLXY, map);
        }
        if (this.neighbors.bRXY){
            this.drawPossiblePlay(this.neighbors.bRXY, map);
        }
    }
    
    drawPossiblePlay(coordinates, map){
        console.log(map);
        console.log(coordinates)

        if (MouseHandler.validXY(coordinates.x, coordinates.y)){
            var content = map[coordinates.y][coordinates.x];
        }

        if(content == GRID_CHAR){
            this.drawPiece(coordinates.x, coordinates.y, color(0,255,0, 50));
            map[coordinates.y][coordinates.x] = POSS_PLAY_CHAR;
            this.possiblePlaysDrawn = true;
        } else { 
            console.log("peice in the way")
            this.neighbors.fLXY = null;
            coordinates = null; }
    }
}