let drawingmodetitles = [
    "bricks",
    "images",
    "images2",
    "lines",
    "loop of lines",
    "circles",
    "rects",
    "mode7",
    "mode8",
    "mode9",
    "mode10",
];

// Saves (x, y, width, height, color) of bricks in lineString
function saveLineString(size) {
    let numbers = [];

    for (let i = 0; i < size; i++) {
        numbers[i] = 0;
    }

    for (let i = 0; i < bricks.length; i++) {
        for (let j = 0; j < size; j++) {
            if (bricks[i].mode == j) {
                numbers[j - 1]++;
            }
        }
    }

    lineString = [];
    lineString = new Array(size);
    for (let i = 0; i < lineString.length; i++) {
        lineString[i] = new Array(numbers[i]);
    }

    for (let i = 0; i < lineString.length; i++) {
        let which = 0;
        for (let j = 0; j < bricks.length; j++) {
            if (bricks[j].mode == i) {
                lineString[i][which] = "" +
                    float(bricks[j].x + (bricks[j].w / 2)) + "," +
                    float(bricks[j].y + (bricks[j].h / 2)) + "," +
                    float(bricks[j].w) + "," +
                    float(bricks[j].h) + "," +
                    String(bricks[j].c);
                which++;
            }
        }
    }
}

function graphics() {
    push();

    let teste = [];

    for (let i = 0; i < lineString.length; i++) {
        for (let j = 0; j < lineString[i].length; j++) {
            for (let k = 0; k < lineString[i].length; k++) {
                if ((k - j == 1 || k - j == 0) && lineString[i][j] != undefined && lineString[i][k] != undefined) {
                    let px = split(lineString[i][j], ',')[0];
                    let py = split(lineString[i][j], ',')[1];
                    let x = split(lineString[i][k], ',')[0]; // 0: brick x
                    let y = split(lineString[i][k], ',')[1]; // 1: brick y
                    let w = split(lineString[i][k], ',')[2]; // 2: brick w
                    let h = split(lineString[i][k], ',')[3]; // 3: brick h
                    let c = split(lineString[i][k], ',')[4]; // 4: brick color
                    let m = split(lineString[i][k], ',')[5]; // 4: image mode
                    //console.log(lineString[i][k]);

                    let teste2 = [px, py, x, y, w, h, c, m];
                    
                    teste.push(teste2);

                    if (state === 2) {
                        
                        for (let i = 0; i < bricks.length; i++) {
                            bricks[i].over();
                            bricks[i].updatePosition();
                            bricks[i].drawMedia2(px, py);                        
                        }

                    } else if (state === 3) {
                        graphics1(x, y, px, py, h, c); //Lines
                    } else if (state === 4) {
                        graphics2(x, y, px, py, w, h, c); // Loop of lines
                    } else if (state === 5) {
                        graphics3(x, y, px, py, h, c); // Circles
                    } else if (state === 6) {
                        graphics4(x, y, w, h, c); // Rects
                    } else if (state === 7) {
                        
                    } else if (state === 8) {
                        
                    }
                }
            }
        }
    }
    pop();


    return teste;
}

// Create a Line linking all objects with the same color,
// by the order they were added

// Lines
function graphics1(x, y, px, py, h, c) {
    push();
    stroke(c);
    strokeWeight(h/10);
    fill(c);
    line(px, py, x, y);
    pop();
}

// Loop of lines
function graphics2(x, y, px, py, w, h, c) {
    push();
    stroke(c);
    strokeWeight(2);
    for (let i = 0; i < h / canvas.cell_size; i += 1) {
        translate(0, i + w/10);
        line(px, py, x, y);
    }
    pop();
}

// Circles
function graphics3(x, y, px, py, h, c) {
    stroke(c);
    strokeWeight(2);
    fill(c);
    ellipse(x, y, h / 2);
    line(px, py, x, y);
}

// Rects
function graphics4(x, y, w, h, c) {
    push();
    noStroke();

    // fill(0);
    // rect(x - (h / 2) + w, y - (h / 2) + 0.5, h * 3, h - 1); //to hide stroke
    // fill(255);
    // rect(x - (w / 2), y - (h / 2), w, h); 
    stroke(255);
    strokeWeight(2)

    if(h >= 2) {
        fill(255);    
        rect(x - (w/2) - ((h - w) / 2),
            y - (h/2),
            h, h); 
        fill(0);
        rect(x - (w / 2), y - (h / 2), w, h); 
    }
    
    if (h < w) {
        fill(255);    
        rect(x - (w/2),
            y - (h/2) - ((w - h) / 2),
            w, w); 
        fill(0);
        rect(x - (w / 2), y - (h / 2), w, h); 
    }
    
    pop();
}