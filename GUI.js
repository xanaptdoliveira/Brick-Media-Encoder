/* p5.capture */
P5Capture.setDefaultOptions({
    format: "mp4",
    framerate: 25,
    disableUi: false
});

let font = 'source-code-pro';
let text_size = 14

/* UI Color Variables */
let UIcolors;

let UIcolorsDarkMode = {
    bg: "#000",
    text: "#f1f1f1",
    hover: "#C1C1C1",
    hovered: "#111111",
    canvas1_bg: "#202020",
    canvas2_bg: "#202020",
    gridcolor: "#9D9D9D",
    uipanelbg: "#99999955"
};

let UIcolorsLightMode = {
    bg: "#fff",
    text: "#000",
    hover: "#C1C1C1",
    hovered: "#757575",
    canvas1_bg: "#f7f7f7",
    canvas2_bg: "#f7f7f7",
    gridcolor: "#9D9D9D",
    uipanelbg: "#00000022"
};

let UIPanel;

let UIbutton = {
    size: 20,
    border_radius: 4,
    color_on: "#555555",
    color_off: "#959595",
    color_hovered: "#C1C1C1",
    color_pressed: "#757575",
    label_size: 14,
    label_offsetx: 10, // label x distance to button
    label_offsety: 15 // label y distance to button
}

let showGrid = true;
let bttn1 = true;
let bttn1x = 40;
let bttn1y = 550;
let bttn1col = '';
let d1 = '';

let darkMode = true;
let bttn2 = true;
let bttn2x = 40;
let bttn2y = 590;
let bttn2col = '';
let d2 = '';

let bttn3 = true;
let bttn3x = 40;
let bttn3y = 630;
let bttn3col = '';
let d3 = '';


function setupGUI() {

UIPanel = {
    x: 20,
    y: 20,
    w: 220,
    h: 655,
    xmarg: 20,
    ymarg: 30, 
    xleft: 130
}

    textFont(font);
    textSize(text_size);

    UIcolors = UIcolorsDarkMode;

    d1 = dist(mouseX, mouseY, bttn1x, bttn1y);
    d2 = dist(mouseX, mouseY, bttn2x, bttn2y);
    d3 = dist(mouseX, mouseY, bttn3x, bttn3y);
}

function drawGUI() {
    
    fill(UIcolors.uipanelbg);
    noStroke();
    rect(UIPanel.x, UIPanel.y, UIPanel.w, UIPanel.h, 10);

    fill(UIcolors.text);
    textLeading(24);
    text(
    'BRICK: '  + c_name + ' ' + w_mode + " x " + h_mode + '\n' + 
    'IMAGE:'  + "img" + mode,
        UIPanel.x + UIPanel.xmarg,
        UIPanel.y + UIPanel.ymarg);

    ////7///////////// Draw Lego Preview with active Params
    let lego_preview = {
        x: 100,
        y: 140,
        newW: w_mode * canvas.cell_size,
        newH: h_mode * canvas.cell_size,
        c: c
    };

    // Main viewbox of the brick
    push();
    stroke(0, 200);
    fill(lego_preview.c);
    rect(lego_preview.x, lego_preview.y, lego_preview.newW, lego_preview.newH);

    // Circles of the brick
    for (let i = 0; i < lego_preview.newW / canvas.cell_size; i += 1) {
        for (let j = 0; j < lego_preview.newH / canvas.cell_size; j += 1) {
            ellipse(
                lego_preview.x + i * canvas.cell_size + canvas.cell_size / 2,
                lego_preview.y + j * canvas.cell_size + canvas.cell_size / 2,
                canvas.cell_size - canvas.cell_size / 4
            );
        }
    }
    pop();

    
    //////////// Instructions
    fill(UIcolors.text);
    noStroke();
    text(
    '' + '\n' + '\n' +
    'KEYS'  + '\n' +
    'arrows: change size' + '\n' +  
    'c: change color'  + '\n' + 
    'r: rotate'  + '\n' + 
    'n: new brick' + '\n' + 
    'm: change drawing mode',
    UIPanel.x + UIPanel.xmarg,
    UIPanel.y + UIPanel.ymarg + 300);


    ///////////////// Draw Toggle Buttons
    //// TOGGLE GRID Button
    d1 = dist(mouseX, mouseY, bttn1x, bttn1y);
    d2 = dist(mouseX, mouseY, bttn2x, bttn2y);
    d3 = dist(mouseX, mouseY, bttn3x, bttn3y);

    buttons();
    push();
    strokeWeight(3);
    textSize(UIbutton.label_size);
    fill(bttn1col);
    rect(bttn1x, bttn1y, UIbutton.size, UIbutton.size, UIbutton.border_radius);
    
    fill(UIcolors.text);
    text("Show/Hide Grid", bttn1x + UIbutton.size + 10, bttn1y + 15);

    // TOGGLE DARK/LIGHT MODE Button
    fill(bttn2col);
    rect(bttn2x, bttn2y, UIbutton.size, UIbutton.size, UIbutton.border_radius);
    fill(UIcolors.text);
    text("Dark/Light Mode", bttn2x + UIbutton.size + UIbutton.label_offsetx, bttn2y + UIbutton.label_offsety);

    // Clear Canvas Button
    fill(bttn3col);
    rect(bttn3x, bttn3y, UIbutton.size, UIbutton.size, UIbutton.border_radius);
    fill(UIcolors.text);
    text("CLEAR CANVAS", bttn3x + UIbutton.size + 10, bttn3y + 15);
    pop();


    // Active Drawing Mode Text
    push();
    translate(windowWidth - UIPanel.xleft - UIPanel.xmarg,
        UIPanel.y);
    textSize(15);
    
    fill(UIcolors.text);
    text(drawingmodetitles[state],
        0, 34 + state * 34);

    fill(255, 90);    
    for(let i = 0; i < n_drawing_modes; i++) {
        text(drawingmodetitles[i], 0, i * 34 +34);
    }    
    pop();

}
