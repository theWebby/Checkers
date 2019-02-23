class Shape {
    constructor(gridMap){
        score += 5;
        this.char = C_BLOCK;
        this.color = color(random(100, 255),random(100, 255),random(100, 255));
        this.gridMap = gridMap;
        this.map = shapeBox[Math.floor(Math.random() * shapeBox.length)];
        this.gridMapX = Math.floor(Math.random() * (MAP_WIDTH - this.map[0].length));
        this.gridMapY= -1 - this.map.length;
        console.log(this.map)
    }

    // move() {
    //     this.moveDown();
    // }

    stampMap(){
        this.placeOnGridMap({color: this.color, char: C_BLOCK});
    }

    moveX(dir){
        this.removeFromGridMap();
        this.gridMapX += dir;
        this.placeOnGridMap(this);
    }

    moveDown(){
        this.removeFromGridMap();
        this.gridMapY++;
        this.placeOnGridMap(this);
    }

    onGridMap(){
        for (var y = 0; y < this.map.length; y++){
            for (var x = 0; x < this.map[y].length; x++){
                if (Grid.validXY(this.gridMapX + x, this.gridMapY + y)){
                    return true;
                }
            }
        }
        console.log("game over not on grid")
        return false;
    }

    removeFromGridMap(){
        for (var y = 0; y < this.map.length; y++){
            for (var x = 0; x < this.map[y].length; x++){
                if (this.map[y][x] == C_BLANK){
                    continue;
                }

                if (!Grid.validXY(this.gridMapX + x, this.gridMapY + y)){
                    continue;
                }
                this.gridMap[this.gridMapY + y][this.gridMapX + x] = C_BLANK;
            }
        }
    }
    
    placeOnGridMap(o){
        for (var y = 0; y < this.map.length; y++){
            for (var x = 0; x < this.map[y].length; x++){
                if (this.map[y][x] == C_BLANK){                
                    continue;
                }

                if (!Grid.validXY(this.gridMapX + x, this.gridMapY + y)){
                    continue;
                }
                this.gridMap[this.gridMapY + y][this.gridMapX + x] = o;
            }
        }
    }
}