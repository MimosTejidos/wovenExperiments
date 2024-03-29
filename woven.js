// https://www.w3schools.com/js/js_classes.asp
// "use strict";
//declaring global variables:

let woven = {}; // woven = truchet
woven.tiles = null;
woven.border = false;

let selectedStyle = 'lineStyle';

// functions:

// window.onload = init();

woven.start = function(size, rows) {
    console.log(`f woven.start = function(size, rows) executed / (${size}, ${rows})`);
    woven.tiles = new Tiles(size, rows);
    woven.tiles.init();
}

woven.triangleStyle = function (rotation, t) { // trouchet.tileTraditional
    console.log(`function woven.triangleStyle (rotation, t) executed / (${rotation}, ${t})`);
    console.log(`t:`);
    console.log(t);
    let tile = new Builder ('polygon')
            .att('stroke-width', `${0}px`)
            .att('fill', 'black');
    let c = t.size;
    let tl = '0, 0';
    let tr = `${c}, 0`;
    let bl = `0, ${c}`;
    let br = `${c}, ${c}`;

    if (rotation == 0) {
        tile.att('points', `${bl} ${tl} ${tr}`);
    } else if (rotation == 1) {
        tile.att('points', `${tl} ${tr} ${br}`);
    } else if (rotation == 2) {
        tile.att('points', `${tr} ${br} ${bl}`);
    } else {
        tile.att('points', `${br} ${bl} ${tl}`);
    }
    return tile;
}

woven.lineStyle = function(rotation,t) {
	console.log(`f woven.lineStyle = function(rotation, t) executed / (${rotation}, ${t})`);
	console.log(`t:`);
	console.log(t);
	let line1 = new Builder("line").att("style",`stroke: ${pickedA};stroke-width:3`)
		.att("stroke-linecap","square");
	let c = t.size;
	if (rotation % 2 == 0) {
		line1.att("x1", c);
		line1.att("y1", 0);
		line1.att("x2", 0);
		line1.att("y2",c); 
	} else {
		line1.att("x1", 0);
		line1.att("y1", 0);
		line1.att("x2", c);
		line1.att("y2",c);		
	}
	return line1;
};

woven.lineStyle2 = function(rotation,t) {
	console.log(`f woven.lineStyle2 = function(rotation, t) executed / (${rotation}, ${t})`);
	console.log(`t:`);
	console.log(t);
	let line1 = new Builder("line").att("style",`stroke: ${pickedA};stroke-width:3`)
		.att("stroke-linecap","square");
    let line2 = new Builder("line").att("style",`stroke: ${pickedB};stroke-width:3`)
    .att("stroke-linecap","square");
	let c = t.size;
	if (rotation % 2 == 0) {
		line1.att("x1", c);
		line1.att("y1", 0);
		line1.att("x2", 0);
		line1.att("y2",c); 
	} else {
		line1.att("x1", 0);
		line1.att("y1", 0);
		line1.att("x2", c);
		line1.att("y2",c);		
	}
    if (rotation % 2 !== 0) {
		line2.att("x1", c);
		line2.att("y1", 0);
		line2.att("x2", 0);
		line2.att("y2",c); 
	} else {
		line2.att("x1", 0);
		line2.att("y1", 0);
		line2.att("x2", c);
		line2.att("y2",c);		
	}
    let group = new Builder("g").elem(line1).elem(line2); 
    return group;
};

woven.cableStyle = function() {
    console.log(`f woven.cableStyle = function() executed / ()`);
    let tile = new Builder('polygon').att('points', '50 70 40 50')
        .att('stroke-width', '4.375px')
        .att('fill', 'white')
        .att('stroke', `${pickedB}`);
    
    return tile;
    // <polygon points="70,122.5 87.5,140 70,157.5 52.5,140 " stroke-width="4.375" fill="white" stroke="white"></polygon>


}

class Tiles {
    constructor(size, rows, cols) {
        this.size = size;
        this.rows = rows;
        this.cols = cols;
        this.tiles = [];
		console.log(`CLASS Tiles constructor(size, rows, cols) / constructor(${size}, ${rows}, ${cols})`);

    }

