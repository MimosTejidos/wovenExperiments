// https://www.w3schools.com/js/js_classes.asp
// "use strict";
//declaring global variables:

let woven = {}; // woven = truchet
woven.tiles = null;
woven. border = false;


// let rows;

// let nRows;
// let rowsInput;

// let cols;
// let nCols;
// let colsInput;

// let size;
// let nSize;
// let sizeInput;
/*
let generateBtn;
let clearBtn;
let toggleGridBtn;
let MCpickerBtn;

let pickedMC = '#5F5FA5'
let showGrid = false;
*/


// functions:

// window.onload = init();

woven.start = function(size, rows) {
    console.log(`f woven.start = function(size, rows) executed / (${size}, ${rows})`);
    woven.tiles = new Tiles(size, rows);
    woven.tiles.init();
}

woven.traditionalStyle = function (rotation, t) { // trouchet.tileTraditional
    console.log(`function woven.traditionalStyle (rotation, t) executed / (${rotation}, ${t})`);
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

woven.tileDiag = function(rotation,t) {
	console.log(`f woven.tileDiag = function(rotation, t) executed / (${rotation}, ${t})`);
	console.log(`t:`);
	console.log(t);
	var tile = new Builder("line").att("style",`stroke: ${pickedMC};stroke-width:3`)
		.att("stroke-linecap","square");
	var c = t.size;
	if (rotation % 2 == 0) {
		tile.att("x1", c);
		tile.att("y1", 0);
		tile.att("x2", 0);
		tile.att("y2",c); 
	} else {
		tile.att("x1", 0);
		tile.att("y1", 0);
		tile.att("x2", c);
		tile.att("y2",c);		
	}
	return tile;
};

// woven.tileStyle = woven.traditionalStyle;
// woven.tileStyle = woven.tileDiag

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
                .att('height', `${this.size}px`);

        let tile = woven.tileStyle(k, this);

        if (woven.border) { // should get this info from tileStyle
            console.log('if woven.border = true');
            let border = new Builder ('rect')
                .att('stroke-width', 1)
                .att('fill', 'none');
                border
                .att('height', `${this.size}px`)
                .att('width', `${this.size}px`)
                .att('stroke', 'grey')
                .att('x', 0).att('y', 0);
            frame.elem(border);
        }

        tile.attOnAllElements('data-row', i).attOnAllElements('data-col', j);

//         // console.log('frame: ');
//         // console.log(frame);
//         // console.log('tile: ');
//         // console.log(tile);

        frame.elem(tile);
        return frame;
    }

    element(i,j) {
		console.log(`function inside CLASS Tiles: element(i,j) / elemet(${i}, ${j})`)
        return $(`#tile_${i}_${j}`);
    }
}

// function init () {
    rowsInput = $('#rowsInput');
    colsInput = $('#columnsInput');
    sizeInput = $('#sizeInput');
    generateBtn = $('#generateBtn').click(function(){
        generateTable();
    });

    clearBtn = $('#clearBtn').click(function(){
        clearPage();
    });

    toggleGridBtn = $('#toggleGridBtn').click(function(){
        toggleGrid();
    });

    MCpickerBtn = $('#colorPickerMC').change(function(){
        chooseLineColor();
    });

    disableBtn(clearBtn);
    disableBtn(toggleGridBtn);
    rows = parseInt(rowsInput.val());
    cols = parseInt(colsInput.val());
    size = parseInt(sizeInput.val());
    pickedMC = $('#colorPickerMC').val();
    // pickedMC = MCpickerBtn.value;
// };

// main functions:
function generateTable () {
    console.log('function generateTable() executed');
    getUserInputs();
    woven.tiles = new Tiles (size, rows, cols)
    woven.tiles.initTiles_();
    console.log('woven.tiles: ');
    console.log(woven.tiles);
    woven.tileStyle = style;
    $('#tileBoard').html(woven.tiles.htmlTable());

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
    // pickedMC = MCpickerBtn.value;
    pickedMC = $('#colorPickerMC').val();

    console.log(`Number of rows: ${nRows}. Number of columns: ${nCols}`);
}

woven.traditionalStyle = function (rotation, t) { // trouchet.tileTraditional
    console.log(`function woven.traditionalStyle (rotation, t) executed / (${rotation}, ${t})`);
    console.log(`t:`);
    console.log(t);
    let tile = new Builder ('polygon').att('stroke-width', `${0}px`).att('fill', 'black');
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
    // return tile.build();
    // console.log('tile: ');
    // console.log(tile);
    return tile;
}



///

// picking MC and CC:
function chooseLineColor () {
    console.log('function chooseLineColor() executed');
    // pickedMC = '#5F5FA5'; //var(--color4);
    // pickedMC = MCpickerBtn.value;
    clearPage();
    generateTable();
}

function clearPage() {
    console.log('function clearPage() executed');
        // $('#htmlTableID').innerHTML = "";
    enableBtn(generateBtn)
    disableBtn(clearBtn);
}

////

//  let style = woven.traditionalStyle;
 let style = woven.tileDiag;



/* index.js: */
/*

let style = woven.selectedStyle; // woven.tileTraditional;

let showGrid = false;
$(document).ready(function(){	
    console.log('f $(document).ready(function() executed');
	$('#clearBtn').on("click", function(event){
		reset(true);
	});
	$('#randBtn').on("click", function(event){
		woven.tiles.randomizeTile();
		$('#tileBoard').html(woven.tiles.htmlTable());
	});
	$('#gridBtn').on("click", function(event){
		woven.border = !woven.border;
		$('#tileBoard').html(woven.tiles.htmlTable());
	});
	$('#genButton').on("click", function(event){
		reset();
	});
	$('#tradTile').on("click", function(event){
		style = woven.tileTraditional;
		$(".tileButton").removeClass("btn-primary");
		$(".tileButton").addClass("btn-secondary");
		$('#tradTile').addClass("btn-primary")
		reset();
	});
	$('#smithTile').on("click", function(event){
		style = woven.tileSmith;
		$(".tileButton").removeClass("btn-primary");
		$(".tileButton").addClass("btn-secondary");
		$('#smithTile').addClass("btn-primary")
		reset();
	});
	$('#roundTile').on("click", function(event){
		style = woven.semiCircle;
		$(".tileButton").removeClass("btn-primary");
		$(".tileButton").addClass("btn-secondary");
		$('#roundTile').addClass("btn-primary")
		reset();
	});
	$('#curveSquareTile').on("click", function(event){
		style = woven.curveAndSquare;
		$(".tileButton").removeClass("btn-primary");
		$(".tileButton").addClass("btn-secondary");
		$('#curveSquareTile').addClass("btn-primary")
		reset();
	});
});

$(document).ready(function(){
    console.log('f $(document).ready(function() executed');
	reset();
});

//externalize the rows and cols so we can compare with prev.
// let rows = 0;
// let cols = 0;
function reset(hard){

	let nRows = parseInt($('#rowInput').val());
	let nCols = parseInt($('#colInput').val());
	let size = parseInt($('#sizeInput').val());
	
	if ((rows !== nRows) || (cols !== nCols)||hard){
		rows = nRows;
		cols = nCols;
		woven.tiles = new Tiles(size,rows);
		woven.rule = woven.ruleNone;
		woven.tiles.cols = cols;
		woven.tiles.init();	
	}
	woven.tiles.size = size;
	woven.tileStyle = style;
	$('#tileBoard').html(woven.tiles.htmlTable());
}

/* end of index.js */ 



