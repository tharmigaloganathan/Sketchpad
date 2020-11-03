function drawFreehand(e) {
    freehand.l += 'L'+(e.clientX || e.changedTouches[0].clientX)+','+(e.clientY || e.changedTouches[0].clientY);
    var paths = document.querySelectorAll('#board path');
    if(gesture) board.removeChild(paths[paths.length-1]);
    var svgElem = document.createElementNS('http://www.w3.org/2000/svg','path');
    svgElem.setAttributeNS(null,'d',freehand.m+freehand.l);
    svgElem.setAttributeNS(null,'fill','none');
    svgElem.setAttributeNS(null,'stroke-linecap','round');
    svgElem.setAttributeNS(null,'stroke',document.getElementById('color').value);
    svgElem.setAttributeNS(null,'stroke-width',5);
    board.appendChild(svgElem);
    board.innerHTML = board.innerHTML; // force SVG repaint after DOM change
}

function drawLine(e) {
    line.x2 = e.clientX || e.touches[0].clientX;
    line.y2 = e.clientY || e.touches[0].clientY;
    var lines = document.querySelectorAll('#board line');
    if(gesture) board.removeChild(lines[lines.length-1]);
    var svgElem = document.createElementNS('http://www.w3.org/2000/svg','line');
    svgElem.setAttributeNS(null,'x1',line.x1);
    svgElem.setAttributeNS(null,'y1',line.y1);
    svgElem.setAttributeNS(null,'x2',line.x2);
    svgElem.setAttributeNS(null,'y2',line.y2);
    svgElem.setAttributeNS(null,'fill','none');
    svgElem.setAttributeNS(null,'stroke-linecap','round');
    svgElem.setAttributeNS(null,'stroke',document.getElementById('color').value);
    svgElem.setAttributeNS(null,'stroke-width',5);
    board.appendChild(svgElem);
    board.innerHTML = board.innerHTML; // force SVG repaint after DOM change
}

function drawCircle(e) {
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;
    circle.r = Math.max(Math.abs(x - circle.cx),Math.abs(y - circle.cy));
    var circles = document.querySelectorAll('#board circle');
    if(gesture) board.removeChild(circles[circles.length-1]);
    var svgElem = document.createElementNS('http://www.w3.org/2000/svg','circle');
    svgElem.setAttributeNS(null,'cx',circle.cx);
    svgElem.setAttributeNS(null,'cy',circle.cy);
    svgElem.setAttributeNS(null,'r',circle.r);
    svgElem.setAttributeNS(null,'fill','none');
    svgElem.setAttributeNS(null,'stroke',document.getElementById('color').value);
    svgElem.setAttributeNS(null,'stroke-width',5);
    board.appendChild(svgElem);
    board.innerHTML = board.innerHTML; // force SVG repaint after DOM change
}

function drawSquare(e) {
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;
    if(x < square.x || y < square.y) return;
    square.width = Math.max(Math.abs(x - square.x), Math.abs(y - square.y));
    square.height = Math.max(Math.abs(x - square.x), Math.abs(y - square.y));
    var squares = document.querySelectorAll('#board rect');
    if(gesture) board.removeChild(squares[squares.length-1]);
    var svgElem = document.createElementNS('http://www.w3.org/2000/svg','rect');
    svgElem.setAttributeNS(null,'x',square.x);
    svgElem.setAttributeNS(null,'y',square.y);
    svgElem.setAttributeNS(null,'width',square.width);
    svgElem.setAttributeNS(null,'height',square.height);
    svgElem.setAttributeNS(null,'fill','none');
    svgElem.setAttributeNS(null,'stroke',document.getElementById('color').value);
    svgElem.setAttributeNS(null,'stroke-width',5);
    board.appendChild(svgElem);
    board.innerHTML = board.innerHTML; // force SVG repaint after DOM change
}

function drawEllipse(e) {
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;
    ellipse.rx = Math.abs(x - ellipse.cx);
    ellipse.ry = Math.abs(y - ellipse.cy);
    var ellipses = document.querySelectorAll('#board ellipse');
    if(gesture) board.removeChild(ellipses[ellipses.length-1]);
    var svgElem = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
    svgElem.setAttributeNS(null,'cx',ellipse.cx);
    svgElem.setAttributeNS(null,'cy',ellipse.cy);
    svgElem.setAttributeNS(null,'rx',ellipse.rx);
    svgElem.setAttributeNS(null,'ry',ellipse.ry);
    svgElem.setAttributeNS(null,'fill','none');
    svgElem.setAttributeNS(null,'stroke',document.getElementById('color').value);
    svgElem.setAttributeNS(null,'stroke-width',5);
    board.appendChild(svgElem);
    board.innerHTML = board.innerHTML; // force SVG repaint after DOM change
}

