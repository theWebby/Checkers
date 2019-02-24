class Grid {
    constructor() {
        this._initMap();
        this.activeShape = new Shape(this.map);
    }

    _initMap(){
        this.map = [];
        var row = [];
        for (var i = 0; i < MAP_HEIGHT; i++){
            for(var j = 0; j < MAP_WIDTH; j++){
                row.push(C_BLANK);
            }
            this.map.push(row);
            row = [];
        }
    }

    checkRows(){
        var rowComplete;
        for (var y = MAP_HEIGHT-1; y > 0; y--){
            rowComplete = true;
            for(var x = 0; x < MAP_WIDTH; x++){
                if(this.map[y][x] == C_BLANK || this.map[y][x] == this.activeShape){
                    rowComplete = false;
                    break;
                }
            }

            if (rowComplete){
                this.removeRow(y);
                this.moveRowsDownFrom(y);
            }
        }
    }

    moveRowsDownFrom(y){
        for (var i = y - 1; i > 1; i--){
            for (var x = 0; x < MAP_WIDTH; x++){
                this.map[i+1][x] = this.map[i][x];
                this.map[i][x] = C_BLANK; //todo: better
            }    
        }
    }

    removeRow(y){
        for (var x = 0; x < MAP_WIDTH; x++){
            this.map[y][x] = C_BLANK;
        }
    }

    moveActiveShapeDir(dir){
        if (this.activeShapeCanMoveX(dir)){
            this.activeShape.moveX(dir);
            this.draw();
        }
    }

    moveActiveShape(){
        if (this.activeShapeCanMoveDown()){
            this.activeShape.moveDown();
        }
        else{
            if(!this.activeShape.onGridMap()){
                gameOver = true;
                return;
            }
            this.activeShape.stampMap();
            this.activeShape = new Shape(this.map);
            this.moveActiveShape();
            this.moveActiveShape();
        }
    }

    activeShapeCanMoveDown(){
        var bottomRowIndex = this.activeShape.map.length-1;
        var mapX, mapY;
        for(var i = 0; i < this.activeShape.map[bottomRowIndex].length; i++){
            mapX = this.activeShape.gridMapX + i;
            mapY = this.activeShape.gridMapY + bottomRowIndex;
            var count = 0;

            if (mapY + 1 >= MAP_HEIGHT){
                return false;
            }

            //if the next position is on the board and is a block
                count = 0;
                while ((this.activeShape.map[bottomRowIndex - count][i] != C_BLOCK)) {
                    count++;
                }

                if(!Grid.validXY(mapX, mapY + 1 - count)){
                    return true;
                }

                if (this.map[mapY + 1 - count][mapX] != C_BLANK){
                    return false;
                }
        }
        return true;
    }

    activeShapeCanMoveX(dir){
        
        var colIndex = dir > 0 ? this.activeShape.map[0].length-1 : 0;
        
        var mapX, mapY;
        for(var i = 0; i < this.activeShape.map.length; i++){
            mapX = this.activeShape.gridMapX + colIndex;
            mapY = this.activeShape.gridMapY + i;
            // mapX = this.activeShape.map[colIndex][gridMapX + colIndex];
            // mapY = this.activeShape.map[colIndex][gridMapY + i];
            var count = 0;
            
            if (mapX + dir >= MAP_WIDTH || mapX + dir < 0){
                return false;
            }
            
            //if the next position is on the board and is a block
            count = 0;
            while ((this.activeShape.map[i][colIndex - count] != C_BLOCK)) {
                dir > 0 ? count++ : count--;
                console.log('whiile', count)
            }
            
            if(mapX + dir - count >= MAP_WIDTH || mapX + dir < 0){
                return false;
            }
            
            if (Grid.validXY(mapX + dir - count, mapY)){
                if (this.map[mapY][mapX + dir - count] != C_BLANK){
                    return false;
                }
            }
        }
        return true;
    }

    draw(){
        for (var i = 0; i < MAP_HEIGHT; i++){
            for(var j = 0; j < MAP_WIDTH; j++){
                this.doFill(this.map[i][j])
                rect(j * TILE_WIDTH, i * TILE_WIDTH, TILE_WIDTH, TILE_WIDTH);        
            }
        }
    }

    logMapToConsole(){
        var row = "";
        for (var y = 0; y < MAP_HEIGHT; y++){
            for (var x = 0; x < MAP_WIDTH; x++){
                row += this.char(this.map[y][x])
            }
            console.log(row + "\t\t\t\t\t\t\t" + Math.random());
            row = "";
        }
    }

    char(o){
        if (typeof o == "string"){
            return o;
        }
        return o.char;
    }

    doFill(c){
        switch (c){
            case C_BLANK:
                fill(255, 255, 255);                    
            break
            default:
                fill(c.color);
        }
    }

    static validXY(x, y){
        if (y >= MAP_HEIGHT || x >= MAP_WIDTH){
            return false;
        }
        
        if (y < 0 || x < 0){
            return false    
        }

        return true;
    }

    static validXYRotation(x, y){
        if (y >= MAP_HEIGHT || x >= MAP_WIDTH){
            return false;
        }
        
        if (x < 0){
            return false    
        }

        return true;
    }
}