    initTiles_() {
        console.log('function inside CLASS Tiles: initTiles_() ');
        for (let i = 0; i < this.rows; i++) {
            this.tiles[i] = []; // let it know that each row is an array
            for (let j = 0; j < this.cols; j++) {
                let x = 0;
                this.tiles[i].push(x); // put the content of x inside each tile
            }
        }
    }

    htmlTable() {
        console.log('function inside CLASS Tiles: htmlTable ');
        let html = new Builder('table').att('align', 'center'); // Builder(name1).att(name2, value); name1 = for constructor; name2 for att() function.
        for (let i = 0; i < this.rows; i++) {
            let row = new Builder('tr'); // create a new tr element for each row
            for (let j = 0; j < this.cols; j++) {
                let cell = new Builder ('td'); // each cell is a td element
                cell.elem(this.newBlock(i,j,this.tiles[i][j]));
                row.elem(cell);
            }
            html.elem(row);
        }
        return html.build();
    }

    newBlock(i,j,k) { // k represents a this.tiles[i][j] object
		console.log(`function inside CLASS Tiles: newBlock(i,j,k) / newTruchet(${i}, ${j}, ${k})`);
        let frame = new Builder ('svg')
                .att('id', `tile_${i}_${j}`)
                .att('dataRow', i)
                .att('dataCol', j)
                .att('align', 'center')
                .att('width', `${this.size}px`)
                .att('height', `${this.size}px`)
                .att('background-color', `${pickedBackground}`);

                let tile;
                switch (selectedStyle) {
                    case 'lineStyle':
                         tile = woven.lineStyle(k, this);
                        break;
                    case 'triangleStyle':
                         tile = woven.triangleStyle(k, this);
                        break;
                    case 'cableStyle':
                         tile = woven.cableStyle(k, this);
                        break;
                    case 'lineStyle2':
                        tile = woven.lineStyle2(k, this);
                        break;
                }

                //  let tile = woven.triangleStyle(k, this);



        // let tile = woven.tileStyle(k, this);


        if (woven.border) { // should get this info from tileStyle
            console.log('if woven.border = true');
            let border = new Builder ('rect')
                .att('stroke-width', `${1}px`)
                .att('fill', 'none');
                border
                .att('height', `${this.size}px`)
                .att('width', `${this.size}px`)
                .att('stroke', `${pickedGrid}`)
                .att('x', 0).att('y', 0);
            frame.elem(border);
        }

        tile.attOnAllElements('data-row', i).attOnAllElements('data-col', j);

        frame.elem(tile);
        return frame;
    }

    element(i,j) {
		console.log(`function inside CLASS Tiles: element(i,j) / elemet(${i}, ${j})`)
        return $(`#tile_${i}_${j}`);
    }
}

// function init () {
    let rowsInput = $('#rowsInput');
    let colsInput = $('#columnsInput');
    let sizeInput = $('#sizeInput');

    let generateBtn = $('#generateBtn').click(function(){
        generateTable();
    });

    // clearBtn = $('#clearBtn').click(function(){
    //     clearPage();
    // });
    // disableBtn($('#toggleGridBtn'));

    let toggleGridBtn = $('#toggleGridBtn').click(function(){
        showGrid = true;
    });

    let pickerBtnA = $('#colorPickerA').change(function(){
        changeColors();
    });
    let pickerBtnB = $('#colorPickerB').change(function(){
        changeColors();
    });
    let pickedGrid = $('#colorPickerGrid').change(function(){
        changeColors();
    });

    let rows = parseInt(rowsInput.val());
    let cols = parseInt(colsInput.val());
    let size = parseInt(sizeInput.val());

// main functions:
let style = woven.lineStyle

function generateTable () {
    console.log('function generateTable() executed');
    getUserInputs();
    woven.tiles = new Tiles (size, rows, cols)
    woven.tiles.initTiles_();
    console.log('woven.tiles: ');
    console.log(woven.tiles);
    woven.tileStyle = style;
    $('#tileBoard').html(woven.tiles.htmlTable());
    enableBtn(toggleGridBtn);

}


