const TILE_SIDE_LENGTH = 80;
const GRID_SIDE_LENGTH = 10;
const TOTAL_LENGTH = TILE_SIDE_LENGTH * GRID_SIDE_LENGTH;

var isGridDrawn;

function setup() {
    createCanvas(TOTAL_LENGTH, TOTAL_LENGTH);
    isGridDrawn = false;
}

function draw() {
    if (!isGridDrawn) {
        drawGrid();
        isGridDrawn = true;
    }
}

function drawGrid() {
    // fill(125)
    // rect(0, 0, TOTAL_LENGTH + 10, TOTAL_LENGTH + 10)
    for (let y = 0; y < GRID_SIDE_LENGTH; y++) {
        for (let x = 0; x < GRID_SIDE_LENGTH; x++) {
            setTimeout(() => {
                console.log(x, y, GRID_SIDE_LENGTH)
                drawTile(x, y, ((x + (y % 2 == 0 ? 1 : 0)) % 2) * 255);
            }, ((y * GRID_SIDE_LENGTH) + x) * 20)
        }
    }
}

function drawTile(x, y, color) {
    fill(color);
    rect(x * TILE_SIDE_LENGTH, y * TILE_SIDE_LENGTH, TILE_SIDE_LENGTH, TILE_SIDE_LENGTH);
}