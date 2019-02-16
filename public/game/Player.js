class Player {
    constructor(color, isnNpc){
        this.isnNpc = isnNpc;
        this.color = color;
        this.pieces = [];
        this.isTurn = !isnNpc;
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