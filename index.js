$(document).ready(function(){
    console.log('f $(document).ready(function() executed');
	reset();
});
// let woven = {}; // woven = truchet
//externalize the rows and cols so we can compare with prev.
rows = 0;
cols = 0;

function reset(hard){
	console.log(`function reset(hard) executed`);

	nRows = parseInt($('#rowInput').val());
	nCols = parseInt($('#colInput').val());
	size = parseInt($('#sizeInput').val());

	if ((rows !== nRows) || (cols !== nCols)||hard){
		rows = nRows;
		cols = nCols;
		woven.tiles = new Tiles(size,rows);
		woven.rule = woven.ruleNone;
		woven.tiles.cols = cols;
		// woven.tiles.init();
	}
	woven.tiles.size = size;
	// woven.tileStyle = style;
	$('#tileBoard').html(woven.tiles.htmlTable());
}

