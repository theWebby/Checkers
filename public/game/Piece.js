class Piece  {
    constructor(x, y, color, isPlayer1) {
        // this.GHOST_COLOR = new color(0,255,0, 0.5);
        this.isNpc = !isPlayer1;
        this.isPlayer1 = isPlayer1;
        this.color1 = color;
        this.move(x, y);
        this.possiblePlaysDrawn = false;
        this.fLXY;
        this.fRXY;
    }
    
    move(x, y) {
        this.x = x;
        this.y = y;
        // setTimeout(() => {this.draw()}, 50);

        //dont clear square you are moving too
        if (this.fLXY && (this.fLXY.x == x && this.fLXY.y == y)){
            this.fLXY = null;
        }
        if (this.fRXY && (this.fRXY.x == x && this.fRXY.y == y)){
            this.fRXY = null;
        }

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

    drawSelected(){
        this.draw(1.5);
    }

    removeSelected(map){
        //because selected ones overlap, must redraw all around current square
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

    removePossiblePlays(){
        if(!this.possiblePlaysDrawn){
            return;
        }

        if (this.fRXY) { this.removePossiblePlay(this.fRXY) };
        if (this.fLXY) { this.removePossiblePlay(this.fLXY) };

        this.possiblePlaysDrawn = false;
    }

    removePossiblePlay(xy){ 
        var x, y;
        
        x = xy.x;
        y = xy.y;
        
        this.drawPiece(x, y, tileColor(x, y))
    }

    drawPossiblePlays(map){
        if (this.possiblePlaysDrawn){
            return;
        }
        
        var fLContent, fRContent, yDir, xDir;
        yDir = this.isPlayer1 ? -1 : 1;
        xDir = this.isPlayer1 ? 1 : -1;
        
        this.fLXY = {
            x: this.x - xDir,
            y: this.y + yDir
        }
        
        this.fRXY = {
            x: this.x + xDir,
            y: this.y + yDir
        }
        
        if (MouseHandler.validXY(this.fRXY.x, this.fRXY.y)){
            fLContent = map[this.fLXY.y][this.fLXY.x];
        }
        
        if (MouseHandler.validXY(this.fLXY.x, this.fLXY.y)){
            fRContent = map[this.fRXY.y][this.fRXY.x];
        }
        
        if (fLContent == GRID_CHAR){
            this.drawPiece(this.fLXY.x, this.fLXY.y, color(0,255,0, 50));
            this.possiblePlaysDrawn = true;
        }
        else{
            this.fLXY = null;
        }

        if(fRContent == GRID_CHAR){
            this.drawPiece(this.fRXY.x, this.fRXY.y, color(0,255,0, 50));
            this.possiblePlaysDrawn = true;             
        }
        else{
            this.fRXY = null;
        }
    }
}