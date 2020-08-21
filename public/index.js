
/**
 * @type string : 
 * @parentnode Element, Block
 * @attr object
 */
class Block {    
    constructor(type, parentnode, attributes) {
        this.node = document.createElement(type);
        this.parent = parentnode;
        this.childlist = [];
        this.eventlist = {};
        parentnode instanceof Block ?
            parentnode.appendChild(this) :
            parentnode.appendChild(this.node);
        if (attributes) {
            for (let key in attributes) {
                this.node.setAttribute(key, attributes[key]);
            }
        }
    }
    appendChild(block) {
        this.node.appendChild(block.node);
        this.childlist.push(block);
    }
    on(eventtype, callback) {
        if (!this.eventlist[eventtype]) {
            this.eventlist[eventtype] = [];
        }
        callback = callback.bind(this);
        this.eventlist[eventtype].push(callback);
        this.node.addEventListener(eventtype, callback);
    }
    off(eventtype, listener) {
        if (!this.eventlist[eventtype]) {
            return;
        }
        let list = this.eventlist[eventtype];
        if (!listener) {
            for (let i=0; i<list.length; i++) {
                this.node.removeEventListener(eventtype, list[i]);
            }
            this.eventlist[eventtype] = null;
        } else {
            for (let i=0; i<list.length; i++) {
                if (list[i] == listener) {
                    this.node.removeEventListener(eventtype, listener);
                    list.splice(i, 1);
                } 
            }
        }
    }
}


class List {
    constructor(parentnode) {
        this.root = new Block('ul', parentnode,);
        this.index = [];
    }
    add(contents) {
        let li = new Block('li', this.root);
        this.index.push(li);
        if (contents) {
            li.node.innerHTML = contents;
        } 
    }
}

class Link extends List{
    constructor(parentnode) {
        super (parentnode, 0);
    }
    add(text, href) {
        if (!text) return;
        const li = new Block('li', this.root);
        const a = new Block('a', li, { href: href ? href : '/' });
        a.node.innerHTML = text;
        this.index.push(a);
    }
}


document.body.innerHTML = '';
root = new Block('div', document.body, { id: 'root', });

header = new Block('header', root, { id: 'header', });
body = new Block('div', root, { id: 'body', });
footer = new Block('footer', root, { id: 'footer', });

navi = new Link(header);
for (let i=0; i<5; i++) {
    navi.add(i+'번');
}

sidebar = new Block('div',body, { id: 'sidebar'});
