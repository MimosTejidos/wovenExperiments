/**
* Builders to be used for HTML construction.
*
*/
// CLASSES:

/*
class Tiles {
     constructor(size, rows, cols) {
         this.size = size;
         this.rows = rows;
         this.cols = cols;
         this.tiles = [];
     }

     initTiles_() {
         console.log('function initTiles_ inside CLASS Tiles executed');
         for (let i = 0; i < this.rows; i++) {
             this.tiles[i] = []; // let it know that each row is an array
             for (let j = 0; j < this.cols; j++) {
                 let x = 0;
                 this.tiles[i].push(x); // put the content of x inside each tile
             }
         }
     }

     htmlTable() {
         console.log('function htmlTable inside CLASS Tiles executed');
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
         // console.log('html:');
         // console.log(html);
         return html.build();
     }

     newBlock(i,j,k) { // k represents a this.tiles[i][j] object
         console.log('function newBlock(i,j,k) inside CLASS Tiles executed. ');
         let frame = new Builder ('svg')
                 .att('id', `tile_${i}_${j}`)
                 .att('dataRow', i)
                 .att('dataCol', j)
                 .att('align', 'center')
                 .att('width', `${this.size}px`)
                 .att('height', `${this.size}px`);

         let tile = woven.tileStyle(k, this);

         if (woven.border) { // should get this info from tileStyle
             console.log('woven.border = true');
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
 }
*/

class Builder {
    constructor(name) { // name = element (ej: table)
        this.name = name;
        this.attributes = [];
        this.elements = [];
		console.log(`CLASS Builder constructor(name) / constructor(${name})`);
    }

    att(name, value) {
		console.log(`function inside CLASS Builder: att(name, value) / att(${name}, ${value})`);
        let att = new Attribute(name, value);
        this.attributes.push(att); // pushes .att(name, value) to the array this.attributes.
        return this;
    }

    // add element allows you to add a builder to a builder
    elem(bldr) {
		console.log(`function inside CLASS Builder: elem(bldr) / elem(${bldr})`);
        console.log('bldr:');
		console.log(bldr);
        this.elements.push(bldr); // push the element passed as 'bldr' to the elements array
        return this;
    }

    text(text) {
		console.log(`function inside CLASS Builder: text(text) / text(${text})`);
        this.elements.push (new RawHTML(text));
        return this;
    }

    build() {
        console.log('function inside CLASS Builder: build() ');
        let s = `<${this.name}`;
        for (let i = 0; i < this.attributes.length; i++) {
            s += ` ${this.attributes[i].attribute_toString()}`;
            console.log(`this.attributes[i].toString ; i = ${i}:`);
			console.log(this.attributes[i])
	    }
        s += '>';
        for (let i = 0; i < this.elements.length; i++) {
            // if (this.elements.length > 1) {
                s += " " + this.elements[i].build();
                console.log(`this.elements[i].build() ; ; i = ${i}:`);
                console.log(this.elements[i]);
            // }
        }
        s += `</${this.name}>`
        return s;
    }

    attOnAllElements(name, value) {
		console.log(`function inside CLASS Builder: attOnAllElements(name, value) / attOnAllElements(${name}, ${value})`);
        
        this.att(name, value);
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].att(name, value);
        }
        return this;
    }
} 

class Attribute {
    constructor(name, value) {
        this.name = name;
        this.value = value;
		console.log(`CLASS Attribute constructor(name, value) / constructor(${name}, ${value})`);

    }
    attribute_toString() {
        console.log('function inside CLASS Attribute: attribute_toString()');
        return `${this.name} = '${this.value}'`
    }
}

class RawHTML {
    constructor(raw) {
        this.raw = raw;
		console.log(`CLASS RawHTML constructor(raw) / constructor(${raw})`);

    }
    build() {
        console.log('function inside CLASS RawHTML: build()');
        return this.raw;
    }
}