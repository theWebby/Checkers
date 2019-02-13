class Piece  {
    constructor(x, y, color) {
        this.color1 = color;
        this.move(x, y);
    }
    
    pieceColor() {
        return this.colorString == "red" ? color(255, 0, 0) : color(255, 255, 255);
    }
    
    draw() {
        this.drawPiece(this.x, this.y, this.color1);
    }

    drawPiece(x, y, color) {
        fill(color);
        // circle(, , TILE_SIDE_LENGTH - 20);
        ellipse(x * TILE_SIDE_LENGTH + (TILE_SIDE_LENGTH / 2), y * TILE_SIDE_LENGTH + (TILE_SIDE_LENGTH / 2), TILE_SIDE_LENGTH - 20, TILE_SIDE_LENGTH - 20);
        // rect(, y * TILE_SIDE_LENGTH, TILE_SIDE_LENGTH, TILE_SIDE_LENGTH);
    }
    
    move(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }
}