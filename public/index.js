
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

a = new Block('div', document.body);

let b = function() { console.log('click!'); };
let c = function() { console.log('click!2'); };

a.on('click', b);
a.on('click', c);
a.on('click',() => { console.log('click!3'); });
a.off('click',c );

