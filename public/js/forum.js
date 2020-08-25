

class DOMNode {
    constructor(type, attributes, ...contents) {
        this.type = type;
        this.attributes = attributes;
        this.contents = contents;
    }
}

class DOMStructure {
    constructor(type, properties, ...children) {
        this.type = type;
        this.properties = properties;
        this.children = children;
        if (properties.key) this.key = properties.key;
        else this.key = key_value++
    }
    static key_value = 0;
    /**
     * @param {dom eleemnt(string), DOMStructure(class object)} type 
     * @param {Object} properties 
     * @param  {...any} children 
     */
    static create(type, properties, ...children) {
        if (typeof type === 'string') { // DOM element
            return new DOMNode(type, properties, ...children);
        } else if (type instanceof Object) { // DOMStructure
            return new type(type, properties, ...children).render();
        }
    }
    /**
     * @param {DOMStructure(class instance)} type 
     * @param {Object} properties 
     * @param  {...any} children 
     */
    static check(type, properties, ...children) {


    }
    render() { /* virtual function */}
}

class DOMController {
    constructor() {}
    static render()
}