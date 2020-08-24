class DOMNode {
    constructor(type, attributes, ...contents) {
        this.type = type;
        this.attributes = attributes ? attributes : {};
        this.contents = contents ? contents : [];
    }
}

class DOMStructor {
    constructor(props) {
        this.props = props;
    }
    static createNode(type, properties = null, ...children) {
        if (type instanceof Object) {
            if (children.length) console.error('매개변수 형식 오류입니다');
            const node = new type(properties);
            return node.render();
        } else if (typeof type === 'string') {
            return new DOMNode(type, properties, ...children);
        }
    }
}

class DOMController {
    static currentDOM = {};
    static render(node, root) {
        // root의 존재 여부로 생성과 갱신 구분
        const element = document.createElement(node.type);   
        for (let key in node.attributes) {
            element.setAttribute(key, node.attributes[key]);
        }
        const contents = node.contents
        for (let i=0; i<contents.length; i++) {
            if (contents[i] instanceof Object) {
                this.render(contents[i], element);
            } else if (typeof contents[i] === 'string') {
                element.innerHTML += contents[i];
            }
        }
        root.appendChild(element);
    }

    compare() {}
}