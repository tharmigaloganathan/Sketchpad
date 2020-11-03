const ModeEnum = {
    DRAW: "Draw",
    EDIT: "Edit",
    SELECT: "Select/Deselect",
    MOVE: "Move",
    COPY: "Copy/Paste",
    CUT: "Cut",
    FREEHAND : "Freehand",
    LINE : "Line",
    CIRCLE : "Circle",
    SQUARE : "Square",
    ELLIPSE: "Ellipse",
    RECTANGLE: "Rectangle",
    OPENPOLYGON: "Open Polygon",
    CLOSEDPOLYGON: "Closed Polygon",
    NONE: "none"
}
var board = document.getElementById('board'),
    gesture = false,
    brush = 'black',
    radius = 2.5,
    mainMode = ModeEnum.DRAW,
    subMode = ModeEnum.FREEHAND,
    selected = [],
    groupsSelected = 0,
    data = [],
    dataIndex = -1,
    move = {x1: 0, y1:0, x2:0, y2:0};
    freehand = {m: '', l:''},
    line = {x1:0, y1:0, x2:0, y2:0},
    circle = {cx:0, cy:0, r:0},
    square = {x:0, y:0, width:0, height:0},
    ellipse = {cx:0, cy:0, rx:0, ry:0},
    rectangle = {x:0, y:0, width:0, height:0},
    openpolygon = {points:"", x:0, y:0},
    closedpolygon = {points:"", x:0, y:0},
    copy = {x:0, y:0},
    copyInitialized = false;
// if (localStorage.svg) {
//     document.body.removeChild(board);
//     document.getElementById('nav').insertAdjacentHTML('beforebegin', localStorage.svg);
//     board = document.getElementById('board');
// }
save();

function changeMainMode(newMode) {
    mainMode = ModeEnum[newMode];
    subMode = ModeEnum.NONE;
    document.getElementById("edit-nav").style.display = "none";
    document.getElementById("draw-nav").style.display = "none";
    if (mainMode === ModeEnum.EDIT) {
        changeSubMode(document.getElementById("edit-select").value);
        document.querySelector("svg").style.cursor = "auto";
        document.getElementById("edit-nav").style.display = "inline";
        document.getElementById("mode-label").innerText = "Current Mode: Edit (" + subMode + ")";
        document.getElementById("instruction-label").innerText = "Click a shape to select, click again to deselect. You can Move, Copy/Paste, Group, Ungroup or Discard your selection!";
    } else if (mainMode === ModeEnum.DRAW) {
        changeSubMode(document.getElementById("draw-select").value);
        document.querySelector("svg").style.cursor = "none";
        document.getElementById("draw-nav").style.display = "inline";
        document.getElementById("mode-label").innerText = "Current Mode: Draw (" + subMode + ")";
    }
}

function changeSubMode(newMode) {
    subMode = ModeEnum[newMode];
    document.getElementById('mode-label').innerText = "Current Mode: " + mainMode + " (" + subMode + ")";
    if (subMode === ModeEnum.SELECT) {
        document.querySelector("svg").style.cursor = "auto";
        document.getElementById("instruction-label").innerText = "Click a shape to select, click again to deselect. You can Move, Copy/Paste, Group, Ungroup or Discard your selection!";
    } else if (subMode === ModeEnum.MOVE) {
        document.querySelector("svg").style.cursor = "pointer";
        document.getElementById("instruction-label").innerText = "Click and drag to move your selection!";
    } else if (subMode === ModeEnum.COPY) {
        document.querySelector("svg").style.cursor = "auto";
        document.getElementById("instruction-label").innerText = "Click on your selection to copy. Click on a new location to paste.";
    } else if (subMode === ModeEnum.CUT) {
        document.querySelector("svg").style.cursor = "auto";
        document.getElementById("instruction-label").innerText = "Click on your selection to cut. Click on a new location to paste.";
    } else if (subMode === ModeEnum.FREEHAND) document.getElementById("instruction-label").innerText = "Downclick anywhere and move cursor to start drawing! Go to Edit Mode for advanced tools.";
    else if (subMode === ModeEnum.OPENPOLYGON || subMode === ModeEnum.CLOSEDPOLYGON) document.getElementById("instruction-label").innerText = "Polygon Mode: Click to start, then move cursor, click again to create a vertex, and double-click to complete the shape! Go to Edit Mode for advanced tools.";
}

board.addEventListener('click', editTools);
function editTools(e) {
    if(subMode === ModeEnum.SELECT) selectShape(e);
    else if(subMode === ModeEnum.COPY) copyShape(e);
    else if(subMode === ModeEnum.CUT) cutShape(e);
}

