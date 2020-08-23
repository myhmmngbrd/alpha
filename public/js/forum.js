document.body.innerHTML = '';
const root = new Block('div', document.body, { id: 'root', });

const header = new Block('header', root, { id: 'header', });
const headerlogo = new Block('div', header, { id:'logo', });
headerlogo.node.innerHTML = 'LOGO';
headerlogo.on('click', () => { window.location.href = '/'; })
const headernavi = new Link(header);
headernavi.root.node.classList.add('navigator');
headernavi.add('게시판', '/forum')

const body = new Block('div', root, { id: 'body', });
const sidebar = new Block('div', body, { id: 'sidebar'});
const sidenavi = new Link(sidebar);
sidenavi.root.node.classList.add('navigator');
const main = new Block('div', body, { id: 'contents' });

const footer = new Block('footer', root, { id: 'footer', });

const forum = new Block('div', main, { id: 'forum' });
const forumlist = new List(forum);
