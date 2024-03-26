/**
* Builders to be used for HTML construction.
*
*/
// CLASSES:

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