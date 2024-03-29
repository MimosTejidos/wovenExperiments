$(document).ready(function(){
    console.log('f $(document).ready(function() executed');
	reset();
});

//externalize the rows and cols so we can compare with prev.
let rows = 0;
let cols = 0;
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
		// woven.tiles.init();	
	}
	woven.tiles.size = size;
	woven.tileStyle = style;
	$('#tileBoard').html(woven.tiles.htmlTable());
}

