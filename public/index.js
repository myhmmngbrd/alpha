
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

class Radio {
    constructor(length, parentnode) {
        const ul = new Block('ul', parentnode)
        let li;
        for (let i = 0; i < length; i++) {
            li = new Block('li', ul);
            li.on('click',() => {
                for (let j = 0; j < length; j++) {
                    ul.childlist[j].node.classList.remove('selected');
                }
                console.log(this.node);
            });
        }
    }
}

document.body.innerHTML = '';
radio = new Radio(5, document.body);