function drawRectangle(e) {
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;
    if(x < rectangle.x || y < rectangle.y) return;
    rectangle.width = Math.abs(x - rectangle.x);
    rectangle.height = Math.abs(y - rectangle.y);
    var rectangles = document.querySelectorAll('#board rect');
    if(gesture) board.removeChild(rectangles[rectangles.length-1]);
    var svgElem = document.createElementNS('http://www.w3.org/2000/svg','rect');
    svgElem.setAttributeNS(null,'x',rectangle.x);
    svgElem.setAttributeNS(null,'y',rectangle.y);
    svgElem.setAttributeNS(null,'width',rectangle.width);
    svgElem.setAttributeNS(null,'height',rectangle.height);
    svgElem.setAttributeNS(null,'fill','none');
    svgElem.setAttributeNS(null,'stroke',document.getElementById('color').value);
    svgElem.setAttributeNS(null,'stroke-width',5);
    board.appendChild(svgElem);
    board.innerHTML = board.innerHTML; // force SVG repaint after DOM change
}

function drawOpenPolygon(e) {
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;
    var polylines = document.querySelectorAll('#board polyline');
    if(gesture) board.removeChild(polylines[polylines.length-1]);
    var svgElem = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    let tempPolyPoints = openpolygon.points + x + "," + y + " ";
    svgElem.setAttributeNS(null,'points',tempPolyPoints);
    svgElem.setAttributeNS(null,'fill','none');
    svgElem.setAttributeNS(null,'stroke-linecap','round');
    svgElem.setAttributeNS(null,'stroke',document.getElementById('color').value);
    svgElem.setAttributeNS(null,'stroke-width',5);
    board.appendChild(svgElem);
    board.innerHTML = board.innerHTML; // force SVG repaint after DOM change
}

function drawClosedPolygon(e) {
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;
    var polygons = document.querySelectorAll('#board polygon');
    if(gesture) board.removeChild(polygons[polygons.length-1]);
    var svgElem = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    let tempPolyPoints = closedpolygon.points + x + "," + y + " ";
    svgElem.setAttributeNS(null,'points',tempPolyPoints);
    svgElem.setAttributeNS(null,'fill','none');
    svgElem.setAttributeNS(null,'stroke-linecap','round');
    svgElem.setAttributeNS(null,'stroke',document.getElementById('color').value);
    svgElem.setAttributeNS(null,'stroke-width',5);
    board.appendChild(svgElem);
    board.innerHTML = board.innerHTML; // force SVG repaint after DOM change
}

function selectShape(e) {
    if(e.target.nodeName === "svg") return;
    var elems = [];
    var deselected = false;
    elems.push(e.target);
    if(e.target.parentNode.nodeName === "g") elems = e.target.parentNode.children;
    for(var i = 0; i < elems.length; i++) {
        if(elems[i].getAttribute("filter") === "url(#sofGlow)") {
            elems[i].setAttribute("filter", "none");
            deselected = true;
            for(var j = 0; j < selected.length; j++) { //unselecting specified element
                if(selected[j] === elems[i]) {
                    selected.splice(j, 1);
                }
            }
        } else {
            selected.push(elems[i]);
            elems[i].setAttribute("filter", "url(#sofGlow)");
        }
    }
    if(deselected) groupsSelected--;
    else groupsSelected++;
    console.log(selected);
    document.getElementById("selected").innerText = "Number of Shapes Selected: " + groupsSelected;
}

function moveShape(e) {
    move.x2 = e.clientX || e.touches[0].clientX;
    move.y2 = e.clientY || e.touches[0].clientY;
    for(var i = 0; i < selected.length; i++) {
        selected[i].setAttribute("filter", "none");
        move.xDiff = move.x2 - move.x1;
        move.yDiff = move.y2 - move.y1;
        var transform = selected[i].getAttribute('transform');
        if(transform) {
            // console.log(transform);
            move.xDiff = parseInt(transform.split('(')[1].split(',')[0]) + move.xDiff;
            move.yDiff = parseInt(transform.split('(')[1].split(',')[1]) + move.yDiff;
        }
        var transformAttr = ' translate(' + move.xDiff + ',' + move.yDiff + ')';
        selected[i].setAttribute('transform', transformAttr);
    }
    save();
    for(var i = 0; i < selected.length; i++) {
        selected[i].setAttribute("filter", "url(#sofGlow)");
    }
}

function copyShape(e) {
    if(copyInitialized) pasteShape(e);
    else {
        copyInitialized = true;
        copy.x = e.clientX || e.touches[0].clientX;
        copy.y = e.clientY || e.touches[0].clientY;
    }
}