// auxiliary funtions:
function hideBtn(btn) {
    btn.disabled = true;
    btn.addClass('hidden');
}
function disableBtn (btn) {
    btn.disabled = true;
    btn.addClass('disabled')
}
function enableBtn (btn) {
    btn.disabled = false;
    btn.removeClass('disabled');
    btn.removeClass('hidden');
}
function getUserInputs () {
    nRows = parseInt(rowsInput.val());
	nCols = parseInt(colsInput.val());
    nSize = parseInt(sizeInput.val());
    rows = nRows;
    cols = nCols;
    size = nSize
    pickedA = $('#colorPickerA').val();
    pickedB = $('#colorPickerB').val();
    pickedBackground = $('#colorPickerBackground').val();
    pickedGrid = $('#colorPickerGrid').val();
    console.log(`Number of rows: ${nRows}. Number of columns: ${nCols}`);
}

woven.triangleStyle = function (rotation, t) { // trouchet.tileTraditional
    console.log(`function woven.triangleStyle (rotation, t) executed / (${rotation}, ${t})`);
    console.log(`t:`);
    console.log(t);
    let tile = new Builder ('polygon').att('stroke-width', `0px`).att('fill', `${pickedA}`);
    let c = t.size;
    let tl = '0, 0';
    let tr = `${c}, 0`;
    let bl = `0, ${c}`;
    let br = `${c}, ${c}`;

    if (rotation == 0) {
        tile.att('points', `${bl} ${tl} ${tr}`);
    } else if (rotation == 1) {
        tile.att('points', `${tl} ${tr} ${br}`);
    } else if (rotation == 2) {
        tile.att('points', `${tr} ${br} ${bl}`);
    } else {
        tile.att('points', `${br} ${bl} ${tl}`);
    }
    return tile;
}



///

// picking MC and CC:
function changeColors () {
    console.log('function changeColors() executed');
    clearPage();
    generateTable();
}

// function clearPage() {
//     console.log('function clearPage() executed');
//         // $('#htmlTableID').innerHTML = "";
//     enableBtn(generateBtn)
//     disableBtn(clearBtn);
// }

////
// let style = woven.lineStyle

let showGrid = false;

$(document).ready(function(){	
    console.log('f $(document).ready(function() executed');
	$('#clearBtn').on("click", function(event){
        console.log(`clicked clearBtn`);
		reset(true);
	});
	// $('#randBtn').on("click", function(event){
    //     console.log(`clicked randBtn`);
	// 	woven.tiles.randomizeTile();
	// 	$('#tileBoard').html(woven.tiles.htmlTable());
	// });
	$('#gridBtn').on("click", function(event){
        console.log(`clicked gridBtn`);
		woven.border = !woven.border;
		$('#tileBoard').html(woven.tiles.htmlTable());
	});
	$('#genButton').on("click", function(event){
        console.log(`clicked genButton`);
		reset();
	});
	$('#triangleTile').on("click", function(event){
        console.log(`clicked trianagTile`);
        let btn = this.id;
        markSelectedBtn(btn);
		selectedStyle = 'triangleStyle';
		console.log(`selected style: ${selectedStyle}`);
		reset();
	});
	$('#lineTile').on("click", function(event){
        console.log(`clicked lineTile`);
        let btn = this.id;
        markSelectedBtn(btn);
		selectedStyle = 'lineStyle';
		console.log(`selected style: ${selectedStyle}`);
		reset();
	});
	$('#cableTile').on("click", function(event){
        console.log(`clicked cableTile btn`);
        let btn = this.id;
        markSelectedBtn(btn);
		selectedStyle = 'cableStyle';
		console.log(`selected style: ${selectedStyle}`);
		reset();
	});
    $('#lineTile2').on("click", function(event){
        console.log(`clicked lineTile2`);
        let btn = this.id;
        markSelectedBtn(btn);
		selectedStyle = 'lineStyle2';
		console.log(`selected style: ${selectedStyle}`);
		reset();
	});
});

function markSelectedBtn (btn) {
    console.log(`clicked: ${btn} -> function markSelectedBtn(btn)`);
    $(".tileButton").removeClass("btn-primary");
    $(".tileButton").addClass("btn-secondary");
    $(`#${btn}`).addClass("btn-primary");
}



