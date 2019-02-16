class Piece  {
    constructor(x, y, color, isNpc) {
        // this.GHOST_COLOR = new color(0,255,0, 0.5);
        this.isNpc = isNpc;
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

    draw() {
        this.drawPiece(this.x, this.y, this.color1);
    }

    drawPiece(x, y, color) {
        fill(color);
        ellipse(x * TILE_SIDE_LENGTH + (TILE_SIDE_LENGTH / 2), y * TILE_SIDE_LENGTH + (TILE_SIDE_LENGTH / 2), TILE_SIDE_LENGTH - 20, TILE_SIDE_LENGTH - 20);
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
        yDir = this.isNpc ? 1 : -1;
        xDir = this.isNpc ? -1 : 1;

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