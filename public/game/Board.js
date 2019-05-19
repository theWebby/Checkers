class Board {
    constructor(){
        this.initilized = false;
        this.map = [];
        this.isPlayer1sTurn = true;
        this.needsUpdate = false;
        this.setupMap();
        this.lastHoverPiece;
        this.lastSelectedPiece;
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
        
        console.log("__________________");
        for (var y = 0; y < GRID_SIDE_LENGTH; y++){
            for (var x = 0; x < GRID_SIDE_LENGTH; x++){
                stringBuilder = stringBuilder + (typeof this.map[y][x] == "object" ? 'o' : this.map[y][x])
            }
            console.log(stringBuilder + "\t\t\t" + Math.random())
            stringBuilder = "";
        }
        console.log("__________________");
    }

    static drawTile(x, y, color) {
        fill(color);
        rect(x * TILE_SIDE_LENGTH, y * TILE_SIDE_LENGTH, TILE_SIDE_LENGTH, TILE_SIDE_LENGTH);
    }

    getMouseOverGrid(){
        var gridContent;
        var mouseEvent = MouseHandler.getMouseGridXY();
        
        if (!mouseEvent.isValid){
            return;
        }

        gridContent = this.map[mouseEvent.gridY][mouseEvent.gridX];
        return gridContent;
    }

    getMouseOverPiece(){
        var gridContent = this.getMouseOverGrid();     

        if (!gridContent){
            return false;
        }

        if (gridContent == GRID_CHAR){
            return false;
        }

        return gridContent;
    }


    selectedPiece(fn) {
        var selectedPiece = this.getMouseOverPiece()
        if(selectedPiece) {
            fn(selectedPiece)
        }
    }

    //todo: improve
    mousePressHandler(){
        if (this.lastSelectedPiece){
            this.handleMoveEvent();
        }
        this.handleSelectPiece();
    }

    handleMoveEvent(){
        var xy = MouseHandler.getMouseGridXY();
        if (!xy.isValid) {return};
        var selectedContent = this.map[xy.gridY][xy.gridX]
        if (selectedContent != POSS_PLAY_CHAR){
            return;
        }

        this.movePiece(this.lastSelectedPiece, xy.gridX, xy.gridY)
        this.isPlayer1sTurn = !this.isPlayer1sTurn;
    }

    handleSelectPiece(){
        this.selectedPiece((selectedPiece) => {
            if(!this.isCurrentPlayersPiece(selectedPiece)){
                return
            }

            if (this.lastSelectedPiece){
                this.lastSelectedPiece.removeSelected(this.map);
            }


            if (this.lastSelectedPiece == selectedPiece){
                this.lastSelectedPiece = null;
                return
            }

            selectedPiece.drawSelected(this.map)
            this.lastSelectedPiece = selectedPiece;
        })
    }

    //todo:delete
    clearLastHover(newHoverPiece){
        if (this.lastHoverPiece){
            this.lastHoverPiece.removePossiblePlays(this.map);
        }
        
        this.lastHoverPiece = newHoverPiece;
    }

    detectHover() {
        // var selectedContent = this.getMouseOverGrid();
        
        // if (!selectedContent){
        //     return;
        // }
        // if (selectedContent == GRID_CHAR){
        //     this.clearLastHover()
        //     return;
        // }
        
        // //content must be piece
        // if(this.lastHoverPiece == selectedContent){
        //     return;
        // }
    
        // if(this.isCurrentPlayersPiece(selectedContent)){
        //     this.clearLastHover(selectedContent)
        //     selectedContent.drawPossiblePlays(this.map)
        // }


    }

    isCurrentPlayersPiece(selectedPiece){
        if(this.isPlayer1sTurn && selectedPiece.isPlayer1){
            return true;
        }
        if(!this.isPlayer1sTurn && !selectedPiece.isPlayer1){
            return true
        }
        return false;
    }

    movePiece(selectedPiece, newX, newY){
        var dx = newX - selectedPiece.x;
        var dy = newY - selectedPiece.y;

        // console.log(selectedPiece);
        this.printMapConsole();
        this.map[selectedPiece.y][selectedPiece.x] = GRID_CHAR;
        this.map[selectedPiece.y + dy][selectedPiece.x + dx] = selectedPiece;
        this.printMapConsole();
        // console.log(this.map[selectedPiece.y + dy][selectedPiece.x + dx]);

        console.log("Move piece");
        // Board.drawTile(selectedPiece.x, selectedPiece.y, tileColor(selectedPiece.x, selectedPiece.y))
        
        selectedPiece.moveClean(selectedPiece.x + dx, selectedPiece.y +dy, this.map);
        this.printMapConsole();
        this.needsUpdate = true;
        this.lastSelectedPiece = null;
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