board.addEventListener('mousedown',lineStart);
board.addEventListener('touchstart',lineStart);
function lineStart(e) {
    if(subMode === ModeEnum.FREEHAND) {
        freehand.m = 'M'+(e.clientX || e.touches[0].clientX)+','+(e.clientY || e.touches[0].clientY)+' ';
        drawFreehand(e);
        gesture = true;
        e.preventDefault();
    } else if(subMode === ModeEnum.LINE) {
        line.x1 = e.clientX || e.touches[0].clientX;
        line.y1 = e.clientY || e.touches[0].clientY;
        drawLine(e);
        gesture = true;
    } else if(subMode === ModeEnum.CIRCLE) {
        circle.cx = e.clientX || e.touches[0].clientX;
        circle.cy = e.clientY || e.touches[0].clientY;
        drawCircle(e);
        gesture = true;
    } else if(subMode === ModeEnum.SQUARE) {
        square.x = e.clientX || e.touches[0].clientX;
        square.y = e.clientY || e.touches[0].clientY;
        drawSquare(e);
        gesture = true;
    } else if(subMode === ModeEnum.ELLIPSE) {
        ellipse.cx = e.clientX || e.touches[0].clientX;
        ellipse.cy = e.clientY || e.touches[0].clientY;
        drawEllipse(e);
        gesture = true;
    } else if(subMode === ModeEnum.RECTANGLE) {
        rectangle.x = e.clientX || e.touches[0].clientX;
        rectangle.y = e.clientY || e.touches[0].clientY;
        drawRectangle(e);
        gesture = true;
    } else if(subMode === ModeEnum.MOVE) {
        move.x1 = e.clientX || e.touches[0].clientX;
        move.y1 = e.clientY || e.touches[0].clientY;
        gesture = true;
    }
}

board.addEventListener('mousemove',lineMove);
board.addEventListener('touchmove',lineMove);
function lineMove(e) {
    if(subMode === ModeEnum.FREEHAND && gesture === true) {
        drawFreehand(e);
    } else if(subMode === ModeEnum.LINE && gesture === true) {
        drawLine(e);
    } else if(subMode === ModeEnum.CIRCLE && gesture === true) {
        drawCircle(e);
    } else if(subMode === ModeEnum.SQUARE && gesture === true) {
        drawSquare(e);
    } else if(subMode === ModeEnum.ELLIPSE && gesture === true) {
        drawEllipse(e);
    } else if(subMode === ModeEnum.RECTANGLE && gesture === true) {
        drawRectangle(e);
    } else if(subMode === ModeEnum.OPENPOLYGON && gesture === true) {
        drawOpenPolygon(e);
        console.log("moving poly draw");
    } else if(subMode === ModeEnum.CLOSEDPOLYGON && gesture === true) {
        drawClosedPolygon(e);
        console.log("moving poly draw");
    }
    if(subMode !== ModeEnum.MOVE && subMode !== ModeEnum.SELECT) { //move cursor
        document.getElementById('cursor').style.top = e.clientY-radius+'px';
        document.getElementById('cursor').style.left = e.clientX-radius+'px';
    }
}

board.addEventListener('mouseup',lineEnd);
board.addEventListener('touchend',lineEnd);
function lineEnd(e) {
    console.log("clicking");
    if(subMode === ModeEnum.FREEHAND) {
        drawFreehand(e);
        freehand.l = '';
        gesture = false;
        save();
    } else if(subMode === ModeEnum.LINE) {
        drawLine(e);
        gesture = false;
        save();
    } else if(subMode === ModeEnum.CIRCLE) {
        drawCircle(e);
        gesture = false;
        save();
    } else if(subMode === ModeEnum.SQUARE) {
        drawSquare(e);
        gesture = false;
        save();
    } else if(subMode === ModeEnum.ELLIPSE) {
        drawEllipse(e);
        gesture = false;
        save();
    } else if(subMode === ModeEnum.RECTANGLE) {
        drawRectangle(e);
        gesture = false;
        save();
    } else if(subMode === ModeEnum.OPENPOLYGON) {
        if (event.detail === 1 && gesture === false) { //starting poly draw
            let x = e.clientX || e.touches[0].clientX;
            let y = e.clientY || e.touches[0].clientY;
            openpolygon.points = x + "," + y + " ";
            drawOpenPolygon(e);
            gesture = true;
        } else if (event.detail === 1 && gesture === true) { //continuing poly draw
            let x = e.clientX || e.touches[0].clientX;
            let y = e.clientY || e.touches[0].clientY;
            openpolygon.points += x + "," + y + " ";
            drawOpenPolygon(e);
        } else {
            gesture = false; //if double-click, end shape drawing
            save();
        }
    } else if(subMode === ModeEnum.CLOSEDPOLYGON) {
        if (event.detail === 1 && gesture === false) { //starting poly draw
            closedpolygon.x = e.clientX || e.touches[0].clientX;
            closedpolygon.y = e.clientY || e.touches[0].clientY;
            closedpolygon.points = closedpolygon.x + "," + closedpolygon.y + " ";
            drawClosedPolygon(e);
            gesture = true;
        } else if (event.detail === 1 && gesture === true) { //continuing poly draw
            let x = e.clientX || e.touches[0].clientX;
            let y = e.clientY || e.touches[0].clientY;
            closedpolygon.points += x + "," + y + " ";
            drawClosedPolygon(e);
        } else {
            gesture = false; //if double-click, end shape drawing
            save();
        }
    } else if(subMode === ModeEnum.MOVE) {
        moveShape(e);
        gesture = false;
    }
}

