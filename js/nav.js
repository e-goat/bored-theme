import Router from './router.js';

export default class Navigation {
    _length;

    constructor() {
       this._length = document.getElementById('nav').children.length
       this.click()
       this.routing()
       this.stickyOnTop()
    }

    click() {
        for ( var i = 0; i < this._length; i++ ) {
            document.getElementById('nav').children[i].addEventListener('click', event => {
                event.preventDefault();
                let navNode = event.path[0];
                if ( !navNode.classList.contains('active') ) {
                    document.querySelectorAll('a.nav-b').forEach(btn => {
                        btn.classList.remove('active')
                    })
                    navNode.classList.add('active')
                }
            })
        }
    }

    stickyOnTop() {
        const navbar  = document.getElementById('nav'),
            sticky  = navbar.offsetTop;
        
        return window.onscroll = () => { 
            window.pageYOffset >= sticky ? navbar.classList.add('sticky-nav')
                : navbar.classList.remove('sticky-nav')
        }
    }

    routing() {
        const router = new Router()
    
        return [...document.querySelectorAll('a.nav-b')].forEach(
            element => {
                element
                    .addEventListener('click', () => {
                        return router.init();
                    })          
            }
        )
    }
}

