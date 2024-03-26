let style = woven.selectedStyle; // woven.tileTraditional;
console.log('style:');
console.log(style);

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
	$('#triangTile').on("click", function(event){
		style = woven.triangleStyle;
		console.log('style:');
		console.log(style);
		$(".tileButton").removeClass("btn-primary");
		$(".tileButton").addClass("btn-secondary");
		$('#triangTile').addClass("btn-primary")
		reset();
	});
	$('#lineTile').on("click", function(event){
		style = woven.lineStyle;
		$(".tileButton").removeClass("btn-primary");
		$(".tileButton").addClass("btn-secondary");
		$('#lineTile').addClass("btn-primary")
		reset();
	});
	$('#cableTile').on("click", function(event){
		style = woven.cableStyle;
		$(".tileButton").removeClass("btn-primary");
		$(".tileButton").addClass("btn-secondary");
		$('#cableTile').addClass("btn-primary")
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