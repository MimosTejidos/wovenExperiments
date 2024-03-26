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
		woven.tiles.init();	
	}
	woven.tiles.size = size;
	woven.tileStyle = style;
	$('#tileBoard').html(woven.tiles.htmlTable());
}