class MouseHandler {
    static mousePressHandler(){
        var gridX = Math.floor(mouseX / TILE_SIDE_LENGTH);
        var gridY = Math.floor(mouseY / TILE_SIDE_LENGTH);
        
        return {
            isValid: this.validClick(gridX, gridY),
            gridX: gridX,
            gridY: gridY
        }
        
    }

    static validClick(gridX, gridY){
        if (gridX >= GRID_SIDE_LENGTH || gridX < 0){
            return false;
        }

        if (gridY >= GRID_SIDE_LENGTH || gridY < 0){
            return false;
        }
        return true;
    }
}

async function _setTimeout(fn, ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            fn()
            resolve()
        }, ms);
    });
}