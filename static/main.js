function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function make2DArray(cols, rows) {
    let arr = new Array(Math.ceil(cols));
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(Math.ceil(rows));
    }
    return arr;
}
let grid;
let cols;
let rows;
let resolution = 10;

function setup(){
    const win_width  =  Math.ceil( windowWidth) 
    const win_height =  Math.ceil( windowHeight)
    
    createCanvas(win_width, win_height);
    background(0);
    cols = Math.ceil(win_width / resolution );
    rows = Math.ceil(win_height / resolution);
    
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(getRandomInt(2));
        }
    }
    frameRate(60)
    //  colorMode( HSB, 100);
};

function draw(){

     background(0)
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] === 1) {
                fill(getRandomInt(255), getRandomInt(255), getRandomInt(255));
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    let next = make2DArray(Math.ceil(cols), Math.ceil(rows));

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);
            
            if (state === 0 && neighbors === 3) {
                next[i][j] = 1;
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        
        }
    }
    grid = next;
};

function countNeighbors(grid, x, y) {
    let sum = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = Math.ceil((x + i + cols) % cols);
            let row = Math.ceil((y + j + rows) % rows);
            sum += grid[col][row];
            
        }
    }
    sum -= grid[x][y];
    return sum;
}