function cutShape(e) {
    if(copyInitialized) pasteShape(e);
    else {
        console.log("cutting shape");
        copyInitialized = true;
        copy.x = e.clientX || e.touches[0].clientX;
        copy.y = e.clientY || e.touches[0].clientY;
        for(var i = 0; i < selected.length; i++) {
            board.removeChild(selected[i]);
        }
        save();
    }
}

function pasteShape(e) {
    console.log("pasting shape");
    copyInitialized = false;
    let x2 = e.clientX || e.touches[0].clientX;
    let y2 = e.clientY || e.touches[0].clientY;
    for(var i = 0; i < selected.length; i++) {
        selected[i].setAttribute("filter", "none");
        var clone = selected[i].cloneNode(true);
        let xDiff = x2 - copy.x;
        let yDiff = y2 - copy.y;
        var transform = clone.getAttribute('transform');
        if(transform) {
            xDiff = parseInt(transform.split('(')[1].split(',')[0]) + xDiff;
            yDiff = parseInt(transform.split('(')[1].split(',')[1]) + yDiff;
        }
        var transformAttr = ' translate(' + xDiff + ',' + yDiff + ')';
        clone.setAttribute('transform', transformAttr);
        board.appendChild(clone);
    }
    groupsSelected = 0;
    selected = [];
    document.getElementById("selected").innerText = "Number of Shapes Selected: " + groupsSelected;
    document.getElementById("edit-select").value = "SELECT";
    changeSubMode("SELECT");
    save();
}

function groupShapes() {
    for(var i = 0; i < board.children.length; i++) {
        var currElem = board.children[i];
        if(currElem.nodeName === "g") { //if element is a group
            var matched = false;
            for(var j = 0; j < currElem.children.length; j++) {
                for(var k = 0; k < selected.length; k++) {
                    if(currElem.children[j] === selected[k]) matched = true;
                }
            }
            if(matched) board.removeChild(currElem);
        } else { //if element is standalone
            for(var k = 0; k < selected.length; k++) {
                if(currElem === selected[k]) board.removeChild(currElem);
            }
        }
    }
    var group = document.createElement('g');
    for(var i = 0; i < selected.length; i++) {
        selected[i].setAttribute("filter", "none");
        group.appendChild(selected[i]);
    }
    groupsSelected = 0;
    selected = [];
    board.appendChild(group);
    board.innerHTML = board.innerHTML;
    // console.log(selected);
    document.getElementById("selected").innerText = "Number of Shapes Selected: " + groupsSelected;
}

function ungroupShapes() {
    var groups = board.querySelectorAll("g");
    for(var i = 0; i < groups.length; i++) {
        var currGroup = groups[i];
        var elemsToUngroup = [];
        for(var j = 0; j < currGroup.children.length; j++) {
            var currGroupElement = currGroup.children[j];
            for(var k = 0; k < selected.length; k++) {
                selected[k].setAttribute("filter", "none");
                if(selected[k] === currGroupElement) {
                    elemsToUngroup.push(currGroupElement);
                }
            }
        }
        if(elemsToUngroup.length > 0) board.removeChild(currGroup);
        for(var j = 0; j < elemsToUngroup.length; j++) {
            board.appendChild(elemsToUngroup[j]);
        }
    }
    groupsSelected = 0;
    selected = [];
    board.innerHTML = board.innerHTML;
    document.getElementById("selected").innerText = "Number of Shapes Selected: " + groupsSelected;
}

function discardShapes() {
    for(var i = 0; i < board.children.length; i++) {
        var currElem = board.children[i];
        if(currElem.nodeName === "g") { //if element is a group
            var matched = false;
            for(var j = 0; j < currElem.children.length; j++) {
                for(var k = 0; k < selected.length; k++) {
                    if(currElem.children[j] === selected[k]) matched = true;
                }
            }
            if(matched) {
                board.removeChild(currElem);
                i--;
            }
        } else { //if element is standalone
            for(var k = 0; k < selected.length; k++) {
                if(currElem === selected[k]) {
                    board.removeChild(currElem);
                    i--;
                }
            }
        }
    }
    groupsSelected = 0;
    selected = [];
    board.innerHTML = board.innerHTML;
    document.getElementById("selected").innerText = "Number of Shapes Selected: " + groupsSelected;
}

function addEventListeners() {
    board.addEventListener('mousedown',lineStart);
    board.addEventListener('touchstart',lineStart);
    board.addEventListener('mousemove',lineMove);
    board.addEventListener('touchmove',lineMove);
    board.addEventListener('mouseup',lineEnd);
    board.addEventListener('touchend',lineEnd);
    board.addEventListener('click', editTools);
    document.getElementById('upload').addEventListener('change',upload);
    if(mainMode === ModeEnum.EDIT) document.querySelector("svg").style.cursor = "auto";
}
