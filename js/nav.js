import Router from './router.js';

export default class Navigation {
    _click;
    _length;
    constructor() {
       this._length = document.getElementById('nav').children.length;
       this._click = this.click();
    }

    click() {
        const router = new Router();
        for ( var i = 0; i < this._length; i++ ) {
            document.getElementById('nav').children[i].addEventListener('click', event => {
                event.preventDefault();
                let navNode = event.path[0];
                if ( !navNode.classList.contains('active') ) {
                    document.querySelectorAll('a.nav-b').forEach(btn => {
                        btn.classList.remove('active');
                    })
                    router.init();
                    navNode.classList.add('active');
                }
            })
        }
    }
}