function group() {
    groupShapes();
    save();
}

function ungroup() {
    ungroupShapes();
    save();
}

function discard() {
    discardShapes();
    save();
}

function undo() {
    if(dataIndex > 0) {
        dataIndex = dataIndex - 1;
        var newBoard = data[dataIndex];
        console.log("undoing, new index: " + dataIndex);
        document.body.removeChild(board);
        document.getElementById('nav').insertAdjacentHTML('beforebegin', newBoard);
        board = document.getElementById('board');
        addEventListeners();
        if(selected.length > 0) {
            selected = [];
            groupsSelected = 0;
            document.getElementById("selected").innerText = "Number of Shapes Selected: " + groupsSelected;
        }
    }
}

function redo() {
    if(dataIndex < (data.length - 1)) {
        dataIndex = dataIndex + 1;
        var newBoard = data[dataIndex];
        console.log("redoing, new index: " + dataIndex);
        document.body.removeChild(board);
        document.getElementById('nav').insertAdjacentHTML('beforebegin', newBoard);
        board = document.getElementById('board');
        addEventListeners();
        if(selected.length > 0) {
            selected = [];
            groupsSelected = 0;
            document.getElementById("selected").innerText = "Number of Shapes Selected: " + groupsSelected;
        }
    }
}

function download() {
    var dataString = "";
    for(var i = 0; i < data.length; i++) {
        dataString += data[i] + "!|!";
    }
    dataString += dataIndex;
    // console.log(dataString.split("!|!"));
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataString));
    pom.setAttribute('download', "data.txt");

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

document.getElementById('upload').addEventListener('change',upload);
function upload(e) {
    var file = e.target.files[0];
    console.log(file);
    if (file){
        var reader = new FileReader();
        reader.onload = function(e) {
            var content = e.target.result;
            console.log(content);
            content = content.split("!|!");
            data = [];
            for(var i = 0; i < (content.length-1); i++) {
                data.push(content[i]);
            }
            dataIndex = parseInt(content[content.length-1]);
            console.log(data);
            console.log("data length: " + data.length + ", dataIndex: " + dataIndex);
            document.body.removeChild(board);
            document.getElementById('nav').insertAdjacentHTML('beforebegin', data[dataIndex]);
            board = document.getElementById('board');
            // board.innerText = board.innerText;
            addEventListeners();
        }
    }
    reader.readAsText(file);
}

function save() {
    var svgSnapshot = new XMLSerializer().serializeToString(board);
    let numberToDelete = data.length - dataIndex - 1;
    dataIndex++; //most recent version
    console.log("splicing " + numberToDelete + " elements");
    data.splice(dataIndex, numberToDelete, svgSnapshot);
    // data.push(svgSnapshot);
    // dataIndex++;
    console.log(data);
    console.log("saving snapshot index: " + dataIndex);
    // console.log(data);
    // document.body.removeChild(board);
    //     document.getElementById('nav').insertAdjacentHTML('beforebegin', localStorage.svg);
    //     board = document.getElementById('board');
}

// function clean() {
//     if(confirm('Would you like to clear the sketch?','') === true){
//         var paths = board.querySelectorAll('path, line');
//         for (i=0;i<paths.length;i++){ board.removeChild(paths[i]) }
//         localStorage.svg = '';
//     }
// }
// function render() {
//     var link = document.createElement('a'),
//     time = Date.now();
//     link.href = 'mailto:?subject=exported%20sketch&body=%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E'+encodeURIComponent(new XMLSerializer().serializeToString(board));
//     link.id = time;
//     document.body.appendChild(link);
//     document.getElementById(time).dispatchEvent(new MouseEvent('click'));
//     document.getElementById(time).parentNode.removeChild(document.getElementById(time));
// }
// function download() {
//     var link = document.createElement('a'),
//         time = Date.now(),
//         svg = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'+new XMLSerializer().serializeToString(board);
//         link.id = time;
//         link.setAttribute('download','sketch.svg');
//     link.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(svg);
//     document.body.appendChild(link);
//     document.getElementById(time).dispatchEvent(new MouseEvent('click'));
//     document.getElementById(time).parentNode.removeChild(document.getElementById(time));
// }

// document.getElementById('upload').addEventListener('change',importSVG);
// function importSVG(e) {
//     var file = e.target.files[0];
//     if (file){
//         var reader = new FileReader();
//         reader.onload = function(e) {
//             var content = e.target.result;
//             board.innerHTML = content;
//         }
//     }
//     reader.readAsText(file);
// }
