class Shape {
    constructor(gridMap){
        score += 5;
        this.char = C_BLOCK;
        this.color = color(colorBox[Math.floor(Math.random() * colorBox.length)])
        this.gridMap = gridMap;
        this.map = shapeBox[Math.floor(Math.random() * shapeBox.length)];
        this.gridMapX = Math.floor(Math.random() * (MAP_WIDTH - this.map[0].length));
        this.gridMapY= -1 - this.map.length;
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

    rotate(){
        var rotatedMap = this.rotateMatrix(clone(this.map));
        if (!this.validRotation(rotatedMap)){
            return false;
        }

        this.removeFromGridMap();
        this.map = rotatedMap;
        this.placeOnGridMap(this);
    }

    rotateMatrix(matrix) {

        var row = [], newMatrix = [];
        for(var j = matrix[0].length - 1; j >= 0; j--){
            for(var i = 0; i < matrix.length; i++){
                row.push(matrix[i][j]);
            }
            newMatrix.push(row);
            row = [];
        }
        return newMatrix;
    }

    transposeMap(){
        

        // var array = clone(this.map);
        // var newArray = [];
        // for(var i = 0; i < array.length; i++){
        //     newArray.push([]);
        // };
    
        // for(var i = 0; i < array.length; i++){
        //     for(var j = 0; j < array[i].length; j++){
        //         if(!Grid.validXY(this.gridMapX + i, this.gridMapY + j)){
        //             return;
        //         }
        //         newArray[j].push(array[i][j]);
        //     };
        // };

        // for (var i = 0; i < newArray.length; i++){
        //     if(newArray[i].length == 0){
        //         newArray.splice(i, 1);
        //     }
        // }
        // console.log(this.map);
        // console.log(newArray);

        // console.log(this.rotateMatrix(this.map));
        // this.map = this.rotateMatrix(this.map);

        // this.map = newArray;
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
        return false;
    }

    validRotation(map){
        for (var y = 0; y < map.length; y++){
            for (var x = 0; x < map[y].length; x++){
                if (!Grid.validXYRotation(this.gridMapX + x, this.gridMapY + y)){
                    return false;
                }
                if(Grid.validXY(this.gridMapX + x, this.gridMapY + y)){
                    if(this.gridMap[this.gridMapY + y][this.gridMapX + x] == C_BLOCK){
                        if(this.map[y][x] == C_BLOCK){
                            return false;
                        }
                    }
                }
            }
        }
        return true;
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