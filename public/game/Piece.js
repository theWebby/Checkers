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
        this.otherNeighbors = []
        this.move(x, y);
        this.isKing = true;
    }

    async moveClean(x, y, map){
        this.resetOverlap(map)
        await this.dontClearSquareYoureMovingToo(x, y);
        await this.removePossiblePlays(map);
        this.takePiece(x, y, map);
        this.move(x, y);
    }

    takePiece(x, y, map){
        let dx = this.x - x;
        let dy = this.y - y;

        console.log(dx)
        var xs = [], ys = [];

        if (dx > 1 || dx < -1){
            for (var i = this.x; i != x; dx < 0 ? i++ : i--){
                console.log(i)
                xs.push(i)
            }            

            for (var i = this.y; i != y; dy < 0 ? i++ : i--){
                ys.push(i)
            }
            
            for (var i = 0; i < xs.length; i = i + 2){
                xs.splice(i, 1)
                ys.splice(i, 1)
                i--;
            }

            for (var i = 0; i < xs.length; i++){
                map[ys[i]][xs[i]] = GRID_CHAR
                this.resetTile(xs[i], ys[i], map)
            }
        }
    }

    async dontClearSquareYoureMovingToo(x, y){
        console.log("len", x, y)
        this.otherNeighbors = await this.otherNeighbors.filter(neighbor => neighbor.x != x || neighbor.y != y);        
        console.log("len", this.otherNeighbors.length)
    }
    
    move(x, y) {
        this.x = x;
        this.y = y;
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

    async removePossiblePlays(map){
        return new Promise((resolve, reject) => {
            if(!this.possiblePlaysDrawn){
                return;
            }
    
            // if (this.neighbors.fRXY) { this.removePossiblePlay(this.neighbors.fRXY, map) };
            // if (this.neighbors.fLXY) { this.removePossiblePlay(this.neighbors.fLXY, map) };
    
            this.otherNeighbors.forEach(neighbor => {
                this.removePossiblePlay(neighbor, map)
            });
    
            this.otherNeighbors = []
            this.possiblePlaysDrawn = false;
            resolve();
        })
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
            this.drawPossiblePlay(this.neighbors.fLXY, lookDirs.FRONT.LEFT, {}, map);
        }
        if (this.neighbors.fRXY){
            this.drawPossiblePlay(this.neighbors.fRXY, lookDirs.FRONT.RIGHT, {}, map);
        }
    }
    
    drawPossiblePlaysBack(map){
        this.neighbors.bLXY = this.getLookCoordinates(lookDirs.BACK.LEFT, 1)
        this.neighbors.bRXY = this.getLookCoordinates(lookDirs.BACK.RIGHT, 1)
        
        if (this.neighbors.bLXY){
            this.drawPossiblePlay(this.neighbors.bLXY, lookDirs.BACK.LEFT, {}, map);
        }
        if (this.neighbors.bRXY){
            this.drawPossiblePlay(this.neighbors.bRXY, lookDirs.BACK.RIGHT, {}, map);
        }
    }
    
    drawPossiblePlay(coordinates, lookDir, options,map){
        options.jumpCount = options.jumpCount || 0;
        options.depth = options.depth || 1;
        options.lastWasPlayer = options.lastWasPlayer || false;

        if (MouseHandler.validXY(coordinates.x, coordinates.y)){
            var content = map[coordinates.y][coordinates.x];
        }
        else{
            return
        }

        if(content == GRID_CHAR){

            this.drawPiece(coordinates.x, coordinates.y, color(0,255,0, 50));
            map[coordinates.y][coordinates.x] = POSS_PLAY_CHAR;
            this.possiblePlaysDrawn = true;
            this.otherNeighbors.push(coordinates);

            if (options.jumpCount > 0 && options.lastWasPlayer){
                options.depth++;
                options.lastWasPlayer = false;
                this.drawPossiblePlay(this.getLookCoordinates(lookDir, options.depth), lookDir, options, map)
            }
        } 
        else if (content.isPlayer1 != this.isPlayer1){ 
            coordinates = null;             
            options.depth++;
            options.jumpCount++;
            options.lastWasPlayer = true;
            this.drawPossiblePlay(this.getLookCoordinates(lookDir, options.depth), lookDir, options, map)
            if (options.lastWasPlayer){return}
        }
        else{
            coordinates = null; 
        }
    }
}