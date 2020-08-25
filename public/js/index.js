
const add = DOMStructor.createNode;

class HNavi extends DOMStructor {
    render() {
        return add('ul', {class: 'navigator'},
            add('li', null, add('a', {href: '/forum'}, '게시판')),
        );
    }
}

onclickfn = function() {
    console.log('success!');
}

class Header extends DOMStructor {
    render() {
        return add('header', {id: 'header'},
            add('div', {id: 'logo',/*onclick function*/ onclick: onclickfn()}, 'LOGO'),
            add(HNavi),
        );
    }
}

class BNavi extends DOMStructor {
    render() {
        return add('ul', {class: 'navigator'},
        );
    }
}

class Body extends DOMStructor {
    render() {
        return add('div', {id: 'body'},
            add('div', {id: 'sidebar'}, add(BNavi, null)),
            add('div', {id: 'contents'}),
        );
    }
}

class Footer extends DOMStructor {
    render() {
        return add('footer', {id: 'footer'});
    }
}


DOMController.render(
    add('div', null, add(Header), add(Body), add(Footer)),
    document.querySelector('#root')
)